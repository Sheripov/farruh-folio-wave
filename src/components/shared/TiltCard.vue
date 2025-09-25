<template>
  <div
    ref="containerRef"
    :class="[styles.tiltCard, className]"
    :style="computedStyle"
  >
    <div 
      v-if="config.glareEffect"
      :class="styles.glareEffect"
      :style="glareStyle"
    />
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, type CSSProperties } from 'vue'
import { useEventListener, useRafFn } from '@vueuse/core'
import styles from './TiltCard.module.css'

// Tilt configuration interface
interface TiltConfig {
  intensity: number
  maxTilt: number
  scale: number
  glareEffect: boolean
  perspective: number
}

// Predefined tilt presets
type TiltPreset = 'default' | 'subtle' | 'disabled'

interface Props {
  className?: string
  style?: CSSProperties
  preset?: TiltPreset
  customConfig?: Partial<TiltConfig>
  disableOnMobile?: boolean
  respectReducedMotion?: boolean
  // Legacy props for backward compatibility
  intensity?: number
  glareEffect?: boolean
  maxTilt?: number
  scale?: number
  perspective?: number
}

const props = withDefaults(defineProps<Props>(), {
  className: '',
  style: () => ({}),
  preset: 'default',
  customConfig: () => ({}),
  disableOnMobile: false,
  respectReducedMotion: true
})

const tiltCardStyles: Record<string, CSSProperties> = {
  card: {
    transform: 'translateZ(0)',
    WebkitTransform: 'translateZ(0)',
    transformStyle: 'preserve-3d',
    WebkitTransformStyle: 'preserve-3d',
    WebkitBackfaceVisibility: 'hidden',
    backfaceVisibility: 'hidden',
    perspective: '1000px',
    WebkitPerspective: '1000px',
    willChange: 'transform',
    isolation: 'isolate',
    contain: 'layout style paint',
    transition: 'box-shadow 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), border-color 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
  },
  glare: {
    transform: 'translateZ(0)',
    WebkitTransform: 'translateZ(0)',
    WebkitBackfaceVisibility: 'hidden',
    backfaceVisibility: 'hidden',
    willChange: 'opacity, background',
    transition: 'opacity 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    isolation: 'isolate',
    contain: 'style paint'
  }
}

// Predefined tilt configurations
const TILT_PRESETS: Record<TiltPreset, TiltConfig> = {
  default: {
    intensity: 0.8,
    maxTilt: 10,
    scale: 0.05,
    glareEffect: true,
    perspective: 1000
  },
  subtle: {
    intensity: 0.4,
    maxTilt: 5,
    scale: 0.02,
    glareEffect: false,
    perspective: 1500
  },
  disabled: {
    intensity: 0,
    maxTilt: 0,
    scale: 0,
    glareEffect: false,
    perspective: 1000
  }
}

// Utility functions
const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

