# Vertical AI Factory Development Plan

> LangGraph + Python 기반 다중 에이전트 시스템 (Analyst → Writer → Critic)
> LLM: **Google Gemini** (gemini-2.5-flash)

---

## 🚀 Vertical AI Factory Development Plan

### Phase 1: 기반 환경 구축 (Foundation)
- [x] 프로젝트 구조 생성 (folders: agents, core, tools, config)
- [x] 가상환경 및 `requirements.txt` 설치 (langgraph, langchain-openai, pydantic, sqlite3)
- [x] 환경 변수 관리 (`.env`) 설정

### Phase 2: 도구(Tools) 및 MCP 모의 구현
- [x] Mock DB 생성 (테스트용 SQLite, `costs` 테이블 등)
- [x] Tool: `SchemaInspector` (DB 구조 조회용)
- [x] Tool: `QueryValidator` (SQL 문법 검증용)

### Phase 3: 에이전트 개별 구현 (Agents) ✅ 완료
- [x] **Analyst Agent**: 사용자 의도 파악 및 기획 (Prompt + Logic)
- [x] **SQL Writer Agent**: SQL 생성 (Prompt + Logic)
- [x] **Critic Agent**: 쿼리 안전성/효율성 검증 (Prompt + Logic)

### Phase 4: 오케스트레이션 (Graph) ✅ 완료
- [x] LangGraph State 정의 (Agent 간 메시지 전달 구조)
- [x] Workflow 연결 (Analyst -> Writer -> Critic -> End/Retry)
- [x] Main Entrypoint (`main.py`) 작성

### Phase 5: 테스트 및 검증
- [ ] 시나리오 테스트: "10월 원가 분석해줘" -> SQL 생성 결과 확인

### Phase 6: SpacePro AI Demo 통합 🆕
> SpacePro 프로젝트의 `/ai-demo` 페이지와 연동하여 웹 UI 제공

- [ ] FastAPI 서버 추가 (`api_server.py`)
- [ ] SpacePro API Route 생성 (`/api/ai-query`)  
- [ ] AI Demo 페이지 실제 API 호출 연동
- [ ] 실시간 Agent 진행 상태 표시

**아키텍처:**
```
SpacePro (Next.js)          Vertical AI Factory (Python)
┌─────────────────┐         ┌─────────────────────┐
│ /ai-demo        │ ──API──→│ FastAPI Server      │
│ - 질문 입력     │         │ ├─ Analyst Agent    │
│ - 진행 상태     │←─JSON───│ ├─ SQL Writer       │
│ - 결과 표시     │         │ └─ Critic Agent     │
└─────────────────┘         └─────────────────────┘
```

---

**작성일**: 2024-12-19  
**프로젝트**: Vertical AI Factory

