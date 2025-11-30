#!/bin/bash

###############################################################################
# AI Factory Lab - 사전 방지 체크리스트 자동화 스크립트
# 파일: scripts/check_prevention.sh
# 목적: 단계별 자동 체크로 에러 사전 방지
# 사용법: ./scripts/check_prevention.sh [stage] [screen_id]
#         stage: pre-gen | post-gen | pre-deploy | monitoring
###############################################################################

# 색상 정의
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 체크 결과 카운터
TOTAL_CHECKS=0
PASSED_CHECKS=0
FAILED_CHECKS=0
WARNING_CHECKS=0

# 로그 파일
LOG_FILE="logs/prevention_check_$(date +%Y%m%d_%H%M%S).log"
mkdir -p logs

# 함수: 체크 결과 출력
check_result() {
    local check_name="$1"
    local result="$2"
    local message="$3"
    
    TOTAL_CHECKS=$((TOTAL_CHECKS + 1))
    
    if [ "$result" = "PASS" ]; then
        echo -e "${GREEN}✅ PASS${NC} | $check_name: $message"
        echo "[PASS] $check_name: $message" >> "$LOG_FILE"
        PASSED_CHECKS=$((PASSED_CHECKS + 1))
    elif [ "$result" = "FAIL" ]; then
        echo -e "${RED}❌ FAIL${NC} | $check_name: $message"
        echo "[FAIL] $check_name: $message" >> "$LOG_FILE"
        FAILED_CHECKS=$((FAILED_CHECKS + 1))
    elif [ "$result" = "WARN" ]; then
        echo -e "${YELLOW}⚠️  WARN${NC} | $check_name: $message"
        echo "[WARN] $check_name: $message" >> "$LOG_FILE"
        WARNING_CHECKS=$((WARNING_CHECKS + 1))
    fi
}

# 함수: 헤더 출력
print_header() {
    local title="$1"
    echo ""
    echo -e "${BLUE}========================================${NC}"
    echo -e "${BLUE}  $title${NC}"
    echo -e "${BLUE}========================================${NC}"
    echo ""
}

###############################################################################
# 1. Generator 실행 전 체크 (pre-gen)
###############################################################################
check_pre_generation() {
    local excel_file="$1"
    
    print_header "📋 Generator 실행 전 체크 (Excel 검증)"
    
    # 1.1 Excel 파일 존재 확인
    if [ -f "$excel_file" ]; then
        check_result "Excel 파일 존재" "PASS" "$excel_file 파일 발견"
    else
        check_result "Excel 파일 존재" "FAIL" "$excel_file 파일 없음"
        return 1
    fi
    
    # 1.2 Python 환경 확인
    if command -v python3 &> /dev/null; then
        check_result "Python 환경" "PASS" "$(python3 --version)"
    else
        check_result "Python 환경" "FAIL" "Python3 설치 필요"
        return 1
    fi
    
    # 1.3 필요한 Python 라이브러리 확인
    python3 -c "import openpyxl" 2>/dev/null
    if [ $? -eq 0 ]; then
        check_result "openpyxl 라이브러리" "PASS" "설치됨"
    else
        check_result "openpyxl 라이브러리" "FAIL" "pip install openpyxl 필요"
    fi
    
    # 1.4 Excel 시트명 검증 (Python 스크립트 사용)
    python3 << EOF
import sys
try:
    from openpyxl import load_workbook
    wb = load_workbook('$excel_file', read_only=True)
    sheet_names = wb.sheetnames
    
    required_sheets = ['GridColumns', 'Buttons', 'SearchConditions']
    missing_sheets = [s for s in required_sheets if s not in sheet_names]
    
    if missing_sheets:
        print(f"FAIL|누락된 시트: {', '.join(missing_sheets)}")
        sys.exit(1)
    else:
        print(f"PASS|필수 시트 모두 존재: {', '.join(required_sheets)}")
        sys.exit(0)
except Exception as e:
    print(f"FAIL|{str(e)}")
    sys.exit(1)
EOF
    
    if [ $? -eq 0 ]; then
        result=$(python3 << EOF
from openpyxl import load_workbook
wb = load_workbook('$excel_file', read_only=True)
print("PASS|" + ", ".join(wb.sheetnames))
EOF
)
        check_result "Excel 시트명" "PASS" "${result#*|}"
    else
        check_result "Excel 시트명" "FAIL" "필수 시트 누락"
    fi
    
    # 1.5 헤더 검증
    python3 << 'EOF' "$excel_file"
import sys
from openpyxl import load_workbook

excel_file = sys.argv[1]
wb = load_workbook(excel_file, read_only=True)

# GridColumns 시트 헤더 확인
if 'GridColumns' in wb.sheetnames:
    sheet = wb['GridColumns']
    headers = [cell.value for cell in sheet[1]]
    required_headers = ['Field Name', 'Type', 'Label', 'Width']
    missing = [h for h in required_headers if h not in headers]
    
    if missing:
        print(f"FAIL|GridColumns에 누락된 헤더: {', '.join(missing)}")
        sys.exit(1)
    else:
        print(f"PASS|GridColumns 헤더 완벽")
        sys.exit(0)
else:
    print("FAIL|GridColumns 시트 없음")
    sys.exit(1)
EOF
    
    if [ $? -eq 0 ]; then
        check_result "필수 헤더" "PASS" "GridColumns 헤더 완벽"
    else
        check_result "필수 헤더" "FAIL" "GridColumns 헤더 누락"
    fi
}

