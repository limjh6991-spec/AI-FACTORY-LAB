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
    prcode: str = None
):
    """
    세부공정 목록 조회
    필터: contno, macode, prcode
    """
    try:
        with get_db_connection() as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                query = """
                    SELECT 
                        contno, macode, prcode, prname, pr_seq,
                        prname_detail, pr_detail_seq,
                        worker, working_time, working_day,
                        eqp_type_id, eqp_id, eqp_name
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
                if prcode:
                    query += " AND prcode = %s"
                    params.append(prcode)
                    
                query += " ORDER BY pr_seq, pr_detail_seq LIMIT 500"
                
                cur.execute(query, params)
                rows = cur.fetchall()
                
                return {
                    "details": rows,
                    "total": len(rows)
                }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/contracts")
async def get_contracts():
    """계약 목록"""
    try:
        with get_db_connection() as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute("""
                    SELECT DISTINCT contno, COUNT(*) as detail_count
                    FROM spacepro.sp_prcode_detail_info
                    WHERE contno != '계약코드'
                    GROUP BY contno
                    ORDER BY contno
                """)
                return cur.fetchall()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/products")
async def get_products(contno: str = None):
    """제품 목록 (계약 필터)"""
    try:
        with get_db_connection() as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                query = """
                    SELECT DISTINCT macode, COUNT(*) as detail_count
                    FROM spacepro.sp_prcode_detail_info
                    WHERE contno != '계약코드'
                """
                params = []
                if contno:
                    query += " AND contno = %s"
                    params.append(contno)
                query += " GROUP BY macode ORDER BY macode"
                
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
    """세부공정 저장 (생성/수정)"""
    try:
        with get_db_connection() as conn:
            with conn.cursor() as cur:
                contno = request.get('contno')
                macode = request.get('macode')
                prcode = request.get('prcode')
                prname_detail = request.get('prname_detail')
                
                # Check if exists
                cur.execute("""
                    SELECT 1 FROM spacepro.sp_prcode_detail_info
                    WHERE contno = %s AND macode = %s AND prcode = %s AND prname_detail = %s
                """, (contno, macode, prcode, prname_detail))
                
                if cur.fetchone():
                    # Update
                    cur.execute("""
                        UPDATE spacepro.sp_prcode_detail_info
                        SET worker = %s, working_time = %s, working_day = %s,
                            eqp_type_id = %s, eqp_id = %s, eqp_name = %s
                        WHERE contno = %s AND macode = %s AND prcode = %s AND prname_detail = %s
                    """, (
                        request.get('worker'),
                        request.get('working_time'),
                        request.get('working_day'),
                        request.get('eqp_type_id'),
                        request.get('eqp_id'),
                        request.get('eqp_name'),
                        contno, macode, prcode, prname_detail
                    ))
                else:
                    # Insert
                    cur.execute("""
                        INSERT INTO spacepro.sp_prcode_detail_info
                        (contno, macode, prcode, prname, pr_seq, prname_detail, pr_detail_seq,
                         worker, working_time, working_day, eqp_type_id, eqp_id, eqp_name)
                        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
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
                
                conn.commit()
                return {"success": True}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.delete("/{contno}/{macode}/{prcode}/{prname_detail}")
async def delete_detail(contno: str, macode: str, prcode: str, prname_detail: str):
    """세부공정 삭제"""
    try:
        with get_db_connection() as conn:
            with conn.cursor() as cur:
                cur.execute("""
                    DELETE FROM spacepro.sp_prcode_detail_info
                    WHERE contno = %s AND macode = %s AND prcode = %s AND prname_detail = %s
                """, (contno, macode, prcode, prname_detail))
                conn.commit()
                
                if cur.rowcount == 0:
                    raise HTTPException(status_code=404, detail="Detail not found")
                    
                return {"success": True}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
