#!/bin/bash
# API 경로 검증 스크립트
# 모든 Controller가 /api prefix를 포함하는지 확인

echo "🔍 API 경로 검증 중..."

BACKEND_DIR="/home/roarm_m3/ai-factory-lab/backend/src/main/java"

# /api prefix 없는 @RequestMapping 찾기
INVALID=$(grep -r "@RequestMapping" "$BACKEND_DIR" \
  --include="*Controller.java" \
  | grep -v "/api/" \
  | grep "@RequestMapping" \
  | grep -v "import")

if [ -n "$INVALID" ]; then
  echo "❌ /api prefix 누락된 Controller 발견!"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "$INVALID"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo ""
  echo "🔧 수정 방법:"
  echo "   @RequestMapping(\"/category\") → @RequestMapping(\"/api/category\")"
  echo ""
  exit 1
else
  echo "✅ 모든 Controller가 /api prefix를 포함하고 있습니다!"
  
  # 통계 출력
  TOTAL=$(grep -r "@RequestMapping" "$BACKEND_DIR" \
    --include="*Controller.java" \
    | grep "@RequestMapping" \
    | grep -v "import" \
    | wc -l)
  
  echo "📊 검증 완료: ${TOTAL}개 Controller 확인"
  exit 0
fi
