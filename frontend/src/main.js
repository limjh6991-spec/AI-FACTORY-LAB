import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import RealGrid from 'realgrid'
import RealGridComponent from './components/RealGrid.vue'

// Element Plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// Bootstrap 5 CSS & JS
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

// Bootstrap Icons
import 'bootstrap-icons/font/bootstrap-icons.css'

// RealGrid CSS
import 'realgrid/dist/realgrid-style.css'

// AI Factory Design System
import './assets/design-system.css'

const app = createApp(App)

// Element Plus 등록
app.use(ElementPlus)

// RealGrid 라이선스 설정
RealGrid.setLicenseKey(process.env.VUE_APP_REAL_GRID_2LIC)

// RealGrid 컴포넌트 전역 등록
app.component('RealGrid', RealGridComponent)

app.use(createPinia())
app.use(router)

app.mount('#app')

