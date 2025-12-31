"""
Routing Router - 공정 라우팅 관련 API
"""
from fastapi import APIRouter, HTTPException
from psycopg2.extras import RealDictCursor
from typing import Optional
from contextlib import contextmanager
import psycopg2

router = APIRouter(prefix="/routing", tags=["routing"])

# Database connection
@contextmanager
def get_db_connection():
    conn = psycopg2.connect(
        host="localhost",
        database="ai_factory_db",
        user="postgres",
        password="postgres"
    )
    try:
        yield conn
    finally:
        conn.close()


@router.get("/items")
async def get_routing_items():
    """라우팅이 있는 품목 목록 조회"""
    try:
        with get_db_connection() as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute("""
                    SELECT DISTINCT item_code 
                    FROM spacepro.tb_routing_mst
                    WHERE status = 'ACTIVE'
                    ORDER BY item_code
                """)
                items = [dict(row) for row in cur.fetchall()]
        return items
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/{item_code}")
async def get_routing(item_code: str, revision: Optional[str] = "1.0"):
    """특정 품목의 라우팅 정보 조회"""
    try:
        with get_db_connection() as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute("""
                    SELECT 
                        op_seq, op_name, workcenter_code, machine_code,
                        setup_time, cycle_time, process_yield,
                        queue_time, move_time
                    FROM spacepro.tb_routing_mst
                    WHERE item_code = %s AND revision = %s AND status = 'ACTIVE'
                    ORDER BY op_seq
                """, (item_code, revision))
                
                routing = []
                for row in cur.fetchall():
                    step = dict(row)
                    step['materials'] = []
                    routing.append(step)
                
                return {
                    'item_code': item_code,
                    'revision': revision,
                    'routing': routing
                }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("")
async def create_routing(request: dict):
    """새 라우팅 생성"""
    try:
        item_code = request.get('item_code')
        revision = request.get('revision', '1.0')
        routing_steps = request.get('routing', [])
        
        if not item_code or not routing_steps:
            raise HTTPException(status_code=400, detail="item_code and routing are required")
        
        with get_db_connection() as conn:
            with conn.cursor() as cur:
                for step in routing_steps:
                    area_num = step.get('op_name', 'area_1').split('_')[1] if '_' in step.get('op_name', '') else '1'
                    workcenter_code = f"WC-AREA-{area_num}"
                    
                    cur.execute("""
                        INSERT INTO spacepro.tb_routing_mst 
                        (item_code, revision, op_seq, op_name, workcenter_code, machine_code,
                         setup_time, cycle_time, process_yield, status, created_at)
                        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, 'ACTIVE', NOW())
                    """, (
                        item_code, revision, step.get('op_seq', 10),
                        step.get('op_name', 'area_1'), workcenter_code,
                        step.get('machine_code', 'EQ-1-01'),
                        step.get('setup_time', 10), step.get('cycle_time', 1),
                        step.get('process_yield', 95)
                    ))
                conn.commit()
        
        return {"success": True, "item_code": item_code, "steps_created": len(routing_steps)}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.put("/{item_code}")
async def update_routing(item_code: str, request: dict):
    """라우팅 수정 (기존 삭제 후 재생성)"""
    try:
        revision = request.get('revision', '1.0')
        routing_steps = request.get('routing', [])
        
        if not routing_steps:
            raise HTTPException(status_code=400, detail="routing is required")
        
        with get_db_connection() as conn:
            with conn.cursor() as cur:
                cur.execute("""
                    DELETE FROM spacepro.tb_routing_mst 
                    WHERE item_code = %s AND revision = %s
                """, (item_code, revision))
                
                for step in routing_steps:
                    area_num = step.get('op_name', 'area_1').split('_')[1] if '_' in step.get('op_name', '') else '1'
                    workcenter_code = f"WC-AREA-{area_num}"
                    
                    cur.execute("""
                        INSERT INTO spacepro.tb_routing_mst 
                        (item_code, revision, op_seq, op_name, workcenter_code, machine_code,
                         setup_time, cycle_time, process_yield, status, created_at)
                        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, 'ACTIVE', NOW())
                    """, (
                        item_code, revision, step.get('op_seq', 10),
                        step.get('op_name', 'area_1'), workcenter_code,
                        step.get('machine_code', 'EQ-1-01'),
                        step.get('setup_time', 10), step.get('cycle_time', 1),
                        step.get('process_yield', 95)
                    ))
                conn.commit()
        
        return {"success": True, "item_code": item_code, "steps_updated": len(routing_steps)}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.delete("/{item_code}")
async def delete_routing(item_code: str, revision: Optional[str] = "1.0"):
    """라우팅 삭제"""
    try:
        with get_db_connection() as conn:
            with conn.cursor() as cur:
                cur.execute("""
                    DELETE FROM spacepro.tb_routing_mst 
                    WHERE item_code = %s AND revision = %s
                """, (item_code, revision))
                deleted = cur.rowcount
                conn.commit()
        
        return {"success": True, "item_code": item_code, "deleted_steps": deleted}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
