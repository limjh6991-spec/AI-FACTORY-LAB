# 화면생성기 Excel 템플릿 명세서

## 개요
화면 생성을 위한 표준 Excel 템플릿 구조를 정의합니다. 이 템플릿을 사용하면 개발자가 Excel 파일만 작성하여 자동으로 Vue 화면, Java Controller, MyBatis Mapper를 생성할 수 있습니다.

---

## Excel 파일 구조

### 파일명 규칙
```
{화면ID}_ScreenDefinition.xlsx
예: COST001_ScreenDefinition.xlsx
```

### 시트 구성 (5개 시트)
1. **01_기본정보** - 화면의 기본 메타데이터
2. **02_그리드컬럼** - RealGrid 컬럼 정의
3. **03_검색조건** - 검색 패널의 입력 필드
4. **04_버튼정의** - 화면 액션 버튼
5. **05_API정의** - Backend API 엔드포인트

---

## 시트 1: 01_기본정보

### 구조
| 항목명 | 값 | 설명 | 필수여부 |
|--------|-----|------|----------|
| 화면ID | COST001 | 영문대문자+숫자 4자리 | ✅ 필수 |
| 화면명(한글) | 공정별 재료비 관리 | 화면 타이틀 | ✅ 필수 |
| 화면명(영문) | Process Material Cost | 영문 화면명 | ✅ 필수 |
| 카테고리 | cost | 라우터 경로의 카테고리 | ✅ 필수 |
| 설명 | 공정별 재료비를 조회하고 관리하는 화면 | 화면 설명 | ⬜ 선택 |
| 작성자 | 홍길동 | 담당자 이름 | ⬜ 선택 |
| 작성일 | 2025-11-30 | 작성 날짜 | ⬜ 선택 |
| 페이징 사용 | Y | Y/N (기본값: Y) | ⬜ 선택 |
| 페이지 크기 | 50 | 기본 페이지 크기 | ⬜ 선택 |
| Excel 다운로드 | Y | Y/N (기본값: Y) | ⬜ 선택 |
| 행 추가 가능 | Y | Y/N (기본값: N) | ⬜ 선택 |
| 행 삭제 가능 | Y | Y/N (기본값: N) | ⬜ 선택 |

### 예시 데이터
```
화면ID          | COST001
화면명(한글)    | 공정별 재료비 관리
화면명(영문)    | Process Material Cost
카테고리        | cost
설명            | 공정별 재료비를 조회하고 관리하는 화면
작성자          | 홍길동
작성일          | 2025-11-30
페이징 사용     | Y
페이지 크기     | 50
Excel 다운로드  | Y
행 추가 가능    | Y
행 삭제 가능    | Y
```

---

## 시트 2: 02_그리드컬럼

### 구조
| 컬럼명 | 한글명 | 데이터타입 | 너비 | 정렬 | 필수 | 편집가능 | 포맷 | 검증규칙 | 기본값 | 설명 |
|--------|--------|------------|------|------|------|----------|------|----------|--------|------|

### 컬럼 설명
- **컬럼명**: DB 컬럼명 (camelCase) - `costId`, `processName`
- **한글명**: 그리드 헤더에 표시될 이름
- **데이터타입**: `string`, `number`, `date`, `datetime`, `boolean`
- **너비**: 픽셀 단위 (기본값: 100)
- **정렬**: `left`, `center`, `right` (기본값: left)
- **필수**: `Y`/`N` - 필수 입력 여부
- **편집가능**: `Y`/`N` - 셀 편집 가능 여부
- **포맷**: 데이터 포맷 (예: `#,##0`, `YYYY-MM-DD`, `#,##0.00`)
- **검증규칙**: 정규식 또는 min/max 조건 (예: `min:0,max:100`)
- **기본값**: 새 행 추가 시 기본값
- **설명**: 컬럼 설명 (툴팁으로 표시)

### 예시 데이터
| 컬럼명 | 한글명 | 데이터타입 | 너비 | 정렬 | 필수 | 편집가능 | 포맷 | 검증규칙 | 기본값 | 설명 |
|--------|--------|------------|------|------|------|----------|------|----------|--------|------|
| costId | 비용ID | number | 80 | center | Y | N | | | | 자동생성되는 고유ID |
| processCode | 공정코드 | string | 100 | center | Y | Y | | | | 공정 코드 |
| processName | 공정명 | string | 150 | left | Y | Y | | | | 공정 이름 |
| materialCode | 자재코드 | string | 100 | center | Y | Y | | | | 자재 코드 |
| materialName | 자재명 | string | 200 | left | Y | Y | | | | 자재 이름 |
| unitPrice | 단가 | number | 120 | right | Y | Y | #,##0 | min:0 | 0 | 자재 단가 |
| quantity | 수량 | number | 100 | right | Y | Y | #,##0.00 | min:0 | 1 | 사용 수량 |
| totalCost | 총비용 | number | 120 | right | Y | N | #,##0 | | | 단가 × 수량 (계산) |
| costDate | 적용일자 | date | 120 | center | Y | Y | YYYY-MM-DD | | | 비용 적용 일자 |
| status | 상태 | string | 80 | center | Y | Y | | | 대기 | 대기/승인/완료 |
| remarks | 비고 | string | 200 | left | N | Y | | | | 추가 설명 |
| createdAt | 생성일시 | datetime | 150 | center | Y | N | YYYY-MM-DD HH:mm | | | 데이터 생성 시간 |

---

## 시트 3: 03_검색조건

### 구조
| 필드명 | 한글명 | 입력타입 | 필수 | 기본값 | 옵션 | 너비 | 검증규칙 | 설명 |
|--------|--------|----------|------|--------|------|------|----------|------|

