# SpacePro MES/MRP 개발 로드맵

> **전략**: 제안서 → 프로토타입 → 실 시스템 (동일 코드베이스)  
> **목표**: 버리는 코드 없이 점진적 구축

---

## 📅 전체 일정 (M ~ M+9)

```
M     M+1   M+2   M+3   M+4   M+5   M+6   M+7   M+8   M+9
├─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┤
│  Phase 1  │     Phase 2     │     Phase 3     │ P4  │
│  제안/착수 │    핵심 개발    │    확장 개발     │안정화│
└───────────┴─────────────────┴─────────────────┴─────┘
```

---

## 🔷 Phase 1: 제안/착수 (M ~ M+1) ✅ 완료

### 목표
- 고객에게 시스템 비전 전달
- 프로젝트 착수 준비 완료

### 산출물 (현재 완료)
| 항목 | 경로 | 상태 |
|------|------|------|
| 킥오프 대시보드 | `/kickoff` | ✅ |
| 현장 실사 체크리스트 | `/kickoff/site-survey` | ✅ |
| 데이터 요청 리스트 | `/kickoff/data-request` | ✅ |
| 인터뷰 가이드 | `/kickoff/interview` | ✅ |
| 미팅 아젠다 | `/kickoff/agenda` | ✅ |
| 산출물 관리 | `/kickoff/deliverables` | ✅ |
| 제안서 대시보드 | `/proposal` | ✅ |
| 01. 제안 개요 | `/proposal/overview` | ✅ |
| 02. 제안 내용 | `/proposal/solution` | ✅ |
| 03. 수행계획 | `/proposal/timeline` | ✅ |
| 04. 시스템 구성 | `/proposal/architecture` | ✅ |

---

## 🔷 Phase 2: 핵심 개발 (M+2 ~ M+5)

### 목표
- 기준정보 마스터 화면 구현
- 생산관리 핵심 기능 개발
- DB 연동 및 실 데이터 처리

### Week 1-2: DB 설정 및 기준정보 마스터

```
┌─────────────────────────────────────────────────────┐
│ 1. PostgreSQL 연동                                   │
│    ├─ Prisma 스키마 정의                              │
│    ├─ 10개 테이블 DDL 실행                            │
│    └─ seed 데이터 구성                                │
├─────────────────────────────────────────────────────┤
│ 2. 기준정보 마스터 화면                               │
│    ├─ /master/item     - 품목 관리 (RealGrid)        │
│    ├─ /master/bom      - BOM 관리 (트리 그리드)       │
│    ├─ /master/process  - 공정 관리                   │
│    ├─ /master/machine  - 설비 관리                   │
│    └─ /master/user     - 작업자 관리                  │
└─────────────────────────────────────────────────────┘
```

### Week 3-4: 생산계획 모듈

```
┌─────────────────────────────────────────────────────┐
│ 3. 생산계획 화면                                      │
│    ├─ /plan/monthly    - 월별 생산계획                │
│    ├─ /plan/weekly     - 주별 생산계획                │
│    ├─ /plan/daily      - 일별 생산계획                │
│    └─ /plan/allocation - 공정/설비 배분               │
├─────────────────────────────────────────────────────┤
│ 4. 자재소요량 계산 (MRP)                              │
│    ├─ BOM Explosion 로직                             │
│    ├─ 자재 수급 현황                                  │
│    └─ 자재 부족 알람                                  │
└─────────────────────────────────────────────────────┘
```

### Week 5-8: 생산관리 모듈

```
┌─────────────────────────────────────────────────────┐
│ 5. 생산실적 관리                                      │
│    ├─ /production/order    - 작업지시 관리            │
│    ├─ /production/tracking - Track In/Out            │
│    ├─ /production/progress - 공정별 진척현황          │
│    └─ /production/result   - 생산실적 집계            │
├─────────────────────────────────────────────────────┤
│ 6. 대시보드 실 데이터 연동                            │
│    ├─ 메인 대시보드 DB 연동                           │
│    ├─ 실시간 KPI 계산                                 │
│    └─ 알람 시스템 (진척율 기반)                        │
└─────────────────────────────────────────────────────┘
```

---

