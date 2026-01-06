"""
Worker Router - 작업자 관리 CRUD API
Adapted for existing tb_worker_mst schema
"""
from fastapi import APIRouter, HTTPException
from psycopg2.extras import RealDictCursor
from contextlib import contextmanager
import psycopg2

router = APIRouter(prefix="/worker", tags=["worker"])

# Database connection
@contextmanager
def get_db_connection():
    conn = psycopg2.connect(
        host='localhost',
        database='ai_factory_db',
        user='postgres',
        password='postgres'
    )
    try:
        yield conn
    finally:
        conn.close()


# Note: Route order matters - specific routes before parameterized routes

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
                        COUNT(DISTINCT skill_level) as shift_count
                    FROM spacepro.tb_worker_mst
                """)
                stats = cur.fetchone()
                
                # 스킬 레벨별 분포
                cur.execute("""
                    SELECT skill_level, COUNT(*) as count
                    FROM spacepro.tb_worker_mst
                    WHERE status = 'ACTIVE'
                    GROUP BY skill_level
                    ORDER BY skill_level
                """)
                skill_distribution = cur.fetchall()
                
                # 팀별 분포
                cur.execute("""
                    SELECT t.team_name as department, COUNT(w.worker_id) as count
                    FROM spacepro.tb_worker_mst w
                    LEFT JOIN spacepro.tb_team_mst t ON w.team_id = t.team_id
                    WHERE w.status = 'ACTIVE'
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
    skill_level: str = None,
    is_active: bool = True
):
    """
    작업자 목록 조회
    필터: team_id, skill_level, is_active (status='ACTIVE')
    """
    try:
        with get_db_connection() as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                query = """
                    SELECT w.worker_id as id, w.worker_code, w.worker_name, 
                           t.team_name as department, '' as position, 
                           '' as shift_group, w.skill_level,
                           (w.status = 'ACTIVE') as is_active, 
                           w.created_at, w.updated_at,
                           w.team_id, w.phone, w.hire_date
                    FROM spacepro.tb_worker_mst w
                    LEFT JOIN spacepro.tb_team_mst t ON w.team_id = t.team_id
                    WHERE 1=1
                """
                params = []
                
                if team_id:
                    query += " AND w.team_id = %s"
                    params.append(team_id)
                if skill_level:
                    query += " AND w.skill_level = %s"
                    params.append(skill_level)
                if is_active:
                    query += " AND w.status = 'ACTIVE'"
                else:
                    query += " AND w.status != 'ACTIVE'"
                    
                query += " ORDER BY t.team_name, w.worker_code LIMIT 500"
                
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
    """팀 목록 조회"""
    try:
        with get_db_connection() as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute("""
                    SELECT t.team_id, t.team_code, t.team_name, 
                           t.shift_type, t.work_area,
                           COUNT(w.worker_id) as worker_count,
                           l.worker_name as leader_name
                    FROM spacepro.tb_team_mst t
                    LEFT JOIN spacepro.tb_worker_mst w ON t.team_id = w.team_id AND w.status = 'ACTIVE'
                    LEFT JOIN spacepro.tb_worker_mst l ON t.leader_id = l.worker_id
                    GROUP BY t.team_id, t.team_code, t.team_name, t.shift_type, t.work_area, l.worker_name
                    ORDER BY t.team_code
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
                    SELECT t.team_name as department, COUNT(w.worker_id) as worker_count
                    FROM spacepro.tb_team_mst t
                    LEFT JOIN spacepro.tb_worker_mst w ON t.team_id = w.team_id AND w.status = 'ACTIVE'
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
                    FROM spacepro.tb_worker_mst
                    WHERE status = 'ACTIVE' AND skill_level IS NOT NULL
                    GROUP BY skill_level
                    ORDER BY skill_level
                """)
                return cur.fetchall()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/shifts")
async def get_shifts():
    """교대조(팀 shift_type) 목록 조회"""
    try:
        with get_db_connection() as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute("""
                    SELECT t.shift_type as shift_group, COUNT(w.worker_id) as worker_count
                    FROM spacepro.tb_team_mst t
                    LEFT JOIN spacepro.tb_worker_mst w ON t.team_id = w.team_id AND w.status = 'ACTIVE'
                    WHERE t.shift_type IS NOT NULL
                    GROUP BY t.shift_type
                    ORDER BY t.shift_type
                """)
                return cur.fetchall()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/bulk-create")
