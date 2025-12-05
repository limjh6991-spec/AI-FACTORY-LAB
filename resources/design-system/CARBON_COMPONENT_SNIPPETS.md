# IBM Carbon Design System - Component Snippets

> 화면 생성 시 복사-붙여넣기용 코드 스니펫 모음

---

## 🔘 Buttons

### Primary Button

```tsx
<button className="bg-[#0f62fe] text-white px-4 py-3 text-sm font-normal hover:bg-[#0353e9] active:bg-[#002d9c] focus:outline-none focus:ring-2 focus:ring-[#0f62fe] focus:ring-offset-2 disabled:bg-[#c6c6c6] disabled:text-[#8d8d8d] disabled:cursor-not-allowed transition-colors">
  저장
</button>
```

### Secondary Button

```tsx
<button className="bg-[#393939] text-white px-4 py-3 text-sm font-normal hover:bg-[#4c4c4c] active:bg-[#6f6f6f] transition-colors">
  취소
</button>
```

### Ghost Button

```tsx
<button className="bg-transparent text-[#0f62fe] px-4 py-3 text-sm font-normal hover:bg-[#e8e8e8] active:bg-[#c6c6c6] transition-colors">
  더보기
</button>
```

### Danger Button

```tsx
<button className="bg-[#da1e28] text-white px-4 py-3 text-sm font-normal hover:bg-[#b81921] active:bg-[#750e13] transition-colors">
  삭제
</button>
```

### Icon Button

```tsx
<button className="p-3 text-[#525252] hover:bg-[#e8e8e8] hover:text-[#161616] transition-colors rounded">
  <IconName className="h-5 w-5" />
</button>
```

### Button Group

```tsx
<div className="flex gap-2">
  <button className="bg-[#0f62fe] text-white px-4 py-3 text-sm hover:bg-[#0353e9]">
    저장
  </button>
  <button className="bg-[#393939] text-white px-4 py-3 text-sm hover:bg-[#4c4c4c]">
    취소
  </button>
</div>
```

---

## 📝 Form Inputs

### Text Input

```tsx
<div className="space-y-1">
  <label className="text-xs text-[#525252]">라벨</label>
  <input
    type="text"
    className="w-full bg-[#f4f4f4] border-0 border-b border-[#8d8d8d] h-10 px-4 text-sm text-[#161616] focus:border-b-2 focus:border-[#0f62fe] focus:outline-none placeholder:text-[#a8a8a8] disabled:bg-[#f4f4f4] disabled:border-transparent disabled:text-[#c6c6c6]"
    placeholder="입력하세요"
  />
  <p className="text-xs text-[#6f6f6f]">도움말 텍스트</p>
</div>
```

### Text Input with Error

```tsx
<div className="space-y-1">
  <label className="text-xs text-[#525252]">라벨</label>
  <input
    type="text"
    className="w-full bg-[#f4f4f4] border-0 border-b-2 border-[#da1e28] h-10 px-4 text-sm text-[#161616] focus:outline-none"
  />
  <p className="text-xs text-[#da1e28]">에러 메시지</p>
</div>
```

### Select

```tsx
<div className="space-y-1">
  <label className="text-xs text-[#525252]">선택</label>
  <select className="w-full bg-[#f4f4f4] border-0 border-b border-[#8d8d8d] h-10 px-4 text-sm text-[#161616] focus:border-b-2 focus:border-[#0f62fe] focus:outline-none appearance-none cursor-pointer">
    <option value="">선택하세요</option>
    <option value="1">옵션 1</option>
    <option value="2">옵션 2</option>
  </select>
</div>
```

### Textarea

```tsx
<div className="space-y-1">
  <label className="text-xs text-[#525252]">내용</label>
  <textarea
    className="w-full bg-[#f4f4f4] border-0 border-b border-[#8d8d8d] p-4 text-sm text-[#161616] focus:border-b-2 focus:border-[#0f62fe] focus:outline-none resize-none"
    rows={4}
    placeholder="내용을 입력하세요"
  />
</div>
```

