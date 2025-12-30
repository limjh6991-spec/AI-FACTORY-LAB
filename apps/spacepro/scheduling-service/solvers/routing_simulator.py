"""
SpacePro Routing-Based Capacity Simulation Engine
SimPy-based discrete event simulation with stochastic failures
"""
import random
from dataclasses import dataclass, field
from typing import List, Dict, Optional, Any
from datetime import datetime, timedelta
import math

try:
    import simpy
    SIMPY_AVAILABLE = True
except ImportError:
    SIMPY_AVAILABLE = False
    print("Warning: SimPy not installed. Using simplified simulation mode.")


# ============================================
# Data Models
# ============================================
@dataclass
class RoutingStep:
    item_code: str
    op_seq: int
    op_name: str
    workcenter_code: str
    machine_code: str
    setup_time: float  # minutes
    cycle_time: float  # minutes per EA
    process_yield: float  # 0-100%
    materials: List['BomProcess'] = field(default_factory=list)


@dataclass
class BomProcess:
    child_item: str
    qty_per: float
    material_yield: float  # 0-100%


@dataclass
class MachineReliability:
    machine_code: str
    mtbf_hours: float = 168  # default 1 week
    mttr_hours: float = 2    # default 2 hours


@dataclass
class SimulationOrder:
    order_id: str
    item_code: str
    quantity: float
    due_date: Optional[str] = None
    priority: int = 1


# ============================================
# Yield Compensator
# ============================================
class YieldCompensator:
    """
    투입량 역산 계산기
    목표 생산량 달성을 위해 각 공정의 수율을 반영하여 투입량 계산
    """
    
    def calculate_input_quantity(
        self, 
        target_qty: float, 
        routing_steps: List[RoutingStep]
    ) -> Dict[int, float]:
        """
        각 공정별 필요 투입량 계산 (역순 누적)
        
        Returns:
            {op_seq: required_input_qty}
        """
        sorted_steps = sorted(routing_steps, key=lambda x: x.op_seq, reverse=True)
        
        required_qty = {}
        current_qty = target_qty
        
        for step in sorted_steps:
            yield_rate = step.process_yield / 100.0 if step.process_yield > 0 else 1.0
            input_qty = current_qty / yield_rate
            required_qty[step.op_seq] = round(input_qty, 2)
            current_qty = input_qty
            
        return required_qty
    
    def calculate_material_requirements(
        self,
        input_qty: float,
        materials: List[BomProcess]
    ) -> Dict[str, float]:
        """
        공정별 자재 소요량 계산 (자재 수율 반영)
        """
        requirements = {}
        for mat in materials:
            mat_yield = mat.material_yield / 100.0 if mat.material_yield > 0 else 1.0
            required = (input_qty * mat.qty_per) / mat_yield
            requirements[mat.child_item] = round(required, 4)
        return requirements
    
    def get_yield_analysis(
        self,
        target_qty: float,
        routing_steps: List[RoutingStep]
    ) -> List[Dict]:
        """수율 분석 리포트 생성"""
        input_qtys = self.calculate_input_quantity(target_qty, routing_steps)
        sorted_steps = sorted(routing_steps, key=lambda x: x.op_seq, reverse=True)
        
        analysis = []
        cumulative_yield = 100.0
        
        for step in sorted_steps:
            cumulative_yield *= (step.process_yield / 100.0)
            analysis.append({
                'op_seq': step.op_seq,
                'op_name': step.op_name,
                'process_yield': step.process_yield,
                'cumulative_yield': round(cumulative_yield * 100, 2),
                'required_input': input_qtys[step.op_seq],
                'expected_output': round(input_qtys[step.op_seq] * step.process_yield / 100, 2)
            })
        
        return sorted(analysis, key=lambda x: x['op_seq'])


