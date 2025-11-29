# AI Factory Lab - 작업 세션 요약
**날짜**: 2025년 11월 29일

---

## 📋 완료된 작업

### 1. DB 기반 동적 메뉴 시스템 구축 ✅
- **문제**: 메뉴가 하드코딩되어 있어 DB 데이터를 사용하지 않음
- **해결**:
  - `frontend/src/stores/menu.js`: 하드코딩된 menuItems/adminMenuItems 제거, DB API 연동
  - `frontend/src/layouts/MainLayout.vue`: onMounted에서 fetchMenuList() 호출
  - `frontend/src/layouts/components/SidebarItem.vue`: DB 필드명 지원 (menuNm, iconCls)
  - DB 초기 데이터: 8개 메뉴 삽입 (M001~M003-02)

### 2. 메뉴 관리 CRUD 기능 수정 ✅
- **문제**: 메뉴 추가/수정이 동작하지 않음
- **해결**:
  - `frontend/src/views/admin/MenuGenerator.vue`: isEditMode 로직 수정
  - `backend/src/main/resources/mapper/system/menu/SystemMenuMapper.xml`: 파라미터 매핑 수정 (camelCase → snake_case)
  - `backend/src/main/java/com/dowinsys/system/menu/service/SystemMenuServiceImpl.java`: 파라미터 키 수정

### 3. CORS 설정 확장 ✅
- `backend/src/main/java/com/dowinsys/common/config/CorsConfig.java`
- 포트 8082, 8083 추가 (localhost 및 172.30.1.54)

### 4. Vue Router 경고 수정 ✅
- `frontend/src/layouts/MainLayout.vue`
- `<router-view v-slot="{ Component }">` 패턴으로 변경

### 5. Git 커밋 완료 ✅
- **커밋 ID**: 1d7bb0b
- **메시지**: "feat: DB 기반 동적 메뉴 시스템 완성"
- **리포지토리**: limjh6991-spec/AI-FACTORY-LAB (main)

### 6. 코드 생성기 파일 저장 기능 추가 ✅
- **파일**: `generator/generator.py`
- **변경 사항**:
  - 생성된 코드를 `engine/output/{screenId}/` 폴더에 저장
  - 5개 파일 생성: JSON, Vue, router, Java Controller, Mapper XML
  - 하위 디렉터리: `java/`, `mapper/`

### 7. Gemini API 키 관리 ✅
- **히스토리**:
  1. 초기 키: `AIzaSyDaMbGNIy5KDgMn4xfir9kL9yryUQpmqjk` → GitHub 노출로 차단
  2. 2차 키: `AIzaSyCY63Fue-Z4bXQzukKSspxIj_FBQf3dwD4` → 만료
  3. **현재 키**: `AIzaSyArENY9j8r9pl8uVeo7BAG1qjZiFWuyoRE` (유효)
- **위치**: `generator/.env` (.gitignore 포함)
- **프로젝트**: ai-factory (994836649724)

### 8. API 키 진단 도구 생성 ✅
- **파일**: `scripts/verify_key.py`
- **기능**:
  - .env 파일에서 API 키 로드
  - 사용 가능한 모델 목록 확인
  - 실제 콘텐츠 생성 테스트
  - 진단 결과: **정상 작동** (gemini-2.5-flash 모델)

### 9. 환경 문서 업데이트 ✅
- **파일**: `ENVIRONMENT.md`
- API 키 예시 형식으로 변경 (보안)
- 보안 주의사항 추가

### 10. FastAPI 서버 가상환경 문제 해결 ✅
- **문제**: FastAPI 서버가 가상환경 없이 실행되어 API 키 로드 실패
- **해결**:
  - 가상환경 활성화 후 서버 재시작
  - 명령어: `cd generator && source venv/bin/activate && cd ../engine && uvicorn server:app --host 0.0.0.0 --port 8000 --reload`
  - 테스트 결과: **5개 파일 정상 생성** (JSON, Vue, router, Controller, Mapper)

### 11. 화면 생성기 테스트 완료 ✅
- **입력**: 간단한 PI 문서 (테스트 화면)
- **출력**: `engine/output/TEST001/` 폴더에 5개 파일 저장
  - `TEST001.json` (스키마)
  - `TEST001.vue` (Vue 컴포넌트)
  - `router_config.js` (라우터 설정)
  - `java/TEST001Controller.java` (Spring Controller)
  - `mapper/TEST001Mapper.xml` (MyBatis Mapper)

### 12. 전체 시스템 재시작 완료 ✅
- Vue Frontend: 8081 포트 (중복 프로세스 정리 후 재시작)
- Spring Boot Backend: 8080 포트
- FastAPI Engine: 8000 포트 (가상환경에서 실행)

---

## 🚨 현재 미해결 문제

**없음** - 모든 주요 기능 정상 작동 중 ✅

---

## 🔧 기술 스택 요약

