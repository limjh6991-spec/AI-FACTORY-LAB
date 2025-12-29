"""
Knowledge Graph Module - bi_common_code 기반 지식 그래프

NetworkX를 사용하여 테이블/컬럼 관계를 그래프로 표현합니다.
회사별 스키마 매핑을 통해 AI가 비즈니스 로직을 더 깊이 이해할 수 있습니다.
"""

from typing import Optional, List, Dict, Any
import networkx as nx
import pickle
from pathlib import Path


# 노드 타입 상수
NODE_TYPE_TABLE = "TABLE"
NODE_TYPE_COLUMN = "COLUMN"
NODE_TYPE_COMPANY_TABLE = "COMPANY_TABLE"
NODE_TYPE_COMPANY_COLUMN = "COMPANY_COLUMN"

# 엣지 타입 상수
EDGE_HAS_COLUMN = "has_column"
EDGE_MAPPED_TO = "mapped_to"
EDGE_RESOLVES_TO = "resolves_to"
EDGE_REFERENCES = "references"

# 캐시 파일 경로
CACHE_PATH = Path(__file__).parent / "database" / "graph_cache.pkl"


class KnowledgeGraph:
    """
    NetworkX 기반 Knowledge Graph
    
    bi_common_code 테이블의 매핑 정보를 그래프 구조로 표현합니다.
    """
    
    def __init__(self):
        self.graph = nx.DiGraph()
        self._initialized = False
    
    def load_from_common_code(self, mappings: List[Dict[str, Any]]) -> None:
        """
        bi_common_code 매핑 데이터에서 그래프 구축
        
        Args:
            mappings: bi_common_code 테이블 레코드 리스트
        """
        for record in mappings:
            code_type = record.get("code_type")
            category = record.get("category")
            standard_name = record.get("standard_name")
            company_code = record.get("company_code")
            company_table = record.get("company_table")
            company_column = record.get("company_column")
            company_schema = record.get("company_schema", "public")
            is_pk = record.get("is_pk", False)
            standard_data_type = record.get("standard_data_type")
            
            if code_type == "TABLE":
                # 표준 테이블 노드 생성
                table_node_id = f"TABLE:{standard_name}"
                self.graph.add_node(
                    table_node_id,
                    node_type=NODE_TYPE_TABLE,
                    standard_name=standard_name,
                    category=category
                )
                
                # 회사별 테이블 노드 생성
                company_table_node_id = f"COMPANY_TABLE:{company_code}:{company_table}"
                self.graph.add_node(
                    company_table_node_id,
                    node_type=NODE_TYPE_COMPANY_TABLE,
                    company_code=company_code,
                    schema=company_schema,
                    table_name=company_table,
                    category=category  # category 추가
                )
                
                # 매핑 엣지 생성
                self.graph.add_edge(
                    table_node_id,
                    company_table_node_id,
                    edge_type=EDGE_MAPPED_TO,
                    company_code=company_code
                )
                
            elif code_type == "COLUMN":
                # 표준 컬럼 노드 생성
                column_node_id = f"COLUMN:{category}:{standard_name}"
                self.graph.add_node(
                    column_node_id,
                    node_type=NODE_TYPE_COLUMN,
                    standard_name=standard_name,
                    category=category,
                    data_type=standard_data_type,
                    is_pk=is_pk
                )
                
                # 테이블 → 컬럼 엣지 (has_column)
                table_node_id = f"TABLE:{category.lower()}_master"
                if not self.graph.has_node(table_node_id):
                    # 테이블 노드가 없으면 생성
                    self.graph.add_node(
                        table_node_id,
                        node_type=NODE_TYPE_TABLE,
                        standard_name=f"{category.lower()}_master",
                        category=category
                    )
                
                self.graph.add_edge(
                    table_node_id,
                    column_node_id,
                    edge_type=EDGE_HAS_COLUMN
                )
                
                # 회사별 컬럼 노드 생성
                company_column_node_id = f"COMPANY_COLUMN:{company_code}:{company_table}:{company_column}"
                self.graph.add_node(
                    company_column_node_id,
                    node_type=NODE_TYPE_COMPANY_COLUMN,
                    company_code=company_code,
                    table_name=company_table,
                    column_name=company_column,
                    is_pk=is_pk,
                    category=category  # category 추가
                )
                
                # 표준 컬럼 → 회사 컬럼 엣지 (resolves_to)
                self.graph.add_edge(
                    column_node_id,
                    company_column_node_id,
                    edge_type=EDGE_RESOLVES_TO,
                    company_code=company_code
                )
        
        self._initialized = True
    
    def search_tables(self, category: str, company_code: Optional[str] = None) -> List[Dict[str, Any]]:
        """
        카테고리와 회사 코드로 테이블 검색
        
        Args:
            category: 테이블 카테고리 (DEPT, PRODUCT, BOM 등)
            company_code: 회사 코드 (BINARY, DOU, DOU_MES). None이면 표준 테이블만 반환
        
        Returns:
            테이블 정보 리스트
        """
        results = []
        
        for node_id, data in self.graph.nodes(data=True):
            if data.get("node_type") == NODE_TYPE_TABLE:
                if data.get("category", "").upper() == category.upper():
                    table_info = {
                        "standard_name": data.get("standard_name"),
                        "category": data.get("category")
                    }
                    
                    if company_code:
                        # 회사별 매핑 찾기
                        for _, target, edge_data in self.graph.out_edges(node_id, data=True):
                            if edge_data.get("edge_type") == EDGE_MAPPED_TO:
                                if edge_data.get("company_code") == company_code:
                                    target_data = self.graph.nodes[target]
                                    table_info["company_table"] = target_data.get("table_name")
                                    table_info["company_schema"] = target_data.get("schema")
                                    break
                    
                    results.append(table_info)
        
        return results
    
    def get_column_mapping(self, standard_name: str, company_code: str, category: str) -> Optional[Dict[str, str]]:
        """
        표준 컬럼명 → 회사별 컬럼명 매핑 조회
        
        Args:
            standard_name: 표준 컬럼명
            company_code: 회사 코드
            category: 카테고리
        
        Returns:
            매핑 정보 또는 None
        """
        column_node_id = f"COLUMN:{category}:{standard_name}"
        
        if not self.graph.has_node(column_node_id):
            return None
        
        for _, target, edge_data in self.graph.out_edges(column_node_id, data=True):
            if edge_data.get("edge_type") == EDGE_RESOLVES_TO:
                if edge_data.get("company_code") == company_code:
                    target_data = self.graph.nodes[target]
                    return {
                        "company_column": target_data.get("column_name"),
                        "company_table": target_data.get("table_name"),
                        "is_pk": target_data.get("is_pk", False)
                    }
        
        return None
    
    def get_table_columns(self, category: str, company_code: str) -> List[Dict[str, Any]]:
        """
        특정 카테고리/회사의 모든 컬럼 조회
        
        Args:
            category: 카테고리 
            company_code: 회사 코드
        
        Returns:
            컬럼 정보 리스트
        """
        columns = []
        
        for node_id, data in self.graph.nodes(data=True):
            if data.get("node_type") == NODE_TYPE_COLUMN:
                if data.get("category", "").upper() == category.upper():
                    mapping = self.get_column_mapping(
                        data.get("standard_name"),
                        company_code,
                        category
                    )
                    if mapping:
                        columns.append({
                            "standard_name": data.get("standard_name"),
                            "data_type": data.get("data_type"),
                            "is_pk": data.get("is_pk", False),
                            **mapping
                        })
        
        return columns
    
    def search_by_question(self, question: str, company_code: str = "BINARY") -> str:
        """
        자연어 질문에서 관련 테이블/컬럼 정보 검색
        
        Args:
            question: 사용자 질문
            company_code: 대상 회사 코드
        
        Returns:
            관련 테이블/컬럼 정보 (포맷된 문자열)
        """
        # 키워드 → 카테고리 매핑
        keyword_category_map = {
            "부서": "DEPT",
            "부문": "DEPT",
            "조직": "DEPT",
            "제품": "PRODUCT",
            "품목": "PRODUCT",
            "상품": "PRODUCT",
            "자재": "PRODUCT",
            "BOM": "BOM",
            "부품": "BOM",
            "원자재": "BOM",
            "설비": "EQUIPMENT",
            "장비": "EQUIPMENT",
            "기계": "EQUIPMENT",
            "거래처": "CUSTOMER",
            "고객": "CUSTOMER",
            "계정": "ACCOUNT",
            "비용": "EXPENSE",
            "원가": "EXPENSE",
            "사용자": "USER",
            "직원": "USER",
            "공정": "PROCESS",
            "라우팅": "ROUTING",
        }
        
        # 질문에서 카테고리 추출
        matched_categories = []
        for keyword, category in keyword_category_map.items():
            if keyword in question:
                if category not in matched_categories:
                    matched_categories.append(category)
        
        if not matched_categories:
            return "관련 테이블 정보를 찾을 수 없습니다."
        
        # 결과 포맷
        result_parts = []
        for category in matched_categories:
            tables = self.search_tables(category, company_code)
            if tables:
                for table in tables:
                    if table.get("company_table"):
                        schema = table.get("company_schema", "public")
                        full_table = f'"{schema}".{table["company_table"]}'
                        result_parts.append(f"📋 {category}: {table['standard_name']} → {full_table}")
                        
                        # 컬럼 정보 추가
                        columns = self.get_table_columns(category, company_code)
                        if columns:
                            col_strs = [f"  - {c['standard_name']} → {c['company_column']}" + (" (PK)" if c.get('is_pk') else "") for c in columns[:5]]
                            result_parts.extend(col_strs)
        
        return "\n".join(result_parts) if result_parts else "관련 테이블 정보를 찾을 수 없습니다."
    
    def save_cache(self) -> None:
        """그래프를 캐시 파일로 저장"""
        CACHE_PATH.parent.mkdir(parents=True, exist_ok=True)
        with open(CACHE_PATH, "wb") as f:
            pickle.dump(self.graph, f)
    
    def load_cache(self) -> bool:
        """캐시 파일에서 그래프 로드"""
        if CACHE_PATH.exists():
            with open(CACHE_PATH, "rb") as f:
                self.graph = pickle.load(f)
                self._initialized = True
            return True
        return False
    
    @property
    def is_initialized(self) -> bool:
        return self._initialized
    
    def get_stats(self) -> Dict[str, int]:
        """그래프 통계 반환"""
        node_counts = {}
        for _, data in self.graph.nodes(data=True):
            node_type = data.get("node_type", "UNKNOWN")
            node_counts[node_type] = node_counts.get(node_type, 0) + 1
        
        return {
            "total_nodes": self.graph.number_of_nodes(),
            "total_edges": self.graph.number_of_edges(),
            **node_counts
        }


# 싱글톤 인스턴스
_knowledge_graph: Optional[KnowledgeGraph] = None


def get_knowledge_graph() -> KnowledgeGraph:
    """Knowledge Graph 싱글톤 인스턴스 반환"""
    global _knowledge_graph
    if _knowledge_graph is None:
        _knowledge_graph = KnowledgeGraph()
    return _knowledge_graph


def reset_knowledge_graph() -> None:
    """Knowledge Graph 인스턴스 리셋 (테스트용)"""
    global _knowledge_graph
    _knowledge_graph = None
