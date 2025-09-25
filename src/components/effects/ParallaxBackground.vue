<template>
  <div :class="styles.container">
    <!-- Static gradient background - FIXED NO SCROLL TRANSFORM -->
    <div 
      :class="styles.gradientBackground"
      :style="{
        opacity: finalConfig.backgroundOpacity,
      }"
    />
    
    <!-- Floating geometric shapes -->
    <div :class="styles.floatingLayer">
      <!-- Large floating circles -->
      <div 
        :class="styles.floatingShape"
        :style="{
          width: `${finalConfig.largeShapesSizes[0]}px`,
          height: `${finalConfig.largeShapesSizes[0]}px`,
          top: '10%',
          left: '10%',
          opacity: finalConfig.largeShapesOpacity,
          background: `linear-gradient(to right, rgba(96, 165, 250, ${finalConfig.largeShapesOpacity}), rgba(139, 92, 246, ${finalConfig.largeShapesOpacity}))`,
          filter: getBlurFilter(finalConfig.blurIntensity),
          transform: `translate3d(${(smoothMousePosition.x - 50) * finalConfig.mouseIntensity}px, ${(smoothMousePosition.y - 50) * finalConfig.mouseIntensity + smoothScrollY * 0.05}px, 0)`,
        }"
      />
      <div 
        :class="styles.floatingShape"
        :style="{
          width: `${finalConfig.largeShapesSizes[1]}px`,
          height: `${finalConfig.largeShapesSizes[1]}px`,
          top: '60%',
          right: '10%',
          opacity: finalConfig.largeShapesOpacity,
          background: `linear-gradient(to right, rgba(251, 191, 36, ${finalConfig.largeShapesOpacity}), rgba(220, 38, 38, ${finalConfig.largeShapesOpacity}))`,
          filter: getBlurFilter(finalConfig.blurIntensity),
          transform: `translate3d(${(smoothMousePosition.x - 50) * -finalConfig.mouseIntensity * 1.5}px, ${(smoothMousePosition.y - 50) * -finalConfig.mouseIntensity * 1.5 + smoothScrollY * 0.08}px, 0)`,
        }"
      />
      <div 
        :class="styles.floatingShape"
        :style="{
          width: `${finalConfig.largeShapesSizes[2]}px`,
          height: `${finalConfig.largeShapesSizes[2]}px`,
          bottom: '20%',
          left: '20%',
          opacity: finalConfig.largeShapesOpacity,
          background: `linear-gradient(to right, rgba(34, 197, 94, ${finalConfig.largeShapesOpacity}), rgba(59, 130, 246, ${finalConfig.largeShapesOpacity}))`,
          filter: getBlurFilter(finalConfig.blurIntensity),
          transform: `translate3d(${(smoothMousePosition.x - 50) * finalConfig.mouseIntensity * 0.75}px, ${(smoothMousePosition.y - 50) * finalConfig.mouseIntensity * 0.75 + smoothScrollY * 0.04}px, 0)`,
        }"
      />

      <!-- Smaller floating elements -->
      <div
        v-for="element in floatingElements"
        :key="element.id"
        :class="styles.particle"
        :style="{
          width: `${finalConfig.particleSize}px`,
          height: `${finalConfig.particleSize}px`,
          backgroundColor: `rgba(255, 255, 255, ${finalConfig.particleOpacity})`,
          top: `${element.top}%`,
          left: `${element.left}%`,
          transform: `translate3d(${(smoothMousePosition.x - 50) * element.mouseSpeed}px, ${(smoothMousePosition.y - 50) * element.mouseSpeed + smoothScrollY * element.speed}px, 0)`,
          animationDelay: `${element.delay}s`,
        }"
      />
    </div>

    <!-- Static mesh gradient overlay - FIXED NO SCROLL TRANSFORM -->
    <div 
      :class="styles.gradientOverlay"
      :style="{
        opacity: finalConfig.gradientOverlayOpacity,
        background: `radial-gradient(circle at ${smoothMousePosition.x}% ${smoothMousePosition.y}%, rgba(139, 92, 246, 0.25) 0%, transparent 70%)`,
      }"
    />

    <!-- Static grid pattern overlay - FIXED NO SCROLL TRANSFORM -->
    <div 
      :class="styles.gridOverlay"
      :style="{
        opacity: finalConfig.gridOpacity,
        gridTemplateColumns: `repeat(auto-fill, ${finalConfig.gridSize}px)`,
        gridTemplateRows: `repeat(auto-fill, ${finalConfig.gridSize}px)`,
      }"
    >
      <div
        v-for="i in gridCells"
        :key="i"
        :class="styles.gridCell"
      />
    </div>

    <!-- Content -->
    <div :class="styles.content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useEventListener, useRafFn, useWindowSize } from '@vueuse/core'
import styles from './ParallaxBackground.module.css'
import type { ParallaxConfig } from './ParallaxConfig'

interface Props {
  config?: ParallaxConfig
  adjustedParticleCount?: number
}

