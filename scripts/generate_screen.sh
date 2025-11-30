#!/bin/bash
# ========================================
# 화면 자동 생성 스크립트
# Excel PI → JSON Schema → Vue/Java/Mapper
# ========================================

set -e  # 에러 발생 시 중단

echo "========================================"
echo "🚀 화면 자동 생성 프로세스 시작"
echo "========================================"
echo ""

# 변수 설정
EXCEL_FILE="$1"
SCREEN_ID="$2"

if [ -z "$EXCEL_FILE" ] || [ -z "$SCREEN_ID" ]; then
    echo "❌ 사용법: $0 <Excel파일경로> <화면ID>"
    echo "   예시: $0 engine/input/ProductionResult_ScreenDefinition.xlsx ProductionResult"
    exit 1
fi

if [ ! -f "$EXCEL_FILE" ]; then
    echo "❌ Excel 파일을 찾을 수 없습니다: $EXCEL_FILE"
    exit 1
fi

# 출력 디렉토리
OUTPUT_DIR="engine/output/${SCREEN_ID}"
JSON_FILE="${OUTPUT_DIR}/${SCREEN_ID}.json"
VUE_FILE="${OUTPUT_DIR}/${SCREEN_ID}.vue"

echo "📁 Excel 파일: $EXCEL_FILE"
echo "📁 화면 ID: $SCREEN_ID"
echo "📁 출력 디렉토리: $OUTPUT_DIR"
echo ""

# Step 1: Excel → JSON Schema 변환
echo "===================================="
echo "📋 Step 1: Excel → JSON Schema 변환"
echo "===================================="

mkdir -p "$OUTPUT_DIR"
mkdir -p "${OUTPUT_DIR}/java"
mkdir -p "${OUTPUT_DIR}/mapper"

# Python 가상환경 사용
PYTHON_CMD="/home/roarm_m3/ai-factory-lab/generator/venv/bin/python"

if [ ! -f "engine/generator_excel.py" ]; then
    echo "❌ generator_excel.py 파일이 없습니다."
    exit 1
fi

$PYTHON_CMD engine/generator_excel.py "$EXCEL_FILE" "$JSON_FILE"

if [ ! -f "$JSON_FILE" ]; then
    echo "❌ JSON Schema 생성 실패"
    exit 1
fi

echo "✅ JSON Schema 생성 완료: $JSON_FILE"
echo ""

# Step 2: JSON Schema 확인
echo "===================================="
echo "📋 Step 2: 생성된 Schema 확인"
echo "===================================="

echo "화면 정보:"
cat "$JSON_FILE" | grep -E '"pageId"|"pageTitle"|"category"|"tableName"' | head -10
echo ""

# Step 3: Vue 컴포넌트 생성
echo "===================================="
echo "🎨 Step 3: Vue 컴포넌트 생성"
echo "===================================="

# 템플릿 기반 Vue 생성기 사용
$PYTHON_CMD engine/generator_vue.py "$JSON_FILE" "$VUE_FILE"

if [ -f "$VUE_FILE" ]; then
    echo "✅ Vue 파일 생성 완료: $VUE_FILE"
    
    # 파일 크기 확인
    VUE_SIZE=$(ls -lh "$VUE_FILE" | awk '{print $5}')
    VUE_LINES=$(wc -l < "$VUE_FILE")
    echo "   크기: $VUE_SIZE ($VUE_LINES lines)"
else
    echo "⚠️  Vue 파일이 생성되지 않았습니다."
fi
echo ""

# Step 4: 생성된 파일 목록
echo "===================================="
echo "📦 Step 4: 생성된 파일 목록"
echo "===================================="

echo "📁 $OUTPUT_DIR"
ls -lh "$OUTPUT_DIR" | grep -v "^total" | awk '{print "   " $9 " (" $5 ")"}'

if [ -d "${OUTPUT_DIR}/java" ]; then
    echo ""
    echo "📁 ${OUTPUT_DIR}/java"
    find "${OUTPUT_DIR}/java" -type f | while read file; do
        echo "   $(basename $file)"
    done
