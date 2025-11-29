# 🔧 Backend 코드 생성 개선 가이드

**작성일**: 2025년 11월 29일  
**대상**: COST001 화면 생성 시 발견된 Backend 코드 생성 문제

---

## 🚨 문제점 분석

### 1. 현재 상황

COST001 화면을 생성했을 때, JSON 스키마는 **완벽**하게 생성되었지만, Java Controller와 MyBatis Mapper는 **메뉴 관리용 템플릿**으로 생성되었습니다.

#### ❌ 잘못 생성된 Controller (현재)

```java
@RestController
@RequestMapping("/api/system/menu")  // ❌ 메뉴 API 경로
public class COST001Controller {

    @GetMapping("/tree")  // ❌ 메뉴 트리 조회
    public List<Map<String, Object>> getMenuTree() {
        return service.getMenuTree();
    }

    @PostMapping  // ❌ 메뉴 추가
    public Map<String, Object> addMenu(@RequestBody Map<String, Object> menuData) {
        return service.addMenu(menuData);
    }
    // ... 메뉴 관련 메서드들
}
```

#### ✅ 올바르게 생성되어야 할 Controller

```java
@RestController
@RequestMapping("/api/v1/cost")  // ✅ JSON의 api.search 경로 기반
public class COST001Controller {

    @PostMapping("/COST001/search")  // ✅ 원가 조회
    public List<Map<String, Object>> searchDeptCost(@RequestBody Map<String, Object> params) {
        log.info("부서별 제조경비 조회 요청: {}", params);
        return service.searchDeptCost(params);
    }

    @PostMapping("/COST001/create")  // ✅ 데이터 생성
    public Map<String, Object> createDeptCost(@RequestBody Map<String, Object> data) {
        return service.createDeptCost(data);
    }
    
    // ... JSON의 api 정의에 맞는 메서드들
}
```

#### ❌ 잘못 생성된 Mapper (현재)

```xml
<mapper namespace="com.dowinsys.cost.monthly.COST001Mapper">
    <select id="selectMenuList" resultType="map">
        SELECT
            menu_id AS menuId,
            up_menu_id AS upMenuId,
            menu_nm AS menuName,
            ...
        FROM doi_cost_monthly_dept_cost  -- ❌ 테이블명만 맞고 컬럼은 메뉴용
        WHERE use_yn = 'Y'
    </select>
</mapper>
```

#### ✅ 올바르게 생성되어야 할 Mapper

```xml
<mapper namespace="com.dowinsys.cost.monthly.COST001Mapper">
    <select id="selectDeptCostList" resultType="map">
        SELECT
            dept_code AS deptCode,
            dept_name AS deptName,
            account_code AS accountCode,
            account_name AS accountName,
            current_amount AS currentAmount,
            previous_amount AS previousAmount,
            (current_amount - previous_amount) AS variance
        FROM doi_cost_monthly_dept_cost
        WHERE base_month = #{baseMonth}
        <if test="plant != null and plant != ''">
            AND plant = #{plant}
        </if>
        <if test="deptName != null and deptName != ''">
            AND dept_name LIKE CONCAT('%', #{deptName}, '%')
        </if>
    </select>
</mapper>
```

---

## 🔍 원인 분석

### 근본 원인: Hard-coded 템플릿 사용

현재 `generator.py`의 `_generate_java_controller()` 및 `_generate_mybatis_mapper()` 메서드가 **고정된 메뉴 관리용 템플릿**을 사용하고 있습니다.

```python
def _generate_java_controller(self, schema_data):
    """Java Spring Boot Controller 생성"""
    screen_id = schema_data.get('screenId', 'UNKNOWN')
    screen_name = schema_data.get('screenName', '화면명')
    package = schema_data.get('package', 'com.dowinsys.system')
    
    controller = f'''package {package};
...
@RequestMapping("/api/system/menu")  # ← 🚨 항상 메뉴 경로!
public class {screen_id}Controller {{
    @GetMapping("/tree")  # ← 🚨 항상 메뉴 트리 조회!
    public List<Map<String, Object>> getMenuTree() {{
        return service.getMenuTree();
    }}
    ...
}}'''
    return controller
```

### 왜 이런 일이 발생했나?

1. **초기 개발 단계**에서 메뉴 관리 화면을 먼저 만들었음
2. 그 템플릿을 **그대로 재사용**했음
3. JSON 스키마의 정보를 **활용하지 않고** 단순 문자열 치환만 사용

---

## 💡 해결 방법: Prompt Engineering

