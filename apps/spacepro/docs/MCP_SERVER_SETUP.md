# MCP Server 설정 가이드

> **SpacePro MES/MRP 프로젝트용 MCP 서버 설정**
> 마지막 업데이트: 2024-12-19

---

## 📦 설치된 MCP 서버

| 서버명 | 패키지 | 용도 |
|--------|--------|------|
| **postgres** | `@modelcontextprotocol/server-postgres` | PostgreSQL DB 직접 연결 |
| **filesystem** | `@modelcontextprotocol/server-filesystem` | 프로젝트 파일 탐색/수정 |
| **fetch** | `@modelcontextprotocol/server-fetch` | HTTP 요청 (API 테스트) |

---

## ⚙️ Claude Desktop 설정

### 설정 파일 위치

| OS | 경로 |
|----|------|
| **Linux** | `~/.config/claude/claude_desktop_config.json` |
| **macOS** | `~/Library/Application Support/Claude/claude_desktop_config.json` |
| **Windows** | `%APPDATA%\Claude\claude_desktop_config.json` |

### 설정 내용

아래 JSON을 `claude_desktop_config.json`에 저장하세요:

```json
{
  "mcpServers": {
    "postgres": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-postgres",
        "postgresql://postgres:postgres@localhost:5432/binary?schema=spacepro"
      ]
    },
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/home/roarm_m3/ai-factory-lab/Project/spacepro"
      ]
    },
    "fetch": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-fetch"
      ]
    }
  }
}
```

---

## 🚀 빠른 설정 (Linux)

터미널에서 다음 명령어 실행:

```bash
# 1. 디렉토리 생성
mkdir -p ~/.config/claude

# 2. 설정 파일 생성
cat > ~/.config/claude/claude_desktop_config.json << 'EOF'
{
  "mcpServers": {
    "postgres": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-postgres",
        "postgresql://postgres:postgres@localhost:5432/binary?schema=spacepro"
      ]
    },
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/home/roarm_m3/ai-factory-lab/Project/spacepro"
      ]
    },
    "fetch": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-fetch"
      ]
    }
  }
}
EOF

# 3. 확인
cat ~/.config/claude/claude_desktop_config.json
```

---

## 🔧 각 MCP 서버 활용법

### 1. PostgreSQL MCP (`postgres`)

**주요 기능:**
- 테이블 목록 조회
- 스키마 구조 분석
- SQL 쿼리 실행
- 데이터 검색/조회

**예시 요청:**
- "spacepro 스키마의 모든 테이블 목록 보여줘"
- "tb_item_mst 테이블 구조 확인해줘"
- "품목 마스터에서 PRODUCT 타입 데이터 조회해줘"

### 2. Filesystem MCP (`filesystem`)

**주요 기능:**
- 프로젝트 파일 탐색
- 파일 내용 읽기
- 파일 생성/수정

**예시 요청:**
- "src/app 디렉토리 구조 보여줘"
- "prisma/schema.prisma 파일 내용 확인해줘"

### 3. Fetch MCP (`fetch`)

**주요 기능:**
- HTTP GET/POST 요청
- API 테스트
- 외부 서비스 연동

**예시 요청:**
- "http://localhost:8000/api/scheduling/optimize 엔드포인트 테스트해줘"
- "Google OR-Tools 문서 가져와줘"

---

## ⚠️ 주의사항

1. **Node.js 18+** 필요 (npx 명령어 사용)
2. **PostgreSQL** 서버가 실행 중이어야 함
3. DB 비밀번호가 다르면 `postgres:postgres` 부분 수정
4. Claude Desktop **재시작** 필요

---

## 🔍 문제 해결

### MCP 서버 연결 실패 시

1. Node.js 버전 확인: `node --version` (18+ 필요)
2. PostgreSQL 실행 확인: `pg_isready`
3. 설정 파일 JSON 문법 확인 (쉼표, 따옴표)
4. Claude Desktop 로그 확인

### 데이터베이스 연결 오류

```bash
# PostgreSQL 연결 테스트
psql "postgresql://postgres:postgres@localhost:5432/binary" -c "SET search_path TO spacepro; SELECT table_name FROM information_schema.tables WHERE table_schema = 'spacepro';"
```

---

**작성자**: AI Assistant  
**프로젝트**: SpacePro MES/MRP
