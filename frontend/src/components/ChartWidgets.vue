<template>
  <div class="chart-widgets mb-4">
    <!-- RealGrid 차트 통합 -->
    <div class="card shadow-sm">
      <div class="card-header border-bottom">
        <h6 class="mb-0">
          <i class="bi bi-bar-chart-fill me-2 text-primary"></i>
          RealGrid 차트 렌더러 데모
        </h6>
      </div>
      <div class="card-body">
        <div class="btn-group mb-3" role="group">
          <button 
            class="btn btn-outline-primary" 
            :class="{ active: activeChart === 'bar' }"
            @click="showBarRenderer"
          >
            <i class="bi bi-bar-chart me-1"></i> Bar
          </button>
          <button 
            class="btn btn-outline-primary" 
            :class="{ active: activeChart === 'sparkline' }"
            @click="showSparkLine"
          >
            <i class="bi bi-activity me-1"></i> Spark Line
          </button>
          <button 
            class="btn btn-outline-primary" 
            :class="{ active: activeChart === 'signal' }"
            @click="showSignalRenderer"
          >
            <i class="bi bi-reception-4 me-1"></i> Signal
          </button>
          <button 
            class="btn btn-outline-primary" 
            :class="{ active: activeChart === 'shape' }"
            @click="showShapeRenderer"
          >
            <i class="bi bi-circle-fill me-1"></i> Shape
          </button>
        </div>
        <div id="gridChart" style="width: 100%; height: 400px; border: 1px solid var(--neutral-gray-30); border-radius: var(--radius-sm);"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { GridView, LocalDataProvider } from 'realgrid'