### 방법 1: AI에게 Backend 코드도 생성하도록 요청 ⭐ (추천)

**현재**: AI가 JSON 스키마만 생성 → Python 코드가 템플릿으로 나머지 파일 생성  
**개선**: AI가 JSON + Controller + Mapper **모두** 생성

#### 📝 개선된 System Prompt

`generator/prompts/system_instruction.md`에 다음 내용 추가:

```markdown
## 출력 형식

다음 5개의 코드를 생성하세요:

### 1. JSON 스키마
(기존과 동일)

### 2. Spring Boot Controller (Java)

**규칙:**
- `@RequestMapping`은 JSON의 `api.search` 경로에서 추출 (예: `/api/v1/cost`)
- 메서드는 JSON의 `api` 객체에 정의된 4가지만 생성:
  - `search`: POST 요청, 검색 조건을 @RequestBody로 받음
  - `create`: POST 요청, 생성 데이터를 @RequestBody로 받음
  - `update`: PUT 요청, 수정 데이터를 @RequestBody로 받음
  - `delete`: DELETE 요청, ID를 @PathVariable로 받음
- 메서드명은 화면 도메인에 맞게 작성 (예: searchDeptCost)
- 로그는 화면명 기반으로 작성

**예시:**
```java
package com.dowinsys.cost.monthly;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/v1/cost")
@RequiredArgsConstructor
public class COST001Controller {

    private final COST001Service service;

    @PostMapping("/COST001/search")
    public List<Map<String, Object>> search(@RequestBody Map<String, Object> params) {
        log.info("부서별 제조경비 조회: {}", params);
        return service.search(params);
    }

    @PostMapping("/COST001/create")
    public Map<String, Object> create(@RequestBody Map<String, Object> data) {
        log.info("부서별 제조경비 생성: {}", data);
        return service.create(data);
    }

    @PutMapping("/COST001/update")
    public Map<String, Object> update(@RequestBody Map<String, Object> data) {
        log.info("부서별 제조경비 수정: {}", data);
        return service.update(data);
    }

    @DeleteMapping("/COST001/delete/{id}")
    public Map<String, Object> delete(@PathVariable String id) {
        log.info("부서별 제조경비 삭제: {}", id);
        return service.delete(id);
    }
}
```

### 3. MyBatis Mapper XML

**규칙:**
- namespace는 JSON의 `package` + ".{ScreenID}Mapper"
- SELECT 쿼리:
  - SELECT 절은 JSON의 `gridColumns`를 기반으로 생성
  - FROM 절은 JSON의 `tableName` 사용
  - WHERE 절은 JSON의 `searchConditions`를 기반으로 생성
  - `required=true`인 조건은 반드시 포함
  - `required=false`인 조건은 `<if test="">` 사용
- INSERT/UPDATE/DELETE 쿼리:
  - `gridColumns`의 필드를 사용하여 자동 생성

**예시:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">

<mapper namespace="com.dowinsys.cost.monthly.COST001Mapper">

    <!-- 부서별 제조경비 조회 -->
    <select id="selectList" resultType="map">
        SELECT
            dept_code AS deptCode,
            dept_name AS deptName,
            account_code AS accountCode,
            account_name AS accountName,
            current_amount AS currentAmount,
            previous_amount AS previousAmount,
            (current_amount - previous_amount) AS variance
        FROM doi_cost_monthly_dept_cost
        WHERE base_month = #{baseMonth}  <!-- required=true -->
        <if test="plant != null and plant != ''">
            AND plant = #{plant}
        </if>
        <if test="deptName != null and deptName != ''">
            AND dept_name LIKE CONCAT('%', #{deptName}, '%')
        </if>
    </select>

    <insert id="insert" parameterType="map">
        INSERT INTO doi_cost_monthly_dept_cost (
            dept_code, dept_name, account_code, account_name,
            current_amount, previous_amount, base_month, plant
        ) VALUES (
            #{deptCode}, #{deptName}, #{accountCode}, #{accountName},
            #{currentAmount}, #{previousAmount}, #{baseMonth}, #{plant}
        )
    </insert>

</mapper>
```

### 4. Vue Component
(기존과 동일)

### 5. Router Config
(기존과 동일)

---

## 출력 형식 지정

**중요**: 5개 파일을 다음 JSON 형식으로 반환하세요:

