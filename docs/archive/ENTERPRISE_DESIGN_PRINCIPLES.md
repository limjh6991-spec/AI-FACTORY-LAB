# 엔터프라이즈 디자인 시스템 가이드

## 📊 리서치 출처
- **Microsoft Fluent Design System 2** - 엔터프라이즈급 인트라넷 디자인 표준
- **Google Material Design 3** - 현대적 컬러 시스템 및 레이아웃 원칙

---

## 🎨 엔터프라이즈 컬러 시스템

### Primary Colors (주요 행동 유도)
```css
--primary-blue: #0078D4;      /* Microsoft Blue - 주요 액션 버튼, 링크 */
--primary-blue-hover: #106EBE;
--primary-blue-pressed: #005A9E;
```

### Secondary Colors (보조 정보)
```css
--secondary-teal: #00B7C3;    /* 보조 액션, 정보 표시 */
--secondary-purple: #8764B8;  /* 그룹핑, 카테고리 */
```

### Semantic Colors (상태 표시)
```css
--success-green: #107C10;     /* 성공, 완료 */
--warning-yellow: #FFB900;    /* 경고, 주의 */
--error-red: #D13438;         /* 오류, 삭제 */
--info-blue: #0078D4;         /* 정보 */
```

### Neutral Colors (배경 및 텍스트)
```css
--neutral-white: #FFFFFF;
--neutral-gray-10: #FAF9F8;   /* 배경 */
--neutral-gray-20: #F3F2F1;   /* 카드 배경 */
--neutral-gray-30: #EDEBE9;   /* 비활성 배경 */
--neutral-gray-90: #323130;   /* 주요 텍스트 */
--neutral-gray-130: #605E5C;  /* 보조 텍스트 */
```

---

## 📐 레이아웃 비율 (8pt Grid System)

### Spacing Scale
```css
--spacing-xs: 4px;    /* 아이콘-텍스트 간격 */
--spacing-sm: 8px;    /* 요소 내부 여백 */
--spacing-md: 16px;   /* 카드 패딩, 섹션 간격 */
--spacing-lg: 24px;   /* 카드 간격 */
--spacing-xl: 32px;   /* 섹션 구분 */
--spacing-2xl: 48px;  /* 주요 영역 구분 */
```

### Typography Scale
```css
--font-size-xs: 12px;    /* Caption */
--font-size-sm: 14px;    /* Body Small */
--font-size-md: 16px;    /* Body (기본) */
--font-size-lg: 20px;    /* Subtitle */
--font-size-xl: 28px;    /* Title */
--font-size-2xl: 42px;   /* Display */
```

### Line Height
```css
--line-height-tight: 1.2;   /* 제목 */
--line-height-normal: 1.5;  /* 본문 */
--line-height-loose: 1.75;  /* 설명 */
```

---

## 🏗️ 화면 레이아웃 비율

### Sidebar vs Content Ratio
```
Collapsed Sidebar: 60px (고정)
Expanded Sidebar: 280px (고정)
Main Content: calc(100% - sidebar-width)
```

### Content Max Width
```css
--content-max-width: 1440px;  /* 대형 모니터 대응 */
--content-comfortable-width: 1200px;  /* 최적 가독성 */
```

### Card Layout
```
Grid Gap: 24px
Card Padding: 20px
Card Border Radius: 8px
Card Shadow: 0 2px 4px rgba(0,0,0,0.1)
```

---

## 🎯 시각적 계층 구조

### Depth (Elevation)
```css
/* Level 0 - 배경 */
--elevation-0: none;

/* Level 1 - 카드 */
--elevation-1: 0 1.6px 3.6px rgba(0,0,0,0.13), 
                0 0.3px 0.9px rgba(0,0,0,0.11);

/* Level 2 - 드롭다운 */
--elevation-2: 0 3.2px 7.2px rgba(0,0,0,0.13), 
                0 0.6px 1.8px rgba(0,0,0,0.11);

/* Level 3 - 모달 */
--elevation-3: 0 6.4px 14.4px rgba(0,0,0,0.13), 
                0 1.2px 3.6px rgba(0,0,0,0.11);
```

### Border Radius
```css
--radius-sm: 4px;   /* 버튼, 인풋 */
--radius-md: 8px;   /* 카드 */
--radius-lg: 12px;  /* 큰 카드, 모달 */
--radius-full: 50%; /* 원형 아이콘 */
```

---

