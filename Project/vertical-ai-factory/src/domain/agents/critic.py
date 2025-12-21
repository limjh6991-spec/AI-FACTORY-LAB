"""
Critic Agent - SQL 검증 에이전트

역할:
- Writer가 작성한 SQL 쿼리를 검증
- 보안 검사: DROP, DELETE, UPDATE 등 위험 키워드 차단
- 효율성 검사: LIMIT 없으면 경고, SELECT * 경고
- 검증 실패 시 Writer에게 피드백 제공 (재작성 요청용)

출력: Pydantic 구조화된 출력 (CriticOutput)
"""

from typing import Optional, List
from pydantic import BaseModel, Field
from langchain_core.messages import SystemMessage, HumanMessage

import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent.parent.parent))

from infrastructure.database import get_schema_info
from config import get_llm


# ============================================
# Pydantic 구조화된 출력 스키마
# ============================================

class CriticOutput(BaseModel):
    """Critic Agent의 구조화된 출력"""
    
    validation_result: bool = Field(
        description="검증 통과 여부. True=통과, False=실패"
    )
    
    security_passed: bool = Field(
        description="보안 검사 통과 여부"
    )
    
    efficiency_score: int = Field(
        ge=1, le=5,
        description="효율성 점수 (1-5). 5가 가장 좋음"
    )
    
    errors: List[str] = Field(
        default_factory=list,
        description="발견된 오류 목록 (보안 위반 등)"
    )
    
    warnings: List[str] = Field(
        default_factory=list,
        description="경고 목록 (효율성 관련 등)"
    )
    
    feedback: str = Field(
        description="Writer에게 전달할 피드백. 검증 실패 시 수정 방향 제시."
    )
    
    suggested_fix: Optional[str] = Field(
        default=None,
        description="수정 제안 (있는 경우)"
    )


# ============================================
# Critic Agent 시스템 프롬프트
# ============================================

CRITIC_SYSTEM_PROMPT = """당신은 SQL 쿼리 보안 및 품질 검증 전문가입니다.
Writer Agent가 작성한 SQL 쿼리를 검증하여 안전성과 효율성을 평가합니다.

## 검증 항목

### 1. 보안 검사 (필수 통과)
다음 키워드가 포함되면 **즉시 실패** 처리:
- DELETE
- DROP  
- UPDATE
- INSERT
- ALTER
- TRUNCATE
- CREATE
- GRANT
- REVOKE

### 2. 효율성 검사 (권장)
- SELECT *: 필요한 컬럼만 명시하도록 권장
- LIMIT 없음: 대량 데이터 조회 시 성능 저하 경고
- 인덱스 미사용 가능성: WHERE 절 없는 전체 스캔 경고

### 3. 문법 검사
- SQL 문법 오류 체크
- 테이블/컬럼명 유효성 (스키마 참조)

## 평가 기준

**효율성 점수 (1-5):**
- 5: 최적화된 쿼리 (필요한 컬럼만, LIMIT 있음, 적절한 WHERE)
- 4: 좋은 쿼리 (경미한 개선 가능)
- 3: 보통 (권장 사항 있음)
- 2: 개선 필요 (효율성 문제)
- 1: 즉시 수정 필요

## DB 스키마 정보
{schema_info}

## 응답 규칙
- 보안 위반 발견 시 validation_result = False
- 경고만 있는 경우 validation_result = True (warnings에 기록)
- 피드백은 구체적이고 실행 가능한 수정 지침 제공
"""


# ============================================
# Critic Agent 클래스
# ============================================