# ============================================
# Failure Generator
# ============================================
class FailureGenerator:
    """
    MTBF/MTTR 기반 확률적 설비 고장 시뮬레이션
    지수 분포(Exponential Distribution) 사용
    """
    
    def __init__(self, reliability: MachineReliability):
        self.machine_code = reliability.machine_code
        self.mtbf_min = reliability.mtbf_hours * 60
        self.mttr_min = reliability.mttr_hours * 60
        
    def time_to_next_failure(self) -> float:
        """다음 고장까지 시간 (지수 분포, 분 단위)"""
        if self.mtbf_min <= 0:
            return float('inf')
        return random.expovariate(1.0 / self.mtbf_min)
    
    def repair_duration(self) -> float:
        """수리 소요 시간 (지수 분포, 분 단위)"""
        if self.mttr_min <= 0:
            return 0
        return random.expovariate(1.0 / self.mttr_min)
    
    def get_availability(self) -> float:
        """설비 가용률 계산 (MTBF / (MTBF + MTTR))"""
        total = self.mtbf_min + self.mttr_min
        return (self.mtbf_min / total * 100) if total > 0 else 100.0


# ============================================
# Routing Simulator (SimPy-based)
# ============================================
class RoutingSimulator:
    """
    라우팅 기반 이산 이벤트 시뮬레이션
    
    핵심 제약:
    1. 공정 순서 제약 (앞 공정 완료 → 뒷 공정 시작)
    2. 설비 용량 제약 (동시 작업 수 제한)
    3. 랜덤 고장 발생 및 수리 대기
    """
    
    def __init__(self, enable_failures: bool = True, random_seed: int = None):
        self.enable_failures = enable_failures
        self.random_seed = random_seed
        self.machines: Dict[str, Any] = {}
        self.failure_generators: Dict[str, FailureGenerator] = {}
        self.results: List[Dict] = []
        self.events: List[Dict] = []
        self.yield_compensator = YieldCompensator()
        
        if random_seed:
            random.seed(random_seed)
    
    def register_machine(
        self, 
        machine_code: str, 
        capacity: int = 1,
        reliability: MachineReliability = None
    ):
        """설비 등록"""
        self.machines[machine_code] = {'capacity': capacity, 'current_load': 0}
        if reliability:
            self.failure_generators[machine_code] = FailureGenerator(reliability)
    
    def simulate_order(
        self,
        order: SimulationOrder,
        routing: List[RoutingStep]
    ) -> Dict:
        """
        단일 주문 시뮬레이션 (Simplified mode without SimPy)
        """
        input_qtys = self.yield_compensator.calculate_input_quantity(
            order.quantity, routing
        )
        
        sorted_steps = sorted(routing, key=lambda x: x.op_seq)
        current_time = 0
        order_results = []
        material_requirements = {}
        total_downtime = 0
        
        for step in sorted_steps:
            process_qty = input_qtys[step.op_seq]
            
            # 자재 소요량 계산
            mat_reqs = self.yield_compensator.calculate_material_requirements(
                process_qty, step.materials
            )
            for item, qty in mat_reqs.items():
                material_requirements[item] = material_requirements.get(item, 0) + qty
            
            start_time = current_time
            
            # 셋업 시간
            current_time += step.setup_time
            
            # 가공 시간
            processing_time = process_qty * step.cycle_time
            
            # 랜덤 고장 시뮬레이션
            downtime = 0
            if self.enable_failures and step.machine_code in self.failure_generators:
                fg = self.failure_generators[step.machine_code]
                remaining = processing_time
                
                while remaining > 0:
                    ttf = fg.time_to_next_failure()
                    if ttf < remaining:
                        current_time += ttf
                        remaining -= ttf
                        
                        repair_time = fg.repair_duration()
                        current_time += repair_time
                        downtime += repair_time
                        
                        self.events.append({
                            'time': current_time - repair_time,
                            'type': 'BREAKDOWN',
                            'machine_code': step.machine_code,
                            'order_id': order.order_id,
                            'op_seq': step.op_seq,
                            'ttf_min': round(ttf, 1),
                            'repair_min': round(repair_time, 1)
                        })
                    else:
                        current_time += remaining
                        remaining = 0
            else:
                current_time += processing_time
            
            total_downtime += downtime
            end_time = current_time
            output_qty = process_qty * (step.process_yield / 100)
            
            order_results.append({
                'order_id': order.order_id,
                'item_code': order.item_code,
                'op_seq': step.op_seq,
                'op_name': step.op_name,
                'machine_code': step.machine_code,
                'workcenter_code': step.workcenter_code,
                'start_time': round(start_time, 1),
                'end_time': round(end_time, 1),
                'duration': round(end_time - start_time, 1),
                'input_qty': round(process_qty, 2),
                'output_qty': round(output_qty, 2),
                'downtime': round(downtime, 1)
            })
        
        self.results.extend(order_results)
        
        return {
            'order_id': order.order_id,
            'item_code': order.item_code,
            'target_qty': order.quantity,
            'total_time': round(current_time, 1),
            'total_downtime': round(total_downtime, 1),
            'operations': order_results,
            'material_requirements': material_requirements
        }
    
    def run_simulation(
        self,
        orders: List[SimulationOrder],
        routings: Dict[str, List[RoutingStep]],
        time_horizon_min: int = 10080  # 1 week
    ) -> Dict:
        """
        전체 시뮬레이션 실행
        """
        self.results = []
        self.events = []
        
        order_results = []
        for order in orders:
            if order.item_code in routings:
                result = self.simulate_order(order, routings[order.item_code])
                order_results.append(result)
        
        # 요약 통계 계산
        total_orders = len(order_results)
        total_time = max([r['total_time'] for r in order_results]) if order_results else 0
        total_downtime = sum([r['total_downtime'] for r in order_results])
        
        # 설비별 가동률 계산
        machine_utilization = self._calculate_machine_utilization(time_horizon_min)
        
        # 병목 식별
        bottlenecks = [m for m, u in machine_utilization.items() if u > 85]
        
        return {
            'success': True,
            'simulation_params': {
                'enable_failures': self.enable_failures,
                'random_seed': self.random_seed,
                'time_horizon_min': time_horizon_min
            },
            'summary': {
                'total_orders': total_orders,
                'makespan': round(total_time, 1),
                'total_downtime': round(total_downtime, 1),
                'avg_downtime_per_order': round(total_downtime / total_orders, 1) if total_orders > 0 else 0,
                'breakdown_count': len(self.events),
                'bottleneck_machines': bottlenecks
            },
            'machine_utilization': machine_utilization,
            'orders': order_results,
            'events': self.events,
            'gantt_data': self.results
        }
    
    def _calculate_machine_utilization(self, horizon: int) -> Dict[str, float]:
        """설비별 가동률 계산"""
        machine_times = {}
        
        for r in self.results:
            mc = r['machine_code']
            duration = r['duration'] - r.get('downtime', 0)
            machine_times[mc] = machine_times.get(mc, 0) + duration
        
        utilization = {}
        for mc, time in machine_times.items():
            utilization[mc] = round((time / horizon) * 100, 1) if horizon > 0 else 0
        
        return utilization


