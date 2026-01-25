# 생산계획 화면 현황 및 통합 계획 (Production Screen Status & Consolidation Plan)

> **작성일**: 2026-01-25
> **목적**: 현재 분산되어 있는 생산계획 관련 화면들의 현황을 정리하고, 향후 통합 방향성을 기록함.

## 1. 현재 화면 현황 (AS-IS)

현재 생산계획 및 시뮬레이션 기능이 개발 단계별 목적에 따라 여러 화면으로 분산되어 있습니다.

| 화면 경로 | 기능 설명 | 주요 특징 |
|---|---|------|
| **`/plan/management`** | **경영 현황 대시보드** | - 사업팀별(C01, C02 등) 계약 수, 품목 수, 전체 진행율 요약<br>- 경영진 보고용 뷰 |
| **`/plan/contract-simulation`** | **계약 기반 Gantt** | - 기존 계약 데이터(`sp_contract_info`) 기반<br>- OR-Tools 연동 시뮬레이션 결과 시각화<br>- Y축: 계약/공정 중심 |
| **`/plan/scheduler`** | **자원 중심 Gantt** | - **최신 구현 (2026-01-25)**<br>- Forward Scheduling 엔진 탑재<br>- Y축: 자원(설비) 중심, 사이트별 그룹핑<br>- Bento Grid UI 적용 |
| **`/plan/monthly`** | **월간 생산계획** | - 월 단위 PSI (생산/판매/재고) 계획 수립<br>- 거시적 관점의 계획 |
| **`/master/er-diagram`** | **ER 다이어그램** | - **신규 (2026-01-25)**<br>- 13개 sp_ 테이블 관계 시각화<br>- 카테고리별 색상, 줌 인/아웃 지원 |
| **`/master/data-format`** | **데이터 포맷** | - **신규 (2026-01-25)**<br>- 14개 sp_ 테이블 샘플 데이터 조회<br>- 5개 탭 (Excel 시트 구조) |

## 2. 문제점
- 사용자가 목적에 따라 여러 화면을 오가야 함 (UX 파편화).
- "시뮬레이션"과 "스케줄러"의 역할이 일부 중복되거나 용어가 혼재됨.
- 데이터 소스는 공유하지만 시각화 방식이 제각각임.

## 3. 향후 통합 계획 (TO-BE)

### 3.1 메뉴 구조 재정비 (안)
생산 계획 메뉴를 **계층적 구조**로 통합하여 접근성을 높여야 합니다.

```
생산계획 (Production Planning)
├── 통합 대시보드 (/plan/dashboard)     <- `/plan/management` 기능 흡수
├── 상세 스케줄링 (/plan/scheduling)    <- `/plan/scheduler` (Main 사용)
│   ├── 자원별 보기 (Resource View)
│   └── 계약별 보기 (Contract View)     <- `/plan/contract-simulation` 뷰 통합
└── 월간/주간 계획 (/plan/period)       <- `/plan/monthly`
```

### 3.2 기능 통합
- **`/plan/scheduler`**를 메인 엔진 화면으로 승격.
- 상단 탭이나 토글 버튼을 통해 **"자원 중심 보기"**와 **"계약 중심 보기"**를 전환할 수 있도록 개선.
- OR-Tools(백엔드 최적화)와 Forward Scheduling(프론트엔드 직관성)의 장점을 결합.

## 4. Action Items
- [ ] `/plan/scheduler` 화면에 "계약별 보기" 모드 추가 개발.
- [ ] `/plan/management`의 요약 카드를 스케줄러 상단 대시보드로 이동.
- [ ] 메뉴 구조 변경 및 라우팅 정리.
