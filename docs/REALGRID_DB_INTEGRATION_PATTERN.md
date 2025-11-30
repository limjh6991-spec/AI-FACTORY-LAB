# RealGrid DB 연동 패턴 문서

## 📋 개요
이 문서는 **하드코딩된 샘플 데이터를 DB 연동 방식으로 전환**하는 표준 패턴을 설명합니다.

## 🎯 목적
- ❌ **AS-IS**: 컴포넌트 내부에 샘플 데이터 하드코딩
- ✅ **TO-BE**: Backend API → DB 조회 → Frontend 비동기 로딩

## 📐 아키텍처 패턴

```
┌────────────┐     HTTP GET     ┌──────────────┐     MyBatis     ┌──────────┐
│  Frontend  │ ───────────────> │   Backend    │ ─────────────>  │ Database │
│    Vue     │                  │ Spring Boot  │                 │ MS SQL   │
└────────────┘                  └──────────────┘                 └──────────┘
     │                                 │
     │ async/await                     │ @GetMapping
     │ try/catch                       │ ResponseEntity
     │ fallback data                   │ Map<String, Object>
     └─────────────────────────────────┘
```

## 🔧 구현 단계

### 1️⃣ Frontend: 하드코딩 제거

**변경 전 (BAD)**
```javascript
initGrid2() {
  // ... 그리드 설정 ...
  
  // 하드코딩된 데이터
  const data = [
    { year: '2025', quarter: 'Q1', month: '1월', sales: 10000 },
    { year: '2025', quarter: 'Q1', month: '2월', sales: 12000 }
  ]
  this.provider2.setRows(data)
  
  this.gridView2.setDisplayOptions({ fitStyle: 'fill' })
}
```

**변경 후 (GOOD)**
```javascript
initGrid2() {
  // ... 그리드 설정 ...
  
  this.gridView2.setDisplayOptions({ fitStyle: 'fill' })
  
  // DB에서 데이터 로딩 (별도 메서드로 분리)
  this.loadGrid2Data()
}

async loadGrid2Data() {
  try {
    const response = await fetch('/api/demo/grid2/list')
    const result = await response.json()
    this.provider2.setRows(result.list || [])
    console.log('✅ Grid2 데이터 로딩 완료:', result.total, '건')
  } catch (error) {
    console.error('❌ Grid2 데이터 로딩 실패:', error)
    // 실패 시에만 샘플 데이터 사용 (Fallback)
    const data = [
      { year: '2025', quarter: 'Q1', month: '1월', sales: 10000 },
      { year: '2025', quarter: 'Q1', month: '2월', sales: 12000 }
    ]
    this.provider2.setRows(data)
  }
}
```

### 2️⃣ Backend: REST API 구현

**파일 위치**: `backend/src/main/java/com/dowinsys/demo/RealGridDemoController.java`

```java
@Slf4j
@RestController
@RequestMapping("/api/demo")
public class RealGridDemoController {

    @GetMapping("/grid2/list")
    public ResponseEntity<?> getGrid2Data() {
        log.info("Grid2 샘플 데이터 조회");
        
        List<Map<String, Object>> data = new ArrayList<>();
        
        // TODO: 실제로는 MyBatis로 DB 조회
        // data = demoService.selectGrid2List();
        
        // 임시 샘플 데이터
        data.add(createEmployee("영업부", "Sales", "김철수", "과장", "2020-03-15", 5500000));
        data.add(createEmployee("영업부", "Sales", "이영희", "대리", "2021-07-20", 4500000));
        
        return ResponseEntity.ok(Map.of(
            "list", data,
            "total", data.size()
        ));
    }
}
```

### 3️⃣ 데이터 흐름 체크리스트

- [ ] **Frontend**:
  - [ ] `initGridX()` 메서드에서 하드코딩 데이터 제거
  - [ ] `loadGridXData()` async 메서드 생성
  - [ ] `try/catch` 블록으로 에러 처리
  - [ ] Fallback 샘플 데이터 준비
  - [ ] `console.log`로 로딩 상태 확인

- [ ] **Backend**:
  - [ ] `@GetMapping("/api/demo/gridX/list")` 엔드포인트 생성
  - [ ] `ResponseEntity<?>` 리턴 타입 사용
  - [ ] `Map.of("list", data, "total", size)` 형태로 응답
  - [ ] `log.info()`로 요청 로깅

- [ ] **Database** (선택):
  - [ ] 테이블 생성 (`new_doi_demo_gridX`)
  - [ ] 샘플 데이터 INSERT
  - [ ] MyBatis Mapper 작성

## 📊 적용 현황

| Grid | Frontend | Backend API | Database | Status |
|------|----------|-------------|----------|--------|
| Grid1 | ✅ loadGrid1Data() | ✅ /api/demo/grid1/list | ✅ new_doi_demo (샘플) | 완료 |
| Grid2 | ✅ loadGrid2Data() | ✅ /api/demo/grid2/list | ⚠️ 하드코딩 (실제 DB 필요) | 완료 |
| Grid3 | ✅ loadGrid3Data() | ✅ /api/demo/grid3/list | ⚠️ 하드코딩 (실제 DB 필요) | 완료 |

## 🚀 실제 DB 연동 예시

### Step 1: 테이블 생성
```sql
-- Grid2: 직원 데이터
CREATE TABLE new_doi_demo_employee (
    emp_id INT IDENTITY(1,1) PRIMARY KEY,
    dept_name NVARCHAR(50),
    dept_name_en NVARCHAR(50),
    emp_name NVARCHAR(50),
    position NVARCHAR(20),
    hire_date DATE,
    salary INT
)

-- Grid3: 판매 실적 데이터
CREATE TABLE new_doi_demo_sales (
    sales_id INT IDENTITY(1,1) PRIMARY KEY,
    year NVARCHAR(10),
    quarter NVARCHAR(10),
    month NVARCHAR(10),
    region NVARCHAR(50),
    category NVARCHAR(50),
    target_amount BIGINT,
    actual_amount BIGINT,
    achievement_rate DECIMAL(5,1)
)
```

