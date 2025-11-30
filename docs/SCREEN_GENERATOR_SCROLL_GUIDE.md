# 화면생성기 스크롤 구현 가이드

## 개요
RealGrid를 포함한 화면생성기 UI에서 스크롤을 효과적으로 처리하기 위한 구현 가이드입니다.

---

## 스크롤 성능 최적화

### 1. Virtual Scrolling (선택사항)
대량의 검증 메시지나 API 목록이 있을 때:

```vue
<template>
  <RecycleScroller
    v-if="validationMessages.length > 100"
    :items="validationMessages"
    :item-size="80"
    key-field="id"
    class="validation-scroller"
  >
    <template #default="{ item }">
      <div class="validation-message">
        {{ item.title }}
      </div>
    </template>
  </RecycleScroller>
</template>

<script setup>
import { RecycleScroller } from 'vue-virtual-scroller';
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';
</script>
```

### 2. Intersection Observer (Lazy Loading)
탭 컨텐츠 지연 렌더링:

```javascript
// 뷰포트에 보이는 탭만 렌더링
const observeTab = (tabId) => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // 탭이 보이면 데이터 로드
        loadTabData(tabId);
      }
    });
  }, { threshold: 0.1 });
  
  const tabElement = document.getElementById(`tab-${tabId}`);
  if (tabElement) {
    observer.observe(tabElement);
  }
};
```

### 3. 스크롤 이벤트 최적화
탭 헤더 그림자 효과 (throttle 적용):

```javascript
import { throttle } from 'lodash-es';

const tabContainer = ref(null);
const isScrolled = ref(false);

const handleScroll = throttle(() => {
  if (tabContainer.value) {
    isScrolled.value = tabContainer.value.scrollTop > 0;
  }
}, 100); // 100ms마다 실행

onMounted(() => {
  tabContainer.value?.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  tabContainer.value?.removeEventListener('scroll', handleScroll);
});
```

### 4. RealGrid 스크롤 최적화
```javascript
// RealGrid 설정
const gridOptions = {
  displayMode: 'simple', // 단순 모드 (성능 향상)
  header: { height: 35 },
  footer: { visible: false },
  
  // 스크롤 최적화
  virtualScrolling: true, // 가상 스크롤 활성화
  scrollBarVisibility: 'auto',
  rowHeight: 30, // 고정 행 높이 (가변 높이는 성능 저하)
  
  // 렌더링 최적화
  lazyRendering: true,
  renderBufferSize: 10, // 화면 밖 렌더링 버퍼
};
```

---

## 스크롤 UX 개선

### 1. Smooth Scrolling
```scss
.upload-section,
.preview-section,
.tab-content {
  scroll-behavior: smooth; // 부드러운 스크롤
  
  // Safari에서도 작동하도록
  -webkit-overflow-scrolling: touch;
}
```

### 2. 스크롤 상단 이동 버튼
```vue
<template>
  <Transition name="fade">
    <button
      v-show="showScrollTop"
      class="scroll-to-top"
      @click="scrollToTop"
      aria-label="맨 위로 이동"
    >
      <i class="bi bi-arrow-up"></i>
    </button>
  </Transition>
</template>

<script setup>
const showScrollTop = ref(false);
const tabContainer = ref(null);

const handleScroll = () => {
  showScrollTop.value = tabContainer.value?.scrollTop > 300;
};

const scrollToTop = () => {
  tabContainer.value?.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};
</script>

<style scoped>
.scroll-to-top {
  position: fixed;
  bottom: 200px; // 액션 푸터 위
  right: 40px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: var(--primary-blue);
  color: white;
  border: none;
  box-shadow: var(--elevation-2);
  cursor: pointer;
  z-index: 100;
  transition: all 0.3s;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--elevation-3);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
```

### 3. 스크롤 진행률 표시
```vue
<template>
  <div class="scroll-progress-container">
    <div 
      class="scroll-progress-bar" 
      :style="{ width: scrollProgress + '%' }"
    ></div>
  </div>
</template>

<script setup>
const scrollProgress = ref(0);

const updateScrollProgress = () => {
  const container = tabContainer.value;
  if (!container) return;
  
  const scrollTop = container.scrollTop;
  const scrollHeight = container.scrollHeight - container.clientHeight;
  const progress = (scrollTop / scrollHeight) * 100;
  
  scrollProgress.value = Math.min(100, Math.max(0, progress));
};

onMounted(() => {
  tabContainer.value?.addEventListener('scroll', updateScrollProgress);
});
</script>

<style scoped>
.scroll-progress-container {
  position: sticky;
  top: 0;
  height: 3px;
  background: var(--neutral-gray-10);
  z-index: 11;
}

.scroll-progress-bar {
  height: 100%;
  background: linear-gradient(90deg, var(--primary-blue) 0%, #00BCF2 100%);
  transition: width 0.1s ease-out;
}
</style>
```