```json
{
  "files": [
    {
      "type": "json",
      "filename": "COST001.json",
      "content": "{ JSON 스키마 내용 }"
    },
    {
      "type": "controller",
      "filename": "COST001Controller.java",
      "content": "package com.dowinsys.cost.monthly; ..."
    },
    {
      "type": "mapper",
      "filename": "COST001Mapper.xml",
      "content": "<?xml version=\"1.0\" ...>"
    },
    {
      "type": "vue",
      "filename": "COST001.vue",
      "content": "<template> ..."
    },
    {
      "type": "router",
      "filename": "router_config.js",
      "content": "// 라우터 설정 ..."
    }
  ]
}
```
```

---

### 방법 2: Python 코드에서 JSON 기반 동적 생성

AI Prompt를 변경하지 않고, `generator.py`의 템플릿 생성 로직을 개선하는 방법입니다.

#### 개선 포인트

```python
def _generate_java_controller(self, schema_data):
    """JSON 스키마를 분석하여 Controller 생성"""
    screen_id = schema_data.get('screenId')
    screen_name = schema_data.get('screenName')
    package = schema_data.get('package')
    api_paths = schema_data.get('api', {})
    
    # API 경로에서 base path 추출
    # "/api/v1/cost/COST001/search" → "/api/v1/cost"
    search_path = api_paths.get('search', '')
    base_path = '/'.join(search_path.split('/')[:-2]) if search_path else '/api/v1'
    
    # 메서드 생성
    methods = []
    
    # Search 메서드
    if 'search' in api_paths:
        methods.append(f'''
    @PostMapping("/{screen_id}/search")
    public List<Map<String, Object>> search(@RequestBody Map<String, Object> params) {{
        log.info("{screen_name} 조회 요청: {{}}", params);
        return service.search(params);
    }}''')
    
    # Create 메서드
    if 'create' in api_paths:
        methods.append(f'''
    @PostMapping("/{screen_id}/create")
    public Map<String, Object> create(@RequestBody Map<String, Object> data) {{
        log.info("{screen_name} 생성 요청: {{}}", data);
        return service.create(data);
    }}''')
    
    # Update 메서드
    if 'update' in api_paths:
        methods.append(f'''
    @PutMapping("/{screen_id}/update")
    public Map<String, Object> update(@RequestBody Map<String, Object> data) {{
        log.info("{screen_name} 수정 요청: {{}}", data);
        return service.update(data);
    }}''')
    
    # Delete 메서드
    if 'delete' in api_paths:
        methods.append(f'''
    @DeleteMapping("/{screen_id}/delete/{{id}}")
    public Map<String, Object> delete(@PathVariable String id) {{
        log.info("{screen_name} 삭제 요청: {{}}", id);
        return service.delete(id);
    }}''')
    
    methods_code = '\n'.join(methods)
    
    controller = f'''package {package};

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

/**
 * {screen_name} Controller
 * 생성일: {__import__('datetime').datetime.now().strftime('%Y-%m-%d')}
 */
@Slf4j
@RestController
@RequestMapping("{base_path}")
@RequiredArgsConstructor
public class {screen_id}Controller {{

    private final {screen_id}Service service;
{methods_code}
}}
'''
    return controller


def _generate_mybatis_mapper(self, schema_data):
    """JSON 스키마를 분석하여 MyBatis Mapper 생성"""
    screen_id = schema_data.get('screenId')
    screen_name = schema_data.get('screenName')
    package = schema_data.get('package')
    table_name = schema_data.get('tableName')
    grid_columns = schema_data.get('gridColumns', [])
    search_conditions = schema_data.get('searchConditions', [])
    
    # SELECT 절 생성 (gridColumns 기반)
    select_columns = []
    for col in grid_columns:
        field = col.get('field')
        # snake_case로 변환 (예: deptCode → dept_code)
        db_column = ''.join(['_' + c.lower() if c.isupper() else c for c in field]).lstrip('_')
        select_columns.append(f"            {db_column} AS {field}")
    
    select_clause = ',\n'.join(select_columns)
    
    # WHERE 절 생성 (searchConditions 기반)
    where_conditions = []
    for condition in search_conditions:
        cond_id = condition.get('id')
        required = condition.get('required', False)
        cond_type = condition.get('type')
        
        # snake_case로 변환
        db_column = ''.join(['_' + c.lower() if c.isupper() else c for c in cond_id]).lstrip('_')
        
        if required:
            # 필수 조건은 WHERE에 직접 포함
            where_conditions.append(f"        WHERE {db_column} = #{{{cond_id}}}")
        else:
            # 선택 조건은 <if test="">로 처리
            if cond_type == 'input':
                where_conditions.append(f'''        <if test="{cond_id} != null and {cond_id} != ''">
            AND {db_column} LIKE CONCAT('%', #{{{cond_id}}}, '%')
        </if>''')
            else:
                where_conditions.append(f'''        <if test="{cond_id} != null and {cond_id} != ''">
            AND {db_column} = #{{{cond_id}}}
        </if>''')
    
    where_clause = '\n'.join(where_conditions)
    
    mapper = f'''<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">

<mapper namespace="{package}.{screen_id}Mapper">

    <!-- {screen_name} 조회 -->
    <select id="selectList" resultType="map">
        SELECT
{select_clause}
        FROM {table_name}
{where_clause}
    </select>

</mapper>
'''
    return mapper