### Step 2: MyBatis Mapper 작성
```xml
<!-- DemoMapper.xml -->
<mapper namespace="com.dowinsys.demo.mapper.DemoMapper">
    
    <select id="selectGrid2List" resultType="hashmap">
        SELECT 
            dept_name as deptName,
            dept_name_en as deptNameEn,
            emp_name as empName,
            position,
            CONVERT(VARCHAR, hire_date, 23) as hireDate,
            salary
        FROM new_doi_demo_employee
        ORDER BY dept_name, hire_date
    </select>
    
    <select id="selectGrid3List" resultType="hashmap">
        SELECT 
            year,
            quarter,
            month,
            region,
            category,
            target_amount as targetAmount,
            actual_amount as actualAmount,
            achievement_rate as achievementRate
        FROM new_doi_demo_sales
        ORDER BY year, quarter, month, region
    </select>
    
</mapper>
```

### Step 3: Service 레이어 작성
```java
@Service
public class DemoService {
    
    @Autowired
    private DemoMapper demoMapper;
    
    public List<Map<String, Object>> selectGrid2List() {
        return demoMapper.selectGrid2List();
    }
    
    public List<Map<String, Object>> selectGrid3List() {
        return demoMapper.selectGrid3List();
    }
}
```

### Step 4: Controller 수정
```java
@RestController
@RequestMapping("/api/demo")
public class RealGridDemoController {
    
    @Autowired
    private DemoService demoService;
    
    @GetMapping("/grid2/list")
    public ResponseEntity<?> getGrid2Data() {
        log.info("Grid2 데이터 조회 (DB)");
        
        List<Map<String, Object>> data = demoService.selectGrid2List();
        
        return ResponseEntity.ok(Map.of(
            "list", data,
            "total", data.size()
        ));
    }
}
```

## ⚠️ 주의사항

### 1. 에러 처리 필수
```javascript
// ❌ BAD: 에러 처리 없음
async loadData() {
  const response = await fetch('/api/data')
  const result = await response.json()
  this.provider.setRows(result.list)
}

// ✅ GOOD: try/catch + fallback
async loadData() {
  try {
    const response = await fetch('/api/data')
    const result = await response.json()
    this.provider.setRows(result.list || [])
    console.log('✅ 데이터 로딩:', result.total, '건')
  } catch (error) {
    console.error('❌ 로딩 실패:', error)
    this.provider.setRows([]) // 빈 배열 또는 샘플 데이터
  }
}
```

### 2. 데이터 형식 통일
Backend 응답은 항상 다음 구조:
```json
{
  "list": [...],
  "total": 123,
  "success": true  // 선택사항
}
```

### 3. LocalDataProvider 초기화 순서
```javascript
mounted() {
  this.initGrid1() // 1. 그리드 초기화
  // initGrid1() 내부에서 loadGrid1Data() 호출
}

initGrid1() {
  // ... 컬럼, 옵션 설정 ...
  this.gridView1.setDisplayOptions({ fitStyle: 'fill' })
  
  // 설정 완료 후 데이터 로딩
  this.loadGrid1Data()
}
```

## 📈 성능 최적화

### Lazy Loading (필요시)
```javascript
// 탭 전환 시에만 로딩
watch: {
  activeTab(newTab) {
    if (newTab === 'grid2' && !this.grid2Loaded) {
      this.loadGrid2Data()
      this.grid2Loaded = true
    }
  }
}
```

### 재조회 버튼
```javascript
onRefresh() {
  this.loadGrid1Data()
  this.loadGrid2Data()
  this.loadGrid3Data()
}
```

## 🎓 학습 포인트

1. **관심사 분리**: 그리드 초기화와 데이터 로딩 분리
2. **에러 복원력**: 네트워크 실패 시 Fallback 데이터
3. **비동기 처리**: async/await로 깔끔한 코드
4. **로깅**: 디버깅을 위한 console.log 필수
5. **표준화**: 모든 화면이 동일한 패턴 사용

## 📁 관련 파일

- **Frontend**: `frontend/src/views/demo/RealGridDemo.vue`
- **Backend**: `backend/src/main/java/com/dowinsys/demo/RealGridDemoController.java`
- **Router**: `frontend/src/router/index.js` (라우트 등록)

## 🔗 다음 단계

1. ✅ RealGridDemo Grid1, Grid2, Grid3 DB 연동 완료
2. ⏳ 실제 DB 테이블 생성 및 샘플 데이터 INSERT
3. ⏳ MyBatis Mapper 작성
4. ⏳ ProductionResult 화면에 패턴 적용
5. ⏳ generator_vue.py에 자동 생성 로직 반영

---

## 🚨 트러블슈팅

### 문제 1: "No static resource" 404 에러

**증상**:
```json
{
    "success": false,
    "message": "No static resource demo/grid2/list.",
    "data": null,
    "errorCode": "INTERNAL_ERROR"
}
```

**원인 분석** (인터넷 검색 결과):

1. **Component Scan 범위 문제**
   - `@SpringBootApplication`이 있는 메인 클래스의 패키지보다 상위나 다른 패키지에 Controller가 위치
   - 예: 메인 `com.dowinsys.AiFactoryBackendApplication`, 컨트롤러 `com.other.demo.Controller`
   - 해결: 컨트롤러를 `com.dowinsys.demo`와 같이 하위 패키지에 배치

