<template>
  <div :class="styles.floatingWords">
    <div
      v-for="(word, idx) in words"
      :key="word.id"
      :ref="(el) => setWordRef(idx, el as HTMLDivElement)"
      :class="[styles.floatingWord, styles[word.gradient]]"
      :style="{
        left: 0,
        top: 0,
        transform: `translate3d(${word.left}vw, ${word.top}vh, 0) ${enableRotation ? 'rotate(0deg)' : ''}`,
        animation: 'none',
        opacity: opacity,
        fontSize: fontSize
      }"
    >
      {{ word.text }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRafFn } from '@vueuse/core'
import styles from './FloatingWords.module.css'

interface Props {
  count?: number // number of words to display (default: 15)
  speed?: number // movement speed in vw/vh per second (default: 5)
  rotationSpeed?: number // rotation speed in degrees per second (default: 30)
  opacity?: number // opacity of words (default: 0.6)
  fontSize?: string // font size (default: '0.875rem')
  sideOnlyPercentage?: number // percentage of words placed on sides (default: 0.8)
  centerAreaStart?: number // start of center area percentage (default: 30)
  centerAreaEnd?: number // end of center area percentage (default: 70)
  leftSideEnd?: number // end of left side area percentage (default: 25)
  rightSideStart?: number // start of right side area percentage (default: 75)
  enableRotation?: boolean // enable/disable rotation (default: true)
  enableBounce?: boolean // enable/disable bouncing off edges (default: true)
}

const props = withDefaults(defineProps<Props>(), {
  count: 15,
  speed: 5,
  rotationSpeed: 30,
  opacity: 0.6,
  fontSize: '0.875rem',
  sideOnlyPercentage: 0.8,
  centerAreaStart: 30,
  centerAreaEnd: 70,
  leftSideEnd: 25,
  rightSideStart: 75,
  enableRotation: true,
  enableBounce: true
})

interface FloatingWord {
  id: number
  text: string
  left: number // initial x (percentage)
  top: number  // initial y (percentage)
  gradient: string
}

interface WordPosition {
  x: number // current x in percentage of viewport width
  y: number // current y in percentage of viewport height
  vx: number // velocity in percentage per second
  vy: number // velocity in percentage per second
  angle: number // current rotation in degrees
  vr: number    // rotation velocity (degrees per second)
}

const words = ref<FloatingWord[]>([])
const wordRefs = ref<(HTMLDivElement | null)[]>([])
const positions = ref<WordPosition[]>([])
const lastTime = ref(performance.now())

const techWords = [
  'Python', 'Django', 'FastAPI', 'React', 'TypeScript', 'JavaScript',
  'PostgreSQL', 'Redis', 'Docker', 'Kubernetes', 'AWS', 'GCP',
  'MongoDB', 'GraphQL', 'REST API', 'Microservices', 'DevOps',
  'CI/CD', 'Git', 'Linux', 'Node.js', 'Vue.js', 'Angular',
  'Machine Learning', 'AI', 'Data Science', 'Cloud', 'Serverless',
  'Blockchain', 'Web3', 'Mobile', 'Frontend', 'Backend', 'Fullstack'
]

const gradients = ['gradient1', 'gradient2', 'gradient3', 'gradient4', 'gradient5', 'gradient6']

const setWordRef = (index: number, el: HTMLDivElement | null) => {
  wordRefs.value[index] = el
}

// Generate initial words
const generateWords = () => {
  const newWords: FloatingWord[] = []
  const newPositions: WordPosition[] = []

  for (let i = 0; i < props.count; i++) {
    const randomWord = techWords[Math.floor(Math.random() * techWords.length)]

    // Configurable word placement
    const randomLeft = Math.random() < props.sideOnlyPercentage
      ? (Math.random() < 0.5 
          ? Math.random() * props.leftSideEnd 
          : props.rightSideStart + Math.random() * (100 - props.rightSideStart))
      : props.centerAreaStart + Math.random() * (props.centerAreaEnd - props.centerAreaStart)

    // Random vertical position (0-100% vh)
    const randomTop = Math.random() * 100

    const randomGradient = gradients[Math.floor(Math.random() * gradients.length)]

    // Random direction vector with configurable speed
    const dirAngle = Math.random() * Math.PI * 2
    const vx = Math.cos(dirAngle) * props.speed
    const vy = Math.sin(dirAngle) * props.speed

    // Configurable rotation parameters
    const startAngle = Math.random() * 360
    const vr = props.enableRotation ? (Math.random() < 0.5 ? -1 : 1) * props.rotationSpeed : 0

    newWords.push({
      id: i,
      text: randomWord,
      left: randomLeft,
      top: randomTop,
      gradient: randomGradient
    })

    newPositions.push({ x: randomLeft, y: randomTop, vx, vy, angle: startAngle, vr })
  }

  words.value = newWords
  positions.value = newPositions
  wordRefs.value = new Array(props.count).fill(null)
}

// Animation update function
const update = () => {
  const now = performance.now()
  const dt = (now - lastTime.value) / 1000 // seconds since last frame
  lastTime.value = now

  positions.value.forEach((pos, idx) => {
    // Update position & rotation with constant velocity
    pos.x += pos.vx * dt
    pos.y += pos.vy * dt
    if (props.enableRotation) {
      pos.angle = (pos.angle + pos.vr * dt) % 360
    }

    if (props.enableBounce) {
      // Bounce horizontally
      if (pos.x < 0) {
        pos.x = 0
        pos.vx = Math.abs(pos.vx)
      } else if (pos.x > 100) {
        pos.x = 100
        pos.vx = -Math.abs(pos.vx)
      }

      // Bounce vertically
      if (pos.y < 0) {
        pos.y = 0
        pos.vy = Math.abs(pos.vy)
      } else if (pos.y > 100) {
        pos.y = 100
        pos.vy = -Math.abs(pos.vy)
      }
    } else {
      // Wrap around edges instead of bouncing
      if (pos.x < -10) pos.x = 110
      if (pos.x > 110) pos.x = -10
      if (pos.y < -10) pos.y = 110
      if (pos.y > 110) pos.y = -10
    }

    // Apply to DOM element
    const el = wordRefs.value[idx]
    if (el) {
      const rotation = props.enableRotation ? `rotate(${pos.angle}deg)` : ''
      el.style.transform = `translate3d(${pos.x}vw, ${pos.y}vh, 0) ${rotation}`
      el.style.opacity = props.opacity.toString()
      el.style.fontSize = props.fontSize
    }
  })
}

// Use VueUse RAF for animation
const { pause, resume } = useRafFn(update)

// Watch for prop changes and regenerate words
watch(() => [
  props.count, 
  props.speed, 
  props.rotationSpeed, 
  props.sideOnlyPercentage, 
  props.centerAreaStart, 
  props.centerAreaEnd, 
  props.leftSideEnd, 
  props.rightSideStart, 
  props.enableRotation
], () => {
  generateWords()
}, { deep: true })

onMounted(() => {
  generateWords()
  resume()
})

onUnmounted(() => {
  pause()
})
</script>