# IBM Carbon Design System - 프로젝트 가이드

## 📋 개요

IBM Carbon Design System은 IBM의 오픈소스 디자인 시스템으로, 
엔터프라이즈급 웹 애플리케이션을 위한 일관된 UI/UX를 제공합니다.

- **공식 사이트**: https://carbondesignsystem.com/
- **GitHub**: https://github.com/carbon-design-system/carbon
- **Storybook**: https://react.carbondesignsystem.com/

---

## 🎨 색상 팔레트

### Primary Colors

| 용도 | 색상 코드 | 변수명 |
|------|-----------|--------|
| Interactive Primary | `#0f62fe` | `$interactive-01` |
| Interactive Secondary | `#393939` | `$interactive-02` |
| Interactive Tertiary | `#0f62fe` | `$interactive-03` |
| Danger | `#da1e28` | `$danger-01` |
| Success | `#24a148` | `$support-02` |
| Warning | `#f1c21b` | `$support-03` |

### Background Colors (Gray 100 Theme - Dark)

| 용도 | 색상 코드 | 설명 |
|------|-----------|------|
| Background | `#161616` | 메인 배경 |
| Layer 01 | `#262626` | 첫 번째 레이어 |
| Layer 02 | `#393939` | 두 번째 레이어 |
| Layer 03 | `#525252` | 세 번째 레이어 |
| Border | `#393939` | 테두리 |
| Border Strong | `#6f6f6f` | 강조 테두리 |

### Background Colors (White Theme - Light)

| 용도 | 색상 코드 | 설명 |
|------|-----------|------|
| Background | `#ffffff` | 메인 배경 |
| Layer 01 | `#f4f4f4` | 첫 번째 레이어 |
| Layer 02 | `#e0e0e0` | 두 번째 레이어 |
| Border | `#e0e0e0` | 테두리 |
| Border Strong | `#8d8d8d` | 강조 테두리 |

### Text Colors

| 용도 | 다크 테마 | 라이트 테마 |
|------|-----------|-------------|
| Primary | `#f4f4f4` | `#161616` |
| Secondary | `#c6c6c6` | `#525252` |
| Placeholder | `#6f6f6f` | `#a8a8a8` |
| Disabled | `#525252` | `#c6c6c6` |
| On Color | `#ffffff` | `#ffffff` |

---

## 📐 Typography

### Font Family

```css
/* IBM Plex Sans - Primary */
font-family: 'IBM Plex Sans', 'Helvetica Neue', Arial, sans-serif;

/* IBM Plex Mono - Code */
font-family: 'IBM Plex Mono', 'Menlo', 'DejaVu Sans Mono', monospace;
```

### Type Scale

| 이름 | 크기 | 행간 | 용도 |
|------|------|------|------|
| `caption-01` | 12px | 16px | 캡션, 라벨 |
| `body-compact-01` | 14px | 18px | 본문 (컴팩트) |
| `body-01` | 14px | 20px | 본문 |
| `body-compact-02` | 16px | 22px | 중요 본문 |
| `heading-01` | 14px | 18px | 소제목 |
| `heading-02` | 16px | 22px | 중제목 |
| `heading-03` | 20px | 26px | 대제목 |
| `heading-04` | 28px | 36px | 페이지 제목 |
| `heading-05` | 32px | 40px | 섹션 헤더 |

### Font Weights

| 이름 | 두께 | 용도 |
|------|------|------|
| Light | 300 | 대형 디스플레이 |
| Regular | 400 | 본문 |
| Medium | 500 | - |
| SemiBold | 600 | 제목, 강조 |

---

## 📏 Spacing

### Spacing Scale (2x Grid)

| Token | 값 | 용도 |
|-------|-----|------|
| `$spacing-01` | 2px | 미세 조정 |
| `$spacing-02` | 4px | 아이콘 간격 |
| `$spacing-03` | 8px | 인라인 요소 |
| `$spacing-04` | 12px | 작은 간격 |
| `$spacing-05` | 16px | 기본 간격 |
| `$spacing-06` | 24px | 그룹 간격 |
| `$spacing-07` | 32px | 섹션 간격 |
| `$spacing-08` | 40px | 큰 섹션 |
| `$spacing-09` | 48px | 페이지 여백 |
| `$spacing-10` | 64px | 대형 간격 |

