# AI Factory Lab - 단계별 체크 시스템

## 🎯 개요

Excel PI 문서부터 배포까지 **각 단계마다 자동 검증**하여 에러를 사전에 차단하는 시스템입니다.

## 🚀 빠른 시작

### 1. API 서버 시작

```bash
cd /home/roarm_m3/ai-factory-lab/engine
python3 checker_api.py
```

서버가 `http://localhost:5000`에서 실행됩니다.

### 2. 단계별 체크

#### ✅ 1단계: Excel PI 업로드 검증

```bash
curl -X POST http://localhost:5000/api/check/pre-generation \
  -F "file=@input/CostManagement.xlsx"
```

**체크 항목:**
- Excel 파일 로드 가능 여부
- 시트명 검증 (ScreenInfo, GridColumns, Buttons, SearchConditions)
- 필수 헤더 존재 여부
- 화면 ID 형식 (PascalCase)
- 데이터 타입 표준 준수
- 필드명 네이밍 규칙
- SQL/Java 예약어 사용 여부

#### ✅ 2단계: 코드 생성 후 검증

```bash
curl http://localhost:5000/api/check/post-generation/CostManagement
```

**체크 항목:**
- 모든 필수 파일 생성 확인 (JSON, Vue, Java, XML)
- JSON Schema 문법 및 구조
- Vue 파일: fields, API 호출, 컴포넌트 구조
- Java 파일: package, Bean 이름, 어노테이션
- MyBatis XML: CDATA, SQL Injection 위험
- XML 문법 검증

#### ✅ 3단계: 배포 전 검증

```bash
curl http://localhost:5000/api/check/pre-deployment/ProductionResult
```

**체크 항목:**
- Backend 컴파일 테스트
- 파일 배포 위치 확인
- Backend/Frontend 서버 상태
- API 엔드포인트 테스트

## 📊 응답 형식

```json
{
  "success": true,
  "summary": {
    "total": 12,
    "pass": 10,
    "error": 0,
    "warning": 2
  },
  "results": [
    {
      "status": "pass",
      "check": "Excel 파일 존재",
      "message": "파일 로드 성공"
    },
    {
      "status": "warning",
      "check": "SQL Injection 위험",
      "message": "${} 사용 3회 발견",
      "solution": "가능하면 #{}를 사용하세요"
    }
  ],
  "can_proceed": true,
  "recommendation": "⚠️ 경고 사항을 확인하세요. 배포는 가능하지만 개선이 필요합니다."
}
```

## 🔧 상태 코드

- `status: "pass"` - ✅ 통과
- `status: "warning"` - ⚠️ 경고 (진행 가능하지만 개선 필요)
- `status: "error"` - ❌ 에러 (수정 필요)

## 💡 활용 예시

### Python에서 사용

```python
import requests

# 1단계: Excel 검증
files = {'file': open('input/CostManagement.xlsx', 'rb')}
response = requests.post('http://localhost:5000/api/check/pre-generation', files=files)
result = response.json()

if result['success']:
    print("✅ Excel 검증 통과!")
else:
    print(f"❌ {result['summary']['error']}개 에러 발견")
    for item in result['results']:
        if item['status'] == 'error':
            print(f"  - {item['check']}: {item['message']}")
            if 'solution' in item:
                print(f"    해결: {item['solution']}")

# 2단계: 코드 생성 후 검증
response = requests.get('http://localhost:5000/api/check/post-generation/CostManagement')
result = response.json()

if result['can_proceed']:
    print("✅ 배포 가능!")
else:
    print("❌ 에러 수정 후 재시도")
```

### Bash 스크립트에서 사용

```bash
#!/bin/bash

SCREEN_ID="CostManagement"

# 코드 생성 후 자동 검증
response=$(curl -s http://localhost:5000/api/check/post-generation/$SCREEN_ID)
success=$(echo $response | python3 -c "import sys, json; print(json.load(sys.stdin)['success'])")

if [ "$success" = "True" ]; then
    echo "✅ 검증 통과 - 배포 진행"
    # 배포 스크립트 실행
    ./deploy.sh $SCREEN_ID
else
    echo "❌ 검증 실패 - 에러 확인"
    echo $response | python3 -m json.tool
    exit 1
fi
```

## 🎯 통합 워크플로우

```bash
# 전체 프로세스 (Excel → 코드 생성 → 배포)
EXCEL_FILE="input/CostManagement.xlsx"
SCREEN_ID="CostManagement"

# 1. Excel 검증
echo "1️⃣ Excel PI 검증 중..."
curl -X POST http://localhost:5000/api/check/pre-generation -F "file=@$EXCEL_FILE" | python3 -m json.tool

# 2. 코드 생성
echo "2️⃣ 코드 생성 중..."
python3 generator_excel.py $EXCEL_FILE output/$SCREEN_ID/$SCREEN_ID.json
python3 generator_vue.py output/$SCREEN_ID/$SCREEN_ID.json output/$SCREEN_ID/$SCREEN_ID.vue
python3 generator_java.py output/$SCREEN_ID/$SCREEN_ID.json

# 3. 코드 검증
echo "3️⃣ 생성된 코드 검증 중..."
curl http://localhost:5000/api/check/post-generation/$SCREEN_ID | python3 -m json.tool

# 4. 파일 배포
echo "4️⃣ 파일 배포 중..."
cp output/$SCREEN_ID/$SCREEN_ID.vue ../frontend/src/views/cost/
cp output/$SCREEN_ID/java/*.java ../backend/src/main/java/com/dowinsys/cost/
cp output/$SCREEN_ID/mapper/*.xml ../backend/src/main/resources/mapper/cost/

# 5. 배포 전 검증
echo "5️⃣ 배포 전 최종 검증 중..."
curl http://localhost:5000/api/check/pre-deployment/$SCREEN_ID | python3 -m json.tool

echo "✅ 완료!"
```

## 📚 참고 문서

- `PROJECT_TROUBLESHOOTING_GUIDE_V2.md` - 상세 에러 해결 가이드
- `REALGRID_DB_INTEGRATION_PATTERN.md` - RealGrid DB 연동 패턴
- `SESSION_SUMMARY_20251130.md` - 프로젝트 현황

## 🛠️ 필요한 Python 패키지

```bash
pip install --break-system-packages flask flask-cors requests openpyxl
```

## ⚙️ 설정

API 서버 포트를 변경하려면 `checker_api.py` 마지막 줄을 수정하세요:

```python
app.run(debug=True, host='0.0.0.0', port=5000)  # 원하는 포트로 변경
```

---

**작성일:** 2025-11-30  
**버전:** 1.0