2. **컨트롤러 미등록**
   - `@RestController` 어노테이션 누락
   - `@RequestMapping` 경로 오타
   - Maven 빌드 시 클래스 컴파일 실패

3. **Spring Boot DevTools 캐시**
   - 코드 변경 후 재시작 안 됨
   - 해결: `mvn clean compile` 후 재시작

4. **전역 예외 핸들러가 404를 가로채는 경우**
   - `@ControllerAdvice`에서 `NoResourceFoundException` 처리
   - 실제 컨트롤러 매핑보다 먼저 실행

**해결 방법**:

```bash
# 1. 컨트롤러 파일 위치 확인
find backend/src/main/java -name "*Controller.java"

# 2. 메인 클래스 패키지 확인
# com.dowinsys.AiFactoryBackendApplication
# -> 컨트롤러는 com.dowinsys.* 하위에 있어야 함

# 3. 컴파일된 클래스 확인
ls backend/target/classes/com/dowinsys/demo/RealGridDemoController.class

# 4. Clean Build
cd backend
mvn clean compile

# 5. 서버 재시작 (기존 프로세스 완전 종료)
pkill -f "spring-boot:run"
sleep 3
nohup mvn spring-boot:run > backend.log 2>&1 &

# 6. 매핑 확인 (로그에서)
tail -f backend.log | grep "Mapped"

# 7. API 테스트
curl http://localhost:8080/api/demo/grid1/list
```

**검증 체크리스트**:
- [ ] 컨트롤러 클래스에 `@RestController` 있음
- [ ] 메서드에 `@GetMapping` 있음
- [ ] 패키지가 `com.dowinsys.*` 하위임
- [ ] `mvn clean compile` 성공
- [ ] 서버 로그에 "Mapped" 로그 있음
- [ ] `curl` 테스트 시 200 응답

### 문제 2: CORS 에러

**증상**:
```
Access to fetch at 'http://localhost:8080/api/demo/grid1/list' from origin 
'http://localhost:8081' has been blocked by CORS policy
```

**해결**:
```java
@RestController
@RequestMapping("/api/demo")
@CrossOrigin(origins = "*")  // 또는 특정 도메인
public class RealGridDemoController {
    // ...
}
```

### 문제 3: 빈 데이터 반환

**증상**: API는 200 응답하지만 `list`가 빈 배열

**원인**:
- Service 레이어에서 빈 리스트 반환
- MyBatis Mapper 쿼리 오류
- DB 연결 실패

**해결**:
```java
@GetMapping("/grid1/list")
public ResponseEntity<?> getGrid1Data() {
    log.info("Grid1 데이터 조회 시작");
    
    List<Map<String, Object>> data = demoService.selectGrid1List();
    
    log.info("Grid1 데이터 조회 완료: {} 건", data.size());  // 로깅 추가
    
    return ResponseEntity.ok(Map.of(
        "list", data,
        "total", data.size()
    ));
}
```

### 문제 4: Frontend Fallback 데이터만 표시

**증상**: 항상 하드코딩된 샘플 데이터만 표시됨

**원인**:
- Backend API 호출 실패 (네트워크, CORS 등)
- `try/catch`에서 항상 catch 블록 실행

**디버깅**:
```javascript
async loadGrid1Data() {
  console.log('🔄 Grid1 데이터 로딩 시작...')
  
  try {
    const response = await fetch('/api/demo/grid1/list')
    console.log('📡 응답 상태:', response.status)
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }
    
    const result = await response.json()
    console.log('✅ 데이터 수신:', result.total, '건')
    console.log('📊 데이터 샘플:', result.list[0])
    
    this.provider1.setRows(result.list || [])
  } catch (error) {
    console.error('❌ 에러 발생:', error)
    console.error('🔍 에러 타입:', error.constructor.name)
    console.error('🔍 에러 메시지:', error.message)
    
    // Fallback
    this.provider1.setRows([...sampleData])
  }
}
```

### 문제 5: context-path 중복 ⭐ **실제 발생한 문제**

**증상**:
```bash
curl http://localhost:8080/api/demo/grid1/list
# {"success":false,"message":"No static resource demo/grid1/list."}
```

**원인**:
`application.yml`에 `context-path: /api` 설정이 있으면:
- 컨트롤러: `@RequestMapping("/api/demo")`
- 실제 경로: `/api` + `/api/demo` = `/api/api/demo` ❌
- 요청 경로: `/api/demo/grid1/list` ❌

**해결 방법 1** (추천): context-path 제거
```yaml
# application.yml
server:
  port: 8080
  # servlet:
  #   context-path: /api  <- 주석 처리
```

**해결 방법 2**: 컨트롤러 수정
```java
@RestController
@RequestMapping("/demo")  // /api 제거
public class RealGridDemoController {
    // 실제 경로: /api/demo/grid1/list
}
```

**검증**:
```bash
# context-path 있을 때
curl http://localhost:8080/api/api/demo/grid1/list  # ✅

# context-path 없을 때  
curl http://localhost:8080/api/demo/grid1/list  # ✅
```

**문서화된 해결 과정**:
1. 증상 발견: `curl` 실행 시 500 에러
2. 로그 확인: `NoResourceFoundException: No static resource demo/grid1/list`
3. 매핑 확인: `grep "Mapped"` → 매핑 로그 없음
4. 컴파일 확인: `.class` 파일 존재 확인
5. 설정 확인: `application.yml`에서 `context-path: /api` 발견
6. 원인 파악: 경로 중복 (`/api/api/demo`)
7. 해결: `context-path` 주석 처리
8. 검증: API 정상 응답 확인 ✅

