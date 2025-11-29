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

### 🚧 Phase 3: 실제 화면 생성 및 프로젝트 통합 (Current Focus)
> **"생성된 코드를 실제 프로젝트에 적용하기"**
* [ ] **실제 화면 생성:**
    * 원가 조회 화면 (COST001, COST002) PI 작성
    * AI 생성기로 코드 생성
* [ ] **프로젝트 통합:**
    * 생성된 Vue 파일을 `frontend/src/views/` 이동
    * 생성된 Java 파일을 `backend/src/main/java/` 이동
    * 생성된 Mapper를 `backend/src/main/resources/mapper/` 이동
* [ ] **라우터 설정:** Vue Router에 생성된 화면 경로 추가
* [ ] **DB 연동 테스트:** 실제 데이터 조회 확인
* [ ] **StandardPage.vue 개선:** JSON 기반 동적 렌더링 컴포넌트 고도화

**진행 예정 작업:**
- 실제 원가 관련 PI 문서 작성
- 생성 코드 품질 검증 및 개선
- RealGrid 연동 코드 추가

### 🔮 Phase 4: 개발자 포털 & 고도화 (Future)
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

### 🔥 우선순위 1: 실제 화면 생성 및 통합
1.  **[PI]** 원가 조회 화면 PI 문서 작성 (COST001, COST002)
2.  **[Test]** 화면 생성기로 코드 생성 및 품질 확인
3.  **[Integration]** 생성된 코드를 프로젝트 폴더로 이동
4.  **[Router]** Vue Router 설정 추가
5.  **[Verify]** 실제 화면 동작 테스트

### 🎯 우선순위 2: 코드 생성 품질 개선
1.  **[Prompt]** PI 파싱 정확도 향상
2.  **[Template]** 생성 코드 템플릿 고도화
3.  **[DB]** 실제 DB 연동 로직 추가
4.  **[Grid]** RealGrid 구현 코드 추가

### 📚 우선순위 3: 문서화 및 유지보수
1.  **[Doc]** 사용자 가이드 작성
2.  **[Example]** 샘플 PI 문서 라이브러리 구축
3.  **[Test]** 단위 테스트 추가

---

## 📊 5. Current Status (2025.11.29)

### ✅ 완료된 기능
1. **DB 기반 동적 메뉴 시스템** (Frontend + Backend 연동)
2. **메뉴 관리 CRUD** (추가/수정/삭제)
3. **AI 코드 생성기** (Gemini 2.5 Flash)
4. **파일 자동 저장** (5개 파일: JSON, Vue, Router, Java, Mapper)
5. **전체 시스템 통합** (Vue + Spring Boot + FastAPI)

### 🌐 서비스 상태
- **Frontend**: http://localhost:8081 ✅
- **Backend**: http://localhost:8080/api ✅
- **AI Engine**: http://localhost:8000 ✅
- **Database**: MS SQL Server (172.16.200.204:1433) ✅

### 📁 주요 파일
```
frontend/
  src/
    stores/menu.js              # 메뉴 상태 관리
    layouts/MainLayout.vue      # 메인 레이아웃
    views/admin/
      MenuGenerator.vue         # 메뉴 관리
      ScreenGenerator.vue       # 화면 생성기
backend/
  src/main/java/com/dowinsys/
    system/menu/               # 메뉴 CRUD
  src/main/resources/
    mapper/system/menu/        # MyBatis Mapper
engine/
  server.py                    # FastAPI 서버
  output/                      # 생성된 코드 저장소
generator/
  generator.py                 # AI 코드 생성 로직
  .env                        # API 키 설정
scripts/
  verify_key.py               # API 키 진단 도구
docs/
  SESSION_SUMMARY_20251129.md # 작업 세션 요약
```

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