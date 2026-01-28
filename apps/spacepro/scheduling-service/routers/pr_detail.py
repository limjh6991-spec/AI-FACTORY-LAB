"""
Process Detail Router - 세부공정정보 관리 API
sp_prcode_detail_info 테이블 CRUD with hierarchy support
"""
from fastapi import APIRouter, HTTPException
from psycopg2.extras import RealDictCursor
from contextlib import contextmanager
import psycopg2
import os

router = APIRouter(prefix="/pr-detail", tags=["pr-detail"])

@contextmanager
def get_db_connection():
    conn = psycopg2.connect(
        host=os.getenv('DB_HOST', 'db'),
        port=os.getenv('DB_PORT', '5432'),
        database=os.getenv('DB_NAME', 'spacepro'),
        user=os.getenv('DB_USER', 'postgres'),
        password=os.getenv('DB_PASSWORD', 'postgres')
    )
    try:
        yield conn
    finally:
        conn.close()


def log_change(cur, entity_type: str, entity_id: str, change_type: str, 
               contno: str = None, macode: str = None, 
               field_name: str = None, old_value = None, new_value = None,
               description: str = None, changed_by: str = 'system'):
    """변경 이력 로깅"""
    try:
        cur.execute("""
            INSERT INTO spacepro.sp_change_log 
            (entity_type, entity_id, change_type, field_name, old_value, new_value, 
             contno, macode, description, changed_by)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """, (
            entity_type, entity_id, change_type, field_name, 
            str(old_value) if old_value is not None else None,
            str(new_value) if new_value is not None else None,
            contno, macode, description, changed_by
        ))
    except Exception as e:
        print(f"Warning: Failed to log change: {e}")



@router.get("/summary")
async def get_summary():
    """세부공정 통계 요약"""
    try:
        with get_db_connection() as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute("""
                    SELECT 
                        COUNT(*) as total_details,
                        COUNT(DISTINCT contno) as contract_count,
                        COUNT(DISTINCT macode) as product_count,
                        COUNT(DISTINCT prcode) as process_count,
                        COALESCE(SUM(worker), 0) as total_workers,
                        COALESCE(AVG(working_time), 0) as avg_working_time
                    FROM spacepro.sp_prcode_detail_info
                    WHERE contno != '계약코드'
                """)
                stats = cur.fetchone()
                return {"summary": stats}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/hierarchy")
async def get_hierarchy():
    """계약 → 제품 → 공정 계층 데이터"""
    try:
        with get_db_connection() as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                # 계약 목록
                cur.execute("""
                    SELECT DISTINCT contno, 
                           COUNT(DISTINCT macode) as product_count
                    FROM spacepro.sp_prcode_detail_info
                    WHERE contno != '계약코드'
                    GROUP BY contno
                    ORDER BY contno
                """)
                contracts = cur.fetchall()
                
                # 제품 목록 (계약별)
                cur.execute("""
                    SELECT DISTINCT contno, macode,
                           COUNT(DISTINCT prcode) as process_count
                    FROM spacepro.sp_prcode_detail_info
                    WHERE contno != '계약코드'
                    GROUP BY contno, macode
                    ORDER BY contno, macode
                """)
                products = cur.fetchall()
                
                # 공정 목록 (제품별)
                cur.execute("""
                    SELECT DISTINCT contno, macode, prcode, prname,
                           COUNT(*) as detail_count
                    FROM spacepro.sp_prcode_detail_info
                    WHERE contno != '계약코드'
                    GROUP BY contno, macode, prcode, prname
                    ORDER BY contno, macode, pr_seq
                """)
                processes = cur.fetchall()
                
                return {
                    "contracts": contracts,
                    "products": products,
                    "processes": processes
                }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/list")
