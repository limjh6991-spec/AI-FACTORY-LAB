# 화면생성기 Excel 템플릿 명세서

## 개요
화면 생성을 위한 표준 Excel 템플릿 구조를 정의합니다. 이 템플릿을 사용하면 개발자가 Excel 파일만 작성하여 자동으로 React 화면을 생성할 수 있습니다.

---

## Excel 파일 구조

### 파일명 규칙
```
{화면ID}_{화면명}_템플릿.xlsx
예: SC004_자재수불부_템플릿.xlsx
```

### 시트 구성 (3개 시트)
1. **메타정보** - 화면의 기본 메타데이터 및 옵션 정의
2. **그리드컬럼** - AG Grid 컬럼 정의 (헤더 구조, 병합 셀 포함)
3. **샘플데이터** - 샘플 데이터

---

## 시트 1: 메타정보

### 구조
| 항목명 | 값 |
|--------|-----|
| 화면정의서 | |
| 화면명 | 자재수불부 |
| 화면명(영문) | Material Inventory Ledger |
| 테이블명 | doi_material_resc |
| 옵션 | 년월, 자재 |

### 사용 가능한 옵션
| 옵션명 | 컴포넌트 | 설명 |
|--------|----------|------|
| 년월 | YearMonthPicker | 년월 선택 |
| 년 | YearPicker | 년도 선택 |
| 자재 | MaterialSelect | 자재/품목 선택 |
| 거래처 | CustomerSelect | 거래처/고객 선택 |
| 부서 | DepartmentSelect | 부서 선택 |
| 계정 | AccountSelect | 계정과목 선택 |
| 모델 | ModelSelect | 모델/제품 선택 |
| 사업장 | SiteSelect | 사업장 선택 |
| 비용 | ExpenSelSelect | 비용 선택 |

---

## 시트 2: 그리드컬럼

### 구조
| 컬럼명 | 한글명 | 데이터타입 | 너비 | 정렬 | 필수 | 편집가능 | 포맷 | 검증규칙 | 기본값 | 설명 |
|--------|--------|------------|------|------|------|----------|------|----------|--------|------|

### 구조 (Excel 행 구조)
| 행 | 내용 | 설명 |
|----|------|------|
| Row 1 | 화면 제목 | 예: "자재수불부" |
| Row 2 | 1차 헤더 (그룹 헤더) | 병합 셀로 그룹 표현 |
| Row 3 | 2차 헤더 (상세 컬럼) | 실제 컬럼명 |
| Row 4+ | 합계행 | "합계", "소계" 등 키워드 포함 |

### 예시 (자재수불부)
```
Row 1: [자재수불부]
Row 2: [자재구분] [품번] [품명] [대분류] [중분류] [규격] [기초      ] [입고      ] [출고      ] [기말      ]
Row 3: [       ] [    ] [    ] [      ] [      ] [    ] [수량] [금액] [수량] [금액] [수량] [금액] [수량] [금액]
Row 4: [원재료 합계] ...
Row 5: [부재료 합계] ...
```

### 병합 셀 규칙
- 1차 헤더(Row 2)에서 **가로 병합**으로 그룹 표현
- 예: "기초" 셀이 2개 컬럼(수량, 금액)에 걸쳐 병합

---

## 시트 3: 샘플데이터

### 구조
| 행 | 내용 | 설명 |
|----|------|------|
| Row 1 | 제목 | "샘플 데이터" |
| Row 2 | 헤더 | 단일 행, 병합 없음 |
| Row 3+ | 데이터 | 샘플 데이터 행 |

### 예시
```
Row 1: [샘플 데이터]
Row 2: [자재구분] [품번] [품명] [대분류] [중분류] [규격] [기초수량] [기초금액] [입고수량] [입고금액] ...
Row 3: [원재료] [DW00105000] [LJ64-06535C] [원장] [SDC] [370*570*32㎛] [100] [1000000] [500] [2500000] ...
Row 4: [부재료] [DW00340000] [FILM-FRONT] [필름] [세경] [] [1000] [500000] [5000] [2500000] ...
```

---

## 옵션 사용 예시

### 예시 1: 자재수불부
```
옵션: 년월, 자재
```
→ YearMonthPicker와 MaterialSelect 컴포넌트가 조회조건에 추가됨