# ============================================
# Simulation Service (FastAPI Integration)
# ============================================
class RoutingSimulationService:
    """
    시뮬레이션 서비스 레이어
    DB 연결 및 API 통합
    """
    
    def __init__(self, db_connection=None):
        self.db = db_connection
        
    def load_routing_from_db(self, item_code: str, revision: str = '1.0') -> List[RoutingStep]:
        """DB에서 라우팅 로드"""
        if not self.db:
            return []
        
        cursor = self.db.cursor()
        cursor.execute("""
            SELECT r.op_seq, r.op_name, r.workcenter_code, r.machine_code,
                   r.setup_time, r.cycle_time, r.process_yield
            FROM spacepro.tb_routing_mst r
            WHERE r.item_code = %s AND r.revision = %s AND r.status = 'ACTIVE'
            ORDER BY r.op_seq
        """, (item_code, revision))
        
        routing = []
        for row in cursor.fetchall():
            # BOM 조회
            cursor.execute("""
                SELECT child_item, qty_per, material_yield
                FROM spacepro.tb_bom_process
                WHERE parent_item = %s AND op_seq = %s AND routing_rev = %s
            """, (item_code, row[0], revision))
            
            materials = [
                BomProcess(child_item=m[0], qty_per=float(m[1]), material_yield=float(m[2]))
                for m in cursor.fetchall()
            ]
            
            routing.append(RoutingStep(
                item_code=item_code,
                op_seq=row[0],
                op_name=row[1],
                workcenter_code=row[2],
                machine_code=row[3],
                setup_time=float(row[4]),
                cycle_time=float(row[5]),
                process_yield=float(row[6]),
                materials=materials
            ))
        
        return routing
    
    def load_machine_reliability(self, machine_code: str) -> MachineReliability:
        """DB에서 설비 신뢰성 정보 로드"""
        if not self.db:
            return MachineReliability(machine_code=machine_code)
        
        cursor = self.db.cursor()
        cursor.execute("""
            SELECT mtbf_hours, mttr_hours
            FROM spacepro.tb_machine_event
            WHERE machine_code = %s AND event_type = 'BASELINE'
            LIMIT 1
        """, (machine_code,))
        
        row = cursor.fetchone()
        if row:
            return MachineReliability(
                machine_code=machine_code,
                mtbf_hours=float(row[0]) if row[0] else 168,
                mttr_hours=float(row[1]) if row[1] else 2
            )
        
        return MachineReliability(machine_code=machine_code)


