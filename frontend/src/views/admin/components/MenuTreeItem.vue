<template>
  <div class="menu-tree-item">
    <div
      class="menu-item"
      :class="{ active: menu.menuId === selectedId }"
      @click="$emit('select', menu)"
    >
      <i :class="menu.iconCls || 'bi-folder'" class="menu-icon"></i>
      <span class="menu-name">{{ menu.menuNm || menu.menuName }}</span>
      <span v-if="menu.children && menu.children.length > 0" class="badge bg-secondary ms-2">
        {{ menu.children.length }}
      </span>
    </div>

    <!-- 하위 메뉴 (재귀) -->
    <div v-if="menu.children && menu.children.length > 0" class="menu-children">
      <MenuTreeItem
        v-for="child in menu.children"
        :key="child.menuId"
        :menu="child"
        :selected-id="selectedId"
        @select="$emit('select', $event)"
      />
    </div>
  </div>
</template>

<script setup>
/* eslint-disable no-undef */
defineProps({
  menu: {
    type: Object,
    required: true
  },
  selectedId: {
    type: String,
    default: null
  }
})

defineEmits(['select'])
/* eslint-enable no-undef */
</script>

<style lang="scss" scoped>
.menu-tree-item {
  .menu-item {
    display: flex;
    align-items: center;
    padding: 10px 16px;
    cursor: pointer;
    transition: all 0.3s;
    border-left: 3px solid transparent;

    &:hover {
      background: #f5f7fa;
    }

    &.active {
      background: #ecf5ff;
      border-left-color: #1890ff;
      color: #1890ff;
      font-weight: 500;
    }

    .menu-icon {
      margin-right: 8px;
      font-size: 16px;
    }

    .menu-name {
      flex: 1;
    }
  }

  .menu-children {
    padding-left: 24px;
    border-left: 1px dashed #dcdfe6;
    margin-left: 16px;
  }
}
</style>
