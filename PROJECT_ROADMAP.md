# 🏭 Vertical AI Factory Roadmap (Ver 2.0)

**Project:** AI-Based Cost System Development Platform  
**Architecture:** Schema-Driven Development (SDD)  
**Core Tech:** Vue 3 + Composition API (Frontend), Spring Boot (Backend), Python (AI Generator), Google Gemini 2.5 Flash  
**Last Updated:** 2025년 11월 29일

---

## 🎯 1. Vision & Goal

* **Vision:** "Specification is the Code" (기획서가 곧 시스템이 된다)
* **Goal:**
    1.  **Frontend Zero-Code:** 화면(.vue)을 코딩하지 않고, **JSON 스키마**만으로 100% 렌더링하는 만능 엔진 구축.
    2.  **Backend Auto-Gen:** 동일한 JSON 스키마를 기반으로 **Java/SQL** 코드를 자동 생성하여 정합성 보장.
    3.  **Process Innovation:** PI 문서를 입력하면 1분 안에 실행 가능한 화면과 API가 생성되는 파이프라인 완성.

---

## 🏗️ 2. Architecture Overview

### 🛠️ Tech Stack (2025 Modern Standard)

**Frontend:**
* **Core:** Vue 3.2+ (Composition API)
* **Router:** Vue Router 4
* **State:** Pinia (Vue 3 공식 상태관리)
* **UI:** Bootstrap 5 (Native CSS Classes - AI 친화적)
* **Grid:** RealGrid 2.9+ (Vue 3 완벽 지원)
* **HTTP:** Axios
* **Style:** Sass/SCSS

**Backend (예정):**
* Spring Boot 3.2.0 ✅ (구축 완료)
* MyBatis 3.0.3 ✅
* MS SQL Server ✅ (연동 완료)
* Java 21 ✅

**AI Generator:**
* Python 3.10+ ✅
* Google Gemini 2.5 Flash API ✅ (연동 완료)
* FastAPI 0.122.0 ✅ (REST API 서버)
* 가상환경 기반 실행 ✅

---

### 📐 System Flow

### [Input]
* **Source:** PI 문서 (Text/Excel), 테이블 정의서
* **Engine:** `generator.py` (Python + Gemini API)
* **API:** FastAPI 서버 (`engine/server.py`) - 웹 인터페이스 제공

### [Output: Multi-File Code Generation]
* AI는 **5개의 파일**을 자동 생성한다:
  1. `{ScreenID}.json` - 화면 스키마 정의
  2. `{ScreenID}.vue` - Vue 컴포넌트
  3. `router_config.js` - Vue Router 설정
  4. `{ScreenID}Controller.java` - Spring Boot Controller
  5. `{ScreenID}Mapper.xml` - MyBatis Mapper
* 생성된 파일은 `engine/output/{ScreenID}/` 폴더에 저장됨

### [System Runtime]
1.  **Frontend (Universal Viewer):** `StandardPage.vue`가 JSON을 읽어 화면(검색창, 그리드)을 동적으로 그림.
2.  **Backend (Code Generator):** JSON을 분석하여 `Controller`, `Service`, `Mapper.xml`을 자동 생성.
3.  **Menu System:** DB 기반 동적 메뉴 시스템으로 화면 접근 관리

---

## 📅 3. Phased Roadmap

### ✅ Phase 1: 표준 프론트엔드 엔진 구축 (Completed - 2025.11.29)
> **"화면을 그리는 만능 틀 만들기"**
* [x] **Lab 환경 구성:** `ai-factory-lab` (Vue 3 + Bootstrap 5 + RealGrid + Pinia)
* [x] **기술 스택 최신화:** Vue 3 Composition API, Pinia (상태관리), Vue Router 4
* [x] **레이아웃 시스템:** MainLayout (TopMenu, Sidebar, Breadcrumb) 구축
* [x] **DB 기반 동적 메뉴:** `new_doi_sys_menu` 테이블 연동, 트리 구조 렌더링
* [x] **메뉴 관리 CRUD:** 메뉴 추가/수정/삭제 기능 완성
* [x] **Backend API 연동:** Spring Boot + MyBatis + MS SQL Server 통합
* [x] **CORS 설정:** Frontend-Backend 간 통신 설정 완료
* [x] **초기 메뉴 데이터:** 8개 메뉴 구조 생성 (대시보드, 원가관리, 관리자)

