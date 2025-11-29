"""
AI Factory - Code Generator
Gemini API를 사용하여 PI 문서에서 화면 스키마와 코드를 생성하는 모듈
"""

import os
import json
import google.generativeai as genai
from pathlib import Path


def load_env():
    """
    .env 파일에서 환경변수 로드
    python-dotenv 없이 간단하게 구현
    """
    env_file = Path(__file__).parent / '.env'
    if env_file.exists():
        with open(env_file, 'r', encoding='utf-8') as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith('#') and '=' in line:
                    key, value = line.split('=', 1)
                    os.environ[key.strip()] = value.strip()

# .env 파일 로드
load_env()


class CodeGenerator:
    """PI 문서를 기반으로 화면 코드를 생성하는 클래스"""
    
    def __init__(self):
        """
        Gemini API 설정 및 초기화
        환경변수 GEMINI_API_KEY 필요
        """
        # API 키 확인
        api_key = os.environ.get('GEMINI_API_KEY')
        if not api_key:
            raise ValueError("GEMINI_API_KEY 환경변수가 설정되지 않았습니다.")
        
        # Gemini 설정
        genai.configure(api_key=api_key)
        
        # 모델 설정 (gemini-2.5-flash 사용)
        self.model = genai.GenerativeModel('gemini-2.5-flash')
        
        # 시스템 프롬프트 로드
        self.system_instruction = self._load_system_instruction()
    
    def _load_system_instruction(self):
        """시스템 프롬프트 파일 로드"""
        current_dir = Path(__file__).parent
        prompt_file = current_dir / 'prompts' / 'system_instruction.md'
        
        if not prompt_file.exists():
            raise FileNotFoundError(f"시스템 프롬프트 파일을 찾을 수 없습니다: {prompt_file}")
        
        with open(prompt_file, 'r', encoding='utf-8') as f:
            return f.read()
    
    def generate_code(self, pi_text):
        """
        PI 문서를 기반으로 화면 코드 생성
        
        Args:
            pi_text (str): PI 문서 텍스트
            
        Returns:
            list: 생성된 파일 정보 리스트
                [
                    {
                        "filename": "COST001.json",
                        "code": "{ ... }"
                    },
                    ...
                ]
        """
        try:
            # Gemini API 호출
            response = self.model.generate_content([
                self.system_instruction,
                f"\n\n# PI 문서\n\n{pi_text}"
            ])
            
            # 응답 텍스트 추출
            schema_json = response.text.strip()
            
            # 코드 블록 제거 (```json ... ``` 형식 처리)
            if schema_json.startswith('```'):
                # 첫 번째 줄 제거 (```json)
                lines = schema_json.split('\n')
                if lines[0].startswith('```'):
                    lines = lines[1:]
                # 마지막 줄 제거 (```)
                if lines and lines[-1].strip() == '```':
                    lines = lines[:-1]
                schema_json = '\n'.join(lines)
            
            # JSON 파싱 (유효성 검증)
            schema_data = json.loads(schema_json)
            
            # 화면 ID 추출
            screen_id = schema_data.get('screenId', 'UNKNOWN')
            
            # output 폴더 생성 (engine/output/{screen_id}/)
            output_dir = Path(__file__).parent.parent / 'engine' / 'output' / screen_id
            output_dir.mkdir(parents=True, exist_ok=True)
            
            # 생성할 파일 리스트
            generated_files = []
            
            # 1. JSON 스키마 파일
            json_filename = f"{screen_id}.json"
            json_code = json.dumps(schema_data, ensure_ascii=False, indent=2)
            json_path = output_dir / json_filename
            
            # 파일 저장
            with open(json_path, 'w', encoding='utf-8') as f:
                f.write(json_code)
            
            generated_files.append({
                "filename": json_filename,
                "code": json_code,
                "path": f"output/{screen_id}/{json_filename}"
            })
            
            # 2. Vue 컴포넌트 파일
            vue_code = self._generate_vue_component(schema_data)
            vue_filename = f"{screen_id}.vue"
            vue_path = output_dir / vue_filename
            
            # 파일 저장
            with open(vue_path, 'w', encoding='utf-8') as f:
                f.write(vue_code)
            
            generated_files.append({
                "filename": vue_filename,
                "code": vue_code,
                "path": f"output/{screen_id}/{vue_filename}"
            })
            
            # 3. 라우터 설정 코드 (참고용)
            router_code = self._generate_router_config(schema_data)
            router_filename = "router_config.js"
            router_path = output_dir / router_filename
            
            # 파일 저장
            with open(router_path, 'w', encoding='utf-8') as f:
                f.write(router_code)
            
            generated_files.append({
                "filename": router_filename,
                "code": router_code,
                "path": f"output/{screen_id}/{router_filename}"
            })
            
            # 4. Java Controller 파일
            controller_code = self._generate_java_controller(schema_data)
            controller_filename = f"{screen_id}Controller.java"
            
            # java 하위 폴더 생성
            java_dir = output_dir / 'java'
            java_dir.mkdir(exist_ok=True)
            controller_path = java_dir / controller_filename
            
            # 파일 저장
            with open(controller_path, 'w', encoding='utf-8') as f:
                f.write(controller_code)
            
            generated_files.append({
                "filename": controller_filename,
                "code": controller_code,
                "path": f"output/{screen_id}/java/{controller_filename}"
            })
            
            # 5. MyBatis Mapper XML 파일
            mapper_code = self._generate_mybatis_mapper(schema_data)
            mapper_filename = f"{screen_id}Mapper.xml"
            
            # mapper 하위 폴더 생성
            mapper_dir = output_dir / 'mapper'
            mapper_dir.mkdir(exist_ok=True)
            mapper_path = mapper_dir / mapper_filename
            
            # 파일 저장
            with open(mapper_path, 'w', encoding='utf-8') as f:
                f.write(mapper_code)
            
            generated_files.append({
                "filename": mapper_filename,
                "code": mapper_code,
                "path": f"output/{screen_id}/mapper/{mapper_filename}"
            })
            
            print(f"✅ 파일 저장 완료: {output_dir}")
            
            return generated_files
            
        except json.JSONDecodeError as e:
            raise ValueError(f"Gemini 응답을 JSON으로 파싱할 수 없습니다: {e}\n\n응답:\n{response.text}")
        except Exception as e:
            raise RuntimeError(f"코드 생성 중 오류 발생: {e}")
    
    def _generate_vue_component(self, schema_data):
        """
        Vue 컴포넌트 코드 생성 (간단한 템플릿)
        추후 Jinja2 등으로 고도화 예정
        """
        screen_id = schema_data.get('screenId', 'UNKNOWN')
        screen_name = schema_data.get('screenName', '화면명')
        
        # 간단한 문자열 템플릿
        template = f'''<template>
  <div class="screen-container">
    <div class="page-header">
      <h1 class="page-title">
        <i class="bi bi-file-earmark-code"></i>
        {screen_name}
      </h1>
    </div>

    <!-- 검색 조건 영역 -->
    <div class="search-panel">
      <h3>검색 조건</h3>
      <!-- 검색 폼 구현 예정 -->
    </div>

    <!-- 그리드 영역 -->
    <div class="grid-panel">
      <h3>조회 결과</h3>
      <!-- RealGrid 구현 예정 -->
    </div>
  </div>
</template>

<script setup>
import {{ ref, onMounted }} from 'vue'

// 스키마 로드
const schema = ref(null)

onMounted(async () => {{
  // 스키마 파일 로드
  const response = await fetch('/schemas/{screen_id}.json')
  schema.value = await response.json()
}})
</script>

<style lang="scss" scoped>
.screen-container {{
  padding: 20px;
}}

.page-header {{
  margin-bottom: 24px;
}}

.search-panel,
.grid-panel {{
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}}
</style>
'''
        return template
    
    def _generate_router_config(self, schema_data):
        """라우터 설정 코드 생성 (참고용)"""
        screen_id = schema_data.get('screenId', 'UNKNOWN')
        screen_name = schema_data.get('screenName', '화면명')
        
        config = f'''// {screen_name} 라우터 설정
// frontend/src/router/index.js 에 추가

{{
  path: '/screens/{screen_id.lower()}',
  name: '{screen_id}',
  component: () => import('@/views/generated/{screen_id}.vue'),
  meta: {{
    title: '{screen_name}',
    icon: 'bi-file-earmark-code'
  }}
}}
'''
        return config


    def _generate_java_controller(self, schema_data):
        """JSON 스키마를 분석하여 Controller 생성 (Improved)"""
        screen_id = schema_data.get('screenId', 'UNKNOWN')
        screen_name = schema_data.get('screenName', '화면명')
        package = schema_data.get('package', 'com.dowinsys.system')
        api_paths = schema_data.get('api', {})
        
        # API 경로에서 base path 추출 (/api/v1/cost/COST001/search -> /api/v1/cost)
        search_path = api_paths.get('search', '')
        parts = search_path.split('/')
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


    def _camel_to_snake(self, field_name):
        """camelCase를 snake_case로 변환"""
        import re
        s1 = re.sub('(.)([A-Z][a-z]+)', r'\1_\2', field_name)
        return re.sub('([a-z0-9])([A-Z])', r'\1_\2', s1).lower()

    def _generate_mybatis_mapper(self, schema_data):
        """JSON 스키마를 분석하여 MyBatis Mapper XML 생성 (Improved)"""
        screen_id = schema_data.get('screenId', 'UNKNOWN')
        package = schema_data.get('package', 'com.dowinsys.system')
        table_name = schema_data.get('tableName', 'unknown_table')
        grid_columns = schema_data.get('gridColumns', [])
        search_conditions = schema_data.get('searchConditions', [])
        
        # gridColumns에서 SELECT 절 생성
        select_fields = []
        for col in grid_columns:
            field_name = col.get('field', '')
            if field_name and field_name != 'actions':
                db_column = self._camel_to_snake(field_name)
                select_fields.append(f"        {db_column}")
        
        select_clause = ",\n".join(select_fields) if select_fields else "        *"
        
        # searchConditions에서 WHERE 절 생성
        where_conditions = []
        for cond in search_conditions:
            field = cond.get('field', cond.get('id', ''))  # field 또는 id 사용
            required = cond.get('required', False)
            
            if field:
                db_column = self._camel_to_snake(field)
                
                if required:
                    # 필수 조건: 직접 추가
                    where_conditions.append(f"        AND {db_column} = #{{{field}}}")
                else:
                    # 선택 조건: <if test> 태그 사용
                    where_conditions.append(f'''        <if test="{field} != null and {field} != ''">
            AND {db_column} = #{{{field}}}
        </if>''')
        
        where_clause = "\n".join(where_conditions) if where_conditions else "        <!-- 동적 조건 없음 -->"
        
        mapper = f'''<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">

<mapper namespace="{package}.{screen_id}Mapper">

    <!-- {screen_id} 조회 -->
    <select id="search" resultType="map">
        SELECT
{select_clause}
        FROM {table_name}
        WHERE 1=1
{where_clause}
        ORDER BY reg_dt DESC
    </select>

    <!-- {screen_id} 생성 -->
    <insert id="create" parameterType="map">
        INSERT INTO {table_name} (
{select_clause}
        ) VALUES (
{",\n".join([f"        #{{{col.get('field', '')}}}" for col in grid_columns if col.get('field') and col.get('field') != 'actions'])}
        )
    </insert>

    <!-- {screen_id} 수정 -->
    <update id="update" parameterType="map">
        UPDATE {table_name}
        SET
{",\n".join([f"            {self._camel_to_snake(col.get('field', ''))} = #{{{col.get('field', '')}}}" for col in grid_columns if col.get('field') and col.get('field') != 'actions'])}
        WHERE id = #{{id}}
    </update>

    <!-- {screen_id} 삭제 -->
    <delete id="delete" parameterType="string">
        DELETE FROM {table_name}
        WHERE id = #{{id}}
    </delete>

</mapper>
'''
        return mapper


