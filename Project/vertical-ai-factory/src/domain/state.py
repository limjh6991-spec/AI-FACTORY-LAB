"""
AgentState - LangGraph 상태 정의

다중 에이전트 시스템에서 Agent 간 메시지 전달을 위한 상태 구조
"""

from typing import Optional, TypedDict
from domain.agents.analyst import AnalystOutput
from domain.agents.writer import WriterOutput
from domain.agents.critic import CriticOutput


class AgentState(TypedDict, total=False):
    """
    LangGraph Agent 간 공유되는 상태
    
    Attributes:
        user_question: 사용자의 원래 질문
        analyst_output: Analyst Agent의 분석 결과
        writer_output: Writer Agent의 SQL 생성 결과
        critic_output: Critic Agent의 검증 결과
        critique_count: 재작성 요청 횟수 (최대 3회)
        final_sql: 최종 승인된 SQL 쿼리
        status: 현재 워크플로우 상태
        error: 에러 메시지 (있는 경우)
    """
    user_question: str
    analyst_output: Optional[AnalystOutput]
    writer_output: Optional[WriterOutput]
    critic_output: Optional[CriticOutput]
    critique_count: int
    final_sql: Optional[str]
    status: str
    error: Optional[str]