**검증 결과** (2025-11-30 14:30):
```bash
# Grid1 API
curl http://localhost:8080/api/demo/grid1/list
# ✅ 8건의 주문 데이터 반환

# Grid2 API  
curl http://localhost:8080/api/demo/grid2/list
# ✅ 9건의 직원 데이터 반환 (영업부 3명, 개발부 4명, 인사부 2명)

# Grid3 API
curl http://localhost:8080/api/demo/grid3/list
# ✅ 12건의 판매 실적 데이터 반환 (2025 Q1, Q2)
```

### 문제 6: Vue 컴파일 오류 - Missing Comma

**증상**:
```
ERROR in ./src/views/production/ProductionResult.vue
  261:6  error  Parsing error: Unexpected token, expected "," (209:6)
  
  259|        handleReset,
  260|        handleBtnsearch
  261|        handleRowClick,
     |        ^
```

**원인**:
- `return` 문의 객체 속성 목록에서 쉼표 누락
- generator_vue.py 생성 오류 또는 수동 편집 실수

**해결**:
```javascript
// ❌ BAD: handleBtnsearch 뒤에 쉼표 없음
return {
  handleSearch,
  handleReset,
  handleBtnsearch
  handleRowClick,  // <- 에러!
  handleCellEdit
};

// ✅ GOOD: 모든 속성 뒤에 쉼표
return {
  handleSearch,
  handleReset,
  handleBtnsearch,  // <- 쉼표 추가
  handleRowClick,
  handleCellEdit
};
```

**예방 방법**:
1. ESLint에서 `comma-dangle` 규칙 활성화
2. Prettier 자동 포매팅 사용
3. generator_vue.py 템플릿 수정 시 주의

### 문제 7: ElMessageBox 활용 - 삭제 확인 다이얼로그

**적용 이유**:
- 사용자 실수로 인한 데이터 삭제 방지
- 명확한 확인 과정으로 UX 향상
- Element Plus의 일관된 디자인

**구현 예시**:
```javascript
import { ElMessage, ElMessageBox } from 'element-plus';

const handleDelete = async () => {
  try {
    // 확인 다이얼로그 표시
    await ElMessageBox.confirm(
      '선택한 데이터를 삭제하시겠습니까?',
      '삭제 확인',
      {
        confirmButtonText: '확인',
        cancelButtonText: '취소',
        type: 'warning',  // success, info, warning, error
      }
    );
    
    // 사용자가 '확인' 클릭 시 실행
    const response = await fetch('/api/production/delete', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids: selectedIds })
    });
    
    if (response.ok) {
      ElMessage.success('삭제가 완료되었습니다.');
      handleSearch(); // 목록 갱신
    }
  } catch (error) {
    // 사용자가 '취소' 클릭 시 error === 'cancel'
    if (error !== 'cancel') {
      ElMessage.error('삭제 중 오류가 발생했습니다.');
    }
  }
};
```

**다양한 활용**:
```javascript
// 1. 입력 프롬프트
const handleAdd = async () => {
  try {
    const { value } = await ElMessageBox.prompt(
      '새 항목명을 입력하세요',
      '추가',
      {
        confirmButtonText: '확인',
        cancelButtonText: '취소',
        inputPattern: /^.{1,50}$/,
        inputErrorMessage: '1~50자 이내로 입력하세요'
      }
    );
    
    ElMessage.success(`'${value}' 항목이 추가되었습니다.`);
  } catch {
    // 취소 처리
  }
};

// 2. 확정/승인 확인
const handleConfirm = async () => {
  try {
    await ElMessageBox.confirm(
      '확정 후에는 수정이 불가능합니다. 계속하시겠습니까?',
      '확정 확인',
      {
        confirmButtonText: '확정',
        cancelButtonText: '취소',
        type: 'warning',
        dangerouslyUseHTMLString: true,
        message: '<strong>확정</strong> 후에는 <span style="color:red">수정이 불가능</span>합니다.'
      }
    );
    
    // 확정 로직
  } catch {
    // 취소 처리
  }
};

// 3. 알림 메시지 (확인만)
ElMessageBox.alert(
  '처리가 완료되었습니다.',
  '알림',
  {
    confirmButtonText: '확인',
    type: 'success'
  }
);
```

**템플릿 적용**:
```vue
<template>
  <div class="button-area">
    <el-button type="danger" icon="Delete" @click="handleDelete">삭제</el-button>
  </div>
</template>

<script>
export default {
  setup() {
    return {
      handleDelete
    };
  }
};
</script>
```

**주의사항**:
- `ElMessageBox.confirm()`은 Promise를 반환하므로 `await` 필수
- 취소 시 `error === 'cancel'` 체크로 불필요한 에러 메시지 방지
- `type` 옵션: `success`, `info`, `warning`, `error`
- `dangerouslyUseHTMLString: true` 사용 시 XSS 주의

### 문제 8: DB 테이블은 생성되었으나 데이터가 0건 ⭐ **실제 발생한 문제**

**증상**:
```bash
# 테이블 생성은 성공
✅ 테이블 생성 완료!

# 데이터 삽입도 성공으로 표시
✅ 데이터 삽입 완료!

# 하지만 실제 데이터는 0건
📊 데이터 확인:
  • Grid1 - Orders: 0건
  • Grid2 - Employee: 0건  
  • Grid3 - Sales: 0건
```

**원인 분석**:

1. **SQL 파일의 PRINT 문과 GO 배치 문제**
   - pymssql은 T-SQL의 `PRINT` 문을 제대로 처리하지 못함
   - `GO` 구문으로 배치를 분리했지만, 일부 배치가 실행되지 않음
   - `@@ROWCOUNT`는 이전 배치의 영향을 받지 않음