**주요 성과:**
- Frontend: http://localhost:8081 (정상 작동)
- Backend: http://localhost:8080/api (정상 작동)
- Git 커밋: `1d7bb0b` (DB 기반 동적 메뉴 시스템 완성)

### ✅ Phase 2: AI 스키마 생성기 개발 (Completed - 2025.11.29)
> **"PI 문서를 코드로 바꾸는 두뇌 만들기"**
* [x] **Prompt Engineering:** PI 텍스트를 분석해 5개 파일을 생성하는 프롬프트 설계 완료
* [x] **Python Generator (`generator.py`):**
    * Gemini API 연동 완료 (`gemini-2.5-flash`)
    * 5개 파일 자동 생성 (JSON, Vue, Router, Controller, Mapper)
    * 파일 저장 기능 구현: `engine/output/{ScreenID}/`
* [x] **FastAPI 서버 구축:**
    * REST API 엔드포인트: `POST /generate`
    * 웹 브라우저에서 PI 입력 가능
    * API 문서: http://localhost:8000/docs
* [x] **가상환경 설정:** API 키 보안 관리 체계 확립
* [x] **검증 완료:** TEST001 화면 생성 성공 (5개 파일 생성 확인)

**주요 성과:**
- AI Engine: http://localhost:8000 (정상 작동)
- 테스트 생성: `engine/output/TEST001/` (5개 파일)
- API 키 관리: `.env` 파일 + 진단 도구 (`scripts/verify_key.py`)
- Git 커밋: `48b8d21` (FastAPI 가상환경 문제 해결)

### ✅ Phase 3: StandardPage 동적 렌더링 시스템 구축 (Completed - 2025.11.29)
> **"JSON 스키마 기반 범용 화면 엔진 완성"**
* [x] **StandardPage.vue 구현:**
    * JSON 스키마를 읽어 검색 조건, 그리드를 자동 생성
    * Props 기반 RealGrid 통합 (Options API)
    * 동적 필드 매핑 (스네이크 → 카멜 케이스 자동 변환)
* [x] **실제 화면 구현 (COST001):**
    * 부서별 월별 원가 조회 화면 완성
    * JSON 스키마: `frontend/public/schemas/COST001.json`
    * Backend API: `COST001Controller`, `COST001Service`, `COST001Mapper`
    * 테스트 데이터: `new_doi_cost_monthly_dept_cost` 테이블 (12건)
* [x] **RealGrid 완벽 통합:**
    * CSS 파일 설정 (`realgrid-style.css`, `realgrid-sky-blue.css`)
    * 컬럼 너비 비율 자동 조정 (`fillWidth` 설정)
    * 데이터 바인딩 및 watch 기반 자동 갱신
* [x] **UI/UX 최적화:**
    * 컴팩트 인라인 폼 (검색 조건 한 줄 배치)
    * 제목 폰트 축소, 불필요한 텍스트 제거
    * 엑셀 다운로드 버튼 검색 영역으로 이동
* [x] **범용 데이터 변환:**
    * `snakeToCamel()` 함수로 어떤 API든 자동 처리
    * 복잡한 그리드도 코드 수정 없이 작동
* [x] **Backend 설정:**
    * MyBatis `map-underscore-to-camel-case: true` 설정
    * CORS 설정 (포트 8081 허용)
    * Context-path: `/api`