async def list_details(
    contno: str = None,
    macode: str = None,
    prcode: str = None,
    include_children: bool = True
):
    """
    세부공정 목록 조회
    필터: contno, macode, prcode
    include_children: True인 경우 선택된 macode의 자식 제품도 함께 조회 (wbs_vid prefix 매칭)
    """
    try:
        with get_db_connection() as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                # macode 선택 시 해당 제품의 wbs_vid를 먼저 조회하여 자식 제품도 포함
                parent_wbs_vid = None
                if macode and include_children and contno:
                    cur.execute("""
                        SELECT wbs_vid FROM spacepro.sp_macode_info 
                        WHERE contno = %s AND macode = %s
                    """, (contno, macode))
                    row = cur.fetchone()
                    if row and row.get('wbs_vid'):
                        parent_wbs_vid = row['wbs_vid']
                
                query = """
                    SELECT 
                        p.contno, p.macode, p.prcode, p.prname, p.pr_seq,
                        p.prname_detail, p.pr_detail_seq,
                        p.worker, p.working_time, p.working_day,
                        p.eqp_type_id, p.eqp_id, p.eqp_name,
                        COALESCE(m.wbs_vid, '') as wbs_vid,
                        COALESCE(m.maname, p.macode) as maname
                    FROM spacepro.sp_prcode_detail_info p
                    LEFT JOIN spacepro.sp_macode_info m 
                        ON p.contno = m.contno AND p.macode = m.macode
                    WHERE p.contno != '계약코드'
                """
                params = []
                
                if contno:
                    query += " AND p.contno = %s"
                    params.append(contno)
                
                # macode 필터 - 자식 제품 포함 옵션
                if macode:
                    if parent_wbs_vid and include_children:
                        # 부모 wbs_vid로 시작하는 모든 제품 (예: 1.2 → 1.2, 1.2.1, 1.2.2, ...)
                        query += " AND (p.macode = %s OR m.wbs_vid LIKE %s)"
                        params.append(macode)
                        params.append(parent_wbs_vid + '.%')
                    else:
                        query += " AND p.macode = %s"
                        params.append(macode)
                
                if prcode:
                    query += " AND p.prcode = %s"
                    params.append(prcode)
                    
                query += " ORDER BY m.wbs_vid NULLS LAST, p.pr_seq, p.pr_detail_seq LIMIT 500"
                
                cur.execute(query, params)
                rows = cur.fetchall()
                
                return {
                    "details": rows,
                    "total": len(rows)
                }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/teams")
async def get_teams():
    """사업팀 목록"""
    try:
        with get_db_connection() as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute("""
                    SELECT DISTINCT 
                        t.undertaking_team_id as team_id,
                        t.undertaking_team_name as team_name,
                        COUNT(DISTINCT p.contno) as contract_count
                    FROM spacepro.sp_undertaking_team_mst t
                    LEFT JOIN spacepro.sp_contract_info c ON t.undertaking_team_id = c.undertaking_team_id
                    LEFT JOIN spacepro.sp_prcode_detail_info p ON c.contno = p.contno
                    GROUP BY t.undertaking_team_id, t.undertaking_team_name
                    ORDER BY t.undertaking_team_name
                """)
                return cur.fetchall()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/contracts")
async def get_contracts(team_id: str = None):
    """계약 목록 (팀 필터 포함) - contid(사업명) 포함"""
    try:
        with get_db_connection() as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                query = """
                    SELECT DISTINCT 
                        p.contno, 
                        COALESCE(m.contid, p.contno) as contid,
                        COUNT(*) as detail_count
                    FROM spacepro.sp_prcode_detail_info p
                    LEFT JOIN (
                        SELECT DISTINCT contno, contid 
                        FROM spacepro.sp_macode_info
                    ) m ON p.contno = m.contno
                """
                params = []
                
                if team_id:
                    query += """
                        JOIN spacepro.sp_contract_info c ON p.contno = c.contno
                        WHERE c.undertaking_team_id = %s AND p.contno != '계약코드'
                    """
                    params.append(team_id)
                else:
                    query += " WHERE p.contno != '계약코드'"
                    
                query += " GROUP BY p.contno, m.contid ORDER BY p.contno"
                cur.execute(query, params)
                return cur.fetchall()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/products")
