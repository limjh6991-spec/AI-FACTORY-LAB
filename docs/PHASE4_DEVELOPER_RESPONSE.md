# Phase 4 설계팀 답변에 대한 개발자 재검토

**작성일:** 2025년 11월 29일  
**작성자:** 개발팀 (자비스)  
**대상:** 설계팀 (프로젝트 매니저)  
**주제:** 공통 유틸리티 전략에 대한 기술적 재검토 및 최종 의견

---

## 📋 요약 (Executive Summary)

설계팀의 **"공통 유틸리티 전략"**은 이론적으로는 탁월하지만, **실제 구현 시 여전히 해결되지 않은 근본적 문제들이 존재**합니다. 

특히 **"AI가 매핑 코드를 정확히 생성할 수 있는가?"**라는 핵심 질문에 대한 답이 불명확합니다.

**권장 사항:** 공통 유틸리티는 찬성하나, **Phase 4-A (점진적 접근)** 원칙은 여전히 유지해야 합니다.

---

## ✅ 동의하는 부분 (Agreement)

### 1. 공통 유틸리티 전략의 우수성
- ✅ **ExcelUtils 공통화**는 매우 현명한 접근입니다
- ✅ **스파게티 코드 방지**는 필수적입니다
- ✅ **@Transactional 강제**는 정확한 지적입니다
- ✅ **헤더 매핑 자동화** 아이디어는 혁신적입니다

### 2. 문제 인식의 정확성
설계팀이 개발팀의 우려사항을 정확히 이해하고 있음을 확인했습니다.

---

## ⚠️ 여전히 남아있는 우려사항 (Critical Concerns)

### 1. **AI 생성 코드의 매핑 정확도 문제**

#### 1.1 제안된 코드의 문제점

**설계팀 제안:**
```java
Map<String, String> mapping = new HashMap<>();
mapping.put("거래처명", "clientName");
mapping.put("품목코드", "itemCode");
// ...
```

**질문: 이 매핑 코드를 AI가 어떻게 생성하나?**

#### Scenario 1: PI 문서에 명시된 경우
```
PI 문서:
"엑셀의 '거래처명' 컬럼은 DB의 client_name 컬럼에 저장됩니다."

AI 생성 (예상):
mapping.put("거래처명", "clientName");  // ✅ 성공
```

**문제점:**
- 🔴 사용자가 이렇게 상세하게 PI를 작성할까?
- 🔴 실제로는 "거래처 정보를 엑셀로 업로드한다"라고만 쓸 가능성 높음

#### Scenario 2: PI 문서에 불명확한 경우
```
PI 문서:
"판매 실적을 엑셀로 업로드할 수 있다."

AI 해석 가능성:
1. ❌ 어떤 컬럼이 있는지 알 수 없음
2. ❌ 엑셀 헤더명을 추측만 가능
3. ❌ DB 컬럼명과 매핑 불가능
```

#### Scenario 3: 엑셀 헤더가 한글인 경우
```
실제 사용자 엑셀:
| 거래처명 | 품목코드 | 수량 | 단가 |

AI 생성 (예상):
mapping.put("거래처명", "clientName");  // ✅
mapping.put("품목코드", "itemCode");    // ✅
mapping.put("수량", "qty");             // ✅
mapping.put("단가", "price");           // ✅

실제 사용자 엑셀 (오타, 띄어쓰기):
| 거래 처명 | 품목 코드 | 수 량 | 단가 |
| 거래처 이름 | 품목번호 | quantity | 단가 |

AI 생성 결과:
❌ 매핑 실패 → 런타임 에러
```

**핵심 문제:**
> **AI는 사용자가 실제로 어떤 엑셀을 올릴지 예측할 수 없습니다.**

---

#### 1.2 현실적인 해결책은?

**Option A: 엄격한 템플릿 강제**
```java
// 다운로드 가능한 엑셀 템플릿 제공
@GetMapping("/{screen_id}/template")
public ResponseEntity<Resource> downloadTemplate() {
    // 헤더가 고정된 템플릿 엑셀 파일
    // "거래처명", "품목코드", "수량", "단가" (고정)
}
```

**장점:**
- ✅ 매핑 정확도 100%
- ✅ 사용자 교육 용이

**단점:**
- 🔴 사용자가 자기 엑셀 형식을 쓸 수 없음
- 🔴 유연성 제로