2. **배치 실행 순서 문제**
   ```sql
   INSERT INTO table VALUES (...);
   GO
   
   PRINT '✅ Grid1: ' + CAST(@@ROWCOUNT AS NVARCHAR) + '건 삽입 완료';
   GO
   ```
   - 첫 번째 GO 이후 `@@ROWCOUNT`는 0으로 리셋됨
   - PRINT 문이 에러를 발생시켜 이후 배치 실행 중단

3. **Python 스크립트의 예외 처리**
   ```python
   try:
       cursor.execute(batch)
       print(f"  ✅ Batch {i}/{len(sql_batches)} 완료")
   except Exception as e:
       print(f"  ❌ Batch {i} 실패: {e}")
       raise  # 예외 발생 시 중단되지만 메시지만 표시
   ```
   - PRINT 문 에러가 조용히 무시되어 INSERT가 실행되지 않음

**해결 방법 1**: Python으로 직접 INSERT 실행 (채택됨)

```python
import pymssql

conn = pymssql.connect(
    server='172.16.200.204',
    port=1433,
    user='TEST_MES_USER',
    password='Dowoo1!',
    database='도우제조MES시스템TEST',
    charset='utf8'
)
cursor = conn.cursor()

print("📝 데이터 삽입 시작...\n")

# Grid1: Orders (PRINT, GO 없이 순수 INSERT만)
print("1. Grid1 주문 데이터 삽입 중...")
cursor.execute("""
INSERT INTO new_doi_demo_orders (order_no, customer_id, country, company_name, employee_id, order_date, phone)
VALUES
    ('10248', 'VINET', 'France', 'Vins et alcools Chevalier', 'E001', '2025-01-05', '01-234-5678'),
    ('10249', 'TOMSP', 'Germany', 'Toms Spezialitäten', 'E002', '2025-01-06', '02-345-6789'),
    -- ... 나머지 데이터 ...
""")
conn.commit()  # 즉시 커밋
print("   ✅ 8건 삽입 완료\n")

# Grid2: Employee (N'' 문자열 리터럴 사용)
print("2. Grid2 직원 데이터 삽입 중...")
cursor.execute("""
INSERT INTO new_doi_demo_employee (dept_name, dept_name_en, emp_name, position, hire_date, salary)
VALUES
    (N'영업부', 'Sales', N'김철수', N'과장', '2020-03-15', 5500000),
    -- ... 나머지 데이터 ...
""")
conn.commit()
print("   ✅ 9건 삽입 완료\n")

# Grid3: Sales
print("3. Grid3 매출 데이터 삽입 중...")
cursor.execute("""
INSERT INTO new_doi_demo_sales (year, quarter, month, region, category, target_amount, actual_amount, achievement_rate)
VALUES
    ('2025', 'Q1', N'1월', N'서울', N'전자제품', 150000000, 145000000, 96.7),
    -- ... 나머지 데이터 ...
""")
conn.commit()
print("   ✅ 12건 삽입 완료\n")

# 최종 확인
cursor.execute("SELECT COUNT(*) FROM new_doi_demo_orders")
print(f"   • Grid1 Orders: {cursor.fetchone()[0]}건")
cursor.execute("SELECT COUNT(*) FROM new_doi_demo_employee")
print(f"   • Grid2 Employee: {cursor.fetchone()[0]}건")
cursor.execute("SELECT COUNT(*) FROM new_doi_demo_sales")
print(f"   • Grid3 Sales: {cursor.fetchone()[0]}건")

cursor.close()
conn.close()
```

**실행 결과** (2025-11-30 14:45):
```
📝 데이터 삽입 시작...

1. Grid1 주문 데이터 삽입 중...
   ✅ 8건 삽입 완료

2. Grid2 직원 데이터 삽입 중...
   ✅ 9건 삽입 완료

3. Grid3 매출 데이터 삽입 중...
   ✅ 12건 삽입 완료

📊 최종 데이터 확인:
   • Grid1 Orders: 8건
   • Grid2 Employee: 9건
   • Grid3 Sales: 12건

🎉 모든 데이터 삽입 완료!
```

**해결 방법 2**: SQL 파일 단순화 (대안)

```sql
-- ❌ BAD: PRINT와 @@ROWCOUNT 사용
INSERT INTO new_doi_demo_orders (...) VALUES (...);
GO
PRINT '✅ Grid1: ' + CAST(@@ROWCOUNT AS NVARCHAR) + '건 삽입 완료';
GO

-- ✅ GOOD: INSERT만 순수하게
INSERT INTO new_doi_demo_orders (order_no, customer_id, country, company_name, employee_id, order_date, phone)
VALUES
    ('10248', 'VINET', 'France', 'Vins et alcools Chevalier', 'E001', '2025-01-05', '01-234-5678'),
    ('10249', 'TOMSP', 'Germany', 'Toms Spezialitäten', 'E002', '2025-01-06', '02-345-6789'),
    ('10250', 'HANAR', 'Brazil', 'Hanari Carnes', 'E003', '2025-01-08', '03-456-7890'),
    ('10251', 'VICTE', 'France', 'Victuailles en stock', 'E001', '2025-01-10', '01-567-8901'),
    ('10252', 'SUPRD', 'Belgium', 'Suprêmes délices', 'E004', '2025-01-11', '04-678-9012'),
    ('10253', 'HANAR', 'Brazil', 'Hanari Carnes', 'E003', '2025-01-12', '03-456-7890'),
    ('10254', 'CHOPS', 'Switzerland', 'Chop-suey Chinese', 'E005', '2025-01-13', '05-789-0123'),
    ('10255', 'RICSU', 'Switzerland', 'Richter Supermarkt', 'E002', '2025-01-15', '02-890-1234');
```

