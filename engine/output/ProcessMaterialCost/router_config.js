// 공정별 재료비 현황 라우터 설정
// frontend/src/router/index.js 에 추가

{
  path: '/screens/processmaterialcost',
  name: 'ProcessMaterialCost',
  component: () => import('@/views/generated/ProcessMaterialCost.vue'),
  meta: {
    title: '공정별 재료비 현황',
    icon: 'bi-file-earmark-code'
  }
}
