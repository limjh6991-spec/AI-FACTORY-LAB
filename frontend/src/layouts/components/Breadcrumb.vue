<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="breadcrumb-wrapper">
    <span v-for="(item, index) in breadcrumbs" :key="index" class="breadcrumb-item">
      <router-link v-if="item.path && index !== breadcrumbs.length - 1" :to="item.path">
        {{ item.label }}
      </router-link>
      <span v-else class="current">{{ item.label }}</span>
      <i v-if="index !== breadcrumbs.length - 1" class="bi bi-chevron-right separator"></i>
    </span>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const breadcrumbs = computed(() => {
  const matched = route.matched.filter(item => item.name)
  
  const breadcrumbList = matched.map(item => ({
    label: item.meta?.title || item.name,
    path: item.path
  }))

  // Add home if not present
  if (breadcrumbList.length === 0 || breadcrumbList[0].label !== 'Home') {
    breadcrumbList.unshift({ label: '홈', path: '/' })
  }

  return breadcrumbList
})
</script>

<style lang="scss" scoped>
.breadcrumb-wrapper {
  display: flex;
  align-items: center;
  font-size: 14px;

  .breadcrumb-item {
    display: flex;
    align-items: center;

    a {
      color: #97a8be;
      text-decoration: none;
      transition: color 0.3s;

      &:hover {
        color: #1890ff;
      }
    }

    .current {
      color: #303133;
      font-weight: 500;
    }

    .separator {
      margin: 0 8px;
      color: #97a8be;
      font-size: 12px;
    }
  }
}
</style>