### 4. 키보드 스크롤 단축키
```javascript
// 전역 키보드 이벤트
onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
});

const handleKeydown = (e) => {
  const container = tabContainer.value;
  if (!container) return;
  
  switch(e.key) {
    case 'Home':
      e.preventDefault();
      container.scrollTo({ top: 0, behavior: 'smooth' });
      break;
      
    case 'End':
      e.preventDefault();
      container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
      break;
      
    case 'PageUp':
      e.preventDefault();
      container.scrollBy({ top: -container.clientHeight * 0.8, behavior: 'smooth' });
      break;
      
    case 'PageDown':
      e.preventDefault();
      container.scrollBy({ top: container.clientHeight * 0.8, behavior: 'smooth' });
      break;
  }
};
```

---

## 디버깅 가이드

### 스크롤 문제 해결 체크리스트

#### ✅ 스크롤이 안될 때
```scss
// 1. 부모 요소에 min-height: 0 추가
.parent {
  display: flex;
  flex-direction: column;
  min-height: 0; // 필수!
}

// 2. overflow 속성 확인
.scrollable {
  overflow-y: auto; // scroll 또는 auto
  max-height: 500px; // 또는 flex: 1
}

// 3. 자식 요소가 부모를 벗어나는지 확인
.child {
  height: auto; // 고정 높이 제거
}
```

#### ✅ RealGrid 스크롤 문제
```javascript
// 그리드 높이가 0일 때
// 1. 컨테이너에 명시적 높이 설정
const gridContainer = {
  height: '400px', // 또는 flex: 1
  minHeight: '300px'
};

// 2. 그리드 옵션 확인
const options = {
  displayMode: 'simple', // 'grid'가 아님
  header: { height: 35 }, // 명시적 높이
  footer: { visible: false }
};

// 3. 데이터 로드 후 그리드 갱신
onMounted(() => {
  nextTick(() => {
    gridView.value?.resetSize(); // 크기 재계산
  });
});
```

#### ✅ 중첩 스크롤 문제
```html
<!-- 나쁜 예: 이중 스크롤 -->
<div style="overflow-y: auto;">
  <div style="overflow-y: auto;">
    컨텐츠
  </div>
</div>

<!-- 좋은 예: 단일 스크롤 -->
<div style="overflow-y: auto;">
  <div style="overflow-y: visible;">
    컨텐츠
  </div>
</div>
```

---

## 완전한 구현 예시

