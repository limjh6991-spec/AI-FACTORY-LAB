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
      },
      {
        path: 'production/ProductionResult',
        name: 'ProductionResult',
        component: () => import('@/views/production/ProductionResult.vue'),
        meta: {
          title: '생산 실적 관리',
          icon: 'bi-clipboard-data'
        }
      },
      // {
      //   path: 'cost/CostManagement',
      //   name: 'CostManagement',
      //   component: () => import('@/views/cost/CostManagement.vue'),
      //   meta: {
      //     title: '원가 관리',
      //     icon: 'bi-calculator'
      //   }
      // },
      {
        path: 'realgrid-demo',
        name: 'RealGridDemo',
        component: () => import('@/views/demo/RealGridDemo.vue'),
        meta: {
          title: 'RealGrid 고급 기능 데모',
          icon: 'bi-grid-3x3-gap-fill'
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