async def get_products(contno: str = None, parents_only: bool = True):
    """
    제품 목록 (계약 필터, wbs_vid 포함, maname 포함)
    parents_only=True: 부모 제품만 반환 (wbs_vid depth <= 2, 예: 1.1, 1.2)
    """
    try:
        with get_db_connection() as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                query = """
                    SELECT 
                        p.macode, 
                        COALESCE(m.maname, p.macode) as maname,
                        COALESCE(m.wbs_vid, '') as wbs_vid,
                        COUNT(*) as detail_count
                    FROM spacepro.sp_prcode_detail_info p
                    LEFT JOIN spacepro.sp_macode_info m 
                        ON p.contno = m.contno AND p.macode = m.macode
                    WHERE p.contno != '계약코드'
                """
                params = []
                if contno:
                    query += " AND p.contno = %s"
                    params.append(contno)
                
                # 부모 제품만 필터링 (wbs_vid가 '1.X' 형태, 즉 . 개수가 1개인 것)
                if parents_only:
                    query += " AND (m.wbs_vid IS NULL OR array_length(string_to_array(m.wbs_vid, '.'), 1) <= 2)"
                
                query += """ 
                    GROUP BY p.macode, m.maname, m.wbs_vid 
                    ORDER BY m.wbs_vid NULLS LAST, p.macode
                """
                
                cur.execute(query, params)
                return cur.fetchall()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/processes")
async def get_processes(contno: str = None, macode: str = None):
    """공정 목록 (계약/제품 필터)"""
    try:
        with get_db_connection() as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                query = """
                    SELECT DISTINCT prcode, prname, COUNT(*) as detail_count
                    FROM spacepro.sp_prcode_detail_info
                    WHERE contno != '계약코드'
                """
                params = []
                if contno:
                    query += " AND contno = %s"
                    params.append(contno)
                if macode:
                    query += " AND macode = %s"
                    params.append(macode)
                query += " GROUP BY prcode, prname ORDER BY prcode"
                
                cur.execute(query, params)
                return cur.fetchall()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("")
async def save_detail(request: dict):
    """세부공정 저장 (생성/수정) + 변경 이력 로깅"""
    try:
        from psycopg2.extras import RealDictCursor
        
        with get_db_connection() as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                contno = request.get('contno')
                macode = request.get('macode')
                prcode = request.get('prcode')
                prname_detail = request.get('prname_detail')
                entity_id = f"{contno}/{macode}/{prcode}/{prname_detail}"
                
                # Check if exists and get old values
                cur.execute("""
                    SELECT working_day, worker, working_time, eqp_id, eqp_name
                    FROM spacepro.sp_prcode_detail_info
                    WHERE contno = %s AND macode = %s AND prcode = %s AND prname_detail = %s
                """, (contno, macode, prcode, prname_detail))
                
                old_record = cur.fetchone()
                
                if old_record:
                    # Update - log each changed field
                    changed_fields = []
                    
                    # Track important field changes
                    field_mappings = [
                        ('working_day', 'working_day'),
                        ('worker', 'worker'),
                        ('working_time', 'working_time'),
                        ('eqp_id', 'eqp_id'),
                        ('eqp_name', 'eqp_name'),
                    ]
                    
                    for db_field, req_field in field_mappings:
                        old_val = old_record.get(db_field)
                        new_val = request.get(req_field)
                        if str(old_val) != str(new_val) and new_val is not None:
                            log_change(cur, 'ROUTING', entity_id, 'UPDATED',
                                       contno=contno, macode=macode,
                                       field_name=db_field, 
                                       old_value=old_val, new_value=new_val)
                            changed_fields.append(db_field)
                    
                    cur.execute("""
                        UPDATE spacepro.sp_prcode_detail_info
                        SET prname = %s, pr_seq = %s, pr_detail_seq = %s,
                            worker = %s, working_time = %s, working_day = %s,
                            eqp_type_id = %s, eqp_id = %s, eqp_name = %s,
                            sim_sync_status = CASE WHEN %s THEN 'MODIFIED' ELSE sim_sync_status END,
                            change_type = CASE WHEN %s THEN 'ROUTING_UPDATED' ELSE change_type END,
                            updated_at = NOW()
                        WHERE contno = %s AND macode = %s AND prcode = %s AND prname_detail = %s
                    """, (
                        request.get('prname'),
                        request.get('pr_seq', 1),
                        request.get('pr_detail_seq', 1),
                        request.get('worker'),
                        request.get('working_time'),
                        request.get('working_day'),
                        request.get('eqp_type_id'),
                        request.get('eqp_id'),
                        request.get('eqp_name'),
                        len(changed_fields) > 0,  # sim_sync_status = MODIFIED if changed
                        len(changed_fields) > 0,  # change_type = ROUTING_UPDATED if changed
                        contno, macode, prcode, prname_detail
                    ))
                    
                    change_type = 'UPDATED'
                else:
                    # Insert - log creation
                    log_change(cur, 'ROUTING', entity_id, 'CREATED',
                               contno=contno, macode=macode,
                               description=f"세부공정 생성: {prname_detail}")
                    
                    cur.execute("""
                        INSERT INTO spacepro.sp_prcode_detail_info
                        (contno, macode, prcode, prname, pr_seq, prname_detail, pr_detail_seq,
                         worker, working_time, working_day, eqp_type_id, eqp_id, eqp_name,
                         sim_sync_status, change_type)
                        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, 'PENDING', 'NEW_PRODUCT')
                    """, (
                        contno, macode, prcode,
                        request.get('prname'),
                        request.get('pr_seq', 1),
                        prname_detail,
                        request.get('pr_detail_seq', 1),
                        request.get('worker'),
                        request.get('working_time'),
                        request.get('working_day'),
                        request.get('eqp_type_id'),
                        request.get('eqp_id'),
                        request.get('eqp_name')
                    ))
                    
                    change_type = 'CREATED'
                
                conn.commit()
                return {"success": True, "change_type": change_type}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))



