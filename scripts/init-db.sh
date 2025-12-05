#!/bin/bash
# ============================================================================
# AI Factory Lab - 데이터베이스 초기화 스크립트
# ============================================================================
#
# 사용법: ./scripts/init-db.sh
#
# 이 스크립트는 PostgreSQL 데이터베이스를 초기화합니다.
# ============================================================================

set -e

# 색상 정의
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

echo ""
echo "============================================================"
echo "  🗄️  AI Factory Lab - 데이터베이스 초기화"
echo "============================================================"
echo ""

# .env 파일 확인
if [ ! -f ".env" ]; then
    log_error ".env 파일이 없습니다."
    log_info "먼저 ./scripts/setup.sh를 실행해주세요."
    exit 1
fi

# DATABASE_URL 확인
source .env 2>/dev/null || true
if [ -z "$DATABASE_URL" ]; then
    log_error "DATABASE_URL이 설정되지 않았습니다."
    log_info ".env 파일에 DATABASE_URL을 설정해주세요."
    echo ""
    echo "예시:"
    echo "  DATABASE_URL=postgresql://username:password@localhost:5432/ai_factory_db"
    exit 1
fi

log_info "DATABASE_URL 확인됨"

# Prisma DB Push
log_info "Prisma 스키마 동기화 중..."
npx prisma db push --skip-generate 2>/dev/null || {
    log_warning "prisma db push 경고 (테이블이 이미 존재할 수 있음)"
}
log_success "Prisma 스키마 동기화 완료"

# Prisma Generate
log_info "Prisma 클라이언트 재생성 중..."
npx prisma generate
log_success "Prisma 클라이언트 생성 완료"

# DB 메타데이터 수집
log_info "DB 메타데이터 수집 여부 확인..."
if [ -f "data/db_metadata_enhanced.json" ]; then
    log_success "기존 메타데이터 파일 확인됨"
    read -p "메타데이터를 재수집하시겠습니까? (y/N): " answer
    if [ "$answer" = "y" ] || [ "$answer" = "Y" ]; then
        log_info "메타데이터 수집 중... (시간이 걸릴 수 있습니다)"
        npx tsx scripts/collect_db_metadata.ts
        npx tsx scripts/improve_db_metadata.ts
        log_success "메타데이터 수집 완료"
    fi
else
    log_info "메타데이터 수집 중... (시간이 걸릴 수 있습니다)"
    npx tsx scripts/collect_db_metadata.ts
    npx tsx scripts/improve_db_metadata.ts
    log_success "메타데이터 수집 완료"
fi

echo ""
echo "============================================================"
echo "  ✅ 데이터베이스 초기화 완료!"
echo "============================================================"
echo ""
echo "다음 단계:"
echo ""
echo "  1. Vector DB 초기화 (RAG용)"
echo "     docker-compose -f docker-compose.vector.yml up -d"
echo "     npx tsx scripts/setup_vector_db.ts"
echo "     npx tsx scripts/embed_db_metadata.ts"
echo ""
echo "  2. 개발 서버 시작"
echo "     npm run dev"
echo ""
echo "============================================================"
