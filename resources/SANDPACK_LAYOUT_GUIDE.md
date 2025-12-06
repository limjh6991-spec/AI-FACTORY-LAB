# Sandpack & AG Grid 레이아웃 문제 해결 가이드

## 📋 문제 개요

Sandpack 미리보기에서 AG Grid가 올바르게 표시되지 않는 문제에 대한 종합 가이드입니다.

### 현상
- Sandpack iframe 내에서 AG Grid 영역이 축소되거나 보이지 않음
- 흰색 영역 아래 회색 빈 공간이 활용되지 않음
- 높이 100%가 제대로 적용되지 않음

---

## 🔍 근본 원인 분석

### 1. CSS 높이 상속 체인 문제

```
부모 요소에 명시적 높이가 없으면 자식의 height: 100%는 동작하지 않음

html → body → #root → App → div → AgGridReact
         ↑
   모든 요소에 height: 100% 필요
```

### 2. Flexbox와 높이

```css
/* 잘못된 방식 */
.container {
  display: flex;
  flex-direction: column;
}
.child {
  flex: 1;  /* 부모에 높이가 없으면 동작하지 않음 */
}

/* 올바른 방식 */
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;  /* 또는 명시적 픽셀 값 */
}
.child {
  flex: 1;
  min-height: 0;  /* 중요: overflow 계산을 위해 필요 */
}
```

### 3. iframe 내부 높이 계산

Sandpack은 내부적으로 iframe을 사용합니다:
- iframe 내부의 `100vh`는 **iframe 자체의 뷰포트**를 기준으로 함
- 부모 컨테이너가 iframe에 높이를 제대로 전달해야 함

---

## 📚 Sandpack 공식 문서 요약

### 레이아웃 옵션

```tsx
<Sandpack
  options={{
    // 에디터 높이 설정 (기본값: 300px)
    editorHeight: 500,
    
    // 에디터 너비 비율 (기본값: 50%)
    editorWidthPercentage: 60,
    
    // 레이아웃 모드: 'preview' | 'tests' | 'console'
    layout: 'preview',
    
    // 클래스 커스터마이징
    classes: {
      "sp-wrapper": "custom-wrapper",
      "sp-layout": "custom-layout",
    },
  }}
/>
```

### 커스텀 스타일링

```tsx
// Stitches 기반 스타일링 (classer 패턴)
<Sandpack
  options={{
    classes: {
      "sp-wrapper": "my-wrapper-class",
      "sp-layout": "my-layout-class",
      "sp-tab-button": "my-tab-class",
    },
  }}
/>
```

### 컴포넌트 직접 사용

```tsx
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
} from "@codesandbox/sandpack-react";

<SandpackProvider template="react">
  <SandpackLayout style={{ height: "500px" }}>
    <SandpackCodeEditor />
    <SandpackPreview />
  </SandpackLayout>
</SandpackProvider>
```

---

## 📚 AG Grid 높이 설정 가이드

### 공식 권장사항

> "If using % for your height, then make sure the container you are putting 
> the grid into also has height specified, as the browser will fit the div 
> according to a percentage of the parent's height, and if the parent has 
> no height, then this % will always be zero."

### 방법 1: 고정 픽셀 높이 (권장)

```tsx
<div className="ag-theme-alpine" style={{ width: '100%', height: 500 }}>
  <AgGridReact rowData={rowData} columnDefs={columnDefs} />
</div>
```

### 방법 2: 퍼센트 높이 (부모 높이 필수)

```tsx
// 부모에 명시적 높이 필요
<div style={{ height: '100vh' }}>
  <div className="ag-theme-alpine" style={{ width: '100%', height: '100%' }}>
    <AgGridReact rowData={rowData} columnDefs={columnDefs} />
  </div>
</div>
```

### 방법 3: Auto Height (소량 데이터용)

```tsx
<div className="ag-theme-alpine" style={{ width: '100%' }}>
  <AgGridReact 
    rowData={rowData} 
    columnDefs={columnDefs}
    domLayout="autoHeight"  // 행 수에 맞게 자동 높이
  />
</div>
```

⚠️ **주의**: Auto Height는 1000행 이상에서 성능 문제 발생

---

## 📚 CSS Flexbox 핵심 개념

### 부모 컨테이너 속성

```css
.container {
  display: flex;
  flex-direction: column;  /* 세로 방향 */
  
  /* 정렬 */
  justify-content: flex-start;  /* 주축 정렬 */
  align-items: stretch;         /* 교차축 정렬 */
  
  /* 래핑 */
  flex-wrap: nowrap;
  
  /* 간격 */
  gap: 10px;
}
```

### 자식 아이템 속성

```css
.item {
  flex: 1;           /* flex-grow: 1, flex-shrink: 1, flex-basis: 0% */
  /* 또는 */
  flex: 1 1 auto;    /* flex-grow: 1, flex-shrink: 1, flex-basis: auto */
  
  min-height: 0;     /* 중요: flexbox에서 overflow 동작을 위해 필요 */
  
  /* 개별 정렬 */
  align-self: stretch;
}
```

### flex: 1 vs flex: 1 1 auto

