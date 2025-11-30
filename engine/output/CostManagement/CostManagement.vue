<template>
  <div class="costmanagement-page">
    <!-- 페이지 헤더 -->
    <div class="page-header">
      <h2>원가 관리</h2>
    </div>

    <!-- 검색 영역 -->
    <div class="search-area" v-if="searchConditions.length > 0">
      <el-form :inline="true" :model="searchForm" class="search-form">
        <el-form-item label="기준년도(시작)">
          <el-input v-model="searchForm.baseYearFrom" placeholder="기준년도(시작) 입력" clearable />
        </el-form-item>
        <el-form-item label="기준년도(종료)">
          <el-input v-model="searchForm.baseYearTo" placeholder="기준년도(종료) 입력" clearable />
        </el-form-item>
        <el-form-item label="기준월">
          <el-select v-model="searchForm.baseMonth" placeholder="선택하세요" clearable>
              <el-option label="1월" value="01" />
              <el-option label="2월" value="02" />
              <el-option label="3월" value="03" />
              <el-option label="4월" value="04" />
              <el-option label="5월" value="05" />
              <el-option label="6월" value="06" />
              <el-option label="7월" value="07" />
              <el-option label="8월" value="08" />
              <el-option label="9월" value="09" />
              <el-option label="10월" value="10" />
              <el-option label="11월" value="11" />
              <el-option label="12월" value="12" />
          </el-select>
        </el-form-item>
        <el-form-item label="공장">
          <el-select v-model="searchForm.factoryCd" placeholder="선택하세요" clearable>
              <el-option label="본사공장" value="F001" />
              <el-option label="2공장" value="F002" />
              <el-option label="3공장" value="F003" />
          </el-select>
        </el-form-item>
        <el-form-item label="품목코드">
          <el-input v-model="searchForm.itemCd" placeholder="품목코드 입력" clearable />
        </el-form-item>
        <el-form-item label="품목명">
          <el-input v-model="searchForm.itemNm" placeholder="품목명 입력" clearable />
        </el-form-item>
        <el-form-item label="원가유형">
          <el-select v-model="searchForm.costType" placeholder="선택하세요" clearable>
              <el-option label="표준원가" value="STD" />
              <el-option label="실제원가" value="ACT" />
              <el-option label="견적원가" value="EST" />
          </el-select>
        </el-form-item>
        <el-form-item label="공급업체코드">
          <el-input v-model="searchForm.supplierCd" placeholder="공급업체코드 입력" clearable />
        </el-form-item>
        <el-form-item label="상태">
          <el-select v-model="searchForm.status" placeholder="선택하세요" clearable>
              <el-option label="임시저장" value="DRAFT" />
              <el-option label="활성" value="ACTIVE" />
              <el-option label="비활성" value="INACTIVE" />
          </el-select>
        </el-form-item>
        <el-form-item label="승인상태">
          <el-select v-model="searchForm.approvalStatus" placeholder="선택하세요" clearable>
              <el-option label="승인대기" value="PENDING" />
              <el-option label="승인완료" value="APPROVED" />
              <el-option label="반려" value="REJECTED" />
          </el-select>
        </el-form-item>
        <el-form-item label="유효시작일(부터)">
          <el-date-picker
            v-model="searchForm.validDateFrom"
            type="date"
            placeholder="날짜 선택"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>
        <el-form-item label="유효시작일(까지)">
          <el-date-picker
            v-model="searchForm.validDateTo"
            type="date"
            placeholder="날짜 선택"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch" icon="Search">조회</el-button>
          <el-button @click="handleReset" icon="Refresh">초기화</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 버튼 영역 -->
    <div class="button-area">
      <el-button type="primary" icon="bi-search" @click="handleBtnsearch">조회</el-button>
      <el-button type="secondary" icon="bi-arrow-clockwise" @click="handleBtnreset">초기화</el-button>
      <el-button type="success" icon="bi-plus-circle" @click="handleBtnadd">행 추가</el-button>
      <el-button type="danger" icon="bi-trash" @click="handleBtndelete">행 삭제</el-button>
      <el-button type="primary" icon="bi-save" @click="handleBtnsave">저장</el-button>
      <el-button type="info" icon="bi-check2-all" @click="handleBtnapprove">일괄 승인</el-button>
      <el-button type="warning" icon="bi-upload" @click="handleBtnexcelupload">Excel 업로드</el-button>
      <el-button type="success" icon="bi-download" @click="handleBtnexceldownload">Excel 다운로드</el-button>
      <el-button type="secondary" icon="bi-files" @click="handleBtncopy">복사</el-button>
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
import axios from 'axios';

