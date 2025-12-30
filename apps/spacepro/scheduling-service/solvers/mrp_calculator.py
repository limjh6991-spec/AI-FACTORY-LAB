"""
MRP (Material Requirements Planning) 자재 소요량 예측 솔버
BOM 전개 및 순소요량 계산
"""
import psycopg2
from psycopg2.extras import RealDictCursor
from typing import Dict, List, Optional
from decimal import Decimal


class MRPCalculator:
    """자재 소요량 계획(MRP) 계산기"""
    
    def __init__(self):
        self.db_config = {
            'host': 'localhost',
            'database': 'ai_factory_db',
            'user': 'postgres',
            'password': 'postgres'
        }
    
    def _get_connection(self):
        return psycopg2.connect(**self.db_config)

    def get_products(self) -> List[Dict]:
        """완제품 목록 조회"""
        with self._get_connection() as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute("""
                    SELECT item_code, item_name, item_type, unit, 
                           lead_time, safety_stock, standard_cost
                    FROM spacepro.sp_item_mst 
                    WHERE item_type = 'PRODUCT' AND is_active = TRUE
                    ORDER BY item_code
                """)
                return [dict(row) for row in cur.fetchall()]

    def get_items(self, item_type: Optional[str] = None) -> List[Dict]:
        """품목 목록 조회"""
        with self._get_connection() as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                query = """
                    SELECT item_code, item_name, item_type, unit, 
                           lead_time, safety_stock, standard_cost
                    FROM spacepro.sp_item_mst 
                    WHERE is_active = TRUE
                """
                params = []
                if item_type:
                    query += " AND item_type = %s"
                    params.append(item_type)
                query += " ORDER BY item_code"
                
                cur.execute(query, params)
                return [dict(row) for row in cur.fetchall()]

    def get_bom(self, parent_item: str) -> List[Dict]:
        """특정 품목의 BOM 조회"""
        with self._get_connection() as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute("""
                    SELECT b.parent_item, b.child_item, b.bom_level, 
                           b.quantity, b.loss_rate,
                           i.item_name, i.item_type, i.unit, i.lead_time, i.safety_stock
                    FROM spacepro.sp_bom_mst b
                    JOIN spacepro.sp_item_mst i ON b.child_item = i.item_code
                    WHERE b.parent_item = %s AND b.is_active = TRUE
                    ORDER BY b.bom_level, b.child_item
                """, (parent_item,))
                return [dict(row) for row in cur.fetchall()]

    def get_inventory(self, item_code: str = None) -> Dict:
        """재고 현황 조회"""
        with self._get_connection() as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                if item_code:
                    cur.execute("""
                        SELECT item_code, on_hand_qty, allocated_qty, 
                               in_transit_qty, warehouse
                        FROM spacepro.sp_inventory 
                        WHERE item_code = %s
                    """, (item_code,))
                    row = cur.fetchone()
                    return dict(row) if row else {
                        'item_code': item_code,
                        'on_hand_qty': 0,
                        'allocated_qty': 0,
                        'in_transit_qty': 0
                    }
                else:
                    cur.execute("""
                        SELECT item_code, on_hand_qty, allocated_qty, 
                               in_transit_qty, warehouse
                        FROM spacepro.sp_inventory
                    """)
                    return {row['item_code']: dict(row) for row in cur.fetchall()}

    def explode_bom(self, parent_item: str, quantity: float, level: int = 0) -> List[Dict]:
        """
        BOM 전개 (재귀적)
        생산 계획 수량에 따른 모든 하위 품목의 총소요량 계산
        """
        results = []
        bom_items = self.get_bom(parent_item)
        
        for item in bom_items:
            # 소요량 계산 (수량 × BOM 수량 × (1 + 로스율/100))
            loss_rate = float(item.get('loss_rate', 0)) / 100
            required_qty = float(quantity) * float(item['quantity']) * (1 + loss_rate)
            
            result = {
                'parent_item': parent_item,
                'item_code': item['child_item'],
                'item_name': item['item_name'],
                'item_type': item['item_type'],
                'unit': item['unit'],
                'bom_level': level + 1,
                'bom_quantity': float(item['quantity']),
                'loss_rate': float(item.get('loss_rate', 0)),
                'required_quantity': round(required_qty, 2),
                'lead_time': item.get('lead_time', 0),
                'safety_stock': float(item.get('safety_stock', 0))
            }
            results.append(result)
            
            # 반제품인 경우 하위 BOM도 전개
            if item['item_type'] == 'SEMI':
                sub_results = self.explode_bom(
                    item['child_item'], 
                    required_qty, 
                    level + 1
                )
                results.extend(sub_results)
        
        return results

    def calculate_mrp(
        self, 
        production_plans: List[Dict],  # [{"item_code": "PROD-001", "quantity": 1000}]
        consider_inventory: bool = True
    ) -> Dict:
        """
        MRP 계산 (자재 소요량 예측)
        
        1. 생산 계획에서 총소요량 계산 (BOM 전개)
        2. 순소요량 = 총소요량 - 가용재고 + 안전재고
        3. 발주량/생산량 결정
        """
        all_requirements = []
        aggregated = {}  # 품목별 합산
        
        # 1. 각 생산 계획에 대해 BOM 전개
        for plan in production_plans:
            item_code = plan['item_code']
            quantity = plan['quantity']
            
            # BOM 전개
            exploded = self.explode_bom(item_code, quantity)
            
            for item in exploded:
                key = item['item_code']
                if key not in aggregated:
                    aggregated[key] = {
                        'item_code': item['item_code'],
                        'item_name': item['item_name'],
                        'item_type': item['item_type'],
                        'unit': item['unit'],
                        'lead_time': item['lead_time'],
                        'safety_stock': item['safety_stock'],
                        'gross_requirement': 0,
                        'on_hand_qty': 0,
                        'allocated_qty': 0,
                        'in_transit_qty': 0,
                        'net_requirement': 0,
                        'order_quantity': 0,
                        'parents': set()
                    }
                aggregated[key]['gross_requirement'] += item['required_quantity']
                aggregated[key]['parents'].add(item['parent_item'])
        
        # 2. 재고 정보 반영
        inventory = self.get_inventory()
        
        for item_code, item in aggregated.items():
            inv = inventory.get(item_code, {})
            item['on_hand_qty'] = float(inv.get('on_hand_qty', 0))
            item['allocated_qty'] = float(inv.get('allocated_qty', 0))
            item['in_transit_qty'] = float(inv.get('in_transit_qty', 0))
            
            # 가용재고 = 현재고 - 할당량 + 입고예정
            available = item['on_hand_qty'] - item['allocated_qty'] + item['in_transit_qty']
            
            # 순소요량 = 총소요량 - 가용재고 + 안전재고
            if consider_inventory:
                net = item['gross_requirement'] - available + item['safety_stock']
            else:
                net = item['gross_requirement']
            
            item['net_requirement'] = max(0, round(net, 2))
            item['order_quantity'] = item['net_requirement']  # 추후 LOT 사이즈 적용
            item['parents'] = list(item['parents'])
        
        # 3. 결과 정리
        requirements = list(aggregated.values())
        requirements.sort(key=lambda x: (x['item_type'], x['item_code']))
        
        # 품목 유형별 통계
        summary = {
            'total_items': len(requirements),
            'raw_materials': len([r for r in requirements if r['item_type'] == 'RAW']),
            'semi_products': len([r for r in requirements if r['item_type'] == 'SEMI']),
            'shortage_items': len([r for r in requirements if r['net_requirement'] > 0]),
            'total_gross': sum(r['gross_requirement'] for r in requirements),
            'total_net': sum(r['net_requirement'] for r in requirements)
        }
        
        return {
            'success': True,
            'production_plans': production_plans,
            'summary': summary,
            'requirements': requirements
        }


if __name__ == '__main__':
    # 테스트
    mrp = MRPCalculator()
    
    print("=== 완제품 목록 ===")
    products = mrp.get_products()
    for p in products:
        print(f"  {p['item_code']}: {p['item_name']}")
    
    print("\n=== PROD-001 BOM 전개 (1000개) ===")
    result = mrp.calculate_mrp([
        {"item_code": "PROD-001", "quantity": 1000}
    ])
    
    print(f"Summary: {result['summary']}")
    print("\nRequirements:")
    for r in result['requirements']:
        print(f"  {r['item_code']}: 총소요={r['gross_requirement']}, 순소요={r['net_requirement']}")
