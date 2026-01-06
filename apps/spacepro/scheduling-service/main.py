"""
OR-Tools 기반 생산 스케줄링 마이크로서비스
FastAPI 서버

All API endpoints are organized into routers:
- /routing: 공정 라우팅 마스터 CRUD
- /simulation: 생산 시뮬레이션 시나리오
- /worker: 작업자 관리
- /capacity: 케파 시뮬레이션 및 버전 관리
- /mrp: MRP 자재 소요량 계획
- / and /health: 헬스체크, /optimize: 스케줄 최적화
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(
    title="SpacePro Scheduling Service",
    description="OR-Tools 기반 생산 스케줄링 및 케파 시뮬레이션 API",
    version="2.0.0"
)

# CORS 설정 (Next.js 개발 서버 허용)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3001", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 라우터 등록
from routers import (
    routing_router, 
    simulation_router, 
    worker_router,
    capacity_router,
    mrp_router,
    schedule_router
)

# 기본 라우터 (헬스체크, 스케줄 최적화)
app.include_router(schedule_router)

# 도메인별 라우터
app.include_router(routing_router)      # /routing/*
app.include_router(simulation_router)   # /simulation/*
app.include_router(worker_router)       # /worker/*
app.include_router(capacity_router)     # /capacity/*
app.include_router(mrp_router)          # /mrp/*


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
