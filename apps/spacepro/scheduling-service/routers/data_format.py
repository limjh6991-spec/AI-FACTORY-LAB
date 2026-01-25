"""
데이터 포맷 라우터 - SP 테이블 샘플 데이터 조회
"""
from fastapi import APIRouter, HTTPException
from typing import List, Any
import asyncpg
import os

router = APIRouter(prefix="/data-format", tags=["데이터 포맷"])

# 허용된 테이블 목록 (SQL Injection 방지)
ALLOWED_TABLES = [
    'sp_site_mst',
    'sp_bench_mst',
    'sp_eqp_type',
    'sp_eqp_mst',
    'sp_undertaking_team_mst',
    'sp_undertaking_info',
    'sp_contract_info',
    'sp_macode_info',
    'sp_prcode_detail_info',
    'sp_pr_detail',
    'sp_material_info',
    'sp_team',
    'sp_employee',
    'sp_work_calendar',
]

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:postgres@db:5432/spacepro")

async def get_connection():
    return await asyncpg.connect(DATABASE_URL)


@router.get("/{table_name}")
async def get_table_data(table_name: str, limit: int = 20):
    """SP 테이블 샘플 데이터 조회"""
    
    # 보안: 허용된 테이블만 조회
    if table_name not in ALLOWED_TABLES:
        raise HTTPException(status_code=400, detail="Invalid table name")
    
    limit = min(limit, 100)  # 최대 100건
    
    try:
        conn = await get_connection()
        
        # 컬럼 정보 조회
        columns_query = """
            SELECT column_name 
            FROM information_schema.columns 
            WHERE table_schema = 'spacepro' 
              AND table_name = $1
            ORDER BY ordinal_position
        """
        columns_result = await conn.fetch(columns_query, table_name)
        columns = [row['column_name'] for row in columns_result]
        
        # 데이터 조회
        data_query = f"SELECT * FROM spacepro.{table_name} LIMIT {limit}"
        rows_result = await conn.fetch(data_query)
        
        # Record를 dict로 변환
        rows = []
        for row in rows_result:
            row_dict = {}
            for col in columns:
                val = row.get(col)
                # 특수 타입 처리
                if val is None:
                    row_dict[col] = None
                elif isinstance(val, (int, float, bool, str)):
                    row_dict[col] = val
                else:
                    row_dict[col] = str(val)
            rows.append(row_dict)
        
        # 전체 건수 조회
        count_query = f"SELECT COUNT(*) as count FROM spacepro.{table_name}"
        count_result = await conn.fetchval(count_query)
        
        await conn.close()
        
        return {
            "tableName": table_name,
            "columns": columns,
            "rows": rows,
            "count": count_result
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch table data: {str(e)}")
