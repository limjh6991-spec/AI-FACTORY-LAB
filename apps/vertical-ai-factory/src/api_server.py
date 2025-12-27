"""
Vertical AI Factory - FastAPI Server

SpacePro MES/MRP AI Demo 페이지와 연동하기 위한 REST API 서버
"""

import os
import sys
from pathlib import Path

# 프로젝트 루트를 path에 추가
project_root = Path(__file__).parent
sys.path.insert(0, str(project_root))

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, Any
from dotenv import load_dotenv

from infrastructure.database import init_database, execute_query
from application.graph import run_workflow


# 환경 변수 로드
env_path = project_root.parent / ".env"
load_dotenv(env_path)

# FastAPI 앱 생성
app = FastAPI(
    title="Vertical AI Factory API",
    description="다중 에이전트 기반 SQL 생성 시스템",
    version="1.0.0"
)

# CORS 설정 (SpacePro에서 호출 허용)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3001", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Request/Response 모델
class QueryRequest(BaseModel):
    question: str
    company_code: str = "BINARY"  # BINARY, DOU, DOU_MES
    provider: str = "gemini"       # gemini, ollama


class AgentOutput(BaseModel):
    thought: Optional[str] = None
    plan: Optional[str] = None
    target_table: Optional[str] = None
    required_columns: Optional[list] = None
    filter_conditions: Optional[str] = None
    aggregation: Optional[str] = None
    sql_query: Optional[str] = None
    reasoning: Optional[str] = None
    explanation: Optional[str] = None
    validation_result: Optional[bool] = None
    security_passed: Optional[bool] = None
    efficiency_score: Optional[int] = None
    feedback: Optional[str] = None
    warnings: Optional[list] = None


class QueryResponse(BaseModel):
    status: str
    company_code: str = "BINARY"
    graph_context: Optional[str] = None
    analyst: Optional[dict] = None
    writer: Optional[dict] = None
    critic: Optional[dict] = None
    final_sql: Optional[str] = None
    execution_result: Optional[list] = None
    error: Optional[str] = None
    critique_count: int = 0
    provider: str = "gemini"


# 시작 시 DB 초기화
@app.on_event("startup")
async def startup_event():
    """서버 시작 시 DB 초기화"""
    if not os.getenv("GOOGLE_API_KEY"):
        print("⚠️  GOOGLE_API_KEY가 설정되지 않았습니다.")
        print("📝 .env 파일에 GOOGLE_API_KEY를 설정해주세요.")
    
    result = init_database()
    print(f"📦 Database 초기화: {result}")


@app.get("/")
async def root():
    """헬스 체크"""
    return {
        "service": "Vertical AI Factory",
        "status": "running",
        "version": "1.0.0"
    }


@app.get("/health")
async def health_check():
    """상태 확인"""
    api_key_set = bool(os.getenv("GOOGLE_API_KEY"))
    return {
        "status": "healthy",
        "api_key_configured": api_key_set
    }


@app.post("/api/query", response_model=QueryResponse)
async def process_query(request: QueryRequest):
    """
    사용자 질문을 처리하여 SQL 생성
    
    워크플로우:
    1. Analyst Agent: 질문 분석 및 Plan 수립
    2. Writer Agent: SQL 쿼리 생성
    3. Critic Agent: SQL 검증 (실패 시 최대 3회 재시도)
    """
    if not request.question.strip():
        raise HTTPException(status_code=400, detail="질문을 입력해주세요.")
    
    if not os.getenv("GOOGLE_API_KEY"):
        raise HTTPException(
            status_code=500, 
            detail="GOOGLE_API_KEY가 설정되지 않았습니다."
        )
    
    try:
        # LLM Provider 설정
        import os
        os.environ["LLM_PROVIDER"] = request.provider
        
        # 워크플로우 실행 (company_code 전달)
        result = run_workflow(request.question, request.company_code)
        
        # 응답 구성
        response = QueryResponse(
            status=result.get("status", "unknown"),
            company_code=request.company_code,
            graph_context=result.get("graph_context"),
            critique_count=result.get("critique_count", 0),
            final_sql=result.get("final_sql"),
            error=result.get("error"),
            provider=request.provider
        )
        
        # Analyst 결과
        if result.get("analyst_output"):
            analyst = result["analyst_output"]
            response.analyst = {
                "thought": analyst.thought,
                "plan": analyst.plan,
                "target_table": analyst.target_table,
                "required_columns": analyst.required_columns,
                "filter_conditions": analyst.filter_conditions,
                "aggregation": analyst.aggregation
            }
        
        # Writer 결과
        if result.get("writer_output"):
            writer = result["writer_output"]
            response.writer = {
                "sql_query": writer.sql_query,
                "reasoning": writer.reasoning,
                "explanation": writer.explanation
            }
        
        # Critic 결과
        if result.get("critic_output"):
            critic = result["critic_output"]
            response.critic = {
                "validation_result": critic.validation_result,
                "security_passed": critic.security_passed,
                "efficiency_score": critic.efficiency_score,
                "feedback": critic.feedback,
                "warnings": critic.warnings
            }
        
        # SQL 실행 결과 (성공 시)
        if result.get("final_sql"):
            try:
                query_result = execute_query(result["final_sql"])
                response.execution_result = query_result[:20]  # 최대 20개
            except Exception as e:
                response.execution_result = None
        
        return response
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    import uvicorn
    
    print("\n🏭 Vertical AI Factory API Server Starting...")
    print("📍 http://localhost:8100")
    print("📚 API Docs: http://localhost:8100/docs\n")
    
    uvicorn.run(
        "api_server:app",
        host="0.0.0.0",
        port=8100,
        reload=True
    )