### Container Padding

```css
/* 카드, 타일 */
padding: 16px;  /* $spacing-05 */

/* 모달 */
padding: 24px;  /* $spacing-06 */

/* 페이지 */
padding: 32px;  /* $spacing-07 */
```

---

## 🧩 컴포넌트 스타일 가이드

### Button

```css
/* Primary Button */
.cds--btn--primary {
  background-color: #0f62fe;
  color: #ffffff;
  padding: 13px 64px 13px 16px;  /* 48px 높이 */
  font-size: 14px;
  font-weight: 400;
  border: none;
  border-radius: 0;  /* Carbon은 기본적으로 직각 */
}

.cds--btn--primary:hover {
  background-color: #0353e9;
}

.cds--btn--primary:active {
  background-color: #002d9c;
}

/* Secondary Button */
.cds--btn--secondary {
  background-color: #393939;
  color: #ffffff;
}

/* Ghost Button */
.cds--btn--ghost {
  background-color: transparent;
  color: #0f62fe;
}

/* Danger Button */
.cds--btn--danger {
  background-color: #da1e28;
  color: #ffffff;
}
```

### Button Sizes

| 사이즈 | 높이 | 패딩 |
|--------|------|------|
| Small (sm) | 32px | 8px 16px |
| Medium (md) | 40px | 10px 16px |
| Large (lg) | 48px | 13px 16px |
| Extra Large (xl) | 64px | 16px 16px |
| 2X Large (2xl) | 80px | 16px 16px |

### Input / Text Field

```css
/* Text Input */
.cds--text-input {
  background-color: #f4f4f4;  /* Light theme */
  border: none;
  border-bottom: 1px solid #8d8d8d;
  height: 40px;
  padding: 0 16px;
  font-size: 14px;
  color: #161616;
}

.cds--text-input:focus {
  border-bottom: 2px solid #0f62fe;
  outline: none;
}

.cds--text-input:disabled {
  background-color: #f4f4f4;
  border-bottom-color: transparent;
  color: #c6c6c6;
}

/* Dark Theme */
.cds--text-input--dark {
  background-color: #262626;
  border-bottom: 1px solid #6f6f6f;
  color: #f4f4f4;
}
```

### Card / Tile

```css
/* Clickable Tile */
.cds--tile--clickable {
  background-color: #f4f4f4;
  border: none;
  padding: 16px;
  cursor: pointer;
  transition: background-color 150ms;
}

.cds--tile--clickable:hover {
  background-color: #e0e0e0;
}

/* Selectable Tile */
.cds--tile--selectable {
  border: 1px solid transparent;
}

.cds--tile--selectable:focus {
  border-color: #0f62fe;
  outline: 2px solid #0f62fe;
  outline-offset: -2px;
}
```

### Data Table

```css
/* Table Container */
.cds--data-table {
  border-collapse: collapse;
  width: 100%;
}

/* Header Row */
.cds--data-table thead tr {
  background-color: #e0e0e0;
  height: 48px;
}

.cds--data-table th {
  padding: 0 16px;
  text-align: left;
  font-size: 14px;
  font-weight: 600;
  color: #161616;
  border-bottom: 1px solid #c6c6c6;
}

/* Body Row */
.cds--data-table tbody tr {
  background-color: #ffffff;
  height: 48px;
  border-bottom: 1px solid #e0e0e0;
}

.cds--data-table tbody tr:hover {
  background-color: #e8e8e8;
}

.cds--data-table td {
  padding: 0 16px;
  font-size: 14px;
  color: #161616;
}

/* Zebra Striping (Optional) */
.cds--data-table--zebra tbody tr:nth-child(even) {
  background-color: #f4f4f4;
}
```

### Navigation / Side Panel

