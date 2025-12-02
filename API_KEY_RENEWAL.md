# 🔴 긴급: API 키 재발급 필요

## ⚠️ 상황

**현재 상태**: Gemini API 키가 무효화됨

**원인**: 이전에 GitHub에 노출된 키를 Google이 자동으로 감지하여 중지

**에러 메시지**:
```
API key not valid. Please pass a valid API key.
ERROR: API_KEY_INVALID
```

---

## 🚀 해결 방법 (1분 소요)

### 1단계: 새 API 키 발급
1. 브라우저에서 열기: https://aistudio.google.com/apikey
2. Google 계정으로 로그인
3. "Create API Key" 버튼 클릭
4. 새 API 키 복사

### 2단계: .env 파일 업데이트
```bash
# 루트 .env 파일 편집
nano .env

# 또는
code .env
```

**다음 라인 수정**:
```properties
# 기존 (무효화됨)
GEMINI_API_KEY=[REDACTED_FOR_SECURITY]

# 새로운 키로 변경
GEMINI_API_KEY=your_new_api_key_here
```

### 3단계: generator/.env도 업데이트
```bash
nano generator/.env
```

**동일하게 수정**:
```properties
GEMINI_API_KEY=your_new_api_key_here
```

### 4단계: 테스트
```bash
npx tsx scripts/test_excel_analysis.ts
```

**성공 시 출력**:
```
✅ 헤더 행 감지: 3
✅ 데이터 타입 추론 성공
✅ DB 매핑 제안 완료
```

---

## ⚠️ 중요: 보안 수칙

### 절대 하지 말 것
- ❌ API 키를 GitHub에 커밋
- ❌ API 키를 채팅이나 문서에 공유
- ❌ `.env` 파일을 Git에 추가

### 꼭 할 것
- ✅ `.env` 파일은 로컬에만 보관
- ✅ `.gitignore`에 `.env` 등록 확인
- ✅ `.env.example` 파일만 커밋 (키 값은 빈 칸)

---

## 📋 체크리스트

- [ ] 새 Gemini API 키 발급
- [ ] `.env` 파일 업데이트
- [ ] `generator/.env` 파일 업데이트
- [ ] API 연결 테스트 성공
- [ ] `.gitignore`에 `.env` 있는지 확인
- [ ] Git 상태 확인 (`git status`)
- [ ] `.env` 파일이 추적되지 않는지 확인

---

## 🔍 확인 명령어

```bash
# .gitignore에 .env 있는지 확인
cat .gitignore | grep .env

# Git에 .env가 추적되는지 확인 (아무것도 출력되지 않아야 함)
git ls-files | grep -E "^\.env$|^generator/\.env$"

# API 키 테스트
npx tsx scripts/test_excel_analysis.ts
```

---

**작성일**: 2025-12-02  
**우선순위**: 🔴 긴급  
**예상 소요 시간**: 1분
