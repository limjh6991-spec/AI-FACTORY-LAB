"""
Capacity Simulation Solver - 생산능력 시뮬레이션
PostgreSQL DB에서 마스터 데이터 조회 후 케파 분석
"""
from typing import List, Dict, Optional
from datetime import date, timedelta
from decimal import Decimal
import psycopg2
from psycopg2.extras import RealDictCursor


class CapacitySimulator:
    """
    생산능력 시뮬레이션
    - 작업장별 가용 케파 계산
    - 수요 대비 케파 충족 여부 분석
    - 병목 공정 식별
    """
    
    def __init__(self, db_config: Dict = None):
        self.db_config = db_config or {
            'host': 'localhost',
            'database': 'ai_factory_db',
            'user': 'postgres',
            'password': 'postgres'
        }
    
    def _get_connection(self):
        """DB 연결"""
        return psycopg2.connect(**self.db_config)
    
    def get_workcenters(self) -> List[Dict]:
        """작업장 목록 조회"""
        with self._get_connection() as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute("""
                    SELECT workcenter_code, workcenter_name, workcenter_type,
                           department, capacity_uom, std_capacity, max_capacity
                    FROM spacepro.sp_workcenter_mst
                    WHERE is_active = TRUE
                    ORDER BY workcenter_code
                """)
                return [dict(row) for row in cur.fetchall()]
    
    def get_shifts(self) -> List[Dict]:
        """교대조 목록 조회"""
        with self._get_connection() as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute("""
                    SELECT shift_code, shift_name, start_time, end_time,
                           break_minutes, work_hours
                    FROM spacepro.sp_shift_mst
                    WHERE is_active = TRUE
                """)
                return [dict(row) for row in cur.fetchall()]
    
    def get_calendar(self, start_date: date, end_date: date, 
                     workcenter_code: str = None) -> List[Dict]:
        """기간별 작업 달력 조회"""
        with self._get_connection() as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                query = """
                    SELECT calendar_code, calendar_date, day_type, shift_code,
                           workcenter_code, available_hours
                    FROM spacepro.sp_calendar_mst
                    WHERE calendar_date BETWEEN %s AND %s
                """
                params = [start_date, end_date]
                
                if workcenter_code:
                    query += " AND (workcenter_code = %s OR workcenter_code IS NULL)"
                    params.append(workcenter_code)
                
                query += " ORDER BY calendar_date"
                cur.execute(query, params)
                return [dict(row) for row in cur.fetchall()]
    
    def get_capacity_definitions(self, workcenter_code: str = None,
                                  item_code: str = None) -> List[Dict]:
        """케파 정의 조회 (고급 변수 포함)"""
        with self._get_connection() as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                query = """
                    SELECT c.workcenter_code, c.item_code, c.capacity_type,
                           c.uph, c.setup_time, c.efficiency,
                           c.yield_rate, c.rework_rate, c.downtime_hours, c.manpower,
                           w.workcenter_name, w.capacity_uom,
                           w.is_outsourced, w.outsourcing_delay_days, w.default_setup_time
                    FROM spacepro.sp_capacity_mst c
                    JOIN spacepro.sp_workcenter_mst w 
                        ON c.workcenter_code = w.workcenter_code
                    WHERE c.is_active = TRUE
                      AND CURRENT_DATE BETWEEN c.valid_from AND c.valid_to
                """
                params = []
                
                if workcenter_code:
                    query += " AND c.workcenter_code = %s"
                    params.append(workcenter_code)
                
                if item_code:
                    query += " AND (c.item_code = %s OR c.item_code IS NULL)"
                    params.append(item_code)
                
                cur.execute(query, params)
                return [dict(row) for row in cur.fetchall()]
    
    def simulate(
        self,
        plan_month: str,  # YYYY-MM
        demands: List[Dict],  # [{"workcenter_code": "WC-001", "item_code": "A001", "quantity": 1000}]
        shift_code: str = "DAY",
        advanced_params: Dict = None  # 고급 시뮬레이션 변수
    ) -> Dict:
        """
        케파 시뮬레이션 실행 (고급 변수 지원)
        
        Args:
            plan_month: 계획 월 (YYYY-MM)
            demands: 수요 목록 [{"workcenter_code", "item_code", "quantity"}]
            shift_code: 적용 교대조
            advanced_params: 고급 시뮬레이션 변수
                - yield_rate_override: 수율 강제 적용 (%)
                - rework_rate_override: 재작업률 강제 적용 (%)
                - downtime_override: 비가동 시간 강제 적용 (시간)
                - efficiency_factor: 효율 계수 (%, 100=기본)
                - outsourcing_delay: 외주 지연 적용 여부
                - night_shift_efficiency: 야간 효율 (%)
        
        Returns:
            시뮬레이션 결과
        """
        # 고급 파라미터 기본값
        params = advanced_params or {}
        yield_override = params.get('yield_rate_override')
        rework_override = params.get('rework_rate_override')
        downtime_override = params.get('downtime_override')
        efficiency_factor = params.get('efficiency_factor', 100) / 100
        outsourcing_delay_enabled = params.get('outsourcing_delay', False)
        night_efficiency = params.get('night_shift_efficiency', 90) / 100
        # 기간 계산
        year, month = map(int, plan_month.split('-'))
        start_date = date(year, month, 1)
        if month == 12:
            end_date = date(year + 1, 1, 1) - timedelta(days=1)
        else:
            end_date = date(year, month + 1, 1) - timedelta(days=1)
        
        # 작업장별 가용 시간 계산
        workcenters = self.get_workcenters()
        calendar = self.get_calendar(start_date, end_date)
        
        # 가동일수 계산
        workdays = len([c for c in calendar if c['day_type'] == 'WORKDAY'])
        half_days = len([c for c in calendar if c['day_type'] == 'HALF'])
        total_hours = workdays * 8 + half_days * 4
        
        # 작업장별 분석
        results = []
        bottlenecks = []
        
        for wc in workcenters:
            wc_code = wc['workcenter_code']
            
            # 해당 작업장 수요 합계
            wc_demands = [d for d in demands if d.get('workcenter_code') == wc_code]
            total_demand = sum(d.get('quantity', 0) for d in wc_demands)
            
            # 케파 정의 조회 (고급 변수 포함)
            cap_defs = self.get_capacity_definitions(wc_code)
            if cap_defs:
                cap_def = cap_defs[0]  # 첫 번째 정의 사용
                uph = float(cap_def.get('uph', 0) or 0)
                efficiency = float(cap_def.get('efficiency', 100) or 100) / 100
                # 고급 변수 (DB 값 또는 오버라이드)
                yield_rate = yield_override if yield_override is not None else float(cap_def.get('yield_rate', 100) or 100)
                rework_rate = rework_override if rework_override is not None else float(cap_def.get('rework_rate', 0) or 0)
                downtime_hours = downtime_override if downtime_override is not None else float(cap_def.get('downtime_hours', 0) or 0)
                manpower = int(cap_def.get('manpower', 1) or 1)
            else:
                uph = float(wc.get('std_capacity', 0) or 0)
                efficiency = 0.85
                yield_rate = yield_override if yield_override is not None else 100.0
                rework_rate = rework_override if rework_override is not None else 0.0
                downtime_hours = downtime_override if downtime_override is not None else 0.0
                manpower = 1
            
            # 효율 계수 적용 (글로벌 오버라이드)
            adjusted_efficiency = efficiency * efficiency_factor
            
            # 가용 시간 계산 (비가동 차감)
            effective_hours = total_hours - downtime_hours
            if effective_hours < 0:
                effective_hours = 0
            
            # 월간 생산 가능 수량 (가용 케파)
            available_capacity = uph * adjusted_efficiency * effective_hours
            
            # 수율 보정: 수율이 90%면 100개 필요 시 112개 투입 필요
            # 따라서 가용 케파도 수율만큼 감소
            yield_factor = yield_rate / 100
            adjusted_capacity = available_capacity * yield_factor
            
            # 재작업 부하: 불량 중 재작업 비율만큼 추가 부하 발생
            # 재작업으로 인한 추가 처리 시간 (단순화: 재작업 = 원래 수량의 일정 비율 추가)
            rework_load = total_demand * (rework_rate / 100) * 0.5  # 재작업은 원래의 50% 시간
            adjusted_demand = total_demand + rework_load
            
            # 가동률 계산
            utilization = (adjusted_demand / adjusted_capacity * 100) if adjusted_capacity > 0 else 0
            
            # 병목 여부
            is_bottleneck = utilization > 100
            gap = adjusted_demand - adjusted_capacity
            
            result = {
                'workcenter_code': wc_code,
                'workcenter_name': wc['workcenter_name'],
                'workcenter_type': wc['workcenter_type'],
                'total_demand': int(total_demand),
                'adjusted_demand': int(adjusted_demand),  # 재작업 포함 수요
                'available_capacity': int(available_capacity),
                'adjusted_capacity': int(adjusted_capacity),  # 수율 적용 케파
                'uph': uph,
                'efficiency': round(adjusted_efficiency * 100, 1),
                'yield_rate': yield_rate,
                'rework_rate': rework_rate,
                'downtime_hours': downtime_hours,
                'manpower': manpower,
                'work_hours': effective_hours,
                'utilization': round(utilization, 1),
                'gap': int(gap),
                'is_bottleneck': is_bottleneck,
                'status': 'OVERLOAD' if utilization > 100 else ('WARNING' if utilization > 85 else 'OK')
            }
            results.append(result)
            
            if is_bottleneck:
                bottlenecks.append({
                    'workcenter_code': wc_code,
                    'workcenter_name': wc['workcenter_name'],
                    'utilization': round(utilization, 1),
                    'shortage': int(gap)
                })
        
        # 전체 요약
        total_capacity = sum(r['available_capacity'] for r in results)
        total_demand_sum = sum(r['total_demand'] for r in results)
        avg_utilization = (total_demand_sum / total_capacity * 100) if total_capacity > 0 else 0
        
        return {
            'success': True,
            'plan_month': plan_month,
            'period': {
                'start_date': start_date.isoformat(),
                'end_date': end_date.isoformat(),
                'workdays': workdays,
                'half_days': half_days,
                'total_hours': total_hours
            },
            'summary': {
                'total_workcenters': len(workcenters),
                'total_demand': int(total_demand_sum),
                'total_capacity': int(total_capacity),
                'avg_utilization': round(avg_utilization, 1),
                'bottleneck_count': len(bottlenecks),
                'status': 'CRITICAL' if len(bottlenecks) > 0 else ('WARNING' if avg_utilization > 85 else 'OK')
            },
            'workcenters': results,
            'bottlenecks': bottlenecks
        }
    
    def get_capacity_summary(self) -> Dict:
        """현재 케파 요약 정보"""
        workcenters = self.get_workcenters()
        capacities = self.get_capacity_definitions()
        
        summary = {
            'total_workcenters': len(workcenters),
            'by_type': {},
            'total_std_capacity': 0,
            'capacity_definitions': len(capacities)
        }
        
        for wc in workcenters:
            wc_type = wc['workcenter_type']
            if wc_type not in summary['by_type']:
                summary['by_type'][wc_type] = 0
            summary['by_type'][wc_type] += 1
            summary['total_std_capacity'] += float(wc.get('std_capacity', 0) or 0)
        
        return summary