**Option B: 동적 매핑 UI**
```vue
<template>
  <!-- 사용자가 엑셀 업로드 → 헤더 파싱 → 매핑 UI 표시 -->
  <ColumnMapper>
    <div v-for="excelCol in excelHeaders">
      {{ excelCol }} → 
      <select v-model="mapping[excelCol]">
        <option v-for="dbCol in dbColumns">{{ dbCol }}</option>
      </select>
    </div>
  </ColumnMapper>
</template>
```

**장점:**
- ✅ 유연성 높음
- ✅ 사용자가 직접 매핑

**단점:**
- 🔴 추가 UI 컴포넌트 필요 (개발 2주)
- 🔴 사용자가 DB 컬럼명을 알아야 함 (UX 나쁨)

**Option C: AI가 추론**
```
사용자 엑셀: "거래처 이름"
DB 컬럼: "clientName"

AI 추론:
- "거래처 이름" ≈ "거래처명" ≈ "client" ≈ "clientName"
- Similarity Score: 0.85 → 매핑
```

**장점:**
- ✅ 유연성 매우 높음

**단점:**
- 🔴 구현 복잡도 극상
- 🔴 오류 가능성 여전히 존재
- 🔴 추가 AI 모델 필요 (Embedding, Similarity)

**질문: 설계팀은 어떤 옵션을 선호하시나요?**

---

### 2. **ExcelUtils의 실제 구현 복잡도**

설계팀이 제안한 `ExcelUtils.parseExcel()` 메서드를 실제로 구현하면:

```java
public static List<Map<String, Object>> parseExcel(
    MultipartFile file, 
    Map<String, String> columnMapping
) throws IOException {
    
    List<Map<String, Object>> result = new ArrayList<>();
    
    try (Workbook workbook = WorkbookFactory.create(file.getInputStream())) {
        Sheet sheet = workbook.getSheetAt(0);
        
        // 1. 헤더 행 읽기 (1번째 행)
        Row headerRow = sheet.getRow(0);
        if (headerRow == null) {
            throw new IllegalArgumentException("엑셀 파일에 헤더가 없습니다");
        }
        
        // 2. 헤더 매핑 검증
        Map<Integer, String> columnIndexMap = new HashMap<>();
        for (Cell cell : headerRow) {
            String excelHeader = cell.getStringCellValue().trim();
            String dbColumn = columnMapping.get(excelHeader);
            
            if (dbColumn == null) {
                // 🔴 문제: 매핑되지 않은 컬럼 처리?
                // - 무시? (데이터 손실)
                // - 에러? (업로드 실패)
                // - 경고? (로그만 남기고 계속?)
                log.warn("매핑되지 않은 컬럼: {}", excelHeader);
                continue; // 일단 무시
            }
            
            columnIndexMap.put(cell.getColumnIndex(), dbColumn);
        }
        
        // 3. 데이터 행 읽기 (2번째 행부터)
        DataFormatter formatter = new DataFormatter();
        
        for (int i = 1; i <= sheet.getLastRowNum(); i++) {
            Row row = sheet.getRow(i);
            if (row == null) continue; // 빈 행 스킵
            
            Map<String, Object> dataMap = new HashMap<>();
            boolean isEmpty = true;
            
            for (Map.Entry<Integer, String> entry : columnIndexMap.entrySet()) {
                int colIndex = entry.getKey();
                String dbColumn = entry.getValue();
                Cell cell = row.getCell(colIndex);
                
                if (cell == null) {
                    dataMap.put(dbColumn, null);
                    continue;
                }
                
                // 4. 셀 타입별 처리
                Object value = null;
                switch (cell.getCellType()) {
                    case STRING:
                        value = cell.getStringCellValue().trim();
                        break;
                    case NUMERIC:
                        if (DateUtil.isCellDateFormatted(cell)) {
                            value = cell.getDateCellValue(); // Date
                        } else {
                            value = cell.getNumericCellValue(); // Double
                        }
                        break;
                    case BOOLEAN:
                        value = cell.getBooleanCellValue();
                        break;
                    case FORMULA:
                        // 🔴 문제: 수식 셀 처리?
                        value = formatter.formatCellValue(cell);
                        break;
                    case BLANK:
                        value = null;
                        break;
                    default:
                        value = null;
                }
                
                if (value != null && !value.toString().isEmpty()) {
                    isEmpty = false;
                }
                
                dataMap.put(dbColumn, value);
            }
            
            if (!isEmpty) {
                result.add(dataMap);
            }
        }
        
        // 5. 데이터 검증
        if (result.isEmpty()) {
            throw new IllegalArgumentException("엑셀에 유효한 데이터가 없습니다");
        }
        
        return result;
        
    } catch (InvalidFormatException e) {
        throw new IOException("엑셀 파일 형식이 올바르지 않습니다", e);
    }
}
```