### Checkbox

```tsx
<label className="flex items-center gap-2 cursor-pointer">
  <input
    type="checkbox"
    className="w-4 h-4 border border-[#8d8d8d] rounded-sm bg-white checked:bg-[#0f62fe] checked:border-[#0f62fe] focus:ring-2 focus:ring-[#0f62fe] focus:ring-offset-2"
  />
  <span className="text-sm text-[#161616]">체크박스 라벨</span>
</label>
```

### Radio Button

```tsx
<label className="flex items-center gap-2 cursor-pointer">
  <input
    type="radio"
    name="radioGroup"
    className="w-4 h-4 border border-[#8d8d8d] rounded-full bg-white checked:border-[#0f62fe] checked:bg-[#0f62fe] focus:ring-2 focus:ring-[#0f62fe] focus:ring-offset-2"
  />
  <span className="text-sm text-[#161616]">라디오 라벨</span>
</label>
```

### Toggle Switch

```tsx
<label className="flex items-center gap-2 cursor-pointer">
  <div className="relative">
    <input type="checkbox" className="sr-only peer" />
    <div className="w-12 h-6 bg-[#8d8d8d] rounded-full peer-checked:bg-[#24a148] transition-colors" />
    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-6" />
  </div>
  <span className="text-sm text-[#161616]">토글 라벨</span>
</label>
```

### Search Input

```tsx
<div className="relative">
  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8d8d8d]" />
  <input
    type="text"
    className="w-full bg-[#f4f4f4] border-0 border-b border-[#8d8d8d] h-10 pl-10 pr-4 text-sm text-[#161616] focus:border-b-2 focus:border-[#0f62fe] focus:outline-none"
    placeholder="검색..."
  />
</div>
```

---

## 📦 Cards & Tiles

### Basic Card

```tsx
<div className="bg-white shadow-sm border-t-[3px] border-t-[#0f62fe]">
  <div className="px-5 py-4 border-b border-[#e0e0e0]">
    <h3 className="text-sm font-semibold text-[#161616]">카드 제목</h3>
  </div>
  <div className="p-5">
    <p className="text-sm text-[#525252]">카드 내용</p>
  </div>
</div>
```

### Stat Card

```tsx
<div className="bg-white shadow-sm border-t-[3px] border-t-[#0f62fe] p-5">
  <div className="flex items-start justify-between">
    <div>
      <p className="text-xs text-[#525252] font-medium uppercase tracking-wide">매출</p>
      <p className="text-2xl font-semibold text-[#161616] mt-1">₩45,231,000</p>
      <div className="flex items-center gap-1 mt-2">
        <span className="text-xs text-[#24a148]">↑ 12.5%</span>
        <span className="text-xs text-[#8d8d8d]">전월 대비</span>
      </div>
    </div>
    <div className="p-2 bg-[#edf5ff] rounded">
      <DollarSign className="h-5 w-5 text-[#0f62fe]" />
    </div>
  </div>
</div>
```

### Clickable Tile

```tsx
<button className="w-full text-left bg-[#f4f4f4] p-4 hover:bg-[#e0e0e0] focus:outline-none focus:ring-2 focus:ring-[#0f62fe] focus:ring-inset transition-colors">
  <div className="flex items-start gap-3">
    <div className="p-2 bg-[#e0e0e0] rounded">
      <Icon className="h-5 w-5 text-[#161616]" />
    </div>
    <div>
      <h4 className="text-sm font-semibold text-[#161616]">타일 제목</h4>
      <p className="text-xs text-[#525252] mt-1">설명 텍스트</p>
    </div>
  </div>
</button>
```

### List Card

