# 🚀 Vector DB 빠른 시작 가이드

## ⚡ 5분 안에 시작하기

### 1단계: Docker 실행 (30초)
```bash
docker-compose -f docker-compose.vector.yml up -d
```

### 2단계: 리소스 벡터화 (2-3분)
```bash
npx tsx scripts/setup_vector_db.ts
```

### 3단계: 검색 테스트 (30초)
```bash
npx tsx scripts/test_vector_search.ts
```

### 4단계: 코드에서 사용
```typescript
import { quickSearch } from '@/lib/vector-search';

const results = await quickSearch('Excel 분석 방법');
console.log(results);
```

---

## 🎯 주요 명령어

```bash
# Vector DB 실행
docker-compose -f docker-compose.vector.yml up -d

# Vector DB 중지
docker-compose -f docker-compose.vector.yml down

# 리소스 재벡터화 (파일 추가 시)
npx tsx scripts/setup_vector_db.ts

# 검색 테스트
npx tsx scripts/test_vector_search.ts

# 상태 확인
curl http://localhost:8000/api/v1/heartbeat
```

---

## 📚 자세한 가이드

전체 문서: `docs/VECTOR_DB_GUIDE.md`

---

**작성일**: 2025-12-02  
**자비스 시스템 v1.0**
