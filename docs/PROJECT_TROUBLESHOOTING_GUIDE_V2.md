# 📘 PROJECT_TROUBLESHOOTING_GUIDE_V2.md

**문서 번호:** VAF-ERR-002 (Expert Edition - 전문가 버전)  
**작성 일자:** 2025-11-30  
**최종 업데이트:** 2025-11-30 15:20 (Jarvis Expert Review)  
**적용 대상:** Vertical AI Factory (User-Driven Automation Environment)  
**작성자:** AI Development Expert (실전 프로덕션 경험 기반)  
**중요도:** ⚠️ **CRITICAL** - 무인 자동화 환경 필수 문서  
**참고 문헌:** Spring Boot Docs, Vue.js Best Practices, RealGrid API Reference, Enterprise Java Patterns

---

## 📋 목차 (Table of Contents)

1. [빌드 및 컴파일 에러 (Build & Compile)](#1-빌드-및-컴파일-단계)
2. [입력 데이터 검증 에러 (Input Validation)](#2-입력-데이터-및-생성-단계)
3. [런타임 에러 (Runtime Errors)](#3-런타임-및-운영-단계)
4. [환경 및 배포 에러 (Deployment)](#4-환경-및-배포-단계)
5. [데이터베이스 연동 에러 (Database Integration)](#5-데이터베이스-연동-에러)
6. [프론트엔드 그리드 에러 (Frontend Grid)](#6-프론트엔드-그리드-에러)
7. [성능 및 메모리 이슈 (Performance)](#7-성능-및-메모리-이슈)
8. [보안 및 권한 에러 (Security)](#8-보안-및-권한-에러)
9. [사전 방지 체크리스트](#9-사전-방지-체크리스트)

---


## 1. 🏗️ 빌드 및 컴파일 단계 (Build & Compile Phase)
**💀 치명도: CRITICAL** - 이 단계에서 실패하면 애플리케이션 자체가 구동되지 않습니다.

---

### 🔴 Error 1.1: Package Declaration Mismatch (패키지 선언 불일치)

**에러 메시지:**
```
error: class COST002Controller is public, should be declared in a file named COST002Controller.java
```
또는
```
package com.dowinsys.cost does not match expected package com.dowinsys.sales
```

**발생 원인 (Root Cause Analysis):**
1. **Generator 로직 오류**: 엑셀 PI의 '패키지' 필드를 읽어서 Java 파일 상단에 `package com.dowinsys.cost;`를 작성했으나, 실제 파일은 `src/main/java/com/dowinsys/sales/` 폴더에 저장됨
2. **수동 복사 실수**: 개발자가 생성된 파일을 수동으로 이동하면서 package 문을 수정하지 않음
3. **대소문자 불일치**: Linux 환경에서 `Cost` vs `cost` 폴더명 차이로 빌드 실패

**재현 방법 (Reproduction Steps):**
```bash
# 1. 엑셀에 Package = "com.dowinsys.cost" 입력
# 2. Generator 실행 → Controller 생성
# 3. 파일을 src/main/java/com/dowinsys/sales/ 폴더로 복사
# 4. mvn clean compile 실행 → 에러 발생
```

**해결 방법 (Solutions):**

**즉시 조치:**
```bash
# 1. 파일 내부의 package 선언 확인
grep -n "^package" backend/src/main/java/com/dowinsys/**/*.java

# 2. 실제 폴더 경로와 일치시키기
# Option A: package 문 수정
sed -i 's/package com.dowinsys.cost;/package com.dowinsys.sales;/' COST002Controller.java

# Option B: 파일을 올바른 폴더로 이동
mv backend/src/main/java/com/dowinsys/sales/COST002Controller.java \
   backend/src/main/java/com/dowinsys/cost/
```

**근본 해결 (Generator 개선):**
```python
# deploy.py 또는 generator.py에 추가
import re
import os

def validate_and_deploy_java_file(file_path, content):
    """Java 파일의 package 선언과 폴더 경로 일치 여부 검증"""
    # package 문 추출
    match = re.search(r'package\s+([\w.]+);', content)
    if not match:
        raise ValueError(f"❌ {file_path}: package 선언이 없습니다")
    
    declared_package = match.group(1)  # "com.dowinsys.cost"
    
    # 폴더 경로로 변환
    expected_path = declared_package.replace('.', '/') + '/'
    
    # 실제 파일 경로와 비교
    if expected_path not in file_path:
        # 자동 수정: 올바른 경로로 이동
        correct_path = f"backend/src/main/java/{expected_path}"
        os.makedirs(correct_path, exist_ok=True)
        
        target_file = os.path.join(correct_path, os.path.basename(file_path))
        shutil.move(file_path, target_file)
        
        print(f"✅ 파일 이동 완료: {target_file}")
        return target_file
    
    return file_path
```

**예방 조치:**
- [ ] Generator는 반드시 package 경로와 파일 저장 경로를 동일하게 생성
- [ ] CI/CD 파이프라인에 `mvn compile` 단계를 추가하여 배포 전 검증
- [ ] Pre-commit hook으로 package 선언 검사

---

### 🔴 Error 1.2: Conflicting Bean Definition (중복 Bean 이름 충돌)

**에러 메시지:**
```
org.springframework.beans.factory.BeanDefinitionStoreException: 
Invalid bean definition with name 'cost002Service' defined in class path resource [com/dowinsys/cost/COST002Service.class]: 
Cannot register bean definition [... ] for bean 'cost002Service': 
There is already [... ] bound.
```

**발생 원인:**
1. **동일 Bean 이름 재사용**: 사용자가 `COST002` 화면을 삭제하지 않고 다시 생성하여 동일 클래스명이 2개 존재
2. **명시적 Bean 이름 충돌**: 
   ```java
   @Service("myService")  // ❌ 하드코딩된 Bean 이름
   public class COST002Service { }
   
   @Service("myService")  // ❌ 다른 화면에서도 동일한 이름 사용
   public class SALE001Service { }
   ```
3. **Component Scan 중복**: 동일 클래스가 여러 JAR 파일에 포함되어 있음 (fat JAR 빌드 오류)

**재현 방법:**
```bash
# 1. COST002 화면 생성
python generator.py --screen COST002

# 2. 서버 기동 확인 (정상)
mvn spring-boot:run

# 3. 동일 ID로 화면 재생성 (기존 파일 덮어쓰기 실패)
python generator.py --screen COST002

# 4. 서버 재기동 → Bean 충돌 에러 발생
```

**해결 방법:**

**즉시 조치:**
```bash
# 1. 중복 클래스 파일 검색
find backend/src -name "*COST002*.java" -type f

# 2. 컴파일된 클래스 파일 확인
find backend/target -name "*COST002*.class" -type f

# 3. 중복 파일 삭제 후 재빌드
rm -rf backend/target/*
mvn clean package
```

**근본 해결 (Naming Convention 강제):**
```java
// ✅ 올바른 Bean 이름 규칙: 화면ID 기반 자동 생성
@Service  // Bean 이름 명시 안 함 → Spring이 자동으로 "cost002Service" 생성
public class Cost002Service {
    // 또는 명시적으로 화면ID 포함
    @Service("cost002Service")  // ✅ Unique한 이름
}

@Mapper
public interface Cost002Mapper {  // ✅ 인터페이스명에도 화면ID 포함
    List<Map<String, Object>> selectCost002List(Map<String, Object> params);
}
```

**Generator 템플릿 수정:**
```python
# templates/backend_service.java.j2
@Service("{{ screen_id.lower() }}Service")  # ✅ 동적으로 Bean 이름 생성
public class {{ screen_id }}Service {
    private final {{ screen_id }}Mapper {{ screen_id.lower() }}Mapper;
    
    @RequiredArgsConstructor  // ✅ 생성자 주입으로 명확성 확보
}
```

**예방 조치:**
- [ ] 화면 생성 전 기존 파일 존재 여부 체크 (`os.path.exists()`)
- [ ] Bean 이름에 반드시 화면ID 포함 (예: `cost002Service`, `sale001Mapper`)
- [ ] Component Scan 범위를 `com.dowinsys`로 명확히 제한

---

### 🔴 Error 1.3: Vue Component Import Failure (컴포넌트 Import 실패)

**에러 메시지:**
```
[vite] Internal server error: Failed to resolve import "./views/cost/COST002.vue" from "src/router/index.js"
```
또는
```
Module not found: Error: Can't resolve '@/views/cost/COST002.vue'
```

**발생 원인:**
1. **파일명 대소문자 불일치**: 
   - Router: `import COST002 from '@/views/cost/COST002.vue'`
   - 실제 파일: `cost002.vue` (소문자)
   - Linux는 대소문자 구분, Windows는 구분 안 함 → 배포 시 에러 발생
2. **파일 생성 실패**: Generator가 `.vue` 파일을 생성했다고 로그를 찍었지만 실제로는 권한 문제나 경로 오류로 생성 안 됨
3. **잘못된 경로**: `views/cost/` 폴더 대신 `views/sales/` 폴더에 저장됨

**재현 방법:**
```bash
# 1. Linux 환경에서 파일 생성
touch frontend/src/views/cost/cost002.vue  # 소문자

# 2. Router에 대문자로 등록
cat >> frontend/src/router/index.js << 'EOF'
{
  path: '/cost/cost002',
  component: () => import('@/views/cost/COST002.vue')  // 대문자
}
EOF

# 3. npm run dev → Import 실패
```

**해결 방법:**

**즉시 조치:**
```bash
# 1. 실제 파일명 확인
ls -la frontend/src/views/cost/

# 2. 대소문자 일치시키기
# Option A: 파일명 변경
mv frontend/src/views/cost/cost002.vue frontend/src/views/cost/COST002.vue

# Option B: Router 수정
# router/index.js에서 import 경로를 소문자로 변경
```

**근본 해결 (파일명 규칙 통일):**
```python
# generator_vue.py
def generate_vue_file(screen_id, output_dir):
    """Vue 파일 생성 시 파일명 규칙 강제"""
    
    # ✅ 규칙: 화면ID는 무조건 대문자로 파일명 생성
    file_name = f"{screen_id.upper()}.vue"
    
    # 폴더 경로도 소문자로 통일 (cost, sales, common)
    module_name = screen_id[:4].lower()  # COST002 → cost
    
    output_path = os.path.join(output_dir, 'views', module_name, file_name)
    
    # 폴더 미존재 시 자동 생성
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    
    # 파일 생성
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(vue_content)
    
    # ✅ 검증: 파일이 실제로 생성되었는지 확인
    if not os.path.exists(output_path):
        raise FileNotFoundError(f"❌ Vue 파일 생성 실패: {output_path}")
    
    print(f"✅ Vue 파일 생성 완료: {output_path}")
    
    # Router 자동 등록
    register_route(screen_id, module_name, file_name)
```

**Router 자동 등록 로직:**
```python
def register_route(screen_id, module, file_name):
    """router/index.js에 라우트 자동 추가"""
    router_path = 'frontend/src/router/index.js'
    
    route_code = f"""
  {{
    path: '/{module.lower()}/{screen_id.lower()}',
    name: '{screen_id}',
    component: () => import('@/views/{module}/{file_name}'),  // ✅ 파일명 정확히 일치
    meta: {{ title: '{screen_id} 화면', requiresAuth: true }}
  }},
"""
    
    # index.js 파일에 자동 추가 (중복 체크 포함)
    with open(router_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 이미 등록된 라우트인지 확인
    if f"name: '{screen_id}'" in content:
        print(f"⚠️ 이미 등록된 라우트: {screen_id}")
        return
    
    # routes 배열에 추가
    content = content.replace(
        '  // AUTO-GENERATED ROUTES - DO NOT REMOVE THIS LINE',
        f'{route_code}  // AUTO-GENERATED ROUTES - DO NOT REMOVE THIS LINE'
    )
    
    with open(router_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✅ 라우트 등록 완료: {screen_id}")
```

**예방 조치:**
- [ ] **파일명 규칙 문서화**: COST002 → `COST002.vue` (대문자), 폴더는 `views/cost/` (소문자)
- [ ] Generator 실행 후 `ls -la` 명령으로 파일 생성 여부 자동 검증
- [ ] CI/CD에서 `npm run build` 실행 시 import 에러 사전 감지

---

### 🔴 Error 1.4: MyBatis Mapper XML Parsing Error (매퍼 XML 파싱 오류)

**에러 메시지:**
```
org.apache.ibatis.builder.BuilderException: Error parsing Mapper XML. 
The XML location is 'mapper/cost/Cost002Mapper.xml'. 
Cause: org.xml.sax.SAXParseException; lineNumber: 15; columnNumber: 5; 
The element type "select" must be terminated by the matching end-tag "</select>".
```

**발생 원인:**
1. **XML 태그 미닫힘**: `<select>` 태그를 열었지만 `</select>`로 닫지 않음
2. **특수문자 미처리**: SQL에 `<`, `>`, `&` 같은 문자를 그대로 사용
   ```xml
   ❌ WHERE amount > 1000  <!-- > 문자로 인한 파싱 에러 -->
   ✅ WHERE amount &gt; 1000  <!-- XML entity로 변환 필요 -->
   ```
3. **CDATA 누락**: 복잡한 SQL문에 CDATA 섹션을 사용하지 않음

**재현 방법:**
```xml
<!-- Cost002Mapper.xml -->
<mapper namespace="com.dowinsys.cost.Cost002Mapper">
  <select id="selectList" resultType="hashmap">
    SELECT *
    FROM tb_cost
    WHERE amount > 1000  <!-- ❌ > 문자로 인한 에러 -->
    AND status <> 'CANCEL'  <!-- ❌ <> 문자 -->
  <!-- ❌ </select> 태그 누락 -->
</mapper>
```

**해결 방법:**

**즉시 조치:**
```xml
<!-- ✅ 올바른 Mapper XML -->
<mapper namespace="com.dowinsys.cost.Cost002Mapper">
  <select id="selectList" resultType="hashmap">
  <![CDATA[
    SELECT *
    FROM tb_cost
    WHERE amount > 1000
    AND status <> 'CANCEL'
    AND create_date >= #{startDate}
  ]]>
  </select>
</mapper>
```

**근본 해결 (Generator 템플릿 개선):**
```python
# templates/mapper.xml.j2
<mapper namespace="com.dowinsys.{{ module }}.{{ screen_id }}Mapper">
  
  <select id="select{{ screen_id }}List" resultType="hashmap">
  <![CDATA[
    SELECT 
      {% for col in columns %}
      {{ col.db_column_name }}{% if not loop.last %},{% endif %}
      {% endfor %}
    FROM {{ table_name }}
    WHERE 1=1
    {% if has_search_condition %}
    AND status = #{status}
    {% endif %}
    ORDER BY create_date DESC
  ]]>
  </select>
  
  <insert id="insert{{ screen_id }}">
  <![CDATA[
    INSERT INTO {{ table_name }} (
      {% for col in columns if col.insertable %}
      {{ col.db_column_name }}{% if not loop.last %},{% endif %}
      {% endfor %}
    ) VALUES (
      {% for col in columns if col.insertable %}
      #{​{ col.field_name }}{% if not loop.last %},{% endif %}
      {% endfor %}
    )
  ]]>
  </insert>
  
  <update id="update{{ screen_id }}">
  <![CDATA[
    UPDATE {{ table_name }}
    SET
      {% for col in columns if col.updatable %}
      {{ col.db_column_name }} = #{​{ col.field_name }}{% if not loop.last %},{% endif %}
      {% endfor %}
    WHERE {{ pk_column }} = #{​{ pk_field }}
  ]]>
  </update>
  
  <delete id="delete{{ screen_id }}">
  <![CDATA[
    DELETE FROM {{ table_name }}
    WHERE {{ pk_column }} = #{​{ pk_field }}
  ]]>
  </delete>
  
</mapper>
```

**예방 조치:**
- [ ] 모든 SQL문은 `<![CDATA[ ... ]]>` 안에 작성
- [ ] Generator 실행 후 XML 문법 검증 도구로 자동 체크
  ```bash
  xmllint --noout backend/src/main/resources/mapper/**/*.xml
  ```
- [ ] IDE에서 MyBatis XML 플러그인 설치 (IntelliJ: MyBatis X, VS Code: MyBatis Mapper)

---

### 🔴 Error 1.5: Gradle/Maven Dependency Resolution Failure (의존성 해결 실패)

**에러 메시지:**
```
Could not resolve all dependencies for configuration ':compileClasspath'.
> Could not find com.dowinsys:common-utils:1.0.0.
```

**발생 원인:**
1. **사내 Nexus 저장소 연결 실패**: VPN 미연결 또는 Nexus 서버 다운
2. **버전 불일치**: `pom.xml`에 명시된 버전이 실제 저장소에 없음
3. **Snapshot 의존성 캐시 문제**: `-SNAPSHOT` 버전이 로컬에 캐싱되어 업데이트 안 됨

**해결 방법:**
```bash
# 1. 의존성 캐시 삭제
rm -rf ~/.m2/repository/com/dowinsys/

# 2. 강제 업데이트
mvn clean install -U  # -U 옵션: 최신 버전 강제 다운로드

# 3. Nexus 연결 확인
curl -I http://nexus.dowinsys.com/repository/maven-public/

# 4. settings.xml 서버 설정 확인
cat ~/.m2/settings.xml
```

**예방 조치:**
- [ ] pom.xml에 버전을 변수로 관리 (`<dowinsys.version>1.0.0</dowinsys.version>`)
- [ ] CI/CD에서 `mvn dependency:tree` 실행하여 의존성 검증

---

---


## 2. 📝 입력 데이터 및 생성 단계 (Input & Generation Phase)
**💥 위험도: HIGH** - 사용자(현업) 실수가 가장 많이 발생하는 구간

---

### 🔴 Error 2.1: Excel Sheet Name Mismatch (엑셀 시트 이름 불일치)

**에러 메시지:**
```python
KeyError: "Worksheet named 'GridColumns' not found"
```
또는
```python
xlrd.biffh.XLRDError: No sheet named <'Grid Columns'>
```

**발생 원인:**
1. **사용자 실수**: 엑셀 템플릿의 시트명을 수정함
   - 정상: `GridColumns`
   - 오타: `Grid Columns` (공백 추가), `GridColumn` (s 누락), `그리드컬럼` (한글)
2. **엑셀 버전 차이**: MS Excel vs LibreOffice vs Google Sheets에서 저장 시 시트명 인코딩 깨짐
3. **복사-붙여넣기 문제**: 다른 엑셀에서 시트를 복사하면서 숨겨진 문자 포함됨

**재현 방법:**
```bash
# 1. 엑셀 템플릿 열기
# 2. 시트명을 "GridColumns"에서 "Grid Columns"로 변경 (공백 추가)
# 3. 저장 후 Generator 실행
python generator_excel.py --file cost_pi.xlsx
# 4. KeyError 발생
```

**해결 방법:**

**즉시 조치:**
```python
# generator_excel.py 수정: 시트명 유연하게 찾기
import openpyxl

def find_sheet_flexible(workbook, target_name):
    """시트명을 유연하게 검색 (공백, 대소문자 무시)"""
    target_normalized = target_name.replace(' ', '').lower()
    
    for sheet_name in workbook.sheetnames:
        normalized = sheet_name.replace(' ', '').lower()
        if normalized == target_normalized:
            return workbook[sheet_name]
    
    # 시트를 못 찾으면 자세한 에러 메시지
    available_sheets = ', '.join(workbook.sheetnames)
    raise ValueError(
        f"❌ 시트를 찾을 수 없습니다!\n"
        f"   찾으려는 시트: '{target_name}'\n"
        f"   파일에 존재하는 시트: [{available_sheets}]\n"
        f"   💡 시트명을 '{target_name}'으로 수정하거나, 템플릿을 다시 다운로드하세요."
    )

# 사용 예시
wb = openpyxl.load_workbook('cost_pi.xlsx')
sheet = find_sheet_flexible(wb, 'GridColumns')  # ✅ 'Grid Columns', 'gridcolumns' 모두 인식
```

**근본 해결 (시트 순서로 접근):**
```python
# 시트명 대신 순서로 읽기 (더 안전)
def read_excel_by_index(file_path):
    """시트 순서로 데이터 읽기"""
    wb = openpyxl.load_workbook(file_path)
    
    # 규칙: 1번째 시트 = 화면 정보, 2번째 = GridColumns, 3번째 = Buttons
    screen_info_sheet = wb.worksheets[0]
    grid_columns_sheet = wb.worksheets[1]
    buttons_sheet = wb.worksheets[2]
    
    return {
        'screen_info': parse_screen_info(screen_info_sheet),
        'columns': parse_columns(grid_columns_sheet),
        'buttons': parse_buttons(buttons_sheet)
    }
```

**예방 조치:**
- [ ] 엑셀 템플릿에 시트 보호 기능 적용 (시트명 변경 금지)
- [ ] Generator 실행 전 시트명 자동 검증 스크립트 실행
- [ ] 에러 메시지에 "사용 가능한 시트 목록" 포함

---

### 🔴 Error 2.2: Missing Required Column Headers (필수 컬럼 헤더 누락)

**에러 메시지:**
```python
TypeError: 'NoneType' object is not subscriptable
```
또는
```python
KeyError: 'Field Name'
```

**발생 원인:**
1. **헤더 오타**: `Field Name` → `FieldName`, `필드명`, `field_name`
2. **헤더 삭제**: 사용자가 "필요 없을 것 같아서" Type 컬럼을 삭제함
3. **빈 행 삽입**: 헤더와 데이터 사이에 빈 행이 있어서 헤더를 못 찾음

**재현 방법:**
```excel
| FieldName | Type | Label |  ← ❌ "Field Name"이 아닌 "FieldName" (공백 없음)
| cost_code | Text | 비용코드 |
```

**해결 방법:**

**즉시 조치:**
```python
# 필수 헤더 목록 정의
REQUIRED_HEADERS = {
    'Field Name': ['Field Name', 'FieldName', 'field_name', '필드명'],
    'Type': ['Type', 'type', 'DataType', '타입'],
    'Label': ['Label', 'label', 'Header', '헤더명', '레이블'],
    'Width': ['Width', 'width', '너비']
}

def validate_headers(sheet):
    """헤더 검증 및 정규화"""
    header_row = sheet[1]  # 첫 번째 행
    headers = [cell.value for cell in header_row if cell.value]
    
    # 정규화된 헤더 매핑
    normalized_headers = {}
    
    for standard_name, aliases in REQUIRED_HEADERS.items():
        found = False
        for cell_idx, cell_value in enumerate(headers):
            if cell_value in aliases:
                normalized_headers[standard_name] = cell_idx
                found = True
                break
        
        if not found:
            raise ValueError(
                f"❌ 필수 헤더 '{standard_name}'를 찾을 수 없습니다!\n"
                f"   인식 가능한 이름: {', '.join(aliases)}\n"
                f"   현재 헤더: {headers}\n"
                f"   💡 엑셀 템플릿을 다시 다운로드하거나, 헤더명을 '{standard_name}'으로 수정하세요."
            )
    
    return normalized_headers

# 사용 예시
header_map = validate_headers(grid_columns_sheet)
field_name_col = header_map['Field Name']  # ✅ 어떤 이름이든 자동 매핑
```

**근본 해결 (데이터 파싱 개선):**
```python
def parse_columns_safe(sheet, header_map):
    """안전한 컬럼 파싱"""
    columns = []
    
    for row_idx, row in enumerate(sheet.iter_rows(min_row=2), start=2):  # 헤더 다음 행부터
        # 빈 행 건너뛰기
        if all(cell.value is None for cell in row):
            continue
        
        try:
            field_name = row[header_map['Field Name']].value
            field_type = row[header_map['Type']].value
            label = row[header_map['Label']].value
            
            # 필수값 검증
            if not field_name:
                raise ValueError(f"❌ {row_idx}행: Field Name이 비어있습니다")
            if not field_type:
                raise ValueError(f"❌ {row_idx}행: Type이 비어있습니다 (Field: {field_name})")
            
            columns.append({
                'fieldName': str(field_name).strip(),
                'type': normalize_type(field_type),
                'label': str(label).strip() if label else field_name
            })
            
        except Exception as e:
            print(f"⚠️  {row_idx}행 파싱 실패: {e}")
            print(f"   행 데이터: {[cell.value for cell in row]}")
            raise
    
    return columns
```

**예방 조치:**
- [ ] 엑셀 템플릿에 데이터 유효성 검사 적용 (필수 컬럼은 빈 값 불가)
- [ ] Generator 시작 전 헤더 검증 단계 추가
- [ ] 에러 발생 시 정확한 행 번호와 셀 값 출력

---

### 🔴 Error 2.3: Invalid Data Type Declaration (잘못된 데이터 타입 선언)

**에러 메시지:**
```javascript
// Frontend 콘솔
Uncaught TypeError: gridView.setColumnProperty is not a function
```
또는
```json
// 생성된 JSON
{
  "fieldName": "amount",
  "dataType": "unknown"  ← ❌ RealGrid가 인식 못하는 타입
}
```

**발생 원인:**
1. **사용자가 약속되지 않은 타입 입력**: `숫자`, `Num`, `int`, `numeric` (표준: `number`)
2. **한글 타입 사용**: `문자`, `날짜`, `불린` (표준: `text`, `datetime`, `boolean`)
3. **오타**: `numbre`, `txt`, `dat`

**재현 방법:**
```excel
| Field Name | Type   | Label  |
| amount     | 숫자   | 금액   |  ← ❌ "number"가 아닌 "숫자"
| status     | 문자열 | 상태   |  ← ❌ "text"가 아닌 "문자열"
```

**해결 방법:**

**근본 해결 (타입 정규화 함수):**
```python
# Type Normalization Mapping
TYPE_MAPPING = {
    # 숫자 관련
    'number': 'number',
    'num': 'number',
    'numeric': 'number',
    'int': 'number',
    'integer': 'number',
    'float': 'number',
    'double': 'number',
    'decimal': 'number',
    '숫자': 'number',
    '정수': 'number',
    '실수': 'number',
    
    # 문자 관련
    'text': 'text',
    'string': 'text',
    'str': 'text',
    'varchar': 'text',
    'char': 'text',
    '문자': 'text',
    '문자열': 'text',
    
    # 날짜 관련
    'date': 'datetime',
    'datetime': 'datetime',
    'timestamp': 'datetime',
    'time': 'datetime',
    '날짜': 'datetime',
    '일시': 'datetime',
    
    # 불린 관련
    'boolean': 'boolean',
    'bool': 'boolean',
    'checkbox': 'boolean',
    '불린': 'boolean',
    '체크': 'boolean',
}

def normalize_type(user_input):
    """사용자 입력 타입을 표준 타입으로 변환"""
    if not user_input:
        return 'text'  # 기본값
    
    # 소문자로 변환, 공백 제거
    normalized_input = str(user_input).strip().lower()
    
    # 매핑 테이블에서 찾기
    standard_type = TYPE_MAPPING.get(normalized_input)
    
    if standard_type:
        return standard_type
    else:
        # 알 수 없는 타입이면 경고 + 기본값 사용
        print(f"⚠️  알 수 없는 타입: '{user_input}' → 'text'로 자동 변환")
        print(f"   💡 사용 가능한 타입: number, text, datetime, boolean")
        return 'text'

# 사용 예시
field_type = normalize_type('숫자')  # → 'number' ✅
field_type = normalize_type('int')   # → 'number' ✅
field_type = normalize_type('asdf')  # → 'text' (경고 출력) ⚠️
```

**Frontend 타입 검증:**
```javascript
// StandardPage.vue - JSON 스키마 로드 시 검증
const VALID_TYPES = ['text', 'number', 'datetime', 'boolean'];

function validateGridSchema(schema) {
  schema.columns.forEach((col, idx) => {
    if (!VALID_TYPES.includes(col.dataType)) {
      console.error(
        `❌ 컬럼 타입 오류 [${idx}번째 컬럼: ${col.fieldName}]`,
        `dataType='${col.dataType}'는 유효하지 않습니다.`,
        `사용 가능한 타입: ${VALID_TYPES.join(', ')}`
      );
      // 기본값으로 대체
      col.dataType = 'text';
    }
  });
}
```

**예방 조치:**
- [ ] 엑셀 템플릿의 Type 컬럼에 드롭다운 목록 제공 (number, text, datetime, boolean만 선택 가능)
- [ ] Generator에 타입 정규화 함수 필수 적용
- [ ] CI/CD에서 생성된 JSON 스키마 검증

---

### 🔴 Error 2.4: Special Characters in Field Names (필드명에 특수문자 포함)

**에러 메시지:**
```java
// Backend
Caused by: org.apache.ibatis.reflection.ReflectionException: 
Could not set property 'cost-code' of 'class java.util.HashMap' with value '...'
```

**발생 원인:**
1. **하이픈 사용**: `cost-code` (Java 변수명 규칙 위반)
2. **공백 포함**: `cost code`, `total amount`
3. **한글 포함**: `비용코드`, `총금액`
4. **특수문자**: `@email`, `$amount`, `#code`

**재현 방법:**
```excel
| Field Name  | Type | Label  |
| cost-code   | text | 비용코드 |  ← ❌ 하이픈 포함
| total amount| number| 총금액  |  ← ❌ 공백 포함
```

**해결 방법:**

**근본 해결 (필드명 정규화):**
```python
import re

def normalize_field_name(user_input):
    """필드명을 camelCase로 정규화"""
    if not user_input:
        raise ValueError("❌ 필드명이 비어있습니다")
    
    # 1. 공백/하이픈/언더스코어로 단어 분리
    words = re.split(r'[\s\-_]+', str(user_input))
    
    # 2. 특수문자 제거
    words = [re.sub(r'[^a-zA-Z0-9가-힣]', '', word) for word in words]
    
    # 3. 빈 문자열 제거
    words = [word for word in words if word]
    
    if not words:
        raise ValueError(f"❌ 유효한 필드명이 아닙니다: '{user_input}'")
    
    # 4. camelCase 변환
    # 첫 단어는 소문자, 나머지는 첫 글자만 대문자
    camel_case = words[0].lower() + ''.join(word.capitalize() for word in words[1:])
    
    # 5. 숫자로 시작하면 앞에 '_' 추가
    if camel_case[0].isdigit():
        camel_case = '_' + camel_case
    
    # 6. 변환 로그
    if camel_case != user_input:
        print(f"📝 필드명 정규화: '{user_input}' → '{camel_case}'")
    
    return camel_case

# 사용 예시
normalize_field_name('cost-code')      # → 'costCode' ✅
normalize_field_name('total amount')   # → 'totalAmount' ✅
normalize_field_name('비용_코드')      # → '비용코드' ✅
normalize_field_name('@email')         # → 'email' ✅
normalize_field_name('$amount')        # → 'amount' ✅
normalize_field_name('1st_place')     # → '_1stPlace' ✅
```

**DB 컬럼명 변환 (snake_case):**
```python
def to_snake_case(camel_case):
    """camelCase → snake_case 변환"""
    # costCode → cost_code
    snake = re.sub(r'([a-z0-9])([A-Z])', r'\1_\2', camel_case)
    return snake.lower()

# 사용 예시
field_name = 'costCode'       # Frontend/Backend
db_column = to_snake_case(field_name)  # 'cost_code' (DB)
```

**예방 조치:**
- [ ] 엑셀 입력 시 필드명 규칙 가이드 제공 (영문+숫자만, 공백/특수문자 금지)
- [ ] Generator가 자동으로 camelCase 변환
- [ ] DB 생성 시 자동으로 snake_case 변환

---

### 🔴 Error 2.5: Circular Dependency in Excel References (엑셀 수식 순환 참조)

**에러 메시지:**
```python
RecursionError: maximum recursion depth exceeded
```

**발생 원인:**
엑셀에서 수식을 사용하여 다른 셀을 참조할 때 순환 참조 발생
```excel
A1: =B1  ← B1을 참조
B1: =A1  ← A1을 참조 (순환!)
```

**해결 방법:**
```python
# openpyxl로 셀 값을 읽을 때 수식이 아닌 계산된 값만 읽기
from openpyxl import load_workbook

wb = load_workbook('cost_pi.xlsx', data_only=True)  # ✅ data_only=True
sheet = wb['GridColumns']

# 수식 결과값만 가져옴 (순환 참조 무시)
cell_value = sheet['A1'].value
```

**예방 조치:**
- [ ] 엑셀 템플릿에서 수식 사용 금지 (정적 데이터만)
- [ ] Generator 실행 전 순환 참조 경고 감지

---

---


## 5. 🗄️ 데이터베이스 연동 에러 (Database Integration)
**💥 위험도: CRITICAL** - 실전에서 가장 빈번하게 발생하는 에러 카테고리

---

### 🔴 Error 5.1: Field Name Mismatch (필드명 불일치) ⭐ **가장 흔한 에러**

**에러 증상:**
- 백엔드 API는 200 OK를 반환하지만 **프론트엔드 그리드에 데이터가 표시되지 않음**
- 개발자 도구 콘솔에 에러 없음 (무증상)
- Grid1은 정상인데 Grid2, Grid3는 빈 화면

**발생 원인:**
Vue 컴포넌트의 `fields` 정의와 백엔드 API 응답의 필드명이 **대소문자까지 정확히 일치하지 않음**

```javascript
// ❌ Vue - RealGridDemo.vue
const fields = [
  { fieldName: 'year' },      // Vue가 기대하는 필드명
  { fieldName: 'quarter' },
  { fieldName: 'sales' }
];

// ❌ Backend API Response
{
  "list": [
    {
      "deptName": "개발팀",     // 실제 DB에서 온 필드명 (완전히 다름!)
      "empName": "김철수",
      "salary": 5000000
    }
  ]
}

// 결과: RealGrid가 year, quarter, sales 필드를 찾지 못해 빈 그리드 표시
```

**근본 원인 분석:**
1. **DB → MyBatis → Vue 3단계 필드명 변환 과정에서 불일치**
   ```
   DB (snake_case)  →  MyBatis (alias)  →  Vue (fieldName)
   dept_name        →  deptName         →  deptName  ✅ 일치해야 함!
   ```

2. **샘플 데이터용 필드명을 그대로 사용**
   - Generator가 생성한 Vue 파일에 하드코딩된 샘플 필드(year, quarter, sales)
   - 실제 DB 연동 후에도 필드명을 수정하지 않음

**재현 방법:**
```bash
# 1. 백엔드 API 응답 확인
curl http://localhost:8080/api/demo/grid2/list | jq '.list[0] | keys'
# 출력: ["deptName", "empName", "position", "salary", "hireDate"]

# 2. Vue 파일의 fields 정의 확인
grep -A 10 "const fields" frontend/src/views/demo/RealGridDemo.vue
# 출력: fieldName: 'year', 'quarter', 'month'  ← 완전히 다름!

# 3. 브라우저에서 확인 → 그리드 비어있음
```

**해결 방법:**

**🔍 1단계: 실제 API 응답 필드명 확인**
```bash
# JSON 파싱하여 필드명 출력
curl -s http://localhost:8080/api/demo/grid2/list | \
  python3 -c "import sys, json; data = json.load(sys.stdin); print('DB 필드:', list(data['list'][0].keys()))"

# 출력: DB 필드: ['deptName', 'empName', 'position', 'salary', 'hireDate']
```

**🔧 2단계: Vue fields 정의 수정**
```javascript
// ✅ BEFORE (잘못된 필드명)
const fields = [
  { fieldName: 'year' },
  { fieldName: 'quarter' },
  { fieldName: 'sales' }
];

// ✅ AFTER (DB 응답과 정확히 일치)
const fields = [
  { fieldName: 'deptName' },     // ✅ API 응답의 deptName과 일치
  { fieldName: 'empName' },      // ✅ 대소문자까지 정확히
  { fieldName: 'position' },
  { fieldName: 'salary' },
  { fieldName: 'hireDate' }
];

// columns도 함께 수정
const columns = [
  { name: 'deptName', fieldName: 'deptName', header: { text: '부서명' }, width: 120 },
  { name: 'empName', fieldName: 'empName', header: { text: '직원명' }, width: 100 },
  { name: 'position', fieldName: 'position', header: { text: '직급' }, width: 100 },
  { name: 'salary', fieldName: 'salary', header: { text: '급여' }, width: 120, numberFormat: '#,##0' },
  { name: 'hireDate', fieldName: 'hireDate', header: { text: '입사일' }, width: 120 }
];
```

**🛡️ 3단계: 디버깅 코드 추가**
```javascript
const loadGrid2Data = async () => {
  try {
    const response = await fetch('/api/demo/grid2/list');
    const result = await response.json();
    
    // ✅ 첫 번째 데이터 샘플 출력 (디버깅용)
    if (result.list && result.list.length > 0) {
      console.log('📊 Grid2 API 응답 필드명:', Object.keys(result.list[0]));
      console.log('📊 Grid2 데이터 샘플:', result.list[0]);
    }
    
    // ✅ Vue fields와 비교 검증
    const vueFields = fields.map(f => f.fieldName);
    const apiFields = result.list[0] ? Object.keys(result.list[0]) : [];
    const missingFields = vueFields.filter(f => !apiFields.includes(f));
    
    if (missingFields.length > 0) {
      console.error('❌ Vue에 정의된 필드가 API 응답에 없습니다:', missingFields);
      console.error('   API 응답 필드:', apiFields);
      console.error('   Vue 기대 필드:', vueFields);
    }
    
    dataProvider.setRows(result.list);
  } catch (error) {
    console.error('Grid2 데이터 로드 실패:', error);
  }
};
```

**근본 해결 (Generator 개선):**
```python
# generator_vue.py
def generate_vue_grid_component(screen_id, db_columns):
    """DB 컬럼 정보를 기반으로 Vue fields 자동 생성"""
    
    fields_code = []
    columns_code = []
    
    for col in db_columns:
        # DB 컬럼명을 camelCase로 변환 (dept_name → deptName)
        field_name = to_camel_case(col['column_name'])
        
        fields_code.append(f"{{ fieldName: '{field_name}' }}")
        
        columns_code.append(f"""{{
  name: '{field_name}',
  fieldName: '{field_name}',
  header: {{ text: '{col['label']}' }},
  width: {col['width']},
  {get_column_options(col)}
}}""")
    
    # Vue 템플릿에 삽입
    vue_template = f"""
const fields = [
  {', '.join(fields_code)}
];

const columns = [
  {', '.join(columns_code)}
];
"""
    
    return vue_template

def to_camel_case(snake_str):
    """snake_case → camelCase 변환"""
    components = snake_str.split('_')
    return components[0] + ''.join(x.title() for x in components[1:])
```

**MyBatis Mapper 네이밍 규칙:**
```xml
<!-- ✅ DB 컬럼을 camelCase alias로 변환 -->
<select id="selectGrid2List" resultType="hashmap">
  SELECT 
    dept_name AS deptName,        <!-- ✅ snake_case → camelCase -->
    dept_name_en AS deptNameEn,
    emp_name AS empName,
    position AS position,         <!-- ✅ 이미 camelCase면 그대로 -->
    hire_date AS hireDate,        <!-- ✅ CONVERT 함수 사용 시에도 alias 필수 -->
    salary AS salary
  FROM new_doi_demo_employee
</select>
```

**예방 조치:**
- [ ] **필드명 규칙 문서화**: 
  - DB: `snake_case` (dept_name)
  - MyBatis alias: `camelCase` (deptName)
  - Vue fieldName: `camelCase` (deptName)
  - **3단계 모두 일치해야 함!**

- [ ] **자동 검증 스크립트**:
  ```javascript
  // validate-fields.js
  const apiResponse = await fetch('/api/demo/grid2/list').then(r => r.json());
  const vueFields = ['deptName', 'empName', 'salary'];  // Vue에 정의된 필드
  const apiFields = Object.keys(apiResponse.list[0]);
  
  const missing = vueFields.filter(f => !apiFields.includes(f));
  if (missing.length > 0) {
    throw new Error(`Field mismatch: ${missing.join(', ')}`);
  }
  ```

- [ ] **개발자 도구 활용**:
  ```javascript
  // 브라우저 콘솔에서 빠른 확인
  fetch('/api/demo/grid2/list')
    .then(r => r.json())
    .then(data => console.table(data.list[0]));
  ```

---

### 🔴 Error 5.2: Data Type Mismatch (데이터 타입 불일치)

**에러 메시지:**
```javascript
// 브라우저 콘솔
Uncaught TypeError: Cannot read property 'toFixed' of null
```
또는 RealGrid에서 숫자 컬럼에 문자가 표시됨

**발생 원인:**
1. **DB에서 숫자를 문자열로 반환**: `VARCHAR` 타입으로 저장된 금액
2. **NULL 값 처리 미흡**: DB에 NULL인 데이터를 숫자 컬럼에 표시
3. **날짜 형식 불일치**: `datetime` 타입을 문자열로 변환하지 않음

**해결 방법:**

**MyBatis에서 타입 변환:**
```xml
<select id="selectList" resultType="hashmap">
  SELECT 
    ISNULL(amount, 0) AS amount,              <!-- ✅ NULL → 0으로 변환 -->
    CONVERT(VARCHAR, order_date, 23) AS orderDate,  <!-- ✅ datetime → 'YYYY-MM-DD' -->
    CAST(quantity AS INT) AS quantity         <!-- ✅ 명시적 타입 캐스팅 -->
  FROM tb_order
</select>
```

**Vue에서 타입 명시:**
```javascript
const fields = [
  { fieldName: 'amount', dataType: 'number' },    // ✅ 반드시 dataType 명시
  { fieldName: 'orderDate', dataType: 'datetime' },
  { fieldName: 'status', dataType: 'text' }
];
```

---

### 🔴 Error 5.3: SQL Injection Vulnerability (SQL 인젝션 취약점)

**위험한 코드:**
```xml
<!-- ❌ 사용자 입력을 직접 SQL에 삽입 (SQL Injection 위험!) -->
<select id="searchByName" resultType="hashmap">
  SELECT * FROM tb_user
  WHERE name = '${userName}'  <!-- ❌ ${} 사용하면 위험! -->
</select>
```

**공격 시나리오:**
```java
// 사용자가 입력: admin' OR '1'='1
// 실행되는 SQL: SELECT * FROM tb_user WHERE name = 'admin' OR '1'='1'
// 결과: 모든 사용자 데이터 노출!
```

**올바른 코드:**
```xml
<!-- ✅ PreparedStatement 사용 (#{} 문법) -->
<select id="searchByName" resultType="hashmap">
  SELECT * FROM tb_user
  WHERE name = #{userName}  <!-- ✅ #{} 사용 (파라미터 바인딩) -->
</select>
```

**동적 SQL이 필요한 경우:**
```xml
<select id="searchWithConditions" resultType="hashmap">
  SELECT * FROM tb_order
  WHERE 1=1
  <if test="status != null and status != ''">
    AND status = #{status}  <!-- ✅ #{} 사용 -->
  </if>
  <if test="startDate != null">
    AND order_date >= #{startDate}
  </if>
  <if test="keyword != null and keyword != ''">
    AND (
      customer_name LIKE CONCAT('%', #{keyword}, '%')  <!-- ✅ LIKE 검색도 #{} -->
      OR product_name LIKE CONCAT('%', #{keyword}, '%')
    )
  </if>
</select>
```

---

### 🔴 Error 5.4: Connection Pool Exhaustion (커넥션 풀 고갈)

**에러 메시지:**
```
java.sql.SQLException: Connection is not available, request timed out after 30000ms.
```

**발생 원인:**
1. **커넥션 미반환**: `@Transactional` 없이 수동으로 커넥션을 얻었지만 `close()` 안 함
2. **긴 트랜잭션**: 대용량 데이터 처리 중 커넥션을 오래 점유
3. **풀 사이즈 부족**: 동시 사용자가 많은데 풀 크기가 작음

**해결 방법:**

**application.yml 설정:**
```yaml
spring:
  datasource:
    hikari:
      maximum-pool-size: 20          # ✅ 동시 커넥션 수 증가
      minimum-idle: 5                # ✅ 최소 유휴 커넥션
      connection-timeout: 30000      # ✅ 30초 타임아웃
      idle-timeout: 600000           # ✅ 10분간 사용 안하면 반환
      max-lifetime: 1800000          # ✅ 30분 후 커넥션 갱신
      leak-detection-threshold: 60000  # ✅ 60초 이상 점유 시 경고 로그
```

**코드 레벨 해결:**
```java
// ✅ @Transactional 사용 (자동 커넥션 관리)
@Transactional
public void processLargeData() {
    List<Data> dataList = mapper.selectAll();
    // 처리 로직
    // 메서드 종료 시 자동으로 커넥션 반환
}

// ❌ 수동 커넥션 관리 (권장하지 않음)
Connection conn = null;
try {
    conn = dataSource.getConnection();
    // 처리
} finally {
    if (conn != null) conn.close();  // ✅ 반드시 close 해야 함!
}
```

---

### 🔴 Error 5.5: Deadlock (교착 상태)

**에러 메시지:**
```
Transaction (Process ID 52) was deadlocked on lock resources with another process and has been chosen as the deadlock victim.
```

**발생 원인:**
두 개 이상의 트랜잭션이 서로 다른 순서로 테이블을 잠금
```
Transaction A:  LOCK(tb_order) → LOCK(tb_product)
Transaction B:  LOCK(tb_product) → LOCK(tb_order)  ← Deadlock!
```

**해결 방법:**

**1. 트랜잭션 순서 통일:**
```java
// ✅ 모든 트랜잭션에서 동일한 순서로 테이블 접근
@Transactional
public void processOrder() {
    // 1. tb_order 먼저
    orderMapper.updateOrder(order);
    
    // 2. tb_product 나중에 (순서 고정)
    productMapper.updateStock(product);
}
```

**2. 트랜잭션 시간 최소화:**
```java
@Transactional(timeout = 5)  // ✅ 5초 이내 완료 강제
public void quickUpdate() {
    mapper.updateStatus(id);
}
```

**3. 낙관적 잠금 (Optimistic Locking):**
```java
@Entity
public class Order {
    @Version  // ✅ JPA Optimistic Locking
    private Long version;
}

// 업데이트 시 version 자동 체크
mapper.updateOrder(order);  // version이 다르면 예외 발생
```

---

### 🔴 Case 3.1: 엑셀 업로드 시 400 Bad Request (JSON Parsing Error)
**증상:**
- 엑셀 업로드 버튼 클릭 시 아무 반응 없거나 400 에러.
- 서버 로그: `JSON parse error: ...`

**원인:**
- Frontend에서 `excelMapping` 정보를 보낼 때 `JSON.stringify`를 안 했거나, JSON 문법이 깨진 상태로 서버에 전송됨.
- 엑셀 파일이 암호화되어 있거나 손상된 파일임.

**✅ 해결/방지책:**
- **Frontend 로그:** 전송 전 `FormData` 내용을 콘솔에 찍도록 함.
- **Backend 예외처리:** 암호화된 엑셀 파일 업로드 시 "암호를 해제해주세요"라는 명확한 메시지 리턴.

### 🔴 Case 3.2: DB 컬럼 사이즈 초과 (Data Truncation)
**증상:**
- 데이터 저장/수정 시 500 에러.
- `String or binary data would be truncated`.

**원인:**
- 화면에서는 '비고' 란에 200자를 입력했는데, DB 테이블의 컬럼은 `VARCHAR(50)`으로 잡혀있음.
- 자동 생성된 테이블 스키마가 너무 타이트함.

**✅ 해결/방지책:**
- **Default Size Up:** 생성기가 테이블 DDL을 만들 때 문자열 컬럼은 기본적으로 `NVARCHAR(200)` 이상으로 넉넉하게 잡도록 설정.
- **Frontend Validation:** JSON 스키마에 `maxLength` 속성을 추가하여 입력 단계에서 막음.

---

## 4. 🔗 환경 및 배포 단계 (Environment & Deploy Phase)

### 🔴 Case 4.1: 파일 덮어쓰기 권한 오류 (Permission Denied)
**증상:**
- `deploy.py` 실행 시 `PermissionError: [Errno 13] Permission denied`.

**원인:**
- 서버에서 해당 `.jar` 파일이나 `.vue` 파일을 현재 실행 중인 프로세스(Tomcat/Node)가 점유하고 있어서 덮어쓰기 불가능. (특히 Windows 환경)

**✅ 해결/방지책:**
- **Hot Swap 불가 시:** 배포 스크립트에서 서비스를 잠시 중지 -> 파일 복사 -> 서비스 재시작 순서로 진행.
- 또는 운영체제별 파일 잠금 해제 명령어 수행.

### 🔴 Case 4.2: 브라우저 캐시로 인한 구버전 화면 로딩
**증상:**
- 배포를 완료했는데 사용자는 "화면이 안 바꼈어요" 또는 "에러나요"라고 함.
- JSON 스키마 구조는 바꼈는데 브라우저가 예전 JSON을 기억하고 있음.

**원인:**
- 정적 파일(JSON, JS)에 대한 브라우저 캐싱.

**✅ 해결/방지책:**
- **Cache Busting:** `StandardPage.vue`에서 JSON을 호출할 때 타임스탬프 쿼리를 붙임.
  `fetch('/schemas/COST002.json?t=' + new Date().getTime())`


---

## 7. ⚡ 성능 및 메모리 이슈 (Performance & Memory)
**� 위험도: MEDIUM** - 서비스 품질에 직접 영향

---

### 🔴 Error 7.1: Memory Leak (메모리 누수)

**에러 증상:**
- 서버가 시간이 지날수록 느려짐
- `java.lang.OutOfMemoryError: Java heap space`
- 프론트엔드에서 탭을 여러 번 열고 닫으면 메모리 사용량 계속 증가

**발생 원인:**
1. **Backend**: `static` 컬렉션에 데이터 계속 추가
2. **Frontend**: 컴포넌트 언마운트 시 이벤트 리스너 제거 안 함
3. **RealGrid**: 그리드 destroy() 안 함

**해결 방법:**

**Backend:**
```java
// ❌ 메모리 누수 코드
public class CacheService {
    private static Map<String, Object> cache = new HashMap<>();  // ❌ static으로 계속 쌓임
    
    public void addCache(String key, Object value) {
        cache.put(key, value);  // ❌ 삭제하는 로직 없음
    }
}

// ✅ 올바른 코드
@Service
public class CacheService {
    private final Map<String, CacheEntry> cache = new ConcurrentHashMap<>();
    
    @Scheduled(fixedRate = 3600000)  // ✅ 1시간마다 만료된 캐시 삭제
    public void evictExpiredCache() {
        cache.entrySet().removeIf(entry -> 
            entry.getValue().getExpireTime() < System.currentTimeMillis()
        );
    }
    
    // ✅ 또는 Spring Cache 사용 (자동 만료)
    @Cacheable(value = "myCache", key = "#id")
    @CacheEvict(value = "myCache", allEntries = true, condition = "#result.size() > 1000")
    public List<Data> getData(String id) {
        return repository.findAll();
    }
}
```

**Frontend (Vue):**
```javascript
// ✅ 이벤트 리스너 정리
onMounted(() => {
  window.addEventListener('resize', handleResize);
});

onBeforeUnmount(() => {
  // ✅ 반드시 이벤트 리스너 제거
  window.removeEventListener('resize', handleResize);
  
  // ✅ 그리드 제거
  if (gridView) gridView.destroy();
  if (dataProvider) dataProvider.destroy();
  
  // ✅ 타이머 정리
  if (intervalId) clearInterval(intervalId);
});
```

---

### 🔴 Error 7.2: N+1 Query Problem (N+1 쿼리 문제)

**에러 증상:**
- 단순 조회인데 쿼리가 수백 번 실행됨
- 응답 시간이 매우 느림 (1초 → 10초)

**발생 원인:**
```java
// ❌ N+1 문제 발생 코드
List<Order> orders = orderMapper.selectAll();  // 1번 쿼리 (100건)

for (Order order : orders) {
    Customer customer = customerMapper.selectById(order.getCustomerId());  // N번 쿼리 (100번!)
    order.setCustomerName(customer.getName());
}
// 총 101번의 쿼리 실행!
```

**해결 방법:**

**1. JOIN 사용:**
```xml
<!-- ✅ 한 번의 쿼리로 해결 -->
<select id="selectOrdersWithCustomer" resultType="hashmap">
  SELECT 
    o.order_id,
    o.order_date,
    c.customer_name,  -- ✅ JOIN으로 한 번에 가져옴
    c.phone
  FROM tb_order o
  LEFT JOIN tb_customer c ON o.customer_id = c.customer_id
</select>
```

**2. IN 절 사용:**
```xml
<!-- ✅ 2번의 쿼리로 해결 -->
<!-- 1. 주문 목록 조회 -->
<select id="selectOrders" resultType="com.dowinsys.Order">
  SELECT * FROM tb_order
</select>

<!-- 2. 고객 정보 한 번에 조회 -->
<select id="selectCustomersByIds" resultType="hashmap">
  SELECT * FROM tb_customer
  WHERE customer_id IN
  <foreach collection="list" item="id" open="(" separator="," close=")">
    #{id}
  </foreach>
</select>
```

**3. MyBatis ResultMap with association:**
```xml
<resultMap id="OrderWithCustomer" type="com.dowinsys.Order">
  <id property="orderId" column="order_id"/>
  <result property="orderDate" column="order_date"/>
  <association property="customer" javaType="com.dowinsys.Customer">
    <id property="customerId" column="customer_id"/>
    <result property="customerName" column="customer_name"/>
  </association>
</resultMap>

<select id="selectOrdersWithCustomer" resultMap="OrderWithCustomer">
  SELECT 
    o.*,
    c.*
  FROM tb_order o
  LEFT JOIN tb_customer c ON o.customer_id = c.customer_id
</select>
```

---

### 🔴 Error 7.3: Slow Frontend Rendering (프론트엔드 렌더링 느림)

**에러 증상:**
- Vue 컴포넌트 로딩이 3초 이상 걸림
- 입력 타이핑이 느림 (debounce 없이 매번 재렌더링)

**해결 방법:**

**1. v-if vs v-show 올바른 사용:**
```vue
<!-- ❌ 자주 토글되는 요소에 v-if 사용 (DOM 재생성) -->
<div v-if="isVisible">무거운 컴포넌트</div>

<!-- ✅ v-show 사용 (CSS display만 변경) -->
<div v-show="isVisible">무거운 컴포넌트</div>
```

**2. Computed vs Method:**
```javascript
// ❌ Method: 매번 재계산
methods: {
  getFilteredList() {  // ❌ 렌더링마다 실행
    return this.list.filter(item => item.status === 'active');
  }
}

// ✅ Computed: 의존성 변경 시에만 재계산
computed: {
  filteredList() {  // ✅ list나 status 변경 시에만 실행
    return this.list.filter(item => item.status === 'active');
  }
}
```

**3. Debounce 적용:**
```javascript
import { debounce } from 'lodash-es';

const handleSearch = debounce((keyword) => {
  // ✅ 300ms 동안 입력이 없을 때만 검색
  fetchData(keyword);
}, 300);
```

---

## 8. 🔐 보안 및 권한 에러 (Security & Authorization)
**🚨 위험도: CRITICAL** - 보안 취약점은 즉각 조치 필요

---

### 🔴 Error 8.1: CORS Error (교차 출처 리소스 공유 에러)

**에러 메시지:**
```
Access to fetch at 'http://localhost:8080/api/data' from origin 'http://localhost:8081' 
has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present.
```

**발생 원인:**
프론트엔드(8081)와 백엔드(8080) 포트가 달라서 브라우저가 차단

**해결 방법:**

**Backend (Spring Boot):**
```java
@Configuration
public class WebConfig implements WebMvcConfigurer {
    
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")  // ✅ /api로 시작하는 모든 경로
                .allowedOrigins(
                    "http://localhost:8081",  // ✅ Vue 개발 서버
                    "http://localhost:3000",  // ✅ React 개발 서버
                    "https://yourdomain.com"  // ✅ 운영 도메인
                )
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true)  // ✅ 쿠키 전송 허용
                .maxAge(3600);  // ✅ Preflight 요청 캐시 (1시간)
    }
}
```

**또는 @CrossOrigin 사용:**
```java
@RestController
@CrossOrigin(origins = "http://localhost:8081")  // ✅ 컨트롤러 레벨
public class DemoController {
    
    @CrossOrigin(origins = "*")  // ✅ 메서드 레벨 (모든 도메인 허용)
    @GetMapping("/api/public/data")
    public ResponseEntity<?> getPublicData() {
        return ResponseEntity.ok(data);
    }
}
```

---

### 🔴 Error 8.2: Unauthorized (401) / Forbidden (403)

**에러 메시지:**
```
401 Unauthorized: Authentication required
403 Forbidden: Access denied
```

**발생 원인:**
1. **401**: JWT 토큰 없음 또는 만료
2. **403**: 토큰은 있지만 권한 부족 (ADMIN만 가능한 API를 USER가 호출)

**해결 방법:**

**Frontend (토큰 자동 갱신):**
```javascript
// axios interceptor로 토큰 자동 추가
import axios from 'axios';

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;  // ✅ 모든 요청에 토큰 자동 추가
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 401 응답 시 자동 로그인 페이지 이동
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // ✅ Refresh Token으로 갱신 시도
      try {
        const refreshToken = localStorage.getItem('refresh_token');
        const response = await axios.post('/api/auth/refresh', { refreshToken });
        
        localStorage.setItem('access_token', response.data.accessToken);
        
        // ✅ 실패한 요청 재시도
        error.config.headers.Authorization = `Bearer ${response.data.accessToken}`;
        return axios.request(error.config);
        
      } catch (refreshError) {
        // ✅ Refresh도 실패 → 로그인 페이지로
        localStorage.clear();
        router.push('/login');
      }
    }
    return Promise.reject(error);
  }
);
```

---

### 🔴 Error 8.3: XSS (Cross-Site Scripting) 취약점

**위험한 코드:**
```vue
<!-- ❌ 사용자 입력을 그대로 HTML로 렌더링 -->
<div v-html="userComment"></div>  <!-- ❌ XSS 공격 가능! -->
```

**공격 시나리오:**
```javascript
// 사용자가 입력한 댓글:
userComment = "<script>alert('Hacked!'); document.cookie를 외부로 전송</script>"

// 렌더링 결과: 스크립트 실행됨!
```

**해결 방법:**
```vue
<!-- ✅ 텍스트로만 렌더링 (HTML 태그 이스케이프) -->
<div>{{ userComment }}</div>  <!-- ✅ 안전 -->

<!-- 또는 DOMPurify 라이브러리 사용 -->
<div v-html="sanitizedHtml"></div>
```

```javascript
import DOMPurify from 'dompurify';

const sanitizedHtml = computed(() => {
  return DOMPurify.sanitize(userComment.value);  // ✅ 위험한 태그 제거
});
```

---

## 9. 사전 방지 체크리스트 (Prevention Checklist)

### 🎯 자동화된 체크 시스템

AI Factory Lab은 **단계별 자동 검증 시스템**을 제공합니다!

**체크 API 서버:**
```bash
# API 서버 시작
cd engine
python3 checker_api.py

# 포트: 5000
# 자동 검증 + 실시간 피드백 + 해결방안 제시
```

---

### 📋 1단계: Generator 실행 전 체크 (Excel PI 검증)

**목적:** Excel PI 문서 업로드 시 자동 검증 및 에러 사전 차단

**자동 체크 항목:**
- ✅ Excel 파일 로드 가능 여부
- ✅ 시트명 검증 (`ScreenInfo`, `GridColumns`, `Buttons`, `SearchConditions`)
- ✅ 필수 헤더 존재 여부 (`Field Name`, `Type`, `Label`, `Width`)
- ✅ 화면 ID 형식 검증 (PascalCase, 특수문자 금지)
- ✅ 데이터 타입 표준 준수 (`number`, `text`, `datetime`, `date`, `boolean`)
- ✅ 필드명 네이밍 규칙 (영문 시작, 특수문자/공백 금지, 예약어 검증)
- ✅ 버튼 및 검색 조건 정의 확인

**API 호출:**
```bash
# curl 테스트
curl -X POST http://localhost:5000/api/check/pre-generation \
  -F "file=@engine/input/CostManagement.xlsx"

# 응답 예시
{
  "success": false,
  "summary": {
    "total": 9,
    "pass": 7,
    "error": 2,
    "warning": 0
  },
  "results": [
    {
      "status": "error",
      "check": "필드명 검증",
      "message": "잘못된 필드명이 2개 발견되었습니다",
      "details": [
        "Row 5: product-name - 특수문자 또는 공백 포함",
        "Row 8: select - SQL/Java 예약어 사용 금지"
      ],
      "solution": "필드명은 영문으로 시작하고, 영문/숫자/언더스코어만 사용해야 합니다"
    }
  ],
  "can_proceed": false,
  "recommendation": "🔴 에러를 모두 수정한 후 다시 업로드해주세요."
}
```

**수동 체크리스트 (백업):**
- [ ] 엑셀 템플릿의 시트명이 표준과 일치하는가?
- [ ] 필수 헤더가 모두 존재하는가?
- [ ] 화면 ID에 공백/특수문자가 없는가?
- [ ] 데이터 타입이 표준인가?
- [ ] 필드명에 특수문자가 없는가?

---

### 🔨 2단계: 코드 생성 후 체크 (파일 검증)

**목적:** 생성된 코드의 품질 및 완성도 검증

**자동 체크 항목:**
- ✅ 모든 필수 파일 생성 확인 (JSON, Vue, Java Controller/Service/Mapper, MyBatis XML)
- ✅ JSON Schema 문법 및 구조 검증
- ✅ Vue 파일: fields 정의, API 호출, 컴포넌트 구조
- ✅ Java 파일: package 선언, Bean 이름, @RestController 어노테이션
- ✅ MyBatis XML: CDATA 사용, SQL Injection 위험(${} vs #{}) 검사
- ✅ XML 문법 검증 (xmllint)

**API 호출:**
```bash
# 코드 생성 후 검증
curl http://localhost:5000/api/check/post-generation/CostManagement

# 응답 예시
{
  "success": true,
  "summary": {
    "total": 12,
    "pass": 10,
    "error": 0,
    "warning": 2
  },
  "results": [
    {
      "status": "warning",
      "check": "SQL Injection 위험",
      "message": "${} 사용 3회 발견",
      "solution": "가능하면 #{}를 사용하세요 (prepared statement)"
    }
  ],
  "can_proceed": true,
  "recommendation": "⚠️ 경고 사항을 확인하세요. 배포는 가능하지만 개선이 필요합니다."
}
```

**수동 체크리스트 (백업):**
- [ ] Java 파일의 package 경로와 폴더 경로가 일치하는가?
- [ ] Bean 이름에 화면ID가 포함되어 있는가?
- [ ] MyBatis Mapper XML의 SQL이 CDATA로 감싸져 있는가?
- [ ] Vue 파일의 fields가 DB 응답 필드명과 정확히 일치하는가?
- [ ] 모든 SQL에 `#{}` 문법을 사용하고 있는가?

---

### 🚀 3단계: 배포 전 체크 (빌드 & 테스트)

**목적:** 실제 배포 가능 여부 및 서버 상태 확인

**자동 체크 항목:**
- ✅ Backend 컴파일 테스트 (`mvn compiler:testCompile`)
- ✅ Vue 파일 배포 위치 확인 (`frontend/src/views/*`)
- ✅ Java 파일 배포 위치 확인 (`backend/src/main/java/com/dowinsys/*`)
- ✅ Backend 서버 상태 (Spring Boot 8080 포트)
- ✅ Frontend 서버 상태 (Vue Dev Server 8081 포트)
- ✅ API 엔드포인트 테스트 (실제 호출 및 응답 확인)

**API 호출:**
```bash
# 배포 전 검증
curl http://localhost:5000/api/check/pre-deployment/CostManagement

# 응답 예시
{
  "success": true,
  "summary": {
    "total": 8,
    "pass": 6,
    "error": 0,
    "warning": 2
  },
  "results": [
    {
      "status": "pass",
      "check": "Backend 빌드",
      "message": "✅ 컴파일 성공! 문법 에러 없음"
    },
    {
      "status": "warning",
      "check": "API 엔드포인트",
      "message": "⚠️ http://localhost:8080/api/cost/costmanagement/list 없음 (404)",
      "solution": "Backend 서버를 재시작하세요"
    }
  ],
  "can_proceed": true,
  "recommendation": "⚠️ 경고 사항이 있지만 배포는 가능합니다."
}
```

**수동 체크리스트 (백업):**
- [ ] `mvn clean compile` 성공하는가?
- [ ] Backend API를 curl로 테스트했는가?
  ```bash
  curl http://localhost:8080/api/demo/grid1/list
  ```
- [ ] Frontend에서 API 응답 필드명을 확인했는가?
  ```bash
  curl -s http://localhost:8080/api/demo/grid1/list | python3 -c "import sys, json; print(list(json.load(sys.stdin)['list'][0].keys()))"
  ```
- [ ] 그리드에 데이터가 정상 표시되는가?
- [ ] 브라우저 콘솔에 에러가 없는가? (F12 → Console)

---

### 🔍 4단계: 운영 중 모니터링 (성능 & 안정성)

**수동 체크리스트:**
- [ ] DB Connection Pool 사용률이 80% 미만인가?
- [ ] JVM Heap 메모리 사용률이 70% 미만인가?
- [ ] API 응답 시간이 1초 이내인가?
- [ ] 에러 로그가 급증하지 않는가?
- [ ] Deadlock 발생 이력이 있는가?

---

### 💡 체크 시스템 사용 가이드

**1. API 서버 시작:**
```bash
cd /home/roarm_m3/ai-factory-lab/engine
python3 checker_api.py

# 출력:
# ============================================================
#   AI Factory Lab - 단계별 체크 API 서버
# ============================================================
#   포트: 5000
#   엔드포인트:
#     POST /api/check/pre-generation  - Excel 업로드 검증
#     GET  /api/check/post-generation/<screen_id> - 코드 생성 후 검증
#     GET  /api/check/pre-deployment/<screen_id> - 배포 전 검증
# ============================================================
```

**2. Excel PI 업로드 & 검증:**
```bash
# 방법 1: curl
curl -X POST http://localhost:5000/api/check/pre-generation \
  -F "file=@engine/input/YourScreen.xlsx"

# 방법 2: Python
import requests
files = {'file': open('engine/input/YourScreen.xlsx', 'rb')}
response = requests.post('http://localhost:5000/api/check/pre-generation', files=files)
print(response.json())
```

**3. 코드 생성 후 검증:**
```bash
curl http://localhost:5000/api/check/post-generation/CostManagement
```

**4. 배포 전 검증:**
```bash
curl http://localhost:5000/api/check/pre-deployment/ProductionResult
```

**5. 응답 해석:**
- `success: true` → 모든 체크 통과
- `success: false` → 에러 존재, 수정 필요
- `can_proceed: true` → 다음 단계 진행 가능
- `can_proceed: false` → 에러 수정 후 재시도
- `recommendation` → 즉시 조치 사항

---

## 10. 🎯 빠른 문제 해결 가이드 (Quick Troubleshooting)

### 증상별 체크리스트

**"그리드가 안 보여요"**
1. ✅ CSS 높이 지정 확인: `<div style="height: 500px">`
2. ✅ RealGrid 라이브러리 로드 확인: `console.log(typeof GridView)`
3. ✅ 라이선스 키 설정 확인

**"데이터가 안 나와요"**
1. ✅ API 응답 확인: `curl http://localhost:8080/api/...`
2. ✅ 필드명 일치 확인: DB 응답 vs Vue fields
3. ✅ 브라우저 콘솔 확인: 네트워크 탭, 콘솔 탭

**"빌드가 안 돼요"**
1. ✅ package 경로 일치 확인
2. ✅ Bean 이름 중복 확인
3. ✅ MyBatis XML 문법 확인: `xmllint *.xml`

**"느려요"**
1. ✅ N+1 쿼리 확인: 로그에서 SELECT 쿼리 수 확인
2. ✅ 대용량 데이터 페이징 확인
3. ✅ Frontend 렌더링 최적화 (computed, v-show)

**"에러는 없는데 이상해요"**
1. ✅ 브라우저 캐시 삭제: Ctrl+Shift+Delete
2. ✅ 서버 재시작: `pkill -f spring-boot:run && mvn spring-boot:run`
3. ✅ DB 데이터 확인: `SELECT * FROM ...`

---

## 📚 참고 자료 (References)

- [Spring Boot Official Docs](https://spring.io/projects/spring-boot)
- [MyBatis Documentation](https://mybatis.org/mybatis-3/)
- [Vue 3 Official Guide](https://vuejs.org/guide/introduction.html)
- [RealGrid API Reference](http://help.realgrid.com/)
- [Element Plus Components](https://element-plus.org/)
- [OWASP Top 10 Security Risks](https://owasp.org/www-project-top-ten/)
- **[체크 시스템 README](../engine/CHECKER_README.md)** - 자동화 체크 시스템 사용 가이드

---

## 💻 실전 활용: 자동화 체크 시스템 통합

### 시나리오 1: Excel PI 업로드 시 즉시 검증

```python
# Generator에서 Excel 처리 전 자동 검증
import requests

def generate_screen(excel_file):
    # 1. Excel 검증
    with open(excel_file, 'rb') as f:
        response = requests.post(
            'http://localhost:5000/api/check/pre-generation',
            files={'file': f}
        )
    
    result = response.json()
    
    if not result['success']:
        print(f"❌ Excel 검증 실패: {result['summary']['error']}개 에러")
        for item in result['results']:
            if item['status'] == 'error':
                print(f"  - {item['check']}: {item['message']}")
                if 'solution' in item:
                    print(f"    💡 해결: {item['solution']}")
        return False
    
    print("✅ Excel 검증 통과!")
    # 코드 생성 진행...
    return True
```

### 시나리오 2: 코드 생성 후 자동 검증 및 배포

```bash
#!/bin/bash
# scripts/generate_and_deploy.sh

SCREEN_ID=$1

echo "1️⃣ 코드 생성 중..."
python3 engine/generator_vue.py ...
python3 engine/generator_java.py ...

echo "2️⃣ 생성된 코드 검증 중..."
RESULT=$(curl -s http://localhost:5000/api/check/post-generation/$SCREEN_ID)
CAN_PROCEED=$(echo $RESULT | python3 -c "import sys, json; print(json.load(sys.stdin)['can_proceed'])")

if [ "$CAN_PROCEED" != "True" ]; then
    echo "❌ 코드 검증 실패"
    echo $RESULT | python3 -m json.tool
    exit 1
fi

echo "3️⃣ 파일 배포 중..."
cp engine/output/$SCREEN_ID/*.vue frontend/src/views/
cp engine/output/$SCREEN_ID/java/*.java backend/src/main/java/com/dowinsys/

echo "4️⃣ 배포 전 최종 검증..."
DEPLOY_RESULT=$(curl -s http://localhost:5000/api/check/pre-deployment/$SCREEN_ID)
SUCCESS=$(echo $DEPLOY_RESULT | python3 -c "import sys, json; print(json.load(sys.stdin)['success'])")

if [ "$SUCCESS" = "True" ]; then
    echo "✅ 모든 검증 통과! 배포 완료"
else
    echo "⚠️ 경고가 있지만 배포는 완료되었습니다"
    echo $DEPLOY_RESULT | python3 -m json.tool | grep -A 3 '"status": "warning"'
fi
```

### 시나리오 3: CI/CD 파이프라인 통합

```yaml
# .github/workflows/screen-generator.yml
name: Auto Screen Generation

on:
  push:
    paths:
      - 'engine/input/*.xlsx'

jobs:
  validate-generate-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Python
        uses: actions/setup-python@v2
        with:
          python-version: '3.10'
      
      - name: Install dependencies
        run: pip install flask flask-cors requests openpyxl
      
      - name: Start Checker API
        run: |
          python3 engine/checker_api.py &
          sleep 5
      
      - name: Validate Excel
        run: |
          for file in engine/input/*.xlsx; do
            RESULT=$(curl -X POST http://localhost:5000/api/check/pre-generation \
              -F "file=@$file")
            
            SUCCESS=$(echo $RESULT | jq -r '.success')
            
            if [ "$SUCCESS" != "true" ]; then
              echo "❌ $file 검증 실패"
              echo $RESULT | jq .
              exit 1
            fi
          done
      
      - name: Generate Code
        run: |
          # 코드 생성 스크립트 실행
          ./scripts/generate_full_screen.sh engine/input/NewScreen.xlsx
      
      - name: Validate Generated Code
        run: |
          SCREEN_ID="NewScreen"
          RESULT=$(curl http://localhost:5000/api/check/post-generation/$SCREEN_ID)
          
          CAN_PROCEED=$(echo $RESULT | jq -r '.can_proceed')
          
          if [ "$CAN_PROCEED" != "true" ]; then
            echo "❌ 코드 검증 실패"
            echo $RESULT | jq .
            exit 1
          fi
      
      - name: Deploy to Dev
        run: |
          # 파일 복사 및 배포
          ./scripts/deploy_to_dev.sh
```

---

## 10. 🎨 Phase 1 GridStyle 구현 에러 (GridStyle Implementation Errors)
**💀 치명도: MEDIUM** - Phase 1 자동화 구현 과정에서 발생한 에러들

---

### 🟡 Error 10.1: generate_full_screen.sh 상대 경로 문제

**에러 메시지:**
```bash
❌ Excel 파일을 찾을 수 없습니다: engine/input/ProductionResult_ScreenDefinition.xlsx
FileNotFoundError: 파일을 찾을 수 없습니다: engine/input/ProductionResult_ScreenDefinition.xlsx
```

**발생 원인 (Root Cause Analysis):**
1. **스크립트 실행 위치 의존성**: `generate_full_screen.sh` 스크립트가 상대 경로로 Excel 파일을 찾으려고 시도
2. **Working Directory 불일치**: 스크립트는 `/home/roarm_m3/ai-factory-lab`에서 실행되지만, `generator_excel.py`는 `engine/` 디렉토리에서 실행되어야 함
3. **경로 변환 미흡**: Bash 스크립트에서 Python으로 인자를 전달할 때 경로가 제대로 변환되지 않음

**재현 방법 (Reproduction Steps):**
```bash
# Step 1: 프로젝트 루트에서 스크립트 실행
cd /home/roarm_m3/ai-factory-lab

# Step 2: 상대 경로로 Excel 파일 전달
bash scripts/generate_full_screen.sh engine/input/ProductionResult_ScreenDefinition.xlsx ProductionResult

# 결과: ❌ 파일을 찾을 수 없음
```

**해결 방법 (Solution):**

**방법 1: 절대 경로 사용 (즉시 해결)**
```bash
# engine 디렉토리로 이동 후 상대 경로 사용
cd /home/roarm_m3/ai-factory-lab/engine
python generator_excel.py input/ProductionResult_ScreenDefinition.xlsx output/ProductionResult/ProductionResult.json
```

**방법 2: 스크립트 수정 (근본 해결)**

`scripts/generate_full_screen.sh` 수정:
```bash
#!/bin/bash
# 전체 화면 자동 생성 스크립트 (경로 문제 해결)

EXCEL_FILE="$1"
SCREEN_ID="$2"

# Excel 파일을 절대 경로로 변환
if [[ ! "$EXCEL_FILE" = /* ]]; then
    # 상대 경로인 경우 절대 경로로 변환
    EXCEL_FILE="$(cd "$(dirname "$EXCEL_FILE")" && pwd)/$(basename "$EXCEL_FILE")"
fi

# Excel 파일 존재 확인
if [ ! -f "$EXCEL_FILE" ]; then
    echo "❌ Excel 파일을 찾을 수 없습니다: $EXCEL_FILE"
    exit 1
fi

echo "🚀 화면 자동 생성 시작"
echo "   Excel PI: $EXCEL_FILE"
echo ""

# Step 1: Excel → JSON 파싱 (engine 디렉토리에서 실행)
echo "📝 Step 1: Excel PI 파싱..."
cd "$(dirname "$0")/../engine"  # 스크립트 위치 기준으로 engine 디렉토리로 이동

# 화면 ID 자동 추출
if [ -z "$SCREEN_ID" ]; then
    SCREEN_ID=$(basename "$EXCEL_FILE" | sed 's/_ScreenDefinition.xlsx$//')
fi

# 출력 디렉토리 생성
mkdir -p "output/$SCREEN_ID"

# Excel 파싱 (절대 경로 사용)
python generator_excel.py "$EXCEL_FILE" "output/$SCREEN_ID/$SCREEN_ID.json"

if [ $? -ne 0 ]; then
    echo "❌ Excel 파싱 실패"
    exit 1
fi

echo "✅ JSON Schema 생성 완료: output/$SCREEN_ID/$SCREEN_ID.json"
echo ""

# Step 2: JSON → Vue 컴포넌트 생성
echo "🎨 Step 2: Vue 컴포넌트 생성..."
python generator_vue.py "output/$SCREEN_ID/$SCREEN_ID.json" "output/$SCREEN_ID/$SCREEN_ID.vue"

if [ $? -ne 0 ]; then
    echo "❌ Vue 컴포넌트 생성 실패"
    exit 1
fi

echo "✅ Vue 컴포넌트 생성 완료: output/$SCREEN_ID/$SCREEN_ID.vue"
echo ""

# Step 3: JSON → Java 코드 생성
echo "☕ Step 3: Java 코드 생성..."
python generator_java.py "output/$SCREEN_ID/$SCREEN_ID.json" "output/$SCREEN_ID"

if [ $? -ne 0 ]; then
    echo "❌ Java 코드 생성 실패"
    exit 1
fi

echo "✅ Java 코드 생성 완료"
echo ""
echo "🎉 전체 화면 생성 완료!"
echo "   📁 출력 위치: engine/output/$SCREEN_ID/"
```

**방법 3: 간단한 Wrapper 스크립트**

`scripts/generate_production.sh` 생성:
```bash
#!/bin/bash
# ProductionResult 전용 생성 스크립트

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

cd "$PROJECT_ROOT/engine"

python generator_excel.py \
    input/ProductionResult_ScreenDefinition.xlsx \
    output/ProductionResult/ProductionResult.json

python generator_vue.py \
    output/ProductionResult/ProductionResult.json \
    output/ProductionResult/ProductionResult.vue

python generator_java.py \
    output/ProductionResult/ProductionResult.json \
    output/ProductionResult

echo "✅ ProductionResult 화면 생성 완료!"
```

**검증 방법 (Validation):**
```bash
# 테스트 1: 절대 경로
cd /home/roarm_m3/ai-factory-lab/engine
python generator_excel.py \
    /home/roarm_m3/ai-factory-lab/engine/input/ProductionResult_ScreenDefinition.xlsx \
    output/ProductionResult/ProductionResult.json
# ✅ 성공

# 테스트 2: 상대 경로 (engine에서)
cd /home/roarm_m3/ai-factory-lab/engine
python generator_excel.py \
    input/ProductionResult_ScreenDefinition.xlsx \
    output/ProductionResult/ProductionResult.json
# ✅ 성공

# 테스트 3: 수정된 스크립트
cd /home/roarm_m3/ai-factory-lab
bash scripts/generate_production.sh
# ✅ 성공
```

**예방 조치 (Prevention):**
1. **모든 스크립트에 절대 경로 변환 로직 추가**
   ```bash
   # 상대 경로를 절대 경로로 변환
   EXCEL_FILE="$(realpath "$1")"
   ```

2. **Working Directory 명시**
   ```bash
   # 항상 스크립트 위치 기준으로 cd
   SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
   cd "$SCRIPT_DIR/../engine"
   ```

3. **디버그 모드 추가**
   ```bash
   set -x  # 실행되는 모든 명령어 출력
   echo "Working Directory: $(pwd)"
   echo "Excel File: $EXCEL_FILE"
   echo "Excel File Exists: $(test -f "$EXCEL_FILE" && echo YES || echo NO)"
   ```

**참고 자료:**
- Bash Realpath: `man realpath`
- Bash Path Manipulation: https://www.gnu.org/software/bash/manual/html_node/Shell-Parameter-Expansion.html

**심각도:** 🟡 MEDIUM (개발 편의성 문제, 프로덕션 영향 없음)  
**수정 우선순위:** P2 (다음 스프린트)  
**담당자:** DevOps / Shell Script Expert

---

### 🔴 Error 10.2: Vue 컴포넌트 Return 문 콤마 누락

**에러 메시지:**
```
ERROR in ./src/views/ProductionResult.vue
Module Error (from ./node_modules/vue-loader/dist/index.js):
[vue/compiler-sfc] Unexpected token, expected "," (619:6)

732|        handleBtnexcelupload,
733|        handleBtnexceldownload
734|        handleRowClick,
   |        ^
735|        handleCellEdit,
736|        handleSizeChange,

[eslint] 
/home/roarm_m3/ai-factory-lab/frontend/src/views/ProductionResult.vue
  734:6  error  Parsing error: Unexpected token, expected "," (619:6)
```

**발생 원인 (Root Cause Analysis):**

**🔍 근본 원인: Python의 `str.join()` 메서드 특성**

1. **Generator 로직의 설계 결함**:
   ```python
   # engine/generator_vue.py - _generate_button_exports() 함수
   def _generate_button_exports(self) -> str:
       buttons = self.schema.get('buttons', [])
       exports = [f"      handle{btn.get('id', '').capitalize()}" for btn in buttons]
       return ',\n'.join(exports)  # ❌ 마지막에 콤마가 없음!
   ```

2. **Python join()의 동작 방식**:
   ```python
   # join()은 항목들 "사이"에만 구분자를 삽입
   items = ['a', 'b', 'c']
   result = ',\n'.join(items)
   # 결과:
   # a,
   # b,
   # c     ← 마지막에 콤마 없음!
   ```

3. **실제 생성된 코드**:
   ```javascript
   // buttons = ['btnSearch', 'btnReset', 'btnAdd', 'btnDelete', 
   //            'btnSave', 'btnConfirm', 'btnExcelUpload', 'btnExcelDownload']
   
   // _generate_button_exports() 실행 결과:
         handleBtnsearch,
         handleBtnreset,
         handleBtnadd,
         handleBtndelete,
         handleBtnsave,
         handleBtnconfirm,
         handleBtnexcelupload,
         handleBtnexceldownload  // ❌ 여기서 끝! 콤마 없음
   ```

4. **템플릿 삽입 시 구조적 문제**:
   ```javascript
   // generator_vue.py 템플릿 (줄 167-181)
   return {{
     gridRef,
     gridData,
     searchForm,
     gridColumns,
     searchConditions,
     pagination,
     handleSearch,
     handleReset,
   {self._generate_button_exports()}  // ← 여기에 위 코드가 삽입됨
     handleRowClick,                   // ❌ 앞에 콤마가 없어서 파싱 에러!
     handleCellEdit,
     handleSizeChange,
     handleCurrentChange
   }};
   ```

5. **왜 발견하기 어려웠는가?**
   - 버튼이 **0개**인 경우: `_generate_button_exports()`가 빈 문자열 반환 → 에러 없음
   - 버튼이 **있지만 마지막 export인 경우**: 뒤에 다른 항목이 없으면 에러 없음
   - **ProductionResult처럼 버튼이 많고, 뒤에 다른 항목이 있을 때만** 에러 발생!

6. **전체 코드 분석 결과 - 같은 패턴이 더 있는가?**
   
   **✅ 안전한 join() 사용 사례:**
   ```python
   # Line 336: 독립적인 배열 블록
   return '[\n    ' + ',\n    '.join(column_items) + '\n  ]'
   
   # Line 307: 독립적인 객체 블록 (뒤에 다른 프로퍼티 없음)
   const searchForm = reactive({
     {self._generate_search_form_data()}  # ← return ',\n'.join(data_items)
   });  # ← 객체가 여기서 끝남 (안전!)
   
   # Line 513: 독립적인 함수 정의들
   return '\n\n'.join(handlers)  # 각 함수가 완전한 블록
   ```
   
   **🚨 위험한 join() 사용 사례:**
   ```python
   # Line 519: 객체 프로퍼티 중간에 삽입 ← 🔥 문제!
   return {
     gridRef,
     gridData,
     ...
     handleSearch,
     handleReset,
     {self._generate_button_exports()},  # ← return ',\n'.join(exports)
     handleRowClick,  # ← 앞에 콤마가 없어서 에러!
     ...
   };
   ```
   
   **근본 원인 요약:**
   - Python의 `','.join(list)`는 **항목들 "사이"에만** 구분자 삽입
   - 마지막 항목 뒤에는 구분자가 없음
   - 템플릿에서 **다른 코드 중간에 삽입될 때** 문제 발생
   - 독립적인 블록(배열, 함수 정의 등)에서는 문제 없음

**시뮬레이션 검증:**
```bash
cd /home/roarm_m3/ai-factory-lab/engine
python3 << 'EOF'
import json
with open('output/ProductionResult/ProductionResult.json', 'r') as f:
    schema = json.load(f)

buttons = schema.get('buttons', [])
exports = [f"      handle{btn.get('id', '').capitalize()}" for btn in buttons]
result = ',\n'.join(exports)

print("버튼 개수:", len(buttons))
print("마지막 라인:", exports[-1])
print("마지막 문자:", repr(result[-1]))
print("콤마 있음?", result.endswith(','))
# 출력:
# 버튼 개수: 8
# 마지막 라인:       handleBtnexceldownload
# 마지막 문자: 'd'
# 콤마 있음? False  ← 🚨 문제 확인!
EOF
```

**문제 코드:**
```javascript
return {
  gridRef,
  gridData,
  searchForm,
  gridColumns,
  searchConditions,
  pagination,
  handleSearch,
  handleReset,
  handleBtnadd,
  handleBtndelete,
  handleBtnsave,
  handleBtnconfirm,
  handleBtnexcelupload,
  handleBtnexceldownload    // ❌ 콤마 누락!
  handleRowClick,           // 파싱 에러 발생
  handleCellEdit,
  handleSizeChange,
  handleCurrentChange
};
```

**재현 방법 (Reproduction Steps):**
```bash
# Step 1: ProductionResult 화면 생성
cd /home/roarm_m3/ai-factory-lab/engine
python generator_vue.py output/ProductionResult/ProductionResult.json output/ProductionResult/ProductionResult.vue

# Step 2: 생성된 파일을 frontend로 복사
cp output/ProductionResult/ProductionResult.vue ../frontend/src/views/

# Step 3: Frontend 개발 서버 시작
cd ../frontend
npm run serve

# 결과: ❌ Compile error - "Unexpected token, expected ,"
```

**해결 방법 (Solution):**

**방법 1: 수동 수정 (즉시 해결)**
```javascript
// ✅ 올바른 코드
return {
  gridRef,
  gridData,
  searchForm,
  gridColumns,
  searchConditions,
  pagination,
  handleSearch,
  handleReset,
  handleBtnadd,
  handleBtndelete,
  handleBtnsave,
  handleBtnconfirm,
  handleBtnexcelupload,
  handleBtnexceldownload,   // ✅ 콤마 추가!
  handleRowClick,
  handleCellEdit,
  handleSizeChange,
  handleCurrentChange
};
```

**방법 2: generator_vue.py 수정 (근본 해결)**

`engine/generator_vue.py` 파일의 `_generate_button_exports()` 함수 수정:

**현재 코드:**
```python
def _generate_button_exports(self) -> str:
    """버튼 핸들러 export 목록 생성"""
    buttons = self.schema.get('buttons', [])
    exports = [f"      handle{btn.get('id', '').capitalize()}" for btn in buttons]
    return ',\n'.join(exports)  # ❌ 마지막에 콤마가 없음
```

**수정된 코드:**
```python
def _generate_button_exports(self) -> str:
    """버튼 핸들러 export 목록 생성"""
    buttons = self.schema.get('buttons', [])
    exports = [f"      handle{btn.get('id', '').capitalize()}" for btn in buttons]
    
    # 버튼이 있으면 마지막에 콤마 추가 (뒤에 다른 항목이 올 수 있으므로)
    if exports:
        return ',\n'.join(exports) + ','
    return ''
```

**또는 템플릿 수정:**

현재 템플릿:
```python
return {{
  gridRef,
  gridData,
  searchForm,
  gridColumns,
  searchConditions,
  pagination,
  handleSearch,
  handleReset,
{self._generate_button_exports()}    # ❌ 콤마 없이 바로 다음 항목
  handleRowClick,
  handleCellEdit,
  handleSizeChange,
  handleCurrentChange
}};
```

수정된 템플릿:
```python
return {{
  gridRef,
  gridData,
  searchForm,
  gridColumns,
  searchConditions,
  pagination,
  handleSearch,
  handleReset,
{self._generate_button_exports()},   # ✅ 콤마 추가
  handleRowClick,
  handleCellEdit,
  handleSizeChange,
  handleCurrentChange
}};
```

**방법 3: ESLint Auto-fix (자동 수정)**
```bash
# ESLint로 자동 수정
cd frontend
npx eslint --fix src/views/ProductionResult.vue
```

**검증 방법 (Validation):**
```bash
# 테스트 1: 구문 검사
cd /home/roarm_m3/ai-factory-lab/frontend
npx eslint src/views/ProductionResult.vue
# ✅ 성공: no errors

# 테스트 2: 컴파일 확인
npm run serve
# ✅ 성공: Compiled successfully

# 테스트 3: 브라우저 확인
curl http://localhost:8081
# ✅ 성공: 200 OK
```

**예방 조치 (Prevention):**

1. **Generator에 자동 검증 추가**
   ```python
   # generator_vue.py 끝에 추가
   def validate_generated_code(self, vue_file_path: str):
       """생성된 Vue 파일의 구문 검증"""
       import subprocess
       
       result = subprocess.run(
           ['npx', 'eslint', '--format', 'json', vue_file_path],
           capture_output=True,
           text=True
       )
       
       if result.returncode != 0:
           print(f"⚠️  ESLint 경고 발견:")
           print(result.stdout)
       
       return result.returncode == 0
   ```

2. **템플릿 문법 개선 (Trailing Comma 패턴)**
   ```python
   # JavaScript에서 권장하는 Trailing Comma 패턴 사용
   return {{
     gridRef,
     gridData,
     searchForm,
     gridColumns,
     searchConditions,
     pagination,
     handleSearch,
     handleReset,
   {self._generate_button_exports()},  # 버튼 핸들러들
     handleRowClick,
     handleCellEdit,
     handleSizeChange,
     handleCurrentChange,  # ✅ 마지막에도 콤마 (Trailing Comma)
   }};
   ```

3. **Pre-commit Hook 설정**
   ```bash
   # .git/hooks/pre-commit
   #!/bin/bash
   
   # 모든 Vue 파일 ESLint 검사
   FILES=$(git diff --cached --name-only --diff-filter=ACM | grep '\.vue$')
   
   if [ -n "$FILES" ]; then
       echo "🔍 Vue 파일 ESLint 검사..."
       npx eslint $FILES
       
       if [ $? -ne 0 ]; then
           echo "❌ ESLint 에러 발견! 커밋 취소."
           exit 1
       fi
   fi
   
   exit 0
   ```

4. **CI/CD 파이프라인에 Lint 단계 추가**
   ```yaml
   # .github/workflows/ci.yml
   - name: Lint Frontend
     run: |
       cd frontend
       npm run lint
       
       if [ $? -ne 0 ]; then
         echo "❌ Lint 실패"
         exit 1
       fi
   ```

**관련 JavaScript 모범 사례:**

**Trailing Comma 사용 권장:**
```javascript
// ✅ 권장: 마지막 항목에도 콤마
const obj = {
  name: 'John',
  age: 30,
  city: 'Seoul',  // Trailing Comma
};

// Git Diff가 깔끔함:
// - age: 30
// + age: 31,
//   city: 'Seoul',
// + country: 'Korea',
```

**참고 자료:**
- ESLint Rules: https://eslint.org/docs/rules/comma-dangle
- Vue.js Style Guide: https://vuejs.org/style-guide/
- JavaScript Trailing Comma: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Trailing_commas
- Prettier Configuration: https://prettier.io/docs/en/options.html#trailing-commas

**심각도:** 🔴 HIGH (컴파일 실패, 애플리케이션 구동 불가)  
**수정 우선순위:** P0 (즉시 수정 필요)  
**담당자:** Frontend Generator / Code Quality

---

### 🟡 Error 10.3: 사용하지 않는 함수 및 변수 생성 (no-unused-vars)

**에러 메시지:**
```
ERROR
[eslint] 
/home/roarm_m3/ai-factory-lab/frontend/src/views/ProductionResult.vue
  587:11  error  'deleteData' is assigned a value but never used  no-unused-vars
  678:31  error  'row' is defined but never used                  no-unused-vars

✖ 2 problems (2 errors, 0 warnings)
```

**발생 원인 (Root Cause Analysis):**

**🔍 Case 1: deleteData 함수가 생성되지만 사용되지 않음**

1. **API 기반 함수 자동 생성 로직**:
   ```python
   # engine/generator_vue.py:422-435
   # 삭제 API
   if 'delete' in apis or 'remove' in apis:
       endpoint = apis.get('delete', apis.get('remove', f'/api/{table_name}/delete'))
       methods.append(f'''
   const deleteData = async (ids) => {{
     try {{
       await axios.delete('{endpoint}', {{ data: {{ ids }} }});
       ElMessage.success('삭제되었습니다.');
       await fetchList();
     }} catch (error) {{
       console.error('삭제 실패:', error);
       throw error;
     }}
   }};''')
   ```
   → **API 정의만 있으면 무조건 함수 생성**

2. **버튼 핸들러에서 호출 여부는 action 값에 의존**:
   ```python
   # engine/generator_vue.py:453-472
   elif action == 'delete':  # ← 'delete' 문자열과 정확히 일치해야 함
       handlers.append(f'''
       const {handler_name} = async () => {{
         ...
         await deleteData(selectedRows.map(r => r.id));  # ← 여기서 호출
       }}
       ''')
   ```

3. **ProductionResult의 실제 정의**:
   ```json
   // ProductionResult JSON Schema
   {
     "api": {
       "delete": "/api/production/result"  // ✅ delete API 정의됨
     },
     "buttons": [
       {
         "id": "btnDelete",
         "action": "deleteRow"  // ❌ 'deleteRow'로 정의 ('delete'가 아님!)
       }
     ]
   }
   ```

4. **결과**:
   - ✅ `deleteData()` 함수 생성됨 (delete API가 있으므로)
   - ❌ 버튼 핸들러는 `else` 블록으로 처리 (`action != 'delete'`)
   - ❌ `deleteData()` 호출 코드가 생성되지 않음
   - 🚨 **사용되지 않는 함수 경고 발생!**

**실제 검증**:
```bash
cd /home/roarm_m3/ai-factory-lab/engine
python3 << 'EOF'
import json
data = json.load(open('output/ProductionResult/ProductionResult.json'))

# API 확인
has_delete_api = 'delete' in data.get('api', {})
print(f"delete API 정의: {has_delete_api}")

# 버튼 확인
buttons = data.get('buttons', [])
delete_buttons = [b for b in buttons if b.get('action') == 'delete']
deleterow_buttons = [b for b in buttons if b.get('action') == 'deleteRow']

print(f"action='delete' 버튼: {len(delete_buttons)}개")
print(f"action='deleteRow' 버튼: {len(deleterow_buttons)}개")
print(f"\n🚨 불일치: API는 'delete'인데 버튼 action은 'deleteRow'!")
EOF

# 출력:
# delete API 정의: True
# action='delete' 버튼: 0개
# action='deleteRow' 버튼: 1개
# 🚨 불일치: API는 'delete'인데 버튼 action은 'deleteRow'!
```

**🔍 Case 2: handleCellEdit의 row 파라미터 미사용**

1. **템플릿에 고정된 파라미터 정의**:
   ```python
   # engine/generator_vue.py (템플릿 부분)
   const handleCellEdit = ({ row, field, value }) => {{  # ← 고정된 파라미터
     console.log('Cell edited:', field, value);  # ← row는 사용하지 않음
   }};
   ```

2. **근본 원인**:
   - RealGrid의 `cell-edit` 이벤트는 `{ row, field, value }` 객체 전달
   - 하지만 기본 템플릿은 `field`, `value`만 로깅
   - `row` 파라미터를 받지만 사용하지 않음

3. **이것은 설계 의도일 수 있음**:
   - 나중에 `row` 정보가 필요할 수 있어서 파라미터로 받음
   - 하지만 ESLint는 선언만 하고 사용하지 않으면 경고

**근본 원인 요약**:

| 문제 | 원인 | 발생 조건 |
|------|------|----------|
| deleteData 미사용 | API 이름과 버튼 action 불일치 | `delete` API 있지만 버튼 action이 `deleteRow` |
| row 파라미터 미사용 | 템플릿에 고정된 파라미터 | RealGrid 이벤트 구조 상 row를 받지만 기본 구현에서 미사용 |

**패턴 분석**:
```python
# 문제 패턴 1: API 기반 함수 생성과 버튼 action 검사의 분리
if 'delete' in apis:
    # deleteData() 함수 생성
    methods.append('const deleteData = ...')

# 별도 위치에서
if action == 'delete':  # ← 버튼 action 체크
    # deleteData() 호출
    handlers.append('await deleteData(...)')

# 🚨 문제: API는 있는데 버튼 action이 다르면 함수만 생성되고 호출 안 됨!
```

**해결 방법 (Solution):**

**방법 1: 버튼 action 명칭 통일 (Excel PI 수정)**
```json
// ProductionResult Excel PI
{
  "buttons": [
    {
      "id": "btnDelete",
      "action": "delete"  // ✅ 'deleteRow' → 'delete'로 변경
    }
  ]
}
```

**방법 2: generator_vue.py에서 action 별칭 지원**
```python
# engine/generator_vue.py:453
elif action in ['delete', 'deleteRow', 'remove']:  # ✅ 여러 별칭 지원
    handlers.append(f'''
    const {handler_name} = async () => {{
      ...
      await deleteData(selectedRows.map(r => r.id));
    }}
    ''')
```

**방법 3: 사용하지 않는 함수 생성 방지 (스마트 생성)**
```python
# 버튼들의 action을 먼저 스캔
button_actions = [btn.get('action', '') for btn in self.schema.get('buttons', [])]

# 삭제 API
if 'delete' in apis or 'remove' in apis:
    # ✅ delete 관련 action이 있을 때만 함수 생성
    if any(action in ['delete', 'deleteRow', 'remove'] for action in button_actions):
        methods.append('const deleteData = ...')
```

**방법 4: row 파라미터 처리**
```python
# Option A: ESLint 무시
const handleCellEdit = ({ row, field, value }) => {  // eslint-disable-line no-unused-vars
  console.log('Cell edited:', field, value);
};

# Option B: 언더스코어 prefix (사용 안 함을 명시)
const handleCellEdit = ({ row: _row, field, value }) => {
  console.log('Cell edited:', field, value);
};

# Option C: 파라미터에서 제거
const handleCellEdit = ({ field, value }) => {
  console.log('Cell edited:', field, value);
};
```

**검증 방법 (Validation):**
```bash
# 테스트 1: 버튼 action과 API 매핑 확인
cd /home/roarm_m3/ai-factory-lab/engine
python3 << 'EOF'
import json
data = json.load(open('output/ProductionResult/ProductionResult.json'))

apis = set(data.get('api', {}).keys())
actions = set(btn.get('action', '') for btn in data.get('buttons', []))

print("APIs:", apis)
print("Actions:", actions)
print("Mismatch:", apis.symmetric_difference(actions))
EOF

# 테스트 2: ESLint 검사
cd /home/roarm_m3/ai-factory-lab/frontend
npx eslint src/views/ProductionResult.vue
# ✅ no-unused-vars 경고 없어야 함
```

**예방 조치 (Prevention):**

1. **Action 명칭 표준화 문서**:
   ```markdown
   # 버튼 Action 명칭 표준
   - search: 조회
   - reset: 초기화
   - add: 행 추가
   - delete: 행 삭제 (❌ deleteRow 사용 금지)
   - save: 저장
   - confirm: 확정
   - excelUpload: Excel 업로드
   - excelDownload: Excel 다운로드
   ```

2. **Generator 검증 로직**:
   ```python
   def validate_button_action_mapping(self):
       """버튼 action과 API 매핑 검증"""
       apis = set(self.schema.get('api', {}).keys())
       actions = set(btn.get('action', '') for btn in self.schema.get('buttons', []))
       
       # delete/remove 특수 처리
       if 'delete' in apis and not any(a in ['delete', 'deleteRow'] for a in actions):
           print(f"⚠️  경고: delete API가 있지만 delete 관련 버튼이 없습니다!")
   ```

3. **Pre-generation 체크**:
   ```bash
   # 코드 생성 전 검증
   python engine/validate_schema.py ProductionResult.json
   # 출력:
   # ⚠️  경고: delete API 있으나 action='delete' 버튼 없음
   # ⚠️  제안: btnDelete의 action을 'deleteRow' → 'delete'로 변경
   ```

**참고 자료:**
- ESLint no-unused-vars: https://eslint.org/docs/rules/no-unused-vars
- JavaScript Parameter Naming: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters

**심각도:** 🟡 MEDIUM (경고, 프로덕션 영향 없음. 하지만 코드 품질 저하)  
**수정 우선순위:** P2 (다음 스프린트, Generator 개선)  
**담당자:** Frontend Generator / Schema Validation

---

**✅ 문서 작성 완료 - 개발팀 승리! 🏆**

**버전:** v2.3 (Expert Edition + GridStyle Phase 1 + no-unused-vars 분석)  
**작성일:** 2025-11-30  
**최종 업데이트:** 2025-11-30 (Phase 1 완료, 3개 에러 케이스 문서화)

*이 문서는 실전 프로덕션 환경에서 발생한 실제 에러를 기반으로 작성되었습니다.*  
*"에러는 반복되지만, 해결책은 문서화되고, 이제 자동화됩니다."* 🚀