### Vue 컴포넌트 (스크롤 최적화)
```vue
<template>
  <div class="screen-generator">
    <!-- 헤더 (고정) -->
    <div class="page-header">
      <h1>화면 생성기</h1>
    </div>

    <!-- 메인 컨텐츠 (Flex 컨테이너) -->
    <div class="generator-content">
      <!-- 좌측 패널 (독립 스크롤) -->
      <div class="upload-section">
        <div class="section-card">
          <div class="card-header">Excel 업로드</div>
          <div class="card-body">
            <DropZone />
            <ProgressBar v-if="isUploading" :progress="uploadProgress" />
            <TemplateDownload />
          </div>
        </div>
      </div>

      <!-- 우측 패널 (독립 스크롤) -->
      <div class="preview-section">
        <div class="section-card">
          <!-- 탭 헤더 (sticky) -->
          <div class="preview-tabs" :class="{ scrolled: isScrolled }">
            <!-- 스크롤 진행률 -->
            <div class="scroll-progress-bar" :style="{ width: scrollProgress + '%' }"></div>
            
            <button
              v-for="tab in tabs"
              :key="tab.id"
              class="tab-button"
              :class="{ active: currentTab === tab.id }"
              @click="currentTab = tab.id"
            >
              <i :class="tab.icon"></i>
              {{ tab.label }}
            </button>
          </div>

          <!-- 탭 컨텐츠 (스크롤 영역) -->
          <div ref="tabContainer" class="tab-content" @scroll="handleScroll">
            <!-- 그리드컬럼 탭 -->
            <div v-show="currentTab === 'columns'" class="tab-panel">
              <div class="grid-preview-container">
                <RealGrid
                  ref="gridView"
                  :columns="gridColumns"
                  :data="[]"
                  :options="gridOptions"
                  style="height: 400px;"
                />
              </div>
              <div class="column-summary">
                <p>총 {{ gridColumns.length }}개 컬럼 정의됨</p>
              </div>
            </div>

            <!-- 기본정보 탭 -->
            <div v-show="currentTab === 'basic'" class="tab-panel">
              <div class="info-grid">
                <div v-for="item in basicInfo" :key="item.key" class="info-item">
                  <label>{{ item.label }}</label>
                  <div>{{ item.value }}</div>
                </div>
              </div>
            </div>

            <!-- 검증결과 탭 -->
            <div v-show="currentTab === 'validation'" class="tab-panel">
              <!-- Virtual Scrolling (메시지 많을 때) -->
              <RecycleScroller
                v-if="validationMessages.length > 100"
                :items="validationMessages"
                :item-size="80"
                key-field="id"
                class="validation-scroller"
              >
                <template #default="{ item }">
                  <div class="validation-message" :class="'message-' + item.type">
                    <i :class="getMessageIcon(item.type)"></i>
                    <strong>{{ item.title }}</strong>
                    <p>{{ item.description }}</p>
                  </div>
                </template>
              </RecycleScroller>

              <!-- 일반 렌더링 (메시지 적을 때) -->
              <div v-else class="validation-messages">
                <div
                  v-for="(message, index) in validationMessages"
                  :key="index"
                  class="validation-message"
                  :class="'message-' + message.type"
                >
                  <i :class="getMessageIcon(message.type)"></i>
                  <strong>{{ message.title }}</strong>
                  <p>{{ message.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 상단 이동 버튼 -->
        <Transition name="fade">
          <button
            v-show="showScrollTop"
            @click="scrollToTop"
            class="scroll-to-top"
            aria-label="맨 위로 이동"
          >
            <i class="bi bi-arrow-up"></i>
          </button>
        </Transition>
      </div>
    </div>

    <!-- 푸터 (고정) -->
    <div class="action-footer">
      <div class="action-buttons">
        <button @click="resetAll" class="btn-secondary">초기화</button>
        <button @click="generateScreen" class="btn-primary" :disabled="!canGenerate">
          화면 생성
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue';
import { throttle } from 'lodash-es';
import RealGrid from '@/components/RealGrid.vue';
import { RecycleScroller } from 'vue-virtual-scroller';

// 상태 관리
const currentTab = ref('basic');
const tabContainer = ref(null);
const gridView = ref(null);

// 스크롤 상태
const isScrolled = ref(false);
const scrollProgress = ref(0);
const showScrollTop = ref(false);

// 탭 정의
const tabs = [
  { id: 'basic', label: '기본정보', icon: 'bi bi-info-circle' },
  { id: 'columns', label: '그리드컬럼', icon: 'bi bi-table' },
  { id: 'search', label: '검색조건', icon: 'bi bi-search' },
  { id: 'buttons', label: '버튼정의', icon: 'bi bi-ui-radios' },
  { id: 'api', label: 'API정의', icon: 'bi bi-cloud' },
  { id: 'validation', label: '검증결과', icon: 'bi bi-check-circle' }
];

// 스크롤 이벤트 핸들러 (Throttle)
const handleScroll = throttle(() => {
  if (!tabContainer.value) return;
  
  const { scrollTop, scrollHeight, clientHeight } = tabContainer.value;
  
  // 탭 헤더 그림자 효과
  isScrolled.value = scrollTop > 0;
  
  // 스크롤 진행률 계산
  const maxScroll = scrollHeight - clientHeight;
  if (maxScroll > 0) {
    const progress = (scrollTop / maxScroll) * 100;
    scrollProgress.value = Math.min(100, Math.max(0, progress));
  }
  
  // 상단 이동 버튼 표시 여부
  showScrollTop.value = scrollTop > 300;
}, 100);

// 상단으로 스크롤
const scrollToTop = () => {
  tabContainer.value?.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

// 탭 전환 시 RealGrid 크기 갱신
watch(currentTab, (newTab) => {
  if (newTab === 'columns') {
    nextTick(() => {
      gridView.value?.resetSize();
    });
  }
});

// 키보드 단축키
const handleKeydown = (e) => {
  const container = tabContainer.value;
  if (!container) return;
  
  switch(e.key) {
    case 'Home':
      e.preventDefault();
      container.scrollTo({ top: 0, behavior: 'smooth' });
      break;
    case 'End':
      e.preventDefault();
      container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
      break;
    case 'PageUp':
      e.preventDefault();
      container.scrollBy({ top: -container.clientHeight * 0.8, behavior: 'smooth' });
      break;
    case 'PageDown':
      e.preventDefault();
      container.scrollBy({ top: container.clientHeight * 0.8, behavior: 'smooth' });
      break;
  }
};

// 라이프사이클
onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
});

// RealGrid 옵션
const gridOptions = {
  displayMode: 'simple',
  header: { height: 35 },
  footer: { visible: false },
  virtualScrolling: true,
  scrollBarVisibility: 'auto',
  rowHeight: 30,
  lazyRendering: true,
  renderBufferSize: 10
};
</script>

<style scoped>
/* ===== 전체 레이아웃 ===== */
.screen-generator {
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden; /* 전체 페이지 스크롤 방지 */
}

.page-header {
  flex-shrink: 0;
  height: 100px;
  padding: var(--spacing-lg);
  background: white;
  border-bottom: 1px solid var(--neutral-gray-20);
}

.generator-content {
  flex: 1;
  min-height: 0; /* 중요! Flexbox 스크롤 버그 방지 */
  display: grid;
  grid-template-columns: 500px 1fr;
  gap: 20px;
  padding: 20px;
  overflow: hidden;
}

.action-footer {
  flex-shrink: 0;
  max-height: 160px;
  padding: var(--spacing-xl);
  background: white;
  border-top: 1px solid var(--neutral-gray-20);
}

/* ===== 스크롤 영역 ===== */
.upload-section,
.preview-section {
  min-height: 0; /* 중요! */
  overflow-y: auto;
  overflow-x: hidden;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch; /* iOS 부드러운 스크롤 */
  
  /* 커스텀 스크롤바 (Webkit) */
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    
    &:hover {
      background-color: rgba(0, 0, 0, 0.3);
    }
  }
  
  &::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0.05);
  }
}

/* ===== 탭 영역 ===== */
.preview-tabs {
  position: sticky;
  top: 0;
  z-index: 10;
  background: white;
  border-bottom: 2px solid var(--neutral-gray-20);
  transition: box-shadow 0.3s;
  
  &.scrolled {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
}

.scroll-progress-bar {
  position: absolute;
  top: 0;
  left: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--primary-blue) 0%, #00BCF2 100%);
  transition: width 0.1s ease-out;
  z-index: 11;
}

.tab-content {
  min-height: 0; /* 중요! */
  overflow-y: auto;
  padding: var(--spacing-lg);
}

.tab-panel {
  animation: fadeIn 0.3s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ===== RealGrid 컨테이너 ===== */
.grid-preview-container {
  height: 400px; /* 고정 높이 */
  border: 1px solid var(--neutral-gray-20);
  border-radius: var(--border-radius-md);
  overflow: hidden; /* RealGrid 자체 스크롤 사용 */
}

/* ===== 상단 이동 버튼 ===== */
.scroll-to-top {
  position: fixed;
  bottom: 200px;
  right: 40px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: var(--primary-blue);
  color: white;
  border: none;
  box-shadow: var(--elevation-2);
  cursor: pointer;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--elevation-3);
  }
  
  i {
    font-size: 20px;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* ===== 반응형 (모바일) ===== */
@media (max-width: 1199px) {
  .screen-generator {
    height: auto; /* 고정 높이 해제 */
  }
  
  .generator-content {
    grid-template-columns: 1fr; /* 세로 배치 */
    height: auto;
  }
  
  .upload-section,
  .preview-section {
    max-height: none; /* 스크롤 제한 해제 */
    overflow-y: visible;
    
    /* 모바일에서는 스크롤바 숨김 */
    &::-webkit-scrollbar {
      width: 0;
    }
  }
  
  .scroll-to-top {
    bottom: 100px;
    right: 20px;
    width: 44px;
    height: 44px;
  }
}
</style>
```

---

**문서 버전**: 1.0  
**최종 업데이트**: 2025년 11월 30일  
**작성자**: AI Factory Lab Team  
**관련 문서**: SCREEN_GENERATOR_UI_DESIGN.md
