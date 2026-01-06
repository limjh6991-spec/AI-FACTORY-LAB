"""
Capacity Router - 케파 시뮬레이션 및 버전 관리 API
"""
from fastapi import APIRouter, HTTPException
from psycopg2.extras import RealDictCursor
from contextlib import contextmanager
import psycopg2
import json

from models.schemas import (
    CapacitySimulateRequest, CapacitySimulateResponse,
    VersionSaveRequest, VersionInfo, VersionDetail
)
from solvers.capacity_simulation import CapacitySimulator

router = APIRouter(prefix="/capacity", tags=["capacity"])

# Initialize simulator
capacity_simulator = CapacitySimulator()

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


# ====================================
# Capacity Simulation APIs
# ====================================

@router.post("/simulate", response_model=CapacitySimulateResponse)
async def simulate_capacity(request: CapacitySimulateRequest):
    """
    케파 시뮬레이션 실행 (고급 변수 지원)
    
    월간 수요 대비 작업장별 생산능력 분석
    - 가동률 계산 (수율, 비가동, 재작업 반영)
    - 병목 공정 식별
    - 케파 충족 여부 판단
    """
    try:
        demands = [
            {
                'workcenter_code': d.workcenter_code,
                'item_code': d.item_code,
                'quantity': d.quantity
            }
            for d in request.demands
        ]
        
        # 고급 파라미터 변환
        advanced_params = None
        if request.advanced_params:
            advanced_params = {
                'yield_rate_override': request.advanced_params.yield_rate_override,
                'rework_rate_override': request.advanced_params.rework_rate_override,
                'downtime_override': request.advanced_params.downtime_override,
                'efficiency_factor': request.advanced_params.efficiency_factor,
                'outsourcing_delay': request.advanced_params.outsourcing_delay,
                'night_shift_efficiency': request.advanced_params.night_shift_efficiency,
            }
        
        result = capacity_simulator.simulate(
            plan_month=request.plan_month,
            demands=demands,
            shift_code=request.shift_code,
            advanced_params=advanced_params
        )
        
        return result
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/summary")
async def get_capacity_summary():
    """
    현재 케파 요약 정보
    
    작업장 수, 유형별 분포, 총 표준 케파 등
    """
    try:
        return capacity_simulator.get_capacity_summary()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/workcenters")
async def get_workcenters():
    """작업장 목록 조회"""
    try:
        return capacity_simulator.get_workcenters()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/shifts")
async def get_shifts():
    """교대조 목록 조회"""
    try:
        return capacity_simulator.get_shifts()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ====================================
# Version Management APIs
# ====================================

@router.post("/versions")
async def save_version(request: VersionSaveRequest):
    """
    시뮬레이션 결과 버전 저장
    입력값(수요, 고급 파라미터)과 결과값 저장
    """
    try:
        with get_db_connection() as conn:
            with conn.cursor() as cur:
                demands_json = json.dumps([d.dict() for d in request.demands])
                advanced_params_json = json.dumps(request.advanced_params.dict()) if request.advanced_params else None
                summary_json = json.dumps(request.summary)
                workcenters_json = json.dumps(request.workcenters)
                bottlenecks_json = json.dumps(request.bottlenecks) if request.bottlenecks else None
                
                cur.execute("""
                    INSERT INTO spacepro.sp_simulation_result 
                    (version_name, plan_month, demands, advanced_params, summary, workcenters, bottlenecks, remark)
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
                    RETURNING id, created_at
                """, (
                    request.version_name,
                    request.plan_month,
                    demands_json,
                    advanced_params_json,
                    summary_json,
                    workcenters_json,
                    bottlenecks_json,
                    request.remark
                ))
                result = cur.fetchone()
                conn.commit()
                
                return {
                    "success": True,
                    "id": result[0],
                    "version_name": request.version_name,
                    "created_at": result[1].isoformat()
                }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/versions", response_model=list[VersionInfo])
async def list_versions(plan_month: str = None):
    """버전 목록 조회"""
    try:
        with get_db_connection() as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                query = """
                    SELECT id, version_name, plan_month, created_at, created_by,
                           summary->>'avg_utilization' as avg_utilization,
                           summary->>'bottleneck_count' as bottleneck_count,
                           is_baseline
                    FROM spacepro.sp_simulation_result
                """
                params = []
                if plan_month:
                    query += " WHERE plan_month = %s"
                    params.append(plan_month)
                query += " ORDER BY created_at DESC LIMIT 50"
                
                cur.execute(query, params)
                rows = cur.fetchall()
                
                return [
                    VersionInfo(
                        id=row['id'],
                        version_name=row['version_name'],
                        plan_month=row['plan_month'],
                        created_at=row['created_at'].isoformat(),
                        created_by=row['created_by'] or 'system',
                        avg_utilization=float(row['avg_utilization'] or 0),
                        bottleneck_count=int(row['bottleneck_count'] or 0),
                        is_baseline=row['is_baseline'] or False
                    )
                    for row in rows
                ]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/versions/{version_id}", response_model=VersionDetail)
async def get_version(version_id: int):
    """특정 버전 불러오기 (입력값 + 결과값)"""
    try:
        with get_db_connection() as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute("""
                    SELECT id, version_name, plan_month, created_at, created_by,
                           demands, advanced_params, summary, workcenters, bottlenecks, remark
                    FROM spacepro.sp_simulation_result
                    WHERE id = %s
                """, (version_id,))
                row = cur.fetchone()
                
                if not row:
                    raise HTTPException(status_code=404, detail="Version not found")
                
                return VersionDetail(
                    id=row['id'],
                    version_name=row['version_name'],
                    plan_month=row['plan_month'],
                    created_at=row['created_at'].isoformat(),
                    created_by=row['created_by'] or 'system',
                    demands=row['demands'],
                    advanced_params=row['advanced_params'],
                    summary=row['summary'],
                    workcenters=row['workcenters'],
                    bottlenecks=row['bottlenecks'],
                    remark=row['remark']
                )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