**주요 성과:**
- 실제 동작하는 화면: http://localhost:8081/cost/cost001 ✅
- 12건 데이터 조회 및 그리드 표시 정상 작동 ✅
- JSON 스키마만으로 100% 화면 렌더링 성공 ✅
- Git 커밋: StandardPage 동적 렌더링 완성

**생성된 주요 파일:**
- `frontend/src/views/StandardPage.vue` (범용 동적 페이지)
- `frontend/public/schemas/COST001.json` (화면 스키마)
- `backend/.../COST001Controller.java`
- `backend/.../COST001Service.java`
- `backend/.../COST001Mapper.xml`
- `scripts/create_cost_table.py` (테스트 데이터 생성)

### 🚧 Phase 4: 추가 화면 생성 및 엔진 고도화 (Next Focus)
> **"생성 엔진 품질 향상 및 다양한 화면 구현"**
* [ ] **추가 화면 생성:**
    * COST002, COST003 화면 JSON 스키마 작성
    * StandardPage.vue로 자동 렌더링 검증
* [ ] **AI 생성 엔진 개선:**
    * 생성 코드 품질 향상
    * StandardPage 기반 코드 생성 템플릿 개선
* [ ] **프로젝트 통합 자동화:**
    * 생성된 파일 자동 배치 스크립트
    * Git 커밋 자동화
* [ ] **테스트 자동화:**
    * 생성된 화면 자동 테스트
    * API 엔드포인트 자동 검증

**진행 예정 작업:**
- 추가 원가 관련 화면 스키마 작성
- AI 생성 코드 StandardPage 호환성 개선
- 자동 배포 스크립트 작성

### 🔮 Phase 5: 개발자 포털 & 고도화 (Future)
> **"누구나 쉽게 쓰는 공장 만들기"**
* [x] **화면 생성기 UI:** 웹 브라우저에서 PI 입력 가능 (`/admin/screen-generator`)
* [ ] **생성 코드 미리보기:** 생성된 코드를 웹에서 바로 확인
* [ ] **자동 배포:** 생성된 파일을 프로젝트에 자동으로 배치
* [ ] **Reverse Engineering:** 기존 레거시 소스(Java/XML)를 읽어서 역으로 JSON 스키마를 추출하는 기능
* [ ] **Dynamic Common Code:** 공통코드 API와 연동하여 Select Box 옵션을 실시간으로 가져오는 기능 추가
* [ ] **버전 관리:** 생성된 코드의 히스토리 관리
* [ ] **테스트 자동화:** 생성된 코드에 대한 자동 테스트

---

## 📝 4. Action Items (To-Do List)

### 🔥 우선순위 1: 추가 화면 구현 및 검증
1.  **[Schema]** COST002, COST003 JSON 스키마 작성
2.  **[Test]** StandardPage.vue로 자동 렌더링 검증
3.  **[Backend]** 추가 Controller/Service/Mapper 구현
4.  **[DB]** 테스트 데이터 준비
5.  **[Verify]** 실제 화면 동작 테스트

### 🎯 우선순위 2: AI 생성 엔진 개선
1.  **[Template]** StandardPage 호환 코드 생성 템플릿 개선
2.  **[Prompt]** JSON 스키마 생성 품질 향상
3.  **[Integration]** 파일 자동 배치 스크립트 작성
4.  **[Quality]** 생성 코드 검증 자동화

### 📚 우선순위 3: 문서화 및 유지보수
1.  **[Doc]** StandardPage 사용 가이드 작성
2.  **[Example]** 샘플 JSON 스키마 라이브러리 구축
3.  **[Test]** E2E 테스트 추가

---

## 📊 5. Current Status (2025.11.29 - 18:45)

