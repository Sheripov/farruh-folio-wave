<template>
  <div :class="styles.container">
    <!-- Background elements -->
    <div :class="styles.backgroundElement1"></div>
    <div :class="styles.backgroundElement2"></div>
    
    <div :class="styles.content">
      <!-- 404 Number -->
      <div :class="styles.numberContainer">
        <h1 :class="styles.number">
          404
        </h1>
        <div :class="styles.divider"></div>
      </div>

      <!-- Error message -->
      <div :class="styles.textContent">
        <h2 :class="styles.title">
          Page Not Found
        </h2>
        <p :class="styles.description">
          The page you're looking for doesn't exist or has been moved.
        </p>
      </div>

      <!-- Action buttons -->
      <div :class="styles.buttonContainer">
        <RouterLink 
          to="/" 
          :class="styles.primaryButton"
        >
          <Home :class="styles.buttonIcon" />
          Go Home
        </RouterLink>
        <button 
          @click="goBack"
          :class="styles.secondaryButton"
        >
          <ArrowLeft :class="styles.buttonIcon" />
          Go Back
        </button>
      </div>

      <!-- Decorative elements -->
      <div :class="styles.dotsContainer">
        <div :class="styles.dot"></div>
        <div :class="styles.dot"></div>
        <div :class="styles.dot"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { Home, ArrowLeft } from 'lucide-vue-next'
import styles from './NotFound.module.css'

const route = useRoute()

const goBack = () => {
  window.history.back()
}

onMounted(() => {
  // Only log in development
  if (import.meta.env.DEV) {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      route.path
    )
  }
})
</script>