@router.delete("/{contno}/{macode}/{prcode}/{prname_detail}")
async def delete_detail(contno: str, macode: str, prcode: str, prname_detail: str):
    """세부공정 삭제 + 변경 이력 로깅"""
    try:
        with get_db_connection() as conn:
            with conn.cursor() as cur:
                entity_id = f"{contno}/{macode}/{prcode}/{prname_detail}"
                
                # Log deletion before deleting
                log_change(cur, 'ROUTING', entity_id, 'DELETED',
                           contno=contno, macode=macode,
                           description=f"세부공정 삭제: {prname_detail}")
                
                cur.execute("""
                    DELETE FROM spacepro.sp_prcode_detail_info
                    WHERE contno = %s AND macode = %s AND prcode = %s AND prname_detail = %s
                """, (contno, macode, prcode, prname_detail))
                
                if cur.rowcount == 0:
                    raise HTTPException(status_code=404, detail="Detail not found")
                
                conn.commit()
                return {"success": True}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/change-log")
async def get_change_log(contno: str = None, macode: str = None, limit: int = 100):
    """변경 이력 조회"""
    try:
        with get_db_connection() as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                query = """
                    SELECT id, entity_type, entity_id, change_type, field_name,
                           old_value, new_value, changed_by, changed_at,
                           contno, macode, description
                    FROM spacepro.sp_change_log
                    WHERE 1=1
                """
                params = []
                
                if contno:
                    query += " AND contno = %s"
                    params.append(contno)
                if macode:
                    query += " AND macode = %s"
                    params.append(macode)
                    
                query += " ORDER BY changed_at DESC LIMIT %s"
                params.append(limit)
                
                cur.execute(query, params)
                logs = cur.fetchall()
                
                return {
                    "logs": logs,
                    "total": len(logs)
                }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/change-log/summary")
async def get_change_log_summary(contno: str = None):
    """변경 이력 요약 (일별 통계)"""
    try:
        with get_db_connection() as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                query = """
                    SELECT 
                        DATE(changed_at) as change_date,
                        COUNT(*) as total_changes,
                        COUNT(*) FILTER (WHERE change_type = 'CREATED') as created_count,
                        COUNT(*) FILTER (WHERE change_type = 'UPDATED') as updated_count,
                        COUNT(*) FILTER (WHERE change_type = 'DELETED') as deleted_count
                    FROM spacepro.sp_change_log
                    WHERE 1=1
                """
                params = []
                
                if contno:
                    query += " AND contno = %s"
                    params.append(contno)
                    
                query += " GROUP BY DATE(changed_at) ORDER BY change_date DESC LIMIT 30"
                
                cur.execute(query, params)
                return cur.fetchall()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

