<template>
  <div class="standard-page-container">
    <!-- 페이지 헤더 -->
    <div class="page-header">
      <h1 class="page-title">
        <i class="bi bi-file-earmark-code"></i>
        {{ schemaData?.screenName || schemaId }}
      </h1>
    </div>

    <!-- 로딩 상태 -->
    <div v-if="loading" class="loading-box">
      <i class="bi bi-hourglass-split"></i>
      <span>스키마 로딩 중...</span>
    </div>

    <!-- 에러 상태 -->
    <div v-if="error" class="error-box">
      <i class="bi bi-exclamation-triangle"></i>
      <div class="error-content">
        <strong>스키마 로드 실패</strong>
        <p>{{ error }}</p>
      </div>
    </div>

    <!-- 메인 컨텐츠 -->
    <div v-if="schemaData && !loading && !error">
      <!-- 검색 조건 카드 -->
      <div class="search-card">
        <div class="card-body">
          <div class="search-form-inline">
            <div 
              v-for="condition in schemaData.searchConditions" 
              :key="condition.id"
              class="form-group-inline"
            >
              <label :for="condition.id" class="form-label-inline">
                {{ condition.label }}
                <span v-if="condition.required" class="required-mark">*</span>
              </label>
              
              <!-- Text 타입 -->
              <input
                v-if="condition.type === 'text'"
                :id="condition.id"
                type="text"
                class="form-control form-control-sm"
                v-model="searchParams[condition.id]"
                :placeholder="condition.label"
              />
              
              <!-- Date 타입 -->
              <input
                v-else-if="condition.type === 'date'"
                :id="condition.id"
                type="month"
                class="form-control form-control-sm"
                v-model="searchParams[condition.id]"
              />
              
              <!-- Select 타입 -->
              <select
                v-else-if="condition.type === 'select'"
                :id="condition.id"
                class="form-select form-select-sm"
                v-model="searchParams[condition.id]"
              >
                <option value="">전체</option>
                <option 
                  v-for="opt in condition.options" 
                  :key="opt.value"
                  :value="opt.value"
                >
                  {{ opt.label }}
                </option>
              </select>
            </div>
            
            <!-- 검색 버튼 영역 -->
            <div class="button-group-inline">
              <button class="btn btn-primary btn-sm" @click="handleSearch">
                <i class="bi bi-search"></i>
                조회
              </button>
              <button class="btn btn-success btn-sm" @click="handleExport">
                <i class="bi bi-download"></i>
                엑셀 다운로드
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 조회 결과 그리드 -->
      <div class="grid-card">
        <div class="card-body grid-container" style="height: 600px; overflow: hidden;">
          <!-- RealGrid 컴포넌트 - props로 설정 전달 -->
          <RealGrid 
            v-if="!loading && schemaData && mainGridConfig.fields.length > 0"
            ref="mainGrid" 
            :fields="mainGridConfig.fields"
            :columns="mainGridConfig.columns"
            :options="mainGridConfig.options"
            :rows="gridData"
            :key="'grid-' + schemaId"
            style="width: 100%; height: 100%;"
          />
          <div v-else-if="loading" class="no-grid-message">
            <i class="bi bi-hourglass-split"></i>
            <p>로딩 중...</p>
          </div>
          <div v-else-if="!schemaData" class="no-grid-message">
            <i class="bi bi-exclamation-circle"></i>
            <p>스키마 데이터가 없습니다</p>
          </div>
          <div v-else class="no-grid-message">
            <i class="bi bi-exclamation-circle"></i>
            <p>그리드 설정이 초기화되지 않았습니다</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StandardPage',
  props: {
    schemaId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      schemaData: null,
      loading: true,
      error: null,
      searchParams: {},
      gridData: [],
      // RealGrid 설정 객체
      mainGridConfig: {
        fields: [],
        columns: [],
        options: {
          edit: {
            editable: false
          },
          display: {
            rowHeight: 36,
            fitStyle: 'fill' // 그리드 전체 너비를 채우도록 설정
          },
          panel: {
            visible: true
          },
          footer: {
            visible: false
          },
          checkBar: {
            visible: true
          },
          stateBar: {
            visible: true
          },
          header: {
            height: 40
          }
        }
      }
    }
  },
  mounted() {
    this.loadSchema()
  },
  methods: {
    // 스네이크 케이스 → 카멜 케이스 자동 변환 (범용)
    snakeToCamel(data) {
      if (Array.isArray(data)) {
        return data.map(item => this.snakeToCamel(item))
      }
      if (data !== null && typeof data === 'object') {
        return Object.keys(data).reduce((result, key) => {
          const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase())
          result[camelKey] = this.snakeToCamel(data[key])
          return result
        }, {})
      }
      return data
    },
    
    // 스키마 로딩
    async loadSchema() {
      try {
        this.loading = true
        this.error = null
        
        const response = await fetch(`/schemas/${this.schemaId}.json`)
        if (!response.ok) {
          throw new Error(`스키마 파일을 찾을 수 없습니다: ${this.schemaId}.json`)
        }
        
        const data = await response.json()
        this.schemaData = data
        
        // 검색 조건 초기값 설정
        data.searchConditions.forEach(condition => {
          this.searchParams[condition.id] = condition.defaultValue || ''
        })
        
        // RealGrid 설정
        this.initGridConfig(data.gridColumns)
        
        console.log('✅ 스키마 로드 완료:', data)
        
        // DOM이 렌더링된 후 그리드 재초기화 보장
        await this.$nextTick()
        console.log('✅ DOM 렌더링 완료, 그리드 준비됨')
        
      } catch (err) {
        this.error = err.message
        console.error('Schema loading error:', err)
      } finally {
        this.loading = false
      }
    },
    
    // RealGrid 설정 초기화
    initGridConfig(columns) {
      console.log('🔧 RealGrid 설정 초기화 시작:', columns)
      
      // Fields 설정
      this.mainGridConfig.fields = columns.map(col => ({
        fieldName: col.field,
        dataType: col.dataType === 'number' ? 'number' : 'text'
      }))
      
      // Columns 설정 - 모든 컬럼에 동일한 비율로 fillWidth 적용
      const totalWidth = columns.reduce((sum, col) => sum + col.width, 0)
      
      this.mainGridConfig.columns = columns.map(col => ({
        name: col.field,
        fieldName: col.field,
        header: { text: col.header },
        width: col.width,
        fillWidth: col.width / totalWidth, // 원래 너비 비율대로 공간 분배
        styles: { 
          textAlignment: col.align,
          numberFormat: col.format || undefined
        }
      }))
      
      console.log('✅ RealGrid 설정 완료:', {
        fields: this.mainGridConfig.fields,
        columns: this.mainGridConfig.columns
      })
    },
    
    // 검색 실행
    async handleSearch() {
      try {
        console.log('🔍 검색 조건:', this.searchParams)
        
        // 날짜 형식 변환 (YYYY-MM -> YYYYMM)
        const params = { ...this.searchParams }
        if (params.baseYm) {
          params.baseYm = params.baseYm.replace('-', '')
        }
        
        console.log('📤 전송 파라미터:', params)
        
        const response = await fetch(`http://localhost:8080${this.schemaData.api.search}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(params)
        })
        
        if (!response.ok) {
          throw new Error('API 호출 실패')
        }
        
        const result = await response.json()
        console.log('📊 조회 결과 (원본):', result)
        console.log('📊 result 타입:', Array.isArray(result) ? 'Array' : 'Object')
        
        // 백엔드에서 온 데이터 (스네이크 케이스)를 카멜 케이스로 자동 변환
        const rawData = Array.isArray(result) ? result : (result.data || [])
        this.gridData = this.snakeToCamel(rawData)
        
        console.log('✅ gridData 설정 완료:', this.gridData.length, '건')
        if (this.gridData.length > 0) {
          console.log('📋 변환된 데이터 샘플:', this.gridData[0])
        }
        
      } catch (err) {
        console.error('Search error:', err)
        alert('조회 중 오류가 발생했습니다: ' + err.message)
      }
    },
    
    // 초기화
    handleReset() {
      this.schemaData.searchConditions.forEach(condition => {
        this.searchParams[condition.id] = condition.defaultValue || ''
      })
      
      this.gridData = []
    },
    
    // 엑셀 다운로드
    handleExport() {
      if (this.$refs.mainGrid) {
        const gridView = this.$refs.mainGrid.getGridView()
        if (gridView) {
          gridView.exportGrid({
            type: 'excel',
            target: 'local',
            fileName: `${this.schemaId}_${new Date().getTime()}.xlsx`
          })
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.standard-page-container {
  padding: 20px;

  .page-header {
    margin-bottom: 16px;

    .page-title {
      font-size: 20px;
      font-weight: 600;
      color: #303133;
      margin: 0;
      display: flex;
      align-items: center;

      i {
        margin-right: 8px;
        color: #1890ff;
        font-size: 18px;
      }
    }
  }

  .loading-box {
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    padding: 60px 24px;
    text-align: center;

    i {
      font-size: 48px;
      color: #1890ff;
      display: block;
      margin-bottom: 16px;
      animation: spin 2s linear infinite;
    }

    span {
      font-size: 16px;
      color: #606266;
    }
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .error-box {
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    padding: 24px;
    display: flex;
    align-items: flex-start;

    i {
      font-size: 32px;
      color: #f56c6c;
      margin-right: 16px;
      flex-shrink: 0;
    }

    .error-content {
      flex: 1;

      strong {
        display: block;
        font-size: 16px;
        color: #303133;
        margin-bottom: 8px;
      }

      p {
        font-size: 14px;
        color: #606266;
        margin: 0;
      }
    }
  }

  .search-card,
  .grid-card {
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    margin-bottom: 16px;

    .card-header {
      padding: 12px 20px;
      border-bottom: 1px solid #f0f0f0;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .card-title {
        font-size: 16px;
        font-weight: 600;
        color: #303133;
        margin: 0;
        display: flex;
        align-items: center;

        i {
          margin-right: 8px;
          color: #1890ff;
        }
      }

      .header-actions {
        display: flex;
        gap: 8px;
      }
    }

    .card-body {
      padding: 16px 20px;
    }
  }

  // 인라인 폼 스타일 (가로 배치)
  .search-form-inline {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;

    .form-group-inline {
      display: flex;
      align-items: center;
      gap: 8px;

      .form-label-inline {
        font-size: 13px;
        font-weight: 500;
        color: #606266;
        margin: 0;
        white-space: nowrap;
        min-width: 60px;

        .required-mark {
          color: #f56c6c;
          margin-left: 2px;
        }
      }

      .form-control,
      .form-select {
        &.form-control-sm,
        &.form-select-sm {
          height: 32px;
          padding: 4px 10px;
          font-size: 13px;
          border: 1px solid #dcdfe6;
          border-radius: 4px;
          min-width: 140px;
          transition: border-color 0.3s;

          &:focus {
            outline: none;
            border-color: #1890ff;
          }

          &::placeholder {
            color: #c0c4cc;
          }
        }
      }
    }

    .button-group-inline {
      display: flex;
      gap: 8px;
      margin-left: auto;
    }
  }

  .btn {
    height: 32px;
    padding: 0 16px;
    font-size: 13px;
    font-weight: 500;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    transition: all 0.3s;

    i {
      font-size: 14px;
    }

    &.btn-primary {
      background: #1890ff;
      color: #fff;

      &:hover {
        background: #40a9ff;
      }

      &:active {
        background: #096dd9;
      }
    }

    &.btn-secondary {
      background: #fff;
      color: #606266;
      border: 1px solid #dcdfe6;

      &:hover {
        color: #1890ff;
        border-color: #1890ff;
      }
    }

    &.btn-success {
      background: #67c23a;
      color: #fff;

      &:hover {
        background: #85ce61;
      }
    }

    &.btn-sm {
      height: 32px;
      padding: 0 12px;
      font-size: 13px;
    }
  }

  .no-grid-message {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: #909399;
    
    i {
      font-size: 48px;
      margin-bottom: 16px;
      opacity: 0.3;
    }
    
    p {
      font-size: 14px;
      margin: 0;
    }
  }
}
</style>
