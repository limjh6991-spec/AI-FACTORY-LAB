# 🎯 자비스 재연결 - 빠른 참조 카드

## 📋 즉시 복사할 프롬프트

```
안녕하세요, 자비스! 👋

AI Factory Lab 프로젝트를 계속 진행하려고 합니다.
다음 파일들을 읽고 현재 상황을 파악한 후, 간단히 요약해주세요:

1. /home/roarm_m3/ai-factory-lab/PROJECT_ROADMAP.md
2. /home/roarm_m3/ai-factory-lab/ENVIRONMENT.md
3. /home/roarm_m3/ai-factory-lab/docs/SESSION_SUMMARY_20251202.md
4. /home/roarm_m3/ai-factory-lab/docs/VECTOR_DB_SETUP_SUMMARY.md

요약 내용에 다음을 포함해주세요:
- 프로젝트 목표 및 현재 단계 (Week X)
- 완료된 주요 작업 (최대 5개)
- 다음에 할 작업 (우선순위 순)
- 현재 환경 상태 (DB, Vector DB, API 등)
- 주의사항 또는 알아야 할 것

요약은 간결하게 핵심만 작성해주세요 (최대 20줄).
```

---

## ⚡ 빠른 명령어

```bash
# Vector DB 실행 확인
curl http://localhost:8000/api/v2/heartbeat

# 리소스 벡터화
npm run vector:setup

# 검색 테스트
npm run vector:test

# 개발 서버
npm run dev
```

---

## 📁 주요 파일

- `JARVIS_RECONNECT_PROMPT.md` - 전체 가이드
- `.jarvis-prompt.txt` - 프롬프트만
- `docs/VECTOR_DB_SETUP_SUMMARY.md` - Vector DB 현황
- `PROJECT_ROADMAP.md` - 전체 로드맵

---

**사용법**: 이 파일을 북마크하고, 새 세션마다 프롬프트를 복사하세요!
