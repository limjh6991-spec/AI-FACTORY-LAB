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

### Phase 5: 테스트 및 검증 ✅ 완료
- [x] 시나리오 테스트: "10월 원가 분석해줘" -> SQL 생성 결과 확인

### Phase 6: SpacePro AI Demo 통합 ✅ 완료
> SpacePro 프로젝트의 `/ai-demo` 페이지와 연동하여 웹 UI 제공

- [x] FastAPI 서버 (`api_server.py`) - company_code, provider 지원
- [x] SpacePro API Route (`/api/ai-query`) - 프록시 구현
- [x] CORS 설정 (localhost:3000, 3001 허용)
- [x] Knowledge Graph 컨텍스트 반환

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

### Phase 7: RAG + Knowledge Graph 통합 ✅ 완료
> bi_common_code 기반 지식 그래프로 AI가 비즈니스 로직을 더 깊이 이해

- [x] Knowledge Graph 모듈 구현 (`knowledge_graph.py`)
- [x] PostgreSQL bi_common_code 연동 (`init_knowledge_graph.py`)
- [x] LangChain Tool 래핑 (`graph_search_tool.py`)
- [x] Analyst Agent 통합 (graph_context 파라미터)
- [x] LangGraph 워크플로우 업데이트 (graph_context → analyst → writer → critic)

**아키텍처:**
```
graph_context → analyst → writer → critic
     ↓              ↑
Knowledge Graph ────┘
(131 nodes, 111 edges) ← PostgreSQL bi_common_code 72개 매핑
```

### Phase 8: Writer 스키마 연동 개선 ✅ 완료
> Writer Agent가 Knowledge Graph 정보를 활용하여 정확한 SQL 생성

- [x] Writer Agent에 graph_context 파라미터 추가
- [x] 시스템 프롬프트에 Knowledge Graph 섹션 추가  
- [x] graph.py의 writer_node에서 graph_context 전달
- [x] Graph Context 동작 검증 완료

### Phase 10: Ollama 로컬 LLM 통합 ✅ 완료
> 로컬에서 Ollama를 통해 LLM 실행, 비용 절감 및 프라이버시 강화

- [x] Infrastructure Layer에 llm_provider.py 생성
- [x] config.py 통합 (LLM_PROVIDER 환경변수)
- [x] langchain-ollama 의존성 추가
- [x] llama3.2:1b 테스트 성공 (qwen2.5-coder:7b는 네트워크 문제로 보류)

**사용 방법:**
```bash
# Gemini 사용 (기본)
./venv/bin/python src/main.py

# Ollama 사용
LLM_PROVIDER=ollama ./venv/bin/python src/main.py
```

---

### Phase 11: 그래프 시각화 페이지 ✅ 완료
> LangGraph 워크플로우와 Knowledge Graph를 웹에서 인터랙티브하게 시각화

- [x] FastAPI 엔드포인트 추가 (`/api/graph/langgraph`, `/api/graph/knowledge`)
- [x] 독립 시각화 페이지 생성 (`src/visualization/index.html`)
- [x] Mermaid.js로 LangGraph 워크플로우 렌더링
- [x] D3.js Force Graph로 Knowledge Graph 시각화 (131 노드, 111 엣지)
- [x] 노드 드래그, 줌, 필터링, 텍스트 레이블 기능

**접속 URL:**
```
http://localhost:8100/visualization/
```

**시각화 구성:**
```
┌─────────────────────────────────────────────┐
│  🔮 Vertical AI Factory - Graph Viewer      │
├─────────────────────────────────────────────┤
│ [⚡ LangGraph 워크플로우] [🕸️ Knowledge Graph] │
├─────────────────────────────────────────────┤
│  • Mermaid.js: 에이전트 워크플로우 다이어그램  │
│  • D3.js Force: 테이블/컬럼 관계 그래프       │
└─────────────────────────────────────────────┘
```

---

**작성일**: 2024-12-19  
**마지막 업데이트**: 2025-12-27  
**프로젝트**: Vertical AI Factory

