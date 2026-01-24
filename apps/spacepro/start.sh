#!/bin/bash
# SpacePro Docker 빌드 및 서버 실행 스크립트
# Usage: ./start.sh [command]
#   ./start.sh          - 기본 시작
#   ./start.sh build    - 빌드 후 시작
#   ./start.sh rebuild  - 전체 재빌드 (캐시 없이)
#   ./start.sh stop     - 서버 중지
#   ./start.sh logs     - 로그 확인

set -e

SCRIPT_DIR=$(dirname "$(readlink -f "$0")")
cd "$SCRIPT_DIR"

case "$1" in
  "build")
    echo "🔨 빌드 후 시작..."
    docker compose up -d --build
    ;;
  "rebuild")
    echo "🔄 전체 재빌드 (캐시 없이)..."
    docker compose down
    docker compose build --no-cache
    docker compose up -d
    ;;
  "stop")
    echo "🛑 서버 중지..."
    docker compose down
    exit 0
    ;;
  "logs")
    echo "📋 로그 확인..."
    docker compose logs -f
    exit 0
    ;;
  "backend")
    echo "🔨 Backend 재빌드..."
    docker compose up -d --build backend
    ;;
  "frontend")
    echo "🔨 Frontend 재빌드..."
    docker compose up -d --build frontend
    ;;
  *)
    echo "🚀 서버 시작..."
    docker compose up -d
    ;;
esac

# 상태 확인
sleep 3
echo ""
echo "=== 서비스 상태 ==="
docker compose ps

echo ""
echo "=== 접속 정보 ==="
echo "📱 Frontend: http://localhost:3002"
echo "⚙️  Backend:  http://localhost:8001"
echo "🗄️  Database: localhost:5433"
