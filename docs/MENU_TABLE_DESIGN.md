# 메뉴 테이블 설계서

## 개요

AI Factory Lab 시스템의 메뉴 및 권한 관리를 위한 데이터베이스 테이블 설계입니다.

---

## ERD (Entity Relationship Diagram)

```
┌─────────────────┐       ┌─────────────────────┐       ┌─────────────────┐
│    sys_menu     │       │   sys_menu_role     │       │    sys_role     │
├─────────────────┤       ├─────────────────────┤       ├─────────────────┤
│ PK menu_id      │──────<│ FK menu_id          │>──────│ PK role_id      │
│ FK parent_id    │       │ FK role_id          │       │    role_name    │
│    menu_name    │       │    can_read         │       │    description  │
│    menu_path    │       │    can_create       │       │    is_active    │
│    icon_name    │       │    can_update       │       │    created_at   │
│    sort_order   │       │    can_delete       │       │    updated_at   │
│    menu_level   │       │    created_at       │       └─────────────────┘
│    is_active    │       │    updated_at       │
│    created_at   │       └─────────────────────┘
│    updated_at   │
└─────────────────┘
        │
        │ (Self Reference)
        └──────────────────┘
```

---

## 테이블 상세 설계

### 1. sys_menu (메뉴 테이블)

메뉴 정보를 저장하는 테이블입니다. 계층형 구조를 지원합니다.

#### 테이블 정의

