#!/bin/bash
# =====================================================
# SpacePro Docker 빌드 및 실행 스크립트
# =====================================================

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# 색상 정의
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${GREEN}[SpacePro]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[Warning]${NC} $1"
}

print_error() {
    echo -e "${RED}[Error]${NC} $1"
}

# .env 파일 확인
if [ ! -f .env ]; then
    print_warning ".env 파일이 없습니다. .env.docker를 복사합니다."
    cp .env.docker .env
fi

case "$1" in
    build)
        print_status "Docker 이미지 빌드 중..."
        docker compose build
        print_status "빌드 완료!"
        ;;
    up)
        print_status "서비스 시작 중..."
        docker compose up -d
        print_status "서비스가 시작되었습니다."
        echo ""
        echo "  Frontend: http://localhost:3001"
        echo "  Backend:  http://localhost:8000"
        echo "  API Docs: http://localhost:8000/docs"
        ;;
    down)
        print_status "서비스 중지 중..."
        docker compose down
        print_status "서비스가 중지되었습니다."
        ;;
    logs)
        docker compose logs -f ${2:-}
        ;;
    restart)
        print_status "서비스 재시작 중..."
        docker compose restart ${2:-}
        ;;
    clean)
        print_warning "모든 컨테이너, 볼륨, 이미지를 삭제합니다."
        read -p "계속하시겠습니까? (y/N) " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            docker compose down -v --rmi all
            print_status "정리 완료!"
        fi
        ;;
    save)
        print_status "오프라인 배포용 이미지 저장 중..."
        mkdir -p ./docker-images
        docker save spacepro-frontend:latest | gzip > ./docker-images/spacepro-frontend.tar.gz
        docker save spacepro-backend:latest | gzip > ./docker-images/spacepro-backend.tar.gz
        docker save postgres:15-alpine | gzip > ./docker-images/postgres-15-alpine.tar.gz
        print_status "이미지가 ./docker-images/ 에 저장되었습니다."
        print_status "폐쇄망 전송 후 'docker load' 명령으로 로드하세요."
        ;;
    *)
        echo "SpacePro Docker 관리 스크립트"
        echo ""
        echo "사용법: $0 {command}"
        echo ""
        echo "Commands:"
        echo "  build    - Docker 이미지 빌드"
        echo "  up       - 서비스 시작 (백그라운드)"
        echo "  down     - 서비스 중지"
        echo "  logs     - 로그 확인 (예: $0 logs backend)"
        echo "  restart  - 서비스 재시작"
        echo "  clean    - 모든 리소스 삭제"
        echo "  save     - 폐쇄망 배포용 이미지 저장"
        ;;
esac
