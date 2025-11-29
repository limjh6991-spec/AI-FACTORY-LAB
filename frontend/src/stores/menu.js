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

  // Helper: API 응답을 프론트엔드 형식으로 변환
  const mapMenuData = (menu) => {
    return {
      menuId: menu.menuId,
      upMenuId: menu.upMenuId,
      menuNm: menu.menuName || menu.menuNm, // API는 menuName으로 반환
      menuUrl: menu.menuUrl,
      sortNo: menu.sortNo,
      useYn: menu.useYn,
      iconCls: menu.iconCls,
      regDt: menu.regDt,
      children: menu.children ? menu.children.map(mapMenuData) : []
    }
  }

  // Action 1: 메뉴 목록 조회
  const fetchMenuList = async () => {
    isLoading.value = true
    try {
      console.log('🔍 메뉴 API 호출 시작:', `${API_BASE}/tree`)
      const response = await axios.get(`${API_BASE}/tree`)
      console.log('📥 API 응답 받음:', response.data)
      
      // 백엔드가 Tree로 주는 경우 - 필드명 매핑
      if (Array.isArray(response.data)) {
        menus.value = response.data.map(mapMenuData)
        console.log('✅ 메뉴 로드 완료 (개수: ' + menus.value.length + '):', menus.value)
      } else {
        console.warn('⚠️ 예상치 못한 응답 형식:', response.data)
      }
      
    } catch (error) {
      console.error('❌ 메뉴 조회 실패:', error)
      console.error('에러 상세:', error.response)
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

  return {
    // State
    menus,
    flatMenus,
    isLoading,
    
    // Actions
    fetchMenuList,
    addMenu,
    updateMenu,
    deleteMenu
  }
})