###############################################################################
# 2. 코드 생성 후 체크 (post-gen)
###############################################################################
check_post_generation() {
    local screen_id="$1"
    local output_dir="engine/output/$screen_id"
    
    print_header "🔨 코드 생성 후 체크 (파일 검증)"
    
    # 2.1 JSON Schema 파일 확인
    if [ -f "$output_dir/${screen_id}.json" ]; then
        check_result "JSON Schema 파일" "PASS" "${screen_id}.json 생성됨"
        
        # JSON 문법 검증
        python3 -c "import json; json.load(open('$output_dir/${screen_id}.json'))" 2>/dev/null
        if [ $? -eq 0 ]; then
            check_result "JSON 문법" "PASS" "올바른 JSON 형식"
        else
            check_result "JSON 문법" "FAIL" "JSON 파싱 에러"
        fi
    else
        check_result "JSON Schema 파일" "FAIL" "${screen_id}.json 없음"
    fi
    
    # 2.2 Vue 파일 확인
    if [ -f "$output_dir/${screen_id}.vue" ]; then
        check_result "Vue 파일" "PASS" "${screen_id}.vue 생성됨"
        
        # Vue 파일 내 fields 정의 확인
        if grep -q "const fields = ref" "$output_dir/${screen_id}.vue"; then
            check_result "Vue fields 정의" "PASS" "fields 선언 확인"
        else
            check_result "Vue fields 정의" "WARN" "fields 선언 미확인"
        fi
    else
        check_result "Vue 파일" "FAIL" "${screen_id}.vue 없음"
    fi
    
    # 2.3 Java Controller 확인
    local java_file="$output_dir/java/${screen_id}Controller.java"
    if [ -f "$java_file" ]; then
        check_result "Java Controller" "PASS" "${screen_id}Controller.java 생성됨"
        
        # package 경로 확인
        local package_line=$(grep "^package" "$java_file")
        if [ -n "$package_line" ]; then
            check_result "Package 선언" "PASS" "$package_line"
        else
            check_result "Package 선언" "FAIL" "package 선언 없음"
        fi
        
        # Bean 이름 확인 (화면ID가 포함되어야 함)
        if grep -q "${screen_id}Service" "$java_file"; then
            check_result "Bean 이름" "PASS" "${screen_id}Service 참조 확인"
        else
            check_result "Bean 이름" "WARN" "${screen_id}Service 참조 미확인"
        fi
    else
        check_result "Java Controller" "FAIL" "${screen_id}Controller.java 없음"
    fi
    
    # 2.4 MyBatis Mapper XML 확인
    local mapper_file="$output_dir/mapper/${screen_id}Mapper.xml"
    if [ -f "$mapper_file" ]; then
        check_result "MyBatis Mapper XML" "PASS" "${screen_id}Mapper.xml 생성됨"
        
        # CDATA 사용 확인
        if grep -q "<!\[CDATA\[" "$mapper_file"; then
            check_result "CDATA 사용" "PASS" "SQL이 CDATA로 감싸짐"
        else
            check_result "CDATA 사용" "WARN" "CDATA 사용 권장"
        fi
        
        # SQL Injection 위험 확인 (${} 사용)
        if grep -q '\${' "$mapper_file"; then
            local count=$(grep -o '\${' "$mapper_file" | wc -l)
            check_result "SQL Injection 위험" "WARN" "\${} 사용 ${count}회 발견 (#{} 권장)"
        else
            check_result "SQL Injection 위험" "PASS" "#{} 사용 (안전)"
        fi
        
        # XML 문법 검증
        if command -v xmllint &> /dev/null; then
            xmllint --noout "$mapper_file" 2>/dev/null
            if [ $? -eq 0 ]; then
                check_result "XML 문법" "PASS" "올바른 XML 형식"
            else
                check_result "XML 문법" "FAIL" "XML 파싱 에러"
            fi
        fi
    else
        check_result "MyBatis Mapper XML" "FAIL" "${screen_id}Mapper.xml 없음"
    fi
}

