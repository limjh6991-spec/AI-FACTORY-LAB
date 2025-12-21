"""
OR-Tools 기반 생산 스케줄링 마이크로서비스
FastAPI 서버
"""
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import ortools

from models.schemas import (
    OptimizeRequest, 
    OptimizeResponse, 
    HealthResponse,
    ScheduleItem,
    OptimizeSummary
)
from solvers.job_shop import JobShopScheduler


app = FastAPI(
    title="SpacePro Scheduling Service",
    description="OR-Tools 기반 생산 스케줄링 최적화 API",
    version="1.0.0"
)

# CORS 설정 (Next.js 개발 서버 허용)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3001", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 스케줄러 인스턴스
scheduler = JobShopScheduler()


@app.get("/", response_model=HealthResponse)
@app.get("/health", response_model=HealthResponse)
async def health_check():
    """헬스 체크 엔드포인트"""
    return HealthResponse(
        status="healthy",
        version="1.0.0",
        ortools_version=ortools.__version__
    )


@app.post("/optimize", response_model=OptimizeResponse)
async def optimize_schedule(request: OptimizeRequest):
    """
    생산 스케줄 최적화 API
    
    OR-Tools CP-SAT 솔버를 사용하여 최적 설비 배정 및 작업 순서 결정
    """
    try:
        # 요청 데이터를 딕셔너리로 변환
        orders = [
            {
                'orderId': o.orderId,
                'itemCode': o.itemCode,
                'itemName': o.itemName,
                'quantity': o.quantity,
                'dueDate': o.dueDate,
                'priority': o.priority,
                'stdTime': o.stdTime
            }
            for o in request.orders
        ]
        
        machines = [
            {
                'code': m.code,
                'name': m.name,
                'uph': m.uph,
                'efficiency': m.efficiency,
                'availableHours': m.availableHours
            }
            for m in request.machines
        ]
        
        # 최적화 실행 (간단한 휴리스틱 사용 - 빠른 응답)
        result = scheduler.optimize_simple(
            orders=orders,
            machines=machines,
            objective=request.objective
        )
        
        # 응답 구성
        schedule_items = [
            ScheduleItem(
                orderId=s['orderId'],
                itemCode=s['itemCode'],
                assignedMachine=s['assignedMachine'],
                machineName=s['machineName'],
                week1=s['week1'],
                week2=s['week2'],
                week3=s['week3'],
                week4=s['week4'],
                startTime=s.get('startTime'),
                endTime=s.get('endTime'),
                delay=s.get('delay', 0)
            )
            for s in result['schedule']
        ]
        
        summary = OptimizeSummary(
            totalOrders=result['summary']['totalOrders'],
            onTimeOrders=result['summary']['onTimeOrders'],
            delayedOrders=result['summary']['delayedOrders'],
            utilization=result['summary']['utilization'],
            loadBalanceImproved=result['summary']['loadBalanceImproved'],
            delaysAvoided=result['summary']['delaysAvoided']
        )
        
        return OptimizeResponse(
            success=result['success'],
            status=result['status'],
            makespan=result['makespan'],
            solveTime=result['solveTime'],
            schedule=schedule_items,
            summary=summary
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/optimize/full")
async def optimize_schedule_full(request: OptimizeRequest):
    """
    완전한 CP-SAT 최적화 (시간 소요 있음)
    복잡한 제약 조건을 포함한 전체 최적화
    """
    try:
        orders = [o.model_dump() for o in request.orders]
        machines = [m.model_dump() for m in request.machines]
        
        result = scheduler.optimize(
            orders=orders,
            machines=machines,
            objective=request.objective
        )
        
        return result
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
