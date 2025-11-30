# AI Factory Lab - 환경 설정 및 실행 가이드

## 📋 프로젝트 개요

**프로젝트명**: AI Factory Lab  
**목적**: PI 문서 기반 자동 코드 생성 시스템  
**컨셉**: "Specification is the Code" - 기획서가 곧 시스템이 됩니다

---

## 🖥️ 시스템 환경

### 운영체제
- **OS**: Linux (Ubuntu)
- **커널**: 6.14.0-36-generic
- **아키텍처**: amd64 (x86_64)

### 개발 도구
| 도구 | 버전 | 용도 |
|------|------|------|
| **Node.js** | v20.x | Vue 프론트엔드 실행 |
| **npm** | Latest | 패키지 관리 |
| **Java** | 21.0.9 (OpenJDK) | Spring Boot 백엔드 |
| **Maven** | 3.8.7 | Java 빌드 도구 |
| **Python** | 3.x | AI 코드 생성기 |

---

## 🏗️ 기술 스택

### 1️⃣ 프론트엔드

#### Vue 프레임워크
```json
{
  "vue": "3.2.13",
  "vue-router": "4.4.6",
  "@vue/cli-service": "~5.0.8"
}
```

#### 상태 관리 & UI
```json
{
  "pinia": "3.0.4",              // 상태 관리
  "bootstrap": "5.3.8",          // CSS 프레임워크
  "bootstrap-icons": "1.13.1",   // 아이콘
  "axios": "1.13.2",             // HTTP 클라이언트
  "sass": "1.94.2",              // CSS 전처리기
  "sass-loader": "~13.3.3"
}
```

#### 개발 도구
```json
{
  "@babel/core": "~7.26.0",
  "@vue/cli-plugin-babel": "~5.0.8",
  "@vue/cli-plugin-eslint": "~5.0.8",
  "eslint": "~7.32.0",
  "eslint-plugin-vue": "~9.32.0"
}
```

### 2️⃣ 백엔드 (Spring Boot)

#### 프레임워크
```xml
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>3.2.0</version>
</parent>
```

#### 주요 의존성
| 라이브러리 | 버전 | 용도 |
|-----------|------|------|
| **Spring Boot Starter Web** | 3.2.0 | REST API |
| **MyBatis Spring Boot Starter** | 3.0.3 | ORM |
| **MS SQL Server JDBC** | 12.4.2.jre11 | DB 드라이버 |
| **Lombok** | 1.18.30 | 코드 간소화 |
| **Spring Boot DevTools** | 3.2.0 | 개발 편의 |

#### 서버 설정
```yaml
server:
  port: 8080
  servlet:
    context-path: /api

spring:
  datasource:
    driver-class-name: com.microsoft.sqlserver.jdbc.SQLServerDriver
    url: jdbc:sqlserver://172.16.200.204:1433;databaseName=도우제조MES시스템TEST;encrypt=false;trustServerCertificate=true
    username: TEST_MES_USER
    password: Dowoo1!

mybatis:
  mapper-locations: classpath:mapper/**/*.xml
  type-aliases-package: com.dowinsys.**.dto
  configuration:
    map-underscore-to-camel-case: true

logging:
  level:
    com.dowinsys: DEBUG
```

### 3️⃣ 백엔드 (FastAPI - 임시)

#### 프레임워크
```python
{
  "fastapi": "0.122.0",
  "uvicorn[standard]": "0.38.0",
  "python-multipart": "latest"
}
```

#### AI 코드 생성
```python
{
  "google-generativeai": "latest",  # Gemini 2.5 Flash
  "pydantic": "v2"
}
```

### 4️⃣ 데이터베이스

#### MS SQL Server
```
서버: 172.16.200.204:1433
데이터베이스: 도우제조MES시스템TEST
사용자: TEST_MES_USER
비밀번호: Dowoo1!
드라이버: pymssql (Python), mssql-jdbc (Java)
```

#### 주요 테이블
- **new_doi_sys_menu**: 메뉴 관리 테이블
  - menu_id (PK)
  - up_menu_id (상위 메뉴)
  - menu_nm (메뉴명)
  - menu_url (URL)
  - sort_no (정렬순서)
  - use_yn (사용여부)
  - icon_cls (아이콘)
  - reg_dt (등록일시)

---

## 🚀 서버 실행 방법

### 1️⃣ Vue 프론트엔드 서버

#### 설치
```bash
cd /home/roarm_m3/ai-factory-lab/frontend
npm install
```

#### 개발 서버 실행
```bash
npm run serve
```

#### 실행 정보
- **URL**: http://localhost:8080
- **포트**: 8080
- **빌드 도구**: Vue CLI
- **핫 리로드**: 활성화

### 2️⃣ Spring Boot 백엔드 서버