### 컬럼 설명
- **필드명**: 검색 파라미터 이름 (camelCase)
- **한글명**: 레이블에 표시될 이름
- **입력타입**: `text`, `select`, `date`, `daterange`, `number`, `checkbox`
- **필수**: `Y`/`N` - 필수 입력 여부
- **기본값**: 초기 표시 값
- **옵션**: select인 경우 선택 옵션 (`;`로 구분)
- **너비**: 그리드 컬럼 너비 (1-12, Bootstrap 그리드 시스템)
- **검증규칙**: 입력 검증 규칙
- **설명**: 필드 설명 (툴팁)

### 예시 데이터
| 필드명 | 한글명 | 입력타입 | 필수 | 기본값 | 옵션 | 너비 | 검증규칙 | 설명 |
|--------|--------|----------|------|--------|------|------|----------|------|
| searchKeyword | 검색어 | text | N | | | 6 | | 공정명 또는 자재명 검색 |
| searchType | 검색구분 | select | N | ALL | ALL:전체;PROCESS:공정;MATERIAL:자재 | 3 | | 검색 대상 구분 |
| dateFrom | 시작일자 | date | N | | | 3 | | 조회 시작 날짜 |
| dateTo | 종료일자 | date | N | | | 3 | | 조회 종료 날짜 |
| status | 상태 | select | N | ALL | ALL:전체;대기;승인;완료 | 3 | | 상태 필터 |
| minCost | 최소비용 | number | N | 0 | | 3 | min:0 | 최소 비용 |
| maxCost | 최대비용 | number | N | | | 3 | min:0 | 최대 비용 |

---

## 시트 4: 04_버튼정의

### 구조
| 버튼ID | 버튼명 | 위치 | 아이콘 | 액션타입 | API경로 | 확인메시지 | 성공메시지 | 조건 | 순서 | 설명 |
|--------|--------|------|--------|----------|---------|------------|------------|------|------|------|

### 컬럼 설명
- **버튼ID**: 고유 버튼 식별자 (camelCase)
- **버튼명**: 버튼에 표시될 텍스트
- **위치**: `toolbar`, `context` (그리드 컨텍스트 메뉴)
- **아이콘**: Bootstrap Icons 클래스명 (예: `bi-search`, `bi-plus-circle`)
- **액션타입**: `search`, `add`, `delete`, `save`, `export`, `custom`
- **API경로**: 호출할 API 경로 (상대경로)
- **확인메시지**: 실행 전 확인 다이얼로그 메시지
- **성공메시지**: 성공 시 표시 메시지
- **조건**: 버튼 활성화 조건 (JavaScript 표현식)
- **순서**: 표시 순서 (1부터 시작)
- **설명**: 버튼 설명 (툴팁)

### 예시 데이터
| 버튼ID | 버튼명 | 위치 | 아이콘 | 액션타입 | API경로 | 확인메시지 | 성공메시지 | 조건 | 순서 | 설명 |
|--------|--------|------|--------|----------|---------|------------|------------|------|------|------|
| btnSearch | 조회 | toolbar | bi-search | search | /api/cost/search | | | | 1 | 데이터 조회 |
| btnAdd | 행추가 | toolbar | bi-plus-circle | add | | | | | 2 | 새 행 추가 |
| btnDelete | 선택삭제 | toolbar | bi-trash | delete | /api/cost/delete | 선택한 행을 삭제하시겠습니까? | 삭제되었습니다. | hasSelection | 3 | 선택 행 삭제 |
| btnSave | 저장 | toolbar | bi-save | save | /api/cost/save | 저장하시겠습니까? | 저장되었습니다. | hasChanges | 4 | 변경사항 저장 |
| btnExport | Excel 다운로드 | toolbar | bi-download | export | /api/cost/export | | | | 5 | Excel 파일 다운로드 |
| btnRefresh | 새로고침 | toolbar | bi-arrow-clockwise | search | /api/cost/search | | | | 6 | 데이터 새로고침 |

---

## 시트 5: 05_API정의

### 구조
| API명 | HTTP메서드 | 경로 | 설명 | 요청파라미터 | 응답형식 | 페이징 | 정렬 | 에러처리 |
|-------|------------|------|------|--------------|----------|--------|------|----------|

### 컬럼 설명
- **API명**: API 식별자 (camelCase)
- **HTTP메서드**: `GET`, `POST`, `PUT`, `DELETE`
- **경로**: API 엔드포인트 경로
- **설명**: API 설명
- **요청파라미터**: 파라미터 목록 (`,`로 구분)
- **응답형식**: `list`, `object`, `boolean`
- **페이징**: `Y`/`N` - 페이징 지원 여부
- **정렬**: 기본 정렬 컬럼 (예: `costDate:desc`)
- **에러처리**: 에러 처리 방식

### 예시 데이터
| API명 | HTTP메서드 | 경로 | 설명 | 요청파라미터 | 응답형식 | 페이징 | 정렬 | 에러처리 |
|-------|------------|------|------|--------------|----------|--------|------|----------|
| searchCosts | POST | /api/cost/search | 비용 목록 조회 | searchKeyword,searchType,dateFrom,dateTo,status,minCost,maxCost | list | Y | costDate:desc | alert |
| saveCost | POST | /api/cost/save | 비용 저장 | costData(JSON) | object | N | | alert |
| deleteCost | DELETE | /api/cost/delete | 비용 삭제 | costIds(Array) | boolean | N | | confirm+alert |
| exportExcel | POST | /api/cost/export | Excel 다운로드 | searchKeyword,searchType,dateFrom,dateTo,status | file | N | | alert |
| validateData | POST | /api/cost/validate | 데이터 검증 | costData(JSON) | object | N | | silent |

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