**실제 코드 라인 수: 약 100줄**

**추가 고려사항:**
```
1. 🔴 대용량 파일 처리 (100MB+ 엑셀)
   - 메모리 부족 (OutOfMemoryError)
   - Streaming API 필요 (SXSSFWorkbook)

2. 🔴 데이터 타입 변환 오류
   - 숫자로 입력되어야 하는데 문자로 입력
   - 날짜 형식 불일치 (2025-11-29 vs 2025/11/29)
   - Boolean 값 다양성 (true, TRUE, 1, Y, yes)

3. 🔴 병합된 셀(Merged Cells) 처리
   - POI는 병합 셀의 첫 번째 셀만 값을 가짐
   - 나머지 셀은 null → 데이터 누락

4. 🔴 다중 시트 처리
   - 첫 번째 시트만? 전체 시트?

5. 🔴 에러 리포팅
   - 3번째 행 2번째 컬럼에서 에러 발생
   - 사용자에게 어떻게 알려줄까?
```

**질문: ExcelUtils를 이렇게 견고하게 만들 시간이 있나요?**

---

### 3. **AI Generator가 생성해야 하는 코드의 복잡도**

설계팀 제안대로라면, AI는 다음 코드를 생성해야 합니다:

```java
@PostMapping("/{screen_id}/upload")
public Map<String, Object> upload(@RequestParam("file") MultipartFile file) {
    try {
        // 🔴 이 부분을 AI가 정확히 생성할 수 있나?
        Map<String, String> mapping = new HashMap<>();
        mapping.put("거래처명", "clientName");      // ← JSON 스키마에서 추론?
        mapping.put("품목코드", "itemCode");        // ← PI 문서에서 추론?
        mapping.put("수량", "qty");                 // ← 어떻게 알 수 있나?
        mapping.put("단가", "price");               // ← 한글→영문 매핑 규칙은?
        mapping.put("금액", "amount");

        List<Map<String, Object>> dataList = ExcelUtils.parseExcel(file, mapping);
        return service.uploadExcel(dataList);
    } catch (Exception e) {
        log.error("Excel Upload Error", e);
        throw new RuntimeException("업로드 실패: " + e.getMessage());
    }
}
```

**AI가 정확히 생성하려면:**

#### 필요 입력 정보
```json
{
  "excelColumns": [
    { "excelHeader": "거래처명", "dbColumn": "clientName", "type": "string" },
    { "excelHeader": "품목코드", "dbColumn": "itemCode", "type": "string" },
    { "excelHeader": "수량", "dbColumn": "qty", "type": "number" },
    { "excelHeader": "단가", "dbColumn": "price", "type": "number" },
    { "excelHeader": "금액", "dbColumn": "amount", "type": "number" }
  ]
}
```

**질문: 이 정보를 누가 작성하나?**

**Answer 1: PI 문서에 명시**
```
문제: 사용자가 이렇게 상세하게 쓸까?
현실: "판매 실적을 엑셀로 업로드" ← 이게 끝
```

**Answer 2: JSON 스키마에 추가**
```json
{
  "gridColumns": [ ... ],
  "excelMapping": [  // 새로운 속성 추가
    { "excel": "거래처명", "db": "clientName" }
  ]
}
```
```
문제: JSON 스키마를 누가 작성?
답: AI가 생성
질문: AI가 "거래처명"이라는 한글명을 어떻게 알아내나?
```

**Answer 3: 개발자가 수동으로 수정**
```
문제: AI 자동화의 의미가 없어짐
현실: 결국 이렇게 될 가능성 80%
```

---

### 4. **프론트엔드 통합 문제**

설계팀은 백엔드만 언급했지만, 프론트엔드도 구현해야 합니다.