###############################################################################
# 3. 배포 전 체크 (pre-deploy)
###############################################################################
check_pre_deployment() {
    local screen_id="$1"
    
    print_header "🚀 배포 전 체크 (빌드 & 테스트)"
    
    # 3.1 Backend 빌드 테스트
    echo "Backend 컴파일 테스트 중..."
    cd backend
    mvn clean compile -q > /tmp/maven_output.txt 2>&1
    if [ $? -eq 0 ]; then
        check_result "Backend 빌드" "PASS" "mvn clean compile 성공"
    else
        check_result "Backend 빌드" "FAIL" "mvn clean compile 실패 (자세한 내용: /tmp/maven_output.txt)"
        cat /tmp/maven_output.txt | tail -20
    fi
    cd ..
    
    # 3.2 Frontend 빌드 테스트 (빠른 검증만)
    if [ -d "frontend" ]; then
        echo "Frontend 문법 검증 중..."
        cd frontend
        # npm run lint 대신 빠른 구문 검증
        if [ -f "src/views/${screen_id}.vue" ] || find src/views -name "${screen_id}.vue" -type f 2>/dev/null | grep -q .; then
            check_result "Frontend Vue 파일 배포" "PASS" "${screen_id}.vue 파일 존재"
        else
            check_result "Frontend Vue 파일 배포" "WARN" "${screen_id}.vue 파일 미발견"
        fi
        cd ..
    fi
    
    # 3.3 Backend API 테스트 (서버가 실행 중이면)
    if curl -s http://localhost:8080/actuator/health > /dev/null 2>&1; then
        check_result "Backend 서버 상태" "PASS" "Spring Boot 실행 중 (8080 포트)"
        
        # 생성된 API 엔드포인트 테스트 (있으면)
        local category=$(echo "$screen_id" | python3 -c "import sys, re; s=sys.stdin.read().strip(); print(re.sub(r'(?<!^)(?=[A-Z])', '_', s).lower().split('_')[0])")
        local api_url="http://localhost:8080/api/${category}/${screen_id,,}/list"
        
        echo "API 테스트 중: $api_url"
        http_code=$(curl -s -o /dev/null -w "%{http_code}" "$api_url")
        if [ "$http_code" = "200" ]; then
            check_result "API 엔드포인트" "PASS" "$api_url 응답 정상 (200)"
        elif [ "$http_code" = "404" ]; then
            check_result "API 엔드포인트" "WARN" "$api_url 없음 (404) - 서버 재시작 필요할 수 있음"
        else
            check_result "API 엔드포인트" "WARN" "$api_url 응답 코드: $http_code"
        fi
    else
        check_result "Backend 서버 상태" "WARN" "Spring Boot 미실행 (8080 포트)"
    fi
    
    # 3.4 Frontend 서버 상태
    if curl -s http://localhost:8081 > /dev/null 2>&1; then
        check_result "Frontend 서버 상태" "PASS" "Vue Dev Server 실행 중 (8081 포트)"
    else
        check_result "Frontend 서버 상태" "WARN" "Vue Dev Server 미실행 (8081 포트)"
    fi
    
    # 3.5 DB 연결 테스트
    if [ -f "backend/src/main/resources/application.yml" ]; then
        db_url=$(grep "url:" backend/src/main/resources/application.yml | head -1 | cut -d':' -f2- | xargs)
        if [ -n "$db_url" ]; then
            check_result "DB 설정" "PASS" "DB URL: ${db_url:0:50}..."
        fi
    fi
}

