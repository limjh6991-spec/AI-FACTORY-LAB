"""
Master Data Router - 기준정보 CRUD API
8개 테이블: sp_site_mst, sp_bench_mst, sp_eqp_type, sp_eqp_mst, 
           sp_contract_info, sp_macode_info, sp_pr_detail, sp_material_info
"""
from fastapi import APIRouter, HTTPException, Query
from psycopg2.extras import RealDictCursor
from typing import Optional, List
from contextlib import contextmanager
from pydantic import BaseModel
import psycopg2
import os

router = APIRouter(prefix="/master", tags=["master"])

# Database connection
@contextmanager
def get_db_connection():
    # Docker 환경 체크
    db_host = os.getenv("DB_HOST", "db")
    db_port = int(os.getenv("DB_PORT", "5432"))
    db_name = os.getenv("POSTGRES_DB", "spacepro")
    db_user = os.getenv("POSTGRES_USER", "postgres")
    db_pass = os.getenv("POSTGRES_PASSWORD", "postgres")
    
    conn = psycopg2.connect(
        host=db_host,
        port=db_port,
        database=db_name,
        user=db_user,
        password=db_pass
    )
    try:
        yield conn
    finally:
        conn.close()


# ===== Generic CRUD Functions =====
def get_all(table: str, order_by: str = "id"):
    """테이블 전체 조회"""
    try:
        with get_db_connection() as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute(f"SELECT * FROM spacepro.{table} ORDER BY {order_by}")
                return [dict(row) for row in cur.fetchall()]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


def get_by_id(table: str, id: int):
    """ID로 조회"""
    try:
        with get_db_connection() as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute(f"SELECT * FROM spacepro.{table} WHERE id = %s", (id,))
                row = cur.fetchone()
                if not row:
                    raise HTTPException(status_code=404, detail=f"{table} id={id} not found")
                return dict(row)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


def create_record(table: str, data: dict, exclude_keys: list = None):
    """레코드 생성"""
    if exclude_keys is None:
        exclude_keys = ['id', 'created_at']
    
    filtered = {k: v for k, v in data.items() if k not in exclude_keys and v is not None}
    columns = ', '.join(filtered.keys())
    placeholders = ', '.join(['%s'] * len(filtered))
    values = list(filtered.values())
    
    try:
        with get_db_connection() as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute(f"""
                    INSERT INTO spacepro.{table} ({columns}) 
                    VALUES ({placeholders}) 
                    RETURNING *
                """, values)
                result = dict(cur.fetchone())
                conn.commit()
                return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


def update_record(table: str, id: int, data: dict, exclude_keys: list = None):
    """레코드 수정"""
    if exclude_keys is None:
        exclude_keys = ['id', 'created_at']
    
    filtered = {k: v for k, v in data.items() if k not in exclude_keys}
    set_clause = ', '.join([f"{k} = %s" for k in filtered.keys()])
    values = list(filtered.values()) + [id]
    
    try:
        with get_db_connection() as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute(f"""
                    UPDATE spacepro.{table} 
                    SET {set_clause}
                    WHERE id = %s
                    RETURNING *
                """, values)
                result = cur.fetchone()
                if not result:
                    raise HTTPException(status_code=404, detail=f"{table} id={id} not found")
                conn.commit()
                return dict(result)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


def delete_record(table: str, id: int):
    """레코드 삭제"""
    try:
        with get_db_connection() as conn:
            with conn.cursor() as cur:
                cur.execute(f"DELETE FROM spacepro.{table} WHERE id = %s", (id,))
                if cur.rowcount == 0:
                    raise HTTPException(status_code=404, detail=f"{table} id={id} not found")
                conn.commit()
                return {"success": True, "deleted_id": id}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


def batch_save(table: str, items: list, pk_field: str = "id"):
    """일괄 저장 (Insert/Update/Delete)"""
    try:
        with get_db_connection() as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                created = 0
                updated = 0
                deleted = 0
                
                for item in items:
                    state = item.get('__rowState', 'none')
                    item_data = {k: v for k, v in item.items() if not k.startswith('__')}
                    
                    if state == 'created':
                        filtered = {k: v for k, v in item_data.items() 
                                   if k not in ['id', 'created_at'] and v is not None}
                        if filtered:
                            columns = ', '.join(filtered.keys())
                            placeholders = ', '.join(['%s'] * len(filtered))
                            cur.execute(f"""
                                INSERT INTO spacepro.{table} ({columns}) VALUES ({placeholders})
                            """, list(filtered.values()))
                            created += 1
                    
                    elif state == 'updated':
                        pk_value = item_data.get(pk_field)
                        if pk_value:
                            filtered = {k: v for k, v in item_data.items() 
                                       if k not in [pk_field, 'created_at']}
                            if filtered:
                                set_clause = ', '.join([f"{k} = %s" for k in filtered.keys()])
                                cur.execute(f"""
                                    UPDATE spacepro.{table} SET {set_clause} WHERE {pk_field} = %s
                                """, list(filtered.values()) + [pk_value])
                                updated += 1
                    
                    elif state == 'deleted':
                        pk_value = item_data.get(pk_field)
                        if pk_value:
                            cur.execute(f"DELETE FROM spacepro.{table} WHERE {pk_field} = %s", (pk_value,))
                            deleted += 1
                
                conn.commit()
                return {"success": True, "created": created, "updated": updated, "deleted": deleted}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ===== 1. sp_site_mst (사업장 정보) =====
@router.get("/site")
async def get_sites():
    return get_all("sp_site_mst", "site_id")

@router.get("/site/{id}")
async def get_site(id: int):
    return get_by_id("sp_site_mst", id)

@router.post("/site")
async def create_site(data: dict):
    return create_record("sp_site_mst", data)

