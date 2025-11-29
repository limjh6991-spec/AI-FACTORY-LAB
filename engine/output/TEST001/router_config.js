// 테스트 화면 라우터 설정
// frontend/src/router/index.js 에 추가

{
  path: '/screens/test001',
  name: 'TEST001',
  component: () => import('@/views/generated/TEST001.vue'),
  meta: {
    title: '테스트 화면',
    icon: 'bi-file-earmark-code'
  }
}
