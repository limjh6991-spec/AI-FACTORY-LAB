"""
Knowledge Graph 검색 도구

LangChain Tool로 래핑하여 Agent에서 사용할 수 있는 그래프 검색 기능 제공
"""

from typing import Optional
from langchain_core.tools import tool

import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent.parent.parent))

from infrastructure.knowledge_graph import get_knowledge_graph
from infrastructure.database.init_knowledge_graph import init_knowledge_graph


@tool
def search_knowledge_graph(query: str, company_code: str = "BINARY") -> str:
    """
    Knowledge Graph에서 비즈니스 엔티티 검색
    
    사용자 질문과 관련된 테이블, 컬럼, 관계 정보를 검색합니다.
    이 정보를 활용하여 정확한 SQL 쿼리를 생성할 수 있습니다.
    
    Args:
        query: 검색 쿼리 (예: "부서 목록", "제품 정보", "BOM 조회")
        company_code: 대상 회사 코드 (BINARY, DOU, DOU_MES)
    
    Returns:
        관련 테이블, 컬럼, 관계 정보 (포맷된 문자열)
    
    Example:
        >>> search_knowledge_graph("부서 목록을 보여줘", "BINARY")
        "📋 DEPT: dept_master → \"binary\".bi_dept_mst\n  - department_code → department_code (PK)\n  - department_name → department_name"
    """
    kg = get_knowledge_graph()
    
    # Knowledge Graph가 초기화되지 않았으면 초기화
    if not kg.is_initialized:
        init_knowledge_graph(use_cache=True)
    
    return kg.search_by_question(query, company_code)


@tool
def get_table_info(category: str, company_code: str = "BINARY") -> str:
    """
    특정 카테고리의 테이블 및 컬럼 정보 조회
    
    Args:
        category: 테이블 카테고리 (DEPT, PRODUCT, BOM, EQUIPMENT, CUSTOMER 등)
        company_code: 대상 회사 코드 (BINARY, DOU, DOU_MES)
    
    Returns:
        테이블 및 컬럼 상세 정보
    
    Example:
        >>> get_table_info("DEPT", "BINARY")
        "테이블: \"binary\".bi_dept_mst\n컬럼:\n  - department_code (VARCHAR, PK)\n  - department_name (VARCHAR)"
    """
    kg = get_knowledge_graph()
    
    if not kg.is_initialized:
        init_knowledge_graph(use_cache=True)
    
    tables = kg.search_tables(category, company_code)
    
    if not tables:
        return f"카테고리 '{category}'에 대한 테이블 정보를 찾을 수 없습니다."
    
    result_parts = []
    for table in tables:
        schema = table.get("company_schema", "public")
        table_name = table.get("company_table", table.get("standard_name"))
        full_table = f'"{schema}".{table_name}'
        
        result_parts.append(f"테이블: {full_table}")
        
        columns = kg.get_table_columns(category, company_code)
        if columns:
            result_parts.append("컬럼:")
            for col in columns:
                pk_marker = " (PK)" if col.get("is_pk") else ""
                data_type = col.get("data_type", "")
                result_parts.append(f"  - {col['company_column']} ({data_type}{pk_marker})")
    
    return "\n".join(result_parts)


@tool
def get_column_mapping_tool(standard_column: str, category: str, company_code: str = "BINARY") -> str:
    """
    표준 컬럼명을 회사별 컬럼명으로 변환
    
    Args:
        standard_column: 표준 컬럼명 (예: department_code, product_name)
        category: 테이블 카테고리 (DEPT, PRODUCT 등)
        company_code: 대상 회사 코드
    
    Returns:
        회사별 컬럼명 및 테이블 정보
    
    Example:
        >>> get_column_mapping_tool("product_code", "PRODUCT", "DOU")
        "product_code → mat_code (테이블: doi_material_mast, PK)"
    """
    kg = get_knowledge_graph()
    
    if not kg.is_initialized:
        init_knowledge_graph(use_cache=True)
    
    mapping = kg.get_column_mapping(standard_column, company_code, category)
    
    if not mapping:
        return f"'{standard_column}' 컬럼에 대한 {company_code} 매핑을 찾을 수 없습니다."
    
    pk_marker = " (PK)" if mapping.get("is_pk") else ""
    return f"{standard_column} → {mapping['company_column']} (테이블: {mapping['company_table']}{pk_marker})"


# ============================================
# 테스트
# ============================================

if __name__ == "__main__":
    from rich.console import Console
    
    console = Console()
    console.print("\n[bold blue]🔧 Graph Search Tool 테스트[/bold blue]\n")
    
    # Knowledge Graph 초기화
    init_knowledge_graph(use_cache=False)
    
    # 검색 테스트
    console.print("[cyan]1. search_knowledge_graph 테스트[/cyan]")
    result = search_knowledge_graph.invoke({"query": "부서 목록을 보여줘", "company_code": "BINARY"})
    console.print(f"{result}\n")
    
    console.print("[cyan]2. get_table_info 테스트[/cyan]")
    result = get_table_info.invoke({"category": "PRODUCT", "company_code": "DOU"})
    console.print(f"{result}\n")
    
    console.print("[cyan]3. get_column_mapping_tool 테스트[/cyan]")
    result = get_column_mapping_tool.invoke({"standard_column": "product_code", "category": "PRODUCT", "company_code": "DOU"})
    console.print(f"{result}\n")