```css
/* Side Navigation */
.cds--side-nav {
  background-color: #161616;
  width: 256px;
  height: 100vh;
}

/* Nav Item */
.cds--side-nav__item {
  height: 48px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  color: #c6c6c6;
  font-size: 14px;
  cursor: pointer;
  border-left: 3px solid transparent;
}

.cds--side-nav__item:hover {
  background-color: #393939;
  color: #ffffff;
}

.cds--side-nav__item--active {
  background-color: #393939;
  color: #ffffff;
  border-left-color: #0f62fe;
}

/* Collapsed State */
.cds--side-nav--collapsed {
  width: 64px;
}
```

### Modal

```css
/* Modal Container */
.cds--modal-container {
  background-color: #ffffff;
  max-width: 640px;
  max-height: 84vh;
}

/* Modal Header */
.cds--modal-header {
  padding: 16px 24px;
  border-bottom: none;
}

.cds--modal-header__heading {
  font-size: 20px;
  font-weight: 600;
  color: #161616;
}

/* Modal Content */
.cds--modal-content {
  padding: 0 24px 24px;
  font-size: 14px;
  color: #525252;
}

/* Modal Footer */
.cds--modal-footer {
  padding: 16px 24px;
  display: flex;
  justify-content: flex-end;
  gap: 16px;
}
```

---

## 🖼️ 아이콘

### Icon Sizes

| 사이즈 | 픽셀 | 용도 |
|--------|------|------|
| 16 | 16x16 | 인라인, 버튼 내부 |
| 20 | 20x20 | 기본 UI 아이콘 |
| 24 | 24x24 | 네비게이션 |
| 32 | 32x32 | 헤더, 큰 버튼 |

### 아이콘 컬러

```css
/* Light Theme */
--cds-icon-primary: #161616;
--cds-icon-secondary: #525252;
--cds-icon-on-color: #ffffff;
--cds-icon-disabled: #c6c6c6;

/* Dark Theme */
--cds-icon-primary: #f4f4f4;
--cds-icon-secondary: #c6c6c6;
--cds-icon-on-color: #ffffff;
--cds-icon-disabled: #525252;
```

---

## 📱 Grid System

### Breakpoints

| 이름 | 범위 | 컬럼 | 여백 |
|------|------|------|------|
| Small | 320-671px | 4 | 16px |
| Medium | 672-1055px | 8 | 16px |
| Large | 1056-1311px | 16 | 16px |
| X-Large | 1312-1583px | 16 | 16px |
| Max | 1584px+ | 16 | 24px |

### Grid CSS

```css
/* 16 Column Grid */
.cds--grid {
  max-width: 1584px;
  margin: 0 auto;
  padding: 0 16px;
}

.cds--row {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -8px;
}

.cds--col {
  padding: 0 8px;
}

/* Column Spans */
.cds--col-sm-4 { width: 100%; }      /* 4/4 on small */
.cds--col-md-4 { width: 50%; }       /* 4/8 on medium */
.cds--col-lg-4 { width: 25%; }       /* 4/16 on large */
```

---

## 🔧 Tailwind CSS 변환

### globals.css 설정

