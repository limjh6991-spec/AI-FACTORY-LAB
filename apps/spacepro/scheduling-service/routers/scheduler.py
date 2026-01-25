"""
Scheduler Router - Bryntum 스타일 스케줄러용 API
실제 DB 데이터 기반 스케줄링 데이터 제공
"""
from fastapi import APIRouter, HTTPException
from psycopg2.extras import RealDictCursor
from contextlib import contextmanager
from datetime import datetime, timedelta
import psycopg2
import os

router = APIRouter(prefix="/scheduler", tags=["scheduler"])


# Database connection - Docker 환경 지원
@contextmanager
def get_db_connection():
    db_host = os.environ.get('DATABASE_HOST', 'db' if os.environ.get('DATABASE_URL') else 'localhost')
    db_name = os.environ.get('DATABASE_NAME', 'spacepro')
    db_port = os.environ.get('DATABASE_PORT', '5432')
    conn = psycopg2.connect(
        host=db_host,
        port=db_port,
        database=db_name,
        user="postgres",
        password="postgres"
    )
    try:
        yield conn
    finally:
        conn.close()


@router.get("/data")
async def get_scheduler_data(contno: str = None):
    """
    스케줄러용 통합 데이터 조회
    - resources: 설비 목록 (sp_eqp_mst)
    - contracts: 계약/제품 목록 (sp_macode_info)
    - routings: 공정 라우팅 정보 (sp_prcode_detail_info)
    """
    try:
        with get_db_connection() as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                
                # 1. 설비(Resource) 목록 조회
                cur.execute("""
                    SELECT 
                        eqp_id as bench_id,
                        eqp_name as bench_name,
                        bench_id as site_id,
                        eqp_type_id as site_name,
                        COALESCE(daily_capacity, 8) as daily_capacity
                    FROM spacepro.sp_eqp_mst
                    ORDER BY eqp_id
                """)
                resources = [dict(row) for row in cur.fetchall()]
                
                # 설비가 없으면 기본 리소스 추가
                if not resources:
                    resources = [
                        {"bench_id": "DEFAULT", "bench_name": "기본 설비", "site_id": "S01", "site_name": "기본", "daily_capacity": 8}
                    ]
                
                # 2. 계약/제품 목록 조회
                contract_query = """
                    SELECT DISTINCT
                        m.contno,
                        m.macode,
                        m.maname,
                        m.due_date,
                        COALESCE(m.delivery_qty, 1) as quantity,
                        CASE 
                            WHEN m.due_date < CURRENT_DATE + INTERVAL '7 days' THEN 'HIGH'
                            WHEN m.due_date < CURRENT_DATE + INTERVAL '14 days' THEN 'NORMAL'
                            ELSE 'LOW'
                        END as priority
                    FROM spacepro.sp_macode_info m
                """
                if contno:
                    contract_query += " WHERE m.contno = %s"
                    contract_query += " ORDER BY m.due_date NULLS LAST, m.macode"
                    cur.execute(contract_query, (contno,))
                else:
                    contract_query += " ORDER BY m.due_date NULLS LAST, m.contno, m.macode LIMIT 20"
                    cur.execute(contract_query)
                    
                contracts = []
                for row in cur.fetchall():
                    contracts.append({
                        "contno": row["contno"],
                        "macode": row["macode"],
                        "maname": row["maname"],
                        "due_date": row["due_date"].isoformat() if row["due_date"] else None,
                        "quantity": row["quantity"],
                        "priority": row["priority"]
                    })
                
                # 3. 라우팅 정보 조회 (macode별 그룹핑)
                routings = {}
                for contract in contracts:
                    macode = contract["macode"]
                    cont = contract["contno"]
                    
                    cur.execute("""
                        SELECT 
                            prcode,
                            COALESCE(pr_seq, ROW_NUMBER() OVER (ORDER BY prcode, pr_detail_seq)) as rn,
                            prname,
                            prname_detail,
                            COALESCE(working_day, 1) * 8 as contracted_man_hours,
                            COALESCE(eqp_id, 'DEFAULT') as target_site
                        FROM spacepro.sp_prcode_detail_info
                        WHERE contno = %s AND macode = %s
                        ORDER BY prcode, pr_detail_seq
                    """, (cont, macode))
                    
                    steps = []
                    for idx, row in enumerate(cur.fetchall(), 1):
                        eqp_id = row["target_site"]
                        # 설비 ID 정리 (줄바꿈 제거 등)
                        if eqp_id:
                            eqp_id = eqp_id.strip().split('\n')[0].strip()
                        if not eqp_id or eqp_id == '-':
                            eqp_id = 'DEFAULT'
                        
                        steps.append({
                            "prcode": row["prcode"],
                            "rn": idx,
                            "prname": f"{row['prname']}-{row['prname_detail']}" if row['prname_detail'] else row['prname'],
                            "Contracted_Man_hours": float(row["contracted_man_hours"] or 8),
                            "target_site": eqp_id
                        })
                    
                    if steps:
                        routings[macode] = steps
                
                # 4. 작업 캘린더 (휴무일) 조회
                cur.execute("""
                    SELECT calendar_date, is_holiday, holiday_name
                    FROM spacepro.sp_work_calendar
                    WHERE is_holiday = true 
                      AND calendar_date >= CURRENT_DATE
                      AND calendar_date < CURRENT_DATE + INTERVAL '60 days'
                    ORDER BY calendar_date
                """)
                holidays = [
                    {
                        "date": row["calendar_date"].isoformat(),
                        "reason": row["holiday_name"] or "휴일"
                    }
                    for row in cur.fetchall()
                ]
                
                return {
                    "resources": resources,
                    "contracts": contracts,
                    "routings": routings,
                    "holidays": holidays,
                    "startDate": datetime.now().strftime("%Y-%m-%d"),
                    "workingHoursPerDay": 8
                }
                
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/contracts")
async def get_available_contracts():
    """스케줄링 가능한 계약 목록 조회"""
    try:
        with get_db_connection() as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute("""
                    SELECT DISTINCT 
                        contno,
                        COUNT(DISTINCT macode) as product_count,
                        MIN(due_date) as earliest_due
                    FROM spacepro.sp_macode_info
                    WHERE contno IS NOT NULL
                    GROUP BY contno
                    ORDER BY earliest_due NULLS LAST, contno
                """)
                return [dict(row) for row in cur.fetchall()]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
