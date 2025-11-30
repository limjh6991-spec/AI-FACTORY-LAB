#!/bin/bash
# 전체 화면 자동 생성 스크립트
# Excel PI → JSON → Vue + Java + Mapper

# 사용법 체크
if [ "$#" -lt 1 ]; then
    echo "사용법: $0 <Excel파일경로> [화면ID]"
    echo "예시: $0 engine/input/CostManagement_ScreenDefinition.xlsx"
    exit 1
fi

EXCEL_FILE="$1"
SCREEN_ID="$2"

# Excel 파일 존재 확인
if [ ! -f "$EXCEL_FILE" ]; then
    echo "❌ Excel 파일을 찾을 수 없습니다: $EXCEL_FILE"
    exit 1
fi

echo "🚀 화면 자동 생성 시작"
echo "   Excel PI: $EXCEL_FILE"
echo ""

# Step 1: Excel → JSON 파싱
echo "📝 Step 1: Excel PI 파싱..."
cd engine
python generator_excel.py "$EXCEL_FILE"

if [ $? -ne 0 ]; then
    echo "❌ Excel 파싱 실패"
    exit 1
fi

# 화면 ID 자동 추출 (파일명에서)
if [ -z "$SCREEN_ID" ]; then
    SCREEN_ID=$(basename "$EXCEL_FILE" | sed 's/_ScreenDefinition.xlsx$//')
fi

JSON_FILE="output/$SCREEN_ID/$SCREEN_ID.json"

if [ ! -f "$JSON_FILE" ]; then
    echo "❌ JSON 파일이 생성되지 않았습니다: $JSON_FILE"
    exit 1
fi

echo "✅ JSON Schema 생성 완료: $JSON_FILE"
echo ""

# Step 2: JSON → Vue 컴포넌트 생성
echo "🎨 Step 2: Vue 컴포넌트 생성..."
python generator_vue.py "$JSON_FILE"

if [ $? -ne 0 ]; then
    echo "❌ Vue 컴포넌트 생성 실패"
    exit 1
fi

VUE_FILE="output/$SCREEN_ID/$SCREEN_ID.vue"
echo "✅ Vue 컴포넌트 생성 완료: $VUE_FILE"
echo ""

# Step 3: JSON → Java Backend 생성
echo "☕ Step 3: Java Backend 코드 생성..."
python generator_java.py "$JSON_FILE"

if [ $? -ne 0 ]; then
    echo "❌ Java Backend 생성 실패"
    exit 1
fi

echo "✅ Java Backend 코드 생성 완료"
echo ""

# Step 4: Frontend 배포
echo "📦 Step 4: Frontend 배포..."
cd ..

# JSON에서 카테고리 추출
CATEGORY=$(python3 -c "import json; data = json.load(open('$JSON_FILE')); print(data.get('pageInfo', {}).get('category', 'common'))")

FRONTEND_DIR="frontend/src/views/$CATEGORY"
mkdir -p "$FRONTEND_DIR"

cp "engine/output/$SCREEN_ID/$SCREEN_ID.vue" "$FRONTEND_DIR/"
echo "✅ Vue 파일 배포: $FRONTEND_DIR/$SCREEN_ID.vue"
echo ""

# Step 5: Backend 배포
echo "📦 Step 5: Backend 배포..."
BACKEND_JAVA_DIR="backend/src/main/java/com/dowinsys/$CATEGORY"
BACKEND_MAPPER_DIR="backend/src/main/resources/mapper/$CATEGORY"

mkdir -p "$BACKEND_JAVA_DIR"
mkdir -p "$BACKEND_MAPPER_DIR"

cp engine/output/$SCREEN_ID/java/*.java "$BACKEND_JAVA_DIR/"
cp engine/output/$SCREEN_ID/mapper/*.xml "$BACKEND_MAPPER_DIR/"

echo "✅ Java 파일 배포: $BACKEND_JAVA_DIR"
echo "✅ Mapper XML 배포: $BACKEND_MAPPER_DIR"
echo ""

# Step 6: 라우터 설정 출력
echo "📋 Step 6: 라우터 설정 가이드"
echo "-----------------------------------"
echo "frontend/src/router/index.js에 다음을 추가하세요:"
echo ""
echo "{"
echo "  path: '/$CATEGORY/$SCREEN_ID',"
echo "  name: '$SCREEN_ID',"
echo "  component: () => import('@/views/$CATEGORY/$SCREEN_ID.vue'),"
echo "  meta: { requiresAuth: true }"
echo "},"
echo ""
echo "-----------------------------------"
echo ""

# Step 7: 메뉴 등록 가이드
echo "📋 Step 7: 메뉴 등록 가이드"
echo "-----------------------------------"
echo "DB에 메뉴를 등록하세요:"
echo "INSERT INTO new_doi_sys_menu (menu_id, menu_nm, url, parent_id, ...)"
echo "VALUES ('M00X-XX', '화면명', '/$CATEGORY/$SCREEN_ID', ...);"
echo ""
echo "-----------------------------------"
echo ""

# 요약
echo "🎉 화면 자동 생성 완료!"
echo ""
echo "📊 생성 결과:"
echo "   ✅ JSON Schema: engine/output/$SCREEN_ID/$SCREEN_ID.json"
echo "   ✅ Vue Component: $FRONTEND_DIR/$SCREEN_ID.vue"
echo "   ✅ Java Controller: $BACKEND_JAVA_DIR/${SCREEN_ID}Controller.java"
echo "   ✅ Java Service: $BACKEND_JAVA_DIR/${SCREEN_ID}Service.java"
echo "   ✅ Java ServiceImpl: $BACKEND_JAVA_DIR/${SCREEN_ID}ServiceImpl.java"
echo "   ✅ Java Mapper: $BACKEND_JAVA_DIR/${SCREEN_ID}Mapper.java"
echo "   ✅ Mapper XML: $BACKEND_MAPPER_DIR/${SCREEN_ID}Mapper.xml"
echo ""
echo "🔧 다음 단계:"
echo "   1. 라우터 설정 추가"
echo "   2. 메뉴 등록"
echo "   3. Backend 서버 재시작: cd backend && pkill -f spring-boot:run && nohup mvn spring-boot:run > spring-boot.log 2>&1 &"
echo "   4. 브라우저 테스트: http://localhost:8081/$CATEGORY/$SCREEN_ID"
echo ""
