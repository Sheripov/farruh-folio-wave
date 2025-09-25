<template>
  <section id="strengths" :class="styles.section">
    <div :class="styles.container">
      <!-- Header -->
      <div :class="styles.header">
        <h2 :class="styles.title">
          Core Strengths
        </h2>
        <div :class="styles.titleUnderline"></div>
        <p :class="styles.description">
          Key personal and professional qualities that drive success in every project and collaboration.
        </p>
      </div>

      <div :class="styles.grid">
        <TiltCard 
          v-for="(strength, index) in strengths"
          :key="index"
          preset="default"
          :class="styles.card"
        >
          <!-- Background gradient overlay -->
          <div :class="[styles.cardBackgroundOverlay, getColorClasses(strength.color).gradient]"></div>
          
          <!-- Icon container -->
          <div :class="styles.iconContainer">
            <div :class="[styles.iconWrapper, getColorClasses(strength.color).iconWrapper]">
              <component :is="strength.icon" :class="[styles.icon, getColorClasses(strength.color).icon]" />
            </div>
          </div>
          
          <!-- Content -->
          <div :class="styles.content">
            <h3 :class="[styles.cardTitle, getColorClasses(strength.color).title]">
              {{ strength.title }}
            </h3>
            
            <p :class="styles.cardDescription">
              {{ strength.description }}
            </p>
          </div>

          <!-- Decorative elements -->
          <div :class="[styles.decorativeElement1, getColorClasses(strength.color).dot]"></div>
          <div :class="[styles.decorativeElement2, getColorClasses(strength.color).dot]"></div>
          
          <!-- Shimmer effect -->
          <div :class="styles.shimmerEffect"></div>
        </TiltCard>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, type Component } from 'vue'
import { Clock, Zap, Target, Lightbulb, Users, Star } from 'lucide-vue-next'
import TiltCard from '../shared/TiltCard.vue'
import styles from './Strengths.module.css'

// Icon map to resolve from JSON strings
const iconsMap: Record<string, Component> = {
  Clock,
  Zap,
  Target,
  Lightbulb,
  Users,
  Star,
}

// Types
interface StrengthJson {
  icon: string
  title: string
  description: string
  color: string
}

interface StrengthItem {
  icon: Component
  title: string
  description: string
  color: string
}

// Reactive data
const strengths = ref<StrengthItem[]>([])

// Helper function to get color classes
const getColorClasses = (color: string) => {
  const colorMap = {
    emerald: {
      gradient: styles.emeraldGradient,
      iconWrapper: styles.emeraldIconWrapper,
      icon: styles.emeraldIcon,
      title: styles.emeraldTitle,
      dot: styles.emeraldDot
    },
    amber: {
      gradient: styles.amberGradient,
      iconWrapper: styles.amberIconWrapper,
      icon: styles.amberIcon,
      title: styles.amberTitle,
      dot: styles.amberDot
    },
    rose: {
      gradient: styles.roseGradient,
      iconWrapper: styles.roseIconWrapper,
      icon: styles.roseIcon,
      title: styles.roseTitle,
      dot: styles.roseDot
    },
    violet: {
      gradient: styles.violetGradient,
      iconWrapper: styles.violetIconWrapper,
      icon: styles.violetIcon,
      title: styles.violetTitle,
      dot: styles.violetDot
    },
    blue: {
      gradient: styles.blueGradient,
      iconWrapper: styles.blueIconWrapper,
      icon: styles.blueIcon,
      title: styles.blueTitle,
      dot: styles.blueDot
    },
    purple: {
      gradient: styles.purpleGradient,
      iconWrapper: styles.purpleIconWrapper,
      icon: styles.purpleIcon,
      title: styles.purpleTitle,
      dot: styles.purpleDot
    }
  }
  return colorMap[color as keyof typeof colorMap] || colorMap.emerald
}

// Fetch strengths data
onMounted(async () => {
  try {
    const res = await fetch('/data/strengths.json')
    if (!res.ok) throw new Error(`Failed to fetch strengths.json: ${res.status}`)
    const data: StrengthJson[] = await res.json()
    const mapped: StrengthItem[] = data.map((s) => ({
      icon: iconsMap[s.icon] || Clock,
      title: s.title,
      description: s.description,
      color: s.color,
    }))
    strengths.value = mapped
  } catch (e) {
    console.error('Error loading strengths.json', e)
  }
})
</script>