class CriticAgent:
    """SQL 쿼리를 검증하고 피드백을 제공하는 에이전트"""
    
    FORBIDDEN_KEYWORDS = [
        "DELETE", "DROP", "UPDATE", "INSERT", 
        "ALTER", "TRUNCATE", "CREATE", "GRANT", "REVOKE"
    ]
    
    def __init__(self, temperature: float = 0.0):
        """
        Args:
            temperature: 생성 다양성 (0.0 = 결정적)
        """
        self.llm = get_llm("critic", temperature=temperature)
        
        # 구조화된 출력을 위한 LLM 설정
        self.structured_llm = self.llm.with_structured_output(CriticOutput)
    
    def _get_schema_info(self) -> str:
        """DB 스키마 정보 조회"""
        return get_schema_info.invoke({})
    
    def _quick_security_check(self, sql: str) -> tuple[bool, List[str]]:
        """
        빠른 보안 검사 (LLM 호출 전 사전 필터링)
        
        Returns:
            tuple: (is_safe, error_list)
        """
        errors = []
        sql_upper = sql.upper()
        
        for keyword in self.FORBIDDEN_KEYWORDS:
            if keyword in sql_upper:
                errors.append(f"🚨 보안 위반: '{keyword}' 키워드가 감지되었습니다.")
        
        # SELECT로 시작하는지 확인
        sql_stripped = sql_upper.strip()
        if not sql_stripped.startswith("SELECT"):
            errors.append("🚨 쿼리는 SELECT로 시작해야 합니다.")
        
        return len(errors) == 0, errors
    
    def _quick_efficiency_check(self, sql: str) -> List[str]:
        """
        빠른 효율성 검사 (규칙 기반)
        
        Returns:
            list: 경고 목록
        """
        warnings = []
        sql_upper = sql.upper()
        
        if "SELECT *" in sql_upper:
            warnings.append("⚠️ SELECT * 대신 필요한 컬럼만 명시하세요.")
        
        if "LIMIT" not in sql_upper:
            warnings.append("⚠️ LIMIT 절이 없습니다. 대량 데이터 조회 시 성능 저하가 발생할 수 있습니다.")
        
        if "WHERE" not in sql_upper and "GROUP BY" not in sql_upper:
            warnings.append("⚠️ WHERE 또는 GROUP BY 절이 없어 전체 테이블 스캔이 발생합니다.")
        
        return warnings
    
    def validate(self, sql: str, original_plan: Optional[str] = None) -> CriticOutput:
        """
        SQL 쿼리를 검증합니다.
        
        Args:
            sql: 검증할 SQL 쿼리
            original_plan: 원래 Analyst의 Plan (컨텍스트용)
            
        Returns:
            CriticOutput: 검증 결과
        """
        # 1. 빠른 보안 검사 (사전 필터링)
        is_safe, security_errors = self._quick_security_check(sql)
        
        if not is_safe:
            # 보안 위반 시 즉시 실패 반환 (LLM 호출 없음)
            return CriticOutput(
                validation_result=False,
                security_passed=False,
                efficiency_score=1,
                errors=security_errors,
                warnings=[],
                feedback="보안 위반이 감지되었습니다. SELECT 문만 사용해주세요. " + 
                         "DELETE, DROP, UPDATE 등 데이터 변경 명령은 허용되지 않습니다.",
                suggested_fix="SELECT 문으로 다시 작성해주세요."
            )
        
        # 2. 빠른 효율성 검사
        quick_warnings = self._quick_efficiency_check(sql)
        
        # 3. LLM을 통한 상세 검증
        schema_info = self._get_schema_info()
        system_prompt = CRITIC_SYSTEM_PROMPT.format(schema_info=schema_info)
        
        user_message = f"""다음 SQL 쿼리를 검증해주세요.

## SQL 쿼리
```sql
{sql}
```
"""
        if original_plan:
            user_message += f"\n## 원래 실행 계획\n{original_plan}\n"
        
        user_message += f"\n## 사전 검사 결과\n- 보안 검사: 통과\n- 초기 경고: {quick_warnings if quick_warnings else '없음'}"
        
        messages = [
            SystemMessage(content=system_prompt),
            HumanMessage(content=user_message)
        ]
        
        # LLM 호출
        result = self.structured_llm.invoke(messages)
        
        # 사전 검사 경고 병합
        if quick_warnings:
            existing_warnings = set(result.warnings)
            for w in quick_warnings:
                if w not in existing_warnings:
                    result.warnings.append(w)
        
        return result
    
    def __call__(self, sql: str, original_plan: Optional[str] = None) -> CriticOutput:
        """validate 메서드의 shortcut"""
        return self.validate(sql, original_plan)


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
    
    # Critic 테스트
    print("\n=== Critic Agent 테스트 ===")
    critic = CriticAgent()
    
    test_queries = [
        # 정상 쿼리
        ("SELECT category, SUM(amount) as total FROM costs WHERE date LIKE '2024-10%' GROUP BY category LIMIT 10",
         "좋은 쿼리 - LIMIT, WHERE 포함"),
        
        # 경고가 필요한 쿼리
        ("SELECT * FROM costs",
         "경고 - SELECT *, LIMIT 없음"),
        
        # 보안 위반 쿼리
        ("DROP TABLE costs",
         "보안 위반 - DROP"),
        
        ("DELETE FROM costs WHERE id = 1",
         "보안 위반 - DELETE"),
    ]
    
    for sql, description in test_queries:
        print(f"\n📋 테스트: {description}")
        print(f"📝 SQL: {sql}")
        
        result = critic.validate(sql)
        
        status = "✅ 통과" if result.validation_result else "❌ 실패"
        print(f"결과: {status}")
        print(f"보안: {'✅' if result.security_passed else '❌'}")
        print(f"효율성: {'⭐' * result.efficiency_score}")
        
        if result.errors:
            print(f"오류: {result.errors}")
        if result.warnings:
            print(f"경고: {result.warnings}")
        
        print(f"피드백: {result.feedback}")
        print("-" * 60)
