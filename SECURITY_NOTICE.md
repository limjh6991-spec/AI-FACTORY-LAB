# ⚠️ 보안 주의사항

## 🔐 API 키 보안

### ❗ 절대 커밋하면 안 되는 것들

1. **GEMINI_API_KEY**: GitHub에 올라가면 Google이 자동 탐지하여 즉시 키 사용 중지
2. **OPENAI_API_KEY**: OpenAI도 동일하게 자동 탐지 및 중지
3. **DATABASE_URL**: 실제 DB 접속 정보 노출 위험

### ✅ 안전한 사용 방법

```bash
# 1. .env 파일은 절대 커밋 금지
echo ".env" >> .gitignore
echo "generator/.env" >> .gitignore

# 2. .env.example 파일 생성 (템플릿용)
cp .env .env.example
# .env.example의 모든 키 값을 'your_xxx_key_here'로 변경

# 3. 실제 키는 .env에만 보관
# 이 파일은 .gitignore에 등록되어 있음
```

### 🚨 이미 커밋된 경우 응급 조치

```bash
# 1. Git 히스토리에서 완전 삭제
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch generator/.env" \
  --prune-empty --tag-name-filter cat -- --all

# 2. 강제 푸시
git push origin --force --all

# 3. API 키 재발급
# - Gemini: https://aistudio.google.com/apikey
# - OpenAI: https://platform.openai.com/api-keys
```

### 📝 현재 상태 확인

```bash
# .gitignore에 .env 있는지 확인
cat .gitignore | grep .env

# Git에 추적되는지 확인
git ls-files | grep .env

# 만약 추적 중이면 제거
git rm --cached generator/.env
git commit -m "Remove sensitive .env file"
```

---

**작성일**: 2025-12-02  
**중요도**: 🔴 매우 높음
