<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
    <div class="container-fluid">
      <!-- Logo / Brand -->
      <a class="navbar-brand" href="/">
        <i class="bi bi-factory"></i>
        AI Factory
      </a>

      <!-- Navbar Toggle for Mobile -->
      <button 
        class="navbar-toggler" 
        type="button" 
        data-bs-toggle="collapse" 
        data-bs-target="#navbarNav"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Menu Items -->
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto">
          <template v-for="item in menuItems">
            <!-- Menu without children -->
            <li v-if="!item.children" :key="item.id" class="nav-item">
              <router-link :to="item.path" class="nav-link">
                <i v-if="item.icon" :class="item.icon"></i>
                {{ item.label }}
              </router-link>
            </li>

            <!-- Menu with children (Dropdown) -->
            <li v-else :key="item.id" class="nav-item dropdown">
              <a 
                class="nav-link dropdown-toggle" 
                href="#" 
                :id="`dropdown-${item.id}`"
                role="button"
                @mouseenter="handleMouseEnter($event)"
                @mouseleave="handleMouseLeave($event)"
              >
                <i v-if="item.icon" :class="item.icon"></i>
                {{ item.label }}
              </a>
              <ul 
                class="dropdown-menu" 
                :aria-labelledby="`dropdown-${item.id}`"
                @mouseenter="handleMouseEnter($event)"
                @mouseleave="handleMouseLeave($event)"
              >
                <template v-for="child in item.children">
                  <!-- Level 2: No children -->
                  <li v-if="!child.children" :key="child.id">
                    <router-link :to="child.path" class="dropdown-item">
                      {{ child.label }}
                    </router-link>
                  </li>

                  <!-- Level 2: Has children (Nested Dropdown) -->
                  <li v-else :key="child.id" class="dropdown-submenu">
                    <a 
                      class="dropdown-item dropdown-toggle" 
                      href="#"
                      @mouseenter="handleMouseEnter($event)"
                      @mouseleave="handleMouseLeave($event)"
                    >
                      {{ child.label }}
                    </a>
                    <ul 
                      class="dropdown-menu"
                      @mouseenter="handleMouseEnter($event)"
                      @mouseleave="handleMouseLeave($event)"
                    >
                      <template v-for="subChild in child.children">
                        <!-- Level 3: No children -->
                        <li v-if="!subChild.children" :key="subChild.id">
                          <router-link :to="subChild.path" class="dropdown-item">
                            {{ subChild.label }}
                          </router-link>
                        </li>

                        <!-- Level 3: Has children (3rd level nested) -->
                        <li v-else :key="subChild.id" class="dropdown-submenu">
                          <a 
                            class="dropdown-item dropdown-toggle" 
                            href="#"
                            @mouseenter="handleMouseEnter($event)"
                            @mouseleave="handleMouseLeave($event)"
                          >
                            {{ subChild.label }}
                          </a>
                          <ul 
                            class="dropdown-menu"
                            @mouseenter="handleMouseEnter($event)"
                            @mouseleave="handleMouseLeave($event)"
                          >
                            <li v-for="deepChild in subChild.children" :key="deepChild.id">
                              <router-link :to="deepChild.path" class="dropdown-item">
                                {{ deepChild.label }}
                              </router-link>
                            </li>
                          </ul>
                        </li>
                      </template>
                    </ul>
                  </li>
                </template>
              </ul>
            </li>
          </template>
        </ul>

        <!-- Right Side Menu (User Info, etc.) -->
        <ul class="navbar-nav">
          <li class="nav-item dropdown">
            <a 
              class="nav-link dropdown-toggle" 
              href="#" 
              id="userDropdown"
              @mouseenter="handleMouseEnter($event)"
              @mouseleave="handleMouseLeave($event)"
            >
              <i class="bi bi-person-circle"></i>
              Admin
            </a>
            <ul 
              class="dropdown-menu dropdown-menu-end" 
              aria-labelledby="userDropdown"
              @mouseenter="handleMouseEnter($event)"
              @mouseleave="handleMouseLeave($event)"
            >
              <li><a class="dropdown-item" href="#">프로필</a></li>
              <li><a class="dropdown-item" href="#">설정</a></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item" href="#">로그아웃</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useMenuStore } from '@/stores/menu'
import { storeToRefs } from 'pinia'

const menuStore = useMenuStore()
const { menuItems } = storeToRefs(menuStore)

// Hover event handlers for smooth dropdown
const handleMouseEnter = (event) => {
  const target = event.currentTarget
  const dropdown = target.classList.contains('dropdown-menu') 
    ? target 
    : target.nextElementSibling

  if (dropdown && dropdown.classList.contains('dropdown-menu')) {
    dropdown.classList.add('show')
  }
  
  // Also add 'show' to parent dropdown-toggle
  if (target.classList.contains('nav-link') || target.classList.contains('dropdown-item')) {
    target.classList.add('show')
  }
}

const handleMouseLeave = (event) => {
  const target = event.currentTarget
  const dropdown = target.classList.contains('dropdown-menu') 
    ? target 
    : target.nextElementSibling

  setTimeout(() => {
    if (dropdown && dropdown.classList.contains('dropdown-menu')) {
      if (!dropdown.matches(':hover') && !target.matches(':hover')) {
        dropdown.classList.remove('show')
        target.classList.remove('show')
      }
    }
  }, 100)
}
</script>

<style scoped>
/* Navbar Styling */
.navbar {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.navbar-brand {
  font-weight: 600;
  font-size: 1.25rem;
}

.navbar-brand i {
  margin-right: 8px;
  font-size: 1.5rem;
}

.nav-link {
  padding: 0.5rem 1rem;
  transition: background-color 0.3s ease;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}

.nav-link i {
  margin-right: 5px;
}

/* Dropdown Menu Styling */
.dropdown-menu {
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  margin-top: 0;
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.dropdown-item {
  padding: 0.5rem 1.5rem;
  transition: background-color 0.2s ease;
}

.dropdown-item:hover {
  background-color: #f0f2f5;
  color: #1890ff;
}

/* Nested Dropdown (Submenu) Styling */
.dropdown-submenu {
  position: relative;
}

.dropdown-submenu > .dropdown-menu {
  position: absolute;
  top: 0;
  left: 100%;
  margin-top: 0;
  margin-left: 0;
}

.dropdown-submenu:hover > .dropdown-menu {
  display: block;
}

.dropdown-toggle::after {
  margin-left: 0.5rem;
}

.dropdown-submenu .dropdown-toggle::after {
  content: "\f285"; /* Bootstrap Icons: chevron-right */
  font-family: "bootstrap-icons";
  border: none;
  vertical-align: 0;
  margin-left: auto;
  float: right;
  margin-top: 0.25rem;
}

/* Smooth Show Animation */
.dropdown-menu.show {
  display: block;
  animation: fadeInDown 0.3s ease;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Bootstrap Icons Import (if not globally imported) */
@import url('https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css');
</style>
