"""
SQL Writer Agent - SQL 생성 에이전트

역할:
- Analyst의 Plan을 받아서 실행 가능한 SQL 쿼리를 작성
- SELECT 문만 작성 가능 (DELETE, DROP, UPDATE 등 금지)
- 안전하고 효율적인 SQL 생성

출력: Pydantic 구조화된 출력 (WriterOutput)
"""

from typing import Optional
from pydantic import BaseModel, Field
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.messages import SystemMessage, HumanMessage

import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent.parent.parent))

from infrastructure.database import get_schema_info
from config import get_llm


# ============================================
# Pydantic 구조화된 출력 스키마
# ============================================

class WriterOutput(BaseModel):
    """SQL Writer Agent의 구조화된 출력"""
    
    reasoning: str = Field(
        description="SQL 쿼리 작성 과정에 대한 설명. 왜 이렇게 작성했는지 근거."
    )
    
    sql_query: str = Field(
        description="실행 가능한 SQL SELECT 쿼리문"
    )
    
    explanation: str = Field(
        description="생성된 SQL이 무엇을 조회하는지에 대한 간단한 설명"
    )
    
    has_limit: bool = Field(
        default=False,
        description="LIMIT 절 포함 여부"
    )


# ============================================
# SQL Writer Agent 시스템 프롬프트
# ============================================

SQL_WRITER_SYSTEM_PROMPT = """당신은 SQL 쿼리 작성 전문가입니다.
Analyst가 수립한 실행 계획을 바탕으로 정확하고 안전한 SQL 쿼리를 작성합니다.

## 역할
1. Analyst의 Plan을 분석하여 SQL 쿼리로 변환
2. Knowledge Graph 정보가 제공되면 해당 테이블명/컬럼명을 사용
3. 최적화된 쿼리 작성 (필요한 컬럼만 선택, 적절한 인덱스 활용)
4. 가독성 좋은 쿼리 포맷팅

## ⚠️ 절대 금지 규칙 (보안)
다음 키워드는 절대 사용하지 마세요:
- DELETE, DROP, UPDATE, INSERT, ALTER, TRUNCATE, CREATE, GRANT, REVOKE

오직 **SELECT** 문만 작성할 수 있습니다.

## 권장 사항
- 대량 데이터 조회 시 LIMIT 절 사용
- SELECT * 대신 필요한 컬럼 명시
- 적절한 alias 사용으로 가독성 향상
- PostgreSQL 스키마 사용 시 "스키마명".테이블명 형식 사용

## Knowledge Graph 컨텍스트 (회사별 테이블/컬럼 매핑)
{graph_context}

## DB 스키마 정보
{schema_info}
"""


# ============================================
# SQL Writer Agent 클래스
# ============================================