```css
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Carbon Colors - Light Theme */
    --carbon-blue-60: #0f62fe;
    --carbon-blue-70: #0043ce;
    --carbon-blue-80: #002d9c;
    
    --carbon-gray-10: #f4f4f4;
    --carbon-gray-20: #e0e0e0;
    --carbon-gray-30: #c6c6c6;
    --carbon-gray-50: #8d8d8d;
    --carbon-gray-60: #6f6f6f;
    --carbon-gray-70: #525252;
    --carbon-gray-80: #393939;
    --carbon-gray-90: #262626;
    --carbon-gray-100: #161616;
    
    --carbon-red-60: #da1e28;
    --carbon-green-60: #24a148;
    --carbon-yellow-30: #f1c21b;
  }

  body {
    font-family: 'IBM Plex Sans', 'Helvetica Neue', Arial, sans-serif;
  }
}

@layer components {
  /* Carbon Button Primary */
  .btn-carbon-primary {
    @apply bg-[#0f62fe] text-white px-4 py-3 text-sm font-normal;
    @apply hover:bg-[#0353e9] active:bg-[#002d9c];
    @apply focus:outline-none focus:ring-2 focus:ring-[#0f62fe] focus:ring-offset-2;
    @apply disabled:bg-[#c6c6c6] disabled:text-[#8d8d8d] disabled:cursor-not-allowed;
  }

  /* Carbon Button Secondary */
  .btn-carbon-secondary {
    @apply bg-[#393939] text-white px-4 py-3 text-sm font-normal;
    @apply hover:bg-[#4c4c4c] active:bg-[#6f6f6f];
  }

  /* Carbon Button Ghost */
  .btn-carbon-ghost {
    @apply bg-transparent text-[#0f62fe] px-4 py-3 text-sm font-normal;
    @apply hover:bg-[#e8e8e8] active:bg-[#c6c6c6];
  }

  /* Carbon Input */
  .input-carbon {
    @apply bg-[#f4f4f4] border-0 border-b border-[#8d8d8d];
    @apply h-10 px-4 text-sm text-[#161616];
    @apply focus:border-b-2 focus:border-[#0f62fe] focus:outline-none;
    @apply disabled:bg-[#f4f4f4] disabled:border-transparent disabled:text-[#c6c6c6];
  }

  /* Carbon Tile */
  .tile-carbon {
    @apply bg-[#f4f4f4] p-4 cursor-pointer transition-colors duration-150;
    @apply hover:bg-[#e0e0e0];
    @apply focus:outline-none focus:ring-2 focus:ring-[#0f62fe] focus:ring-inset;
  }

  /* Carbon Side Nav Item */
  .nav-item-carbon {
    @apply h-12 px-4 flex items-center text-sm text-[#c6c6c6];
    @apply border-l-[3px] border-l-transparent cursor-pointer;
    @apply hover:bg-[#393939] hover:text-white;
    @apply transition-colors duration-150;
  }

  .nav-item-carbon-active {
    @apply bg-[#393939] text-white border-l-[#0f62fe];
  }
}
```

---

## 📝 화면 생성 시 체크리스트

### 필수 적용 항목

- [ ] **폰트**: IBM Plex Sans 사용
- [ ] **색상**: Carbon 색상 팔레트 준수
- [ ] **간격**: 8px 단위 (2x Grid) 사용
- [ ] **버튼**: Carbon 버튼 스타일 (48px 높이 기본)
- [ ] **입력 필드**: 하단 테두리 스타일
- [ ] **테이블**: 48px 행 높이, 호버 효과
- [ ] **카드/타일**: 16px 패딩, 호버 배경
- [ ] **아이콘**: 20px 기본 사이즈
- [ ] **포커스 스타일**: `#0f62fe` 아웃라인 (2px)
- [ ] **반응형**: Carbon breakpoints 준수

### 코드 예시

```tsx
// ✅ 올바른 예시
<button className="btn-carbon-primary">
  저장
</button>

<input 
  className="input-carbon w-full" 
  placeholder="검색어 입력"
/>

<div className="tile-carbon">
  <h3 className="text-sm font-semibold text-[#161616]">타일 제목</h3>
  <p className="text-sm text-[#525252] mt-1">설명 텍스트</p>
</div>

// ❌ 잘못된 예시 (Carbon 스타일 미적용)
<button className="bg-blue-500 rounded-md px-4 py-2">
  저장
</button>
```

---

## 🔗 참고 자료

- [Carbon Design System](https://carbondesignsystem.com/)
- [Carbon React Components](https://react.carbondesignsystem.com/)
- [Carbon Icons](https://www.carbondesignsystem.com/guidelines/icons/library/)
- [Carbon Color Tokens](https://carbondesignsystem.com/guidelines/color/tokens/)
- [Carbon Typography](https://carbondesignsystem.com/guidelines/typography/overview/)
- [Carbon Motion](https://carbondesignsystem.com/guidelines/motion/overview/)
