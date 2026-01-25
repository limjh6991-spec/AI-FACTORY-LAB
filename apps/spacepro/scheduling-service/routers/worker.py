"""
Worker Router - 작업자 관리 CRUD API
Uses sp_employee / sp_team tables with hierarchy support
"""
from fastapi import APIRouter, HTTPException
from psycopg2.extras import RealDictCursor
from contextlib import contextmanager
import psycopg2
import os

router = APIRouter(prefix="/worker", tags=["worker"])

# Database connection - Docker환경 지원
@contextmanager
def get_db_connection():
    conn = psycopg2.connect(
        host=os.getenv('DB_HOST', 'db'),  # Docker Compose service name
        port=os.getenv('DB_PORT', '5432'),
        database=os.getenv('DB_NAME', 'spacepro'),
        user=os.getenv('DB_USER', 'postgres'),
        password=os.getenv('DB_PASSWORD', 'postgres')
    )
    try:
        yield conn
    finally:
        conn.close()


@router.get("/summary/stats")
async def get_worker_stats():
    """작업자 통계 요약"""
    try:
        with get_db_connection() as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                # 기본 통계
                cur.execute("""
                    SELECT 
                        COUNT(*) as total_workers,
                        COUNT(*) FILTER (WHERE status = 'ACTIVE') as active_workers,
                        COUNT(DISTINCT team_id) as department_count,
                        COUNT(DISTINCT shift_group) as shift_count
                    FROM spacepro.sp_employee
                """)
                stats = cur.fetchone()
                
                # 스킬 레벨별 분포
                cur.execute("""
                    SELECT skill_level, COUNT(*) as count
                    FROM spacepro.sp_employee
                    WHERE status = 'ACTIVE'
                    GROUP BY skill_level
                    ORDER BY skill_level
                """)
                skill_distribution = cur.fetchall()
                
                # 팀별 분포
                cur.execute("""
                    SELECT t.team_name as department, COUNT(e.employee_id) as count
                    FROM spacepro.sp_employee e
                    LEFT JOIN spacepro.sp_team t ON e.team_id = t.team_id
                    WHERE e.status = 'ACTIVE'
                    GROUP BY t.team_name
                    ORDER BY count DESC
                    LIMIT 10
                """)
                dept_distribution = cur.fetchall()
                
                return {
                    "summary": stats,
                    "skill_distribution": skill_distribution,
                    "department_distribution": dept_distribution
                }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/list")
async def list_workers(
    team_id: int = None,
    department: str = None,
    skill_level: str = None,
    shift_group: str = None,
    is_active: bool = True
):
    """
    작업자 목록 조회
    필터: team_id, department, skill_level, shift_group, is_active
    """
    try:
        with get_db_connection() as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                query = """
                    SELECT e.employee_id as id, 
                           e.employee_id as worker_code, 
                           e.korean_name as worker_name,
                           COALESCE(t.team_name, '') as department,
                           e.position,
                           e.shift_group,
                           e.skill_level,
                           e.is_active,
                           e.created_at, 
                           e.updated_at,
                           e.team_id, 
                           e.phone, 
                           e.hire_date,
                           t.team_type,
                           b.bench_name,
                           s.site_name
                    FROM spacepro.sp_employee e
                    LEFT JOIN spacepro.sp_team t ON e.team_id = t.team_id
                    LEFT JOIN spacepro.sp_bench_mst b ON t.bench_id = b.bench_id
                    LEFT JOIN spacepro.sp_site_mst s ON b.site_id = s.site_id
                    WHERE 1=1
                """
                params = []
                
                if team_id:
                    query += " AND e.team_id = %s"
                    params.append(team_id)
                if department:
                    query += " AND t.team_name = %s"
                    params.append(department)
                if skill_level:
                    query += " AND e.skill_level = %s"
                    params.append(skill_level)
                if shift_group:
                    query += " AND e.shift_group = %s"
                    params.append(shift_group)
                if is_active:
                    query += " AND e.status = 'ACTIVE'"
                else:
                    query += " AND e.status != 'ACTIVE'"
                    
                query += " ORDER BY t.team_name, e.employee_id LIMIT 500"
                
                cur.execute(query, params)
                rows = cur.fetchall()
                
                return {
                    "workers": rows,
                    "total": len(rows)
                }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/teams")
