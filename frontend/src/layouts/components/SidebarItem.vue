<template>
  <div class="sidebar-item">
    <!-- Single Menu Item (no children) with valid URL -->
    <router-link
      v-if="(!item.children || item.children.length === 0) && (item.menuUrl || item.path)"
      :to="item.menuUrl || item.path"
      class="menu-link"
      active-class="is-active"
    >
      <span class="menu-title">{{ item.menuNm || item.label }}</span>
    </router-link>

    <!-- Single Menu Item without URL (disabled) -->
    <div
      v-else-if="!item.children || item.children.length === 0"
      class="menu-link disabled"
    >
      <span class="menu-title">{{ item.menuNm || item.label }}</span>
    </div>

    <!-- Menu with Children (Submenu) -->
    <div v-else class="submenu">
      <div class="submenu-title" @click="toggleSubmenu">
        <span class="menu-title">{{ item.menuNm || item.label }}</span>
        <i 
          class="menu-arrow" 
          :class="isOpened ? 'bi bi-caret-down-fill' : 'bi bi-caret-right-fill'"
        ></i>
      </div>
      
      <transition name="el-zoom-in-top">
        <div v-show="isOpened" class="submenu-wrapper">
          <SidebarItem
            v-for="child in item.children"
            :key="child.menuId || child.id"
            :item="child"
            class="nested-menu"
          />
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue'

defineProps({
  item: {
    type: Object,
    required: true
  }
})

const isOpened = ref(false)

const toggleSubmenu = () => {
  isOpened.value = !isOpened.value
}
</script>

<style lang="scss" scoped>
.sidebar-item {
  .menu-link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 20px;
    color: var(--neutral-gray-20);
    text-decoration: none;
    transition: all var(--duration-fast) var(--easing-standard);
    cursor: pointer;
    border-left: 3px solid transparent;

    .menu-title {
      flex: 1;
      font-size: 14px;
      font-weight: var(--font-weight-medium);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    &:hover {
      background-color: rgba(255, 255, 255, 0.05);
      color: #fff;
    }

    &.is-active {
      background-color: var(--primary-blue-light);
      color: #fff;
      border-left-color: var(--primary-blue);
      font-weight: var(--font-weight-semibold);
    }
  }

  .submenu {
    .submenu-title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 20px;
      color: var(--neutral-gray-20);
      cursor: pointer;
      transition: all var(--duration-fast) var(--easing-standard);
      border-left: 3px solid transparent;

      .menu-title {
        flex: 1;
        font-size: 14px;
        font-weight: var(--font-weight-medium);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .menu-arrow {
        font-size: 10px;
        margin-left: 8px;
        transition: transform var(--duration-fast) var(--easing-standard);
        color: rgba(255, 255, 255, 0.6);
      }

      &:hover {
        background-color: rgba(255, 255, 255, 0.05);
        color: #fff;
        
        .menu-arrow {
          color: rgba(255, 255, 255, 0.9);
        }
      }

      &.disabled {
        cursor: not-allowed;
        opacity: 0.5;

        &:hover {
          background-color: transparent;
          color: var(--neutral-gray-20);
        }
      }
    }

    .submenu-wrapper {
      background-color: rgba(0, 0, 0, 0.2);

      .nested-menu {
        .menu-link {
          padding-left: 40px;
        }

        .submenu-title {
          padding-left: 40px;
        }
      }
    }
  }
}

// Transition animations
.el-zoom-in-top-enter-active,
.el-zoom-in-top-leave-active {
  opacity: 1;
  transform: scaleY(1);
  transition: transform 0.3s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.3s cubic-bezier(0.23, 1, 0.32, 1);
  transform-origin: center top;
}

.el-zoom-in-top-enter-from,
.el-zoom-in-top-leave-to {
  opacity: 0;
  transform: scaleY(0);
}
</style>