fi

if [ -d "${OUTPUT_DIR}/mapper" ]; then
    echo ""
    echo "📁 ${OUTPUT_DIR}/mapper"
    find "${OUTPUT_DIR}/mapper" -type f | while read file; do
        echo "   $(basename $file)"
    done
fi

echo ""

# Step 5: Frontend 배포
echo "===================================="
echo "🚀 Step 5: Frontend 파일 배포"
echo "===================================="

# Vue 파일을 frontend로 복사
if [ -f "$VUE_FILE" ]; then
    CATEGORY=$(cat "$JSON_FILE" | grep '"category"' | head -1 | sed 's/.*: *"\([^"]*\)".*/\1/')
    FRONTEND_DIR="frontend/src/views/${CATEGORY}"
    
    mkdir -p "$FRONTEND_DIR"
    cp "$VUE_FILE" "${FRONTEND_DIR}/"
    
    echo "✅ Vue 파일 복사: ${FRONTEND_DIR}/${SCREEN_ID}.vue"
else
    echo "⚠️  복사할 Vue 파일이 없습니다."
fi

# router 설정 파일 확인
if [ -f "${OUTPUT_DIR}/router_config.js" ]; then
    echo "📄 Router 설정: ${OUTPUT_DIR}/router_config.js"
    echo "   (수동으로 frontend/src/router/index.js에 추가 필요)"
fi

echo ""

# Step 6: Backend 배포
echo "===================================="
echo "🚀 Step 6: Backend 파일 배포"
echo "===================================="

# Java Controller 복사
if [ -d "${OUTPUT_DIR}/java" ]; then
    JAVA_FILES=$(find "${OUTPUT_DIR}/java" -name "*Controller.java")
    if [ ! -z "$JAVA_FILES" ]; then
        PACKAGE=$(cat "$JSON_FILE" | grep -o '"com\.dowinsys[^"]*"' | head -1 | tr -d '"')
        PACKAGE_PATH=$(echo "$PACKAGE" | tr '.' '/')
        BACKEND_JAVA_DIR="backend/src/main/java/${PACKAGE_PATH}"
        
        mkdir -p "$BACKEND_JAVA_DIR"
        
        echo "$JAVA_FILES" | while read file; do
            cp "$file" "${BACKEND_JAVA_DIR}/"
            echo "✅ Controller 복사: ${BACKEND_JAVA_DIR}/$(basename $file)"
        done
    fi
fi

# MyBatis Mapper 복사
if [ -d "${OUTPUT_DIR}/mapper" ]; then
    MAPPER_FILES=$(find "${OUTPUT_DIR}/mapper" -name "*.xml")
    if [ ! -z "$MAPPER_FILES" ]; then
        BACKEND_MAPPER_DIR="backend/src/main/resources/mapper"
        
        # Category별 디렉토리 생성
        CATEGORY=$(cat "$JSON_FILE" | grep '"category"' | head -1 | sed 's/.*: *"\([^"]*\)".*/\1/')
        if [ ! -z "$CATEGORY" ]; then
            BACKEND_MAPPER_DIR="${BACKEND_MAPPER_DIR}/${CATEGORY}"
        fi
        
        mkdir -p "$BACKEND_MAPPER_DIR"
        
        echo "$MAPPER_FILES" | while read file; do
            cp "$file" "${BACKEND_MAPPER_DIR}/"
            echo "✅ Mapper 복사: ${BACKEND_MAPPER_DIR}/$(basename $file)"
        done
    fi
fi

echo ""

# Step 7: 완료 메시지
echo "========================================"
echo "✅ 화면 생성 완료!"
echo "========================================"
echo ""
echo "📋 다음 단계:"
echo "   1. Router 설정: frontend/src/router/index.js에 라우트 추가"
echo "   2. 메뉴 등록: DB에 메뉴 데이터 INSERT"
echo "   3. 서버 재시작: Backend Spring Boot 재시작"
echo "   4. 화면 확인: http://localhost:8081/${CATEGORY}/${SCREEN_ID}"
echo ""
echo "========================================"
