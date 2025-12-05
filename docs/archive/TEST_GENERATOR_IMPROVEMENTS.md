# Generator 개선사항 테스트 가이드

## 개선 사항 요약

### 1. ✅ MyBatis Mapper - AS 별칭 추가 (완료)
- **문제:** DB 컬럼 snake_case → Vue 필드 camelCase 불일치
- **해결:** SELECT 구문에 AS 별칭 추가 (예: `plan_qty AS planQty`)
- **파일:** `generator_java.py` (Line 419-430)

### 2. ✅ RealGrid 직접 초기화 (완료)
- **문제:** RealGrid 컴포넌트 wrapper 초기화 타이밍 이슈
- **해결:** GridView/LocalDataProvider 직접 생성
- **파일:** `generator_vue.py` (_generate_template_with_direct_grid)

### 3. ✅ Dropdown 설정 지원 (완료)
- **문제:** 코드 값을 사용자 친화적인 레이블로 표시 필요
- **해결:** setColumnProperty로 lookup 설정
- **파일:** `generator_vue.py` (_generate_dropdown_setup)

## 테스트 방법

### 전제 조건
Spring Boot와 Vue 서버가 실행 중이어야 합니다.

### 1. Generator 기능 확인

```bash
# Vue Generator 테스트 (샘플 JSON이 있는 경우)
cd /home/roarm_m3/ai-factory-lab/engine
python generator_vue.py input/sample.json output/test_output.vue

# 생성된 파일에서 핵심 부분 확인
cat output/test_output.vue | grep -A 10 "initGrid"
cat output/test_output.vue | grep -A 5 "setColumnProperty"
```

### 2. 브라우저에서 실제 테스트

```bash
# 1. 브라우저 열기
# http://localhost:8081/#/production/ProductionResult

# 2. 개발자 도구 (F12) 열기

# 3. Network 탭에서 API 응답 확인
# - /api/production/result/list 클릭
# - Response 탭에서 camelCase 확인:
#   {
#     "planQty": 100,
#     "prodQty": 200,
#     "factoryCd": "F001"
#   }

# 4. Console 탭에서 에러 없는지 확인

# 5. 그리드에서 확인사항:
#   - 모든 컬럼에 데이터 표시되는지
#   - Dropdown 컬럼에서 레이블 표시되는지
#     (F001 → "본사공장", L01 → "1호기" 등)
```

### 3. API 응답 형식 확인

```bash
# camelCase 응답 확인
curl -s "http://localhost:8080/api/production/result/list?page=1&size=1" | \
  python3 -c "import sys, json; data=json.load(sys.stdin); print(json.dumps(data['data'][0], indent=2, ensure_ascii=False))"

# 기대 결과:
# {
#   "resultId": "R00001",
#   "prdDate": "2025-11-30",
#   "factoryCd": "F001",
#   "lineCd": "L01",
#   "shiftCd": "A",
#   "itemCd": "P0001",
#   "itemNm": "알루미늄 프레임",
#   "planQty": 100.0,
#   "prodQty": 95.0,
#   "goodQty": 90.0,
#   "defectQty": 5.0
#   ...
# }
```

## 성공 기준

### ✅ 필수 확인사항
1. **API 응답이 camelCase**
   - planQty, prodQty, factoryCd 등
   
2. **그리드에 모든 데이터 표시**
   - 계획수량, 생산수량, 양품수량, 불량수량 등
   - 숫자 데이터가 0이 아닌 실제 값
   
3. **Dropdown 레이블 표시**
   - 공장: F001 → "본사공장"
   - 라인: L01 → "1호기"
   - 근무조: A → "A조"
   - 상태: TEMP → "임시저장"

4. **Console 에러 없음**
   - undefined 에러 없음
   - RealGrid 초기화 성공

## 문제 발생 시 체크리스트

### 그리드에 데이터가 안 나오는 경우
```bash
# 1. API 응답 확인
curl http://localhost:8080/api/production/result/list?page=1&size=1

# 2. Spring Boot 로그 확인
tail -f /home/roarm_m3/ai-factory-lab/backend/target/*.log

# 3. 브라우저 Console 에러 확인
# F12 → Console 탭
```

### Dropdown이 안 나오는 경우
```bash
# 1. Vue 파일에 setColumnProperty 있는지 확인
grep "setColumnProperty" /home/roarm_m3/ai-factory-lab/frontend/src/views/production/ProductionResult.vue

# 2. values와 labels 배열이 같은 길이인지 확인
# 예: values: ['F001', 'F002'], labels: ['본사공장', '2공장']
```

### snake_case로 나오는 경우
```bash
# Mapper XML에 AS 별칭이 있는지 확인
cat /home/roarm_m3/ai-factory-lab/backend/src/main/resources/mapper/production/ProductionResultMapper.xml | grep "AS"

# 기대: plan_qty AS planQty, prod_qty AS prodQty 등
```

## 참고 파일

- **Generator:** `/home/roarm_m3/ai-factory-lab/engine/generator_vue.py`, `generator_java.py`
- **실제 구현:** `/home/roarm_m3/ai-factory-lab/frontend/src/views/production/ProductionResult.vue`
- **Mapper:** `/home/roarm_m3/ai-factory-lab/backend/src/main/resources/mapper/production/ProductionResultMapper.xml`
- **개선 문서:** `/home/roarm_m3/ai-factory-lab/docs/GENERATOR_IMPROVEMENTS.md`