#### 빌드
```bash
cd /home/roarm_m3/ai-factory-lab/backend
mvn clean install -DskipTests
```

#### 실행 방법 1: Maven으로 실행
```bash
mvn spring-boot:run
```

#### 실행 방법 2: 백그라운드 실행 (권장)
```bash
nohup mvn spring-boot:run > spring-boot.log 2>&1 &
```

#### 로그 확인
```bash
tail -f spring-boot.log
```

#### 프로세스 종료
```bash
# PID 확인
ps aux | grep spring-boot:run

# 종료
pkill -f "spring-boot:run"
# 또는
kill -9 [PID]
```

#### 실행 정보
- **Base URL**: http://localhost:8080/api
- **포트**: 8080
- **컨텍스트 경로**: /api
- **웹 서버**: Apache Tomcat 10.1.16
- **API 문서**: Swagger 미설치 (향후 추가 예정)

#### 주요 엔드포인트
```
GET    /api/system/menu/tree      # 메뉴 트리 조회
POST   /api/system/menu           # 메뉴 추가
PUT    /api/system/menu           # 메뉴 수정
DELETE /api/system/menu/{menuId}  # 메뉴 삭제
```

### 3️⃣ FastAPI 서버 (AI 코드 생성)

#### Python 가상환경 활성화 & 실행
```bash
cd /home/roarm_m3/ai-factory-lab/generator
source venv/bin/activate
cd ../engine
python server.py
```

#### 백그라운드 실행
```bash
cd /home/roarm_m3/ai-factory-lab/generator
source venv/bin/activate
cd ../engine
nohup python server.py > fastapi.log 2>&1 &
```

#### 프로세스 종료
```bash
pkill -f "python server.py"
```

#### 실행 정보
- **Base URL**: http://localhost:8000
- **포트**: 8000
- **API 문서**: http://localhost:8000/docs (Swagger UI)
- **ReDoc**: http://localhost:8000/redoc
- **핫 리로드**: 활성화

#### 주요 엔드포인트
```
GET    /                          # 서버 상태 확인
GET    /health                    # 헬스 체크
POST   /generate                  # AI 코드 생성
GET    /api/system/menu/tree      # 메뉴 트리 조회 (임시)
POST   /api/system/menu           # 메뉴 추가 (임시)
PUT    /api/system/menu           # 메뉴 수정 (임시)
DELETE /api/system/menu/{menuId}  # 메뉴 삭제 (임시)
```

---

## 📂 프로젝트 구조

```
ai-factory-lab/
├── frontend/                    # Vue 프론트엔드
│   ├── src/
│   │   ├── App.vue             # 루트 컴포넌트
│   │   ├── main.js             # 엔트리 포인트
│   │   ├── components/         # 공통 컴포넌트
│   │   ├── views/              # 페이지 컴포넌트
│   │   │   ├── Dashboard.vue
│   │   │   ├── MainLayout.vue
│   │   │   └── admin/
│   │   │       ├── ScreenGenerator.vue
│   │   │       └── MenuGenerator.vue
│   │   ├── stores/             # Pinia 스토어
│   │   │   └── menu.js
│   │   └── router/             # 라우터 설정
│   │       └── index.js
│   ├── public/
│   ├── package.json
│   └── vue.config.js
│
├── backend/                     # Spring Boot 백엔드
│   ├── src/main/
│   │   ├── java/com/dowinsys/
│   │   │   ├── AiFactoryBackendApplication.java
│   │   │   ├── common/
│   │   │   │   ├── config/
│   │   │   │   │   └── CorsConfig.java
│   │   │   │   ├── response/
│   │   │   │   │   └── ApiResponse.java
│   │   │   │   └── exception/
│   │   │   │       └── GlobalExceptionHandler.java
│   │   │   └── system/menu/
│   │   │       ├── controller/
│   │   │       │   └── SystemMenuController.java
│   │   │       ├── service/
│   │   │       │   ├── SystemMenuService.java
│   │   │       │   └── SystemMenuServiceImpl.java
│   │   │       ├── mapper/
│   │   │       │   └── SystemMenuMapper.java
│   │   │       └── dto/
│   │   │           └── SystemMenuDto.java
│   │   └── resources/
│   │       ├── application.yml
│   │       └── mapper/system/menu/
│   │           └── SystemMenuMapper.xml
│   ├── pom.xml
│   ├── README.md
│   └── spring-boot.log
│
├── generator/                   # AI 코드 생성기
│   ├── generator.py            # Gemini API 통합
│   ├── .env                    # API 키 설정
│   ├── venv/                   # Python 가상환경
│   └── prompts/
│       └── system_instruction.md
│
├── engine/                      # FastAPI 서버
│   ├── server.py               # 메인 서버
│   ├── input/
│   │   └── menu_pi.txt         # PI 문서
│   └── output/                 # 생성된 코드
│
├── scripts/                     # 유틸리티 스크립트
├── PROJECT_ROADMAP.md          # 프로젝트 로드맵
└── ENVIRONMENT.md              # 이 파일
```