```sql
CREATE TABLE sys_menu (
    menu_id       VARCHAR(20)   PRIMARY KEY,
    parent_id     VARCHAR(20)   NULL REFERENCES sys_menu(menu_id),
    menu_name     VARCHAR(100)  NOT NULL,
    menu_path     VARCHAR(200)  NULL,
    icon_name     VARCHAR(50)   NULL,
    sort_order    INTEGER       NOT NULL DEFAULT 0,
    menu_level    INTEGER       NOT NULL DEFAULT 1,
    is_active     BOOLEAN       NOT NULL DEFAULT TRUE,
    created_at    TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at    TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

#### 컬럼 설명

| 컬럼명 | 타입 | NULL | 기본값 | 설명 |
|--------|------|------|--------|------|
| menu_id | VARCHAR(20) | NO | - | 메뉴 고유 식별자 (예: MNU100) |
| parent_id | VARCHAR(20) | YES | NULL | 상위 메뉴 ID (NULL이면 최상위) |
| menu_name | VARCHAR(100) | NO | - | 메뉴 표시명 |
| menu_path | VARCHAR(200) | YES | NULL | 라우팅 경로 (예: /production/plan) |
| icon_name | VARCHAR(50) | YES | NULL | lucide-react 아이콘명 |
| sort_order | INTEGER | NO | 0 | 동일 레벨 내 정렬 순서 |
| menu_level | INTEGER | NO | 1 | 메뉴 깊이 (1: 최상위) |
| is_active | BOOLEAN | NO | TRUE | 활성화 여부 |
| created_at | TIMESTAMP | NO | CURRENT_TIMESTAMP | 생성일시 |
| updated_at | TIMESTAMP | NO | CURRENT_TIMESTAMP | 수정일시 |

#### 인덱스

```sql
CREATE INDEX idx_sys_menu_parent ON sys_menu(parent_id);
CREATE INDEX idx_sys_menu_sort ON sys_menu(parent_id, sort_order);
CREATE INDEX idx_sys_menu_active ON sys_menu(is_active);
```

---

### 2. sys_role (역할 테이블)

사용자 역할(권한 그룹)을 정의하는 테이블입니다.

#### 테이블 정의

```sql
CREATE TABLE sys_role (
    role_id       VARCHAR(20)   PRIMARY KEY,
    role_name     VARCHAR(50)   NOT NULL,
    description   VARCHAR(200)  NULL,
    is_active     BOOLEAN       NOT NULL DEFAULT TRUE,
    created_at    TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at    TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

#### 컬럼 설명

| 컬럼명 | 타입 | NULL | 기본값 | 설명 |
|--------|------|------|--------|------|
| role_id | VARCHAR(20) | NO | - | 역할 고유 식별자 (예: ADMIN) |
| role_name | VARCHAR(50) | NO | - | 역할 표시명 |
| description | VARCHAR(200) | YES | NULL | 역할 설명 |
| is_active | BOOLEAN | NO | TRUE | 활성화 여부 |
| created_at | TIMESTAMP | NO | CURRENT_TIMESTAMP | 생성일시 |
| updated_at | TIMESTAMP | NO | CURRENT_TIMESTAMP | 수정일시 |

---

### 3. sys_menu_role (메뉴-역할 권한 테이블)

메뉴별 역할 권한을 매핑하는 테이블입니다.

#### 테이블 정의

```sql
CREATE TABLE sys_menu_role (
    id            SERIAL        PRIMARY KEY,
    menu_id       VARCHAR(20)   NOT NULL REFERENCES sys_menu(menu_id) ON DELETE CASCADE,
    role_id       VARCHAR(20)   NOT NULL REFERENCES sys_role(role_id) ON DELETE CASCADE,
    can_read      BOOLEAN       NOT NULL DEFAULT TRUE,
    can_create    BOOLEAN       NOT NULL DEFAULT FALSE,
    can_update    BOOLEAN       NOT NULL DEFAULT FALSE,
    can_delete    BOOLEAN       NOT NULL DEFAULT FALSE,
    created_at    TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at    TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(menu_id, role_id)
);
```

#### 컬럼 설명

| 컬럼명 | 타입 | NULL | 기본값 | 설명 |
|--------|------|------|--------|------|
| id | SERIAL | NO | Auto | 자동 증가 PK |
| menu_id | VARCHAR(20) | NO | - | 메뉴 ID (FK) |
| role_id | VARCHAR(20) | NO | - | 역할 ID (FK) |
| can_read | BOOLEAN | NO | TRUE | 조회 권한 |
| can_create | BOOLEAN | NO | FALSE | 생성 권한 |
| can_update | BOOLEAN | NO | FALSE | 수정 권한 |
| can_delete | BOOLEAN | NO | FALSE | 삭제 권한 |
| created_at | TIMESTAMP | NO | CURRENT_TIMESTAMP | 생성일시 |
| updated_at | TIMESTAMP | NO | CURRENT_TIMESTAMP | 수정일시 |

#### 인덱스

```sql
CREATE INDEX idx_sys_menu_role_menu ON sys_menu_role(menu_id);
CREATE INDEX idx_sys_menu_role_role ON sys_menu_role(role_id);
```

---

## Prisma 스키마

```prisma
model sys_menu {
  menu_id    String    @id @db.VarChar(20)
  parent_id  String?   @db.VarChar(20)
  menu_name  String    @db.VarChar(100)
  menu_path  String?   @db.VarChar(200)
  icon_name  String?   @db.VarChar(50)
  sort_order Int       @default(0)
  menu_level Int       @default(1)
  is_active  Boolean   @default(true)
  created_at DateTime  @default(now())
  updated_at DateTime  @updatedAt

  // Self-relation
  parent     sys_menu?       @relation("MenuHierarchy", fields: [parent_id], references: [menu_id])
  children   sys_menu[]      @relation("MenuHierarchy")

  // Relation to permissions
  permissions sys_menu_role[]

  @@index([parent_id])
  @@index([is_active])
}

model sys_role {
  role_id     String    @id @db.VarChar(20)
  role_name   String    @db.VarChar(50)
  description String?   @db.VarChar(200)
  is_active   Boolean   @default(true)
  created_at  DateTime  @default(now())
  updated_at  DateTime  @updatedAt

  // Relation to permissions
  permissions sys_menu_role[]
}

model sys_menu_role {
  id         Int      @id @default(autoincrement())
  menu_id    String   @db.VarChar(20)
  role_id    String   @db.VarChar(20)
  can_read   Boolean  @default(true)
  can_create Boolean  @default(false)
  can_update Boolean  @default(false)
  can_delete Boolean  @default(false)
  created_at DateTime @default(now())
  updated_at DateTime @updatedAt

  // Relations
  menu sys_menu @relation(fields: [menu_id], references: [menu_id], onDelete: Cascade)
  role sys_role @relation(fields: [role_id], references: [role_id], onDelete: Cascade)

  @@unique([menu_id, role_id])
  @@index([menu_id])
  @@index([role_id])
}
```

---

## 초기 데이터

### 역할 데이터

```sql
INSERT INTO sys_role (role_id, role_name, description) VALUES
('ADMIN', '시스템관리자', '전체 시스템 관리 권한'),
('MANAGER', '관리자', '부서/팀 관리 권한'),
('USER', '일반사용자', '일반 업무 처리 권한'),
('VIEWER', '조회전용', '데이터 조회만 가능');
```

### 메뉴 데이터

```sql
-- 최상위 메뉴
INSERT INTO sys_menu (menu_id, parent_id, menu_name, menu_path, icon_name, sort_order, menu_level) VALUES
('MNU000', NULL, '대시보드', '/', 'LayoutDashboard', 0, 1),
('MNU100', NULL, '생산관리', '/production', 'Factory', 1, 1),
('MNU200', NULL, '재고관리', '/inventory', 'Package', 2, 1),
('MNU300', NULL, '영업관리', '/sales', 'ShoppingCart', 3, 1),
('MNU400', NULL, '원가관리', '/cost', 'Calculator', 4, 1),
('MNU500', NULL, '기준정보', '/master', 'Database', 5, 1),
('MNU600', NULL, '리포트', '/report', 'FileText', 6, 1),
('MNU900', NULL, '시스템', '/system', 'Settings', 9, 1);

-- 생산관리 하위메뉴
INSERT INTO sys_menu (menu_id, parent_id, menu_name, menu_path, icon_name, sort_order, menu_level) VALUES
('MNU101', 'MNU100', '생산계획', '/production/plan', 'ClipboardList', 1, 2),
('MNU102', 'MNU100', '작업지시', '/production/work-order', 'Calendar', 2, 2),
('MNU103', 'MNU100', '생산실적', '/production/result', 'BarChart3', 3, 2),
('MNU104', 'MNU100', '생산현황', '/production/status', 'Factory', 4, 2);

-- 재고관리 하위메뉴
INSERT INTO sys_menu (menu_id, parent_id, menu_name, menu_path, icon_name, sort_order, menu_level) VALUES
('MNU201', 'MNU200', '재고현황', '/inventory/status', 'Boxes', 1, 2),
('MNU202', 'MNU200', '입출고관리', '/inventory/io', 'ArrowLeftRight', 2, 2),
('MNU203', 'MNU200', '재고실사', '/inventory/check', 'PackageSearch', 3, 2),
('MNU204', 'MNU200', '안전재고', '/inventory/safety', 'AlertTriangle', 4, 2);

-- 영업관리 하위메뉴
INSERT INTO sys_menu (menu_id, parent_id, menu_name, menu_path, icon_name, sort_order, menu_level) VALUES
('MNU301', 'MNU300', '거래처관리', '/sales/customer', 'Users', 1, 2),
('MNU302', 'MNU300', '수주관리', '/sales/order', 'ShoppingBag', 2, 2),
('MNU303', 'MNU300', '출하관리', '/sales/shipment', 'Truck', 3, 2),
('MNU304', 'MNU300', '판매실적', '/sales/report', 'Receipt', 4, 2);

-- 원가관리 하위메뉴
INSERT INTO sys_menu (menu_id, parent_id, menu_name, menu_path, icon_name, sort_order, menu_level) VALUES
('MNU401', 'MNU400', '원가계산', '/cost/calculation', 'DollarSign', 1, 2),
('MNU402', 'MNU400', '원가분석', '/cost/analysis', 'TrendingUp', 2, 2),
('MNU403', 'MNU400', '원가비교', '/cost/comparison', 'BarChart3', 3, 2);

-- 기준정보 하위메뉴
INSERT INTO sys_menu (menu_id, parent_id, menu_name, menu_path, icon_name, sort_order, menu_level) VALUES
('MNU501', 'MNU500', '품목관리', '/master/item', 'Package', 1, 2),
('MNU502', 'MNU500', 'BOM관리', '/master/bom', 'Boxes', 2, 2),
('MNU503', 'MNU500', '공정관리', '/master/process', 'Wrench', 3, 2),
('MNU504', 'MNU500', '설비관리', '/master/equipment', 'Factory', 4, 2),
('MNU505', 'MNU500', '거래처관리', '/master/vendor', 'Building', 5, 2);

-- 리포트 하위메뉴
INSERT INTO sys_menu (menu_id, parent_id, menu_name, menu_path, icon_name, sort_order, menu_level) VALUES
('MNU601', 'MNU600', '생산리포트', '/report/production', 'Factory', 1, 2),
('MNU602', 'MNU600', '재고리포트', '/report/inventory', 'Package', 2, 2),
('MNU603', 'MNU600', '매출리포트', '/report/sales', 'TrendingUp', 3, 2);

-- 시스템 하위메뉴
INSERT INTO sys_menu (menu_id, parent_id, menu_name, menu_path, icon_name, sort_order, menu_level) VALUES
('MNU901', 'MNU900', '사용자관리', '/system/user', 'UserCog', 1, 2),
('MNU902', 'MNU900', '권한관리', '/system/role', 'Shield', 2, 2),
('MNU903', 'MNU900', '메뉴관리', '/system/menu', 'Menu', 3, 2),
('MNU904', 'MNU900', '시스템로그', '/system/log', 'Logs', 4, 2);
```

---

## 권한 매트릭스

| 메뉴 | ADMIN | MANAGER | USER | VIEWER |
|------|-------|---------|------|--------|
| 대시보드 | CRUD | CRUD | R | R |
| 생산관리 | CRUD | CRUD | CRU | R |
| 재고관리 | CRUD | CRUD | CRU | R |
| 영업관리 | CRUD | CRUD | CRU | R |
| 원가관리 | CRUD | CRU | R | R |
| 기준정보 | CRUD | CRU | R | R |
| 리포트 | CRUD | R | R | R |
| 시스템 | CRUD | - | - | - |

> C: Create, R: Read, U: Update, D: Delete

---

## API 엔드포인트

### tRPC 라우터

```typescript
// src/server/api/routers/menu.ts
export const menuRouter = createTRPCRouter({
  // 메뉴 트리 조회 (계층 구조)
  getMenuTree: publicProcedure.query(async ({ ctx }) => {
    const menus = await ctx.db.sys_menu.findMany({
      where: { is_active: true },
      orderBy: [{ menu_level: 'asc' }, { sort_order: 'asc' }],
    });
    return buildMenuTree(menus);
  }),

  // 역할별 메뉴 조회
  getMenuByRole: protectedProcedure
    .input(z.object({ roleId: z.string() }))
    .query(async ({ ctx, input }) => {
      // ... 역할별 접근 가능 메뉴 반환
    }),

  // 메뉴 권한 확인
  checkPermission: protectedProcedure
    .input(z.object({ menuId: z.string(), action: z.string() }))
    .query(async ({ ctx, input }) => {
      // ... 권한 확인 로직
    }),
});
```

---

## 주요 쿼리 예시

### 계층형 메뉴 조회 (CTE 사용)

```sql
WITH RECURSIVE menu_tree AS (
  -- 최상위 메뉴
  SELECT menu_id, parent_id, menu_name, menu_path, icon_name, 
         sort_order, menu_level, 1 as depth,
         ARRAY[sort_order] as path
  FROM sys_menu
  WHERE parent_id IS NULL AND is_active = true
  
  UNION ALL
  
  -- 하위 메뉴
  SELECT m.menu_id, m.parent_id, m.menu_name, m.menu_path, m.icon_name,
         m.sort_order, m.menu_level, mt.depth + 1,
         mt.path || m.sort_order
  FROM sys_menu m
  INNER JOIN menu_tree mt ON m.parent_id = mt.menu_id
  WHERE m.is_active = true
)
SELECT * FROM menu_tree
ORDER BY path;
```

### 역할별 접근 가능 메뉴 조회

```sql
SELECT m.menu_id, m.menu_name, m.menu_path, m.icon_name,
       mr.can_read, mr.can_create, mr.can_update, mr.can_delete
FROM sys_menu m
INNER JOIN sys_menu_role mr ON m.menu_id = mr.menu_id
WHERE mr.role_id = 'USER'
  AND m.is_active = true
  AND mr.can_read = true
ORDER BY m.menu_level, m.sort_order;
```

---

## 변경 이력

| 버전 | 날짜 | 작성자 | 변경 내용 |
|------|------|--------|----------|
| 1.0 | 2025-12-05 | AI Factory Lab | 최초 작성 |

---

*최종 수정: 2025-12-05*
