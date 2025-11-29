<template>
  <div class="sidebar-item">
    <!-- Single Menu Item (no children) -->
    <router-link
      v-if="!item.children"
      :to="item.path"
      class="menu-link"
      active-class="is-active"
    >
      <i v-if="item.icon" :class="item.icon" class="menu-icon"></i>
      <span class="menu-title">{{ item.label }}</span>
    </router-link>

    <!-- Menu with Children (Submenu) -->
    <div v-else class="submenu">
      <div class="submenu-title" @click="toggleSubmenu">
        <i v-if="item.icon" :class="item.icon" class="menu-icon"></i>
        <span class="menu-title">{{ item.label }}</span>
        <i class="bi bi-chevron-down arrow" :class="{ 'is-opened': isOpened }"></i>
      </div>
      
      <transition name="el-zoom-in-top">
        <div v-show="isOpened" class="submenu-wrapper">
          <SidebarItem
            v-for="child in item.children"
            :key="child.id"
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
    padding: 12px 20px;
    color: #bfcbd9;
    text-decoration: none;
    transition: all 0.3s;
    cursor: pointer;

    .menu-icon {
      font-size: 18px;
      margin-right: 10px;
      min-width: 20px;
    }

    .menu-title {
      flex: 1;
      font-size: 14px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
      color: #fff;
    }

    &.is-active {
      background-color: #1890ff;
      color: #fff;
    }
  }

  .submenu {
    .submenu-title {
      display: flex;
      align-items: center;
      padding: 12px 20px;
      color: #bfcbd9;
      cursor: pointer;
      transition: all 0.3s;

      .menu-icon {
        font-size: 18px;
        margin-right: 10px;
        min-width: 20px;
      }

      .menu-title {
        flex: 1;
        font-size: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .arrow {
        font-size: 12px;
        transition: transform 0.3s;

        &.is-opened {
          transform: rotate(180deg);
        }
      }

      &:hover {
        background-color: rgba(0, 0, 0, 0.1);
        color: #fff;
      }
    }

    .submenu-wrapper {
      background-color: rgba(0, 0, 0, 0.1);

      .nested-menu {
        .menu-link {
          padding-left: 50px;
        }

        .submenu-title {
          padding-left: 50px;
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
