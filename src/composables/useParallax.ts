import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useEventListener, useRafFn } from '@vueuse/core'

// Smooth interpolation for values
const lerp = (start: number, end: number, factor: number) => {
  return start + (end - start) * factor
}

export const useParallax = () => {
  const scrollY = ref(0)
  const mousePosition = ref({ x: 50, y: 50 })
  const smoothScrollY = ref(0)
  const smoothMousePosition = ref({ x: 50, y: 50 })
  
  const targetScrollY = ref(0)
  const targetMousePosition = ref({ x: 50, y: 50 })

  // Smooth animation loop using VueUse
  const { pause, resume } = useRafFn(() => {
    smoothScrollY.value = lerp(smoothScrollY.value, targetScrollY.value, 0.1)
    smoothMousePosition.value = {
      x: lerp(smoothMousePosition.value.x, targetMousePosition.value.x, 0.08),
      y: lerp(smoothMousePosition.value.y, targetMousePosition.value.y, 0.08),
    }
  })

  // Event listeners using VueUse
  useEventListener('scroll', () => {
    const newScrollY = window.scrollY
    scrollY.value = newScrollY
    targetScrollY.value = newScrollY
  }, { passive: true })

  useEventListener('mousemove', (e: MouseEvent) => {
    const newPosition = {
      x: (e.clientX / window.innerWidth) * 100,
      y: (e.clientY / window.innerHeight) * 100,
    }
    mousePosition.value = newPosition
    targetMousePosition.value = newPosition
  }, { passive: true })

  const getParallaxStyle = (speed: number = 0.5, useSmooth: boolean = true) => {
    const scrollValue = useSmooth ? smoothScrollY.value : scrollY.value
    return {
      transform: `translate3d(0, ${scrollValue * speed}px, 0)`,
      willChange: 'transform',
    }
  }

  const getMouseParallaxStyle = (intensity: number = 0.02, useSmooth: boolean = true) => {
    const pos = useSmooth ? smoothMousePosition.value : mousePosition.value
    return {
      transform: `translate3d(${(pos.x - 50) * intensity}px, ${(pos.y - 50) * intensity}px, 0)`,
      willChange: 'transform',
    }
  }

  const getCombinedParallaxStyle = (scrollSpeed: number = 0.5, mouseIntensity: number = 0.02, useSmooth: boolean = true) => {
    const pos = useSmooth ? smoothMousePosition.value : mousePosition.value
    const scroll = useSmooth ? smoothScrollY.value : scrollY.value
    return {
      transform: `translate3d(${(pos.x - 50) * mouseIntensity}px, ${(pos.y - 50) * mouseIntensity + scroll * scrollSpeed}px, 0)`,
      willChange: 'transform',
    }
  }

  onMounted(() => {
    resume()
  })

  onUnmounted(() => {
    pause()
  })

  return {
    scrollY: computed(() => smoothScrollY.value),
    mousePosition: computed(() => smoothMousePosition.value),
    rawScrollY: computed(() => scrollY.value),
    rawMousePosition: computed(() => mousePosition.value),
    getParallaxStyle,
    getMouseParallaxStyle,
    getCombinedParallaxStyle,
  }
}