```tsx
<div className="bg-white shadow-sm border-t-[3px] border-t-[#da1e28]">
  <div className="px-5 py-4 border-b border-[#e0e0e0]">
    <h3 className="text-sm font-semibold text-[#161616]">알림</h3>
  </div>
  <ul className="divide-y divide-[#e0e0e0]">
    {items.map((item) => (
      <li key={item.id} className="px-5 py-3 hover:bg-[#f4f4f4] cursor-pointer">
        <div className="flex items-center justify-between">
          <span className="text-sm text-[#161616]">{item.label}</span>
          <span className="text-sm font-medium text-[#0f62fe]">{item.value}</span>
        </div>
        <p className="text-xs text-[#8d8d8d] mt-0.5">{item.subLabel}</p>
      </li>
    ))}
  </ul>
</div>
```

---

## 📊 Data Table

### Basic Table

```tsx
<div className="bg-white shadow-sm">
  {/* Toolbar */}
  <div className="px-4 py-3 border-b border-[#e0e0e0] flex items-center justify-between">
    <h3 className="text-sm font-semibold text-[#161616]">테이블 제목</h3>
    <div className="flex items-center gap-2">
      <button className="p-2 text-[#525252] hover:bg-[#f4f4f4] rounded">
        <Download className="h-4 w-4" />
      </button>
      <button className="p-2 text-[#525252] hover:bg-[#f4f4f4] rounded">
        <Settings className="h-4 w-4" />
      </button>
    </div>
  </div>

  {/* Table */}
  <table className="w-full">
    <thead>
      <tr className="bg-[#e0e0e0]">
        <th className="h-12 px-4 text-left text-sm font-semibold text-[#161616]">이름</th>
        <th className="h-12 px-4 text-left text-sm font-semibold text-[#161616]">상태</th>
        <th className="h-12 px-4 text-right text-sm font-semibold text-[#161616]">금액</th>
      </tr>
    </thead>
    <tbody>
      {data.map((row) => (
        <tr key={row.id} className="border-b border-[#e0e0e0] hover:bg-[#f4f4f4]">
          <td className="h-12 px-4 text-sm text-[#161616]">{row.name}</td>
          <td className="h-12 px-4 text-sm text-[#161616]">
            <span className="px-2 py-0.5 bg-[#24a148] text-white text-xs rounded-full">
              {row.status}
            </span>
          </td>
          <td className="h-12 px-4 text-sm text-[#161616] text-right">{row.amount}</td>
        </tr>
      ))}
    </tbody>
  </table>

  {/* Pagination */}
  <div className="px-4 py-3 border-t border-[#e0e0e0] flex items-center justify-between">
    <span className="text-xs text-[#525252]">1-10 / 100개</span>
    <div className="flex items-center gap-1">
      <button className="p-2 text-[#525252] hover:bg-[#f4f4f4] rounded disabled:opacity-50">
        <ChevronLeft className="h-4 w-4" />
      </button>
      <button className="p-2 text-[#525252] hover:bg-[#f4f4f4] rounded">
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  </div>
</div>
```

### Table Row States

```tsx
{/* Normal Row */}
<tr className="border-b border-[#e0e0e0] hover:bg-[#f4f4f4]">
  ...
</tr>

{/* Selected Row */}
<tr className="border-b border-[#e0e0e0] bg-[#d0e2ff]">
  ...
</tr>

{/* Zebra Striping */}
<tr className="border-b border-[#e0e0e0] even:bg-[#f4f4f4] hover:bg-[#e8e8e8]">
  ...
</tr>
```

---

## 🧭 Navigation

### Side Navigation Item

```tsx
<button className="w-full h-12 px-4 flex items-center gap-3 text-sm text-[#c6c6c6] border-l-[3px] border-l-transparent hover:bg-[#393939] hover:text-white transition-colors">
  <Icon className="h-5 w-5" />
  <span>메뉴 이름</span>
</button>

{/* Active State */}
<button className="w-full h-12 px-4 flex items-center gap-3 text-sm text-white bg-[#393939] border-l-[3px] border-l-[#0f62fe]">
  <Icon className="h-5 w-5 text-[#0f62fe]" />
  <span>메뉴 이름</span>
</button>
```