export default {
  name: 'CostManagement',
  components: {
    RealGrid
  },
  setup() {
    // ========== 상태 관리 ==========
    const gridRef = ref(null);
    const gridData = ref([]);
    
    // 검색 조건
    const searchForm = reactive({
      baseYearFrom: '',
      baseYearTo: '',
      baseMonth: '',
      factoryCd: '',
      itemCd: '',
      itemNm: '',
      costType: '',
      supplierCd: '',
      status: '',
      approvalStatus: '',
      validDateFrom: '',
      validDateTo: ''
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
      fieldName: 'rowNum',
      header: 'No',
      dataType: 'text',
      width: 50,
      align: 'left',
      editable: false,
      required: false
    },
    {
      fieldName: 'costId',
      header: '원가ID',
      dataType: 'text',
      width: 100,
      align: 'left',
      editable: false,
      required: false
    },
    {
      fieldName: 'factoryCd',
      header: '공장코드',
      dataType: 'text',
      width: 80,
      align: 'left',
      editable: true,
      required: false
    },
    {
      fieldName: 'factoryNm',
      header: '공장명',
      dataType: 'text',
      width: 120,
      align: 'left',
      editable: false,
      required: false
    },
    {
      fieldName: 'itemCd',
      header: '품목코드',
      dataType: 'text',
      width: 100,
      align: 'left',
      editable: true,
      required: false
    },
    {
      fieldName: 'itemNm',
      header: '품목명',
      dataType: 'text',
      width: 200,
      align: 'left',
      editable: false,
      required: false
    },
    {
      fieldName: 'itemSpec',
      header: '규격',
      dataType: 'text',
      width: 150,
      align: 'left',
      editable: true,
      required: false
    },
    {
      fieldName: 'unit',
      header: '단위',
      dataType: 'text',
      width: 60,
      align: 'left',
      editable: true,
      required: false
    },
    {
      fieldName: 'costType',
      header: '원가유형',
      dataType: 'text',
      width: 100,
      align: 'left',
      editable: true,
      required: false
    },
    {
      fieldName: 'baseYear',
      header: '기준년도',
      dataType: 'text',
      width: 80,
      align: 'left',
      editable: true,
      required: false
    },
    {
      fieldName: 'baseMonth',
      header: '기준월',
      dataType: 'text',
      width: 70,
      align: 'left',
      editable: true,
      required: false
    },
    {
      fieldName: 'materialCost',
      header: '재료비',
      dataType: 'text',
      width: 100,
      align: 'left',
      editable: true,
      required: false
    },
    {
      fieldName: 'laborCost',
      header: '노무비',
      dataType: 'text',
      width: 100,
      align: 'left',
      editable: true,
      required: false
    },
    {
      fieldName: 'overheadCost',
      header: '경비',
      dataType: 'text',
      width: 100,
      align: 'left',
      editable: true,
      required: false
    },
    {
      fieldName: 'totalCost',
      header: '총원가',
      dataType: 'text',
      width: 120,
      align: 'left',
      editable: false,
      required: false
    },
    {
      fieldName: 'profitRate',
      header: '이익률(%)',
      dataType: 'text',
      width: 90,
      align: 'left',
      editable: true,
      required: false
    },
    {
      fieldName: 'sellingPrice',
      header: '판매가',
      dataType: 'text',
      width: 120,
      align: 'left',
      editable: true,
      required: false
    },
    {
      fieldName: 'currency',
      header: '통화',
      dataType: 'text',
      width: 70,
      align: 'left',
      editable: true,
      required: false
    },
    {
      fieldName: 'exchangeRate',
      header: '환율',
      dataType: 'text',
      width: 100,
      align: 'left',
      editable: true,
      required: false
    },
    {
      fieldName: 'supplierCd',
      header: '공급업체코드',
      dataType: 'text',
      width: 100,
      align: 'left',
      editable: true,
      required: false
    },
    {
      fieldName: 'supplierNm',
      header: '공급업체명',
      dataType: 'text',
      width: 150,
      align: 'left',
      editable: false,
      required: false
    },
    {
      fieldName: 'validFrom',
      header: '유효시작일',
      dataType: 'text',
      width: 100,
      align: 'left',
      editable: true,
      required: false
    },
    {
      fieldName: 'validTo',
      header: '유효종료일',
      dataType: 'text',
      width: 100,
      align: 'left',
      editable: true,
      required: false
    },
    {
      fieldName: 'status',
      header: '상태',
      dataType: 'text',
      width: 80,
      align: 'left',
      editable: true,
      required: false
    },
    {
      fieldName: 'approvalStatus',
      header: '승인상태',
      dataType: 'text',
      width: 80,
      align: 'left',
      editable: false,
      required: false
    },
    {
      fieldName: 'approvalDate',
      header: '승인일자',
      dataType: 'text',
      width: 140,
      align: 'left',
      editable: false,
      required: false
    },
    {
      fieldName: 'approvalUser',
      header: '승인자',
      dataType: 'text',
      width: 100,
      align: 'left',
      editable: false,
      required: false
    },
    {
      fieldName: 'remark',
      header: '비고',
      dataType: 'text',
      width: 200,
      align: 'left',
      editable: true,
      required: false
    },
    {
      fieldName: 'createDate',
      header: '생성일시',
      dataType: 'text',
      width: 140,
      align: 'left',
      editable: false,
      required: false
    },
    {
      fieldName: 'createUser',
      header: '생성자',
      dataType: 'text',
      width: 100,
      align: 'left',
      editable: false,
      required: false
    },
    {
      fieldName: 'updateDate',
      header: '수정일시',
      dataType: 'text',
      width: 140,
      align: 'left',
      editable: false,
      required: false
    },
    {
      fieldName: 'updateUser',
      header: '수정자',
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
    "key": "baseYearFrom",
    "label": "기준년도(시작)",
    "type": "text"
  },
  {
    "key": "baseYearTo",
    "label": "기준년도(종료)",
    "type": "text"
  },
  {
    "key": "baseMonth",
    "label": "기준월",
    "type": "select",
    "options": [
      {
        "value": "01",
        "label": "1월"
      },
      {
        "value": "02",
        "label": "2월"
      },
      {
        "value": "03",
        "label": "3월"
      },
      {
        "value": "04",
        "label": "4월"
      },
      {
        "value": "05",
        "label": "5월"
      },
      {
        "value": "06",
        "label": "6월"
      },
      {
        "value": "07",
        "label": "7월"
      },
      {
        "value": "08",
        "label": "8월"
      },
      {
        "value": "09",
        "label": "9월"
      },
      {
        "value": "10",
        "label": "10월"
      },
      {
        "value": "11",
        "label": "11월"
      },
      {
        "value": "12",
        "label": "12월"
      }
    ]
  },
  {
    "key": "factoryCd",
    "label": "공장",
    "type": "select",
    "options": [
      {
        "value": "F001",
        "label": "본사공장"
      },
      {
        "value": "F002",
        "label": "2공장"
      },
      {
        "value": "F003",
        "label": "3공장"
      }
    ]
  },
  {
    "key": "itemCd",
    "label": "품목코드",
    "type": "text"
  },
  {
    "key": "itemNm",
    "label": "품목명",
    "type": "text"
  },
  {
    "key": "costType",
    "label": "원가유형",
    "type": "select",
    "options": [
      {
        "value": "STD",
        "label": "표준원가"
      },
      {
        "value": "ACT",
        "label": "실제원가"
      },
      {
        "value": "EST",
        "label": "견적원가"
      }
    ]
  },
  {
    "key": "supplierCd",
    "label": "공급업체코드",
    "type": "text"
  },
  {
    "key": "status",
    "label": "상태",
    "type": "select",
    "options": [
      {
        "value": "DRAFT",
        "label": "임시저장"
      },
      {
        "value": "ACTIVE",
        "label": "활성"
      },
      {
        "value": "INACTIVE",
        "label": "비활성"
      }
    ]
  },
  {
    "key": "approvalStatus",
    "label": "승인상태",
    "type": "select",
    "options": [
      {
        "value": "PENDING",
        "label": "승인대기"
      },
      {
        "value": "APPROVED",
        "label": "승인완료"
      },
      {
        "value": "REJECTED",
        "label": "반려"
      }
    ]
  },
  {
    "key": "validDateFrom",
    "label": "유효시작일(부터)",
    "type": "date"
  },
  {
    "key": "validDateTo",
    "label": "유효시작일(까지)",
    "type": "date"
  }
];

    // ========== API 호출 ==========
    const fetchList = async () => {
      try {
        const response = await axios.get('/api/cost/management/list', {
          params: {
            ...searchForm,
            page: pagination.currentPage,
            size: pagination.pageSize
          }
        });
        
        gridData.value = response.data.data || [];
        pagination.total = response.data.total || 0;
      } catch (error) {
        console.error('목록 조회 실패:', error);
        throw error;
      }
    };

    const saveData = async (data) => {
      try {
        await axios.post('/api/cost/management/save', data);
        ElMessage.success('저장되었습니다.');
        await fetchList();
      } catch (error) {
        console.error('저장 실패:', error);
        throw error;
      }
    };

    const deleteData = async (ids) => {
      try {
        await axios.delete('/api/cost/management/delete', { data: { ids } });
        ElMessage.success('삭제되었습니다.');
        await fetchList();
      } catch (error) {
        console.error('삭제 실패:', error);
        throw error;
      }
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
      searchForm.baseYearFrom = '';
      searchForm.baseYearTo = '';
      searchForm.baseMonth = '';
      searchForm.factoryCd = '';
      searchForm.itemCd = '';
      searchForm.itemNm = '';
      searchForm.costType = '';
      searchForm.supplierCd = '';
      searchForm.status = '';
      searchForm.approvalStatus = '';
      searchForm.validDateFrom = '';
      searchForm.validDateTo = '';
      handleSearch();
    };

    const handleBtnsearch = () => {
      console.log('btnSearch 버튼 클릭');
      // TODO: search 액션 구현
    };

    const handleBtnreset = () => {
      console.log('btnReset 버튼 클릭');
      // TODO: reset 액션 구현
    };

    const handleBtnadd = () => {
      // 새 행 추가
      const newRow = {};
      gridData.value.unshift(newRow);
      ElMessage.info('새 행이 추가되었습니다.');
    };

    const handleBtndelete = async () => {
      const selectedRows = gridRef.value?.getSelectedRows() || [];
      if (selectedRows.length === 0) {
        ElMessage.warning('삭제할 행을 선택하세요.');
        return;
      }
      
      try {
        await ElMessageBox.confirm(
          '선택한 행을 삭제하시겠습니까?',
          '삭제 확인',
          { type: 'warning' }
        );
        
        await deleteData(selectedRows.map(r => r.id));
      } catch (error) {
        if (error !== 'cancel') {
          ElMessage.error('삭제 중 오류가 발생했습니다.');
        }
      }
    };

    const handleBtnsave = async () => {
      try {
        await ElMessageBox.confirm(
          '저장하시겠습니까?',
          '저장 확인',
          { type: 'info' }
        );
        
        const allData = gridRef.value?.getAllData() || [];
        await saveData(allData);
      } catch (error) {
        if (error !== 'cancel') {
          ElMessage.error('저장 중 오류가 발생했습니다.');
        }
      }
    };

    const handleBtnapprove = () => {
      console.log('btnApprove 버튼 클릭');
      // TODO: approve 액션 구현
    };

    const handleBtnexcelupload = () => {
      // Excel 업로드
      gridRef.value?.importFromExcel();
    };

    const handleBtnexceldownload = () => {
      // Excel 다운로드
      gridRef.value?.exportToExcel('원가 관리.xlsx');
      ElMessage.success('Excel 파일이 다운로드되었습니다.');
    };

    const handleBtncopy = () => {
      console.log('btnCopy 버튼 클릭');
      // TODO: copy 액션 구현
    };

    const handleRowClick = (row) => {
      console.log('Row clicked:', row);
    };

    const handleCellEdit = ({ row, field, value }) => {
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
      handleBtnreset,
      handleBtnadd,
      handleBtndelete,
      handleBtnsave,
      handleBtnapprove,
      handleBtnexcelupload,
      handleBtnexceldownload,
      handleBtncopy
      handleRowClick,
      handleCellEdit,
      handleSizeChange,
      handleCurrentChange
    };
  }
};
</script>

<style scoped lang="scss">
.costmanagement-page {
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