class WriterAgent:
    """Analyst의 Plan을 SQL로 변환하는 에이전트"""
    
    FORBIDDEN_KEYWORDS = [
        "DELETE", "DROP", "UPDATE", "INSERT", 
        "ALTER", "TRUNCATE", "CREATE", "GRANT", "REVOKE"
    ]
    
    def __init__(self, temperature: float = 0.0):
        """
        Args:
            temperature: 생성 다양성 (0.0 = 결정적)
        """
        self.llm = get_llm("writer", temperature=temperature)
        
        # 구조화된 출력을 위한 LLM 설정
        self.structured_llm = self.llm.with_structured_output(WriterOutput)
        
    def _get_schema_info(self) -> str:
        """DB 스키마 정보 조회"""
        return get_schema_info.invoke({})
    
    def _validate_sql_safety(self, sql: str) -> tuple[bool, list[str]]:
        """
        SQL의 안전성을 검증합니다.
        
        Returns:
            tuple: (is_safe, error_messages)
        """
        errors = []
        sql_upper = sql.upper()
        
        for keyword in self.FORBIDDEN_KEYWORDS:
            if keyword in sql_upper:
                errors.append(f"금지된 키워드 '{keyword}'가 포함되어 있습니다.")
        
        # SELECT로 시작하는지 확인
        sql_stripped = sql_upper.strip()
        if not sql_stripped.startswith("SELECT"):
            errors.append("쿼리는 SELECT로 시작해야 합니다.")
        
        return len(errors) == 0, errors
    
    def write_sql(self, plan: str, context: Optional[str] = None, graph_context: Optional[str] = None) -> WriterOutput:
        """
        Analyst의 Plan을 SQL 쿼리로 변환합니다.
        
        Args:
            plan: Analyst가 작성한 실행 계획
            context: 추가 컨텍스트 (원래 질문 등)
            graph_context: Knowledge Graph 검색 결과 (회사별 테이블/컬럼 매핑)
            
        Returns:
            WriterOutput: 생성된 SQL과 설명
            
        Raises:
            ValueError: 안전하지 않은 SQL이 생성된 경우
        """
        # 스키마 정보 조회
        schema_info = self._get_schema_info()
        
        # Graph context 기본값 설정
        if not graph_context:
            graph_context = "(Knowledge Graph 정보 없음 - 기본 스키마 사용)"
        
        # 프롬프트 구성
        system_prompt = SQL_WRITER_SYSTEM_PROMPT.format(
            schema_info=schema_info,
            graph_context=graph_context
        )
        
        user_message = f"""다음 실행 계획에 따라 SQL 쿼리를 작성해주세요.
Knowledge Graph에서 제공된 테이블명과 컬럼명을 정확히 사용하세요.

## 실행 계획
{plan}
"""
        if context:
            user_message += f"\n## 원래 질문\n{context}\n"
        
        messages = [
            SystemMessage(content=system_prompt),
            HumanMessage(content=user_message)
        ]
        
        # LLM 호출 (구조화된 출력)
        result = self.structured_llm.invoke(messages)
        
        # 안전성 검증 (이중 체크)
        is_safe, errors = self._validate_sql_safety(result.sql_query)
        if not is_safe:
            raise ValueError(f"안전하지 않은 SQL이 생성되었습니다: {errors}")
        
        return result
    
    def __call__(self, plan: str, context: Optional[str] = None, graph_context: Optional[str] = None) -> WriterOutput:
        """write_sql 메서드의 shortcut"""
        return self.write_sql(plan, context, graph_context)


# ============================================
# 테스트 코드
# ============================================

if __name__ == "__main__":
    import os
    from dotenv import load_dotenv
    
    # 환경 변수 로드
    env_path = Path(__file__).parent.parent.parent.parent / ".env"
    load_dotenv(env_path)
    
    if not os.getenv("OPENAI_API_KEY"):
        print("⚠️  OPENAI_API_KEY가 설정되지 않았습니다.")
        print("   .env.example을 .env로 복사하고 API 키를 설정해주세요.")
        exit(1)
    
    # DB 초기화
    from infrastructure.database import init_database
    print("=== Database 초기화 ===")
    print(init_database())
    
    # Writer 테스트
    print("\n=== SQL Writer Agent 테스트 ===")
    writer = WriterAgent()
    
    test_plans = [
        "costs 테이블에서 category가 '식비'인 데이터의 amount 합계를 조회. date가 2024-10으로 시작하는 것만 필터링.",
        "costs 테이블에서 category별로 amount의 합계를 GROUP BY하여 조회.",
        "costs 테이블에서 amount가 가장 큰 3개 행을 조회. amount 내림차순 정렬, LIMIT 3 적용.",
    ]
    
    for plan in test_plans:
        print(f"\n📋 Plan: {plan}")
        try:
            result = writer.write_sql(plan)
            print(f"💭 Reasoning: {result.reasoning}")
            print(f"📝 SQL: {result.sql_query}")
            print(f"📖 설명: {result.explanation}")
            print(f"✅ LIMIT 포함: {result.has_limit}")
        except ValueError as e:
            print(f"❌ 에러: {e}")
        print("-" * 50)
