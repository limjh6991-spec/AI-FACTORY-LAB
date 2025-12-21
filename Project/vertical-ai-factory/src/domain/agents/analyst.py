"""
Analyst Agent - 사용자 의도 분석 에이전트

역할:
- 사용자의 자연어 질문을 받아서 비즈니스 로직을 해석
- DB 스키마를 조회하여 어떤 테이블/컬럼을 사용해야 하는지 파악
- 자연어로 된 'Plan'을 출력 (어떻게 조회할지 기획)

출력: Pydantic 구조화된 출력 (AnalystOutput)
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

class AnalystOutput(BaseModel):
    """Analyst Agent의 구조화된 출력"""
    
    thought: str = Field(
        description="사용자 질문에 대한 분석 과정. 어떤 정보가 필요한지, 어떤 테이블을 사용해야 하는지에 대한 사고 과정."
    )
    
    target_table: str = Field(
        description="조회해야 할 테이블명"
    )
    
    required_columns: list[str] = Field(
        description="조회해야 할 컬럼 목록"
    )
    
    filter_conditions: Optional[str] = Field(
        default=None,
        description="WHERE 절에 들어갈 필터 조건 (자연어로 설명)"
    )
    
    aggregation: Optional[str] = Field(
        default=None,
        description="집계 함수 사용 여부 (SUM, COUNT, AVG 등)"
    )
    
    plan: str = Field(
        description="SQL Writer에게 전달할 구체적인 실행 계획. 어떤 테이블에서 어떤 조건으로 무엇을 조회해야 하는지 명확히 설명."
    )


# ============================================
# Analyst Agent 시스템 프롬프트
# ============================================

ANALYST_SYSTEM_PROMPT = """당신은 데이터 분석 기획 전문가입니다.
사용자의 자연어 질문을 분석하여 SQL 쿼리 작성을 위한 실행 계획을 수립합니다.

## 역할
1. 사용자의 질문에서 원하는 정보가 무엇인지 파악
2. 제공된 DB 스키마를 분석하여 어떤 테이블/컬럼을 사용해야 하는지 결정
3. 필터 조건, 집계 함수 등 SQL 구성 요소 파악
4. SQL Writer가 바로 쿼리를 작성할 수 있도록 명확한 Plan 작성

## 규칙
- 데이터를 직접 조회하지 않습니다 (스키마만 확인)
- 가능한 구체적이고 명확한 계획을 수립합니다
- 한국어로 응답합니다

## DB 스키마 정보
{schema_info}
"""


# ============================================
# Analyst Agent 클래스
# ============================================

class AnalystAgent:
    """사용자 의도를 분석하고 SQL 계획을 수립하는 에이전트"""
    
    def __init__(self, temperature: float = 0.0):
        """
        Args:
            temperature: 생성 다양성 (0.0 = 결정적)
        """
        self.llm = get_llm("analyst", temperature=temperature)
        
        # 구조화된 출력을 위한 LLM 설정
        self.structured_llm = self.llm.with_structured_output(AnalystOutput)
        
    def _get_schema_info(self) -> str:
        """DB 스키마 정보 조회"""
        return get_schema_info.invoke({})
    
    def analyze(self, user_question: str) -> AnalystOutput:
        """
        사용자 질문을 분석하여 SQL 실행 계획을 수립합니다.
        
        Args:
            user_question: 사용자의 자연어 질문
            
        Returns:
            AnalystOutput: 구조화된 분석 결과
        """
        # 스키마 정보 조회
        schema_info = self._get_schema_info()
        
        # 프롬프트 구성
        system_prompt = ANALYST_SYSTEM_PROMPT.format(schema_info=schema_info)
        
        messages = [
            SystemMessage(content=system_prompt),
            HumanMessage(content=f"다음 질문을 분석해주세요: {user_question}")
        ]
        
        # LLM 호출 (구조화된 출력)
        result = self.structured_llm.invoke(messages)
        
        return result
    
    def __call__(self, user_question: str) -> AnalystOutput:
        """analyze 메서드의 shortcut"""
        return self.analyze(user_question)


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
    
    # Analyst 테스트
    print("\n=== Analyst Agent 테스트 ===")
    analyst = AnalystAgent()
    
    test_questions = [
        "10월 식비가 얼마나 나왔어?",
        "카테고리별 총 지출을 알려줘",
        "가장 비싼 지출 항목 3개를 보여줘",
    ]
    
    for question in test_questions:
        print(f"\n📝 질문: {question}")
        result = analyst.analyze(question)
        print(f"💭 사고 과정: {result.thought}")
        print(f"📋 대상 테이블: {result.target_table}")
        print(f"📊 필요 컬럼: {result.required_columns}")
        print(f"🔍 필터 조건: {result.filter_conditions}")
        print(f"📈 집계: {result.aggregation}")
        print(f"📌 실행 계획: {result.plan}")
        print("-" * 50)
