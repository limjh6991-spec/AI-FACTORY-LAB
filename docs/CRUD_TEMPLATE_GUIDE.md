# CRUD 화면 생성 가이드

## 개요

기준정보 관리(CRUD) 화면을 자동 생성하기 위한 Excel 템플릿 가이드입니다.

## Excel 템플릿 구조

### 1. 메타정보 시트

| 항목 | 값 | 설명 |
|------|-----|-----|
| 화면명 | 거래처관리 | 화면 한글명 |
| 화면명(영문) | CustomerMaster | 화면 영문명 (선택) |
| 테이블명 | tb_customer | 대상 테이블명 |
| 화면유형 | CRUD | `CRUD`, `기준정보`, `마스터` 중 하나 |
| 옵션 | 부서,거래처 | 검색조건 (콤마 구분) |
| **PK컬럼** | cust_cd | 기본키 컬럼명 |
| PK자동생성 | Y | PK 자동 생성 여부 (Y/N) |
| PK패턴 | CUST_{YYYYMMDD}_{SEQ:4} | PK 패턴 (선택) |
| 정렬컬럼 | cust_nm | 기본 정렬 컬럼 |
| 정렬방향 | asc | asc 또는 desc |
| 소프트삭제 | N | 소프트 삭제 사용 여부 (Y/N) |
| 감사컬럼 | Y | 생성/수정일시 자동 관리 (Y/N) |
| 행선택 | multiple | single 또는 multiple |
| 페이징 | N | 페이지네이션 사용 여부 (Y/N) |
| 페이지크기 | 50 | 페이지당 행 수 |

### 2. 그리드컬럼 시트

| 컬럼명(한글) | DB컬럼명 | 너비 | 편집타입 | 편집가능 | 필수 | 기본값 | 옵션 | 정렬 | 최대길이 | 숨김 |
|------------|---------|------|---------|---------|------|-------|------|------|---------|------|
| 거래처코드 | cust_cd | 100 | 텍스트 | N | Y | | | left | 20 | N |
| 거래처명 | cust_nm | 200 | 텍스트 | Y | Y | | | left | 100 | N |
| 사업자번호 | biz_no | 120 | 텍스트 | Y | N | | | center | 13 | N |
| 대표자명 | repr_nm | 100 | 텍스트 | Y | N | | | left | 50 | N |
| 거래처유형 | cust_type | 100 | 선택 | Y | Y | A | A:일반,B:특약,C:VIP | center | | N |
| 사용여부 | use_yn | 80 | 체크박스 | Y | Y | Y | | center | | N |
| 등록일 | created_at | 120 | 날짜 | N | N | | | center | | N |

## 편집타입 종류

| 편집타입 | 설명 | 비고 |
|---------|-----|------|
| 텍스트 | 일반 텍스트 입력 | `text` |
| 숫자 | 숫자 입력 | `number` |
| 날짜 | 날짜 선택 | `date` |
| 날짜시간 | 날짜+시간 선택 | `datetime` |
| 선택 | 콤보박스 | `select`, 옵션에 "값:라벨,..." 형식 |
| 체크박스 | Y/N 체크박스 | `checkbox` |
| 여러줄 | 멀티라인 텍스트 | `textarea` |
| 읽기전용 | 편집 불가 | `readonly` |

## 옵션 형식 (선택 타입)

### 1. 직접 정의
```
A:일반,B:특약,C:VIP
```

### 2. API 참조 (향후 지원)
```
api.commonCode.getCodes
```

## 생성되는 코드

### 1. 컴포넌트 (`generated/screens/SC001/SC001Screen.tsx`)

- AG Grid Enterprise 기반 편집 가능한 그리드
- 행 추가/삭제/수정 기능
- 변경 추적 (행 색상으로 표시)
- 일괄 저장

### 2. API 라우터 (`src/server/api/routers/generated/screenSC001.ts`)

- `getAll`: 전체 데이터 조회
- `getById`: 단건 조회
- `save`: 일괄 저장 (Insert/Update/Delete)

## 사용 예시

```typescript
// 1. Excel 업로드
const result = await screenGenerator.validateTemplate.mutate({ fileData });

// 2. CRUD 미리보기 생성
const preview = await screenGenerator.generateCrudPreview.mutate({
  parsedData: result.parsedData,
  screenId: 'SC001'
});

// 3. 화면 저장
await screenGenerator.saveTempScreen.mutate({
  screenId: 'SC001',
  componentCode: preview.component.code,
  apiCode: preview.api?.routerCode,
});
```

## 지원되는 DB 테이블

기준정보 관련 테이블:
- `tb_customer`: 거래처
- `tb_item`: 품목  
- `tb_warehouse`: 창고
- `tb_department`: 부서
- `tb_employee`: 직원
- `tb_common_code`: 공통코드
- `tb_unit`: 단위
- `tb_account`: 계정과목
- 기타...

## 향후 계획

1. **복합 PK 지원**: 여러 컬럼으로 구성된 기본키
2. **외래키 참조**: 다른 테이블 참조 (Lookup)
3. **마스터-디테일**: 상위/하위 테이블 연결
4. **엑셀 가져오기/내보내기**: 대량 데이터 처리
5. **권한 연동**: 사용자별 CRUD 권한 제어