```

---

## 📊 두 가지 방법 비교

| 구분 | 방법 1: AI에게 맡기기 | 방법 2: Python 로직 개선 |
|-----|---------------------|----------------------|
| **장점** | • AI가 더 유연하게 생성<br>• 도메인별 커스터마이징 가능<br>• 코드 품질 향상 가능 | • 즉시 적용 가능<br>• 예측 가능한 결과<br>• 디버깅 쉬움 |
| **단점** | • Prompt 튜닝 필요<br>• 응답 형식 파싱 복잡<br>• API 비용 증가 가능 | • 유연성 낮음<br>• Python 코드 유지보수 필요<br>• 복잡한 케이스 대응 어려움 |
| **난이도** | 중간 | 쉬움 |
| **권장** | ⭐⭐⭐ 장기적으로 추천 | ⭐⭐ 빠른 개선 필요 시 |

---

## 🎯 추천 해결 순서

### Phase 1: 빠른 개선 (1-2시간)
1. **Python 코드 개선** (방법 2)
   - `_generate_java_controller()` 로직 수정
   - `_generate_mybatis_mapper()` 로직 수정
   - 즉시 테스트 가능

### Phase 2: 근본적 개선 (1-2일)
2. **AI Prompt 개선** (방법 1)
   - `system_instruction.md`에 Backend 코드 생성 규칙 추가
   - 출력 형식을 JSON으로 변경
   - `generator.py`에서 JSON 파싱 및 파일 저장 로직 추가

### Phase 3: 고도화 (1주일)
3. **템플릿 엔진 도입**
   - Jinja2로 템플릿 관리
   - 도메인별 템플릿 분리 (메뉴, 원가, 생산 등)
   - 사용자 정의 템플릿 지원

---

## 🚀 즉시 적용 가능한 개선 코드

`generator/generator.py` 파일의 다음 메서드를 교체하세요:

### 1. _generate_java_controller 개선

```python
def _generate_java_controller(self, schema_data):
    """JSON 스키마를 분석하여 Controller 생성"""
    screen_id = schema_data.get('screenId')
    screen_name = schema_data.get('screenName')
    package = schema_data.get('package')
    api_paths = schema_data.get('api', {})
    
    # API 경로에서 base path 추출
    search_path = api_paths.get('search', '')
    parts = search_path.split('/')
    # /api/v1/cost/COST001/search → /api/v1/cost
    base_path = '/'.join(parts[:-2]) if len(parts) >= 2 else '/api/v1'
    
    controller = f'''package {package};

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

/**
 * {screen_name} Controller
 * 생성일: {__import__('datetime').datetime.now().strftime('%Y-%m-%d')}
 */
@Slf4j
@RestController
@RequestMapping("{base_path}")
@RequiredArgsConstructor
public class {screen_id}Controller {{

    private final {screen_id}Service service;

    /**
     * {screen_name} 조회
     */
    @PostMapping("/{screen_id}/search")
    public List<Map<String, Object>> search(@RequestBody Map<String, Object> params) {{
        log.info("{screen_name} 조회 요청: {{}}", params);
        return service.search(params);
    }}

    /**
     * {screen_name} 생성
     */
    @PostMapping("/{screen_id}/create")
    public Map<String, Object> create(@RequestBody Map<String, Object> data) {{
        log.info("{screen_name} 생성 요청: {{}}", data);
        return service.create(data);
    }}

    /**
     * {screen_name} 수정
     */
    @PutMapping("/{screen_id}/update")
    public Map<String, Object> update(@RequestBody Map<String, Object> data) {{
        log.info("{screen_name} 수정 요청: {{}}", data);
        return service.update(data);
    }}

    /**
     * {screen_name} 삭제
     */
    @DeleteMapping("/{screen_id}/delete/{{id}}")
    public Map<String, Object> delete(@PathVariable String id) {{
        log.info("{screen_name} 삭제 요청: {{}}", id);
        return service.delete(id);
    }}
}}
'''
    return controller