#### 4.1 StandardPage.vue 수정 필요
```vue
<template>
  <div v-if="schemaData.features.excelUpload">
    <!-- 엑셀 업로드 UI -->
    <input type="file" @change="handleFileUpload" accept=".xlsx,.xls" />
    <button @click="uploadExcel">업로드</button>
    
    <!-- 진행률 표시 -->
    <progress v-if="uploading" :value="uploadProgress" max="100" />
    
    <!-- 에러 표시 -->
    <div v-if="uploadErrors.length > 0" class="error-list">
      <div v-for="error in uploadErrors" :key="error.row">
        {{ error.row }}번째 행: {{ error.message }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      uploading: false,
      uploadProgress: 0,
      uploadErrors: [],
      selectedFile: null
    }
  },
  methods: {
    handleFileUpload(event) {
      this.selectedFile = event.target.files[0]
      
      // 파일 크기 검증
      if (this.selectedFile.size > 10 * 1024 * 1024) { // 10MB
        alert('파일 크기는 10MB 이하여야 합니다')
        return
      }
      
      // 파일 형식 검증
      const validTypes = [
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-excel'
      ]
      if (!validTypes.includes(this.selectedFile.type)) {
        alert('엑셀 파일만 업로드 가능합니다')
        return
      }
    },
    
    async uploadExcel() {
      if (!this.selectedFile) {
        alert('파일을 선택해주세요')
        return
      }
      
      const formData = new FormData()
      formData.append('file', this.selectedFile)
      
      // 🔴 여기서 columnMapping도 함께 보내야 함
      // 하지만 이걸 어떻게 생성?
      const mapping = this.generateColumnMapping() // ???
      formData.append('mapping', JSON.stringify(mapping))
      
      this.uploading = true
      this.uploadProgress = 0
      this.uploadErrors = []
      
      try {
        const response = await fetch(
          `http://localhost:8080${this.schemaData.api.upload}`,
          {
            method: 'POST',
            body: formData,
            onUploadProgress: (progressEvent) => {
              this.uploadProgress = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              )
            }
          }
        )
        
        if (!response.ok) {
          const errorData = await response.json()
          this.uploadErrors = errorData.errors || []
          throw new Error('업로드 실패')
        }
        
        alert('업로드 완료')
        this.handleSearch() // 그리드 새로고침
        
      } catch (err) {
        console.error('Upload error:', err)
        alert('업로드 중 오류가 발생했습니다')
      } finally {
        this.uploading = false
      }
    },
    
    generateColumnMapping() {
      // 🔴 핵심 질문: 이걸 어떻게 생성?
      // gridColumns를 기반으로 자동 생성?
      const mapping = {}
      this.schemaData.gridColumns.forEach(col => {
        // 한글 헤더를 어떻게 알아내나?
        mapping[col.header] = col.field
      })
      return mapping
    }
  }
}
</script>
```

**추가 개발량:**
- ✅ 파일 선택 UI
- ✅ 진행률 표시
- ✅ 에러 목록 표시
- ❌ 컬럼 매핑 UI (Option B 선택 시)
- ❌ 미리보기 기능

**예상 개발 기간:** 2주

---

## 💡 개발자의 수정된 제안

### Proposal 1: 템플릿 기반 업로드 (권장)

**구현 전략:**
```
1. 엑셀 템플릿 다운로드 제공
   - 헤더가 영문으로 고정 (clientName, itemCode, qty, price)
   - 샘플 데이터 포함
   - 사용자가 이 템플릿에 데이터만 입력

2. 업로드 시 검증
   - 헤더가 템플릿과 일치하는지 확인
   - 일치하면 업로드, 불일치하면 거부

3. AI 생성 간소화
   - mapping 코드 불필요
   - gridColumns의 field명을 그대로 사용
