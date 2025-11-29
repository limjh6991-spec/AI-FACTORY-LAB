import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useMenuStore = defineStore('menu', () => {
  // State
  const menus = ref([]) // 계층형 트리 메뉴
  const flatMenus = ref([]) // 1차원 전체 목록 (관리용)
  const isLoading = ref(false)

  // API Base URL
  const API_BASE = '/api/system/menu'

  // Helper: 트리 구조 변환 (Flat List -> Tree)
  const buildTree = (flatList) => {
    const map = {}
    const roots = []

    // 1단계: 맵 생성
    flatList.forEach(item => {
      map[item.menuId] = { ...item, children: [] }
    })

    // 2단계: 부모-자식 연결
    flatList.forEach(item => {
      if (item.upMenuId && map[item.upMenuId]) {
        map[item.upMenuId].children.push(map[item.menuId])
      } else {
        roots.push(map[item.menuId])
      }
    })

    // 3단계: 정렬 (sortNo 기준)
    const sortRecursive = (nodes) => {
      nodes.sort((a, b) => a.sortNo - b.sortNo)
      nodes.forEach(node => {
        if (node.children && node.children.length > 0) {
          sortRecursive(node.children)
        }
      })
    }
    sortRecursive(roots)

    return roots
  }

  // Action 1: 메뉴 목록 조회
  const fetchMenuList = async () => {
    isLoading.value = true
    try {
      const response = await axios.get(`${API_BASE}/tree`)
      
      // 백엔드가 Tree로 주는 경우
      if (Array.isArray(response.data) && response.data[0]?.children) {
        menus.value = response.data
      } 
      // 백엔드가 Flat List로 주는 경우
      else {
        flatMenus.value = response.data
        menus.value = buildTree(response.data)
      }
      
      console.log('✅ 메뉴 로드 완료:', menus.value)
    } catch (error) {
      console.error('❌ 메뉴 조회 실패:', error)
      menus.value = []
    } finally {
      isLoading.value = false
    }
  }

  // Action 2: 메뉴 추가
  const addMenu = async (menuData) => {
    try {
      const response = await axios.post(API_BASE, menuData)
      console.log('✅ 메뉴 추가 성공:', response.data)
      await fetchMenuList() // 목록 갱신
      return response.data
    } catch (error) {
      console.error('❌ 메뉴 추가 실패:', error)
      throw error
    }
  }

  // Action 3: 메뉴 수정
  const updateMenu = async (menuData) => {
    try {
      const response = await axios.put(API_BASE, menuData)
      console.log('✅ 메뉴 수정 성공:', response.data)
      await fetchMenuList() // 목록 갱신
      return response.data
    } catch (error) {
      console.error('❌ 메뉴 수정 실패:', error)
      throw error
    }
  }

  // Action 4: 메뉴 삭제
  const deleteMenu = async (menuId) => {
    try {
      const response = await axios.delete(`${API_BASE}/${menuId}`)
      console.log('✅ 메뉴 삭제 성공:', response.data)
      await fetchMenuList() // 목록 갱신
      return response.data
    } catch (error) {
      console.error('❌ 메뉴 삭제 실패:', error)
      throw error
    }
  }

  // 기존 정적 메뉴 (화면 생성 전까지 사용)
  const menuItems = ref([
    {
      id: 'dashboard',
      label: '대시보드',
      icon: 'bi-speedometer2',
      path: '/'
    },
    {
      id: 'cost',
      label: '원가 관리',
      icon: 'bi-calculator',
      children: [
        {
          id: 'cost-level1',
          label: '원가 조회',
          icon: 'bi-search',
          children: [
            {
              id: 'cost-001',
              label: '제품별 원가',
              icon: 'bi-box',
              path: '/standard/COST001'
            },
            {
              id: 'cost-002',
              label: '부서별 원가',
              icon: 'bi-building',
              path: '/standard/COST002'
            }
          ]
        }
      ]
    }
  ])

  const adminMenuItems = ref([
    {
      id: 'admin',
      label: '관리자',
      icon: 'bi-gear-fill',
      children: [
        {
          id: 'screen-generator',
          label: '화면 생성기',
          icon: 'bi-magic',
          path: '/admin/screen-generator'
        },
        {
          id: 'menu-generator',
          label: '메뉴 관리',
          icon: 'bi-list-ul',
          path: '/admin/menu-generator'
        }
      ]
    }
  ])

  return {
    // State
    menus,
    flatMenus,
    isLoading,
    menuItems,
    adminMenuItems,
    
    // Actions
    fetchMenuList,
    addMenu,
    updateMenu,
    deleteMenu
  }
})