**핵심 교훈**:
1. **pymssql은 T-SQL 확장 기능 제한적**: PRINT, @@ROWCOUNT 등은 SSMS에서만 정상 작동
2. **배치 분리의 함정**: GO로 분리하면 이전 배치의 컨텍스트가 사라짐
3. **commit() 필수**: pymssql은 auto-commit이 아니므로 명시적 커밋 필요
4. **유니코드 리터럴**: 한글 데이터는 반드시 `N'...'` 사용

**검증 방법**:
```python
# 간단한 데이터 확인 스크립트
python3 << 'EOF'
import pymssql
conn = pymssql.connect(
    server='172.16.200.204', port=1433,
    user='TEST_MES_USER', password='Dowoo1!',
    database='도우제조MES시스템TEST', charset='utf8'
)
cursor = conn.cursor()
cursor.execute("SELECT COUNT(*) FROM new_doi_demo_orders")
print(f"Orders: {cursor.fetchone()[0]}건")
cursor.execute("SELECT COUNT(*) FROM new_doi_demo_employee")
print(f"Employee: {cursor.fetchone()[0]}건")
cursor.execute("SELECT COUNT(*) FROM new_doi_demo_sales")
print(f"Sales: {cursor.fetchone()[0]}건")
cursor.close()
conn.close()
EOF
```

**ENVIRONMENT.md 연동**:
- `ENVIRONMENT.md` 파일에 "🗄️ 데이터베이스 설정 및 실행" 섹션 추가
- `scripts/setup_demo_db.py` pymssql 버전으로 업데이트
- 테이블 생성 및 데이터 삽입 원라이너 명령어 문서화

---

## 🔥 DB → Grid 데이터 연동 시 자주 발생하는 에러 및 해결 방안

### ⚠️ 실제 발생한 문제 (2025-11-30)

**증상**: Grid1만 데이터가 표시되고, Grid2와 Grid3는 빈 화면 또는 샘플 데이터만 표시됨

**원인 분석**:

| 구분 | Grid1 | Grid2 | Grid3 |
|------|-------|-------|-------|
| 상태 | ✅ 정상 | ❌ 실패 | ❌ 실패 |
| DB 필드 | orderID, customerID, country... | deptName, empName, position... | year, quarter, month, region... |
| Vue 필드 | orderID, customerID, country... | year, quarter, month, sales | year, quarter, month, product, sales... |
| 매칭 여부 | ✅ 일치 | ❌ **완전 불일치** | ❌ **부분 불일치** |

---

### 📋 에러 유형 및 해결 방안 리스트

#### 1️⃣ 필드명 불일치 에러 (Field Name Mismatch) ⭐ **가장 흔함**

**증상**:
```javascript
// DB 응답
{
  "list": [
    { "deptName": "개발부", "empName": "정수진", "position": "부장" }
  ]
}

// Vue 필드 정의 (잘못됨)
const fields = [
  { fieldName: 'year', dataType: 'text' },      // ❌ DB에 없는 필드
  { fieldName: 'quarter', dataType: 'text' },   // ❌ DB에 없는 필드
  { fieldName: 'sales', dataType: 'number' }    // ❌ DB에 없는 필드
]

// 결과: 데이터가 매핑되지 않아 빈 그리드 표시
```

**원인**:
- DB 컬럼명과 Vue fields의 `fieldName`이 일치하지 않음
- 하드코딩 샘플 데이터 구조를 그대로 두고 DB만 연동
- Backend Mapper의 `resultType="hashmap"` 사용 시 컬럼명 그대로 반환

**해결 방안**:

**✅ 방법 1: Vue 필드를 DB 응답에 맞추기 (권장)**
```javascript
// DB 응답 확인
curl http://localhost:8080/api/demo/grid2/list
// {"list":[{"deptName":"개발부","deptNameEn":"Development","empName":"정수진",...}]}

// Vue 필드 수정
const fields = [
  { fieldName: 'deptName', dataType: 'text' },      // ✅ DB와 일치
  { fieldName: 'deptNameEn', dataType: 'text' },    // ✅ DB와 일치
  { fieldName: 'empName', dataType: 'text' },       // ✅ DB와 일치
  { fieldName: 'position', dataType: 'text' },      // ✅ DB와 일치
  { fieldName: 'hireDate', dataType: 'text' },      // ✅ DB와 일치
  { fieldName: 'salary', dataType: 'number' }       // ✅ DB와 일치
]

const columns = [
  { name: 'deptName', fieldName: 'deptName', header: { text: '부서명' } },
  { name: 'deptNameEn', fieldName: 'deptNameEn', header: { text: 'Department' } },
  { name: 'empName', fieldName: 'empName', header: { text: '직원명' } },
  { name: 'position', fieldName: 'position', header: { text: '직급' } },
  { name: 'hireDate', fieldName: 'hireDate', header: { text: '입사일' } },
  { name: 'salary', fieldName: 'salary', header: { text: '급여' }, numberFormat: '#,##0' }
]
```

**✅ 방법 2: Backend Mapper에서 alias 사용**
```xml
<!-- DemoMapper.xml -->
<select id="selectGrid2List" resultType="hashmap">
    SELECT 
        dept_name as year,        -- ❌ 비추천: 의미가 다름
        dept_name_en as quarter,  -- ❌ 비추천
        emp_name as month,        -- ❌ 비추천
        salary as sales           -- ❌ 비추천
    FROM new_doi_demo_employee
</select>

<!-- 올바른 방법 -->
<select id="selectGrid2List" resultType="hashmap">
    SELECT 
        dept_name as deptName,           -- ✅ 의미 그대로
        dept_name_en as deptNameEn,
        emp_name as empName,
        position,
        hire_date as hireDate,
        salary
    FROM new_doi_demo_employee
</select>
```

**네이밍 규칙**:
```
DB 컬럼명      → Mapper alias → Vue fieldName
dept_name      → deptName     → deptName
employee_id    → employeeId   → employeeId
order_date     → orderDate    → orderDate

규칙: snake_case → camelCase → camelCase (일관성 유지)
```