### 예시 2: 부서별 원가 분석
```
옵션: 년, 부서, 계정
```
→ YearPicker, DepartmentSelect, AccountSelect 컴포넌트가 조회조건에 추가됨

### 예시 3: 거래처별 매출 현황
```
옵션: 년월, 거래처, 모델
```
→ YearMonthPicker, CustomerSelect, ModelSelect 컴포넌트가 조회조건에 추가됨

---

## 템플릿 다운로드 파일 생성

### ExcelJS를 사용한 템플릿 생성 코드

```javascript
import ExcelJS from 'exceljs';

async function generateTemplateFile() {
  const workbook = new ExcelJS.Workbook();
  
  // === 시트 1: 기본정보 ===
  const sheet1 = workbook.addWorksheet('01_기본정보');
  
  // 헤더 스타일
  const headerStyle = {
    font: { bold: true, color: { argb: 'FFFFFFFF' } },
    fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0078D4' } },
    alignment: { vertical: 'middle', horizontal: 'center' }
  };
  
  // 필수 표시 스타일
  const requiredStyle = {
    font: { bold: true, color: { argb: 'FFE81123' } },
    fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFF4CE' } }
  };
  
  sheet1.columns = [
    { header: '항목명', key: 'item', width: 20 },
    { header: '값', key: 'value', width: 40 },
    { header: '설명', key: 'description', width: 50 },
    { header: '필수여부', key: 'required', width: 10 }
  ];
  
  // 헤더 스타일 적용
  sheet1.getRow(1).eachCell(cell => {
    cell.style = headerStyle;
  });
  
  // 데이터 행 추가
  const basicInfoRows = [
    { item: '화면ID', value: 'COST001', description: '영문대문자+숫자 4자리', required: '✅ 필수' },
    { item: '화면명(한글)', value: '공정별 재료비 관리', description: '화면 타이틀', required: '✅ 필수' },
    { item: '화면명(영문)', value: 'Process Material Cost', description: '영문 화면명', required: '✅ 필수' },
    { item: '카테고리', value: 'cost', description: '라우터 경로의 카테고리', required: '✅ 필수' },
    { item: '설명', value: '공정별 재료비를 조회하고 관리하는 화면', description: '화면 설명', required: '⬜ 선택' },
    { item: '작성자', value: '홍길동', description: '담당자 이름', required: '⬜ 선택' },
    { item: '작성일', value: '2025-11-30', description: '작성 날짜', required: '⬜ 선택' },
    { item: '페이징 사용', value: 'Y', description: 'Y/N (기본값: Y)', required: '⬜ 선택' },
    { item: '페이지 크기', value: '50', description: '기본 페이지 크기', required: '⬜ 선택' },
    { item: 'Excel 다운로드', value: 'Y', description: 'Y/N (기본값: Y)', required: '⬜ 선택' },
    { item: '행 추가 가능', value: 'Y', description: 'Y/N (기본값: N)', required: '⬜ 선택' },
    { item: '행 삭제 가능', value: 'Y', description: 'Y/N (기본값: N)', required: '⬜ 선택' }
  ];
  
  basicInfoRows.forEach((row, index) => {
    const excelRow = sheet1.addRow(row);
    if (row.required.includes('필수')) {
      excelRow.getCell(4).style = requiredStyle;
    }
  });
  
  // === 시트 2: 그리드컬럼 ===
  const sheet2 = workbook.addWorksheet('02_그리드컬럼');
  
  sheet2.columns = [
    { header: '컬럼명', key: 'columnName', width: 20 },
    { header: '한글명', key: 'displayName', width: 20 },
    { header: '데이터타입', key: 'dataType', width: 15 },
    { header: '너비', key: 'width', width: 10 },
    { header: '정렬', key: 'align', width: 10 },
    { header: '필수', key: 'required', width: 8 },
    { header: '편집가능', key: 'editable', width: 12 },
    { header: '포맷', key: 'format', width: 20 },
    { header: '검증규칙', key: 'validation', width: 20 },
    { header: '기본값', key: 'defaultValue', width: 15 },
    { header: '설명', key: 'description', width: 30 }
  ];
  
  sheet2.getRow(1).eachCell(cell => {
    cell.style = headerStyle;
  });
  
  const gridColumnRows = [
    { columnName: 'costId', displayName: '비용ID', dataType: 'number', width: 80, align: 'center', required: 'Y', editable: 'N', format: '', validation: '', defaultValue: '', description: '자동생성되는 고유ID' },
    { columnName: 'processCode', displayName: '공정코드', dataType: 'string', width: 100, align: 'center', required: 'Y', editable: 'Y', format: '', validation: '', defaultValue: '', description: '공정 코드' },
    { columnName: 'processName', displayName: '공정명', dataType: 'string', width: 150, align: 'left', required: 'Y', editable: 'Y', format: '', validation: '', defaultValue: '', description: '공정 이름' },
    { columnName: 'materialCode', displayName: '자재코드', dataType: 'string', width: 100, align: 'center', required: 'Y', editable: 'Y', format: '', validation: '', defaultValue: '', description: '자재 코드' },
    { columnName: 'materialName', displayName: '자재명', dataType: 'string', width: 200, align: 'left', required: 'Y', editable: 'Y', format: '', validation: '', defaultValue: '', description: '자재 이름' },
    { columnName: 'unitPrice', displayName: '단가', dataType: 'number', width: 120, align: 'right', required: 'Y', editable: 'Y', format: '#,##0', validation: 'min:0', defaultValue: '0', description: '자재 단가' },
    { columnName: 'quantity', displayName: '수량', dataType: 'number', width: 100, align: 'right', required: 'Y', editable: 'Y', format: '#,##0.00', validation: 'min:0', defaultValue: '1', description: '사용 수량' },
    { columnName: 'totalCost', displayName: '총비용', dataType: 'number', width: 120, align: 'right', required: 'Y', editable: 'N', format: '#,##0', validation: '', defaultValue: '', description: '단가 × 수량 (계산)' },
    { columnName: 'costDate', displayName: '적용일자', dataType: 'date', width: 120, align: 'center', required: 'Y', editable: 'Y', format: 'YYYY-MM-DD', validation: '', defaultValue: '', description: '비용 적용 일자' },
    { columnName: 'status', displayName: '상태', dataType: 'string', width: 80, align: 'center', required: 'Y', editable: 'Y', format: '', validation: '', defaultValue: '대기', description: '대기/승인/완료' },
    { columnName: 'remarks', displayName: '비고', dataType: 'string', width: 200, align: 'left', required: 'N', editable: 'Y', format: '', validation: '', defaultValue: '', description: '추가 설명' },
    { columnName: 'createdAt', displayName: '생성일시', dataType: 'datetime', width: 150, align: 'center', required: 'Y', editable: 'N', format: 'YYYY-MM-DD HH:mm', validation: '', defaultValue: '', description: '데이터 생성 시간' }
  ];
  
  gridColumnRows.forEach(row => {
    sheet2.addRow(row);
  });
  
  // === 시트 3: 검색조건 ===
  const sheet3 = workbook.addWorksheet('03_검색조건');
  
  sheet3.columns = [
    { header: '필드명', key: 'fieldName', width: 20 },
    { header: '한글명', key: 'displayName', width: 20 },
    { header: '입력타입', key: 'inputType', width: 15 },
    { header: '필수', key: 'required', width: 8 },
    { header: '기본값', key: 'defaultValue', width: 15 },
    { header: '옵션', key: 'options', width: 40 },
    { header: '너비', key: 'width', width: 8 },
    { header: '검증규칙', key: 'validation', width: 20 },
    { header: '설명', key: 'description', width: 30 }
  ];
  
  sheet3.getRow(1).eachCell(cell => {
    cell.style = headerStyle;
  });
  
  const searchFieldRows = [
    { fieldName: 'searchKeyword', displayName: '검색어', inputType: 'text', required: 'N', defaultValue: '', options: '', width: 6, validation: '', description: '공정명 또는 자재명 검색' },
    { fieldName: 'searchType', displayName: '검색구분', inputType: 'select', required: 'N', defaultValue: 'ALL', options: 'ALL:전체;PROCESS:공정;MATERIAL:자재', width: 3, validation: '', description: '검색 대상 구분' },
    { fieldName: 'dateFrom', displayName: '시작일자', inputType: 'date', required: 'N', defaultValue: '', options: '', width: 3, validation: '', description: '조회 시작 날짜' },
    { fieldName: 'dateTo', displayName: '종료일자', inputType: 'date', required: 'N', defaultValue: '', options: '', width: 3, validation: '', description: '조회 종료 날짜' },
    { fieldName: 'status', displayName: '상태', inputType: 'select', required: 'N', defaultValue: 'ALL', options: 'ALL:전체;대기;승인;완료', width: 3, validation: '', description: '상태 필터' },
    { fieldName: 'minCost', displayName: '최소비용', inputType: 'number', required: 'N', defaultValue: '0', options: '', width: 3, validation: 'min:0', description: '최소 비용' },
    { fieldName: 'maxCost', displayName: '최대비용', inputType: 'number', required: 'N', defaultValue: '', options: '', width: 3, validation: 'min:0', description: '최대 비용' }
  ];
  
  searchFieldRows.forEach(row => {
    sheet3.addRow(row);
  });
  
  // === 시트 4: 버튼정의 ===
  const sheet4 = workbook.addWorksheet('04_버튼정의');
  
  sheet4.columns = [
    { header: '버튼ID', key: 'buttonId', width: 20 },
    { header: '버튼명', key: 'displayName', width: 15 },
    { header: '위치', key: 'position', width: 12 },
    { header: '아이콘', key: 'icon', width: 20 },
    { header: '액션타입', key: 'actionType', width: 12 },
    { header: 'API경로', key: 'apiPath', width: 25 },
    { header: '확인메시지', key: 'confirmMessage', width: 30 },
    { header: '성공메시지', key: 'successMessage', width: 20 },
    { header: '조건', key: 'condition', width: 15 },
    { header: '순서', key: 'order', width: 8 },
    { header: '설명', key: 'description', width: 25 }
  ];
  
  sheet4.getRow(1).eachCell(cell => {
    cell.style = headerStyle;
  });
  
  const buttonRows = [
    { buttonId: 'btnSearch', displayName: '조회', position: 'toolbar', icon: 'bi-search', actionType: 'search', apiPath: '/api/cost/search', confirmMessage: '', successMessage: '', condition: '', order: 1, description: '데이터 조회' },
    { buttonId: 'btnAdd', displayName: '행추가', position: 'toolbar', icon: 'bi-plus-circle', actionType: 'add', apiPath: '', confirmMessage: '', successMessage: '', condition: '', order: 2, description: '새 행 추가' },
    { buttonId: 'btnDelete', displayName: '선택삭제', position: 'toolbar', icon: 'bi-trash', actionType: 'delete', apiPath: '/api/cost/delete', confirmMessage: '선택한 행을 삭제하시겠습니까?', successMessage: '삭제되었습니다.', condition: 'hasSelection', order: 3, description: '선택 행 삭제' },
    { buttonId: 'btnSave', displayName: '저장', position: 'toolbar', icon: 'bi-save', actionType: 'save', apiPath: '/api/cost/save', confirmMessage: '저장하시겠습니까?', successMessage: '저장되었습니다.', condition: 'hasChanges', order: 4, description: '변경사항 저장' },
    { buttonId: 'btnExport', displayName: 'Excel 다운로드', position: 'toolbar', icon: 'bi-download', actionType: 'export', apiPath: '/api/cost/export', confirmMessage: '', successMessage: '', condition: '', order: 5, description: 'Excel 파일 다운로드' },
    { buttonId: 'btnRefresh', displayName: '새로고침', position: 'toolbar', icon: 'bi-arrow-clockwise', actionType: 'search', apiPath: '/api/cost/search', confirmMessage: '', successMessage: '', condition: '', order: 6, description: '데이터 새로고침' }
  ];
  
  buttonRows.forEach(row => {
    sheet4.addRow(row);
  });
  
  // === 시트 5: API정의 ===
  const sheet5 = workbook.addWorksheet('05_API정의');
  
  sheet5.columns = [
    { header: 'API명', key: 'apiName', width: 20 },
    { header: 'HTTP메서드', key: 'method', width: 12 },
    { header: '경로', key: 'path', width: 25 },
    { header: '설명', key: 'description', width: 25 },
    { header: '요청파라미터', key: 'parameters', width: 50 },
    { header: '응답형식', key: 'responseType', width: 12 },
    { header: '페이징', key: 'paging', width: 8 },
    { header: '정렬', key: 'sorting', width: 15 },
    { header: '에러처리', key: 'errorHandling', width: 15 }
  ];
  
  sheet5.getRow(1).eachCell(cell => {
    cell.style = headerStyle;
  });
  
  const apiRows = [
    { apiName: 'searchCosts', method: 'POST', path: '/api/cost/search', description: '비용 목록 조회', parameters: 'searchKeyword,searchType,dateFrom,dateTo,status,minCost,maxCost', responseType: 'list', paging: 'Y', sorting: 'costDate:desc', errorHandling: 'alert' },
    { apiName: 'saveCost', method: 'POST', path: '/api/cost/save', description: '비용 저장', parameters: 'costData(JSON)', responseType: 'object', paging: 'N', sorting: '', errorHandling: 'alert' },
    { apiName: 'deleteCost', method: 'DELETE', path: '/api/cost/delete', description: '비용 삭제', parameters: 'costIds(Array)', responseType: 'boolean', paging: 'N', sorting: '', errorHandling: 'confirm+alert' },
    { apiName: 'exportExcel', method: 'POST', path: '/api/cost/export', description: 'Excel 다운로드', parameters: 'searchKeyword,searchType,dateFrom,dateTo,status', responseType: 'file', paging: 'N', sorting: '', errorHandling: 'alert' },
    { apiName: 'validateData', method: 'POST', path: '/api/cost/validate', description: '데이터 검증', parameters: 'costData(JSON)', responseType: 'object', paging: 'N', sorting: '', errorHandling: 'silent' }
  ];
  
  apiRows.forEach(row => {
    sheet5.addRow(row);
  });
  
  // 파일 저장
  const buffer = await workbook.xlsx.writeBuffer();
  return buffer;
}

// 다운로드 트리거
export async function downloadTemplate() {
  const buffer = await generateTemplateFile();
  const blob = new Blob([buffer], { 
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
  });
  
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'ScreenGenerator_Template.xlsx';
  link.click();
}
```