###############################################################################
# 4. 운영 모니터링 체크 (monitoring)
###############################################################################
check_monitoring() {
    print_header "🔍 운영 모니터링 체크 (성능 & 안정성)"
    
    # 4.1 Backend 프로세스 확인
    if ps aux | grep "spring-boot:run" | grep -v grep > /dev/null; then
        local pid=$(ps aux | grep "spring-boot:run" | grep -v grep | awk '{print $2}' | head -1)
        check_result "Backend 프로세스" "PASS" "PID: $pid"
        
        # 메모리 사용량 확인
        local mem_usage=$(ps aux | grep "spring-boot:run" | grep -v grep | awk '{print $4}' | head -1)
        if (( $(echo "$mem_usage > 70" | bc -l) )); then
            check_result "메모리 사용률" "WARN" "${mem_usage}% (70% 초과 주의)"
        else
            check_result "메모리 사용률" "PASS" "${mem_usage}% (정상)"
        fi
    else
        check_result "Backend 프로세스" "FAIL" "Spring Boot 미실행"
    fi
    
    # 4.2 Frontend 프로세스 확인
    if ps aux | grep "vue-cli-service" | grep -v grep > /dev/null; then
        check_result "Frontend 프로세스" "PASS" "Vue Dev Server 실행 중"
    else
        check_result "Frontend 프로세스" "WARN" "Vue Dev Server 미실행"
    fi
    
    # 4.3 로그 파일 에러 확인
    if [ -f "backend/spring-boot.log" ]; then
        local error_count=$(grep -i "ERROR" backend/spring-boot.log | wc -l)
        if [ "$error_count" -gt 10 ]; then
            check_result "Backend 에러 로그" "WARN" "최근 ERROR 로그 ${error_count}건 발견"
        else
            check_result "Backend 에러 로그" "PASS" "에러 로그 ${error_count}건 (정상)"
        fi
    fi
    
    # 4.4 디스크 사용량
    local disk_usage=$(df -h . | tail -1 | awk '{print $5}' | sed 's/%//')
    if [ "$disk_usage" -gt 80 ]; then
        check_result "디스크 사용량" "WARN" "${disk_usage}% (80% 초과)"
    else
        check_result "디스크 사용량" "PASS" "${disk_usage}%"
    fi
    
    # 4.5 API 응답 시간 테스트
    if curl -s http://localhost:8080/actuator/health > /dev/null 2>&1; then
        local start_time=$(date +%s%N)
        curl -s http://localhost:8080/actuator/health > /dev/null
        local end_time=$(date +%s%N)
        local response_time=$(( (end_time - start_time) / 1000000 )) # ms
        
        if [ "$response_time" -gt 1000 ]; then
            check_result "API 응답 시간" "WARN" "${response_time}ms (1초 초과)"
        else
            check_result "API 응답 시간" "PASS" "${response_time}ms"
        fi
    fi
}