export default {
  name: 'ChartWidgets',
  data() {
    return {
      gridView: null,
      provider: null,
      activeChart: 'bar'
    }
  },
  mounted() {
    this.initRealGridChart()
  },
  beforeUnmount() {
    // RealGrid cleanup
    this.gridView?.destroy()
    this.provider?.destroy()
  },
  methods: {
    initRealGridChart() {
      this.provider = new LocalDataProvider(false)
      this.gridView = new GridView('gridChart')
      this.gridView.setDataSource(this.provider)

      // 그리드 옵션 설정
      this.gridView.setDisplayOptions({
        fitStyle: 'fill',
        rowHeight: 40
      })

      // 기본 필드 정의
      const fields = [
        { fieldName: 'product', dataType: 'text' },
        { fieldName: 'jan', dataType: 'number' },
        { fieldName: 'feb', dataType: 'number' },
        { fieldName: 'mar', dataType: 'number' },
        { fieldName: 'apr', dataType: 'number' },
        { fieldName: 'may', dataType: 'number' },
        { fieldName: 'jun', dataType: 'number' },
        { fieldName: 'total', dataType: 'number' },
        { fieldName: 'achievement', dataType: 'number' }
      ]
      this.provider.setFields(fields)

      // 샘플 데이터
      const data = [
        { product: '노트북', jan: 120, feb: 135, mar: 150, apr: 145, may: 160, jun: 175, total: 885, achievement: 88.5 },
        { product: '마우스', jan: 80, feb: 85, mar: 90, apr: 95, may: 100, jun: 105, total: 555, achievement: 92.5 },
        { product: '키보드', jan: 60, feb: 65, mar: 70, apr: 75, may: 80, jun: 85, total: 435, achievement: 87.0 },
        { product: '모니터', jan: 100, feb: 110, mar: 120, apr: 130, may: 140, jun: 150, total: 750, achievement: 93.8 }
      ]
      this.provider.setRows(data)

      // Bar Renderer를 기본으로 표시
      this.showBarRenderer()
    },

    showBarRenderer() {
      this.activeChart = 'bar'
      const columns = [
        { name: 'product', fieldName: 'product', header: { text: '제품' }, width: 100 },
        { name: 'jan', fieldName: 'jan', header: { text: '1월' }, width: 80, numberFormat: '#,##0' },
        { name: 'feb', fieldName: 'feb', header: { text: '2월' }, width: 80, numberFormat: '#,##0' },
        { name: 'mar', fieldName: 'mar', header: { text: '3월' }, width: 80, numberFormat: '#,##0' },
        { name: 'apr', fieldName: 'apr', header: { text: '4월' }, width: 80, numberFormat: '#,##0' },
        { name: 'may', fieldName: 'may', header: { text: '5월' }, width: 80, numberFormat: '#,##0' },
        { name: 'jun', fieldName: 'jun', header: { text: '6월' }, width: 80, numberFormat: '#,##0' },
        {
          name: 'total',
          fieldName: 'total',
          header: { text: '합계 (Bar)' },
          width: 150,
          numberFormat: '#,##0',
          renderer: {
            type: 'bar',
            maximum: 1000,
            origin: 'left',
            showLabel: true,
            barColors: ['#3498db']
          }
        }
      ]
      this.gridView.setColumns(columns)
      this.gridView.setDisplayOptions({ fitStyle: 'fill' })
    },

    showSparkLine() {
      this.activeChart = 'sparkline'
      const columns = [
        { name: 'product', fieldName: 'product', header: { text: '제품' }, width: 100 },
        {
          name: 'trend',
          fieldNames: ['jan', 'feb', 'mar', 'apr', 'may', 'jun'],
          header: { text: '월별 추이 (Spark)' },
          width: 200,
          renderer: {
            type: 'sparkline',
            lineWidth: 2,
            lineColor: '#2ecc71',
            fillColor: 'rgba(46, 204, 113, 0.2)',
            showHighLow: true,
            highColor: '#e74c3c',
            lowColor: '#3498db'
          }
        },
        { name: 'total', fieldName: 'total', header: { text: '합계' }, width: 100, numberFormat: '#,##0' },
        { name: 'achievement', fieldName: 'achievement', header: { text: '달성률' }, width: 100, numberFormat: '#,##0.0', suffix: '%' }
      ]
      this.gridView.setColumns(columns)
      this.gridView.setDisplayOptions({ fitStyle: 'fill' })
    },

    showSignalRenderer() {
      this.activeChart = 'signal'
      const columns = [
        { name: 'product', fieldName: 'product', header: { text: '제품' }, width: 100 },
        { name: 'jan', fieldName: 'jan', header: { text: '1월' }, width: 80, numberFormat: '#,##0' },
        { name: 'feb', fieldName: 'feb', header: { text: '2월' }, width: 80, numberFormat: '#,##0' },
        { name: 'mar', fieldName: 'mar', header: { text: '3월' }, width: 80, numberFormat: '#,##0' },
        { name: 'total', fieldName: 'total', header: { text: '합계' }, width: 100, numberFormat: '#,##0' },
        {
          name: 'achievement',
          fieldName: 'achievement',
          header: { text: '달성률 (Signal)' },
          width: 150,
          numberFormat: '#,##0.0',
          suffix: '%',
          renderer: {
            type: 'signal',
            maximum: 100,
            signalCount: 5,
            onColor: '#2ecc71',
            offColor: '#ecf0f1',
            shape: 'bar'
          }
        }
      ]
      this.gridView.setColumns(columns)
      this.gridView.setDisplayOptions({ fitStyle: 'fill' })
    },

    showShapeRenderer() {
      this.activeChart = 'shape'
      const columns = [
        { name: 'product', fieldName: 'product', header: { text: '제품' }, width: 100 },
        { name: 'jan', fieldName: 'jan', header: { text: '1월' }, width: 80, numberFormat: '#,##0' },
        { name: 'feb', fieldName: 'feb', header: { text: '2월' }, width: 80, numberFormat: '#,##0' },
        { name: 'mar', fieldName: 'mar', header: { text: '3월' }, width: 80, numberFormat: '#,##0' },
        { name: 'apr', fieldName: 'apr', header: { text: '4월' }, width: 80, numberFormat: '#,##0' },
        { name: 'may', fieldName: 'may', header: { text: '5월' }, width: 80, numberFormat: '#,##0' },
        { name: 'jun', fieldName: 'jun', header: { text: '6월' }, width: 80, numberFormat: '#,##0' },
        { name: 'total', fieldName: 'total', header: { text: '합계' }, width: 100, numberFormat: '#,##0' },
        {
          name: 'achievement',
          fieldName: 'achievement',
          header: { text: '달성률' },
          width: 120,
          numberFormat: '#,##0.0',
          suffix: '%',
          renderer: {
            type: 'shape',
            shape: 'circle',
            shapeColor: (grid, cell) => {
              const value = cell.value
              if (value >= 90) return '#2ecc71'
              if (value >= 85) return '#3498db'
              return '#95a5a6'
            }
          }
        }
      ]
      this.gridView.setColumns(columns)
      this.gridView.setDisplayOptions({ fitStyle: 'fill' })
    }
  }
}
</script>

<style scoped>
.chart-widgets {
  margin-bottom: var(--spacing-lg);
}

.btn-group .btn {
  transition: all var(--duration-fast) var(--easing-standard);
}

.btn-group .btn.active {
  background-color: var(--primary-blue);
  border-color: var(--primary-blue);
  color: white;
}
</style>
