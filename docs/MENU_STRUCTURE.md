# 메뉴 구조 설계서

## 개요

AI Factory Lab 시스템의 메뉴 구조입니다. 제조업 ERP 시스템에 최적화된 계층형 메뉴 구조로 설계되었습니다.

---

## 메뉴 트리 구조

```
📊 대시보드 (/)
│
├── 🏭 생산관리 (/production)
│   ├── 생산계획 (/production/plan)
│   ├── 작업지시 (/production/work-order)
│   ├── 생산실적 (/production/result)
│   └── 생산현황 (/production/status)
│
├── 📦 재고관리 (/inventory)
│   ├── 재고현황 (/inventory/status)
│   ├── 입출고관리 (/inventory/io)
│   ├── 재고실사 (/inventory/check)
│   └── 안전재고 (/inventory/safety)
│
├── 🛒 영업관리 (/sales)
│   ├── 거래처관리 (/sales/customer)
│   ├── 수주관리 (/sales/order)
│   ├── 출하관리 (/sales/shipment)
│   └── 판매실적 (/sales/report)
│
├── 💰 원가관리 (/cost)
│   ├── 원가계산 (/cost/calculation)
│   ├── 원가분석 (/cost/analysis)
│   └── 원가비교 (/cost/comparison)
│
├── 🗄️ 기준정보 (/master)
│   ├── 품목관리 (/master/item)
│   ├── BOM관리 (/master/bom)
│   ├── 공정관리 (/master/process)
│   ├── 설비관리 (/master/equipment)
│   └── 거래처관리 (/master/vendor)
│
├── 📈 리포트 (/report)
│   ├── 생산리포트 (/report/production)
│   ├── 재고리포트 (/report/inventory)
│   └── 매출리포트 (/report/sales)
│
└── ⚙️ 시스템 (/system)
    ├── 사용자관리 (/system/user)
    ├── 권한관리 (/system/role)
    ├── 메뉴관리 (/system/menu)
    └── 시스템로그 (/system/log)
```

---

## 메뉴 상세 정보

### 1. 대시보드 (MNU000)
| 항목 | 값 |
|------|-----|
| 메뉴ID | MNU000 |
| 메뉴명 | 대시보드 |
| 경로 | / |
| 아이콘 | LayoutDashboard |
| 설명 | 주요 KPI 및 현황 대시보드 |

---

### 2. 생산관리 (MNU100)

| 메뉴ID | 메뉴명 | 경로 | 아이콘 | 설명 |
|--------|--------|------|--------|------|
| MNU100 | 생산관리 | /production | Factory | 생산 관련 메뉴 그룹 |
| MNU101 | 생산계획 | /production/plan | ClipboardList | 월간/주간 생산계획 수립 |
| MNU102 | 작업지시 | /production/work-order | Calendar | 일일 작업지시 관리 |
| MNU103 | 생산실적 | /production/result | BarChart3 | 생산실적 입력 및 조회 |
| MNU104 | 생산현황 | /production/status | Factory | 실시간 생산현황 모니터링 |

---

### 3. 재고관리 (MNU200)

| 메뉴ID | 메뉴명 | 경로 | 아이콘 | 설명 |
|--------|--------|------|--------|------|
| MNU200 | 재고관리 | /inventory | Package | 재고 관련 메뉴 그룹 |
| MNU201 | 재고현황 | /inventory/status | Boxes | 품목별 재고현황 조회 |
| MNU202 | 입출고관리 | /inventory/io | ArrowLeftRight | 입고/출고 처리 |
| MNU203 | 재고실사 | /inventory/check | PackageSearch | 재고실사 및 조정 |
| MNU204 | 안전재고 | /inventory/safety | AlertTriangle | 안전재고 설정 및 알림 |

---

### 4. 영업관리 (MNU300)

| 메뉴ID | 메뉴명 | 경로 | 아이콘 | 설명 |
|--------|--------|------|--------|------|
| MNU300 | 영업관리 | /sales | ShoppingCart | 영업 관련 메뉴 그룹 |
| MNU301 | 거래처관리 | /sales/customer | Users | 고객사 정보 관리 |
| MNU302 | 수주관리 | /sales/order | ShoppingBag | 수주 등록 및 관리 |
| MNU303 | 출하관리 | /sales/shipment | Truck | 출하 처리 및 이력 |
| MNU304 | 판매실적 | /sales/report | Receipt | 판매실적 집계 및 분석 |

---

### 5. 원가관리 (MNU400)

| 메뉴ID | 메뉴명 | 경로 | 아이콘 | 설명 |
|--------|--------|------|--------|------|
| MNU400 | 원가관리 | /cost | Calculator | 원가 관련 메뉴 그룹 |
| MNU401 | 원가계산 | /cost/calculation | DollarSign | 제품별 원가계산 |
| MNU402 | 원가분석 | /cost/analysis | TrendingUp | 원가요소 분석 |
| MNU403 | 원가비교 | /cost/comparison | BarChart3 | 기간별/품목별 원가비교 |