### Frontend (Vue)
- **프레임워크**: Vue 3.2.13, Pinia, Vue Router 4
- **포트**: 8081
- **상태**: ✅ 정상 실행

### Backend (Spring Boot)
- **버전**: 3.2.0, Java 21, MyBatis 3.0.3
- **포트**: 8080 (context-path: /api)
- **상태**: ✅ 정상 실행

### AI Engine (FastAPI)
- **버전**: 0.122.0, Python 3, Gemini 2.5 Flash
- **포트**: 8000
- **가상환경**: `/home/roarm_m3/ai-factory-lab/generator/venv`
- **상태**: ✅ 정상 실행 (가상환경에서 실행 필수!)

### Database
- **서버**: MS SQL Server (172.16.200.204:1433)
- **DB**: 도우제조MES시스템TEST
- **테이블**: new_doi_sys_menu (8개 메뉴)

---

## 📁 주요 파일 목록

### 수정된 파일
```
frontend/src/stores/menu.js
frontend/src/layouts/MainLayout.vue
frontend/src/layouts/components/SidebarItem.vue
frontend/src/views/admin/MenuGenerator.vue
frontend/src/views/admin/components/MenuTreeItem.vue
backend/src/main/java/com/dowinsys/common/config/CorsConfig.java
backend/src/main/resources/mapper/system/menu/SystemMenuMapper.xml
backend/src/main/java/com/dowinsys/system/menu/service/SystemMenuServiceImpl.java
generator/generator.py (파일 저장 기능 추가)
generator/.env (API 키 3회 변경)
```

### 생성된 파일
```
scripts/insert_initial_menu.sql (메뉴 초기 데이터)
scripts/verify_key.py (API 키 진단 도구)
ENVIRONMENT.md (환경 설정 문서)
```

---

## 🎯 다음 작업 계획

### 우선순위 1: 실제 화면 생성 및 프로젝트 통합
1. 실제 요구사항(원가 조회 화면 등)으로 코드 생성
2. 생성된 코드를 프로젝트 폴더로 이동
   - Vue: `frontend/src/views/` 
   - Java: `backend/src/main/java/com/dowinsys/`
   - Mapper: `backend/src/main/resources/mapper/`
3. 라우터 설정 추가
4. 빌드 및 동작 테스트

### 우선순위 2: 코드 생성 품질 개선
1. PI 문서 파싱 정확도 향상
2. 생성 코드 템플릿 개선
3. DB 연동 로직 추가
4. RealGrid 구현 코드 추가

### 우선순위 3: Git 커밋
- FastAPI 가상환경 실행 문서화
- 화면 생성기 테스트 결과
- 세션 요약 업데이트
- 커밋 메시지: "fix: FastAPI 서버 가상환경 문제 해결 및 화면 생성 테스트 완료"

---

## 💡 중요 참고사항

### API 키 보안
- `.env` 파일은 `.gitignore`에 포함
- 문서에는 예시 형식만 기록
- GitHub에 노출 시 자동 차단됨

### 서버 실행 명령
```bash
# Vue Frontend (8081)
cd frontend && npm run serve

# Spring Boot (8080)
cd backend && mvn spring-boot:run

# FastAPI (8000) - 반드시 가상환경에서 실행!
cd generator && source venv/bin/activate
cd ../engine && uvicorn server:app --host 0.0.0.0 --port 8000 --reload

# 백그라운드 실행 (로그 파일 저장)
cd generator && source venv/bin/activate
cd ../engine && nohup uvicorn server:app --host 0.0.0.0 --port 8000 --reload > ../logs/fastapi.log 2>&1 &
```

### DB 접속 정보
```
서버: 172.16.200.204:1433
DB: 도우제조MES시스템TEST
계정: TEST_MES_USER / Dowoo1!
```

---

**작성일**: 2025년 11월 29일  
**마지막 업데이트**: 2025년 11월 29일 15:58  
**다음 세션 시작 시 참고**: 모든 시스템 정상 작동 중. 실제 화면 생성 및 프로젝트 통합 작업 시작

---

## ✅ 성공 요약

### 완성된 기능
1. ✅ DB 기반 동적 메뉴 시스템
2. ✅ 메뉴 관리 CRUD
3. ✅ AI 코드 생성기 (Gemini 2.5 Flash)
4. ✅ 파일 자동 저장 (5개 파일: JSON, Vue, Router, Java, Mapper)
5. ✅ 전체 시스템 통합 (Vue + Spring Boot + FastAPI)

### 현재 상태
- **Frontend**: http://localhost:8081 (Vue 3)
- **Backend**: http://localhost:8080/api (Spring Boot)
- **AI Engine**: http://localhost:8000 (FastAPI + Gemini)
- **Database**: MS SQL Server (8개 메뉴 데이터)

### 주요 성과
- Gemini API 키 관리 체계 확립
- 가상환경 기반 FastAPI 실행 확립
- 코드 생성기 파일 저장 기능 구현
- 전체 시스템 안정화 완료