### ✅ 완료된 기능
1. **DB 기반 동적 메뉴 시스템** (Frontend + Backend 연동)
2. **메뉴 관리 CRUD** (추가/수정/삭제)
3. **AI 코드 생성기** (Gemini 2.5 Flash)
4. **파일 자동 저장** (5개 파일: JSON, Vue, Router, Java, Mapper)
5. **StandardPage 동적 렌더링 시스템** ⭐ NEW
6. **실제 동작하는 화면 (COST001)** ⭐ NEW
7. **RealGrid 완벽 통합** ⭐ NEW
8. **범용 데이터 변환 (snakeToCamel)** ⭐ NEW

### 🌐 서비스 상태
- **Frontend**: http://localhost:8081 ✅
- **Backend**: http://localhost:8080/api ✅
- **AI Engine**: http://localhost:8000 ✅
- **Database**: MS SQL Server (172.16.200.204:1433) ✅

### 🎯 최근 구현 완료 (Phase 3)
- ✅ StandardPage.vue 범용 동적 페이지 구현
- ✅ COST001 화면 완성 (부서별 월별 원가 조회)
- ✅ RealGrid CSS 로딩, 컬럼 너비 자동 조정
- ✅ 인라인 폼 UI 최적화 (제목 축소, 검색 조건 한 줄 배치)
- ✅ 엑셀 다운로드 버튼 이동, 초기화 버튼 제거
- ✅ 스네이크↔카멜 케이스 자동 변환 함수
- ✅ 12건 테스트 데이터 생성 및 조회 성공

### 📁 주요 파일
```
frontend/
  src/
    views/
      StandardPage.vue          # ⭐ 범용 동적 페이지 (NEW)
      cost/COST001.vue         # 실제 화면 예시
    stores/menu.js              # 메뉴 상태 관리
    layouts/MainLayout.vue      # 메인 레이아웃
    components/RealGrid.vue     # ⭐ Props 기반 그리드 (개선)
  public/
    schemas/COST001.json        # ⭐ 화면 스키마 (NEW)
    lib/
      realgrid-style.css        # ⭐ RealGrid CSS (NEW)
      realgrid-sky-blue.css     # ⭐ RealGrid 테마 (NEW)
backend/
  src/main/java/com/dowinsys/
    cost/monthly/              # ⭐ COST001 API (NEW)
      COST001Controller.java
      COST001Service.java
      COST001ServiceImpl.java
  src/main/resources/
    mapper/cost/               # ⭐ COST001 Mapper (NEW)
      COST001Mapper.xml
    application.yml            # MyBatis 설정 (map-underscore-to-camel-case)
engine/
  server.py                    # FastAPI 서버
  output/                      # 생성된 코드 저장소
generator/
  generator.py                 # AI 코드 생성 로직
  .env                        # API 키 설정
scripts/
  create_cost_table.py        # ⭐ 테스트 DB 생성 (NEW)
  verify_key.py               # API 키 진단 도구
docs/
  SESSION_SUMMARY_20251129.md # 작업 세션 요약
```

### 🎉 주요 성과
**"Specification is the Code" 실현:**
- JSON 스키마 1개로 완전한 CRUD 화면 자동 생성
- 복잡한 그리드도 코드 수정 없이 작동
- 새 화면 추가 시 JSON만 작성하면 끝!

**기술 혁신:**
- Vue 3 Composition → Options API 전환 (RealGrid 호환)
- Props 기반 그리드 초기화 (부모 의존성 제거)
- 범용 데이터 변환으로 API 독립성 확보

### 🎯 다음 단계
Phase 3: 실제 화면 생성 및 프로젝트 통합 진행 중

---

## 🔗 6. References

- **Repository**: https://github.com/limjh6991-spec/AI-FACTORY-LAB
- **Gemini API**: https://ai.google.dev/gemini-api/docs
- **Vue 3**: https://vuejs.org/
- **Spring Boot**: https://spring.io/projects/spring-boot
- **FastAPI**: https://fastapi.tiangolo.com/

---

**Last Updated:** 2025년 11월 29일  
**Version:** 2.1  
**Status:** Phase 2 완료, Phase 3 진행 중