async def get_teams():
    """팀 목록 조회 (계층구조 포함)"""
    try:
        with get_db_connection() as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute("""
                    SELECT t.team_id, t.team_code, t.team_name, 
                           t.team_type, t.path,
                           t.bench_id, b.bench_name,
                           s.site_id, s.site_name,
                           COUNT(e.employee_id) as worker_count
                    FROM spacepro.sp_team t
                    LEFT JOIN spacepro.sp_bench_mst b ON t.bench_id = b.bench_id
                    LEFT JOIN spacepro.sp_site_mst s ON b.site_id = s.site_id
                    LEFT JOIN spacepro.sp_employee e ON t.team_id = e.team_id AND e.status = 'ACTIVE'
                    WHERE t.is_active = true
                    GROUP BY t.team_id, t.team_code, t.team_name, t.team_type, t.path,
                             t.bench_id, b.bench_name, s.site_id, s.site_name
                    ORDER BY t.path
                """)
                return cur.fetchall()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/departments")
async def get_departments():
    """팀(분임조) 목록 조회 - 호환성용"""
    try:
        with get_db_connection() as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute("""
                    SELECT t.team_name as department, COUNT(e.employee_id) as worker_count
                    FROM spacepro.sp_team t
                    LEFT JOIN spacepro.sp_employee e ON t.team_id = e.team_id AND e.status = 'ACTIVE'
                    WHERE t.team_type = 'TEAM' AND t.is_active = true
                    GROUP BY t.team_name
                    ORDER BY t.team_name
                """)
                return cur.fetchall()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/skill-levels")
async def get_skill_levels():
    """스킬 레벨 목록 조회"""
    try:
        with get_db_connection() as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute("""
                    SELECT DISTINCT skill_level, COUNT(*) as worker_count
                    FROM spacepro.sp_employee
                    WHERE status = 'ACTIVE' AND skill_level IS NOT NULL
                    GROUP BY skill_level
                    ORDER BY skill_level
                """)
                return cur.fetchall()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/shifts")
async def get_shifts():
    """교대조 목록 조회"""
    try:
        with get_db_connection() as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute("""
                    SELECT DISTINCT shift_group, COUNT(*) as worker_count
                    FROM spacepro.sp_employee
                    WHERE status = 'ACTIVE' AND shift_group IS NOT NULL
                    GROUP BY shift_group
                    ORDER BY shift_group
                """)
                return cur.fetchall()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/hierarchy")
async def get_hierarchy():
    """사업장 > 작업장 > 공정 > 팀 계층구조 조회"""
    try:
        with get_db_connection() as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                # 사이트 목록
                cur.execute("""
                    SELECT site_id, site_name FROM spacepro.sp_site_mst ORDER BY site_id
                """)
                sites = cur.fetchall()
                
                # 작업장 목록
                cur.execute("""
                    SELECT bench_id, bench_name, site_id FROM spacepro.sp_bench_mst ORDER BY bench_id
                """)
                benches = cur.fetchall()
                
                # 공정/팀 목록
                cur.execute("""
                    SELECT team_id, team_code, team_name, team_type, parent_team_id, bench_id, path
                    FROM spacepro.sp_team
                    WHERE is_active = true
                    ORDER BY path
                """)
                teams = cur.fetchall()
                
                return {
                    "sites": sites,
                    "benches": benches,
                    "teams": teams
                }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/{employee_id}")
