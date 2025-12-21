#!/bin/bash
# OR-Tools Scheduling Service 시작 스크립트

cd "$(dirname "$0")"

# 가상환경 활성화
source venv/bin/activate

# 서버 시작
echo "🚀 OR-Tools Scheduling Service 시작..."
echo "📍 http://localhost:8000"
echo "📖 API 문서: http://localhost:8000/docs"
echo ""
echo "종료하려면 Ctrl+C"

uvicorn main:app --host 0.0.0.0 --port 8000 --reload