const props = withDefaults(defineProps<Props>(), {
  config: () => ({}),
  adjustedParticleCount: undefined
})

// Default configuration
const defaultConfig: Required<ParallaxConfig> = {
  particleCount: 20,
  particleSize: 4,
  particleOpacity: 0.3,
  largeShapesOpacity: 0.2,
  largeShapesSizes: [500, 400, 300, 200, 100],
  mouseIntensity: 0.12,
  scrollIntensity: 0.3,
  particleMouseSensitivity: 0.03,
  particleScrollSpeed: 0.05,
  backgroundOpacity: 0.95,
  gradientOverlayOpacity: 0.2,
  gridOpacity: 0.15,
  mouseLerpFactor: 0.06,
  scrollLerpFactor: 0.08,
  blurIntensity: '3xl',
  gridSize: 40,
}

// Merge user config with defaults and validate values
const finalConfig = computed(() => {
  const mergedConfig = { ...defaultConfig, ...props.config }
  
  // Validate and clamp values
  return {
    ...mergedConfig,
    particleCount: Math.max(1, Math.min(100, mergedConfig.particleCount)),
    particleSize: Math.max(1, Math.min(20, mergedConfig.particleSize)),
    particleOpacity: Math.max(0, Math.min(1, mergedConfig.particleOpacity)),
    largeShapesOpacity: Math.max(0, Math.min(1, mergedConfig.largeShapesOpacity)),
    mouseIntensity: Math.max(0, Math.min(1, mergedConfig.mouseIntensity)),
    scrollIntensity: Math.max(0, Math.min(1, mergedConfig.scrollIntensity)),
    particleMouseSensitivity: Math.max(0, Math.min(1, mergedConfig.particleMouseSensitivity)),
    particleScrollSpeed: Math.max(0, Math.min(1, mergedConfig.particleScrollSpeed)),
    backgroundOpacity: Math.max(0, Math.min(1, mergedConfig.backgroundOpacity)),
    gradientOverlayOpacity: Math.max(0, Math.min(1, mergedConfig.gradientOverlayOpacity)),
    gridOpacity: Math.max(0, Math.min(1, mergedConfig.gridOpacity)),
    mouseLerpFactor: Math.max(0, Math.min(1, mergedConfig.mouseLerpFactor)),
    scrollLerpFactor: Math.max(0, Math.min(1, mergedConfig.scrollLerpFactor)),
    gridSize: Math.max(10, Math.min(200, mergedConfig.gridSize)),
  }
})

const scrollY = ref(0)
const mousePosition = ref({ x: 50, y: 50 })
const smoothScrollY = ref(0)
const smoothMousePosition = ref({ x: 50, y: 50 })

const { width, height } = useWindowSize()

// Calculate grid cells
const gridCells = computed(() => {
  if (width.value === 0 || height.value === 0) return 0
  return Math.ceil(width.value / finalConfig.value.gridSize) * Math.ceil(height.value / finalConfig.value.gridSize)
})

// Smooth interpolation
const lerp = (start: number, end: number, factor: number) => {
  return start + (end - start) * factor
}

// Animation loop using VueUse
const { pause, resume } = useRafFn(() => {
  smoothScrollY.value = lerp(smoothScrollY.value, scrollY.value, finalConfig.value.scrollLerpFactor)
  smoothMousePosition.value = {
    x: lerp(smoothMousePosition.value.x, mousePosition.value.x, finalConfig.value.mouseLerpFactor),
    y: lerp(smoothMousePosition.value.y, mousePosition.value.y, finalConfig.value.mouseLerpFactor),
  }
})

// Event listeners using VueUse
useEventListener('scroll', () => {
  scrollY.value = window.scrollY
}, { passive: true })

useEventListener('mousemove', (e: MouseEvent) => {
  mousePosition.value = {
    x: (e.clientX / window.innerWidth) * 100,
    y: (e.clientY / window.innerHeight) * 100,
  }
}, { passive: true })

// Memoize floating elements to prevent re-renders
const floatingElements = computed(() => 
  Array.from({
    length: props.adjustedParticleCount ?? finalConfig.value.particleCount,
  }).map((_, i) => ({
    id: i,
    top: Math.random() * 100,
    left: Math.random() * 100,
    delay: Math.random() * 2,
    speed: finalConfig.value.particleScrollSpeed * (0.5 + Math.random()),
    mouseSpeed: finalConfig.value.particleMouseSensitivity * (0.5 + Math.random()),
  }))
)

// Helper function for blur filter
const getBlurFilter = (intensity: ParallaxConfig['blurIntensity']) => {
  const blurMap = {
    'sm': '4px',
    'md': '6px',
    'lg': '8px',
    'xl': '12px',
    '2xl': '16px',
    '3xl': '24px'
  }
  return `blur(${blurMap[intensity || '3xl']})`
}

onMounted(() => {
  resume()
})

onUnmounted(() => {
  pause()
})
</script>