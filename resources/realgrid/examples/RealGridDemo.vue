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

      // 샘플 데이터
      const data = [
        { orderID: '10248', customerID: 'VINET', country: 'France', companyName: 'Vins et alcools', employeeID: 'E001', orderDate: '2025-01-05', phone: '01-234-5678' },
        { orderID: '10249', customerID: 'TOMSP', country: 'Germany', companyName: 'Toms Spezialitäten', employeeID: 'E002', orderDate: '2025-01-06', phone: '02-345-6789' },
        { orderID: '10250', customerID: 'HANAR', country: 'Brazil', companyName: 'Hanari Carnes', employeeID: 'E003', orderDate: '2025-01-08', phone: '03-456-7890' }
      ]
      this.provider1.setRows(data)

      this.gridView1.setDisplayOptions({ fitStyle: 'fill' })
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

      const fields = [
        { fieldName: 'year', dataType: 'text' },
        { fieldName: 'quarter', dataType: 'text' },
        { fieldName: 'month', dataType: 'text' },
        { fieldName: 'sales', dataType: 'number' }
      ]
      this.provider2.setFields(fields)

      const columns = [
        { name: 'year', fieldName: 'year', header: { text: '연도' }, width: 80 },
        { name: 'quarter', fieldName: 'quarter', header: { text: '분기' }, width: 80 },
        { name: 'month', fieldName: 'month', header: { text: '월' }, width: 80 },
        { name: 'sales', fieldName: 'sales', header: { text: '매출' }, width: 120, numberFormat: '#,##0' }
      ]
      this.gridView2.setColumns(columns)

      const data = [
        { year: '2025', quarter: 'Q1', month: '1월', sales: 10000 },
        { year: '2025', quarter: 'Q1', month: '2월', sales: 12000 },
        { year: '2025', quarter: 'Q1', month: '3월', sales: 15000 },
        { year: '2025', quarter: 'Q2', month: '4월', sales: 18000 },
        { year: '2025', quarter: 'Q2', month: '5월', sales: 20000 },
        { year: '2025', quarter: 'Q2', month: '6월', sales: 22000 }
      ]
      this.provider2.setRows(data)

      this.gridView2.setDisplayOptions({ fitStyle: 'fill' })
    },

    applyMerge1() {
      // 기본 병합 (각 컬럼 독립)
      this.gridView2.columnByName('year').mergeRule = { criteria: 'value' }
      this.gridView2.columnByName('quarter').mergeRule = { criteria: 'value' }
      this.gridView2.columnByName('month').mergeRule = { criteria: 'value' }
    },

    applyMerge2() {
      // 선행 컬럼 참조 병합
      this.gridView2.columnByName('year').mergeRule = { criteria: 'value' }
      this.gridView2.columnByName('quarter').mergeRule = { criteria: 'prevvalues + value' }
      this.gridView2.columnByName('month').mergeRule = { criteria: 'prevvalues + value' }
    },

    clearMerge() {
      this.gridView2.columnByName('year').mergeRule = null
      this.gridView2.columnByName('quarter').mergeRule = null
      this.gridView2.columnByName('month').mergeRule = null
    },

    // ==================== Grid 3: Combined Example ====================
    initGrid3() {
      this.provider3 = new LocalDataProvider()
      this.gridView3 = new GridView('grid3')
      this.gridView3.setDataSource(this.provider3)

      const fields = [
        { fieldName: 'year', dataType: 'text' },
        { fieldName: 'quarter', dataType: 'text' },
        { fieldName: 'month', dataType: 'text' },
        { fieldName: 'product', dataType: 'text' },
        { fieldName: 'region', dataType: 'text' },
        { fieldName: 'sales', dataType: 'number' },
        { fieldName: 'cost', dataType: 'number' },
        { fieldName: 'profit', dataType: 'number' }
      ]
      this.provider3.setFields(fields)

      const columns = [
        { name: 'year', fieldName: 'year', header: { text: '연도' }, width: 60, mergeRule: { criteria: 'value' } },
        { name: 'quarter', fieldName: 'quarter', header: { text: '분기' }, width: 60, mergeRule: { criteria: 'prevvalues + value' } },
        { name: 'month', fieldName: 'month', header: { text: '월' }, width: 60, mergeRule: { criteria: 'prevvalues + value' } },
        { name: 'product', fieldName: 'product', header: { text: '제품' }, width: 100 },
        { name: 'region', fieldName: 'region', header: { text: '지역' }, width: 80 },
        { name: 'sales', fieldName: 'sales', header: { text: '매출' }, width: 100, numberFormat: '#,##0' },
        { name: 'cost', fieldName: 'cost', header: { text: '비용' }, width: 100, numberFormat: '#,##0' },
        { name: 'profit', fieldName: 'profit', header: { text: '이익' }, width: 100, numberFormat: '#,##0' }
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
          items: ['product', 'region'],
          header: { text: '구분' }
        },
        {
          name: 'performanceGroup',
          direction: 'horizontal',
          items: ['sales', 'cost', 'profit'],
          header: { text: '실적' }
        }
      ]
      this.gridView3.setColumnLayout(layout)

      const data = [
        { year: '2025', quarter: 'Q1', month: '1월', product: '노트북', region: '서울', sales: 50000, cost: 30000, profit: 20000 },
        { year: '2025', quarter: 'Q1', month: '1월', product: '마우스', region: '서울', sales: 10000, cost: 5000, profit: 5000 },
        { year: '2025', quarter: 'Q1', month: '2월', product: '노트북', region: '서울', sales: 60000, cost: 35000, profit: 25000 },
        { year: '2025', quarter: 'Q1', month: '2월', product: '마우스', region: '부산', sales: 12000, cost: 6000, profit: 6000 },
        { year: '2025', quarter: 'Q2', month: '4월', product: '노트북', region: '서울', sales: 70000, cost: 40000, profit: 30000 },
        { year: '2025', quarter: 'Q2', month: '4월', product: '키보드', region: '부산', sales: 15000, cost: 8000, profit: 7000 }
      ]
      this.provider3.setRows(data)

      this.gridView3.setDisplayOptions({ fitStyle: 'fill' })
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