async def get_worker(employee_id: str):
    """작업자 상세 조회"""
    try:
        with get_db_connection() as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute("""
                    SELECT e.employee_id as id, 
                           e.employee_id as worker_code, 
                           e.korean_name as worker_name,
                           t.team_name as department, 
                           e.position,
                           e.shift_group, 
                           e.skill_level,
                           e.is_active,
                           e.created_at, 
                           e.updated_at,
                           e.team_id, 
                           e.phone, 
                           e.hire_date,
                           t.team_type,
                           b.bench_name,
                           s.site_name
                    FROM spacepro.sp_employee e
                    LEFT JOIN spacepro.sp_team t ON e.team_id = t.team_id
                    LEFT JOIN spacepro.sp_bench_mst b ON t.bench_id = b.bench_id
                    LEFT JOIN spacepro.sp_site_mst s ON b.site_id = s.site_id
                    WHERE e.employee_id = %s
                """, (employee_id,))
                row = cur.fetchone()
                
                if not row:
                    raise HTTPException(status_code=404, detail="Worker not found")
                    
                return row
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("")
async def create_worker(request: dict):
    """
    작업자 등록
    
    Request:
    {
        "employee_id": "EMP0101",
        "korean_name": "김철수",
        "team_id": 1,
        "position": "작업자",
        "shift_group": "DAY",
        "skill_level": "SENIOR",
        "phone": "010-1234-5678"
    }
    """
    try:
        employee_id = request.get('employee_id') or request.get('worker_code')
        korean_name = request.get('korean_name') or request.get('worker_name')
        
        if not employee_id or not korean_name:
            raise HTTPException(status_code=400, detail="employee_id and korean_name are required")
        
        with get_db_connection() as conn:
            with conn.cursor() as cur:
                cur.execute("""
                    INSERT INTO spacepro.sp_employee 
                    (employee_id, korean_name, team_id, position, shift_group, skill_level, status, phone, hire_date)
                    VALUES (%s, %s, %s, %s, %s, %s, 'ACTIVE', %s, CURRENT_DATE)
                    RETURNING employee_id
                """, (
                    employee_id,
                    korean_name,
                    request.get('team_id'),
                    request.get('position', '작업자'),
                    request.get('shift_group', 'DAY'),
                    request.get('skill_level', 'JUNIOR'),
                    request.get('phone')
                ))
                new_id = cur.fetchone()[0]
                conn.commit()
                
        return {"success": True, "id": new_id, "worker_code": employee_id}
    except HTTPException:
        raise
    except Exception as e:
        if 'duplicate key' in str(e).lower() or 'unique' in str(e).lower():
            raise HTTPException(status_code=409, detail=f"Employee {employee_id} already exists")
        raise HTTPException(status_code=500, detail=str(e))


@router.put("/{employee_id}")
async def update_worker(employee_id: str, request: dict):
    """작업자 정보 수정"""
    try:
        with get_db_connection() as conn:
            with conn.cursor() as cur:
                # Build dynamic update
                updates = []
                params = []
                
                if request.get('korean_name') or request.get('worker_name'):
                    updates.append("korean_name = %s")
                    params.append(request.get('korean_name') or request.get('worker_name'))
                if request.get('team_id') is not None:
                    updates.append("team_id = %s")
                    params.append(request['team_id'])
                if request.get('position'):
                    updates.append("position = %s")
                    params.append(request['position'])
                if request.get('shift_group'):
                    updates.append("shift_group = %s")
                    params.append(request['shift_group'])
                if request.get('skill_level'):
                    updates.append("skill_level = %s")
                    params.append(request['skill_level'])
                if request.get('phone'):
                    updates.append("phone = %s")
                    params.append(request['phone'])
                if request.get('is_active') is not None:
                    updates.append("status = %s")
                    params.append('ACTIVE' if request['is_active'] else 'INACTIVE')
                    
                if not updates:
                    raise HTTPException(status_code=400, detail="No fields to update")
                
                updates.append("updated_at = NOW()")
                params.append(employee_id)
                
                query = f"""
                    UPDATE spacepro.sp_employee 
                    SET {', '.join(updates)}
                    WHERE employee_id = %s
                    RETURNING employee_id
                """
                
                cur.execute(query, params)
                result = cur.fetchone()
                
                if not result:
                    raise HTTPException(status_code=404, detail="Worker not found")
                    
                conn.commit()
                
        return {"success": True, "worker_code": employee_id}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.delete("/{employee_id}")
async def delete_worker(employee_id: str, hard_delete: bool = False):
    """
    작업자 삭제
    hard_delete=false: 비활성화 (soft delete - status='INACTIVE')
    hard_delete=true: 완전 삭제
    """
    try:
        with get_db_connection() as conn:
            with conn.cursor() as cur:
                if hard_delete:
                    cur.execute("""
                        DELETE FROM spacepro.sp_employee 
                        WHERE employee_id = %s
                        RETURNING employee_id
                    """, (employee_id,))
                else:
                    cur.execute("""
                        UPDATE spacepro.sp_employee 
                        SET status = 'INACTIVE', updated_at = NOW()
                        WHERE employee_id = %s
                        RETURNING employee_id
                    """, (employee_id,))
                
                result = cur.fetchone()
                
                if not result:
                    raise HTTPException(status_code=404, detail="Worker not found")
                    
                conn.commit()
                
        return {"success": True, "worker_code": employee_id, "hard_delete": hard_delete}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
