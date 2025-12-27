"""
LangGraph 기반 다중 에이전트 워크플로우

워크플로우:
  Start -> Analyst -> Writer -> Critic -> (Pass: End / Fail: Writer 재시도)
  
재시도 제한: 최대 3회
"""

from typing import Literal
from langgraph.graph import StateGraph, END

import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent.parent))

from domain.state import AgentState
from domain.agents.analyst import AnalystAgent
from domain.agents.writer import WriterAgent
from domain.agents.critic import CriticAgent
from infrastructure.knowledge_graph import get_knowledge_graph
from infrastructure.database.init_knowledge_graph import init_knowledge_graph


# 최대 재시도 횟수
MAX_RETRIES = 3

# Agent 인스턴스 (지연 초기화)
_analyst = None
_writer = None
_critic = None


def get_analyst():
    global _analyst
    if _analyst is None:
        _analyst = AnalystAgent()
    return _analyst


def get_writer():
    global _writer
    if _writer is None:
        _writer = WriterAgent()
    return _writer


def get_critic():
    global _critic
    if _critic is None:
        _critic = CriticAgent()
    return _critic


# ============================================
# 노드 함수 정의
# ============================================

def graph_context_node(state: AgentState) -> AgentState:
    """
    Knowledge Graph 컨텍스트 노드: 질문에서 관련 테이블/컬럼 정보 검색
    """
    try:
        kg = get_knowledge_graph()
        
        # Knowledge Graph가 초기화되지 않았으면 초기화
        if not kg.is_initialized:
            init_knowledge_graph(use_cache=True)
        
        company_code = state.get("company_code", "BINARY")
        context = kg.search_by_question(state["user_question"], company_code)
        
        return {
            **state,
            "graph_context": context,
            "status": "context_ready"
        }
    except Exception as e:
        # 실패해도 워크플로우 계속 진행
        return {
            **state,
            "graph_context": f"(Knowledge Graph 검색 실패: {str(e)})",
            "status": "context_ready"
        }


def analyst_node(state: AgentState) -> AgentState:
    """
    Analyst 노드: 사용자 질문을 분석하여 Plan 생성
    """
    try:
        graph_context = state.get("graph_context")
        result = get_analyst().analyze(state["user_question"], graph_context)
        return {
            **state,
            "analyst_output": result,
            "status": "analyzed"
        }
    except Exception as e:
        return {
            **state,
            "error": f"Analyst 오류: {str(e)}",
            "status": "error"
        }


def writer_node(state: AgentState) -> AgentState:
    """
    Writer 노드: Analyst의 Plan을 기반으로 SQL 생성
    """
    try:
        # Analyst 출력에서 plan 추출
        plan = state["analyst_output"].plan
        context = state["user_question"]
        graph_context = state.get("graph_context")
        
        # Critic 피드백이 있으면 추가
        if state.get("critic_output") and not state["critic_output"].validation_result:
            feedback = state["critic_output"].feedback
            plan = f"{plan}\n\n[이전 피드백] {feedback}"
        
        result = get_writer().write_sql(plan, context, graph_context)
        return {
            **state,
            "writer_output": result,
            "status": "sql_generated"
        }
    except Exception as e:
        return {
            **state,
            "error": f"Writer 오류: {str(e)}",
            "status": "error"
        }


def critic_node(state: AgentState) -> AgentState:
    """
    Critic 노드: 생성된 SQL을 검증
    """
    try:
        sql = state["writer_output"].sql_query
        plan = state["analyst_output"].plan
        
        result = get_critic().validate(sql, plan)
        
        # 검증 통과 시 final_sql 설정
        if result.validation_result:
            return {
                **state,
                "critic_output": result,
                "final_sql": sql,
                "status": "completed"
            }
        else:
            # 재시도 카운트 증가
            count = state.get("critique_count", 0) + 1
            return {
                **state,
                "critic_output": result,
                "critique_count": count,
                "status": "needs_revision"
            }
    except Exception as e:
        return {
            **state,
            "error": f"Critic 오류: {str(e)}",
            "status": "error"
        }


# ============================================
# 조건부 라우팅 함수
# ============================================

def should_retry(state: AgentState) -> Literal["writer", "end"]:
    """
    Critic 검증 후 재시도 여부 결정
    
    Returns:
        "writer": 재시도 (검증 실패 & 재시도 횟수 < MAX_RETRIES)
        "end": 종료 (검증 통과 또는 재시도 한도 초과)
    """
    # 에러 발생 시 종료
    if state.get("status") == "error":
        return "end"
    
    # 검증 통과 시 종료
    if state.get("critic_output") and state["critic_output"].validation_result:
        return "end"
    
    # 재시도 한도 확인
    if state.get("critique_count", 0) >= MAX_RETRIES:
        return "end"
    
    # 재시도
    return "writer"


# ============================================
# 그래프 빌드
# ============================================

def build_graph() -> StateGraph:
    """
    LangGraph StateGraph 빌드
    
    Returns:
        컴파일된 StateGraph
    """
    # 그래프 생성
    workflow = StateGraph(AgentState)
    
    # 노드 추가
    workflow.add_node("graph_context", graph_context_node)
    workflow.add_node("analyst", analyst_node)
    workflow.add_node("writer", writer_node)
    workflow.add_node("critic", critic_node)
    
    # 엣지 연결 (graph_context → analyst → writer → critic)
    workflow.set_entry_point("graph_context")
    workflow.add_edge("graph_context", "analyst")
    workflow.add_edge("analyst", "writer")
    workflow.add_edge("writer", "critic")
    
    # 조건부 엣지 (Critic 후 분기)
    workflow.add_conditional_edges(
        "critic",
        should_retry,
        {
            "writer": "writer",
            "end": END
        }
    )
    
    # 컴파일
    return workflow.compile()


# 그래프 인스턴스
graph = build_graph()


def run_workflow(question: str, company_code: str = "BINARY") -> AgentState:
    """
    워크플로우 실행
    
    Args:
        question: 사용자 질문
        company_code: 대상 회사 코드 (BINARY, DOU, DOU_MES)
        
    Returns:
        AgentState: 최종 상태
    """
    initial_state: AgentState = {
        "user_question": question,
        "company_code": company_code,
        "graph_context": None,
        "analyst_output": None,
        "writer_output": None,
        "critic_output": None,
        "critique_count": 0,
        "final_sql": None,
        "status": "started",
        "error": None
    }
    
    # 그래프 실행
    result = graph.invoke(initial_state)
    
    return result


# ============================================
# 테스트 코드
# ============================================

if __name__ == "__main__":
    import os
    from dotenv import load_dotenv
    
    # 환경 변수 로드
    env_path = Path(__file__).parent.parent / ".env"
    load_dotenv(env_path)
    
    if not os.getenv("OPENAI_API_KEY"):
        print("⚠️  OPENAI_API_KEY가 설정되지 않았습니다.")
        exit(1)
    
    # DB 초기화
    from infrastructure.database import init_database
    print("=== Database 초기화 ===")
    print(init_database())
    
    # 테스트 실행
    print("\n=== Graph 테스트 ===")
    result = run_workflow("10월 식비가 얼마나 나왔어?")
    
    print(f"\n상태: {result['status']}")
    if result.get('final_sql'):
        print(f"최종 SQL: {result['final_sql']}")
    if result.get('error'):
        print(f"에러: {result['error']}")
