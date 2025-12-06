# 레이아웃 수정 이력

> 작성일: 2025-12-06

## 문제 상황

### 증상
- 모든 페이지에서 콘텐츠 상단이 Header(네비게이션 바)에 가려짐
- 특히 임시화면 관리 페이지(`/screens/temp`)에서 "임시화면 목록" 제목이 보이지 않음

### 원인
- `Header` 컴포넌트가 `fixed` 포지션으로 상단에 고정됨
- `main` 영역에 해당 높이만큼의 상단 여백(margin-top)이 없었음
- Header 높이: `h-14` (56px)

## 해결 방법

### 수정 파일
`/src/app/layout.tsx`

### 수정 내용
```diff
- <main className="flex-1 p-6">
+ <main className="flex-1 p-6 mt-14">
```

### 전체 레이아웃 구조
```tsx
<html>
  <body>
    <TRPCReactProvider>
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
          <Header />
          <main className="flex-1 p-6 mt-14">  {/* Header 높이만큼 margin-top */}
            {children}
          </main>
        </div>
      </div>
    </TRPCReactProvider>
  </body>
</html>
```

### 시각적 표현
```
┌─────────────────────────────────────────────────┐
│                    Header (h-14, fixed)          │ ← z-index: 높음
├─────────────────────────────────────────────────┤
│                    mt-14 (빈 공간)               │
├─────────────────────────────────────────────────┤
│                                                  │
│                    Main Content                  │
│                    (flex-1, p-6)                 │
│                                                  │
└─────────────────────────────────────────────────┘
```

## 관련 컴포넌트

### Header 컴포넌트
`/src/components/layout/Header.tsx`
```tsx
<header className="bg-white border-b border-gray-200 px-6 py-4 fixed top-0 right-0 left-64 z-10 h-14">
```

### Sidebar 컴포넌트
`/src/components/layout/Sidebar.tsx`
- 너비: `w-64` (256px)
- 높이: `h-screen` (전체 화면)

## 영향 받는 페이지

모든 페이지가 영향 받음:
- `/` (대시보드)
- `/settings/screen-generator`
- `/screens/temp`
- `/screens/[screenId]`
- 기타 모든 라우트

## 테스트 결과

- ✅ 임시화면 관리 페이지 상단 제목 정상 표시
- ✅ 대시보드 페이지 정상 표시
- ✅ 화면 생성기 페이지 정상 표시
- ✅ 스크롤 동작 정상
