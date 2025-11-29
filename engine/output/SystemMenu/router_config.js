// 메뉴 관리 라우터 설정
// frontend/src/router/index.js 에 추가

{
  path: '/screens/systemmenu',
  name: 'SystemMenu',
  component: () => import('@/views/generated/SystemMenu.vue'),
  meta: {
    title: '메뉴 관리',
    icon: 'bi-file-earmark-code'
  }
}
