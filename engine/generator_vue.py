#!/usr/bin/env python3
"""
Vue 컴포넌트 생성기 (템플릿 기반)
JSON Schema를 읽어서 Vue 파일을 생성합니다.
"""

import json
import sys
from pathlib import Path

class VueGenerator:
    def __init__(self, json_path: str, output_path: str):
        self.json_path = Path(json_path)
        self.output_path = Path(output_path)
        
        # JSON Schema 로드
        with open(self.json_path, 'r', encoding='utf-8') as f:
            self.schema = json.load(f)
        
        # pageInfo에서 정보 추출 (nested 구조 지원)
        page_info = self.schema.get('pageInfo', {})
        self.page_id = page_info.get('pageId', self.schema.get('pageId', 'Unknown'))
        self.page_title = page_info.get('pageTitle', self.schema.get('pageTitle', 'Unknown'))
    
    def generate(self):
        """Vue 컴포넌트 생성"""
        print(f"🎨 Vue 컴포넌트 생성: {self.page_id}.vue")
        
        vue_content = self._generate_template()
        
        # 파일 저장
        self.output_path.parent.mkdir(parents=True, exist_ok=True)
        with open(self.output_path, 'w', encoding='utf-8') as f:
            f.write(vue_content)
        
        print(f"✅ Vue 파일 생성 완료: {self.output_path}")
    
    def _generate_template(self) -> str:
        """Vue 템플릿 생성"""
        return f'''<template>
  <div class="{self.page_id.lower()}-page">
    <!-- 페이지 헤더 -->
    <div class="page-header">
      <h2>{self.page_title}</h2>
    </div>

    <!-- 검색 영역 -->
    <div class="search-area" v-if="searchConditions.length > 0">
      <el-form :inline="true" :model="searchForm" class="search-form">
{self._generate_search_fields()}
        <el-form-item>
          <el-button type="primary" @click="handleSearch" icon="Search">조회</el-button>
          <el-button @click="handleReset" icon="Refresh">초기화</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 버튼 영역 -->
    <div class="button-area">
{self._generate_buttons()}
    </div>

    <!-- 그리드 영역 -->
    <div class="grid-area">
      <RealGrid
        ref="gridRef"
        :columns="gridColumns"
        :data="gridData"
        :editable="true"
        @row-click="handleRowClick"
        @cell-edit="handleCellEdit"
      />
    </div>

    <!-- 페이징 -->
    <div class="pagination-area">
      <el-pagination
        v-model:current-page="pagination.currentPage"
        v-model:page-size="pagination.pageSize"
        :page-sizes="[10, 20, 50, 100]"
        :total="pagination.total"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import {{ ref, reactive, onMounted }} from 'vue';
import {{ ElMessage, ElMessageBox }} from 'element-plus';
import RealGrid from '@/components/RealGrid.vue';
import axios from 'axios';

export default {{
  name: '{self.page_id}',
  components: {{
    RealGrid
  }},
  setup() {{
    // ========== 상태 관리 ==========
    const gridRef = ref(null);
    const gridData = ref([]);
    
    // 검색 조건
    const searchForm = reactive({{
{self._generate_search_form_data()}
    }});

    // 페이징
    const pagination = reactive({{
      currentPage: 1,
      pageSize: 20,
      total: 0
    }});

    // 그리드 컬럼 정의
    const gridColumns = {self._generate_grid_columns()};

    // 검색 조건 메타데이터
    const searchConditions = {self._generate_search_metadata()};

    // ========== API 호출 ==========
{self._generate_api_methods()}

    // ========== 이벤트 핸들러 ==========
    const handleSearch = async () => {{
      try {{
        await fetchList();
      }} catch (error) {{
        ElMessage.error('조회 중 오류가 발생했습니다.');
      }}
    }};

    const handleReset = () => {{
{self._generate_reset_logic()}
      handleSearch();
    }};

{self._generate_button_handlers()}

    const handleRowClick = (row) => {{
      console.log('Row clicked:', row);
    }};

    const handleCellEdit = ({{ row, field, value }}) => {{
      console.log('Cell edited:', field, value);
    }};

    const handleSizeChange = (size) => {{
      pagination.pageSize = size;
      handleSearch();
    }};

    const handleCurrentChange = (page) => {{
      pagination.currentPage = page;
      handleSearch();
    }};

    // ========== 라이프사이클 ==========
    onMounted(() => {{
      handleSearch();
    }});

    return {{
      gridRef,
      gridData,
      searchForm,
      gridColumns,
      searchConditions,
      pagination,
      handleSearch,
      handleReset,
{self._generate_button_exports()}
      handleRowClick,
      handleCellEdit,
      handleSizeChange,
      handleCurrentChange
    }};
  }}
}};
</script>

<style scoped lang="scss">
.{self.page_id.lower()}-page {{
  padding: 20px;
  
  .page-header {{
    margin-bottom: 20px;
    
    h2 {{
      font-size: 24px;
      font-weight: 600;
      color: #303133;
    }}
  }}
  
  .search-area {{
    background: #f5f7fa;
    padding: 20px;
    border-radius: 4px;
    margin-bottom: 20px;
    
    .search-form {{
      .el-form-item {{
        margin-bottom: 10px;
      }}
    }}
  }}
  
  .button-area {{
    margin-bottom: 10px;
    text-align: right;
    
    .el-button {{
      margin-left: 8px;
    }}
  }}
  
  .grid-area {{
    height: 500px;
    margin-bottom: 20px;
  }}
  
  .pagination-area {{
    text-align: center;
  }}
}}
</style>
'''

    def _generate_search_fields(self) -> str:
        """검색 필드 HTML 생성"""
        search_conditions = self.schema.get('searchConditions', [])
        if not search_conditions:
            return ""
        
        fields = []
        for condition in search_conditions:
            field_type = condition.get('type', 'text')
            key = condition.get('key', '')
            label = condition.get('label', '')
            
            if field_type == 'select':
                options = condition.get('options', [])
                options_html = ''.join([
                    f'\n              <el-option label="{opt.get("label", opt)}" value="{opt.get("value", opt)}" />'
                    if isinstance(opt, dict) else
                    f'\n              <el-option label="{opt}" value="{opt}" />'
                    for opt in options
                ])
                fields.append(f'''        <el-form-item label="{label}">
          <el-select v-model="searchForm.{key}" placeholder="선택하세요" clearable>{options_html}
          </el-select>
        </el-form-item>''')
            elif field_type == 'date':
                fields.append(f'''        <el-form-item label="{label}">
          <el-date-picker
            v-model="searchForm.{key}"
            type="date"
            placeholder="날짜 선택"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>''')
            elif field_type == 'daterange':
                fields.append(f'''        <el-form-item label="{label}">
          <el-date-picker
            v-model="searchForm.{key}"
            type="daterange"
            range-separator="~"
            start-placeholder="시작일"
            end-placeholder="종료일"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>''')
            else:
                placeholder = condition.get('placeholder', f'{label} 입력')
                fields.append(f'''        <el-form-item label="{label}">
          <el-input v-model="searchForm.{key}" placeholder="{placeholder}" clearable />
        </el-form-item>''')
        
        return '\n'.join(fields)

    def _generate_search_form_data(self) -> str:
        """검색 폼 초기 데이터 생성"""
        search_conditions = self.schema.get('searchConditions', [])
        if not search_conditions:
            return ""
        
        data_items = []
        for condition in search_conditions:
            key = condition.get('key', '')
            default_value = condition.get('defaultValue', '')
            field_type = condition.get('type', 'text')
            
            if field_type == 'daterange':
                data_items.append(f"      {key}: []")
            elif default_value:
                data_items.append(f"      {key}: '{default_value}'")
            else:
                data_items.append(f"      {key}: ''")
        
        return ',\n'.join(data_items)

    def _generate_grid_columns(self) -> str:
        """그리드 컬럼 정의 생성"""
        columns = self.schema.get('gridColumns', [])
        if not columns:
            return "[]"
        
        column_items = []
        for col in columns:
            field_name = col.get('fieldName', '')
            header = col.get('header', '')
            data_type = col.get('dataType', 'text')
            width = col.get('width', 100)
            align = col.get('align', 'left')
            editable = col.get('editable', False)
            required = col.get('required', False)
            
            column_def = f'''{{
      fieldName: '{field_name}',
      header: '{header}',
      dataType: '{data_type}',
      width: {width},
      align: '{align}',
      editable: {str(editable).lower()},
      required: {str(required).lower()}
    }}'''
            column_items.append(column_def)
        
        return '[\n    ' + ',\n    '.join(column_items) + '\n  ]'

    def _generate_search_metadata(self) -> str:
        """검색 조건 메타데이터 생성"""
        search_conditions = self.schema.get('searchConditions', [])
        return json.dumps(search_conditions, ensure_ascii=False, indent=2)

    def _generate_buttons(self) -> str:
        """버튼 HTML 생성"""
        buttons = self.schema.get('buttons', [])
        if not buttons:
            return ""
        
        button_items = []
        for btn in buttons:
            btn_id = btn.get('id', '')
            label = btn.get('label', '')
            btn_type = btn.get('type', 'default')
            icon = btn.get('icon', '')
            
            # 타입 매핑
            el_type = 'primary' if btn_type in ['primary', 'search'] else btn_type
            if btn_type == 'danger':
                el_type = 'danger'
            elif btn_type == 'success':
                el_type = 'success'
            
            icon_attr = f' icon="{icon}"' if icon else ''
            
            button_items.append(
                f'      <el-button type="{el_type}"{icon_attr} @click="handle{btn_id.capitalize()}">{label}</el-button>'
            )
        
        return '\n'.join(button_items)

    def _generate_api_methods(self) -> str:
        """API 호출 메소드 생성"""
        apis = self.schema.get('api', {})
        # tableName은 pageInfo 또는 루트에서 찾기
        page_info = self.schema.get('pageInfo', {})
        table_name = page_info.get('tableName', self.schema.get('tableName', self.page_id.lower()))
        
        methods = []
        
        # 목록 조회 API
        if 'search' in apis or 'list' in apis or 'query' in apis:
            endpoint = apis.get('search', apis.get('list', apis.get('query', f'/api/{table_name}/list')))
            methods.append(f'''    const fetchList = async () => {{
      try {{
        const response = await axios.get('{endpoint}', {{
          params: {{
            ...searchForm,
            page: pagination.currentPage,
            size: pagination.pageSize
          }}
        }});
        
        gridData.value = response.data.data || [];
        pagination.total = response.data.total || 0;
      }} catch (error) {{
        console.error('목록 조회 실패:', error);
        throw error;
      }}
    }};''')
        else:
            methods.append(f'''    const fetchList = async () => {{
      // TODO: API 엔드포인트 설정
      console.log('목록 조회:', searchForm);
    }};''')
        
        # 저장 API
        if 'save' in apis or 'update' in apis:
            endpoint = apis.get('save', apis.get('update', f'/api/{table_name}/save'))
            methods.append(f'''
    const saveData = async (data) => {{
      try {{
        await axios.post('{endpoint}', data);
        ElMessage.success('저장되었습니다.');
        await fetchList();
      }} catch (error) {{
        console.error('저장 실패:', error);
        throw error;
      }}
    }};''')
        
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
        
        return '\n'.join(methods)

    def _generate_button_handlers(self) -> str:
        """버튼 핸들러 메소드 생성"""
        buttons = self.schema.get('buttons', [])
        handlers = []
        
        for btn in buttons:
            btn_id = btn.get('id', '')
            action = btn.get('action', '')
            confirm_msg = btn.get('confirmMessage', '')
            
            handler_name = f"handle{btn_id.capitalize()}"
            
            if action == 'add':
                handlers.append(f'''    const {handler_name} = () => {{
      // 새 행 추가
      const newRow = {{}};
      gridData.value.unshift(newRow);
      ElMessage.info('새 행이 추가되었습니다.');
    }};''')
            elif action == 'delete':
                handlers.append(f'''    const {handler_name} = async () => {{
      const selectedRows = gridRef.value?.getSelectedRows() || [];
      if (selectedRows.length === 0) {{
        ElMessage.warning('삭제할 행을 선택하세요.');
        return;
      }}
      
      try {{
        await ElMessageBox.confirm(
          '{confirm_msg or "선택한 항목을 삭제하시겠습니까?"}',
          '삭제 확인',
          {{ type: 'warning' }}
        );
        
        await deleteData(selectedRows.map(r => r.id));
      }} catch (error) {{
        if (error !== 'cancel') {{
          ElMessage.error('삭제 중 오류가 발생했습니다.');
        }}
      }}
    }};''')
            elif action == 'save':
                handlers.append(f'''    const {handler_name} = async () => {{
      try {{
        await ElMessageBox.confirm(
          '{confirm_msg or "저장하시겠습니까?"}',
          '저장 확인',
          {{ type: 'info' }}
        );
        
        const allData = gridRef.value?.getAllData() || [];
        await saveData(allData);
      }} catch (error) {{
        if (error !== 'cancel') {{
          ElMessage.error('저장 중 오류가 발생했습니다.');
        }}
      }}
    }};''')
            elif action == 'excelDownload':
                handlers.append(f'''    const {handler_name} = () => {{
      // Excel 다운로드
      gridRef.value?.exportToExcel('{self.page_title}.xlsx');
      ElMessage.success('Excel 파일이 다운로드되었습니다.');
    }};''')
            elif action == 'excelUpload':
                handlers.append(f'''    const {handler_name} = () => {{
      // Excel 업로드
      gridRef.value?.importFromExcel();
    }};''')
            else:
                handlers.append(f'''    const {handler_name} = () => {{
      console.log('{btn_id} 버튼 클릭');
      // TODO: {action or btn_id} 액션 구현
    }};''')
        
        return '\n\n'.join(handlers)

    def _generate_button_exports(self) -> str:
        """버튼 핸들러 export 목록 생성"""
        buttons = self.schema.get('buttons', [])
        exports = [f"      handle{btn.get('id', '').capitalize()}" for btn in buttons]
        return ',\n'.join(exports)

    def _generate_reset_logic(self) -> str:
        """초기화 로직 생성"""
        search_conditions = self.schema.get('searchConditions', [])
        reset_lines = []
        
        for condition in search_conditions:
            key = condition.get('key', '')
            field_type = condition.get('type', 'text')
            
            if field_type == 'daterange':
                reset_lines.append(f"      searchForm.{key} = [];")
            else:
                reset_lines.append(f"      searchForm.{key} = '';")
        
        return '\n'.join(reset_lines) if reset_lines else "      // 검색 조건 초기화"


def main():
    if len(sys.argv) < 3:
        print("사용법: python generator_vue.py <JSON파일> <출력파일>")
        sys.exit(1)
    
    json_path = sys.argv[1]
    output_path = sys.argv[2]
    
    generator = VueGenerator(json_path, output_path)
    generator.generate()


if __name__ == '__main__':
    main()
