<template>
  <nav
    ref="navRef"
    :class="[
      styles.nav,
      isScrolled ? styles.scrolled : styles.notScrolled,
      'transition-all duration-300'
    ]"
  >
    <div :class="styles.container">
      <div :class="styles.inner">
        <!-- Logo -->
        <div :class="styles.logoButton" @click="() => scrollToSection('hero')">
          <div :class="styles.logoIconWrapper">
            <Code :class="styles.logoIcon" />
          </div>
          <span :class="styles.logoText">FusionCode</span>
        </div>

        <!-- Desktop Navigation -->
        <div :class="styles.desktopNav">
          <button
            v-for="{ id, label } in navItems"
            :key="id"
            @click="() => scrollToSection(id)"
            :class="[
              styles.navButton,
              activeSection === id ? styles.navButtonActive : styles.navButtonInactive
            ]"
          >
            {{ label }}
          </button>
        </div>

        <!-- Mobile Menu Toggle -->
        <div :class="styles.menuToggleWrapper">
          <button :class="styles.menuToggle" @click="toggleMenu">
            <X v-if="isOpen" :size="20" />
            <Menu v-else :size="20" />
          </button>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <div
        v-if="isOpen || isAnimatingOut"
        :class="[
          styles.mobileNav,
          isAnimatingOut ? styles.mobileNavLeave : styles.mobileNavEnter
        ]"
      >
        <div :class="styles.mobileNavContent">
          <button
            v-for="{ id, label } in navItems"
            :key="id"
            @click="() => scrollToSection(id)"
            :class="[
              styles.mobileNavItem,
              activeSection === id ? styles.navButtonActive : styles.navButtonInactive
            ]"
          >
            {{ label }}
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useEventListener } from '@vueuse/core'
import { Menu, X, Code } from 'lucide-vue-next'
import styles from './Navigation.module.css'

// Navigation items
const navItems = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'strengths', label: 'Strengths' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
]

// Reactive state
const isOpen = ref(false)
const isAnimatingOut = ref(false)
const activeSection = ref('hero')
const isScrolled = ref(false)
const navRef = ref<HTMLElement | null>(null)

// Sync navigation height with CSS variable
const syncHeight = () => {
  if (navRef.value) {
    document.documentElement.style.setProperty(
      '--nav-height',
      `${navRef.value.offsetHeight}px`
    )
  }
}

// Handle scroll background
useEventListener('scroll', () => {
  isScrolled.value = window.scrollY > 50
}, { passive: true })

// Calculate active section (scroll spy)
const calcActiveSection = () => {
  const headH = navRef.value?.offsetHeight ?? 0
  let currentId = navItems[0].id

  for (const { id } of navItems) {
    const el = document.getElementById(id)
    if (!el) continue

    const offset = el.getBoundingClientRect().top - headH
    if (offset <= 0) {
      currentId = id
    } else {
      break
    }
  }

  activeSection.value = currentId
}

// Scroll spy with RAF throttling
let ticking = false
useEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      calcActiveSection()
      ticking = false
    })
    ticking = true
  }
}, { passive: true })

useEventListener('resize', () => {
  syncHeight()
  calcActiveSection()
})

// Close mobile menu with animation
const closeMobileMenu = () => {
  if (isOpen.value) {
    isAnimatingOut.value = true
    setTimeout(() => {
      isOpen.value = false
      isAnimatingOut.value = false
    }, 250)
  }
}

// Smooth scroll to section
const scrollToSection = (id: string) => {
  const el = document.getElementById(id)
  if (el) {
    const headH = navRef.value?.offsetHeight ?? 0
    const target = Math.min(
      el.getBoundingClientRect().top + window.pageYOffset - headH,
      document.body.scrollHeight - window.innerHeight
    )

    window.scrollTo({ top: target, behavior: 'smooth' })
    activeSection.value = id // Immediately highlight the section
  }
  closeMobileMenu()
}

// Toggle mobile menu
const toggleMenu = () => {
  if (isOpen.value) {
    isAnimatingOut.value = true
    setTimeout(() => {
      isOpen.value = false
      isAnimatingOut.value = false
    }, 250)
  } else {
    isOpen.value = true
  }
}

onMounted(async () => {
  await nextTick()
  syncHeight()
  calcActiveSection()
})
</script>