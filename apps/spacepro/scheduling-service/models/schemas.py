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


# ====================================
# Capacity Simulation Schemas
# ====================================

class DemandItem(BaseModel):
    """수요 항목"""
    workcenter_code: str
    item_code: Optional[str] = None
    quantity: int = Field(..., ge=0, description="수요 수량")


class AdvancedParams(BaseModel):
    """고급 시뮬레이션 파라미터"""
    yield_rate_override: Optional[float] = Field(None, ge=0, le=100, description="수율 강제 적용 (%)")
    rework_rate_override: Optional[float] = Field(None, ge=0, le=100, description="재작업률 강제 적용 (%)")
    downtime_override: Optional[float] = Field(None, ge=0, description="월간 비가동 시간 (시간)")
    efficiency_factor: float = Field(100, ge=0, le=200, description="효율 계수 (%, 100=기본)")
    outsourcing_delay: bool = Field(False, description="외주 입고 지연 적용 여부")
    night_shift_efficiency: float = Field(90, ge=0, le=100, description="야간 효율 (%)")


class CapacitySimulateRequest(BaseModel):
    """케파 시뮬레이션 요청 (고급 변수 지원)"""
    plan_month: str = Field(..., pattern=r'^\d{4}-\d{2}$', description="계획 월 (YYYY-MM)")
    demands: List[DemandItem]
    shift_code: str = Field(default="DAY", description="적용 교대조")
    advanced_params: Optional[AdvancedParams] = Field(None, description="고급 시뮬레이션 파라미터")


class WorkcenterCapacity(BaseModel):
    """작업장별 케파 결과 (고급 변수 포함)"""
    workcenter_code: str
    workcenter_name: str
    workcenter_type: str
    total_demand: int
    adjusted_demand: int = 0  # 재작업 포함 수요
    available_capacity: int
    adjusted_capacity: int = 0  # 수율 적용 케파
    uph: float
    efficiency: float
    yield_rate: float = 100.0
    rework_rate: float = 0.0
    downtime_hours: float = 0.0
    manpower: int = 1
    work_hours: float
    utilization: float
    gap: int
    is_bottleneck: bool
    status: str  # OK, WARNING, OVERLOAD


class BottleneckInfo(BaseModel):
    """병목 정보"""
    workcenter_code: str
    workcenter_name: str
    utilization: float
    shortage: int


class CapacitySimulateSummary(BaseModel):
    """시뮬레이션 요약"""
    total_workcenters: int
    total_demand: int
    total_capacity: int
    avg_utilization: float
    bottleneck_count: int
    status: str  # OK, WARNING, CRITICAL


class CapacitySimulateResponse(BaseModel):
    """케파 시뮬레이션 응답"""
    success: bool
    plan_month: str
    period: dict
    summary: CapacitySimulateSummary
    workcenters: List[WorkcenterCapacity]
    bottlenecks: List[BottleneckInfo]


# ====================================
# Version Management Schemas
# ====================================

class VersionSaveRequest(BaseModel):
    """버전 저장 요청"""
    version_name: str = Field(..., min_length=1, max_length=100, description="버전명")
    plan_month: str = Field(..., pattern=r'^\d{4}-\d{2}$', description="계획 월")
    demands: List[DemandItem]
    advanced_params: Optional[AdvancedParams] = None
    summary: dict
    workcenters: List[dict]
    bottlenecks: Optional[List[dict]] = None
    remark: Optional[str] = None


class VersionInfo(BaseModel):
    """버전 목록 조회용"""
    id: int
    version_name: str
    plan_month: str
    created_at: str
    created_by: str
    avg_utilization: float
    bottleneck_count: int
    is_baseline: bool


class VersionDetail(BaseModel):
    """버전 상세 (불러오기용)"""
    id: int
    version_name: str
    plan_month: str
    created_at: str
    created_by: str
    demands: List[dict]
    advanced_params: Optional[dict] = None
    summary: dict
    workcenters: List[dict]
    bottlenecks: Optional[List[dict]] = None
    remark: Optional[str] = None


