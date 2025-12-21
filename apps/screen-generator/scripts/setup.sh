#!/bin/bash
# ============================================================================
# AI Factory Lab - 설치 스크립트
# ============================================================================
# 
# 사용법: ./scripts/setup.sh
#
# 이 스크립트는 AI Factory Lab 시스템을 설치하고 초기화합니다.
# ============================================================================

set -e

# 색상 정의
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 로그 함수
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
echo "  🏭 AI Factory Lab - 설치 스크립트"
echo "============================================================"
echo ""

# 1. Node.js 버전 확인
log_info "Node.js 버전 확인..."
NODE_VERSION=$(node -v 2>/dev/null | cut -d'v' -f2 | cut -d'.' -f1)
if [ -z "$NODE_VERSION" ]; then
    log_error "Node.js가 설치되지 않았습니다."
    log_info "Node.js 20 이상을 설치해주세요: https://nodejs.org/"
    exit 1
fi

if [ "$NODE_VERSION" -lt 18 ]; then
    log_error "Node.js 버전이 낮습니다. (현재: v$NODE_VERSION)"
    log_info "Node.js 18 이상이 필요합니다."
    exit 1
fi
log_success "Node.js $(node -v) 확인됨"

# 2. npm 패키지 설치
log_info "npm 패키지 설치 중..."
npm install
log_success "npm 패키지 설치 완료"

# 3. 환경 변수 설정
if [ ! -f ".env" ]; then
    log_info ".env 파일 생성 중..."
    cp .env.example .env
    log_warning ".env 파일이 생성되었습니다."
    log_warning "다음 API 키를 설정해주세요:"
    echo ""
    echo "  ANTHROPIC_API_KEY=sk-ant-..."
    echo "  GOOGLE_GENERATIVE_AI_API_KEY=..."
    echo "  DATABASE_URL=postgresql://..."
    echo ""
else
    log_success ".env 파일 확인됨"
fi

# 4. Docker 확인 (Vector DB용)
log_info "Docker 확인 중..."
if command -v docker &> /dev/null; then
    log_success "Docker 설치됨: $(docker --version | cut -d' ' -f3)"
else
    log_warning "Docker가 설치되지 않았습니다."
    log_warning "Vector DB (Chroma)를 사용하려면 Docker가 필요합니다."
fi

# 5. PostgreSQL 확인
log_info "PostgreSQL 연결 확인 중..."
if command -v psql &> /dev/null; then
    log_success "PostgreSQL CLI 설치됨"
else
    log_warning "psql CLI가 설치되지 않았습니다."
fi

# 6. Prisma 초기화
log_info "Prisma 클라이언트 생성 중..."
npx prisma generate
log_success "Prisma 클라이언트 생성 완료"

# 7. TypeScript 컴파일 확인
log_info "TypeScript 설정 확인 중..."
npx tsc --noEmit --skipLibCheck 2>/dev/null || {
    log_warning "TypeScript 컴파일 경고가 있습니다. (무시해도 됨)"
}
log_success "TypeScript 설정 확인 완료"

echo ""
echo "============================================================"
echo "  ✅ 설치 완료!"
echo "============================================================"
echo ""
echo "다음 단계:"
echo ""
echo "  1. .env 파일에 API 키 설정"
echo "     - ANTHROPIC_API_KEY (Claude API)"
echo "     - GOOGLE_GENERATIVE_AI_API_KEY (Gemini API)"
echo "     - DATABASE_URL (PostgreSQL)"
echo ""
echo "  2. DB 초기화 (필요시)"
echo "     ./scripts/init-db.sh"
echo ""
echo "  3. Vector DB 시작 (옵션)"
echo "     docker-compose -f docker-compose.vector.yml up -d"
echo ""
echo "  4. 개발 서버 시작"
echo "     npm run dev"
echo ""
echo "  5. 화면 생성 테스트"
echo "     npx tsx scripts/generate-screen.ts <엑셀파일>"
echo ""
echo "============================================================"