| 속성 | flex-grow | flex-shrink | flex-basis | 설명 |
|------|-----------|-------------|------------|------|
| `flex: 1` | 1 | 1 | 0% | 콘텐츠 무시하고 동일 크기 |
| `flex: 1 1 auto` | 1 | 1 | auto | 콘텐츠 크기 기반으로 성장 |
| `flex: auto` | 1 | 1 | auto | `flex: 1 1 auto`와 동일 |

### 높이 100% 체인 설정

```css
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
}

#root {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.app-container {
  flex: 1;
  min-height: 0;  /* 중요! */
  display: flex;
  flex-direction: column;
}

.grid-container {
  flex: 1;
  min-height: 0;  /* 중요! */
}
```

---

## 🛠️ Sandpack + AG Grid 해결 방안

### 방안 1: 고정 높이 사용 (가장 안정적)

```tsx
// 생성되는 React 코드
return (
  <div style={{ padding: 16 }}>
    <h1>화면명</h1>
    <div className="ag-theme-alpine" style={{ height: 500, width: '100%' }}>
      <AgGridReact {...props} />
    </div>
  </div>
);
```

### 방안 2: Sandpack styles.css에서 높이 체인 설정

```css
/* Sandpack files의 styles.css */
html, body, #root {
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

#root {
  display: flex;
  flex-direction: column;
}

.ag-theme-alpine {
  flex: 1;
  min-height: 400px;  /* 최소 높이 보장 */
}
```

### 방안 3: SandpackLayout에 높이 직접 지정

```tsx
<SandpackLayout
  style={{ 
    height: "600px",  // 명시적 높이
    borderRadius: 0,
  }}
>
  <SandpackCodeEditor />
  <SandpackPreview />
</SandpackLayout>
```

### 방안 4: 부모 컨테이너 calc() 사용

```tsx
<div style={{ height: 'calc(100vh - 300px)', minHeight: 400 }}>
  <SandpackPreview code={code} />
</div>
```

---

## 🐛 일반적인 문제와 해결책

### 문제 1: AG Grid가 높이 0으로 렌더링

**원인**: 부모 컨테이너에 높이가 없음

**해결**:
```css
.grid-wrapper {
  height: 500px;  /* 또는 명시적 값 */
}
```

### 문제 2: flex: 1이 동작하지 않음

**원인**: 부모에 높이가 없거나 min-height: 0 누락

**해결**:
```css
.parent {
  display: flex;
  flex-direction: column;
  height: 100vh;  /* 부모 높이 필수 */
}
.child {
  flex: 1;
  min-height: 0;  /* 추가 필요 */
}
```

### 문제 3: iframe 내부 100vh가 이상함

**원인**: iframe의 뷰포트는 iframe 크기 기준

**해결**:
```tsx
// iframe 대신 고정 픽셀 높이 사용
<div style={{ height: 500 }}>...</div>
```

### 문제 4: Sandpack 컴포넌트가 리렌더링되지 않음

**원인**: SandpackProvider에 key가 없음

**해결**:
```tsx
<SandpackProvider
  key={`sandpack-${code.length}`}  // 코드 변경 시 리렌더링
  files={files}
>
```

---

## 📋 체크리스트

### Sandpack 설정

- [ ] SandpackLayout에 명시적 height 설정
- [ ] SandpackProvider에 key prop 추가 (코드 변경 감지용)
- [ ] styles.css에 html, body, #root 높이 체인 설정

### AG Grid 설정

- [ ] ag-theme-alpine div에 명시적 height 설정
- [ ] 부모 컨테이너에 높이 설정 확인
- [ ] domLayout 옵션 확인 (normal이 기본값)

### CSS Flexbox 설정

- [ ] 모든 flex 컨테이너에 height 또는 flex: 1 설정
- [ ] flex: 1 사용 시 min-height: 0 추가
- [ ] 부모-자식 높이 체인 확인

---

## 🔗 참고 자료

### Sandpack
- [Sandpack Layout 공식 문서](https://sandpack.codesandbox.io/docs/getting-started/layout)
- [Sandpack Components](https://sandpack.codesandbox.io/docs/advanced-usage/components)
- [Sandpack GitHub Issues](https://github.com/codesandbox/sandpack/issues)

### AG Grid
- [AG Grid Layout - React](https://www.ag-grid.com/react-data-grid/grid-size/)
- [AG Grid Layout - JavaScript](https://www.ag-grid.com/javascript-data-grid/grid-size/)

### CSS Flexbox
- [CSS-Tricks Flexbox Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [MDN Flexbox Use Cases](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout/Typical_use_cases_of_flexbox)

---

## 📝 결론

### 권장 해결 방법 우선순위

1. **AG Grid에 고정 픽셀 높이 사용** (500px 등) - 가장 안정적
2. **SandpackLayout에 명시적 높이 지정** - Sandpack 컨테이너 제어
3. **styles.css에서 높이 체인 완성** - CSS 레벨 해결
4. **calc()로 동적 높이 계산** - 반응형 필요 시

### 핵심 원칙

> **"명시적 픽셀 높이가 퍼센트 높이보다 항상 안전하다"**
> 
> iframe 환경에서는 뷰포트 기반 단위(vh, %)보다 
> 고정 픽셀 값이 예측 가능한 결과를 제공합니다.

---

*문서 작성일: 2025년 12월 6일*
*AI Factory Lab 프로젝트*
