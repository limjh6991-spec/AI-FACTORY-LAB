# AI Factory Lab - 자동화된 단계별 체크 시스템

## 🎯 개요

**문제점:** Excel PI를 업로드하고 코드를 생성할 때마다 수동으로 체크해야 하는 번거로움

**해결책:** **각 단계마다 자동으로 검증**하고 **즉시 피드백**을 제공하는 API 시스템

---

## ✨ 주요 기능

### 1️⃣ Excel PI 업로드 시 즉시 검증 (Pre-Generation Check)

**사용자가 Excel 파일 업로드 → API가 자동 검증 → 결과 즉시 표시**

#### 자동 체크 항목 (9가지)

| ✅ | 체크 항목 | 에러 예시 | 자동 해결방안 제시 |
|---|----------|-----------|----------------|
| 1 | Excel 파일 로드 가능 여부 | "파일이 손상됨" | "올바른 Excel 파일을 업로드하세요" |
| 2 | 시트명 검증 | "GridColumns 시트 없음" | "필수 시트를 추가하세요: GridColumns, Buttons..." |
| 3 | 필수 헤더 존재 | "Width 헤더 누락" | "GridColumns 시트에 Width 컬럼을 추가하세요" |
| 4 | 화면 ID 형식 | "cost-management (하이픈)" | "PascalCase로 변경: CostManagement" |
| 5 | 데이터 타입 표준 | "string (잘못된 타입)" | "허용 타입: number, text, datetime, date, boolean" |
| 6 | 필드명 네이밍 | "product-name (하이픈)" | "camelCase: productName" |
| 7 | SQL/Java 예약어 | "select (예약어)" | "다른 이름 사용: selectOption" |
| 8 | 버튼 정의 | "Buttons 시트 비어있음" | "버튼 정보를 입력하거나 시트 삭제" |
| 9 | 검색 조건 정의 | "SearchConditions 확인" | "검색 조건 추가 또는 시트 삭제" |

#### API 호출 예시

```bash
curl -X POST http://localhost:5000/api/check/pre-generation \
  -F "file=@input/CostManagement.xlsx"
```

#### 응답 예시

```json
{
  "success": false,
  "summary": {
    "total": 9,
    "pass": 7,
    "error": 2,
    "warning": 0
  },
  "results": [
    {
      "status": "error",
      "check": "필드명 검증",
      "message": "잘못된 필드명이 2개 발견되었습니다",
      "details": [
        "Row 5: product-name - 특수문자 또는 공백 포함",
        "Row 8: select - SQL/Java 예약어 사용 금지"
      ],
      "solution": "필드명은 영문으로 시작하고, 영문/숫자/언더스코어만 사용 (예: productName)"
    }
  ],
  "can_proceed": false,
  "recommendation": "🔴 에러를 모두 수정한 후 다시 업로드해주세요."
}
```

---

### 2️⃣ 코드 생성 후 자동 검증 (Post-Generation Check)

**코드 생성 완료 → API 호출 → 파일 무결성 및 품질 검증**

#### 자동 체크 항목 (12가지)

| ✅ | 체크 항목 | 검증 내용 |
|---|----------|-----------|
| 1 | JSON Schema 파일 | 생성 여부 + 문법 검증 |
| 2 | Vue Component | 생성 여부 + fields 정의 확인 |
| 3 | Java Controller | 생성 여부 + package 선언 확인 |
| 4 | Java Service | Interface + Impl 생성 확인 |
| 5 | Java Mapper | Mapper.java 생성 확인 |
| 6 | MyBatis XML | Mapper.xml 생성 확인 |
| 7 | JSON 문법 | 올바른 JSON 형식인지 검증 |
| 8 | JSON Schema 구조 | 필수 키 존재 (screenId, columns 등) |
| 9 | Vue fields 정의 | `const fields = ref` 선언 확인 |
| 10 | Java package 경로 | package와 폴더 경로 일치 확인 |
| 11 | MyBatis CDATA | `<![CDATA[...]]>` 사용 권장 |
| 12 | SQL Injection 위험 | `${}` 사용 경고, `#{}` 권장 |

#### API 호출 예시

```bash
curl http://localhost:5000/api/check/post-generation/CostManagement
```

