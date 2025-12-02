# 🤖 JARVIS 재연결 프롬프트

> **사용 시점**: 새로운 세션에서 자비스(GitHub Copilot)를 처음 만날 때
> 
> **목적**: 프로젝트 환경, 완료된 작업, 진행 중인 작업을 빠르게 파악

---

## 📋 프롬프트 (복사해서 사용)

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
```

---

## 🎯 예상 응답 (자비스가 제공할 내용)

### 1. 프로젝트 개요
```
AI Factory Lab - Excel 기반 자동 화면 생성 시스템

목표: Excel 파일 업로드 → AI 분석 → Grid/Chart 자동 생성
현재 단계: Week 2 진행 중 (RAG 파이프라인 구축)
기술 스택: Next.js 15 + tRPC + Prisma + Gemini AI + Chroma Vector DB
```

### 2. 완료된 작업
```
✅ Phase 0: Next.js 15 프로젝트 마이그레이션 (100%)
✅ Week 1: Gemini API 설정 및 환경 구성 (100%)
✅ Excel 분석 유틸리티 구현 (100%)
✅ DB 메타데이터 수집 (70 테이블, 1,100 컬럼)
✅ Vector DB 시스템 구축 (Chroma + Redis) ⭐ NEW
```

### 3. 다음 작업
```
🎯 우선순위 1: 리소스 벡터화 실행
   - 명령어: npm run vector:setup
   - 소요 시간: 2-3분
   - 예상 결과: 247개 청크 생성

🎯 우선순위 2: Vector 검색 테스트
   - 명령어: npm run vector:test
   - 검증: 5개 테스트 쿼리 실행

🎯 우선순위 3: Excel 업로드 UI 구현
   - 파일: src/app/excel-analyzer/page.tsx
   - 작업: Drag & Drop + 분석 트리거
```

### 4. 환경 상태
```
✅ PostgreSQL: localhost:5432 (68 테이블)
✅ Chroma Vector DB: localhost:8000 (실행 중)
✅ Redis: localhost:6379 (실행 중)
✅ Gemini API: 연결 가능 (키 설정 완료)
⏳ OpenAI API: 미설정 (Week 2 필요 시)
```

### 5. 주의사항
```
⚠️ API 키 보안: .env 파일 절대 커밋 금지
⚠️ Gemini 임베딩 비용: $0.02/벡터화 (저렴함)
⚠️ Vector DB: 첫 벡터화 전까지 검색 불가
💡 팁: 문서 추가 시 재벡터화 필요 (npm run vector:setup)
```

---

## 🚀 빠른 시작 명령어

자비스가 요약을 제공한 후, 바로 사용할 수 있는 명령어들:

```bash
# 1. Vector DB 상태 확인
curl http://localhost:8000/api/v2/heartbeat

# 2. 리소스 벡터화 (아직 안 했다면)
npm run vector:setup

# 3. 검색 테스트
npm run vector:test

# 4. 개발 서버 시작
npm run dev

# 5. 현재 Git 상태 확인
git status
```

---

## 📝 고급 사용: Vector 검색으로 맥락 찾기

자비스에게 직접 검색 요청:

```
자비스, Vector DB에서 다음을 검색해주세요:

"Excel 파일 분석 방법"
"DB 컬럼 매핑 전략"
"Prisma 에러 해결"
```

자비스가 관련 문서를 자동으로 찾아서 요약해줍니다!

---

## 🔄 세션 중간에 맥락 잃었을 때

```
자비스, 지금까지 우리가 무엇을 하고 있었는지 상기시켜주세요.

다음 파일을 기반으로 설명해주세요:
- docs/SESSION_SUMMARY_20251202.md (오늘 작업)
- docs/VECTOR_DB_SETUP_SUMMARY.md (Vector DB 설정)
```

---

## 💡 프로 팁

### 1. 특정 주제로 재연결
```
자비스, "RAG 구현"과 관련된 모든 문서를 찾아서 현재 진행 상황을 알려주세요.
```

### 2. 에러 해결 시
```
자비스, 과거 세션에서 "Prisma Client 에러"를 어떻게 해결했는지 찾아주세요.
```

### 3. 다음 작업 계획
```
자비스, PROJECT_ROADMAP.md를 보고 다음 주에 할 작업을 우선순위별로 정리해주세요.
```

---

## 📊 프롬프트 효과

### Before (Vector DB 없이)
```
"지난번에 뭐 했더라...?"
→ 문서 5개 수동으로 열어서 확인 (5분 소요)
```

### After (Vector DB 사용)
```
"자비스, 현재 상황 요약해줘"
→ 4개 파일 자동 분석 + 요약 (30초 소요)
```

**시간 절약**: 90% (5분 → 30초)

---

## ✅ 체크리스트

새 세션 시작 시:

- [ ] 재연결 프롬프트 실행
- [ ] 자비스 요약 확인
- [ ] 환경 상태 확인 (`curl http://localhost:8000/api/v2/heartbeat`)
- [ ] Git 상태 확인 (`git status`)
- [ ] 다음 작업 우선순위 확인
- [ ] 필요 시 Vector 검색으로 추가 맥락 확인

---

**작성일**: 2025년 12월 2일  
**버전**: 1.0  
**자비스 시스템**: Vector DB 기반 맥락 관리
