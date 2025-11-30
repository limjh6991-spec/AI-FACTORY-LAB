<template>
  <div class="realgrid-demo-page">
    <div class="container-fluid">
      <h2 class="mb-4">🎨 RealGrid 고급 기능 데모</h2>

      <!-- Tab Navigation -->
      <ul class="nav nav-tabs mb-3" role="tablist">
        <li class="nav-item">
          <button
            class="nav-link active"
            data-bs-toggle="tab"
            data-bs-target="#layout-tab"
            type="button"
          >
            📊 Column Layout
          </button>
        </li>
        <li class="nav-item">
          <button
            class="nav-link"
            data-bs-toggle="tab"
            data-bs-target="#merge-tab"
            type="button"
          >
            🔗 Cell Merging
          </button>
        </li>
        <li class="nav-item">
          <button
            class="nav-link"
            data-bs-toggle="tab"
            data-bs-target="#combined-tab"
            type="button"
          >
            ⭐ Combined Example
          </button>
        </li>
      </ul>

      <!-- Tab Content -->
      <div class="tab-content">
        <!-- Column Layout Demo -->
        <div class="tab-pane fade show active" id="layout-tab">
          <div class="card">
            <div class="card-header">
              <h5>컬럼 레이아웃 (다층 헤더 그룹핑)</h5>
            </div>
            <div class="card-body">
              <div class="btn-group mb-3">
                <button class="btn btn-sm btn-primary" @click="applyLayout1">레이아웃 1 (가로 그룹)</button>
                <button class="btn btn-sm btn-primary" @click="applyLayout2">레이아웃 2 (세로 그룹)</button>
                <button class="btn btn-sm btn-primary" @click="applyLayout3">레이아웃 3 (중첩 그룹)</button>
                <button class="btn btn-sm btn-secondary" @click="resetLayout">초기화</button>
              </div>
              <div id="grid1" style="width: 100%; height: 400px"></div>
            </div>
          </div>
        </div>

        <!-- Cell Merging Demo -->
        <div class="tab-pane fade" id="merge-tab">
          <div class="card">
            <div class="card-header">
              <h5>셀 병합 (Cell Merging)</h5>
            </div>
            <div class="card-body">
              <div class="btn-group mb-3">
                <button class="btn btn-sm btn-success" @click="applyMerge1">기본 병합</button>
                <button class="btn btn-sm btn-success" @click="applyMerge2">선행 컬럼 참조</button>
                <button class="btn btn-sm btn-secondary" @click="clearMerge">병합 해제</button>
              </div>
              <div id="grid2" style="width: 100%; height: 400px"></div>
            </div>
          </div>
        </div>

        <!-- Combined Example -->
        <div class="tab-pane fade" id="combined-tab">
          <div class="card">
            <div class="card-header">
              <h5>⭐ 통합 예제: 판매 실적 분석 대시보드</h5>
            </div>
            <div class="card-body">
              <div class="alert alert-info">
                <strong>💡 Tip:</strong> 다층 헤더 + 셀 병합을 조합한 실전 예제입니다. 
                연도/분기/월별 판매 실적을 계층적으로 표현합니다.
              </div>
              <div id="grid3" style="width: 100%; height: 500px"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { GridView, LocalDataProvider } from 'realgrid'

