"""
Pydantic 모델 - API 요청/응답 스키마 정의
"""
from pydantic import BaseModel, Field
from typing import List, Optional, Literal
from datetime import date


class ProcessInfo(BaseModel):
    """공정 정보"""
    processCode: str
    stdTime: int = Field(..., description="표준 작업 시간 (분/개)")


class OrderRequest(BaseModel):
    """작업지시 요청"""
    orderId: str
    itemCode: str
    itemName: Optional[str] = None
    quantity: int
    dueDate: str = Field(..., description="납기일 (MM-DD 형식)")
    priority: int = 1
    stdTime: int = Field(..., description="표준 작업 시간 (분/개)")
    processes: Optional[List[ProcessInfo]] = None


class MachineInfo(BaseModel):
    """설비 정보"""
    code: str
    name: Optional[str] = None
    uph: int = Field(..., description="시간당 생산량")
    efficiency: float = Field(default=1.0, ge=0.0, le=1.0)
    availableHours: float = Field(default=8.0)


class OptimizeRequest(BaseModel):
    """스케줄 최적화 요청"""
    planDate: str = Field(..., description="계획 월 (YYYY-MM)")
    orders: List[OrderRequest]
    machines: List[MachineInfo]
    objective: Literal["MINIMIZE_MAKESPAN", "MINIMIZE_DELAY"] = "MINIMIZE_MAKESPAN"
    timeLimit: int = Field(default=30, description="최적화 제한 시간 (초)")


class ScheduleItem(BaseModel):
    """스케줄 결과 항목"""
    orderId: str
    itemCode: str
    assignedMachine: str
    machineName: Optional[str] = None
    week1: int = 0
    week2: int = 0
    week3: int = 0
    week4: int = 0
    startTime: Optional[int] = None
    endTime: Optional[int] = None
    delay: int = 0


class OptimizeSummary(BaseModel):
    """최적화 결과 요약"""
    totalOrders: int
    onTimeOrders: int
    delayedOrders: int
    utilization: float
    loadBalanceImproved: int = 0
    delaysAvoided: int = 0


class OptimizeResponse(BaseModel):
    """스케줄 최적화 응답"""
    success: bool
    status: str = Field(..., description="OPTIMAL, FEASIBLE, INFEASIBLE, etc.")
    makespan: int = Field(..., description="전체 완료 시간 (분)")
    solveTime: float = Field(..., description="솔빙 시간 (초)")
    schedule: List[ScheduleItem]
    summary: OptimizeSummary


class HealthResponse(BaseModel):
    """헬스체크 응답"""
    status: str
    version: str
    ortools_version: str
