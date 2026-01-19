# SpacePro Agents

폐쇄망 환경에서 운영팀이 자체적으로 화면/쿼리/문서를 생성할 수 있는 AI Agent 모음

## 구성

| Agent | 기능 | 상태 |
|-------|------|------|
| 화면 생성 Agent | RealGrid CRUD 화면 자동 생성 | 🏗️ |
| SQL Agent | 자연어 → SQL 변환 | 🏗️ |
| 문서 Agent | 변경이력/매뉴얼 자동화 | 🏗️ |

## 실행

```bash
# Agent 서버 실행
cd agents
python -m uvicorn main:app --host 0.0.0.0 --port 8080
```

## 요구사항

- Python 3.11+
- Ollama + qwen2.5-coder:32b (폐쇄망용)
- 또는 Gemini API (외부망)