```

**장점:**
- ✅ AI 생성 복잡도 낮음
- ✅ 오류 가능성 최소화
- ✅ 개발 기간 단축 (1주)

**단점:**
- 🔴 사용자 자유도 낮음
- 🔴 기존 엑셀 형식 사용 불가

**코드 예시:**
```java
@PostMapping("/{screen_id}/upload")
public Map<String, Object> upload(@RequestParam("file") MultipartFile file) {
    // 템플릿 검증
    List<String> expectedHeaders = Arrays.asList("clientName", "itemCode", "qty", "price");
    List<Map<String, Object>> dataList = ExcelUtils.parseExcelWithTemplate(file, expectedHeaders);
    
    return service.uploadExcel(dataList);
}
```

### Proposal 2: 단계적 구현 (강력 권장)

**Phase 4-A-1: 엑셀 다운로드만 구현 (1주)**
```
목표: 양방향 중 다운로드부터
- 현재 그리드 데이터를 Excel로 Export
- 템플릿 다운로드 기능
- 사용자 피드백 수집
```

**Phase 4-A-2: 템플릿 기반 업로드 (2주)**
```
목표: 제한적이지만 안정적인 업로드
- 템플릿과 일치하는 파일만 업로드
- 기본 검증 (필수값, 타입)
- 에러 리포팅
```

**Phase 4-A-3: 유연한 업로드 (4주, Optional)**
```
목표: 사용자 엑셀 형식 지원
- 컬럼 매핑 UI
- AI 헤더 추론 (선택)
- 고급 검증
```

---

## 🎯 핵심 질문 (설계팀 답변 요청)

### Q1. 엑셀 헤더 매핑 정보는 누가 제공하나?
```
□ PI 문서에 명시 (예: "엑셀의 '거래처명'은 DB의 client_name")
□ JSON 스키마에 추가 (예: "excelMapping" 속성)
□ AI가 추론 (비현실적)
□ 개발자가 수동 수정 (자동화 의미 없음)
□ 템플릿 강제 (영문 헤더 고정)
```

### Q2. 사용자 엑셀 형식의 자유도는?
```
□ 완전 자유 (어떤 엑셀도 가능) → 개발 8주+
□ 부분 자유 (매핑 UI 제공) → 개발 4주
□ 템플릿 강제 (고정 형식만) → 개발 1주
```

### Q3. 허용 가능한 개발 기간은?
```
□ 1주 (템플릿 기반)
□ 2주 (기본 업로드)
□ 4주 (유연한 업로드)
□ 8주 (완전 자동화)
```

### Q4. 매핑 실패 시 대응 전략은?
```
□ 업로드 거부 (엄격)
□ 매핑 UI 표시 (사용자 수동)
□ 기본값 사용 (위험)
```

---

## 📊 최종 권장사항

### 1. ExcelUtils 구현은 찬성 ✅
- 공통 유틸리티는 반드시 필요
- 단, 견고하게 만들 시간 확보 필요
- 예상 개발 기간: **1주**

### 2. 템플릿 기반 업로드 우선 구현 ✅
- AI 생성 복잡도 최소화
- 안정성 최대화
- 사용자 교육 용이
- 예상 개발 기간: **1주**

### 3. Phase 4 범위 조정 ✅
```
Week 1: ExcelUtils 구현
Week 2: 엑셀 다운로드 구현
Week 3: 템플릿 기반 업로드 구현
Week 4: 테스트 및 피드백
```
**총 4주**

### 4. 유연한 업로드는 Phase 5로 연기 ⏰
- 템플릿 방식이 안정화된 후
- 사용자 요구사항 수집 후
- AI 추론 기술 성숙 후

---

## 🤝 협의 요청

### 다음 주 월요일 회의 안건
```
1. 엑셀 업로드 UX 전략 결정
   - 템플릿 강제 vs 자유 형식

2. Phase 4 최종 범위 확정
   - ExcelUtils + 다운로드 + 템플릿 업로드 (4주)
   - vs 설계팀 원안 (10주)

3. JSON 스키마 v2.0 방향 조정
   - excelMapping 속성 추가 여부
   - features 플래그 상세 설계

4. AI Generator 프롬프트 개선 우선순위
   - 복잡한 기능 추가 vs 기본 기능 안정화
```

---

## 📝 결론

**설계팀의 공통 유틸리티 전략은 탁월합니다.**

하지만 **"악마는 디테일에 있다"**는 격언처럼, 실제 구현에는 여전히 많은 함정이 있습니다.

**핵심 문제:**
> AI가 엑셀 헤더 매핑 정보를 어떻게 정확히 생성하는가?

**현실적 해결책:**
> 템플릿 기반 업로드로 시작 → 점진적 유연화

**최종 입장:**
- ✅ ExcelUtils 구현 찬성
- ✅ @Transactional 강제 찬성
- ⚠️ 자유 형식 엑셀 업로드는 시기상조
- ✅ 템플릿 기반으로 시작하고 점진적 확장

**개발팀의 원칙:**
> "Move Steady and Build Things Right"
> (천천히 가되, 제대로 만들자)

---

**작성:** 개발팀 자비스  
**검토 요청:** 설계팀 PM  
**회의 제안:** 2025년 12월 2일 (월) 10:00
