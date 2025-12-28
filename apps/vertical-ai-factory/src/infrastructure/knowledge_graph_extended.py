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
# Layer 2: Logic (기존)
NODE_JOIN_KEY = "JOIN_KEY"
NODE_UI_COMPONENT = "UI_COMPONENT"
NODE_UI_PATTERN = "UI_PATTERN"
NODE_PROCESS = "PROCESS"
NODE_ACTIVITY = "ACTIVITY"
NODE_FORMULA = "FORMULA"

# Layer 3: Semantic (Text-to-Report 확장)
NODE_BUSINESS_CONCEPT = "BUSINESS_CONCEPT"
NODE_UI_TEMPLATE = "UI_TEMPLATE"
NODE_AGGREGATION_RULE = "AGGREGATION_RULE"
NODE_INTENT_PATTERN = "INTENT_PATTERN"
NODE_REPORT_COLUMN = "REPORT_COLUMN"

# ============================================
# 확장 Edge Type 상수
# ============================================
# Layer 2: Logic (기존)
EDGE_JOINABLE_WITH = "joinable_with"
EDGE_RENDERS_AS = "renders_as"
EDGE_PATTERN_MATCH = "pattern_match"
EDGE_NEXT_STEP = "next_step"
EDGE_BELONGS_TO = "belongs_to"

