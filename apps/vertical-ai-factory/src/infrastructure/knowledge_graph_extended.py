"""
knowledge_graph_extended.py - 확장 Knowledge Graph

3가지 핵심 로직을 그래프에 주입:
1. Relational Logic (SQL 생성용)
2. UI Logic (화면 생성용)
3. Process Logic (업무 흐름용)
"""

from typing import Optional, List, Dict, Any
import re
import networkx as nx
from .knowledge_graph import KnowledgeGraph, get_knowledge_graph

# ============================================
# 확장 Node Type 상수
# ============================================
NODE_JOIN_KEY = "JOIN_KEY"
NODE_UI_COMPONENT = "UI_COMPONENT"
NODE_UI_PATTERN = "UI_PATTERN"
NODE_PROCESS = "PROCESS"
NODE_ACTIVITY = "ACTIVITY"
NODE_FORMULA = "FORMULA"

# ============================================
# 확장 Edge Type 상수
# ============================================
EDGE_JOINABLE_WITH = "joinable_with"
EDGE_RENDERS_AS = "renders_as"
EDGE_PATTERN_MATCH = "pattern_match"
EDGE_NEXT_STEP = "next_step"
EDGE_BELONGS_TO = "belongs_to"


# ============================================
# UI 컴포넌트 패턴 정의
# ============================================
UI_PATTERNS = [
    # (패턴, 컴포넌트명, 추가 props)
    (r".*_date$|.*_dt$|.*_ymd$", "DatePicker", {"format": "YYYY-MM-DD"}),
    (r".*_yn$|is_.*|has_.*", "Checkbox", {}),
    (r".*_code$|.*_cd$", "BiSelect", {"searchable": True}),
    (r".*_type$|.*_status$|.*_state$", "Select", {}),
    (r".*_amt$|.*_amount$|.*_price$", "InputNumber", {"precision": 2}),
    (r".*_qty$|.*_quantity$", "InputNumber", {"precision": 0}),
    (r".*_rate$|.*_pct$", "InputNumber", {"precision": 2, "suffix": "%"}),
    (r".*_memo$|.*_remark$|.*_desc$", "TextArea", {"rows": 3}),
    (r".*_email$", "Input", {"type": "email"}),
    (r".*_phone$|.*_tel$", "Input", {"type": "tel"}),
    (r".*_url$|.*_link$", "Input", {"type": "url"}),
]

# ============================================
# 데이터 타입 → UI 컴포넌트 매핑
# ============================================
DATA_TYPE_UI_MAP = {
    "DATE": {"component": "DatePicker", "props": {}},
    "TIMESTAMP": {"component": "DatePicker", "props": {"showTime": True}},
    "BOOLEAN": {"component": "Checkbox", "props": {}},
    "INTEGER": {"component": "InputNumber", "props": {"precision": 0}},
    "NUMERIC": {"component": "InputNumber", "props": {"precision": 2}},
    "DECIMAL": {"component": "InputNumber", "props": {"precision": 2}},
    "TEXT": {"component": "TextArea", "props": {}},
    "VARCHAR": {"component": "Input", "props": {}},
}


