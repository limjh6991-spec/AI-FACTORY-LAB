# 🏭 Vertical AI Factory Roadmap (Ver 2.0)

**Project:** AI-Based Cost System Development Platform  
**Architecture:** Schema-Driven Development (SDD)  
**Core Tech:** Vue 3 + Composition API (Frontend), Spring Boot (Backend), Python (AI Generator), Google Gemini 2.5 Flash

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
* Spring Boot 3.x
* MyBatis / JPA
* MySQL / Oracle

**AI Generator:**
* Python 3.10+
* Google Gemini 2.5 Flash API
* Jinja2 (Template Engine)

---

### 📐 System Flow

### [Input]
* **Source:** PI 문서 (Text/Excel), 테이블 정의서
* **Engine:** `generator.py` (Python + Gemini API)

### [Output: The Schema (Single Source of Truth)]
* AI는 오직 **`screen_schema.json`** 하나만 생성한다.
* 이 JSON이 프론트와 백엔드의 설계도가 된다.

### [System Runtime]
1.  **Frontend (Universal Viewer):** `StandardPage.vue`가 JSON을 읽어 화면(검색창, 그리드)을 동적으로 그림.
2.  **Backend (Code Generator):** JSON을 분석하여 `Controller`, `Service`, `Mapper.xml`을 자동 생성.

---

## 📅 3. Phased Roadmap

### ✅ Phase 1: 표준 프론트엔드 엔진 구축 (Completed)
> **"화면을 그리는 만능 틀 만들기"**
* [x] **Lab 환경 구성:** `ai-factory-lab` (Vue 3 + Bootstrap 5 + RealGrid + Pinia)
* [x] **기술 스택 최신화:** Vue 3 Composition API, Pinia (상태관리), Vue Router 4
* [ ] **Golden Sample 정의:** `StandardPage.vue` (JSON 기반 동적 렌더링 컴포넌트) 개발.
* [ ] **Schema 구조 확정:** 검색조건, 그리드 컬럼, API 정보를 담는 표준 JSON 포맷 정의.
* [ ] **PoC 테스트:** 수동 작성한 JSON(`TestSchema.json`)으로 화면 구동 확인.

### 🚧 Phase 2: AI 스키마 생성기 개발 (Current Focus)
> **"PI 문서를 JSON으로 바꾸는 두뇌 만들기"**
* [ ] **Prompt Engineering:** PI 텍스트를 분석해 `StandardPage.vue`가 이해할 수 있는 완벽한 JSON을 뽑아내는 프롬프트 설계.
* [ ] **Python Generator (`generator.py`):**
    * Gemini API 연동 (`gemini-2.5-flash`).
    * JSON 파싱 및 유효성 검증 (Validation).
    * 결과물 저장: `src/views/{ScreenID}/{ScreenID}.json`
* [ ] **검증:** 실제 원가 PI 문서를 넣었을 때, 수정 없이 화면이 뜨는지 테스트.

### ⏳ Phase 3: 백엔드 코드 생성 연동 (Next Step)
> **"JSON 하나로 백엔드까지 한 번에"**
* [ ] **Backend 템플릿 고도화:**
    * `Template_Controller.java`: JSON의 API 경로(`api.search`)와 매핑.
    * `Template_Mapper.xml`: JSON의 `gridColumns` 정보를 이용해 `SELECT` 쿼리 자동 생성.
* [ ] **Generator 확장:** Python 스크립트가 JSON 생성 후, Jinja2를 돌려 Java/XML 파일까지 생성하도록 업그레이드.
* [ ] **서버 연동 테스트:** 생성된 화면에서 [조회] 버튼 클릭 시 실제 DB 데이터 조회 성공 확인.

### 🔮 Phase 4: 개발자 포털 & 고도화 (Future)
> **"누구나 쉽게 쓰는 공장 만들기"**
* [ ] **Dev Portal UI:** 웹 브라우저에서 PI 입력 -> 생성 -> 미리보기(Preview) 가능한 관리자 화면 구축.
* [ ] **Reverse Engineering:** 기존 레거시 소스(Java/XML)를 읽어서 역으로 JSON 스키마를 추출하는 기능.
* [ ] **Dynamic Common Code:** 공통코드 API와 연동하여 Select Box 옵션을 실시간으로 가져오는 기능 추가.

---

## 📝 4. Action Items (To-Do List)

1.  **[Python]** `prompts/schema_prompt.md` 작성 (Phase 2 핵심).
    * *내용:* "PI를 읽고 `StandardPage`용 JSON만 뱉어라."
2.  **[Python]** `generator.py` 로직 수정.
    * *변경:* Vue 파일을 생성하는 게 아니라, JSON 파일을 생성하도록 변경.
3.  **[Test]** 생성된 JSON을 `src/views/`에 넣고 화면 확인.

---