```

### 2. _generate_mybatis_mapper 개선

```python
def _generate_mybatis_mapper(self, schema_data):
    """JSON 스키마를 분석하여 MyBatis Mapper 생성"""
    screen_id = schema_data.get('screenId')
    screen_name = schema_data.get('screenName')
    package = schema_data.get('package')
    table_name = schema_data.get('tableName')
    grid_columns = schema_data.get('gridColumns', [])
    search_conditions = schema_data.get('searchConditions', [])
    
    # SELECT 절 생성 (gridColumns 기반)
    def camel_to_snake(name):
        """camelCase를 snake_case로 변환"""
        return ''.join(['_' + c.lower() if c.isupper() else c for c in name]).lstrip('_')
    
    select_columns = []
    for col in grid_columns:
        field = col.get('field')
        db_column = camel_to_snake(field)
        select_columns.append(f"            {db_column} AS {field}")
    
    select_clause = ',\n'.join(select_columns)
    
    # WHERE 절 생성 (searchConditions 기반)
    where_parts = []
    required_conditions = []
    optional_conditions = []
    
    for condition in search_conditions:
        cond_id = condition.get('id')
        required = condition.get('required', False)
        cond_type = condition.get('type')
        db_column = camel_to_snake(cond_id)
        
        if required:
            required_conditions.append(f"{db_column} = #{{{cond_id}}}")
        else:
            if cond_type == 'input':
                optional_conditions.append(f'''        <if test="{cond_id} != null and {cond_id} != ''">
            AND {db_column} LIKE CONCAT('%', #{{{cond_id}}}, '%')
        </if>''')
            else:
                optional_conditions.append(f'''        <if test="{cond_id} != null and {cond_id} != ''">
            AND {db_column} = #{{{cond_id}}}
        </if>''')
    
    # WHERE 절 조합
    if required_conditions:
        where_parts.append(f"        WHERE {' AND '.join(required_conditions)}")
    
    if optional_conditions:
        where_parts.extend(optional_conditions)
    
    where_clause = '\n'.join(where_parts) if where_parts else "        <!-- WHERE 조건 없음 -->"
    
    mapper = f'''<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">

<mapper namespace="{package}.{screen_id}Mapper">

    <!-- {screen_name} 조회 -->
    <select id="selectList" resultType="map">
        SELECT
{select_clause}
        FROM {table_name}
{where_clause}
    </select>

    <!-- {screen_name} 생성 -->
    <insert id="insert" parameterType="map">
        INSERT INTO {table_name} (
            {', '.join([camel_to_snake(col.get('field')) for col in grid_columns])}
        ) VALUES (
            {', '.join([f"#{{{col.get('field')}}}" for col in grid_columns])}
        )
    </insert>

    <!-- {screen_name} 수정 -->
    <update id="update" parameterType="map">
        UPDATE {table_name}
        SET
            {', '.join([f"{camel_to_snake(col.get('field'))} = #{{{col.get('field')}}}" for col in grid_columns[1:]])}
        WHERE {camel_to_snake(grid_columns[0].get('field'))} = #{{{grid_columns[0].get('field')}}}
    </update>

    <!-- {screen_name} 삭제 -->
    <delete id="delete" parameterType="string">
        DELETE FROM {table_name}
        WHERE {camel_to_snake(grid_columns[0].get('field'))} = #{{id}}
    </delete>

</mapper>
'''
    return mapper
```

---

## ✅ 테스트 방법

개선 후 다시 COST001을 생성하여 확인:

```bash
curl -X POST http://localhost:8000/generate \
  -H "Content-Type: application/json" \
  -d '{"piText": "화면명: 부서별 제조경비 조회..."}'
```

생성된 파일 확인:
```bash
cat engine/output/COST001/java/COST001Controller.java
cat engine/output/COST001/mapper/COST001Mapper.xml
```

---

## 📚 참고 자료

- [MyBatis Dynamic SQL](https://mybatis.org/mybatis-3/dynamic-sql.html)
- [Spring Boot REST API Best Practices](https://spring.io/guides/tutorials/rest/)
- [Jinja2 Template Engine](https://jinja.palletsprojects.com/)

---

**작성자**: GitHub Copilot  
**다음 단계**: Python 코드 개선 적용 및 테스트