## 🔤 폰트 시스템

### Font Family
```css
--font-family-primary: 'Segoe UI', -apple-system, BlinkMacSystemFont, 
                       'Malgun Gothic', sans-serif;
--font-family-mono: 'Cascadia Code', 'Consolas', monospace;
```

### Font Weight
```css
--font-weight-regular: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
```

---

## ✨ 인터랙션 원칙

### Transition Duration
```css
--duration-instant: 100ms;   /* 즉각 반응 */
--duration-fast: 200ms;      /* 호버 효과 */
--duration-normal: 300ms;    /* 일반 전환 */
--duration-slow: 500ms;      /* 복잡한 애니메이션 */
```

### Easing Functions
```css
--easing-standard: cubic-bezier(0.4, 0.0, 0.2, 1);
--easing-decelerate: cubic-bezier(0.0, 0.0, 0.2, 1);
--easing-accelerate: cubic-bezier(0.4, 0.0, 1, 1);
```

---

## 📋 컴포넌트별 색상 가이드

### Navigation (사이드바)
- **배경**: `--neutral-gray-90` (#323130)
- **선택된 메뉴**: `--primary-blue` (#0078D4)
- **호버**: `rgba(255,255,255,0.1)`
- **텍스트**: `--neutral-white`
- **아이콘**: `--neutral-gray-20`

### Button Variants
```css
/* Primary Button */
background: var(--primary-blue);
color: var(--neutral-white);
hover: var(--primary-blue-hover);

/* Secondary Button */
background: var(--neutral-white);
border: 1px solid var(--neutral-gray-90);
color: var(--neutral-gray-90);

/* Success Button */
background: var(--success-green);
color: var(--neutral-white);

/* Danger Button */
background: var(--error-red);
color: var(--neutral-white);
```

### Data Grid (RealGrid)
- **헤더 배경**: `--neutral-gray-20` (#F3F2F1)
- **행 구분선**: `--neutral-gray-30` (#EDEBE9)
- **선택된 행**: `rgba(0, 120, 212, 0.1)` (Primary Blue 10%)
- **호버 행**: `rgba(0, 120, 212, 0.05)` (Primary Blue 5%)

### Card Components
- **배경**: `--neutral-white`
- **테두리**: `1px solid var(--neutral-gray-30)`
- **그림자**: `var(--elevation-1)`
- **제목**: `--neutral-gray-90`
- **본문**: `--neutral-gray-130`

---

## 🎨 기능별 색상 매핑

### Dashboard
- **주요 지표 카드**: Primary Blue 강조
- **차트 배경**: Neutral White
- **그리드 영역**: Neutral Gray-10 배경

### Menu Management
- **추가 버튼**: Success Green
- **삭제 버튼**: Error Red
- **수정 버튼**: Secondary Teal
- **저장 버튼**: Primary Blue

### Form Elements
- **입력 필드 테두리**: Neutral Gray-30
- **포커스 테두리**: Primary Blue (2px)
- **에러 테두리**: Error Red
- **비활성 배경**: Neutral Gray-10

---

## 📱 반응형 Breakpoints

```css
--breakpoint-xs: 0px;
--breakpoint-sm: 576px;
--breakpoint-md: 768px;
--breakpoint-lg: 992px;
--breakpoint-xl: 1200px;
--breakpoint-xxl: 1400px;
```

---

## 🔍 접근성 가이드

### Color Contrast Ratios (WCAG 2.1 AA 기준)
- 일반 텍스트: 최소 4.5:1
- 큰 텍스트 (18px+): 최소 3:1
- UI 컴포넌트: 최소 3:1

### Focus Indicators
```css
/* 키보드 포커스 시각화 */
outline: 2px solid var(--primary-blue);
outline-offset: 2px;
```

---

## 🌟 베스트 프랙티스

### ✅ DO
- 일관된 spacing 사용 (8pt grid)
- 명확한 시각적 계층 구조
- 충분한 색상 대비
- 의미있는 색상 사용 (Semantic)
- 여백을 통한 가독성 확보

### ❌ DON'T
- 임의의 spacing 값 사용
- 과도한 색상 사용 (3-4가지 이상)
- 낮은 대비 색상 조합
- 장식적 목적만의 색상
- 빽빽한 레이아웃

---

## 📚 참고 자료
- [Microsoft Fluent 2 Design](https://fluent2.microsoft.design/)
- [Material Design 3](https://m3.material.io/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
