---
description: 생산계획 최적화 워크플로우 - OR-Tools 기반 스케줄링
---

# 생산계획 최적화 워크플로우

이 워크플로우는 생산계획 최적화를 위한 전체 프로세스를 정의합니다.

## 사전 조건
- PostgreSQL 서버 실행 중
- Python OR-Tools 서비스 실행 중 (`scheduling-service/`)

---

## 워크플로우 단계

### 1. 데이터 조회
```bash
# spacepro 스키마에서 생산계획 관련 데이터 조회
psql "postgresql://postgres:postgres@localhost:5432/binary" -c "
SET search_path TO spacepro;
SELECT * FROM tb_item_mst WHERE item_type = 'PRODUCT' LIMIT 10;
"
```

### 2. OR-Tools 서비스 상태 확인
// turbo
```bash
curl -s http://localhost:8000/health || echo "서비스 미실행"
```

### 3. 스케줄 최적화 실행
```bash
# 최적화 요청 (예시)
curl -X POST http://localhost:8000/optimize \
  -H "Content-Type: application/json" \
  -d '{
    "planDate": "2025-01",
    "orders": [],
    "machines": [],
    "objective": "MINIMIZE_MAKESPAN"
  }'
```

### 4. 결과 검토
- 최적화 결과를 확인하고 사용자에게 Draft 형태로 제시
- 사용자 승인 후 시스템에 적용

---

## OR-Tools 서비스 시작 (필요시)
```bash
cd /home/roarm_m3/ai-factory-lab/Project/spacepro/scheduling-service
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

---

## 문제 해결

### 서비스 연결 실패
1. Python 환경 확인: `python --version`
2. 패키지 설치: `pip install ortools fastapi uvicorn`
3. 포트 확인: `lsof -i :8000`

### DB 연결 실패
1. PostgreSQL 실행 확인: `pg_isready`
2. 스키마 확인: `spacepro` 스키마 존재 여부
