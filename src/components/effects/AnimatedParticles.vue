<template>
  <canvas 
    ref="canvasRef" 
    :class="styles.canvas"
  />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useEventListener, useRafFn } from '@vueuse/core'
import styles from './AnimatedParticles.module.css'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  color: string
}

/**
 * Configuration for animated particles.
 *
 * - particleCount: Number of individual particles rendered on the canvas. Affects visual density and performance.
 * - colors: Array of particle colors in rgba format. Allows for soft blending with background or theme.
 * - maxConnectionDistance: Maximum distance (in pixels) between particles for a line to appear between them.
 * - speedRange: Range of horizontal and vertical speeds (min, max) applied randomly to each particle.
 * - sizeRange: Radius size range (min, max) of each particle in pixels.
 * - opacityRange: Opacity range (min, max) for each particle; higher values result in brighter visuals.
 * - fps: Frames per second for animation; lower values reduce GPU load but may affect smoothness.
 */
interface ParticlesConfig {
  particleCount?: number
  colors?: string[]
  maxConnectionDistance?: number
  speedRange?: [number, number]
  sizeRange?: [number, number]
  opacityRange?: [number, number]
  fps?: number
}

interface Props {
  config?: ParticlesConfig
}

const props = withDefaults(defineProps<Props>(), {
  config: () => ({})
})

const canvasRef = ref<HTMLCanvasElement | null>(null)
const particles = ref<Particle[]>([])
const lastTime = ref(0)

const config = computed(() => ({
  particleCount: 1000,
  colors: [
    'rgba(139, 92, 246, 0.3)', // Purple
    'rgba(59, 130, 246, 0.3)',  // Blue
    'rgba(236, 72, 153, 0.3)',  // Pink
    'rgba(34, 197, 94, 0.3)',   // Green
  ],
  maxConnectionDistance: 60,
  speedRange: [-0.1, 0.1] as [number, number],
  sizeRange: [0.5, 2] as [number, number],
  opacityRange: [0.1, 0.3] as [number, number],
  fps: 24,
  ...props.config
}))

const createParticles = (canvas: HTMLCanvasElement) => {
  const newParticles: Particle[] = []
  const particleCountFinal = config.value.particleCount
  
  for (let i = 0; i < particleCountFinal; i++) {
    newParticles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: Math.random() * (config.value.speedRange[1] - config.value.speedRange[0]) + config.value.speedRange[0],
      vy: Math.random() * (config.value.speedRange[1] - config.value.speedRange[0]) + config.value.speedRange[0],
      size: Math.random() * (config.value.sizeRange[1] - config.value.sizeRange[0]) + config.value.sizeRange[0],
      opacity: Math.random() * (config.value.opacityRange[1] - config.value.opacityRange[0]) + config.value.opacityRange[0],
      color: config.value.colors[Math.floor(Math.random() * config.value.colors.length)],
    })
  }
  
  particles.value = newParticles
}

const animate = (currentTime: number) => {
  const canvas = canvasRef.value
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const frameInterval = 1000 / config.value.fps
  if (currentTime - lastTime.value < frameInterval) {
    return
  }
  lastTime.value = currentTime

  ctx.clearRect(0, 0, canvas.width, canvas.height)
  
  particles.value.forEach((particle, index) => {
    // Update position
    particle.x += particle.vx
    particle.y += particle.vy
    
    // Bounce off edges
    if (particle.x <= 0 || particle.x >= canvas.width) {
      particle.vx *= -1
    }
    if (particle.y <= 0 || particle.y >= canvas.height) {
      particle.vy *= -1
    }
    
    // Keep particles within bounds
    particle.x = Math.max(0, Math.min(canvas.width, particle.x))
    particle.y = Math.max(0, Math.min(canvas.height, particle.y))
    
    // Draw particle
    ctx.beginPath()
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
    ctx.fillStyle = particle.color
    ctx.fill()
    
    // Draw connections to nearby particles (further optimized)
    for (let i = index + 1; i < particles.value.length; i++) {
      const otherParticle = particles.value[i]
      const dx = particle.x - otherParticle.x
      const dy = particle.y - otherParticle.y
      const distance = Math.sqrt(dx * dx + dy * dy)
      
      if (distance < config.value.maxConnectionDistance) {
        ctx.beginPath()
        ctx.moveTo(particle.x, particle.y)
        ctx.lineTo(otherParticle.x, otherParticle.y)
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.03 * (1 - distance / config.value.maxConnectionDistance)})`
        ctx.lineWidth = 0.3
        ctx.stroke()
      }
    }
  })
}

// Use VueUse RAF for animation
const { pause, resume } = useRafFn(animate)

const resizeCanvas = () => {
  const canvas = canvasRef.value
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const dpr = window.devicePixelRatio || 1
  const rect = canvas.getBoundingClientRect()
  
  canvas.width = rect.width * dpr
  canvas.height = rect.height * dpr
  
  ctx.scale(dpr, dpr)
  
  canvas.style.width = rect.width + 'px'
  canvas.style.height = rect.height + 'px'
  
  createParticles(canvas)
}

useEventListener('resize', resizeCanvas)

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  // Enable hardware acceleration for canvas
  ctx.imageSmoothingEnabled = true
  ctx.imageSmoothingQuality = 'high'

  resizeCanvas()
  resume()
})

onUnmounted(() => {
  pause()
})
</script>