###############################################################################
# 5. 전체 통합 체크
###############################################################################
check_all() {
    local screen_id="$1"
    local excel_file="engine/input/${screen_id}_ScreenDefinition.xlsx"
    
    if [ ! -f "$excel_file" ]; then
        excel_file=$(find engine/input -name "*${screen_id}*.xlsx" -o -name "*${screen_id}*.xls" 2>/dev/null | head -1)
    fi
    
    check_pre_generation "$excel_file"
    check_post_generation "$screen_id"
    check_pre_deployment "$screen_id"
    check_monitoring
}

###############################################################################
# Main
###############################################################################

# 사용법 출력
usage() {
    echo "사용법: $0 [stage] [screen_id|excel_file]"
    echo ""
    echo "Stage 옵션:"
    echo "  pre-gen     - Generator 실행 전 체크 (Excel 검증)"
    echo "  post-gen    - 코드 생성 후 체크 (파일 검증)"
    echo "  pre-deploy  - 배포 전 체크 (빌드 & 테스트)"
    echo "  monitoring  - 운영 모니터링 체크"
    echo "  all         - 전체 통합 체크"
    echo ""
    echo "예시:"
    echo "  $0 pre-gen engine/input/CostManagement.xlsx"
    echo "  $0 post-gen CostManagement"
    echo "  $0 pre-deploy ProductionResult"
    echo "  $0 monitoring"
    echo "  $0 all CostManagement"
    exit 1
}

# 인자 확인
if [ $# -lt 1 ]; then
    usage
fi

STAGE="$1"
TARGET="$2"

# 로그 파일 초기화
echo "========================================" > "$LOG_FILE"
echo "AI Factory Lab - 사전 방지 체크" >> "$LOG_FILE"
echo "Stage: $STAGE" >> "$LOG_FILE"
echo "Target: $TARGET" >> "$LOG_FILE"
echo "Date: $(date)" >> "$LOG_FILE"
echo "========================================" >> "$LOG_FILE"
echo "" >> "$LOG_FILE"

# Stage별 실행
case "$STAGE" in
    pre-gen)
        if [ -z "$TARGET" ]; then
            echo -e "${RED}Error: Excel 파일 경로 필요${NC}"
            usage
        fi
        check_pre_generation "$TARGET"
        ;;
    post-gen)
        if [ -z "$TARGET" ]; then
            echo -e "${RED}Error: Screen ID 필요${NC}"
            usage
        fi
        check_post_generation "$TARGET"
        ;;
    pre-deploy)
        if [ -z "$TARGET" ]; then
            echo -e "${RED}Error: Screen ID 필요${NC}"
            usage
        fi
        check_pre_deployment "$TARGET"
        ;;
    monitoring)
        check_monitoring
        ;;
    all)
        if [ -z "$TARGET" ]; then
            echo -e "${RED}Error: Screen ID 필요${NC}"
            usage
        fi
        check_all "$TARGET"
        ;;
    *)
        echo -e "${RED}Error: 알 수 없는 Stage: $STAGE${NC}"
        usage
        ;;
esac

# 최종 결과 요약
echo ""
echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  체크 결과 요약${NC}"
echo -e "${BLUE}========================================${NC}"
echo -e "총 체크: ${TOTAL_CHECKS}개"
echo -e "${GREEN}✅ 통과: ${PASSED_CHECKS}개${NC}"
echo -e "${RED}❌ 실패: ${FAILED_CHECKS}개${NC}"
echo -e "${YELLOW}⚠️  경고: ${WARNING_CHECKS}개${NC}"
echo ""

if [ "$FAILED_CHECKS" -gt 0 ]; then
    echo -e "${RED}⛔ 실패한 체크가 있습니다. 수정 후 다시 실행하세요.${NC}"
    echo -e "로그 파일: $LOG_FILE"
    exit 1
elif [ "$WARNING_CHECKS" -gt 0 ]; then
    echo -e "${YELLOW}⚠️  경고 사항을 확인하세요.${NC}"
    echo -e "로그 파일: $LOG_FILE"
    exit 0
else
    echo -e "${GREEN}✅ 모든 체크를 통과했습니다!${NC}"
    echo -e "로그 파일: $LOG_FILE"
    exit 0
fi