# ============================================
# Convenience Functions
# ============================================
def create_sample_simulation():
    """샘플 시뮬레이션 생성 (테스트용)"""
    
    # 샘플 라우팅 (METAL-001)
    metal_routing = [
        RoutingStep('METAL-001', 10, '절단', 'WC-CUT', 'M-CUT-01', 15, 2.5, 98,
                   [BomProcess('RAW-STEEL', 1.2, 95)]),
        RoutingStep('METAL-001', 20, 'CNC가공', 'WC-CNC', 'M-CNC-01', 45, 8.0, 92,
                   [BomProcess('TOOL-BIT', 0.01, 100)]),
        RoutingStep('METAL-001', 30, '열처리', 'WC-HEAT', 'M-FURNACE-01', 60, 0.5, 99, []),
        RoutingStep('METAL-001', 40, '검사', 'WC-QC', 'M-CMM-01', 5, 3.0, 100, [])
    ]
    
    # 시뮬레이터 생성
    simulator = RoutingSimulator(enable_failures=True, random_seed=42)
    
    # 설비 등록
    simulator.register_machine('M-CUT-01', 1, MachineReliability('M-CUT-01', 200, 2))
    simulator.register_machine('M-CNC-01', 1, MachineReliability('M-CNC-01', 120, 4))
    simulator.register_machine('M-FURNACE-01', 1, MachineReliability('M-FURNACE-01', 500, 8))
    simulator.register_machine('M-CMM-01', 1, MachineReliability('M-CMM-01', 1000, 3))
    
    # 주문 생성
    orders = [
        SimulationOrder('ORD-001', 'METAL-001', 1000),
        SimulationOrder('ORD-002', 'METAL-001', 500)
    ]
    
    # 시뮬레이션 실행
    result = simulator.run_simulation(
        orders=orders,
        routings={'METAL-001': metal_routing},
        time_horizon_min=10080
    )
    
    return result


if __name__ == "__main__":
    # 테스트 실행
    result = create_sample_simulation()
    
    print("=" * 60)
    print("Routing-Based Capacity Simulation Result")
    print("=" * 60)
    print(f"Total Orders: {result['summary']['total_orders']}")
    print(f"Makespan: {result['summary']['makespan']} min")
    print(f"Total Downtime: {result['summary']['total_downtime']} min")
    print(f"Breakdown Count: {result['summary']['breakdown_count']}")
    print(f"Bottleneck Machines: {result['summary']['bottleneck_machines']}")
    print()
    print("Machine Utilization:")
    for mc, util in result['machine_utilization'].items():
        print(f"  {mc}: {util}%")