def generate_code(pi_text):
    """
    편의 함수: PI 텍스트로부터 코드 생성
    
    Args:
        pi_text (str): PI 문서 텍스트
        
    Returns:
        list: 생성된 파일 정보 리스트
    """
    generator = CodeGenerator()
    return generator.generate_code(pi_text)


if __name__ == '__main__':
    # 테스트 코드
    sample_pi = """
화면명: 부서별 원가 조회
화면ID: COST002

[검색조건]
- 부서코드 (필수, 입력)
- 연도 (필수, 선택)
- 월 (선택, 선택)

[조회 결과]
- 부서코드
- 부서명
- 연도
- 월
- 예산금액
- 실제금액
- 차이금액
"""
    
    try:
        print("=" * 60)
        print("AI Factory Code Generator - Test")
        print("=" * 60)
        print("\n[PI 문서]")
        print(sample_pi)
        print("\n[코드 생성 중...]")
        
        files = generate_code(sample_pi)
        
        print(f"\n✅ {len(files)}개 파일 생성 완료!\n")
        
        for file_info in files:
            print(f"📄 {file_info['path']}")
            print(f"   파일명: {file_info['filename']}")
            print(f"   크기: {len(file_info['code'])} bytes")
            print()
        
        # 첫 번째 파일(스키마) 내용 출력
        print("\n[생성된 스키마 미리보기]")
        print("=" * 60)
        print(files[0]['code'])
        print("=" * 60)
        
    except Exception as e:
        print(f"\n❌ 오류 발생: {e}")