---

### 6. 기준정보 (MNU500)

| 메뉴ID | 메뉴명 | 경로 | 아이콘 | 설명 |
|--------|--------|------|--------|------|
| MNU500 | 기준정보 | /master | Database | 기준정보 메뉴 그룹 |
| MNU501 | 품목관리 | /master/item | Package | 품목 마스터 관리 |
| MNU502 | BOM관리 | /master/bom | Boxes | 자재명세서 관리 |
| MNU503 | 공정관리 | /master/process | Wrench | 공정 마스터 관리 |
| MNU504 | 설비관리 | /master/equipment | Factory | 설비 마스터 관리 |
| MNU505 | 거래처관리 | /master/vendor | Building | 거래처 마스터 관리 |

---

### 7. 리포트 (MNU600)

| 메뉴ID | 메뉴명 | 경로 | 아이콘 | 설명 |
|--------|--------|------|--------|------|
| MNU600 | 리포트 | /report | FileText | 리포트 메뉴 그룹 |
| MNU601 | 생산리포트 | /report/production | Factory | 생산 관련 보고서 |
| MNU602 | 재고리포트 | /report/inventory | Package | 재고 관련 보고서 |
| MNU603 | 매출리포트 | /report/sales | TrendingUp | 매출 관련 보고서 |

---

### 8. 시스템 (MNU900)

| 메뉴ID | 메뉴명 | 경로 | 아이콘 | 설명 |
|--------|--------|------|--------|------|
| MNU900 | 시스템 | /system | Settings | 시스템 관리 메뉴 그룹 |
| MNU901 | 사용자관리 | /system/user | UserCog | 사용자 계정 관리 |
| MNU902 | 권한관리 | /system/role | Shield | 역할 및 권한 관리 |
| MNU903 | 메뉴관리 | /system/menu | Menu | 메뉴 구성 관리 |
| MNU904 | 시스템로그 | /system/log | Logs | 시스템 로그 조회 |

---

## 역할(Role) 정의

| 역할ID | 역할명 | 설명 | 기본 권한 |
|--------|--------|------|-----------|
| ADMIN | 시스템관리자 | 전체 시스템 관리 권한 | 모든 메뉴 CRUD |
| MANAGER | 관리자 | 부서/팀 관리 권한 | 대부분 메뉴 CRUD |
| USER | 일반사용자 | 업무 처리 권한 | 업무 메뉴 CRU |
| VIEWER | 조회전용 | 데이터 조회만 가능 | 조회 권한만 |

---

## 아이콘 매핑

사용되는 lucide-react 아이콘 목록:

```typescript
const iconMap: Record<string, LucideIcon> = {
  LayoutDashboard,  // 대시보드
  Factory,          // 생산관리, 설비
  Package,          // 재고, 품목
  ShoppingCart,     // 영업관리
  Calculator,       // 원가관리
  Database,         // 기준정보
  FileText,         // 리포트
  Settings,         // 시스템
  ClipboardList,    // 생산계획
  Calendar,         // 작업지시
  BarChart3,        // 실적, 비교
  Boxes,            // 재고현황, BOM
  ArrowLeftRight,   // 입출고
  PackageSearch,    // 재고실사
  AlertTriangle,    // 안전재고
  Users,            // 거래처(고객)
  ShoppingBag,      // 수주
  Truck,            // 출하
  Receipt,          // 판매실적
  TrendingUp,       // 분석, 매출
  DollarSign,       // 원가계산
  Building,         // 거래처(공급)
  Wrench,           // 공정
  UserCog,          // 사용자관리
  Shield,           // 권한관리
  Logs,             // 시스템로그
  Menu,             // 메뉴관리
};
```

---

## 메뉴 확장 가이드

### 새 메뉴 추가 절차

1. **DB에 메뉴 데이터 추가**
   ```sql
   INSERT INTO sys_menu (menu_id, parent_id, menu_name, menu_path, icon_name, sort_order, is_active)
   VALUES ('MNU105', 'MNU100', '품질검사', '/production/quality', 'CheckCircle', 5, true);
   ```

2. **권한 설정**
   ```sql
   INSERT INTO sys_menu_role (menu_id, role_id, can_read, can_create, can_update, can_delete)
   VALUES ('MNU105', 'ADMIN', true, true, true, true);
   ```

3. **아이콘 추가** (필요시)
   - `Sidebar.tsx`의 iconMap에 새 아이콘 추가

4. **페이지 생성**
   - `src/app/production/quality/page.tsx` 생성

---

*최종 수정: 2025-12-05*
