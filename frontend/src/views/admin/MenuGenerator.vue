<template>
  <div class="menu-generator">
    <div class="page-header">
      <h1 class="page-title">
        <i class="bi bi-list-ul"></i>
        메뉴 관리
      </h1>
      <p class="page-description">시스템 메뉴를 동적으로 생성하고 관리합니다</p>
    </div>

    <div class="row">
      <!-- Left Panel: Menu Tree -->
      <div class="col-md-4">
        <div class="card">
          <div class="card-header d-flex justify-content-between align-items-center">
            <h5 class="mb-0">
              <i class="bi bi-folder-tree"></i>
              메뉴 트리
            </h5>
            <button class="btn btn-sm btn-primary" @click="addRootMenu">
              <i class="bi bi-plus-circle"></i>
              최상위 메뉴 추가
            </button>
          </div>
          <div class="card-body p-0">
            <!-- Loading Spinner -->
            <div v-if="menuStore.isLoading" class="text-center py-5">
              <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>

            <!-- Menu Tree -->
            <div v-else-if="menuStore.menus.length > 0" class="menu-tree">
              <MenuTreeItem
                v-for="menu in menuStore.menus"
                :key="menu.menuId"
                :menu="menu"
                :selected-id="selectedMenuId"
                @select="selectMenu"
              />
            </div>

            <!-- Empty State -->
            <div v-else class="text-center py-5 text-muted">
              <i class="bi bi-folder-x" style="font-size: 48px;"></i>
              <p class="mt-3">등록된 메뉴가 없습니다</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Panel: Detail Form -->
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">
            <h5 class="mb-0">
              <i class="bi bi-pencil-square"></i>
              {{ formModel.menuId ? '메뉴 수정' : '신규 메뉴 등록' }}
            </h5>
          </div>
          <div class="card-body">
            <form @submit.prevent="saveMenu">
              <!-- 메뉴 ID (수정 시 읽기 전용) -->
              <div class="mb-3">
                <label class="form-label">메뉴 ID <span class="text-danger">*</span></label>
                <input
                  v-model="formModel.menuId"
                  type="text"
                  class="form-control"
                  :readonly="isEditMode"
                  required
                  placeholder="예: MENU001"
                />
              </div>

              <!-- 상위 메뉴 ID -->
              <div class="mb-3">
                <label class="form-label">상위 메뉴 ID</label>
                <input
                  v-model="formModel.upMenuId"
                  type="text"
                  class="form-control"
                  readonly
                  placeholder="최상위 메뉴는 비워두세요"
                />
              </div>

              <!-- 메뉴명 -->
              <div class="mb-3">
                <label class="form-label">메뉴명 <span class="text-danger">*</span></label>
                <input
                  v-model="formModel.menuName"
                  type="text"
                  class="form-control"
                  required
                  placeholder="예: 제품 관리"
                />
              </div>

              <!-- 경로 -->
              <div class="mb-3">
                <label class="form-label">경로 (Vue Router Path)</label>
                <input
                  v-model="formModel.menuUrl"
                  type="text"
                  class="form-control"
                  placeholder="예: /product/list"
                />
              </div>

              <!-- 아이콘 -->
              <div class="mb-3">
                <label class="form-label">아이콘 클래스</label>
                <div class="input-group">
                  <span class="input-group-text">
                    <i :class="formModel.iconCls || 'bi-question-circle'"></i>
                  </span>
                  <input
                    v-model="formModel.iconCls"
                    type="text"
                    class="form-control"
                    placeholder="예: bi-box"
                  />
                </div>
                <small class="form-text text-muted">
                  <a href="https://icons.getbootstrap.com/" target="_blank">Bootstrap Icons</a> 참고
                </small>
              </div>

              <!-- 정렬 순서 -->
              <div class="mb-3">
                <label class="form-label">정렬 순서</label>
                <input
                  v-model.number="formModel.sortNo"
                  type="number"
                  class="form-control"
                  placeholder="0"
                />
              </div>

              <!-- 사용 여부 -->
              <div class="mb-3">
                <label class="form-label">사용 여부</label>
                <select v-model="formModel.useYn" class="form-select">
                  <option value="Y">Y (사용)</option>
                  <option value="N">N (미사용)</option>
                </select>
              </div>

              <!-- 버튼 그룹 -->
              <div class="d-flex gap-2">
                <button type="button" class="btn btn-secondary" @click="resetForm">
                  <i class="bi bi-arrow-counterclockwise"></i>
                  초기화
                </button>
                <button type="submit" class="btn btn-primary">
                  <i class="bi bi-save"></i>
                  저장
                </button>
                <button
                  v-if="isEditMode"
                  type="button"
                  class="btn btn-danger"
                  @click="deleteCurrentMenu"
                >
                  <i class="bi bi-trash"></i>
                  삭제
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useMenuStore } from '@/stores/menu'
import MenuTreeItem from './components/MenuTreeItem.vue'

