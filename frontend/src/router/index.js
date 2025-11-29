import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: () => import('@/views/Dashboard.vue')
      },
      {
        path: 'admin/screen-generator',
        name: 'ScreenGenerator',
        component: () => import('@/views/admin/ScreenGenerator.vue')
      },
      {
        path: 'admin/menu-generator',
        name: 'MenuGenerator',
        component: () => import('@/views/admin/MenuGenerator.vue')
      },
      {
        path: 'admin',
        name: 'AdminPage',
        component: () => import('@/views/admin/AdminPage.vue')
      },
      {
        path: 'standard/:schemaId',
        name: 'StandardPage',
        component: () => import('@/views/StandardPage.vue'),
        props: true
      },
      {
        path: 'cost/cost001',
        name: 'COST001',
        component: () => import('@/views/cost/COST001.vue'),
        meta: {
          title: '부서별 월별 원가 조회',
          icon: 'bi-currency-dollar'
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