### Breadcrumb

```tsx
<nav className="flex items-center gap-2 text-sm">
  <a href="/" className="text-[#0f62fe] hover:underline">홈</a>
  <span className="text-[#8d8d8d]">/</span>
  <a href="/category" className="text-[#0f62fe] hover:underline">카테고리</a>
  <span className="text-[#8d8d8d]">/</span>
  <span className="text-[#161616]">현재 페이지</span>
</nav>
```

### Tabs

```tsx
<div className="border-b border-[#e0e0e0]">
  <nav className="flex gap-0">
    {tabs.map((tab) => (
      <button
        key={tab.id}
        className={cn(
          "px-4 py-3 text-sm font-medium border-b-2 -mb-px transition-colors",
          activeTab === tab.id
            ? "border-[#0f62fe] text-[#161616]"
            : "border-transparent text-[#525252] hover:text-[#161616] hover:border-[#c6c6c6]"
        )}
      >
        {tab.label}
      </button>
    ))}
  </nav>
</div>
```

---

## 💬 Feedback

### Notification / Toast

```tsx
{/* Info */}
<div className="flex items-start gap-3 bg-[#edf5ff] border-l-[3px] border-l-[#0f62fe] p-4">
  <Info className="h-5 w-5 text-[#0f62fe] shrink-0" />
  <div>
    <p className="text-sm font-semibold text-[#161616]">알림 제목</p>
    <p className="text-sm text-[#525252] mt-1">알림 내용입니다.</p>
  </div>
  <button className="ml-auto p-1 hover:bg-[#d0e2ff] rounded">
    <X className="h-4 w-4 text-[#161616]" />
  </button>
</div>

{/* Success */}
<div className="flex items-start gap-3 bg-[#defbe6] border-l-[3px] border-l-[#24a148] p-4">
  <CheckCircle className="h-5 w-5 text-[#24a148] shrink-0" />
  <p className="text-sm text-[#161616]">성공 메시지</p>
</div>

{/* Error */}
<div className="flex items-start gap-3 bg-[#fff1f1] border-l-[3px] border-l-[#da1e28] p-4">
  <AlertCircle className="h-5 w-5 text-[#da1e28] shrink-0" />
  <p className="text-sm text-[#161616]">에러 메시지</p>
</div>

{/* Warning */}
<div className="flex items-start gap-3 bg-[#fcf4d6] border-l-[3px] border-l-[#f1c21b] p-4">
  <AlertTriangle className="h-5 w-5 text-[#f1c21b] shrink-0" />
  <p className="text-sm text-[#161616]">경고 메시지</p>
</div>
```

### Badge / Tag

```tsx
{/* Default */}
<span className="px-2 py-1 bg-[#e0e0e0] text-[#161616] text-xs font-medium rounded-full">
  라벨
</span>

{/* Blue */}
<span className="px-2 py-1 bg-[#d0e2ff] text-[#0043ce] text-xs font-medium rounded-full">
  정보
</span>

{/* Green */}
<span className="px-2 py-1 bg-[#defbe6] text-[#198038] text-xs font-medium rounded-full">
  성공
</span>

{/* Red */}
<span className="px-2 py-1 bg-[#ffd7d9] text-[#a2191f] text-xs font-medium rounded-full">
  에러
</span>

{/* Yellow */}
<span className="px-2 py-1 bg-[#fcf4d6] text-[#8e6a00] text-xs font-medium rounded-full">
  경고
</span>

{/* Purple */}
<span className="px-2 py-1 bg-[#e8daff] text-[#6929c4] text-xs font-medium rounded-full">
  신규
</span>
```

### Loading Spinner

```tsx
<div className="flex items-center justify-center">
  <div className="w-6 h-6 border-2 border-[#c6c6c6] border-t-[#0f62fe] rounded-full animate-spin" />
</div>
```

### Progress Bar