const menuStore = useMenuStore()

// State
const selectedMenuId = ref(null)
const formModel = reactive({
  menuId: '',
  upMenuId: null,
  menuName: '',
  menuUrl: '',
  iconCls: '',
  sortNo: 0,
  useYn: 'Y'
})

const isEditMode = computed(() => !!formModel.menuId && selectedMenuId.value !== null)

// 메뉴 선택
const selectMenu = (menu) => {
  selectedMenuId.value = menu.menuId
  Object.assign(formModel, {
    menuId: menu.menuId,
    upMenuId: menu.upMenuId || null,
    menuName: menu.menuName,
    menuUrl: menu.menuUrl || '',
    iconCls: menu.iconCls || '',
    sortNo: menu.sortNo || 0,
    useYn: menu.useYn || 'Y'
  })
}

// 최상위 메뉴 추가 모드
const addRootMenu = () => {
  resetForm()
  formModel.upMenuId = null
}

// 폼 초기화
const resetForm = () => {
  selectedMenuId.value = null
  Object.assign(formModel, {
    menuId: '',
    upMenuId: null,
    menuName: '',
    menuUrl: '',
    iconCls: '',
    sortNo: 0,
    useYn: 'Y'
  })
}

// 저장
const saveMenu = async () => {
  try {
    const menuData = {
      menu_id: formModel.menuId,
      up_menu_id: formModel.upMenuId || null,
      menu_nm: formModel.menuName,
      menu_url: formModel.menuUrl || null,
      icon_cls: formModel.iconCls || null,
      sort_no: formModel.sortNo,
      use_yn: formModel.useYn
    }

    if (isEditMode.value) {
      await menuStore.updateMenu(menuData)
      alert('✅ 메뉴가 수정되었습니다.')
    } else {
      await menuStore.addMenu(menuData)
      alert('✅ 메뉴가 추가되었습니다.')
    }

    resetForm()
  } catch (error) {
    alert('❌ 저장 실패: ' + error.message)
  }
}

// 삭제
const deleteCurrentMenu = async () => {
  if (!confirm(`"${formModel.menuName}" 메뉴를 삭제하시겠습니까?`)) return

  try {
    await menuStore.deleteMenu(formModel.menuId)
    alert('✅ 메뉴가 삭제되었습니다.')
    resetForm()
  } catch (error) {
    alert('❌ 삭제 실패: ' + error.message)
  }
}

// 초기 로드
onMounted(() => {
  menuStore.fetchMenuList()
})
</script>

<style lang="scss" scoped>
.menu-generator {
  .page-header {
    margin-bottom: 24px;

    .page-title {
      font-size: 28px;
      font-weight: 600;
      color: #303133;
      margin: 0;
      display: flex;
      align-items: center;
      gap: 12px;

      i {
        color: #1890ff;
      }
    }

    .page-description {
      margin: 8px 0 0 0;
      color: #909399;
      font-size: 14px;
    }
  }

  .card {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border: none;
    border-radius: 8px;

    .card-header {
      background: #fff;
      border-bottom: 1px solid #ebeef5;
      padding: 16px 20px;

      h5 {
        font-size: 16px;
        font-weight: 600;
        color: #303133;

        i {
          margin-right: 8px;
          color: #1890ff;
        }
      }
    }
  }

  .menu-tree {
    max-height: 600px;
    overflow-y: auto;
  }

  .form-label {
    font-weight: 500;
    color: #606266;
    font-size: 14px;
  }

  .text-danger {
    color: #f56c6c;
  }
}
</style>