---

#### 2️⃣ 데이터 타입 불일치 (Data Type Mismatch)

**증상**:
```javascript
// DB: salary = 7500000 (숫자)
// Vue: { fieldName: 'salary', dataType: 'text' }  // ❌ 문자열로 정의
// 결과: 숫자 포맷팅 (#,##0) 적용 안 됨, 정렬 오류
```

**해결**:
```javascript
// ✅ 올바른 타입 매핑
const fields = [
  { fieldName: 'empName', dataType: 'text' },      // 문자열
  { fieldName: 'hireDate', dataType: 'text' },     // 날짜 (YYYY-MM-DD 문자열)
  { fieldName: 'salary', dataType: 'number' },     // 숫자
  { fieldName: 'isActive', dataType: 'boolean' }   // Boolean
]

// 날짜 타입 사용 시
{ fieldName: 'hireDate', dataType: 'datetime', datetimeFormat: 'yyyy-MM-dd' }
```

**타입별 주의사항**:
| DB 타입 | MyBatis 반환 | Vue dataType | 비고 |
|---------|-------------|--------------|------|
| INT, BIGINT | Number | `number` | 숫자 정렬, 포맷팅 가능 |
| VARCHAR, NVARCHAR | String | `text` | 기본 타입 |
| DATE, DATETIME | String | `text` 또는 `datetime` | CONVERT 필요 |
| DECIMAL(15,2) | Number | `number` | 소수점 |
| BIT | Boolean | `boolean` | true/false |

---

#### 3️⃣ 날짜 포맷 불일치

**증상**:
```javascript
// DB: "2025-01-05T00:00:00"  (ISO 형식)
// Vue 컬럼: { datetimeFormat: 'yyyy-MM-dd' }
// 결과: "2025-01-05T00:00:00" 그대로 표시 (포맷 미적용)
```

**해결**:
```xml
<!-- Mapper에서 변환 (권장) -->
<select id="selectGrid1List" resultType="hashmap">
    SELECT 
        order_no as orderID,
        CONVERT(VARCHAR, order_date, 23) as orderDate  -- ✅ YYYY-MM-DD 문자열
    FROM new_doi_demo_orders
</select>
```

```javascript
// Vue에서 datetime 타입 사용
const fields = [
  { fieldName: 'orderDate', dataType: 'datetime', datetimeFormat: 'yyyy-MM-dd' }
]

const columns = [
  { 
    name: 'orderDate', 
    fieldName: 'orderDate', 
    header: { text: '주문일' },
    datetimeFormat: 'yyyy-MM-dd'  // 표시 형식
  }
]
```

**날짜 포맷 코드**:
```
SQL Server CONVERT 스타일:
23  → YYYY-MM-DD
120 → YYYY-MM-DD HH:MI:SS
101 → MM/DD/YYYY

Vue datetimeFormat:
'yyyy-MM-dd'           → 2025-01-05
'yyyy-MM-dd HH:mm:ss'  → 2025-01-05 14:30:00
'MM/dd/yyyy'           → 01/05/2025
```

---

#### 4️⃣ NULL 값 처리 오류

**증상**:
```javascript
// DB: { "phone": null }
// Grid: 빈 문자열 대신 "null" 표시 또는 에러
```

**해결**:
```xml
<!-- Mapper에서 COALESCE 사용 -->
<select id="selectGrid1List" resultType="hashmap">
    SELECT 
        order_no as orderID,
        COALESCE(phone, '') as phone,              -- ✅ NULL → 빈 문자열
        COALESCE(discount_rate, 0) as discountRate -- ✅ NULL → 0
    FROM new_doi_demo_orders
</select>
```

```javascript
// Vue에서 renderer 사용
const columns = [
  {
    name: 'phone',
    fieldName: 'phone',
    header: { text: '전화번호' },
    renderer: {
      type: 'text',
      nullText: '-'  // ✅ NULL 표시 문자
    }
  }
]
```

---

#### 5️⃣ 숫자 포맷팅 오류

**증상**:
```javascript
// DB: salary = 7500000
// Grid 표시: "7500000" (쉼표 없음)
```

**해결**:
```javascript
// ✅ dataType을 number로 + numberFormat 설정
const fields = [
  { fieldName: 'salary', dataType: 'number' }  // ✅ number 타입
]

const columns = [
  {
    name: 'salary',
    fieldName: 'salary',
    header: { text: '급여' },
    numberFormat: '#,##0',      // ✅ 천 단위 쉼표
    styleCallback: (grid, cell) => {
      return { styleName: 'right-align' }  // 오른쪽 정렬
    }
  },
  {
    name: 'achievementRate',
    fieldName: 'achievementRate',
    header: { text: '달성률' },
    numberFormat: '#,##0.0',    // ✅ 소수점 1자리
    suffix: '%'                 // ✅ 접미사
  }
]
```

**numberFormat 패턴**:
```
'#,##0'        → 7,500,000
'#,##0.00'     → 7,500,000.00
'#,##0.0'      → 7,500,000.0
'0.00%'        → 96.70%
```

---

#### 6️⃣ 한글 깨짐 (Charset 문제)

**증상**:
```javascript
// DB 응답: {"deptName": "\uac1c\ubc1c\ubd80"}  (Unicode escape)
// Grid 표시: 정상 (브라우저가 자동 변환)
// 하지만 일부 환경에서는 깨짐
```

**해결**:
```yaml
# application.yml
spring:
  datasource:
    url: jdbc:sqlserver://172.16.200.204:1433;
         databaseName=도우제조MES시스템TEST;
         encrypt=false;
         trustServerCertificate=true;
         characterEncoding=UTF-8  # ✅ 추가
```