---

## 🔧 개발 환경 설정

### 1️⃣ 필수 설치 항목

```bash
# Node.js & npm
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Java
sudo apt install -y openjdk-21-jdk

# Maven
sudo apt install -y maven

# Python & pip
sudo apt install -y python3 python3-pip python3-venv
```

### 2️⃣ 프로젝트 초기 설정

```bash
# 1. 프로젝트 클론 후 이동
cd /home/roarm_m3/ai-factory-lab

# 2. Vue 프론트엔드 의존성 설치
cd frontend
npm install

# 3. Python 가상환경 설정
cd ../generator
python3 -m venv venv
source venv/bin/activate
pip install fastapi uvicorn[standard] google-generativeai pymssql python-dotenv

# 4. Spring Boot 빌드
cd ../backend
mvn clean install -DskipTests
```

### 3️⃣ 환경 변수 설정

#### .env 파일 (generator/.env)
```bash
GEMINI_API_KEY=your_actual_api_key_here
```

⚠️ **보안 주의사항**:
- `.env` 파일은 `.gitignore`에 포함되어 있어 Git에 커밋되지 않습니다
- API 키가 GitHub에 노출되면 자동으로 차단되므로 절대 공개하지 마세요
- **실제 API 키는 `.env` 파일에만 저장**하고 문서에는 절대 기록하지 마세요
- API 키 발급: https://aistudio.google.com/apikey
- 프로젝트: ai-factory (994836649724)
- 마지막 업데이트: 2025년 11월 29일

---

## 🎯 전체 서버 실행 순서

### 1단계: FastAPI 서버 시작
```bash
cd /home/roarm_m3/ai-factory-lab/generator
source venv/bin/activate
cd ../engine
python server.py &
```

### 2단계: Spring Boot 서버 시작
```bash
cd /home/roarm_m3/ai-factory-lab/backend
nohup mvn spring-boot:run > spring-boot.log 2>&1 &
```

### 3단계: Vue 프론트엔드 서버 시작
```bash
cd /home/roarm_m3/ai-factory-lab/frontend
npm run serve
```

### 서버 확인
```bash
# 프로세스 확인
ps aux | grep -E "(spring-boot|python server|vue-cli-service)"

# 포트 확인
netstat -tlnp | grep -E ":(8000|8080)"

# 서버 응답 확인
curl http://localhost:8000/health           # FastAPI
curl http://localhost:8080/api/system/menu/tree  # Spring Boot
curl http://localhost:8080                  # Vue
```

---

## �️ 데이터베이스 설정 및 실행

### 데이터베이스 테이블 생성

#### 방법 1: Python 스크립트 실행 (권장)
```bash
cd /home/roarm_m3/ai-factory-lab/scripts
python3 setup_demo_db.py
```

#### 실행 결과
```
🔌 DB 연결 중...
✅ DB 연결 성공!

📄 create_demo_tables.sql 실행 중...
  ✅ Batch 3/12 완료
  ✅ Batch 6/12 완료
  ✅ Batch 9/12 완료
✅ 테이블 생성 완료!

📄 insert_demo_data.sql 실행 중...
✅ 데이터 삽입 완료!

📊 데이터 확인:
  • Grid1 - Orders: 8건
  • Grid2 - Employee: 9건
  • Grid3 - Sales: 12건
🎉 모든 작업이 완료되었습니다!
```

#### 방법 2: 개별 Python 스크립트 실행
```bash
cd /home/roarm_m3/ai-factory-lab/scripts

# 메뉴 테이블 생성
python3 create_menu_table.py

# 생산 실적 테이블 생성
python3 create_production_table.py

# 원가 테이블 생성
python3 create_cost_table.py
```

#### 방법 3: SQL 파일 직접 실행
SQL Server Management Studio나 Azure Data Studio를 사용하여 직접 실행:
- `scripts/create_demo_tables.sql` - RealGrid 데모 테이블
- `scripts/insert_demo_data.sql` - RealGrid 샘플 데이터
- `scripts/create_menu_table.sql` - 메뉴 관리 테이블
- `scripts/create_production_table.sql` - 생산 실적 테이블
- `scripts/create_cost_table.sql` - 원가 관리 테이블

### 주요 테이블 목록