export default {
  name: 'RealGridDemo',
  data() {
    return {
      gridView1: null,
      provider1: null,
      gridView2: null,
      provider2: null,
      gridView3: null,
      provider3: null
    }
  },
  mounted() {
    this.initGrid1()
    this.initGrid2()
    this.initGrid3()
  },
  beforeUnmount() {
    this.gridView1?.destroy()
    this.gridView2?.destroy()
    this.gridView3?.destroy()
    this.provider1?.destroy()
    this.provider2?.destroy()
    this.provider3?.destroy()
  },
  methods: {
    // ==================== Grid 1: Column Layout ====================
    initGrid1() {
      this.provider1 = new LocalDataProvider()
      this.gridView1 = new GridView('grid1')
      this.gridView1.setDataSource(this.provider1)

      // 필드 정의
      const fields = [
        { fieldName: 'orderID', dataType: 'text' },
        { fieldName: 'customerID', dataType: 'text' },
        { fieldName: 'country', dataType: 'text' },
        { fieldName: 'companyName', dataType: 'text' },
        { fieldName: 'employeeID', dataType: 'text' },
        { fieldName: 'orderDate', dataType: 'text' },
        { fieldName: 'phone', dataType: 'text' }
      ]
      this.provider1.setFields(fields)

      // 컬럼 정의
      const columns = [
        { name: 'orderID', fieldName: 'orderID', header: { text: 'Order ID' }, width: 100 },
        { name: 'customerID', fieldName: 'customerID', header: { text: 'Customer ID' }, width: 120 },
        { name: 'country', fieldName: 'country', header: { text: 'Country' }, width: 100 },
        { name: 'companyName', fieldName: 'companyName', header: { text: 'Company Name' }, width: 150 },
        { name: 'employeeID', fieldName: 'employeeID', header: { text: 'Employee ID' }, width: 100 },
        { name: 'orderDate', fieldName: 'orderDate', header: { text: 'Order Date' }, width: 100 },
        { name: 'phone', fieldName: 'phone', header: { text: 'Phone' }, width: 120 }
      ]
      this.gridView1.setColumns(columns)

      this.gridView1.setDisplayOptions({ fitStyle: 'fill' })
      
      // DB에서 데이터 로딩
      this.loadGrid1Data()
    },

    async loadGrid1Data() {
      try {
        const response = await fetch('/api/demo/grid1/list')
        const result = await response.json()
        this.provider1.setRows(result.list || [])
        console.log('✅ Grid1 데이터 로딩 완료:', result.total, '건')
      } catch (error) {
        console.error('❌ Grid1 데이터 로딩 실패:', error)
        // 실패 시 샘플 데이터 사용
        const data = [
          { orderID: '10248', customerID: 'VINET', country: 'France', companyName: 'Vins et alcools', employeeID: 'E001', orderDate: '2025-01-05', phone: '01-234-5678' },
          { orderID: '10249', customerID: 'TOMSP', country: 'Germany', companyName: 'Toms Spezialitäten', employeeID: 'E002', orderDate: '2025-01-06', phone: '02-345-6789' },
          { orderID: '10250', customerID: 'HANAR', country: 'Brazil', companyName: 'Hanari Carnes', employeeID: 'E003', orderDate: '2025-01-08', phone: '03-456-7890' }
        ]
        this.provider1.setRows(data)
      }
    },

    applyLayout1() {
      // 가로 그룹핑
      const layout = [
        'orderID',
        'customerID',
        {
          name: 'companyGroup',
          direction: 'horizontal',
          items: ['country', 'companyName'],
          header: { text: 'Company Info' }
        },
        'employeeID',
        'orderDate',
        'phone'
      ]
      this.gridView1.setColumnLayout(layout)
    },

    applyLayout2() {
      // 세로 그룹핑
      const layout = [
        'orderID',
        'customerID',
        {
          name: 'companyGroup',
          direction: 'vertical',
          width: 250,
          items: ['country', 'companyName'],
          header: { text: 'Company Info' }
        },
        'employeeID',
        'orderDate',
        'phone'
      ]
      this.gridView1.setColumnLayout(layout)
    },

    applyLayout3() {
      // 중첩 그룹핑
      const layout = [
        {
          name: 'orderGroup',
          direction: 'horizontal',
          items: [
            {
              name: 'orderIDGroup',
              direction: 'vertical',
              items: [{ column: 'orderID', width: 100 }]
            },
            {
              name: 'customerIDGroup',
              direction: 'vertical',
              items: [{ column: 'customerID', width: 100 }]
            }
          ],
          header: { text: 'Order Info' }
        },
        {
          name: 'companyGroup',
          direction: 'vertical',
          width: 250,
          items: ['country', 'companyName'],
          header: { text: 'Company Info' }
        },
        'employeeID',
        'orderDate',
        'phone'
      ]
      this.gridView1.setColumnLayout(layout)
    },

    resetLayout() {
      this.gridView1.setColumnLayout([
        'orderID',
        'customerID',
        'country',
        'companyName',
        'employeeID',
        'orderDate',
        'phone'
      ])
    },

    // ==================== Grid 2: Cell Merging ====================
    initGrid2() {
      this.provider2 = new LocalDataProvider()
      this.gridView2 = new GridView('grid2')
      this.gridView2.setDataSource(this.provider2)

      // DB 응답 필드: deptName, deptNameEn, empName, position, hireDate, salary
      const fields = [
        { fieldName: 'deptName', dataType: 'text' },
        { fieldName: 'deptNameEn', dataType: 'text' },
        { fieldName: 'empName', dataType: 'text' },
        { fieldName: 'position', dataType: 'text' },
        { fieldName: 'hireDate', dataType: 'text' },
        { fieldName: 'salary', dataType: 'number' }
      ]
      this.provider2.setFields(fields)

      const columns = [
        { name: 'deptName', fieldName: 'deptName', header: { text: '부서명' }, width: 100 },
        { name: 'deptNameEn', fieldName: 'deptNameEn', header: { text: 'Department' }, width: 120 },
        { name: 'empName', fieldName: 'empName', header: { text: '직원명' }, width: 100 },
        { name: 'position', fieldName: 'position', header: { text: '직급' }, width: 80 },
        { name: 'hireDate', fieldName: 'hireDate', header: { text: '입사일' }, width: 100 },
        { name: 'salary', fieldName: 'salary', header: { text: '급여' }, width: 120, numberFormat: '#,##0' }
      ]
      this.gridView2.setColumns(columns)

      this.gridView2.setDisplayOptions({ fitStyle: 'fill' })
      
      // DB에서 데이터 로딩
      this.loadGrid2Data()
    },

    async loadGrid2Data() {
      try {
        const response = await fetch('/api/demo/grid2/list')
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`)
        }
        const result = await response.json()
        console.log('📊 Grid2 데이터 샘플:', result.list[0])
        this.provider2.setRows(result.list || [])
        console.log('✅ Grid2 데이터 로딩 완료:', result.total, '건')
      } catch (error) {
        console.error('❌ Grid2 데이터 로딩 실패:', error)
        // 실패 시 빈 배열
        this.provider2.setRows([])
      }
    },

    applyMerge1() {
      // 기본 병합 (각 컬럼 독립)
      this.gridView2.columnByName('deptName').mergeRule = { criteria: 'value' }
      this.gridView2.columnByName('deptNameEn').mergeRule = { criteria: 'value' }
      this.gridView2.columnByName('empName').mergeRule = { criteria: 'value' }
    },

    applyMerge2() {
      // 선행 컬럼 참조 병합
      this.gridView2.columnByName('deptName').mergeRule = { criteria: 'value' }
      this.gridView2.columnByName('deptNameEn').mergeRule = { criteria: 'prevvalues + value' }
      this.gridView2.columnByName('empName').mergeRule = { criteria: 'prevvalues + value' }
    },

    clearMerge() {
      this.gridView2.columnByName('deptName').mergeRule = null
      this.gridView2.columnByName('deptNameEn').mergeRule = null
      this.gridView2.columnByName('empName').mergeRule = null
    },

    // ==================== Grid 3: Combined Example ====================
    initGrid3() {
      this.provider3 = new LocalDataProvider()
      this.gridView3 = new GridView('grid3')
      this.gridView3.setDataSource(this.provider3)

      // DB 응답 필드: year, quarter, month, region, category, targetAmount, actualAmount, achievementRate
      const fields = [
        { fieldName: 'year', dataType: 'text' },
        { fieldName: 'quarter', dataType: 'text' },
        { fieldName: 'month', dataType: 'text' },
        { fieldName: 'region', dataType: 'text' },
        { fieldName: 'category', dataType: 'text' },
        { fieldName: 'targetAmount', dataType: 'number' },
        { fieldName: 'actualAmount', dataType: 'number' },
        { fieldName: 'achievementRate', dataType: 'number' }
      ]
      this.provider3.setFields(fields)

      const columns = [
        { name: 'year', fieldName: 'year', header: { text: '연도' }, width: 60, mergeRule: { criteria: 'value' } },
        { name: 'quarter', fieldName: 'quarter', header: { text: '분기' }, width: 60, mergeRule: { criteria: 'prevvalues + value' } },
        { name: 'month', fieldName: 'month', header: { text: '월' }, width: 60, mergeRule: { criteria: 'prevvalues + value' } },
        { name: 'region', fieldName: 'region', header: { text: '지역' }, width: 80 },
        { name: 'category', fieldName: 'category', header: { text: '품목' }, width: 100 },
        { name: 'targetAmount', fieldName: 'targetAmount', header: { text: '목표금액' }, width: 120, numberFormat: '#,##0' },
        { name: 'actualAmount', fieldName: 'actualAmount', header: { text: '실적금액' }, width: 120, numberFormat: '#,##0' },
        { name: 'achievementRate', fieldName: 'achievementRate', header: { text: '달성률(%)' }, width: 100, numberFormat: '#,##0.0' }
      ]
      this.gridView3.setColumns(columns)

      // 복잡한 레이아웃 적용
      const layout = [
        {
          name: 'timeGroup',
          direction: 'horizontal',
          items: ['year', 'quarter', 'month'],
          header: { text: '기간' }
        },
        {
          name: 'infoGroup',
          direction: 'horizontal',
          items: ['region', 'category'],
          header: { text: '구분' }
        },
        {
          name: 'performanceGroup',
          direction: 'horizontal',
          items: ['targetAmount', 'actualAmount', 'achievementRate'],
          header: { text: '판매 실적' }
        }
      ]
      this.gridView3.setColumnLayout(layout)

      this.gridView3.setDisplayOptions({ fitStyle: 'fill' })
      
      // DB에서 데이터 로딩
      this.loadGrid3Data()
    },

    async loadGrid3Data() {
      try {
        const response = await fetch('/api/demo/grid3/list')
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`)
        }
        const result = await response.json()
        console.log('📊 Grid3 데이터 샘플:', result.list[0])
        this.provider3.setRows(result.list || [])
        console.log('✅ Grid3 데이터 로딩 완료:', result.total, '건')
      } catch (error) {
        console.error('❌ Grid3 데이터 로딩 실패:', error)
        // 실패 시 빈 배열
        this.provider3.setRows([])
      }
    }
  }
}
</script>

<style scoped>
.realgrid-demo-page {
  padding: 20px;
}

.card {
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card-header {
  background-color: #f8f9fa;
  border-bottom: 2px solid #dee2e6;
}

.btn-group {
  margin-bottom: 15px;
}
</style>
