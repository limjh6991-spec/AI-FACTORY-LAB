# 웹 제작 도구 레이아웃 관리 상세 가이드

> WordPress, Wix, Webflow, Squarespace, Framer, Builder.io, Retool 아키텍처 분석

---

## 1. WordPress Gutenberg

### 블록 저장 방식
```html
<!-- wp:columns {"align":"wide"} -->
<div class="wp-block-columns alignwide">
    <!-- wp:column {"width":"66.66%"} -->
    <div class="wp-block-column" style="flex-basis:66.66%">
        <!-- wp:paragraph -->
        <p>내용</p>
        <!-- /wp:paragraph -->
    </div>
    <!-- /wp:column -->
</div>
<!-- /wp:columns -->
```

### 핵심 특징
| 항목 | 설명 |
|------|------|
| **저장** | HTML 주석 내 JSON 속성 |
| **Static Block** | HTML 직접 저장 → 그대로 출력 |
| **Dynamic Block** | 속성만 저장 → PHP에서 렌더링 |
| **레이아웃** | Columns, Group, Cover 블록 |

---

## 2. Webflow

### 아키텍처
```
Designer (Visual Editor)
    ↓
JSON Schema (내부 저장)
    ↓
DevLink → React Components
    ↓
SSR + Hydration
```

### 핵심 특징
| 항목 | 설명 |
|------|------|
| **렌더링** | Server-Side Rendering + Client Hydration |
| **격리** | Shadow DOM으로 스타일 격리 |
| **코드 출력** | 클린 HTML/CSS/JS 생성 |
| **그리드** | CSS Grid + Flexbox |

---

## 3. Wix

### 데이터 구조
```json
{
  "type": "Container",
  "id": "comp-1234",
  "layout": {
    "width": 980,
    "height": 500,
    "x": 0,
    "y": 100
  },
  "children": [
    { "type": "Text", "content": "Hello" },
    { "type": "Image", "src": "image.jpg" }
  ]
}
```

### 핵심 특징
| 항목 | 설명 |
|------|------|
| **렌더링** | JSON → DOM (React 기반) |
| **AI** | 레이아웃/텍스트 AI 자동 생성 |
| **편집** | 절대 위치 기반 드래그 |
| **호스팅** | Wix 서버에서 호스팅 |

---

## 4. Squarespace

### 핵심 특징
| 항목 | 설명 |
|------|------|
| **그리드** | Fluid Engine (반응형 비율 기반) |
| **레이아웃** | 레이아웃 스위처로 패턴 적용 |
| **모바일** | 데스크톱과 독립적으로 편집 가능 |
| **반응형** | 자동으로 모든 기기 대응 |

---

## 5. Framer

### 핵심 특징
| 항목 | 설명 |
|------|------|
| **그리드** | 8/12/16/20열 반응형 그리드 |
| **접근법** | Mobile-First 디자인 권장 |
| **Breakpoint** | 기기별 레이아웃 제어 |
| **Auto-layout** | Stack 기반 자동 정렬 |

---

## 6. Builder.io

### 레이아웃 시스템
```
Box Model
├── Section (전체 너비)
├── Columns (좌우 분할)
└── Box (컨테이너)
```

### 핵심 특징
| 항목 | 설명 |
|------|------|
| **렌더링** | React/Vue/Next.js SDK |
| **반응형** | % 너비, Auto 권장 |
| **통합** | Figma → 코드 자동 변환 |
| **커스텀** | 개발자 커스텀 컴포넌트 등록 |

---

## 7. Retool (기업용 Low-Code)

### 레이아웃 시스템
```
Canvas
├── Row
│   ├── Column (33%)
│   └── Column (67%)
└── Stack (Flexbox)
```

### JSON Schema Form
```json
{
  "type": "object",
  "properties": {
    "name": { "type": "string", "title": "이름" },
    "email": { "type": "string", "format": "email" }
  }
}
```

### 핵심 특징
| 항목 | 설명 |
|------|------|
| **레이아웃** | Grid + Flexbox (Stacks) |
| **폼 생성** | JSON Schema → 폼 자동 생성 |
| **DB 연동** | PostgreSQL/MySQL 스키마 → UI |
| **모듈** | 재사용 가능한 컴포넌트 그룹 |

---

## 8. 공통 패턴 정리

### 데이터 저장 방식
| 도구 | 저장 형식 |
|------|----------|
| WordPress | HTML 주석 + JSON |
| Webflow | Internal JSON Schema |
| Wix | JSON (좌표 기반) |
| Builder.io | JSON + API |
| Retool | JSON Schema |

### 레이아웃 시스템
| 도구 | 그리드 | 반응형 |
|------|--------|--------|
| WordPress | Columns 블록 | Block 단위 |
| Webflow | CSS Grid | Breakpoints |
| Wix | 절대 위치 | 기기별 조정 |
| Squarespace | Fluid Engine | 자동 |
| Framer | 12열 그리드 | Mobile-First |
| Builder.io | Columns | % 기반 |
| Retool | Grid + Stack | 컴포넌트별 |

### 렌더링 방식
| 도구 | 방식 |
|------|------|
| WordPress Static | 저장된 HTML 직접 출력 |
| WordPress Dynamic | PHP render_callback |
| Webflow | SSR + Hydration |
| Wix | JSON → React → DOM |
| Builder.io | SDK (React/Vue) |
| Retool | Canvas + Components |

---

## 9. Screen Generator 적용 방안

### 현재 구현
```
Layout JSON → 칩 미리보기 → 수동 코드
```

### 권장 개선
```
Layout JSON → 실제 컴포넌트 미리보기 → 코드 자동 생성
              (WordPress Dynamic Block 방식)
```

### 참고할 패턴
1. **Retool**: JSON Schema → 폼/UI 자동 생성
2. **Webflow**: SSR 미리보기 + 코드 출력
3. **WordPress**: Static/Dynamic 블록 분리
4. **Builder.io**: 커스텀 컴포넌트 등록 시스템

---

**결론**: 모든 도구가 **JSON 기반 스키마 + 렌더러** 패턴 사용
