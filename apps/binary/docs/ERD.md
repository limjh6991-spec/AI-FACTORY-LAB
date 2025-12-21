# Binary Soft 데이터베이스 ERD

## 기준정보 테이블 관계도

```mermaid
erDiagram
    %% 조직/인력
    bi_dept_mst {
        int dept_id PK
        string dept_code UK
        string dept_name
        int parent_id FK
    }
    
    bi_role_mst {
        int role_id PK
        string role_code UK
        string role_name
    }
    
    bi_emp_mst {
        int emp_id PK
        string emp_code UK
        string emp_name
        int dept_id FK
        string email
        string phone
    }
    
    %% 고객
    bi_client_mst {
        int client_id PK
        string client_code UK
        string client_name
        string industry
        string contact_name
        string contact_position
        string contact_phone
        string contact_email
    }
    
    %% 프로젝트 코드 테이블
    bi_project_type {
        int type_id PK
        string type_code UK
        string type_name
    }
    
    bi_project_phase {
        int phase_id PK
        string phase_code UK
        string phase_name
    }
    
    bi_project_status {
        int status_id PK
        string status_code UK
        string status_name
        string color
    }
    
    bi_priority_mst {
        int priority_id PK
        string priority_code UK
        string priority_name
        int priority_level
    }
    
    %% 프로젝트 마스터/정보
    bi_project_mst {
        int project_id PK
        string project_code UK
        string project_name
    }
    
    bi_project_info {
        int project_info_id PK
        int project_id FK
        int type_id FK
        int phase_id FK
        int status_id FK
        int priority_id FK
        int client_id FK
        int pm_emp_id FK
        date start_date
        date end_date
        int progress
    }
    
    bi_project_member {
        int project_member_id PK
        int project_id FK
        int emp_id FK
        int role_id FK
        date join_date
        int allocation
    }
    
    %% 문서/산출물
    bi_doc_type {
        int doc_type_id PK
        string doc_type_code UK
        string doc_type_name
    }
    
    bi_deliverable_mst {
        int deliverable_id PK
        string deliverable_code UK
        string deliverable_name
        int phase_id FK
        int doc_type_id FK
    }
    
    %% 시스템
    bi_code_mst {
        string code_group PK
        string code PK
        string code_name
    }
    
    bi_menu_mst {
        int menu_id PK
        string menu_code UK
        string menu_name
        string menu_path
    }
    
    %% 관계
    bi_dept_mst ||--o{ bi_dept_mst : "상위-하위"
    bi_dept_mst ||--o{ bi_emp_mst : "소속"
    
    bi_project_mst ||--|| bi_project_info : "프로젝트정보"
    bi_project_mst ||--o{ bi_project_member : "배정직원"
    
    bi_project_type ||--o{ bi_project_info : "유형"
    bi_project_phase ||--o{ bi_project_info : "단계"
    bi_project_status ||--o{ bi_project_info : "상태"
    bi_priority_mst ||--o{ bi_project_info : "우선순위"
    bi_client_mst ||--o{ bi_project_info : "고객사"
    bi_emp_mst ||--o{ bi_project_info : "PM"
    
    bi_emp_mst ||--o{ bi_project_member : "직원"
    bi_role_mst ||--o{ bi_project_member : "역할"
    
    bi_project_phase ||--o{ bi_deliverable_mst : "단계별산출물"
    bi_doc_type ||--o{ bi_deliverable_mst : "문서유형"
```

## 테이블 목록

| 구분 | 테이블명 | 설명 | 비고 |
|------|---------|------|------|
| 시스템 | `bi_code_mst` | 공통코드 마스터 | 코드그룹+코드 복합PK |
| 시스템 | `bi_menu_mst` | 메뉴 마스터 | 계층구조 |
| 조직 | `bi_dept_mst` | 부서 마스터 | 계층구조 |
| 조직 | `bi_role_mst` | 역할 마스터 | PM, PL, 개발자 등 |
| 조직 | `bi_emp_mst` | 직원 마스터 | 사번, 이름, 부서, 이메일, 전화 |
| 고객 | `bi_client_mst` | 고객사 마스터 | 담당자정보 통합 |
| 프로젝트 | `bi_project_type` | 프로젝트 유형 | SI, SM, 컨설팅 등 |
| 프로젝트 | `bi_project_phase` | 프로젝트 단계 | 수주→종료 |
| 프로젝트 | `bi_project_status` | 프로젝트 상태 | 색상 포함 |
| 프로젝트 | `bi_issue_type` | 이슈 유형 | 버그, 요청 등 |
| 프로젝트 | `bi_priority_mst` | 우선순위 | 긴급~낮음 |
| **프로젝트** | `bi_project_mst` | **프로젝트 마스터** | 프로젝트ID, 코드, 명 |
| **프로젝트** | `bi_project_info` | **프로젝트 정보** | FK 연결 (상세정보) |
| **프로젝트** | `bi_project_member` | **프로젝트 배정 직원** | 프로젝트-직원 다대다 |
| 문서 | `bi_doc_type` | 문서 유형 | - |
| 문서 | `bi_deliverable_mst` | 산출물 마스터 | 단계별 필수 정의 |

## 핵심 관계

```
bi_project_mst (프로젝트 마스터)
    ├── bi_project_info (1:1) - 프로젝트 상세 정보
    │       ├── bi_project_type (유형)
    │       ├── bi_project_phase (현재단계)
    │       ├── bi_project_status (상태)
    │       ├── bi_priority_mst (우선순위)
    │       ├── bi_client_mst (고객사)
    │       └── bi_emp_mst (PM)
    │
    └── bi_project_member (1:N) - 배정 직원
            ├── bi_emp_mst (직원)
            └── bi_role_mst (역할)
```

## 네이밍 규칙

- **스키마**: `binary`
- **테이블 접두어**: `bi_` (Binary의 약자)
- **마스터 테이블 접미어**: `_mst`
- **컬럼명**: snake_case
- **PK**: `{entity}_id` (SERIAL)
- **코드 컬럼**: `{entity}_code` (UK)
