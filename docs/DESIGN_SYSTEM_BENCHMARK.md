# 디자인 시스템 벤치마킹 가이드

## 개요

AI Factory Lab의 UI/UX를 대기업 수준으로 향상시키기 위한 디자인 시스템 벤치마킹 가이드입니다.

---

## 🏢 대기업 디자인 시스템 분석

### 1. Microsoft Fluent UI
- **URL**: https://fluent2.microsoft.design
- **특징**: 깔끔함, 접근성, 일관성
- **컬러**: 밝은 배경, 파란색 계열 액센트
- **적용 제품**: Teams, Office 365, Dynamics 365

**핵심 원칙**:
```
- Depth (깊이감): 그림자와 레이어로 계층 표현
- Motion (움직임): 부드러운 애니메이션
- Material (재질): 반투명, 아크릴 효과
```

### 2. SAP Fiori (ERP 특화)
- **URL**: https://experience.sap.com/fiori-design
- **특징**: 데이터 밀도 높음, 작업 효율성
- **컬러**: 흰 배경, 오렌지/블루 액센트
- **적용 제품**: SAP S/4HANA, ERP

**핵심 원칙**:
```
- Role-based: 역할별 최적화 화면
- Simple: 복잡함 제거
- Coherent: 일관된 경험
- Instant: 빠른 응답
- Adaptive: 반응형
```

### 3. Ant Design (실용적)
- **URL**: https://ant.design
- **특징**: 풍부한 컴포넌트, 중국 대기업 사용
- **컬러**: 파란색 계열, 깔끔한 배경
- **적용 제품**: 알리바바, 텐센트 서비스

### 4. Salesforce Lightning
- **URL**: https://lightningdesignsystem.com
- **특징**: 데이터 테이블, 대시보드 특화
- **컬러**: 파란색 계열, 다양한 상태 색상

---

## 🎨 즉시 적용 가능한 개선 사항

### A. 색상 팔레트 (Fluent 스타일)

```css
/* globals.css */
:root {
  /* Primary - Microsoft Blue */
  --primary: 210 100% 50%;
  --primary-foreground: 0 0% 100%;
  
  /* Backgrounds - 미세한 그라데이션 */
  --background: 0 0% 98%;
  --card: 0 0% 100%;
  
  /* Accent - 깊이감 */
  --accent: 210 40% 96%;
  
  /* Shadows - 레이어 효과 */
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --shadow-md: 0 4px 6px rgba(0,0,0,0.07);
  --shadow-lg: 0 10px 15px rgba(0,0,0,0.1);
}
```

### B. 사이드바 개선 (SAP Fiori 스타일)

```tsx
// 변경 전: 평면적
<aside className="border-r bg-background">

// 변경 후: 그림자 + 세련됨
<aside className="bg-white shadow-lg border-r-0">
```

### C. 카드 컴포넌트 (Fluent 스타일)

```tsx
// 변경 전: 단순 테두리
<Card className="border">

// 변경 후: 그림자 + 호버 효과
<Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
```

### D. 버튼 스타일 (Microsoft 스타일)

```tsx
// 변경 전: 기본
<Button>저장</Button>

// 변경 후: 둥근 모서리 + 미세한 그라데이션
<Button className="rounded-md bg-gradient-to-b from-blue-500 to-blue-600 
                   hover:from-blue-600 hover:to-blue-700">
  저장
</Button>
```

---

## 🛠️ 구현 옵션

### Option 1: shadcn/ui 테마 커스터마이징 (권장)
- 현재 사용 중인 shadcn/ui 테마를 수정
- 작업량: 중간
- 일관성: 높음

### Option 2: Ant Design 도입
```bash
npm install antd @ant-design/icons
```
- 풍부한 ERP 컴포넌트
- 테이블, 폼, 차트 등 완성도 높음
- 작업량: 높음 (전체 교체)

### Option 3: Fluent UI React 도입
```bash
npm install @fluentui/react-components
```
- Microsoft 스타일
- 작업량: 높음 (전체 교체)

