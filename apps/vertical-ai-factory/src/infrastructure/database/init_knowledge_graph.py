"""
Knowledge Graph 초기화 스크립트

PostgreSQL의 bi_common_code 테이블에서 Knowledge Graph를 구축합니다.
"""

import os
import sys
from pathlib import Path
from typing import List, Dict, Any

# 경로 설정
sys.path.insert(0, str(Path(__file__).parent.parent.parent))

try:
    import psycopg2
    from psycopg2.extras import RealDictCursor
    PSYCOPG2_AVAILABLE = True
except ImportError:
    PSYCOPG2_AVAILABLE = False

from infrastructure.knowledge_graph import get_knowledge_graph, KnowledgeGraph


def get_database_url() -> str:
    """환경변수에서 PostgreSQL URL 가져오기"""
    from dotenv import load_dotenv
    env_path = Path(__file__).parent.parent.parent.parent / ".env"
    load_dotenv(env_path)
    
    return os.getenv(
        "POSTGRES_URL",
        "postgresql://roarm_m3:2024-merry-christmas@localhost:5432/ai_factory_db"
    )


def fetch_common_code_mappings() -> List[Dict[str, Any]]:
    """
    PostgreSQL에서 bi_common_code 매핑 조회
    
    Returns:
        매핑 레코드 리스트
    """
    if not PSYCOPG2_AVAILABLE:
        print("⚠️  psycopg2가 설치되지 않았습니다. Mock 데이터를 사용합니다.")
        return get_mock_mappings()
    
    try:
        db_url = get_database_url()
        conn = psycopg2.connect(db_url)
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        
        cursor.execute("""
            SELECT 
                code_type,
                category,
                standard_name,
                standard_data_type,
                company_code,
                company_schema,
                company_table,
                company_column,
                is_pk
            FROM "binary".bi_common_code
            WHERE use_yn = 'Y'
            ORDER BY category, standard_name, company_code
        """)
        
        rows = cursor.fetchall()
        cursor.close()
        conn.close()
        
        return [dict(row) for row in rows]
    
    except Exception as e:
        print(f"⚠️  DB 연결 실패: {e}")
        print("    Mock 데이터를 사용합니다.")
        return get_mock_mappings()


def get_mock_mappings() -> List[Dict[str, Any]]:
    """
    테스트용 Mock 매핑 데이터
    
    실제 bi_common_code 테이블 구조를 모방합니다.
    """
    return [
        # TABLE 매핑
        {"code_type": "TABLE", "category": "DEPT", "standard_name": "dept_master", "company_code": "BINARY", "company_schema": "binary", "company_table": "bi_dept_mst", "company_column": None, "is_pk": False, "standard_data_type": None},
        {"code_type": "TABLE", "category": "DEPT", "standard_name": "dept_master", "company_code": "DOU", "company_schema": "public", "company_table": "doi_dept", "company_column": None, "is_pk": False, "standard_data_type": None},
        {"code_type": "TABLE", "category": "PRODUCT", "standard_name": "product_master", "company_code": "BINARY", "company_schema": "binary", "company_table": "bi_prod_mst", "company_column": None, "is_pk": False, "standard_data_type": None},
        {"code_type": "TABLE", "category": "PRODUCT", "standard_name": "product_master", "company_code": "DOU", "company_schema": "public", "company_table": "doi_material_mast", "company_column": None, "is_pk": False, "standard_data_type": None},
        {"code_type": "TABLE", "category": "BOM", "standard_name": "bom_master", "company_code": "BINARY", "company_schema": "binary", "company_table": "bi_bom_mst", "company_column": None, "is_pk": False, "standard_data_type": None},
        {"code_type": "TABLE", "category": "EQUIPMENT", "standard_name": "equipment_master", "company_code": "BINARY", "company_schema": "binary", "company_table": "bi_eqp_mst", "company_column": None, "is_pk": False, "standard_data_type": None},
        {"code_type": "TABLE", "category": "CUSTOMER", "standard_name": "customer_master", "company_code": "BINARY", "company_schema": "binary", "company_table": "bi_cust_mst", "company_column": None, "is_pk": False, "standard_data_type": None},
        {"code_type": "TABLE", "category": "CUSTOMER", "standard_name": "customer_master", "company_code": "DOU", "company_schema": "public", "company_table": "doi_cust_mast", "company_column": None, "is_pk": False, "standard_data_type": None},
        
        # COLUMN 매핑 - DEPT
        {"code_type": "COLUMN", "category": "DEPT", "standard_name": "department_code", "company_code": "BINARY", "company_schema": "binary", "company_table": "bi_dept_mst", "company_column": "department_code", "is_pk": True, "standard_data_type": "VARCHAR"},
        {"code_type": "COLUMN", "category": "DEPT", "standard_name": "department_code", "company_code": "DOU", "company_schema": "public", "company_table": "doi_dept", "company_column": "dept", "is_pk": True, "standard_data_type": "VARCHAR"},
        {"code_type": "COLUMN", "category": "DEPT", "standard_name": "department_name", "company_code": "BINARY", "company_schema": "binary", "company_table": "bi_dept_mst", "company_column": "department_name", "is_pk": False, "standard_data_type": "VARCHAR"},
        {"code_type": "COLUMN", "category": "DEPT", "standard_name": "department_name", "company_code": "DOU", "company_schema": "public", "company_table": "doi_dept", "company_column": "dept_name", "is_pk": False, "standard_data_type": "VARCHAR"},
        
        # COLUMN 매핑 - PRODUCT
        {"code_type": "COLUMN", "category": "PRODUCT", "standard_name": "product_code", "company_code": "BINARY", "company_schema": "binary", "company_table": "bi_prod_mst", "company_column": "product_item_code", "is_pk": True, "standard_data_type": "VARCHAR"},
        {"code_type": "COLUMN", "category": "PRODUCT", "standard_name": "product_code", "company_code": "DOU", "company_schema": "public", "company_table": "doi_material_mast", "company_column": "mat_code", "is_pk": True, "standard_data_type": "VARCHAR"},
        {"code_type": "COLUMN", "category": "PRODUCT", "standard_name": "product_name", "company_code": "BINARY", "company_schema": "binary", "company_table": "bi_prod_mst", "company_column": "product_item_name", "is_pk": False, "standard_data_type": "VARCHAR"},
        {"code_type": "COLUMN", "category": "PRODUCT", "standard_name": "product_name", "company_code": "DOU", "company_schema": "public", "company_table": "doi_material_mast", "company_column": "mat_desc", "is_pk": False, "standard_data_type": "VARCHAR"},
        
        # COLUMN 매핑 - EQUIPMENT
        {"code_type": "COLUMN", "category": "EQUIPMENT", "standard_name": "equipment_code", "company_code": "BINARY", "company_schema": "binary", "company_table": "bi_eqp_mst", "company_column": "equipment_code", "is_pk": True, "standard_data_type": "VARCHAR"},
        {"code_type": "COLUMN", "category": "EQUIPMENT", "standard_name": "equipment_name", "company_code": "BINARY", "company_schema": "binary", "company_table": "bi_eqp_mst", "company_column": "equipment_name", "is_pk": False, "standard_data_type": "VARCHAR"},
    ]