class ExtendedKnowledgeGraph:
    """
    확장 Knowledge Graph
    
    기존 KnowledgeGraph를 래핑하여 논리적 추론 기능 추가.
    """
    
    def __init__(self, base_graph: KnowledgeGraph = None):
        self.kg = base_graph or get_knowledge_graph()
        self._ui_patterns_compiled = [
            (re.compile(p, re.IGNORECASE), comp, props)
            for p, comp, props in UI_PATTERNS
        ]
    
    # ========================================
    # 1. Relational Logic (SQL 생성용)
    # ========================================
    
    def add_join_relationship(
        self,
        source_table: str,
        target_table: str,
        source_column: str,
        target_column: str,
        join_type: str = "LEFT",
        cardinality: str = "1:N"
    ) -> None:
        """
        테이블 간 JOIN 관계 추가
        
        Args:
            source_table: 원본 테이블 (표준명)
            target_table: 대상 테이블 (표준명)
            source_column: 원본 컬럼
            target_column: 대상 컬럼
            join_type: JOIN 유형 (INNER, LEFT, RIGHT, FULL)
            cardinality: 카디널리티 (1:1, 1:N, M:N)
        """
        source_node = f"TABLE:{source_table}"
        target_node = f"TABLE:{target_table}"
        
        # JOIN_KEY 노드 생성
        join_key_id = f"JOIN_KEY:{source_table}_{target_table}"
        self.kg.graph.add_node(
            join_key_id,
            node_type=NODE_JOIN_KEY,
            source_table=source_table,
            target_table=target_table,
            source_column=source_column,
            target_column=target_column,
            join_type=join_type,
            cardinality=cardinality
        )
        
        # 엣지 연결: 양방향으로 추가하되, join_key는 하나만 참조
        self.kg.graph.add_edge(
            source_node, target_node,
            edge_type=EDGE_JOINABLE_WITH,
            join_key=join_key_id
        )
    
    def get_join_path(
        self,
        source_table: str,
        target_table: str
    ) -> List[Dict[str, Any]]:
        """
        두 테이블 사이의 JOIN 경로 탐색 (SQL 생성용)
        
        Returns:
            JOIN 정보 리스트 (경로 순서대로)
        """
        source_node = f"TABLE:{source_table}"
        target_node = f"TABLE:{target_table}"
        
        try:
            path = nx.shortest_path(
                self.kg.graph, source_node, target_node
            )
            
            joins = []
            for i in range(len(path) - 1):
                edge_data = self.kg.graph.get_edge_data(path[i], path[i+1])
                if edge_data and edge_data.get("edge_type") == EDGE_JOINABLE_WITH:
                    join_key = edge_data.get("join_key")
                    if join_key and self.kg.graph.has_node(join_key):
                        join_node = self.kg.graph.nodes[join_key]
                        joins.append({
                            "source": join_node.get("source_table"),
                            "target": join_node.get("target_table"),
                            "source_col": join_node.get("source_column"),
                            "target_col": join_node.get("target_column"),
                            "join_type": join_node.get("join_type", "LEFT")
                        })
            
            return joins
        
        except nx.NetworkXNoPath:
            return []
    
    def get_all_join_relationships(self) -> List[Dict[str, Any]]:
        """모든 JOIN 관계 조회"""
        joins = []
        for node_id, data in self.kg.graph.nodes(data=True):
            if data.get("node_type") == NODE_JOIN_KEY:
                joins.append({
                    "id": node_id,
                    "source_table": data.get("source_table"),
                    "target_table": data.get("target_table"),
                    "source_column": data.get("source_column"),
                    "target_column": data.get("target_column"),
                    "join_type": data.get("join_type"),
                    "cardinality": data.get("cardinality")
                })
        return joins
    
    def generate_join_sql(
        self,
        tables: List[str],
        company_code: str = "BINARY"
    ) -> str:
        """
        테이블 목록에서 자동으로 JOIN SQL 생성
        
        Args:
            tables: 표준 테이블명 리스트
            company_code: 회사 코드
        
        Returns:
            FROM ... JOIN ... 절 SQL
        """
        if not tables:
            return ""
        
        if len(tables) == 1:
            return f"FROM {self._resolve_table_name(tables[0], company_code)}"
        
        sql_parts = []
        base_table = tables[0]
        sql_parts.append(f"FROM {self._resolve_table_name(base_table, company_code)}")
        
        visited = {base_table}
        for target_table in tables[1:]:
            if target_table in visited:
                continue
            
            # 가장 가까운 방문한 테이블에서 경로 찾기
            best_path = None
            for visited_table in visited:
                joins = self.get_join_path(visited_table, target_table)
                if joins and (best_path is None or len(joins) < len(best_path)):
                    best_path = joins
            
            if best_path:
                for join in best_path:
                    if join["target"] not in visited:
                        target_resolved = self._resolve_table_name(join["target"], company_code)
                        source_col = self._resolve_column_name(join["source"], join["source_col"], company_code)
                        target_col = self._resolve_column_name(join["target"], join["target_col"], company_code)
                        
                        sql_parts.append(
                            f"{join['join_type']} JOIN {target_resolved} "
                            f"ON {source_col} = {target_col}"
                        )
                        visited.add(join["target"])
        
        return "\n".join(sql_parts)
    
    # ========================================
    # 2. UI Logic (화면 생성용)
    # ========================================
    
    def link_ui_components(self) -> int:
        """
        컬럼명 패턴을 분석하여 자동으로 UI 컴포넌트 연결
        
        Returns:
            연결된 컬럼 수
        """
        # UI 컴포넌트 노드 등록
        registered_components = set()
        for _, component_name, props in UI_PATTERNS:
            component_id = f"UI_COMPONENT:{component_name}"
            if component_id not in registered_components:
                self.kg.graph.add_node(
                    component_id,
                    node_type=NODE_UI_COMPONENT,
                    component_name=component_name,
                    default_props=props
                )
                registered_components.add(component_id)
        
        # 패턴 노드 등록
        for pattern, component_name, _ in UI_PATTERNS:
            pattern_id = f"UI_PATTERN:{pattern}"
            component_id = f"UI_COMPONENT:{component_name}"
            
            self.kg.graph.add_node(
                pattern_id,
                node_type=NODE_UI_PATTERN,
                pattern=pattern
            )
            
            self.kg.graph.add_edge(
                pattern_id, component_id,
                edge_type=EDGE_PATTERN_MATCH
            )
        
        # 기존 컬럼 노드에 UI 컴포넌트 연결
        linked_count = 0
        for node_id, data in self.kg.graph.nodes(data=True):
            if data.get("node_type") == "COLUMN":
                column_name = data.get("standard_name", "")
                
                for regex, component_name, props in self._ui_patterns_compiled:
                    if regex.match(column_name):
                        component_id = f"UI_COMPONENT:{component_name}"
                        self.kg.graph.add_edge(
                            node_id, component_id,
                            edge_type=EDGE_RENDERS_AS,
                            props=props
                        )
                        linked_count += 1
                        break
        
        return linked_count
    
    def get_ui_component(
        self,
        column_name: str,
        data_type: str = None
    ) -> Dict[str, Any]:
        """
        컬럼명/데이터타입으로 적합한 UI 컴포넌트 조회
        
        Args:
            column_name: 컬럼명
            data_type: 데이터 타입 (optional)
        
        Returns:
            UI 컴포넌트 정보
        """
        # 패턴 매칭으로 컴포넌트 찾기
        for regex, component_name, props in self._ui_patterns_compiled:
            if regex.match(column_name):
                return {
                    "component": component_name,
                    "props": props,
                    "matched_by": "pattern"
                }
        
        # 데이터 타입 기반 폴백
        if data_type and data_type.upper() in DATA_TYPE_UI_MAP:
            result = DATA_TYPE_UI_MAP[data_type.upper()].copy()
            result["matched_by"] = "data_type"
            return result
        
        # 기본값
        return {"component": "Input", "props": {}, "matched_by": "default"}
    
    def get_all_ui_components(self) -> List[Dict[str, Any]]:
        """등록된 모든 UI 컴포넌트 조회"""
        components = []
        for node_id, data in self.kg.graph.nodes(data=True):
            if data.get("node_type") == NODE_UI_COMPONENT:
                components.append({
                    "id": node_id,
                    "name": data.get("component_name"),
                    "props": data.get("default_props", {})
                })
        return components
    
    # ========================================
    # 3. Process Logic (업무 흐름용)
    # ========================================
    
    def add_process(
        self,
        process_id: str,
        process_name: str,
        category: str,
        activities: List[Dict[str, Any]]
    ) -> None:
        """
        업무 프로세스 추가
        
        Args:
            process_id: 프로세스 ID
            process_name: 프로세스명
            category: 카테고리 (SALES, PRODUCTION, PURCHASE)
            activities: 활동 리스트 [{id, name, tables, columns}, ...]
        """
        process_node = f"PROCESS:{process_id}"
        
        self.kg.graph.add_node(
            process_node,
            node_type=NODE_PROCESS,
            process_id=process_id,
            process_name=process_name,
            category=category
        )
        
        prev_activity = None
        for idx, activity in enumerate(activities):
            activity_node = f"ACTIVITY:{activity['id']}"
            
            self.kg.graph.add_node(
                activity_node,
                node_type=NODE_ACTIVITY,
                activity_id=activity['id'],
                activity_name=activity['name'],
                sequence=idx + 1,
                required_tables=activity.get('tables', []),
                required_columns=activity.get('columns', [])
            )
            
            # 프로세스 → 활동 (belongs_to를 역방향으로)
            self.kg.graph.add_edge(
                activity_node, process_node,
                edge_type=EDGE_BELONGS_TO
            )
            
            # 활동 → 다음 활동
            if prev_activity:
                self.kg.graph.add_edge(
                    prev_activity, activity_node,
                    edge_type=EDGE_NEXT_STEP
                )
            
            prev_activity = activity_node
    
    def get_process_flow(self, process_id: str) -> List[Dict[str, Any]]:
        """
        프로세스의 전체 흐름 조회
        
        Returns:
            활동 리스트 (순서대로)
        """
        activities = []
        
        for node_id, data in self.kg.graph.nodes(data=True):
            if data.get("node_type") == NODE_ACTIVITY:
                # 이 프로세스에 속하는지 확인
                for _, target, edge_data in self.kg.graph.out_edges(node_id, data=True):
                    if edge_data.get("edge_type") == EDGE_BELONGS_TO:
                        if target == f"PROCESS:{process_id}":
                            activities.append({
                                "id": data.get("activity_id"),
                                "name": data.get("activity_name"),
                                "sequence": data.get("sequence"),
                                "tables": data.get("required_tables", []),
                                "columns": data.get("required_columns", [])
                            })
        
        # 순서대로 정렬
        return sorted(activities, key=lambda x: x.get("sequence", 0))
    
    def get_all_processes(self) -> List[Dict[str, Any]]:
        """모든 프로세스 조회"""
        processes = []
        for node_id, data in self.kg.graph.nodes(data=True):
            if data.get("node_type") == NODE_PROCESS:
                processes.append({
                    "id": data.get("process_id"),
                    "name": data.get("process_name"),
                    "category": data.get("category")
                })
        return processes
    
    def get_next_activities(self, activity_id: str) -> List[str]:
        """특정 활동의 다음 단계들 조회"""
        activity_node = f"ACTIVITY:{activity_id}"
        next_steps = []
        
        for _, target, edge_data in self.kg.graph.out_edges(activity_node, data=True):
            if edge_data.get("edge_type") == EDGE_NEXT_STEP:
                target_data = self.kg.graph.nodes.get(target, {})
                next_steps.append(target_data.get("activity_name"))
        
        return next_steps
    
    # ========================================
    # 초기화 및 헬퍼
    # ========================================
    
    def inject_default_logic(self) -> Dict[str, int]:
        """
        기본 로직 주입 (초기화 시 호출)
        
        Returns:
            주입 결과 통계
        """
        stats = {
            "ui_links": 0,
            "join_relations": 0,
            "processes": 0
        }
        
        # UI 컴포넌트 자동 연결
        stats["ui_links"] = self.link_ui_components()
        
        # 기본 JOIN 관계 추가
        default_joins = [
            ("product_master", "bom_master", "product_code", "parent_product_code"),
            ("order_header", "order_detail", "order_no", "order_no"),
            ("product_master", "order_detail", "product_code", "product_code"),
            ("dept_master", "user_master", "department_code", "department_code"),
            ("customer_master", "order_header", "customer_code", "customer_code"),
        ]
        
        for src, tgt, src_col, tgt_col in default_joins:
            src_node = f"TABLE:{src}"
            if self.kg.graph.has_node(src_node):
                self.add_join_relationship(src, tgt, src_col, tgt_col)
                stats["join_relations"] += 1
        
        # 기본 프로세스 추가
        default_processes = [
            {
                "id": "order_to_cash",
                "name": "수주-출하 프로세스",
                "category": "SALES",
                "activities": [
                    {"id": "so_register", "name": "수주등록", "tables": ["order_header", "order_detail"]},
                    {"id": "so_approval", "name": "수주승인", "tables": ["order_header"]},
                    {"id": "prod_order", "name": "생산지시", "tables": ["production_order"]},
                    {"id": "ship_out", "name": "출하지시", "tables": ["shipment"]},
                ]
            },
            {
                "id": "procure_to_pay",
                "name": "구매-지급 프로세스",
                "category": "PURCHASE",
                "activities": [
                    {"id": "po_request", "name": "구매요청", "tables": ["purchase_request"]},
                    {"id": "po_order", "name": "발주등록", "tables": ["purchase_order"]},
                    {"id": "gr_receipt", "name": "입고처리", "tables": ["goods_receipt"]},
                    {"id": "ap_invoice", "name": "매입처리", "tables": ["ap_invoice"]},
                ]
            },
            {
                "id": "production_flow",
                "name": "생산수불 프로세스",
                "category": "PRODUCTION",
                "activities": [
                    {"id": "mat_issue", "name": "자재출고", "tables": ["material_issue"]},
                    {"id": "prod_start", "name": "생산시작", "tables": ["production_order"]},
                    {"id": "prod_complete", "name": "생산완료", "tables": ["production_result"]},
                    {"id": "fg_receipt", "name": "제품입고", "tables": ["finished_goods"]},
                ]
            },
        ]
        
        for proc in default_processes:
            self.add_process(proc["id"], proc["name"], proc["category"], proc["activities"])
            stats["processes"] += 1
        
        return stats
    
    def get_extended_stats(self) -> Dict[str, int]:
        """확장된 통계 반환"""
        base_stats = self.kg.get_stats()
        
        # 확장 노드 타입별 카운트
        extended_counts = {
            NODE_JOIN_KEY: 0,
            NODE_UI_COMPONENT: 0,
            NODE_UI_PATTERN: 0,
            NODE_PROCESS: 0,
            NODE_ACTIVITY: 0,
        }
        
        for _, data in self.kg.graph.nodes(data=True):
            node_type = data.get("node_type")
            if node_type in extended_counts:
                extended_counts[node_type] += 1
        
        return {**base_stats, **extended_counts}
    
    def _resolve_table_name(self, standard_name: str, company_code: str) -> str:
        """표준 테이블명 → 회사별 테이블명"""
        # standard_name에서 카테고리 추출 (예: product_master → PRODUCT)
        category = standard_name.replace("_master", "").replace("_header", "").replace("_detail", "").upper()
        tables = self.kg.search_tables(category, company_code)
        if tables and tables[0].get("company_table"):
            schema = tables[0].get("company_schema", "public")
            return f'"{schema}".{tables[0]["company_table"]}'
        return standard_name
    
    def _resolve_column_name(self, table: str, column: str, company_code: str) -> str:
        """표준 컬럼명 → 회사별 컬럼명"""
        category = table.replace("_master", "").replace("_header", "").replace("_detail", "").upper()
        mapping = self.kg.get_column_mapping(column, company_code, category)
        if mapping:
            return mapping.get("company_column", column)
        return column


# ============================================
# 싱글톤 및 팩토리 함수
# ============================================

_extended_graph: Optional[ExtendedKnowledgeGraph] = None


def get_extended_knowledge_graph(
    base_graph: KnowledgeGraph = None,
    inject_defaults: bool = True
) -> ExtendedKnowledgeGraph:
    """
    확장 Knowledge Graph 싱글톤 인스턴스 반환
    
    Args:
        base_graph: 기존 KnowledgeGraph (None이면 기본 인스턴스 사용)
        inject_defaults: True면 기본 로직 주입
    
    Returns:
        ExtendedKnowledgeGraph 인스턴스
    """
    global _extended_graph
    
    if _extended_graph is None:
        _extended_graph = ExtendedKnowledgeGraph(base_graph)
        if inject_defaults:
            _extended_graph.inject_default_logic()
    
    return _extended_graph


def reset_extended_knowledge_graph() -> None:
    """확장 Knowledge Graph 인스턴스 리셋 (테스트용)"""
    global _extended_graph
    _extended_graph = None
