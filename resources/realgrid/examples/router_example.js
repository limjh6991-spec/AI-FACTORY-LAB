// ============================================
// RealGrid Demo 라우터 설정 예제
// ============================================
// 
// 📁 파일: frontend/src/router/index.js
// 📝 목적: RealGrid 데모 페이지를 라우터에 등록
//
// 사용법:
// 1. 아래 코드를 router/index.js의 routes 배열에 추가
// 2. npm run serve 실행
// 3. http://localhost:8080/#/realgrid-demo 접속

export default {
  path: '/realgrid-demo',
  name: 'RealGridDemo',
  component: () => import('@/resources/realgrid/examples/RealGridDemo.vue'),
  meta: {
    layout: 'MainLayout',
    title: 'RealGrid 고급 기능 데모',
    requiresAuth: false  // 인증 필요 시 true로 변경
  }
}

// ============================================
// 전체 router/index.js 예시
// ============================================
/*
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('@/views/Dashboard.vue'),
    meta: { layout: 'MainLayout' }
  },
  {
    path: '/standard',
    name: 'StandardPage',
    component: () => import('@/views/StandardPage.vue'),
    meta: { layout: 'MainLayout' }
  },
  // 👇 여기에 추가
  {
    path: '/realgrid-demo',
    name: 'RealGridDemo',
    component: () => import('@/resources/realgrid/examples/RealGridDemo.vue'),
    meta: { layout: 'MainLayout' }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
*/

// ============================================
// 메뉴에 추가하기 (선택사항)
// ============================================
/*
// stores/menu.js 또는 menu 설정 파일에 추가

{
  menuCode: 'DEMO',
  menuName: 'RealGrid Demo',
  menuPath: '/realgrid-demo',
  icon: 'bi-grid-3x3-gap-fill',
  children: []
}
*/