def init_knowledge_graph(use_cache: bool = True) -> KnowledgeGraph:
    """
    Knowledge Graph 초기화
    
    Args:
        use_cache: True면 캐시 사용 시도
    
    Returns:
        초기화된 KnowledgeGraph 인스턴스
    """
    kg = get_knowledge_graph()
    
    # 캐시 사용 시도
    if use_cache and kg.load_cache():
        print("✅ Knowledge Graph 캐시 로드 완료")
        stats = kg.get_stats()
        print(f"   노드: {stats['total_nodes']}개, 엣지: {stats['total_edges']}개")
        return kg
    
    # DB에서 로드
    print("🔄 bi_common_code에서 Knowledge Graph 구축 중...")
    mappings = fetch_common_code_mappings()
    kg.load_from_common_code(mappings)
    
    stats = kg.get_stats()
    print(f"✅ Knowledge Graph 구축 완료")
    print(f"   노드: {stats['total_nodes']}개, 엣지: {stats['total_edges']}개")
    
    # 캐시 저장
    kg.save_cache()
    print("💾 캐시 저장 완료")
    
    return kg


def init_extended_knowledge_graph(use_cache: bool = True):
    """
    확장 Knowledge Graph 초기화
    
    기본 KG를 초기화한 후, 확장 로직(JOIN, UI, Process)을 주입합니다.
    
    Args:
        use_cache: True면 캐시 사용 시도
    
    Returns:
        확장된 ExtendedKnowledgeGraph 인스턴스
    """
    from infrastructure.knowledge_graph_extended import (
        get_extended_knowledge_graph,
        reset_extended_knowledge_graph
    )
    
    # 기본 KG 초기화
    kg = init_knowledge_graph(use_cache=use_cache)
    
    # 확장 KG 초기화 (기존 인스턴스 리셋)
    reset_extended_knowledge_graph()
    print("🔄 확장 Knowledge Graph 구축 중...")
    
    ekg = get_extended_knowledge_graph(kg, inject_defaults=True)
    
    stats = ekg.get_extended_stats()
    print(f"✅ 확장 Knowledge Graph 구축 완료")
    print(f"   JOIN_KEY: {stats.get('JOIN_KEY', 0)}개")
    print(f"   UI_COMPONENT: {stats.get('UI_COMPONENT', 0)}개")
    print(f"   PROCESS: {stats.get('PROCESS', 0)}개")
    print(f"   ACTIVITY: {stats.get('ACTIVITY', 0)}개")
    
    return ekg


# ============================================
# CLI 테스트
# ============================================

if __name__ == "__main__":
    from rich.console import Console
    from rich.table import Table
    
    console = Console()
    
    console.print("\n[bold blue]🔧 Knowledge Graph 초기화[/bold blue]\n")
    
    # 그래프 초기화
    kg = init_knowledge_graph(use_cache=False)
    
    # 통계 출력
    stats = kg.get_stats()
    stats_table = Table(title="Graph Statistics")
    stats_table.add_column("Metric", style="cyan")
    stats_table.add_column("Value", style="green")
    
    for key, value in stats.items():
        stats_table.add_row(key, str(value))
    
    console.print(stats_table)
    
    # 검색 테스트
    console.print("\n[bold yellow]🔍 검색 테스트[/bold yellow]\n")
    
    test_queries = [
        ("BINARY 회사의 부서 목록을 보여줘", "BINARY"),
        ("제품 정보를 조회하고 싶어", "DOU"),
        ("설비 현황을 알려줘", "BINARY"),
    ]
    
    for question, company in test_queries:
        console.print(f"[cyan]질문:[/cyan] {question}")
        console.print(f"[cyan]회사:[/cyan] {company}")
        result = kg.search_by_question(question, company)
        console.print(f"[green]결과:[/green]\n{result}\n")
        console.print("-" * 50)
