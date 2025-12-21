# 레이아웃 빌더 아키텍처 상세 문서

> Screen Generator 레이아웃 관리 시스템

---

## 1. 개요

### 목적
드래그 앤 드롭 방식으로 화면 레이아웃을 구성하고, 실제 React 코드를 자동 생성

### 핵심 개념
```
레이아웃 (Layout) → 슬롯 (Slot) → 컴포넌트 (Component)
```

---

## 2. 데이터 구조

### 2.1 레이아웃 타입
| 타입 | 설명 | 슬롯 수 | 용도 |
|------|------|:------:|------|
| `ToolbarRow` | 툴바 영역 | 1 | 옵션, 버튼 배치 |
| `FullWidth` | 전체 너비 | 1 | 그리드, 차트 |
| `Row2` | 2열 | 2 | 좌우 분할 |
| `Row3` | 3열 | 3 | 대시보드 |

### 2.2 타입 정의

```typescript
// 레이아웃 아이템
interface LayoutItem {
    i: string;            // 고유 ID (예: "layout_1")
    type: LayoutType;     // 레이아웃 타입
    x: number;            // 그리드 X 위치 (0-11)
    y: number;            // 그리드 Y 위치
    w: number;            // 너비 (1-12, 12열 그리드)
    h: number;            // 높이 (행 단위)
    minW?: number;        // 최소 너비
    minH?: number;        // 최소 높이
    slots: Slot[];        // 슬롯 배열
}

// 슬롯 (레이아웃 내 개별 공간)
interface Slot {
    id: string;           // 예: "layout_1_slot_1"
    components: ComponentItem[];
}

// 컴포넌트
interface ComponentItem {
    type: ComponentType;  // Option, Button, Grid, Chart, Tab
    templateId: string;   // 예: "SiteSelect", "btn_search"
    label?: string;       // 표시 라벨
}
```

---

## 3. 12열 그리드 시스템

### 3.1 그리드 구조
```
|--1--|--2--|--3--|--4--|--5--|--6--|--7--|--8--|--9--|--10-|--11-|--12-|
|                              w=12 (100%)                              |
|           w=6 (50%)          |           w=6 (50%)                    |
|   w=4 (33%)   |   w=4 (33%)  |   w=4 (33%)                           |
```

### 3.2 react-grid-layout 설정
```typescript
<GridLayout
    cols={12}           // 12열 그리드
    rowHeight={50}      // 행 높이 50px
    width={950}         // 캔버스 너비 (빌더용)
    compactType="vertical"  // 수직 자동 정렬
/>
```

### 3.3 실제 화면 적용
```css
/* 빌더: 고정 너비 */
.canvas { width: 950px; }

/* 실제 화면: 반응형 */
.screen { width: 100%; }
```

---

## 4. 컴포넌트 필터링

### 4.1 레이아웃별 허용 컴포넌트
```typescript
const ALLOWED_COMPONENTS: Record<LayoutType, ComponentType[]> = {
    ToolbarRow: ['Option', 'Button'],
    FullWidth: ['Tab', 'Grid', 'Chart'],
    Row2: ['Tab', 'Grid', 'Chart'],
    Row3: ['Tab', 'Grid', 'Chart'],
};
```

### 4.2 컴포넌트 멀티 선택
| 타입 | 다중 선택 | 설명 |
|------|:--------:|------|
| Option | ✅ | 여러 옵션 추가 가능 |
| Button | ✅ | 여러 버튼 추가 가능 |
| Grid | ❌ | 1개만 가능 |
| Chart | ❌ | 1개만 가능 |
| Tab | ❌ | 1개만 가능 |

---

## 5. 템플릿 프리셋

### 5.1 정의된 템플릿
| ID | 이름 | 구조 |
|----|------|------|
| `basic-crud` | 기본 CRUD | ToolbarRow + FullWidth(Grid) |
| `master-detail` | 마스터-디테일 | ToolbarRow + Row2(Grid, Grid) |
| `dashboard` | 대시보드 | Row3(Chart×3) + FullWidth(Grid) |
| `report` | 리포트 | ToolbarRow + Row2(Chart×2) + FullWidth(Grid) |

### 5.2 템플릿 구조 예시
```typescript
{
    id: 'basic-crud',
    name: '기본 CRUD',
    layout: [
        {
            i: 'layout_1',
            type: 'ToolbarRow',
            x: 0, y: 0, w: 12, h: 1,
            slots: [{
                id: 'layout_1_slot_1',
                components: [
                    { type: 'Option', templateId: 'SiteSelect' },
                    { type: 'Button', templateId: 'btn_search' },
                ]
            }]
        },
        {
            i: 'layout_2',
            type: 'FullWidth',
            x: 0, y: 1, w: 12, h: 6,
            slots: [{
                id: 'layout_2_slot_1',
                components: [
                    { type: 'Grid', templateId: 'grid_basic' }
                ]
            }]
        }
    ]
}
```

---

## 6. 상태 관리 (Zustand)

### 6.1 Store 구조
```typescript
interface LayoutStore {
    items: LayoutItem[];
    selectedItemId: string | null;
    selectedSlotId: string | null;
    
    // Actions
    addLayout: (type: LayoutType) => void;
    removeItem: (id: string) => void;
    addComponent: (itemId, slotId, component) => void;
    removeComponent: (itemId, slotId, index) => void;
    loadLayout: (items: LayoutItem[]) => void;
    clearAll: () => void;
}
```

### 6.2 상태 흐름
```
User Action → Store Update → Canvas Re-render
     ↓
Template/Layout Selection
     ↓
Slot Click → Component Selector → Add Component
     ↓
Save → Export JSON
```

---

## 7. 파일 구조

```
src/app/builder/
├── page.tsx                 # 메인 페이지
├── types.ts                 # 타입 정의
├── store/
│   └── layoutStore.ts       # Zustand 상태관리
└── components/
    ├── Canvas.tsx           # 드래그 캔버스
    ├── Palette.tsx          # 컴포넌트 팔레트
    ├── ComponentSelector.tsx # 컴포넌트 선택 팝업
    └── TemplateSelector.tsx  # 템플릿 선택 팝업
```

---

## 8. 향후 개선 계획

### Phase 1: 실제 컴포넌트 미리보기
- [ ] Canvas에서 실제 Select, Button 렌더링
- [ ] 그리드/차트 Placeholder 표시

### Phase 2: 코드 생성
- [ ] Layout JSON → React 코드 변환
- [ ] 생성된 화면 파일 저장

### Phase 3: 반응형
- [ ] 100% 너비 미리보기 모드
- [ ] 모바일/태블릿 뷰