# Layer 3: Semantic (Text-to-Report 확장)
EDGE_MATCHES_INTENT = "matches_intent"
EDGE_REQUIRES_COLUMN = "requires_column"
EDGE_REQUIRES_TABLE = "requires_table"
EDGE_HAS_AGGREGATION = "has_aggregation"
EDGE_GROUPS_BY = "groups_by"
EDGE_PIVOTS_BY = "pivots_by"
EDGE_VALUES_FROM = "values_from"
EDGE_MAPS_TO = "maps_to"


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
                try:
                    joins = self.get_join_path(visited_table, target_table)
                    if joins and (best_path is None or len(joins) < len(best_path)):
                        best_path = joins
                except Exception:
                    # 경로를 찾을 수 없는 경우 무시
                    pass
            
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
    # 4. Semantic Layer (Text-to-Report)
    # ========================================
    
    def add_business_concept(
        self,
        concept_id: str,
        name: str,
        category: str,
        keywords: List[str],
        description: str = "",
        required_tables: List[str] = None,
        default_filters: Dict[str, Any] = None
    ) -> None:
        """
        비즈니스 개념 추가
        
        Args:
            concept_id: 개념 ID (예: cost_analysis_report)
            name: 개념명 (예: 원가분석 리포트)
            category: 카테고리 (COST, SALES, PRODUCTION, INVENTORY)
            keywords: 키워드 리스트 (의도 매칭용)
            description: 설명
            required_tables: 필요 테이블 리스트
            default_filters: 기본 필터 조건
        """
        node_id = f"BUSINESS_CONCEPT:{concept_id}"
        
        self.kg.graph.add_node(
            node_id,
            node_type=NODE_BUSINESS_CONCEPT,
            concept_id=concept_id,
            name=name,
            category=category,
            keywords=keywords or [],
            description=description,
            required_tables=required_tables or [],
            default_filters=default_filters or {}
        )
    
    def add_intent_pattern(
        self,
        pattern_id: str,
        patterns: List[str],
        concept_id: str,
        examples: List[str] = None
    ) -> None:
        """
        의도 패턴 추가 및 비즈니스 개념과 연결
        
        Args:
            pattern_id: 패턴 ID
            patterns: 정규식 패턴 리스트
            concept_id: 연결할 비즈니스 개념 ID
            examples: 예시 문장
        """
        node_id = f"INTENT_PATTERN:{pattern_id}"
        concept_node = f"BUSINESS_CONCEPT:{concept_id}"
        
        self.kg.graph.add_node(
            node_id,
            node_type=NODE_INTENT_PATTERN,
            pattern_id=pattern_id,
            patterns=patterns,
            examples=examples or [],
            compiled_patterns=[re.compile(p, re.IGNORECASE) for p in patterns]
        )
        
        # 의도 → 비즈니스 개념 연결
        self.kg.graph.add_edge(
            node_id, concept_node,
            edge_type=EDGE_MATCHES_INTENT
        )
    
    def add_ui_template(
        self,
        template_id: str,
        name: str,
        component: str,
        layout_type: str,
        features: List[str] = None,
        default_props: Dict[str, Any] = None,
        suitable_for: List[str] = None
    ) -> None:
        """
        UI 템플릿 추가
        
        Args:
            template_id: 템플릿 ID (예: aggrid_pivot)
            name: 템플릿명
            component: 컴포넌트명 (예: AgGridReact)
            layout_type: 레이아웃 유형 (SIMPLE, PIVOT, MASTER_DETAIL)
            features: 지원 기능 리스트
            default_props: 기본 props
            suitable_for: 적합한 카테고리 리스트
        """
        node_id = f"UI_TEMPLATE:{template_id}"
        
        self.kg.graph.add_node(
            node_id,
            node_type=NODE_UI_TEMPLATE,
            template_id=template_id,
            name=name,
            component=component,
            layout_type=layout_type,
            features=features or [],
            default_props=default_props or {},
            suitable_for=suitable_for or []
        )
    
    def add_aggregation_rule(
        self,
        rule_id: str,
        name: str,
        function: str,
        agg_func: str,
        applies_to: List[str] = None,
        format_type: str = "number",
        decimal_places: int = 0
    ) -> None:
        """
        집계 규칙 추가
        
        Args:
            rule_id: 규칙 ID (예: sum_qty)
            name: 규칙명 (예: 수량 합계)
            function: SQL 함수 (SUM, AVG, COUNT)
            agg_func: AG Grid aggFunc
            applies_to: 적용 가능한 컬럼 패턴
            format_type: 포맷 타입
            decimal_places: 소수점 자릿수
        """
        node_id = f"AGGREGATION_RULE:{rule_id}"
        
        self.kg.graph.add_node(
            node_id,
            node_type=NODE_AGGREGATION_RULE,
            rule_id=rule_id,
            name=name,
            function=function,
            agg_func=agg_func,
            applies_to=applies_to or [],
            format_type=format_type,
            decimal_places=decimal_places
        )
    
    def add_report_column(
        self,
        column_id: str,
        source_column: str,
        display_name: str,
        role: str,
        concept_id: str,
        width: int = 100,
        pinned: str = None,
        aggregation_rule: str = None,
        lookup_table: str = None,
        lookup_display: str = None
    ) -> None:
        """
        리포트 컬럼 정의 추가
        
        Args:
            column_id: 컬럼 ID
            source_column: 원본 컬럼명
            display_name: 표시명
            role: 역할 (GROUP, PIVOT, VALUE, FILTER)
            concept_id: 연결할 비즈니스 개념 ID
            width: 컬럼 너비
            pinned: 고정 위치 (left, right)
            aggregation_rule: 적용할 집계 규칙 ID
            lookup_table: 참조 테이블
            lookup_display: 참조 표시 컬럼
        """
        node_id = f"REPORT_COLUMN:{column_id}"
        concept_node = f"BUSINESS_CONCEPT:{concept_id}"
        
        self.kg.graph.add_node(
            node_id,
            node_type=NODE_REPORT_COLUMN,
            column_id=column_id,
            source_column=source_column,
            display_name=display_name,
            role=role,
            width=width,
            pinned=pinned,
            lookup_table=lookup_table,
            lookup_display=lookup_display
        )
        
        # 역할에 따른 엣지 연결
        edge_type_map = {
            "GROUP": EDGE_GROUPS_BY,
            "PIVOT": EDGE_PIVOTS_BY,
            "VALUE": EDGE_VALUES_FROM,
            "FILTER": EDGE_REQUIRES_COLUMN
        }
        edge_type = edge_type_map.get(role, EDGE_REQUIRES_COLUMN)
        
        self.kg.graph.add_edge(
            concept_node, node_id,
            edge_type=edge_type
        )
        
        # 집계 규칙 연결
        if aggregation_rule:
            agg_node = f"AGGREGATION_RULE:{aggregation_rule}"
            if self.kg.graph.has_node(agg_node):
                self.kg.graph.add_edge(
                    node_id, agg_node,
                    edge_type=EDGE_HAS_AGGREGATION
                )
    
    def link_concept_to_template(
        self,
        concept_id: str,
        template_id: str
    ) -> None:
        """비즈니스 개념과 UI 템플릿 연결"""
        concept_node = f"BUSINESS_CONCEPT:{concept_id}"
        template_node = f"UI_TEMPLATE:{template_id}"
        
        self.kg.graph.add_edge(
            concept_node, template_node,
            edge_type=EDGE_RENDERS_AS
        )
    
    # ----------------------------------------
    # Text-to-Report: 추론 메서드
    # ----------------------------------------
    
    def match_intent(self, user_input: str) -> Optional[Dict[str, Any]]:
        """
        사용자 입력에서 의도 매칭
        
        Args:
            user_input: 사용자 자연어 입력
        
        Returns:
            매칭된 비즈니스 개념 정보 또는 None
        """
        for node_id, data in self.kg.graph.nodes(data=True):
            if data.get("node_type") == NODE_INTENT_PATTERN:
                compiled = data.get("compiled_patterns", [])
                for pattern in compiled:
                    if pattern.search(user_input):
                        # 연결된 비즈니스 개념 찾기
                        for _, target, edge in self.kg.graph.out_edges(node_id, data=True):
                            if edge.get("edge_type") == EDGE_MATCHES_INTENT:
                                concept_data = self.kg.graph.nodes.get(target, {})
                                return {
                                    "pattern_id": data.get("pattern_id"),
                                    "concept_id": concept_data.get("concept_id"),
                                    "concept_name": concept_data.get("name"),
                                    "category": concept_data.get("category"),
                                    "matched_input": user_input
                                }
        return None
    
    def get_report_definition(self, concept_id: str) -> Dict[str, Any]:
        """
        비즈니스 개념에서 리포트 정의 추론
        
        Args:
            concept_id: 비즈니스 개념 ID
        
        Returns:
            리포트 정의 (컬럼, 템플릿, 집계 등)
        """
        concept_node = f"BUSINESS_CONCEPT:{concept_id}"
        
        if not self.kg.graph.has_node(concept_node):
            return {}
        
        concept_data = self.kg.graph.nodes[concept_node]
        
        # 연결된 컬럼 수집
        columns = {"groups": [], "pivots": [], "values": [], "filters": []}
        template = None
        
        for _, target, edge in self.kg.graph.out_edges(concept_node, data=True):
            edge_type = edge.get("edge_type")
            target_data = self.kg.graph.nodes.get(target, {})
            
            if edge_type == EDGE_GROUPS_BY:
                col_info = self._extract_column_info(target, target_data)
                columns["groups"].append(col_info)
            elif edge_type == EDGE_PIVOTS_BY:
                col_info = self._extract_column_info(target, target_data)
                columns["pivots"].append(col_info)
            elif edge_type == EDGE_VALUES_FROM:
                col_info = self._extract_column_info(target, target_data)
                columns["values"].append(col_info)
            elif edge_type == EDGE_REQUIRES_COLUMN:
                col_info = self._extract_column_info(target, target_data)
                columns["filters"].append(col_info)
            elif edge_type == EDGE_RENDERS_AS:
                template = {
                    "id": target_data.get("template_id"),
                    "name": target_data.get("name"),
                    "component": target_data.get("component"),
                    "layout_type": target_data.get("layout_type"),
                    "default_props": target_data.get("default_props", {})
                }
        
        return {
            "concept_id": concept_id,
            "concept_name": concept_data.get("name"),
            "category": concept_data.get("category"),
            "description": concept_data.get("description"),
            "required_tables": concept_data.get("required_tables", []),
            "default_filters": concept_data.get("default_filters", {}),
            "columns": columns,
            "template": template
        }
    
    def _extract_column_info(self, node_id: str, data: Dict) -> Dict[str, Any]:
        """리포트 컬럼 정보 추출"""
        col_info = {
            "id": data.get("column_id"),
            "source": data.get("source_column"),
            "display": data.get("display_name"),
            "role": data.get("role"),
            "width": data.get("width", 100),
            "pinned": data.get("pinned"),
            "lookup": None,
            "aggregation": None
        }
        
        # Lookup 정보
        if data.get("lookup_table"):
            col_info["lookup"] = {
                "table": data.get("lookup_table"),
                "display": data.get("lookup_display")
            }
        
        # 집계 규칙 조회
        for _, agg_target, agg_edge in self.kg.graph.out_edges(node_id, data=True):
            if agg_edge.get("edge_type") == EDGE_HAS_AGGREGATION:
                agg_data = self.kg.graph.nodes.get(agg_target, {})
                col_info["aggregation"] = {
                    "function": agg_data.get("function"),
                    "agg_func": agg_data.get("agg_func"),
                    "format": agg_data.get("format_type"),
                    "decimals": agg_data.get("decimal_places")
                }
        
        return col_info
    
    def generate_report_from_text(self, user_input: str) -> Dict[str, Any]:
        """
        사용자 텍스트에서 리포트 정의 생성 (Text-to-Report 핵심)
        
        Args:
            user_input: 사용자 자연어 입력
        
        Returns:
            완전한 리포트 정의 (SQL, AG Grid 설정 포함)
        """
        # Step 1: 의도 매칭
        intent = self.match_intent(user_input)
        if not intent:
            return {"error": "의도를 파악할 수 없습니다", "input": user_input}
        
        # Step 2: 리포트 정의 추론
        report_def = self.get_report_definition(intent["concept_id"])
        if not report_def:
            return {"error": "리포트 정의를 찾을 수 없습니다", "concept": intent["concept_id"]}
        
        # Step 3: AG Grid columnDefs 생성
        column_defs = self._generate_column_defs(report_def)
        
        # Step 4: SQL 생성 (필요 테이블 기반)
        tables = report_def.get("required_tables", [])
        sql = self.generate_join_sql(tables) if tables else ""
        
        return {
            "status": "success",
            "intent": intent,
            "report": report_def,
            "column_defs": column_defs,
            "sql": sql
        }
    
    def _generate_column_defs(self, report_def: Dict) -> List[Dict[str, Any]]:
        """AG Grid columnDefs 생성"""
        column_defs = []
        columns = report_def.get("columns", {})
        
        # Group 컬럼
        for col in columns.get("groups", []):
            col_def = {
                "field": col["source"],
                "headerName": col["display"],
                "rowGroup": True,
                "hide": True,
                "width": col.get("width", 120)
            }
            if col.get("pinned"):
                col_def["pinned"] = col["pinned"]
            if col.get("lookup"):
                col_def["valueGetter"] = f"lookup_{col['lookup']['table']}"
            column_defs.append(col_def)
        
        # Pivot 컬럼
        for col in columns.get("pivots", []):
            column_defs.append({
                "field": col["source"],
                "headerName": col["display"],
                "pivot": True,
                "hide": True
            })
        
        # Value 컬럼
        for col in columns.get("values", []):
            col_def = {
                "field": col["source"],
                "headerName": col["display"],
                "width": col.get("width", 100)
            }
            if col.get("aggregation"):
                col_def["aggFunc"] = col["aggregation"].get("agg_func", "sum")
            column_defs.append(col_def)
        
        return column_defs
    
    def get_all_business_concepts(self) -> List[Dict[str, Any]]:
        """모든 비즈니스 개념 조회"""
        concepts = []
        for node_id, data in self.kg.graph.nodes(data=True):
            if data.get("node_type") == NODE_BUSINESS_CONCEPT:
                concepts.append({
                    "id": data.get("concept_id"),
                    "name": data.get("name"),
                    "category": data.get("category"),
                    "keywords": data.get("keywords", []),
                    "description": data.get("description")
                })
        return concepts
    
    def get_all_ui_templates(self) -> List[Dict[str, Any]]:
        """모든 UI 템플릿 조회"""
        templates = []
        for node_id, data in self.kg.graph.nodes(data=True):
            if data.get("node_type") == NODE_UI_TEMPLATE:
                templates.append({
                    "id": data.get("template_id"),
                    "name": data.get("name"),
                    "component": data.get("component"),
                    "layout_type": data.get("layout_type"),
                    "features": data.get("features", [])
                })
        return templates

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
        
        # ========================================
        # Semantic Layer 기본 데이터 주입 (Text-to-Report)
        # ========================================
        stats["business_concepts"] = 0
        stats["ui_templates"] = 0
        stats["aggregation_rules"] = 0
        
        # 집계 규칙 등록
        aggregation_rules = [
            ("sum", "합계", "SUM", "sum", ["qty", "amt", "amount", "cost", "price"], "number", 0),
            ("avg", "평균", "AVG", "avg", ["rate", "pct", "ratio"], "number", 2),
            ("count", "건수", "COUNT", "count", [], "number", 0),
            ("sum_currency", "금액 합계", "SUM", "sum", ["amt", "amount", "cost", "price"], "currency", 0),
        ]
        
        for rule_id, name, fn, agg_fn, applies, fmt, decimals in aggregation_rules:
            self.add_aggregation_rule(rule_id, name, fn, agg_fn, applies, fmt, decimals)
            stats["aggregation_rules"] += 1
        
        # UI 템플릿 등록
        ui_templates = [
            {
                "id": "aggrid_pivot",
                "name": "피벗 그리드",
                "component": "AgGridReact",
                "layout": "PIVOT",
                "features": ["rowGrouping", "aggregation", "pivotMode", "filtering", "excelExport"],
                "props": {"pivotMode": True, "groupDefaultExpanded": 1, "animateRows": True},
                "suitable": ["COST", "SALES", "SUMMARY"]
            },
            {
                "id": "aggrid_simple",
                "name": "기본 그리드",
                "component": "AgGridReact",
                "layout": "SIMPLE",
                "features": ["sorting", "filtering", "excelExport"],
                "props": {"animateRows": True},
                "suitable": ["MASTER", "LIST"]
            },
            {
                "id": "aggrid_master_detail",
                "name": "마스터-디테일",
                "component": "AgGridReact",
                "layout": "MASTER_DETAIL",
                "features": ["masterDetail", "rowGrouping"],
                "props": {"masterDetail": True},
                "suitable": ["ORDER", "PRODUCTION"]
            },
        ]
        
        for tmpl in ui_templates:
            self.add_ui_template(
                tmpl["id"], tmpl["name"], tmpl["component"], tmpl["layout"],
                tmpl["features"], tmpl["props"], tmpl["suitable"]
            )
            stats["ui_templates"] += 1
        
        # 비즈니스 개념 및 리포트 정의
        business_concepts = [
            {
                "id": "cost_analysis_report",
                "name": "원가분석 리포트",
                "category": "COST",
                "keywords": ["원가", "비용", "원가분석", "제조원가", "cost", "원가현황"],
                "description": "제품별/계정별 원가 현황을 분석하는 리포트",
                "tables": ["bi_trx_cost_summary", "bi_mst_product", "bi_mst_account"],
                "filters": {"base_month": "current_month", "scenario_code": "ACTUAL"},
                "template": "aggrid_pivot",
                "columns": [
                    ("rc_cost_base_month", "base_month", "기준월", "FILTER", 100, None, None),
                    ("rc_cost_scenario", "scenario_code", "시나리오", "FILTER", 100, None, None),
                    ("rc_cost_product", "product_code", "제품", "GROUP", 150, "left", "bi_mst_product:product_name"),
                    ("rc_cost_account", "account_code", "계정", "PIVOT", 120, None, "bi_mst_account:account_name"),
                    ("rc_cost_qty", "qty", "수량", "VALUE", 100, None, "sum"),
                    ("rc_cost_amt", "cost_amt", "원가", "VALUE", 120, None, "sum_currency"),
                ]
            },
            {
                "id": "sales_report",
                "name": "매출현황 리포트",
                "category": "SALES",
                "keywords": ["매출", "판매", "매출현황", "매출분석", "sales", "revenue"],
                "description": "제품별/거래처별 매출 현황을 분석하는 리포트",
                "tables": ["order_header", "order_detail", "customer_master"],
                "filters": {"order_date": "current_month"},
                "template": "aggrid_pivot",
                "columns": [
                    ("rc_sales_date", "order_date", "주문일", "FILTER", 100, None, None),
                    ("rc_sales_customer", "customer_code", "거래처", "GROUP", 150, "left", "customer_master:customer_name"),
                    ("rc_sales_product", "product_code", "제품", "PIVOT", 120, None, "bi_mst_product:product_name"),
                    ("rc_sales_qty", "order_qty", "수량", "VALUE", 100, None, "sum"),
                    ("rc_sales_amt", "order_amt", "금액", "VALUE", 120, None, "sum_currency"),
                ]
            },
            {
                "id": "production_inventory_report",
                "name": "생산수불 리포트",
                "category": "PRODUCTION",
                "keywords": ["생산", "수불", "생산수불", "생산현황", "재공", "production", "inventory"],
                "description": "공정별/제품별 생산수불 현황 리포트",
                "tables": ["bi_trx_prod_inventory", "bi_mst_process", "bi_mst_product"],
                "filters": {"yyyymm": "current_month", "scenario_code": "ACTUAL"},
                "template": "aggrid_pivot",
                "columns": [
                    ("rc_prod_month", "yyyymm", "년월", "FILTER", 100, None, None),
                    ("rc_prod_process", "process_code", "공정", "GROUP", 150, "left", "bi_mst_process:process_name"),
                    ("rc_prod_product", "product_code", "제품", "GROUP", 150, None, "bi_mst_product:product_name"),
                    ("rc_prod_boh", "boh_qty", "기초재고", "VALUE", 100, None, "sum"),
                    ("rc_prod_in", "in_qty", "입고", "VALUE", 100, None, "sum"),
                    ("rc_prod_out", "out_qty", "출고", "VALUE", 100, None, "sum"),
                    ("rc_prod_eoh", "eoh_qty", "기말재고", "VALUE", 100, None, "sum"),
                ]
            },
        ]
        
        for concept in business_concepts:
            # 비즈니스 개념 등록
            self.add_business_concept(
                concept["id"], concept["name"], concept["category"],
                concept["keywords"], concept["description"],
                concept["tables"], concept["filters"]
            )
            
            # 의도 패턴 등록
            patterns = [f".*{kw}.*리포트.*|.*{kw}.*보여.*|.*{kw}.*조회.*|.*{kw}.*분석.*" 
                       for kw in concept["keywords"][:3]]
            self.add_intent_pattern(
                f"intent_{concept['id']}", patterns, concept["id"],
                [f"{concept['name']} 보여줘", f"{concept['keywords'][0]} 분석해줘"]
            )
            
            # UI 템플릿 연결
            self.link_concept_to_template(concept["id"], concept["template"])
            
            # 리포트 컬럼 등록
            for col in concept["columns"]:
                col_id, source, display, role, width, pinned, extra = col
                lookup_table = None
                lookup_display = None
                agg_rule = None
                
                if extra:
                    if ":" in str(extra):
                        lookup_table, lookup_display = extra.split(":")
                    else:
                        agg_rule = extra
                
                self.add_report_column(
                    col_id, source, display, role, concept["id"],
                    width, pinned, agg_rule, lookup_table, lookup_display
                )
            
            stats["business_concepts"] += 1
        
        return stats
    
    def get_extended_stats(self) -> Dict[str, int]:
        """확장된 통계 반환"""
        base_stats = self.kg.get_stats()
        
        # 확장 노드 타입별 카운트
        extended_counts = {
            # Layer 2: Logic
            NODE_JOIN_KEY: 0,
            NODE_UI_COMPONENT: 0,
            NODE_UI_PATTERN: 0,
            NODE_PROCESS: 0,
            NODE_ACTIVITY: 0,
            # Layer 3: Semantic
            NODE_BUSINESS_CONCEPT: 0,
            NODE_UI_TEMPLATE: 0,
            NODE_AGGREGATION_RULE: 0,
            NODE_INTENT_PATTERN: 0,
            NODE_REPORT_COLUMN: 0,
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