const isMobileDevice = (): boolean => {
  if (typeof window === 'undefined') return false
  return 'ontouchstart' in window && /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

const containerRef = ref<HTMLDivElement | null>(null)
const cardRectsCache = ref<Map<HTMLElement, DOMRect>>(new Map())

// Determine final configuration
const config = computed((): TiltConfig => {
  // Check if tilt should be disabled
  if (props.respectReducedMotion && prefersReducedMotion()) {
    return TILT_PRESETS.disabled
  }
  
  if (props.disableOnMobile && isMobileDevice()) {
    return TILT_PRESETS.disabled
  }

  // Use legacy props if provided (for backward compatibility)
  if (props.intensity !== undefined || props.glareEffect !== undefined || 
      props.maxTilt !== undefined || props.scale !== undefined || props.perspective !== undefined) {
    return {
      intensity: props.intensity ?? 0.8,
      maxTilt: props.maxTilt ?? 10,
      scale: props.scale ?? 0.05,
      glareEffect: props.glareEffect ?? true,
      perspective: props.perspective ?? 1000
    }
  }

  // Use preset with custom overrides
  return {
    ...TILT_PRESETS[props.preset],
    ...props.customConfig
  }
})

const computedStyle = computed(() => ({
  ...props.style
}))

const glareStyle = computed(() => ({
  ...tiltCardStyles.glare
}))

// Universal tilt handler for both mouse and touch events
const handleTiltMove = (clientX: number, clientY: number) => {
  const container = containerRef.value
  if (!container) return

  const cardElement = container as HTMLElement
  
  // Get cached rect or calculate new one
  let rect = cardRectsCache.value.get(cardElement)
  if (!rect) {
    rect = cardElement.getBoundingClientRect()
    cardRectsCache.value.set(cardElement, rect)
  }
  
  // Check if pointer is within card bounds
  const isWithinCard = clientX >= rect.left && 
                     clientX <= rect.right && 
                     clientY >= rect.top && 
                     clientY <= rect.bottom
  
  if (isWithinCard) {
    // Calculate relative position within the card (0 to 1)
    const relativeX = (clientX - rect.left) / rect.width
    const relativeY = (clientY - rect.top) / rect.height
    
    // Convert to centered coordinates (-0.5 to 0.5)
    const centerX = relativeX - 0.5
    const centerY = relativeY - 0.5
    
    // Calculate tilt angles using effective configuration
    const currentIntensity = config.value.intensity
    
    const tiltX = centerY * -config.value.maxTilt * currentIntensity
    const tiltY = centerX * config.value.maxTilt * currentIntensity
    
    // Subtle translation effect
    const translateX = centerX * 6 * currentIntensity
    const translateY = centerY * 6 * currentIntensity
    
    // Scale effect
    const scaleValue = 1 + (config.value.scale * currentIntensity)
    
    // Apply transform with proper formatting for cross-browser compatibility
    const transform = `perspective(${config.value.perspective}px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) translateX(${translateX.toFixed(2)}px) translateY(${translateY.toFixed(2)}px) scale(${scaleValue.toFixed(3)}) translateZ(0)`
    
    cardElement.style.transform = transform
    cardElement.style.willChange = 'transform'
    cardElement.style.transformStyle = 'preserve-3d'
    cardElement.style.backfaceVisibility = 'hidden'

    // Glare effect with better performance
    if (config.value.glareEffect) {
      const glareElement = cardElement.querySelector(`.${styles.glareEffect}`) as HTMLElement
      if (glareElement) {
        const glareX = relativeX * 100
        const glareY = relativeY * 100
        
        // Calculate distance from center for intensity
        const distance = Math.sqrt(centerX * centerX + centerY * centerY)
        const glareIntensity = Math.max(0, 1 - distance * 2) * 0.4
        
        glareElement.style.background = `radial-gradient(ellipse 200% 150% at ${glareX.toFixed(1)}% ${glareY.toFixed(1)}%, rgba(255, 255, 255, ${(0.04 * glareIntensity).toFixed(3)}) 0%, rgba(255, 255, 255, ${(0.02 * glareIntensity).toFixed(3)}) 20%, transparent 40%)`
        glareElement.style.opacity = '1'
        glareElement.style.willChange = 'opacity, background'
      }
    }
  }
}

// Reset card function
const resetCard = (instant: boolean = false) => {
  const cardElement = containerRef.value
  if (!cardElement) return

  // For instant reset (touch end), disable transitions temporarily
  if (instant) {
    cardElement.style.transition = 'none'
    // Force reflow to apply transition: none immediately
    cardElement.offsetHeight
  }
  
  // Reset transform completely
  cardElement.style.transform = ''
  cardElement.style.willChange = 'auto'
  cardElement.style.transformStyle = ''
  cardElement.style.backfaceVisibility = ''
  
  if (config.value.glareEffect) {
    const glareElement = cardElement.querySelector(`.${styles.glareEffect}`) as HTMLElement
    if (glareElement) {
      if (instant) {
        glareElement.style.transition = 'none'
        // Force reflow
        glareElement.offsetHeight
      }
      glareElement.style.opacity = '0'
      glareElement.style.willChange = 'auto'
    }
  }
  
  // Re-enable transitions after a short delay for instant reset
  if (instant) {
    setTimeout(() => {
      if (cardElement) {
        cardElement.style.transition = ''
        if (config.value.glareEffect) {
          const glareElement = cardElement.querySelector(`.${styles.glareEffect}`) as HTMLElement
          if (glareElement) {
            glareElement.style.transition = ''
          }
        }
      }
    }, 10)
  }

  // Clear cache
  cardRectsCache.value.clear()
}

// Mouse event handlers
const handleMouseMove = (e: MouseEvent) => {
  // Skip if tilt is disabled
  if (config.value.intensity === 0) return
  handleTiltMove(e.clientX, e.clientY)
}

const handleMouseLeave = () => {
  resetCard()
}

// Touch event handlers for mobile support
const handleTouchMove = (e: TouchEvent) => {
  // Skip if tilt is disabled
  if (config.value.intensity === 0) return
  e.preventDefault() // Prevent scrolling while tilting
  if (e.touches.length === 1) {
    const touch = e.touches[0]
    handleTiltMove(touch.clientX, touch.clientY)
  }
}

const handleTouchEnd = () => {
  resetCard(true)
}

const handleTouchCancel = () => {
  resetCard(true)
}

const handleResize = () => {
  cardRectsCache.value.clear()
  resetCard()
}

// Use RAF for smooth animations
const { pause, resume } = useRafFn(handleTiltMove)

onMounted(() => {
  const container = containerRef.value
  if (!container) return

  // Clear cache on mount
  cardRectsCache.value.clear()

  // Skip event listeners if tilt is disabled
  if (config.value.intensity === 0) {
    return
  }

  // Detect device capabilities
  const hasTouch = 'ontouchstart' in window
  const isMobile = hasTouch && /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

  // Add event listeners based on device capabilities
  if (hasTouch) {
    container.addEventListener('touchstart', () => {
      cardRectsCache.value.clear()
    }, { passive: true })
    container.addEventListener('touchmove', handleTouchMove, { passive: false })
    container.addEventListener('touchend', handleTouchEnd, { passive: true })
    container.addEventListener('touchcancel', handleTouchCancel, { passive: true })
  }
  
  // Mouse events for desktop
  if (!isMobile) {
    container.addEventListener('mousemove', handleMouseMove, { passive: true })
    container.addEventListener('mouseleave', handleMouseLeave, { passive: true })
  }

  // Resize handler to clear cache
  window.addEventListener('resize', handleResize, { passive: true })
})

onUnmounted(() => {
  // Reset card before cleanup
  resetCard()
  
  // Clear cache
  cardRectsCache.value.clear()
  
  // Cleanup is handled automatically by Vue
})
</script>