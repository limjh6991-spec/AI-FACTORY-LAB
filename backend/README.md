# AI Factory Backend

AI 기반 코드 생성 시스템의 백엔드 API 서버

## 📋 프로젝트 구조

```
backend/
├── pom.xml                           # Maven 빌드 설정
├── src/main/
│   ├── java/com/dowinsys/
│   │   ├── AiFactoryBackendApplication.java  # Spring Boot 메인 클래스
│   │   ├── common/                   # 공통 모듈
│   │   │   ├── config/              # 설정 (CORS, MyBatis)
│   │   │   │   └── CorsConfig.java
│   │   │   ├── response/            # 공통 응답 객체
│   │   │   │   └── ApiResponse.java
│   │   │   └── exception/           # 전역 예외 처리
│   │   │       └── GlobalExceptionHandler.java
│   │   └── system/                  # 시스템 관리 모듈
│   │       └── menu/                # 메뉴 관리
│   │           ├── controller/      # REST API 컨트롤러
│   │           │   └── SystemMenuController.java
│   │           ├── service/         # 비즈니스 로직
│   │           │   ├── SystemMenuService.java
│   │           │   └── SystemMenuServiceImpl.java
│   │           ├── mapper/          # MyBatis Mapper 인터페이스
│   │           │   └── SystemMenuMapper.java
│   │           └── dto/             # 데이터 전송 객체
│   │               └── SystemMenuDto.java
│   └── resources/
│       ├── application.yml          # 애플리케이션 설정
│       └── mapper/system/menu/      # MyBatis SQL 매퍼
│           └── SystemMenuMapper.xml
```

## 🚀 실행 방법

### 1. Maven 의존성 설치
```bash
cd ~/ai-factory-lab/backend
mvn clean install
```

### 2. 애플리케이션 실행
```bash
mvn spring-boot:run
```

또는 IDE에서 `AiFactoryBackendApplication.java` 실행

### 3. 서버 확인
- **API 베이스**: http://localhost:8080/api
- **메뉴 API**: http://localhost:8080/api/system/menu/tree

## 📡 API 엔드포인트

### 메뉴 관리 API
```
GET    /api/system/menu/tree      # 메뉴 트리 조회
POST   /api/system/menu           # 메뉴 추가
PUT    /api/system/menu           # 메뉴 수정
DELETE /api/system/menu/{menuId}  # 메뉴 삭제
```

## 🛠️ 기술 스택

- **Java**: 17
- **Spring Boot**: 3.2.0
- **MyBatis**: 3.0.3
- **Database**: SQL Server
- **Build Tool**: Maven

## 📝 데이터베이스 설정

`application.yml`에서 데이터베이스 연결 정보를 수정하세요:

```yaml
spring:
  datasource:
    url: jdbc:sqlserver://172.16.200.204:1433;databaseName=도우제조MES시스템TEST
    username: TEST_MES_USER
    password: Dowoo1!
```

## 🔧 개발 가이드

### 새로운 모듈 추가 시

1. **패키지 생성** (예: `cost/material`)
   ```
   src/main/java/com/dowinsys/cost/material/
   ├── controller/
   ├── service/
   ├── mapper/
   └── dto/
   ```

2. **Mapper XML 생성**
   ```
   src/main/resources/mapper/cost/material/
   └── MaterialMapper.xml
   ```

3. **표준 구조 준수**
   - Controller: REST API 엔드포인트
   - Service: 비즈니스 로직
   - Mapper: DB 접근 인터페이스
   - DTO: 데이터 전송 객체

## 📦 빌드

```bash
# JAR 파일 생성
mvn clean package

# 생성된 파일
target/ai-factory-backend-1.0.0.jar
```

## 🎯 AI 코드 생성 규칙

AI가 코드를 생성할 때 다음 규칙을 따릅니다:

1. **패키지 구조**: `com.dowinsys.{대분류}.{소분류}.{레이어}`
2. **파일 명명**: `{화면ID}{레이어}.java` (예: `SystemMenuController.java`)
3. **Mapper XML**: `mapper/{대분류}/{소분류}/{화면ID}Mapper.xml`
4. **공통 응답**: `ApiResponse<T>` 사용
5. **예외 처리**: `GlobalExceptionHandler`에서 통합 처리

## 📄 라이센스

MIT License