| 테이블명 | 용도 | 레코드 수 |
|---------|------|----------|
| **new_doi_demo_orders** | RealGrid Grid1 주문 샘플 | 8건 |
| **new_doi_demo_employee** | RealGrid Grid2 직원 샘플 | 9건 |
| **new_doi_demo_sales** | RealGrid Grid3 매출 샘플 | 12건 |
| **new_doi_sys_menu** | 시스템 메뉴 관리 | 가변 |
| **new_doi_prd_result** | 생산 실적 관리 | 가변 |
| **new_doi_cost_material** | 자재 원가 관리 | 가변 |

### 테이블 확인
```bash
# Python으로 테이블 확인
python3 << EOF
import pymssql
conn = pymssql.connect(
    server='172.16.200.204',
    port=1433,
    user='TEST_MES_USER',
    password='Dowoo1!',
    database='도우제조MES시스템TEST',
    charset='utf8'
)
cursor = conn.cursor()
cursor.execute("SELECT name FROM sys.tables WHERE name LIKE 'new_doi_%' ORDER BY name")
for row in cursor.fetchall():
    print(f"  ✓ {row[0]}")
cursor.close()
conn.close()
EOF
```

### 트러블슈팅

#### pymssql 설치되지 않은 경우
```bash
pip3 install pymssql
```

#### DB 연결 오류
```bash
# 1. 네트워크 연결 확인
ping 172.16.200.204

# 2. 포트 확인
telnet 172.16.200.204 1433

# 3. 방화벽 확인
sudo ufw status
```

#### 테이블이 이미 존재하는 경우
```bash
# 스크립트가 자동으로 DROP IF EXISTS 처리하므로 그냥 다시 실행하면 됨
python3 setup_demo_db.py
```

---

## �📊 포트 할당

| 서비스 | 포트 | URL | 용도 |
|--------|------|-----|------|
| **Vue Frontend** | 8080 | http://localhost:8080 | 사용자 인터페이스 |
| **Spring Boot API** | 8080 | http://localhost:8080/api | REST API (context-path: /api) |
| **FastAPI** | 8000 | http://localhost:8000 | AI 코드 생성 & 임시 메뉴 API |
| **MS SQL Server** | 1433 | 172.16.200.204:1433 | 데이터베이스 |
| **LiveReload** | 35729 | - | Spring DevTools |

⚠️ **주의**: Vue와 Spring Boot가 같은 8080 포트를 사용하므로, Vue에서 API 호출 시 프록시 설정 필요

---

## 🔐 보안 설정

### CORS 설정 (Spring Boot)
```java
// CorsConfig.java
allowedOrigins: http://localhost:8080
allowedMethods: GET, POST, PUT, DELETE, OPTIONS
allowedHeaders: *
allowCredentials: true
```

### 데이터베이스 접근
- 운영 환경에서는 환경 변수로 DB 자격증명 관리 필요
- 현재는 application.yml에 하드코딩 (개발 환경만 사용)

---

## 📝 로그 관리

### Spring Boot
```bash
# 실시간 로그
tail -f /home/roarm_m3/ai-factory-lab/backend/spring-boot.log

# 에러만 필터링
grep -i error spring-boot.log

# 최근 100줄
tail -100 spring-boot.log
```

### FastAPI
```bash
# 콘솔 출력으로 확인
# 또는 nohup으로 실행한 경우
tail -f fastapi.log
```

### Vue
```bash
# 터미널 출력으로 확인
# npm run serve 실행 중인 터미널에서 확인
```

---

## 🐛 트러블슈팅

### 1. 포트 충돌
```bash
# 사용 중인 프로세스 확인
lsof -i :8080
lsof -i :8000

# 프로세스 종료
kill -9 [PID]
```

### 2. Maven 빌드 오류
```bash
# 의존성 재다운로드
mvn clean install -U

# 캐시 삭제
rm -rf ~/.m2/repository/*
mvn clean install
```

### 3. Vue 빌드 오류
```bash
# node_modules 재설치
rm -rf node_modules package-lock.json
npm install
```

### 4. DB 연결 오류
```bash
# SQL Server 연결 테스트
telnet 172.16.200.204 1433

# 방화벽 확인
sudo ufw status
```

---

## 📚 참고 자료

### 공식 문서
- Vue 3: https://vuejs.org/
- Spring Boot: https://spring.io/projects/spring-boot
- FastAPI: https://fastapi.tiangolo.com/
- MyBatis: https://mybatis.org/mybatis-3/
- Gemini API: https://ai.google.dev/

### 내부 문서
- `/backend/README.md` - Spring Boot 백엔드 상세 가이드
- `/PROJECT_ROADMAP.md` - 프로젝트 로드맵
- `/generator/prompts/system_instruction.md` - AI 프롬프트 가이드

---

**문서 작성일**: 2025년 11월 29일  
**마지막 업데이트**: 2025년 11월 29일  
**작성자**: AI Factory Lab Team
