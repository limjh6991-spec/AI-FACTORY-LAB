<template>
  <div class="app-wrapper">
    <div class="sidebar-container">
      <div class="logo-area">
        <h5 class="text-white m-0"><i class="bi bi-robot"></i> AI Factory</h5>
      </div>
      
      <div class="sidebar-menu">
        <!-- 디버깅: 메뉴 개수 표시 -->
        <div v-if="menuItems.length === 0" style="color: white; padding: 10px; font-size: 12px;">
          ⏳ 메뉴 로딩 중... (총 {{ menus.length }}개)
        </div>
        <SidebarItem 
          v-for="route in menuItems" 
          :key="route.menuId" 
          :item="route"
        />
      </div>

      <div class="sidebar-menu-bottom">
        <SidebarItem 
          v-for="route in adminMenuItems" 
          :key="route.menuId" 
          :item="route"
        />
      </div>
    </div>

    <div class="main-container">
      <div class="navbar-header shadow-sm d-flex align-items-center justify-content-between px-4">
        <div class="breadcrumb-area">
          <Breadcrumb />
        </div>
        <div class="user-area">
          <span class="mr-2">Admin</span>
          <i class="bi bi-person-circle"></i>
        </div>
      </div>

      <section class="app-main">
        <router-view v-slot="{ Component }">
          <transition name="fade-transform" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </section>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useMenuStore } from '@/stores/menu'
import { storeToRefs } from 'pinia'
import SidebarItem from './components/SidebarItem.vue'
import Breadcrumb from './components/Breadcrumb.vue'

const menuStore = useMenuStore()
const { menus } = storeToRefs(menuStore)

// 컴포넌트 마운트 시 DB에서 메뉴 로드
onMounted(async () => {
  console.log('🔄 MainLayout 마운트 - 메뉴 로드 시작')
  await menuStore.fetchMenuList()
  console.log('📋 로드된 메뉴:', menus.value)
})

// 메뉴를 일반 메뉴와 관리자 메뉴로 분리
const menuItems = computed(() => {
  const items = menus.value.filter(menu => menu.menuId !== 'M003')
  console.log('📌 일반 메뉴:', items)
  return items
})

const adminMenuItems = computed(() => {
  const items = menus.value.filter(menu => menu.menuId === 'M003')
  console.log('⚙️ 관리자 메뉴:', items)
  return items
})
</script>

<style lang="scss" scoped>
.app-wrapper {
  display: flex;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.sidebar-container {
  width: 260px;
  background-color: #304156;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1001;
  overflow-y: auto;
  transition: width 0.28s;
  display: flex;
  flex-direction: column;
  
  .logo-area {
    height: 50px;
    background-color: #2b2f3a;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    
    h5 {
      font-size: 18px;
      font-weight: 600;
      
      i {
        font-size: 24px;
        margin-right: 8px;
      }
    }
  }

  .sidebar-menu {
    padding: 10px 0;
    overflow-y: auto;
    flex: 1;

    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.2);
      border-radius: 3px;
    }
  }

  .sidebar-menu-bottom {
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding: 10px 0;
  }
}

.main-container {
  min-height: 100%;
  transition: margin-left 0.28s;
  margin-left: 260px;
  width: calc(100% - 260px);
  position: relative;
  background-color: #f0f2f5;
}

.navbar-header {
  height: 50px;
  background: #fff;
  position: sticky;
  top: 0;
  z-index: 9;
  
  .user-area {
    display: flex;
    align-items: center;
    gap: 8px;
    
    i {
      font-size: 24px;
      color: #5a5e66;
    }
  }
}

.app-main {
  padding: 20px;
  min-height: calc(100vh - 50px);
  overflow-y: auto;
}

.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.5s;
}
.fade-transform-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}
.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
