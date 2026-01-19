"""
SpacePro AI Agents - 메인 FastAPI 서버
폐쇄망 환경에서 화면/SQL/문서 자동 생성
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from screen_generator.router import router as screen_router
from sql_agent.router import router as sql_router
from doc_agent.router import router as doc_router

app = FastAPI(
    title="SpacePro AI Agents",
    description="폐쇄망 운영 환경용 AI Agent API",
    version="1.0.0"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 라우터 등록
app.include_router(screen_router, prefix="/screen", tags=["화면 생성"])
app.include_router(sql_router, prefix="/sql", tags=["SQL 생성"])
app.include_router(doc_router, prefix="/doc", tags=["문서 생성"])


@app.get("/health")
def health_check():
    return {"status": "healthy", "service": "spacepro-agents"}


@app.get("/")
def root():
    return {
        "message": "SpacePro AI Agents",
        "agents": [
            {"name": "화면 생성", "endpoint": "/screen"},
            {"name": "SQL 생성", "endpoint": "/sql"},
            {"name": "문서 생성", "endpoint": "/doc"},
        ]
    }
