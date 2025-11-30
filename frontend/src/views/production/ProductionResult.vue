<template>
  <div class="productionresult-page">
    <!-- 페이지 헤더 -->
    <div class="page-header">
      <h2>생산 실적 관리</h2>
    </div>

    <!-- 검색 영역 -->
    <div class="search-area" v-if="searchConditions.length > 0">
      <el-form :inline="true" :model="searchForm" class="search-form">
        <el-form-item label="조회월">
          <el-input v-model="searchForm.searchMonth" placeholder="조회월 입력" clearable />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch" icon="Search">조회</el-button>
          <el-button @click="handleReset" icon="Refresh">초기화</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 버튼 영역 -->
    <div class="button-area">
      <el-button type="primary" icon="Search" @click="handleBtnsearch">조회</el-button>
      <el-button type="success" icon="Plus">추가</el-button>
      <el-button type="danger" icon="Delete" @click="handleDelete">삭제</el-button>
      <el-button type="warning" icon="Upload">엑셀 업로드</el-button>
      <el-button type="info" icon="Download">엑셀 다운로드</el-button>
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
import { ref, reactive, onMounted } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import RealGrid from '@/components/RealGrid.vue';

export default {
  name: 'ProductionResult',
  components: {
    RealGrid
  },
  setup() {
    // ========== 상태 관리 ==========
    const gridRef = ref(null);
    const gridData = ref([]);
    
    // 검색 조건
    const searchForm = reactive({
      searchMonth: ''
    });

    // 페이징
    const pagination = reactive({
      currentPage: 1,
      pageSize: 20,
      total: 0
    });

    // 그리드 컬럼 정의
    const gridColumns = [
    {
      fieldName: '',
      header: '',
      dataType: 'text',
      width: 120,
      align: 'left',
      editable: false,
      required: false
    },
    {
      fieldName: '',
      header: '',
      dataType: 'text',
      width: 100,
      align: 'left',
      editable: false,
      required: false
    },
    {
      fieldName: '',
      header: '',
      dataType: 'text',
      width: 150,
      align: 'left',
      editable: false,
      required: false
    },
    {
      fieldName: '',
      header: '',
      dataType: 'text',
      width: 100,
      align: 'left',
      editable: false,
      required: false
    },
    {
      fieldName: '',
      header: '',
      dataType: 'text',
      width: 150,
      align: 'left',
      editable: false,
      required: false
    },
    {
      fieldName: '',
      header: '',
      dataType: 'text',
      width: 120,
      align: 'left',
      editable: false,
      required: false
    },
    {
      fieldName: '',
      header: '',
      dataType: 'text',
      width: 200,
      align: 'left',
      editable: false,
      required: false
    },
    {
      fieldName: '',
      header: '',
      dataType: 'text',
      width: 120,
      align: 'left',
      editable: true,
      required: false
    },
    {
      fieldName: '',
      header: '',
      dataType: 'text',
      width: 120,
      align: 'left',
      editable: true,
      required: false
    },
    {
      fieldName: '',
      header: '',
      dataType: 'text',
      width: 120,
      align: 'left',
      editable: true,
      required: false
    },
    {
      fieldName: '',
      header: '',
      dataType: 'text',
      width: 120,
      align: 'left',
      editable: false,
      required: false
    },
    {
      fieldName: '',
      header: '',
      dataType: 'text',
      width: 100,
      align: 'left',
      editable: false,
      required: false
    }
  ];

    // 검색 조건 메타데이터
    const searchConditions = [
  {
    "key": "searchMonth",
    "label": "조회월",
    "type": "month",
    "defaultValue": ""
  }
];

    // ========== API 호출 ==========
    const fetchList = async () => {
      // TODO: API 엔드포인트 설정
      console.log('목록 조회:', searchForm);
    };

    // ========== 이벤트 핸들러 ==========
    const handleSearch = async () => {
      try {
        await fetchList();
      } catch (error) {
        ElMessage.error('조회 중 오류가 발생했습니다.');
      }
    };

    const handleReset = () => {
      searchForm.searchMonth = '';
      handleSearch();
    };

    const handleBtnsearch = () => {
      console.log('btnSearch 버튼 클릭');
      handleSearch();
    };

    const handleDelete = async () => {
      try {
        // 선택된 행이 있는지 확인 (실제로는 gridRef에서 선택된 행 가져오기)
        await ElMessageBox.confirm(
          '선택한 데이터를 삭제하시겠습니까?',
          '삭제 확인',
          {
            confirmButtonText: '확인',
            cancelButtonText: '취소',
            type: 'warning',
          }
        );
        
        // 삭제 로직
        ElMessage.success('삭제가 완료되었습니다.');
        handleSearch(); // 목록 갱신
      } catch (error) {
        if (error !== 'cancel') {
          ElMessage.error('삭제 중 오류가 발생했습니다.');
        }
      }
    };

    const handleRowClick = (row) => {
      console.log('Row clicked:', row);
    };

    const handleCellEdit = ({ field, value }) => {
      console.log('Cell edited:', field, value);
    };

    const handleSizeChange = (size) => {
      pagination.pageSize = size;
      handleSearch();
    };

    const handleCurrentChange = (page) => {
      pagination.currentPage = page;
      handleSearch();
    };

    // ========== 라이프사이클 ==========
    onMounted(() => {
      handleSearch();
    });

    return {
      gridRef,
      gridData,
      searchForm,
      gridColumns,
      searchConditions,
      pagination,
      handleSearch,
      handleReset,
      handleBtnsearch,
      handleDelete,
      handleRowClick,
      handleCellEdit,
      handleSizeChange,
      handleCurrentChange
    };
  }
};
</script>

<style scoped lang="scss">
.productionresult-page {
  padding: 20px;
  
  .page-header {
    margin-bottom: 20px;
    
    h2 {
      font-size: 24px;
      font-weight: 600;
      color: #303133;
    }
  }
  
  .search-area {
    background: #f5f7fa;
    padding: 20px;
    border-radius: 4px;
    margin-bottom: 20px;
    
    .search-form {
      .el-form-item {
        margin-bottom: 10px;
      }
    }
  }
  
  .button-area {
    margin-bottom: 10px;
    text-align: right;
    
    .el-button {
      margin-left: 8px;
    }
  }
  
  .grid-area {
    height: 500px;
    margin-bottom: 20px;
  }
  
  .pagination-area {
    text-align: center;
  }
}
</style>