### Option 4: 하이브리드 (현실적)
- shadcn/ui 기반 유지
- 색상/그림자/애니메이션만 대기업 스타일 적용
- 작업량: 낮음
- 추천: ⭐⭐⭐⭐⭐

---

## 📐 구체적인 UI 개선 포인트

### 1. 사이드바 (현재 → 개선)

| 항목 | 현재 | 개선 |
|------|------|------|
| 배경 | 흰색 + 테두리 | 흰색 + 그림자 |
| 메뉴 아이템 | 단순 hover | 배경색 + 좌측 강조선 |
| 접힘/펼침 | 즉시 | 부드러운 애니메이션 |
| 아이콘 | 단색 | 색상 + 배경 원형 |
| 구분선 | 없음 | 카테고리별 구분선 |

### 2. 헤더 (Fluent 스타일)

| 항목 | 현재 | 개선 |
|------|------|------|
| 높이 | 56px | 48px (더 콤팩트) |
| 배경 | 흰색 | 그라데이션 또는 블러 |
| 검색바 | 없음 | 중앙 검색바 추가 |
| 알림 | 없음 | 벨 아이콘 + 뱃지 |

### 3. 데이터 테이블 (SAP Fiori 스타일)

| 항목 | 현재 | 개선 |
|------|------|------|
| 헤더 | 회색 배경 | 고정 헤더 + 정렬 아이콘 |
| 행 | 단순 | 호버 시 배경색 |
| 선택 | 없음 | 체크박스 + 선택 상태 |
| 액션 | 버튼 | 아이콘 버튼 (더 깔끔) |

### 4. 대시보드 카드 (Lightning 스타일)

| 항목 | 현재 | 개선 |
|------|------|------|
| 그림자 | 없음 | shadow-md |
| 모서리 | 작음 | rounded-xl |
| 헤더 | 단순 | 아이콘 + 제목 + 더보기 |
| 데이터 | 텍스트 | 큰 숫자 + 변화량 |

---

## 🎯 우선순위 적용 계획

### Phase 1: 색상 & 그림자 (1-2시간)
- [ ] globals.css 색상 팔레트 업데이트
- [ ] 그림자 시스템 적용
- [ ] 버튼 스타일 개선

### Phase 2: 사이드바 리뉴얼 (2-3시간)
- [ ] 그림자 기반으로 변경
- [ ] 활성 메뉴 강조 (좌측 바)
- [ ] 호버 애니메이션

### Phase 3: 헤더 추가 (2-3시간)
- [ ] 글로벌 헤더 컴포넌트
- [ ] 검색바, 알림, 프로필

### Phase 4: 카드 & 테이블 (3-4시간)
- [ ] 대시보드 카드 리디자인
- [ ] 테이블 스타일 개선

---

## 🔗 참고 자료

### 디자인 시스템 공식 문서
- [Fluent UI](https://fluent2.microsoft.design)
- [Material Design 3](https://m3.material.io)
- [SAP Fiori](https://experience.sap.com/fiori-design)
- [Ant Design](https://ant.design)
- [Lightning Design](https://lightningdesignsystem.com)

### 실제 ERP 화면 참고
- [SAP Fiori Apps Library](https://fioriappslibrary.hana.ondemand.com)
- [Oracle Cloud UX](https://docs.oracle.com/en/cloud/saas/applications-common/22d/fauix/)

### shadcn/ui 테마 예제
- [shadcn Themes](https://ui.shadcn.com/themes)
- [shadcn Examples](https://ui.shadcn.com/examples)

---

## 💡 추천 액션

**즉시 적용 (가장 효과적)**:
1. 사이드바에 그림자 추가 + 테두리 제거
2. 활성 메뉴에 좌측 강조 바 추가
3. 카드에 그림자 추가
4. 버튼 호버 애니메이션 추가

이 작은 변화만으로도 "전문적인" 느낌이 크게 향상됩니다.

---

*작성일: 2025-12-05*