async def bulk_create_workers(request: dict):
    """
    작업자 및 팀 일괄 등록 (샘플 데이터 생성용)
    
    Request:
    {
        "count": 100,
        "department_prefix": "TEAM",
        "team_size": 5
    }
    """
    try:
        count = request.get('count', 100)
        dept_prefix = request.get('department_prefix', 'TEAM')
        team_size = request.get('team_size', 5)
        
        skill_levels = ['JUNIOR', 'INTER', 'SENIOR', 'EXPERT']  # INTER for varchar(10)
        shifts = ['DAY', 'NIGHT', 'SWING']
        work_areas = ['AREA-1', 'AREA-2', 'AREA-3', 'AREA-4', 'AREA-5']
        
        num_teams = (count + team_size - 1) // team_size
        created_teams = 0
        created_workers = 0
        
        with get_db_connection() as conn:
            conn.autocommit = False
            with conn.cursor() as cur:
                # 1. 팀 생성 (ON CONFLICT 사용하므로 에러 없음)
                team_ids = {}
                for t in range(num_teams):
                    team_letter = chr(ord('A') + (t % 26))
                    if t >= 26:
                        team_letter = chr(ord('A') + (t // 26 - 1)) + team_letter
                    team_code = f"{dept_prefix}-{team_letter}"
                    team_name = f"{dept_prefix} {team_letter}조"
                    
                    cur.execute("""
                        INSERT INTO spacepro.tb_team_mst 
                        (team_code, team_name, shift_type, dept_code)
                        VALUES (%s, %s, %s, %s)
                        ON CONFLICT (team_code) DO UPDATE SET team_name = EXCLUDED.team_name
                        RETURNING team_id
                    """, (
                        team_code,
                        team_name,
                        shifts[t % 3],
                        f"DEPT-{(t % 5) + 1}"  # dept_code instead of work_area
                    ))
                    result = cur.fetchone()
                    if result:
                        team_ids[t] = result[0]
                        created_teams += 1
                
                # 2. 작업자 생성 (ON CONFLICT DO NOTHING 사용)
                for i in range(count):
                    team_idx = i // team_size
                    team_id = team_ids.get(team_idx)
                    
                    worker_code = f"WRK-{str(i+1).zfill(4)}"
                    worker_name = f"작업자{i+1}"
                    skill_idx = i % 4
                    
                    cur.execute("""
                        INSERT INTO spacepro.tb_worker_mst 
                        (worker_code, worker_name, team_id, skill_level, status, hire_date)
                        VALUES (%s, %s, %s, %s, 'ACTIVE', CURRENT_DATE - INTERVAL '%s days')
                        ON CONFLICT (worker_code) DO NOTHING
                    """, (
                        worker_code,
                        worker_name,
                        team_id,
                        skill_levels[skill_idx],
                        i * 30  # 입사일 분산
                    ))
                    created_workers += cur.rowcount
                        
                conn.commit()
                
        return {
            "success": True, 
            "created_teams": created_teams,
            "created_workers": created_workers, 
            "requested": count
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/{worker_code}")
async def get_worker(worker_code: str):
    """작업자 상세 조회"""
    try:
        with get_db_connection() as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute("""
                    SELECT w.worker_id as id, w.worker_code, w.worker_name,
                           t.team_name as department, '' as position,
                           t.shift_type as shift_group, w.skill_level,
                           (w.status = 'ACTIVE') as is_active,
                           w.created_at, w.updated_at,
                           w.team_id, w.phone, w.hire_date
                    FROM spacepro.tb_worker_mst w
                    LEFT JOIN spacepro.tb_team_mst t ON w.team_id = t.team_id
                    WHERE w.worker_code = %s
                """, (worker_code,))
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
        "worker_code": "WRK-001",
        "worker_name": "김철수",
        "team_id": 1,
        "skill_level": "SENIOR",
        "phone": "010-1234-5678"
    }
    """
    try:
        worker_code = request.get('worker_code')
        worker_name = request.get('worker_name')
        
        if not worker_code or not worker_name:
            raise HTTPException(status_code=400, detail="worker_code and worker_name are required")
        
        with get_db_connection() as conn:
            with conn.cursor() as cur:
                cur.execute("""
                    INSERT INTO spacepro.tb_worker_mst 
                    (worker_code, worker_name, team_id, skill_level, status, phone, hire_date)
                    VALUES (%s, %s, %s, %s, 'ACTIVE', %s, CURRENT_DATE)
                    RETURNING worker_id
                """, (
                    worker_code,
                    worker_name,
                    request.get('team_id'),
                    request.get('skill_level', 'JUNIOR'),
                    request.get('phone')
                ))
                new_id = cur.fetchone()[0]
                conn.commit()
                
        return {"success": True, "id": new_id, "worker_code": worker_code}
    except HTTPException:
        raise
    except Exception as e:
        if 'duplicate key' in str(e).lower() or 'unique' in str(e).lower():
            raise HTTPException(status_code=409, detail=f"Worker code {worker_code} already exists")
        raise HTTPException(status_code=500, detail=str(e))


@router.put("/{worker_code}")
async def update_worker(worker_code: str, request: dict):
    """작업자 정보 수정"""
    try:
        with get_db_connection() as conn:
            with conn.cursor() as cur:
                # Build dynamic update
                updates = []
                params = []
                
                if request.get('worker_name'):
                    updates.append("worker_name = %s")
                    params.append(request['worker_name'])
                if request.get('team_id') is not None:
                    updates.append("team_id = %s")
                    params.append(request['team_id'])
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
                params.append(worker_code)
                
                query = f"""
                    UPDATE spacepro.tb_worker_mst 
                    SET {', '.join(updates)}
                    WHERE worker_code = %s
                    RETURNING worker_id
                """
                
                cur.execute(query, params)
                result = cur.fetchone()
                
                if not result:
                    raise HTTPException(status_code=404, detail="Worker not found")
                    
                conn.commit()
                
        return {"success": True, "worker_code": worker_code}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.delete("/{worker_code}")
async def delete_worker(worker_code: str, hard_delete: bool = False):
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
                        DELETE FROM spacepro.tb_worker_mst 
                        WHERE worker_code = %s
                        RETURNING worker_id
                    """, (worker_code,))
                else:
                    cur.execute("""
                        UPDATE spacepro.tb_worker_mst 
                        SET status = 'INACTIVE', updated_at = NOW()
                        WHERE worker_code = %s
                        RETURNING worker_id
                    """, (worker_code,))
                
                result = cur.fetchone()
                
                if not result:
                    raise HTTPException(status_code=404, detail="Worker not found")
                    
                conn.commit()
                
        return {"success": True, "worker_code": worker_code, "hard_delete": hard_delete}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