@router.put("/site/{id}")
async def update_site(id: int, data: dict):
    return update_record("sp_site_mst", id, data)

@router.delete("/site/{id}")
async def delete_site(id: int):
    return delete_record("sp_site_mst", id)

@router.post("/site/batch")
async def batch_save_sites(items: list):
    return batch_save("sp_site_mst", items)


# ===== 2. sp_bench_mst (작업장 정보) =====
@router.get("/bench")
async def get_benches():
    return get_all("sp_bench_mst", "bench_id")

@router.get("/bench/{id}")
async def get_bench(id: int):
    return get_by_id("sp_bench_mst", id)

@router.post("/bench")
async def create_bench(data: dict):
    return create_record("sp_bench_mst", data)

@router.put("/bench/{id}")
async def update_bench(id: int, data: dict):
    return update_record("sp_bench_mst", id, data)

@router.delete("/bench/{id}")
async def delete_bench(id: int):
    return delete_record("sp_bench_mst", id)

@router.post("/bench/batch")
async def batch_save_benches(items: list):
    return batch_save("sp_bench_mst", items)


# ===== 3. sp_eqp_type (설비타입) =====
@router.get("/eqp-type")
async def get_eqp_types():
    return get_all("sp_eqp_type", "eqp_type_id")

@router.get("/eqp-type/{id}")
async def get_eqp_type(id: int):
    return get_by_id("sp_eqp_type", id)

@router.post("/eqp-type")
async def create_eqp_type(data: dict):
    return create_record("sp_eqp_type", data)

@router.put("/eqp-type/{id}")
async def update_eqp_type(id: int, data: dict):
    return update_record("sp_eqp_type", id, data)

@router.delete("/eqp-type/{id}")
async def delete_eqp_type(id: int):
    return delete_record("sp_eqp_type", id)

@router.post("/eqp-type/batch")
async def batch_save_eqp_types(items: list):
    return batch_save("sp_eqp_type", items)


# ===== 4. sp_eqp_mst (설비정보) =====
@router.get("/equipment")
async def get_equipments():
    return get_all("sp_eqp_mst", "eqp_id")

@router.get("/equipment/{id}")
async def get_equipment(id: int):
    return get_by_id("sp_eqp_mst", id)

@router.post("/equipment")
async def create_equipment(data: dict):
    return create_record("sp_eqp_mst", data)

@router.put("/equipment/{id}")
async def update_equipment(id: int, data: dict):
    return update_record("sp_eqp_mst", id, data)

@router.delete("/equipment/{id}")
async def delete_equipment(id: int):
    return delete_record("sp_eqp_mst", id)

@router.post("/equipment/batch")
async def batch_save_equipments(items: list):
    return batch_save("sp_eqp_mst", items)


# ===== 5. sp_contract_info (계약정보) =====
@router.get("/contract")
async def get_contracts():
    return get_all("sp_contract_info", "id")

@router.get("/contract/{id}")
async def get_contract(id: int):
    return get_by_id("sp_contract_info", id)

@router.post("/contract")
async def create_contract(data: dict):
    return create_record("sp_contract_info", data)

@router.put("/contract/{id}")
async def update_contract(id: int, data: dict):
    return update_record("sp_contract_info", id, data)

@router.delete("/contract/{id}")
async def delete_contract(id: int):
    return delete_record("sp_contract_info", id)

@router.post("/contract/batch")
async def batch_save_contracts(items: list):
    return batch_save("sp_contract_info", items)


# ===== 6. sp_macode_info (제품정보) =====
@router.get("/macode")
async def get_macodes():
    return get_all("sp_macode_info", "id")

@router.get("/macode/{id}")
async def get_macode(id: int):
    return get_by_id("sp_macode_info", id)

@router.post("/macode")
async def create_macode(data: dict):
    return create_record("sp_macode_info", data)

@router.put("/macode/{id}")
async def update_macode(id: int, data: dict):
    return update_record("sp_macode_info", id, data)

@router.delete("/macode/{id}")
async def delete_macode(id: int):
    return delete_record("sp_macode_info", id)

@router.post("/macode/batch")
async def batch_save_macodes(items: list):
    return batch_save("sp_macode_info", items)


# ===== 7. sp_pr_detail (세부공정정보) =====
@router.get("/pr-detail")
async def get_pr_details():
    return get_all("sp_pr_detail", "id")

@router.get("/pr-detail/{id}")
async def get_pr_detail(id: int):
    return get_by_id("sp_pr_detail", id)

@router.post("/pr-detail")
async def create_pr_detail(data: dict):
    return create_record("sp_pr_detail", data)

@router.put("/pr-detail/{id}")
async def update_pr_detail(id: int, data: dict):
    return update_record("sp_pr_detail", id, data)

@router.delete("/pr-detail/{id}")
async def delete_pr_detail(id: int):
    return delete_record("sp_pr_detail", id)

@router.post("/pr-detail/batch")
async def batch_save_pr_details(items: list):
    return batch_save("sp_pr_detail", items)


# ===== 8. sp_material_info (자재정보) =====
@router.get("/material")
async def get_materials():
    return get_all("sp_material_info", "id")

@router.get("/material/{id}")
async def get_material(id: int):
    return get_by_id("sp_material_info", id)

@router.post("/material")
async def create_material(data: dict):
    return create_record("sp_material_info", data)

@router.put("/material/{id}")
async def update_material(id: int, data: dict):
    return update_record("sp_material_info", id, data)

@router.delete("/material/{id}")
async def delete_material(id: int):
    return delete_record("sp_material_info", id)

@router.post("/material/batch")
async def batch_save_materials(items: list):
    return batch_save("sp_material_info", items)
