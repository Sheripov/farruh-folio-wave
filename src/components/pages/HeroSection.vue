<template>
  <section id="hero" :class="styles.hero">
    <!-- Minimal background elements -->
    <div :class="styles.backgroundElement1"></div>
    <div :class="styles.backgroundElement2"></div>

    <!-- Very subtle floating elements -->
    <div :class="styles.floatingElements">
      <div 
        :class="styles.floatingElement1"
        :style="getCombinedParallaxStyle(0.03, 0.01)"
      />
      <div 
        :class="styles.floatingElement2"
        :style="getCombinedParallaxStyle(0.04, -0.01)"
      />
    </div>

    <div :class="styles.container" v-if="heroData">
      <div :class="styles.fadeIn">
        <!-- Clean header -->
        <div :class="styles.header">
          <div :class="styles.badge">
            <span :class="styles.badgeSpan">{{ heroData.badge }}</span>
          </div>
          
          <h1 :class="styles.mainTitle">{{ heroData.name }}</h1>
          
          <h2 :class="styles.subtitle">{{ heroData.subtitle }}</h2>
        </div>

        <!-- Simple description -->
        <div :class="styles.description">
          <p :class="styles.descriptionText">{{ heroData.description }}</p>
        </div>

        <!-- Clear, readable buttons -->
        <div :class="styles.buttonContainer">
          <button
            :class="styles.primaryButton"
            @click="() => window.open(heroData.primaryButtonLink, '_blank')"
          >
            <Download :class="styles.buttonIcon" />
            {{ heroData.primaryButtonText }}
          </button>
          <button
            :class="styles.secondaryButton"
            @click="scrollToContact"
          >
            <Mail :class="styles.buttonIcon" />
            {{ heroData.secondaryButtonText }}
          </button>
        </div>

        <!-- Simple stats -->
        <div :class="styles.stats">
          <div 
            v-for="(stat, idx) in stats" 
            :key="idx" 
            :class="styles.statItem"
          >
            <div 
              :class="styles.statNumber" 
              :style="{ '--text-color': stat.colorPalette.text }"
            >
              {{ stat.number }}
            </div>
            <div :class="styles.statLabel">{{ stat.label }}</div>
          </div>
        </div>

        <!-- Simple scroll indicator -->
        <div :class="styles.scrollIndicator">
          <div :class="styles.scrollText">
            Explore my work
          </div>
          <button
            @click="scrollToAbout"
            :class="styles.scrollButton"
          >
            <ArrowDown :class="styles.scrollIcon" />
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Download, Mail, ArrowDown } from 'lucide-vue-next'
import { useParallax } from '@/composables/useParallax'
import styles from './Hero.module.css'

// Color palettes
const colorPalettes = [
  { primary: '#60a5fa', text: '#60a5fa' }, // blue
  { primary: '#34d399', text: '#34d399' }, // emerald
  { primary: '#c084fc', text: '#c084fc' }, // purple
  { primary: '#f59e0b', text: '#f59e0b' }, // amber
]

// JSON Types
interface StatJson {
  number: string
  label: string
}

interface HeroJson {
  badge: string
  name: string
  subtitle: string
  description: string
  primaryButtonText: string
  primaryButtonLink: string
  secondaryButtonText: string
  stats: StatJson[]
}

interface StatItem extends StatJson {
  colorPalette: {
    primary: string
    text: string
  }
}

const { getCombinedParallaxStyle } = useParallax()
const heroData = ref<HeroJson | null>(null)

const stats = computed(() => 
  heroData.value?.stats.map((s, idx) => ({
    ...s,
    colorPalette: colorPalettes[idx % colorPalettes.length],
  })) || []
)

const scrollToContact = () => {
  const element = document.getElementById('contact')
  if (element) {
    // Calculate the absolute position of the element
    const elementTop = element.getBoundingClientRect().top + window.pageYOffset
    const maxScroll = document.body.scrollHeight - window.innerHeight
    const target = Math.min(elementTop - 80, maxScroll) // Account for navigation height
    window.scrollTo({
      top: target,
      behavior: 'smooth'
    })
  }
}

const scrollToAbout = () => {
  const element = document.getElementById('about')
  if (element) {
    // Calculate the absolute position of the element
    const elementTop = element.getBoundingClientRect().top + window.pageYOffset
    const maxScroll = document.body.scrollHeight - window.innerHeight
    const target = Math.min(elementTop - 80, maxScroll)
    window.scrollTo({
      top: target,
      behavior: 'smooth'
    })
  }
}

onMounted(async () => {
  try {
    const res = await fetch('/data/hero.json')
    if (!res.ok) throw new Error(`Failed to fetch hero.json: ${res.status}`)
    heroData.value = await res.json()
  } catch (e) {
    console.error('Error loading hero.json', e)
  }
})
</script>