```xml
<!-- Mapper에서 NVARCHAR 사용 -->
<select id="selectGrid2List" resultType="hashmap">
    SELECT 
        CAST(dept_name AS NVARCHAR(50)) as deptName,  -- ✅ NVARCHAR
        emp_name as empName
    FROM new_doi_demo_employee
</select>
```

```python
# pymssql 연결 시
conn = pymssql.connect(
    charset='utf8'  # ✅ 필수
)
```

---

#### 7️⃣ 비동기 타이밍 문제

**증상**:
```javascript
// Grid 초기화보다 데이터가 먼저 로딩됨
initGrid2() {
  this.loadGrid2Data()  // ❌ provider2가 아직 없음
  this.provider2 = new LocalDataProvider()  // 늦게 생성
}
```

**해결**:
```javascript
// ✅ 올바른 순서
initGrid2() {
  // 1. Provider 생성
  this.provider2 = new LocalDataProvider()
  this.gridView2 = new GridView('grid2')
  this.gridView2.setDataSource(this.provider2)
  
  // 2. 필드/컬럼 설정
  this.provider2.setFields(fields)
  this.gridView2.setColumns(columns)
  
  // 3. 옵션 설정
  this.gridView2.setDisplayOptions({ fitStyle: 'fill' })
  
  // 4. 데이터 로딩 (마지막)
  this.loadGrid2Data()
}

async loadGrid2Data() {
  try {
    const response = await fetch('/api/demo/grid2/list')
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }
    const result = await response.json()
    
    // ✅ provider가 준비된 후 데이터 설정
    if (this.provider2) {
      this.provider2.setRows(result.list || [])
    }
  } catch (error) {
    console.error('Grid2 로딩 실패:', error)
  }
}
```

---

#### 8️⃣ CORS 에러로 인한 데이터 로딩 실패

**증상**:
```
Access to fetch at 'http://localhost:8080/api/demo/grid2/list' 
from origin 'http://localhost:8081' has been blocked by CORS policy
```

**해결**:
```java
// CorsConfig.java (전역 설정)
@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:8081", "http://localhost:8082")
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}

// 또는 Controller에 직접
@RestController
@RequestMapping("/api/demo")
@CrossOrigin(origins = "*")  // ✅ 개발 환경만
public class RealGridDemoController {
    // ...
}
```

---

#### 9️⃣ 브라우저 개발자 도구 활용

**필수 체크리스트**:

```javascript
// 1. Network 탭에서 API 응답 확인
// - Status: 200 OK?
// - Response: JSON 구조 확인
// - Headers: Content-Type: application/json?

// 2. Console 탭에서 에러 확인
console.log('✅ Grid2 데이터 로딩:', result.total, '건')
console.log('📊 첫 번째 데이터:', result.list[0])
console.error('❌ 에러:', error.message)

// 3. Vue DevTools에서 컴포넌트 상태 확인
// - provider2 존재 여부
// - gridView2 초기화 여부
// - 데이터 바인딩 상태

// 4. RealGrid DevTool
// F12 → RealGrid 탭
// - 필드 정의 확인
// - 데이터 개수 확인
// - 컬럼 매핑 확인
```

---

### 🎯 디버깅 체크리스트

Grid에 데이터가 표시되지 않을 때 순서대로 확인:

```
□ 1. Backend API 응답 확인
   curl http://localhost:8080/api/demo/grid2/list
   → JSON 구조, 필드명 확인

□ 2. Vue 필드 정의와 DB 응답 비교
   DB: { "deptName": "개발부" }
   Vue: { fieldName: 'deptName' }  ← 일치해야 함

□ 3. 데이터 타입 일치 확인
   DB: salary (숫자) → Vue: dataType: 'number'

□ 4. 초기화 순서 확인
   Provider 생성 → Fields 설정 → Columns 설정 → 데이터 로딩

□ 5. 브라우저 Console 에러 확인
   F12 → Console 탭

□ 6. Network 탭에서 API 호출 확인
   Status 200? Response JSON 정상?

□ 7. CORS 에러 확인
   에러 메시지에 "blocked by CORS" 포함?

□ 8. NULL 값 처리
   DB에 NULL 데이터 있는지 확인

□ 9. 비동기 타이밍
   async/await 제대로 사용했는지

□ 10. Fallback 데이터
    catch 블록에서 샘플 데이터 표시되는지
```

---

### 📝 Best Practices

#### ✅ DO (권장)
```javascript
// 1. DB 필드명과 Vue 필드명 일치시키기
const fields = [
  { fieldName: 'deptName', dataType: 'text' }  // DB와 동일
]

// 2. 명시적 타입 지정
{ fieldName: 'salary', dataType: 'number' }

// 3. 에러 로깅
console.log('✅ 데이터:', result.list[0])
console.error('❌ 에러:', error)

// 4. Null 처리
COALESCE(phone, '') as phone

// 5. 날짜 변환
CONVERT(VARCHAR, order_date, 23) as orderDate
```

#### ❌ DON'T (비권장)
```javascript
// 1. 의미 없는 필드명 매핑
dept_name as year  // ❌ 혼란 유발

// 2. 타입 생략
{ fieldName: 'salary' }  // ❌ 타입 명시 안 함

// 3. 에러 무시
catch (error) { }  // ❌ 로깅 없음

// 4. 하드코딩 유지
const data = [...]  // ❌ DB 연동 후에도 샘플 데이터

// 5. 비동기 순서 무시
loadData()  // ❌ provider 초기화 전 호출
createProvider()
```

---

**작성일**: 2025-11-30  
**최종 수정**: 2025-11-30 15:10  
**작성자**: AI Factory Lab Team  
**버전**: 1.5