#### 응답 예시 (경고 있음)

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
      "status": "warning",
      "check": "SQL Injection 위험",
      "message": "${} 사용 3회 발견",
      "solution": "가능하면 #{}를 사용하세요 (prepared statement)"
    },
    {
      "status": "warning",
      "check": "MyBatis CDATA",
      "message": "CDATA 사용을 권장합니다",
      "solution": "복잡한 SQL은 <![CDATA[...]]>로 감싸세요"
    }
  ],
  "can_proceed": true,
  "recommendation": "⚠️ 경고 사항을 확인하세요. 배포는 가능하지만 개선이 필요합니다."
}
```

---

### 3️⃣ 배포 전 자동 검증 (Pre-Deployment Check)

**파일 배포 후 → API 호출 → 빌드 가능 여부 및 서버 상태 확인**

#### 자동 체크 항목 (8가지)

| ✅ | 체크 항목 | 검증 내용 |
|---|----------|-----------|
| 1 | Backend 컴파일 | `mvn compiler:testCompile` 실행 |
| 2 | Vue 파일 배포 위치 | `frontend/src/views/*/` 파일 존재 확인 |
| 3 | Java 파일 배포 위치 | `backend/src/main/java/` 파일 존재 확인 |
| 4 | Backend 서버 상태 | Spring Boot 8080 포트 실행 확인 |
| 5 | Frontend 서버 상태 | Vue Dev Server 8081 포트 확인 |
| 6 | API 엔드포인트 | 실제 API 호출 테스트 (200 응답) |
| 7 | DB 연결 설정 | application.yml DB URL 확인 |
| 8 | 메모리 사용량 | Backend 프로세스 메모리 체크 |

#### API 호출 예시

```bash
curl http://localhost:5000/api/check/pre-deployment/ProductionResult
```

#### 응답 예시

```json
{
  "success": true,
  "summary": {
    "total": 8,
    "pass": 6,
    "error": 0,
    "warning": 2
  },
  "results": [
    {
      "status": "pass",
      "check": "Backend 빌드",
      "message": "✅ 컴파일 성공! 문법 에러 없음"
    },
    {
      "status": "warning",
      "check": "API 엔드포인트",
      "message": "⚠️ http://localhost:8080/api/production/productionresult/list 없음 (404)",
      "solution": "Backend 서버를 재시작하세요"
    }
  ],
  "can_proceed": true,
  "recommendation": "⚠️ 경고 사항이 있지만 배포는 가능합니다."
}
```

---

## 🚀 실전 활용 시나리오

### 시나리오 1: Python Generator에서 자동 검증 통합

```python
# engine/generator_excel.py 수정
import requests

def generate_from_excel(excel_file):
    # 1. Excel 검증 먼저 실행
    print("📋 Excel PI 검증 중...")
    
    with open(excel_file, 'rb') as f:
        response = requests.post(
            'http://localhost:5000/api/check/pre-generation',
            files={'file': f}
        )
    
    result = response.json()
    
    # 2. 에러가 있으면 중단하고 피드백 표시
    if not result['success']:
        print(f"\n❌ Excel 검증 실패: {result['summary']['error']}개 에러 발견\n")
        
        for item in result['results']:
            if item['status'] == 'error':
                print(f"🔴 {item['check']}")
                print(f"   └ {item['message']}")
                if 'details' in item and item['details']:
                    for detail in item['details'][:3]:  # 최대 3개만 표시
                        print(f"      • {detail}")
                if 'solution' in item:
                    print(f"   💡 해결: {item['solution']}\n")
        
        return False
    
    # 3. 검증 통과 → 코드 생성 진행
    print("✅ Excel 검증 통과!\n")
    print("🔨 코드 생성 중...")
    
    # 기존 코드 생성 로직...
    generate_json(excel_file)
    
    return True
```

### 시나리오 2: 전체 자동화 스크립트

```bash
#!/bin/bash
# scripts/smart_generate.sh - 스마트 화면 생성 스크립트

EXCEL_FILE=$1
SCREEN_ID=$2

echo "🎯 AI Factory Lab - 스마트 화면 생성"
echo "====================================="

# 1단계: Excel 검증
echo "1️⃣ Excel PI 검증 중..."
RESULT=$(curl -s -X POST http://localhost:5000/api/check/pre-generation -F "file=@$EXCEL_FILE")
SUCCESS=$(echo $RESULT | python3 -c "import sys, json; print(json.load(sys.stdin)['success'])")

if [ "$SUCCESS" != "True" ]; then
    echo "❌ Excel 검증 실패"
    echo $RESULT | python3 -m json.tool
    exit 1
fi
echo "✅ 통과"

# 2단계: 코드 생성
echo "2️⃣ 코드 생성 중..."
cd engine
python3 generator_excel.py $EXCEL_FILE output/$SCREEN_ID/$SCREEN_ID.json
python3 generator_vue.py output/$SCREEN_ID/$SCREEN_ID.json output/$SCREEN_ID/$SCREEN_ID.vue
python3 generator_java.py output/$SCREEN_ID/$SCREEN_ID.json
cd ..
echo "✅ 완료"

# 3단계: 생성된 코드 검증
echo "3️⃣ 생성된 코드 검증 중..."
RESULT=$(curl -s http://localhost:5000/api/check/post-generation/$SCREEN_ID)
CAN_PROCEED=$(echo $RESULT | python3 -c "import sys, json; print(json.load(sys.stdin)['can_proceed'])")

if [ "$CAN_PROCEED" != "True" ]; then
    echo "❌ 코드 검증 실패"
    echo $RESULT | python3 -m json.tool
    exit 1
fi

# 경고가 있으면 표시
WARNINGS=$(echo $RESULT | python3 -c "import sys, json; print(json.load(sys.stdin)['summary']['warning'])")
if [ "$WARNINGS" != "0" ]; then
    echo "⚠️  경고 ${WARNINGS}개 발견 (배포는 가능)"
fi
echo "✅ 통과"

# 4단계: 파일 배포
echo "4️⃣ 파일 배포 중..."
CATEGORY=$(echo $SCREEN_ID | python3 -c "import sys, re; s=sys.stdin.read().strip(); print(re.sub(r'(?<!^)(?=[A-Z])', '_', s).lower().split('_')[0])")

cp engine/output/$SCREEN_ID/$SCREEN_ID.vue frontend/src/views/$CATEGORY/
cp engine/output/$SCREEN_ID/java/*.java backend/src/main/java/com/dowinsys/$CATEGORY/
cp engine/output/$SCREEN_ID/mapper/*.xml backend/src/main/resources/mapper/$CATEGORY/
echo "✅ 완료"

# 5단계: 배포 전 검증
echo "5️⃣ 배포 전 최종 검증..."
RESULT=$(curl -s http://localhost:5000/api/check/pre-deployment/$SCREEN_ID)
SUCCESS=$(echo $RESULT | python3 -c "import sys, json; print(json.load(sys.stdin)['success'])")

echo $RESULT | python3 -m json.tool

if [ "$SUCCESS" = "True" ]; then
    echo ""
    echo "🎉 모든 검증 통과! 화면 생성 완료"
    echo "====================================="
    echo "📍 Vue 파일: frontend/src/views/$CATEGORY/$SCREEN_ID.vue"
    echo "📍 Java 파일: backend/src/main/java/com/dowinsys/$CATEGORY/"
    echo ""
    echo "🚀 다음 단계:"
    echo "   1. Backend 재시작: cd backend && mvn spring-boot:run"
    echo "   2. Frontend 접속: http://localhost:8081/$CATEGORY/$SCREEN_ID"
else
    echo "⚠️  경고가 있지만 배포는 완료되었습니다"
fi
```

**사용법:**
```bash
chmod +x scripts/smart_generate.sh
./scripts/smart_generate.sh engine/input/CostManagement.xlsx CostManagement
```

---

## 📊 장점 비교

### 기존 방식 (수동 체크)

```
1. Excel 업로드
2. 코드 생성 실행
3. 빌드 에러 발생 ❌
4. 로그 확인 → 필드명에 하이픈 발견
5. Excel 수정
6. 코드 재생성
7. 빌드 에러 또 발생 ❌
8. 로그 확인 → SQL 예약어 사용
9. Excel 수정
10. 코드 재생성
11. 드디어 성공 ✅

⏱️ 소요 시간: 30분+
😫 스트레스: 최대
```

### 새로운 방식 (자동 체크)

```
1. Excel 업로드
2. 자동 검증 실행 ⚡
   ❌ 필드명 하이픈 발견 → 즉시 피드백
   ❌ SQL 예약어 사용 → 즉시 피드백
   💡 해결방안 자동 제시
3. Excel 한번에 수정
4. 재검증 → ✅ 통과
5. 코드 생성 → ✅ 성공

⏱️ 소요 시간: 5분
😊 스트레스: 최소
```

---

## 🎯 핵심 가치

### 1. **즉시 피드백**
- Excel 업로드 즉시 모든 에러 발견
- 수정 후 다시 업로드하면 바로 확인

### 2. **자동 해결방안 제시**
- "필드명이 잘못되었습니다" ❌
- "필드명에 하이픈 사용 금지 → camelCase로 변경 (예: productName)" ✅

### 3. **다단계 방어**
- 1단계: Excel 검증 (잘못된 입력 차단)
- 2단계: 코드 검증 (생성 오류 감지)
- 3단계: 배포 검증 (실행 오류 예방)

### 4. **CI/CD 통합 가능**
- GitHub Actions 워크플로우에 쉽게 통합
- 자동화된 테스트 파이프라인 구축

---

## 📦 설치 및 실행

### 1. 필요한 패키지 설치

```bash
pip install --break-system-packages flask flask-cors requests openpyxl
```

### 2. API 서버 시작

```bash
cd /home/roarm_m3/ai-factory-lab/engine
python3 checker_api.py

# 출력:
# ============================================================
#   AI Factory Lab - 단계별 체크 API 서버
# ============================================================
#   포트: 5000
```

### 3. 테스트

```bash
# Health Check
curl http://localhost:5000/health

# Excel 검증 테스트
curl -X POST http://localhost:5000/api/check/pre-generation \
  -F "file=@input/test.xlsx"

# 코드 검증 테스트
curl http://localhost:5000/api/check/post-generation/CostManagement
```

---

## 📚 관련 문서

- **`engine/CHECKER_README.md`** - 상세 API 문서 및 사용법
- **`PROJECT_TROUBLESHOOTING_GUIDE_V2.md`** - 전체 에러 해결 가이드
- **`SESSION_SUMMARY_20251130.md`** - 프로젝트 현황

---

**작성일:** 2025-11-30  
**버전:** 1.0  
**작성자:** AI Factory Lab Team

**🎉 "이제 에러는 발생하기 전에 차단됩니다!" 🎉**