---

## 검증 규칙

### 필수 검증
1. **01_기본정보**: 화면ID, 화면명(한글), 화면명(영문), 카테고리는 필수
2. **02_그리드컬럼**: 최소 1개 이상의 컬럼 정의 필요
3. **컬럼명 중복 검사**: 동일한 컬럼명이 있으면 안됨
4. **데이터타입 검증**: 허용된 타입만 사용 가능

### 형식 검증
- **화면ID**: 영문대문자로 시작, 숫자 포함 가능, 4-8자
- **카테고리**: 영문소문자만 사용, 공백 불가
- **컬럼명**: camelCase, 첫 글자는 영문소문자
- **API경로**: `/api/`로 시작하는 상대경로

### 논리 검증
- **dateFrom/dateTo**: dateTo >= dateFrom
- **minCost/maxCost**: maxCost >= minCost
- **너비 합계**: 그리드 컬럼 너비의 합이 1920px 이하 권장

---

## 자동 생성 결과물

### 1. Vue 컴포넌트 (`{화면ID}.vue`)
- RealGrid 그리드 컴포넌트
- 검색 패널
- 툴바 버튼
- API 통신 로직

### 2. JSON 스키마 (`{화면ID}.json`)
- 컬럼 정의
- 필드 정의
- 검증 규칙

### 3. Java Controller (`{화면ID}Controller.java`)
- REST API 엔드포인트
- 파라미터 검증
- 서비스 호출

### 4. MyBatis Mapper (`{화면ID}Mapper.xml`)
- SQL 쿼리
- 동적 쿼리 (검색조건)
- 페이징 처리

---

## 다음 단계
1. ✅ Excel 템플릿 명세서 작성 완료
2. ⏭️ 화면생성기 UI 설계 및 구현
3. ⏭️ Excel → JSON 변환 로직 구현
4. ⏭️ 코드 생성 엔진 개선

---

**문서 버전**: 1.0  
**최종 업데이트**: 2025년 11월 30일  
**작성자**: AI Factory Lab Team
