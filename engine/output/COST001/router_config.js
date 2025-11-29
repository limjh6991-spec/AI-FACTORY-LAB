// 부서별 월별 원가 조회 라우터 설정
// frontend/src/router/index.js 에 추가

{
  path: '/screens/cost001',
  name: 'COST001',
  component: () => import('@/views/generated/COST001.vue'),
  meta: {
    title: '부서별 월별 원가 조회',
    icon: 'bi-file-earmark-code'
  }
}