```tsx
<div className="space-y-2">
  <div className="flex items-center justify-between">
    <span className="text-xs text-[#525252]">진행률</span>
    <span className="text-xs text-[#161616] font-medium">75%</span>
  </div>
  <div className="h-1 bg-[#e0e0e0] rounded-full overflow-hidden">
    <div className="h-full bg-[#0f62fe] w-[75%] transition-all duration-300" />
  </div>
</div>
```

---

## 🪟 Modal

### Basic Modal

```tsx
<div className="fixed inset-0 z-50 flex items-center justify-center">
  {/* Overlay */}
  <div className="fixed inset-0 bg-black/50" onClick={onClose} />
  
  {/* Modal */}
  <div className="relative bg-white w-full max-w-[640px] max-h-[84vh] overflow-hidden shadow-xl">
    {/* Header */}
    <div className="px-6 py-4 border-b border-[#e0e0e0]">
      <h2 className="text-xl font-semibold text-[#161616]">모달 제목</h2>
    </div>
    
    {/* Content */}
    <div className="px-6 py-4 overflow-y-auto">
      <p className="text-sm text-[#525252]">모달 내용</p>
    </div>
    
    {/* Footer */}
    <div className="px-6 py-4 border-t border-[#e0e0e0] flex justify-end gap-2">
      <button className="bg-[#393939] text-white px-4 py-3 text-sm hover:bg-[#4c4c4c]">
        취소
      </button>
      <button className="bg-[#0f62fe] text-white px-4 py-3 text-sm hover:bg-[#0353e9]">
        확인
      </button>
    </div>
  </div>
</div>
```

### Danger Modal

```tsx
<div className="relative bg-white w-full max-w-[480px] shadow-xl">
  <div className="px-6 py-4">
    <div className="flex items-start gap-3">
      <div className="p-2 bg-[#fff1f1] rounded-full">
        <AlertTriangle className="h-5 w-5 text-[#da1e28]" />
      </div>
      <div>
        <h2 className="text-lg font-semibold text-[#161616]">삭제 확인</h2>
        <p className="text-sm text-[#525252] mt-2">
          이 작업은 되돌릴 수 없습니다. 정말 삭제하시겠습니까?
        </p>
      </div>
    </div>
  </div>
  <div className="px-6 py-4 bg-[#f4f4f4] flex justify-end gap-2">
    <button className="bg-[#393939] text-white px-4 py-3 text-sm hover:bg-[#4c4c4c]">
      취소
    </button>
    <button className="bg-[#da1e28] text-white px-4 py-3 text-sm hover:bg-[#b81921]">
      삭제
    </button>
  </div>
</div>
```

---

## 📄 Page Layout

### Page Header

```tsx
<div className="flex items-center justify-between mb-6">
  <div>
    <h1 className="text-2xl font-semibold text-[#161616]">페이지 제목</h1>
    <p className="text-sm text-[#525252] mt-1">페이지 설명</p>
  </div>
  <div className="flex items-center gap-2">
    <button className="bg-[#393939] text-white px-4 py-3 text-sm hover:bg-[#4c4c4c]">
      취소
    </button>
    <button className="bg-[#0f62fe] text-white px-4 py-3 text-sm hover:bg-[#0353e9]">
      저장
    </button>
  </div>
</div>
```

### Section Divider

```tsx
<div className="my-6 border-t border-[#e0e0e0]" />
```

### Empty State

```tsx
<div className="flex flex-col items-center justify-center py-16">
  <div className="p-4 bg-[#f4f4f4] rounded-full mb-4">
    <Inbox className="h-8 w-8 text-[#8d8d8d]" />
  </div>
  <h3 className="text-lg font-semibold text-[#161616]">데이터가 없습니다</h3>
  <p className="text-sm text-[#525252] mt-1">새로운 항목을 추가해 주세요.</p>
  <button className="mt-4 bg-[#0f62fe] text-white px-4 py-3 text-sm hover:bg-[#0353e9]">
    항목 추가
  </button>
</div>
```