## 🔷 Phase 3: 확장 개발 (M+6 ~ M+8)

### 목표
- 자재/금형 관리 기능 추가
- 분석/리포트 기능 강화
- PDA 지원 (반응형)

### 자재관리 모듈

```
/material/inventory   - 라인内 재고 현황
/material/in-out      - 반입/반출 관리
/material/shortage    - 부족 자재 알람
```

### 금형관리 모듈

```
/mold/location        - 금형 위치 추적
/mold/movement        - 금형 이동 이력
```

### 분석/리포트

```
/report/production    - 생산 분석 리포트
/report/quality       - 품질 현황 리포트
/report/equipment     - 설비 가동률 분석
```

---

## 🔷 Phase 4: 안정화 (M+9)

### 목표
- 통합 테스트 완료
- 사용자 교육
- 운영 전환

### 체크리스트

- [ ] 통합 테스트 시나리오 실행
- [ ] 성능 테스트 (부하 테스트)
- [ ] 보안 점검
- [ ] 사용자 매뉴얼 작성
- [ ] 현업 교육 (3회 이상)
- [ ] 병행 운영 (2주)
- [ ] 최종 안정화 및 인수

---

## 🛠 기술 스택 확정

| 레이어 | 기술 | 비고 |
|--------|------|------|
| Frontend | Next.js 16 + TypeScript | App Router |
| UI Components | RealGrid + Tailwind CSS | 국산 그리드 |
| Charts | Recharts | 오픈소스 |
| Icons | Lucide React | 오픈소스 |
| Backend | Next.js API Routes | 서버리스 |
| Database | PostgreSQL 15 | 오픈소스 |
| ORM | Prisma | Type-safe |
| Auth | NextAuth.js | (추후 추가) |

---

## 📊 주요 마일스톤

| 시점 | 마일스톤 | 검증 방법 |
|------|---------|----------|
| M+1 | 킥오프 완료 | 제안서 대시보드 데모 ✅ |
| M+2 | DB 연동 | 기준정보 CRUD 동작 |
| M+4 | 생산계획 MVP | 일별 계획 등록/조회 |
| M+6 | 생산관리 MVP | Track In/Out 동작 |
| M+8 | 전체 통합 | 전 기능 연동 테스트 |
| M+9 | 안정화 완료 | 운영 전환 |

---

## 📁 프로젝트 구조 (예정)

```
/home/roarm_m3/ai-factory-lab/Project/spacepro/
├── src/
│   ├── app/
│   │   ├── (dashboard)/     # 대시보드 그룹
│   │   │   ├── page.tsx     # 메인 대시보드
│   │   │   ├── projects/
│   │   │   └── dashboard2/
│   │   ├── kickoff/         # 킥오프 키트 ✅
│   │   ├── proposal/        # 제안서 ✅
│   │   ├── master/          # 기준정보 (Phase 2)
│   │   │   ├── item/
│   │   │   ├── bom/
│   │   │   ├── process/
│   │   │   ├── machine/
│   │   │   └── user/
│   │   ├── plan/            # 생산계획 (Phase 2)
│   │   ├── production/      # 생산관리 (Phase 2)
│   │   ├── material/        # 자재관리 (Phase 3)
│   │   ├── mold/            # 금형관리 (Phase 3)
│   │   └── report/          # 분석리포트 (Phase 3)
│   ├── components/
│   ├── lib/
│   │   └── prisma.ts        # DB 클라이언트
│   └── server/
│       └── api/             # API 라우트
├── prisma/
│   └── schema.prisma        # DB 스키마
└── docs/
    ├── erd.md
    ├── table_definition.md
    └── ddl_postgresql.sql
```

---

## 🚀 다음 단계 (즉시 실행 가능)

### Priority 1: DB 연동
```bash
# 1. Prisma 초기화
npx prisma init

# 2. 스키마 정의 후 마이그레이션
npx prisma migrate dev --name init

# 3. Prisma 클라이언트 생성
npx prisma generate
```

### Priority 2: 품목 마스터 화면
- `/master/item` 페이지 생성
- RealGrid 연동
- CRUD API 구현

---

**작성일**: 2024-12-19  
**버전**: v1.1
