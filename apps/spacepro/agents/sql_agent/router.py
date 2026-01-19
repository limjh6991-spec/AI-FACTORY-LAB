"""
SQL Agent - 자연어 → SQL 변환
"""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, List
import os

router = APIRouter()

# LLM 설정 (환경변수로 전환 가능)
USE_OLLAMA = os.getenv("USE_OLLAMA", "false").lower() == "true"


class SQLRequest(BaseModel):
    """SQL 생성 요청"""
    question: str  # 자연어 질문
    schema_info: Optional[str] = None  # 스키마 정보 (optional)
    dialect: str = "postgresql"


class SQLResponse(BaseModel):
    """SQL 생성 응답"""
    success: bool
    sql: str
    explanation: str
    warnings: List[str] = []


class SQLOptimizeRequest(BaseModel):
    """SQL 최적화 요청"""
    sql: str
    dialect: str = "postgresql"


# 스키마 정보 (실제로는 DB에서 동적 로드)
SCHEMA_INFO = """
-- SpacePro 스키마 정보
CREATE TABLE spacepro.tb_item_mst (
    id SERIAL PRIMARY KEY,
    item_code VARCHAR(50) UNIQUE NOT NULL,
    item_name VARCHAR(200) NOT NULL,
    item_type VARCHAR(20), -- RAW, SEMI, PRODUCT
    unit VARCHAR(20),
    lead_time INTEGER,
    safety_stock DECIMAL(15,3),
    is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE spacepro.tb_menu_mst (
    id SERIAL PRIMARY KEY,
    menu_code VARCHAR(20) UNIQUE NOT NULL,
    menu_name VARCHAR(100) NOT NULL,
    menu_path VARCHAR(200),
    parent_id INTEGER,
    menu_level INTEGER,
    sort_order INTEGER
);

CREATE TABLE spacepro.tb_routing_mst (
    id SERIAL PRIMARY KEY,
    item_code VARCHAR(50),
    op_seq INTEGER,
    op_name VARCHAR(100),
    machine_code VARCHAR(50),
    setup_time INTEGER,
    cycle_time DECIMAL(10,4),
    process_yield DECIMAL(5,2)
);
"""


def generate_sql_with_ollama(question: str, schema: str) -> tuple[str, str]:
    """Ollama로 SQL 생성"""
    try:
        import ollama
        
        prompt = f"""당신은 PostgreSQL 전문가입니다.
다음 스키마 정보를 참고하여 자연어 질문을 SQL로 변환하세요.

스키마:
{schema}

질문: {question}

SQL만 출력하세요 (설명 없이):"""
        
        response = ollama.generate(
            model="qwen2.5-coder:7b",
            prompt=prompt,
        )
        
        sql = response["response"].strip()
        explanation = "Ollama (qwen2.5-coder)로 생성됨"
        
        return sql, explanation
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Ollama 오류: {str(e)}")


def generate_sql_simple(question: str) -> tuple[str, str]:
    """간단한 규칙 기반 SQL 생성 (LLM 없이)"""
    question_lower = question.lower()
    
    # 키워드 기반 매핑
    if "품목" in question or "item" in question_lower:
        table = "spacepro.tb_item_mst"
    elif "메뉴" in question or "menu" in question_lower:
        table = "spacepro.tb_menu_mst"
    elif "라우팅" in question or "routing" in question_lower:
        table = "spacepro.tb_routing_mst"
    else:
        table = "spacepro.tb_item_mst"
    
    # 집계 함수
    if "개수" in question or "몇개" in question or "count" in question_lower:
        sql = f"SELECT COUNT(*) FROM {table};"
    elif "전체" in question or "모든" in question or "all" in question_lower:
        sql = f"SELECT * FROM {table} LIMIT 100;"
    else:
        sql = f"SELECT * FROM {table} WHERE is_active = TRUE LIMIT 100;"
    
    explanation = "규칙 기반으로 생성됨 (LLM 없음)"
    
    return sql, explanation


@router.post("/generate", response_model=SQLResponse)
async def generate_sql(request: SQLRequest):
    """
    자연어 질문을 SQL로 변환
    
    예시:
    - "품목 테이블에서 전체 개수 조회"
    - "활성화된 메뉴 목록 조회"
    """
    schema = request.schema_info or SCHEMA_INFO
    
    if USE_OLLAMA:
        sql, explanation = generate_sql_with_ollama(request.question, schema)
    else:
        sql, explanation = generate_sql_simple(request.question)
    
    # 기본 검증
    warnings = []
    if "DELETE" in sql.upper() and "WHERE" not in sql.upper():
        warnings.append("⚠️ WHERE 절 없는 DELETE 감지!")
    if "DROP" in sql.upper():
        warnings.append("⚠️ DROP 명령 감지!")
    
    return SQLResponse(
        success=True,
        sql=sql,
        explanation=explanation,
        warnings=warnings,
    )


@router.post("/optimize")
async def optimize_sql(request: SQLOptimizeRequest):
    """SQL 최적화 제안"""
    sql = request.sql.upper()
    
    suggestions = []
    
    if "SELECT *" in sql:
        suggestions.append("SELECT * 대신 필요한 컬럼만 명시하세요")
    
    if "WHERE" not in sql and ("UPDATE" in sql or "DELETE" in sql):
        suggestions.append("WHERE 절을 추가하여 범위를 제한하세요")
    
    if "LIMIT" not in sql and "SELECT" in sql:
        suggestions.append("LIMIT을 추가하여 결과 수를 제한하세요")
    
    return {
        "original_sql": request.sql,
        "suggestions": suggestions,
        "optimized": len(suggestions) == 0,
    }


@router.get("/schema")
async def get_schema():
    """스키마 정보 조회"""
    return {"schema": SCHEMA_INFO}
