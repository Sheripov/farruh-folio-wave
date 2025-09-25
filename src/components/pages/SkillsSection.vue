<template>
  <section id="skills" :class="styles.skillsSection">      
    <div :class="styles.container">
      <!-- Header -->
      <div :class="styles.header">
        <h2 :class="styles.title">
          Technical Skills
        </h2>
        <div :class="styles.titleUnderline"></div>
        <p :class="styles.description">
          A comprehensive toolkit of modern technologies and frameworks for building scalable, efficient solutions.
        </p>
      </div>

      <!-- Skills Grid -->
      <div :class="styles.skillsGrid">
        <TiltCard 
          v-for="(category, categoryIndex) in categories"
          :key="categoryIndex"
          preset="subtle"
          :class="styles.categoryCard" 
          :style="{
            '--card-gradient': `linear-gradient(135deg, ${category.colorPalette.primary}33 0%, ${category.colorPalette.secondary}33 100%)`,
            '--text-color': category.colorPalette.text,
            '--border-hover': `${category.colorPalette.primary}66`,
            '--shadow-color': `${category.colorPalette.primary}33`,
            animationDelay: `${categoryIndex * 0.1}s`,
          }"
        >
          <!-- Background gradient overlay -->
          <div :class="styles.gradientOverlay"></div>
          
          <!-- Header -->
          <div :class="styles.categoryHeader">
            <div :class="styles.iconContainer">
              <component :is="category.IconComponent" :class="styles.categoryIcon" />
            </div>
            <h3 :class="styles.categoryTitle">
              {{ category.title }}
            </h3>
          </div>

          <!-- Skills -->
          <div :class="styles.skillsList">
            <div 
              v-for="(skill, skillIndex) in category.skills"
              :key="skillIndex"
              :class="styles.skillItem"
            >
              <div :class="styles.skillDot"></div>
              <span :class="styles.skillText">
                {{ skill }}
              </span>
            </div>
          </div>

          <!-- Decorative elements -->
          <div :class="styles.decorativeDot"></div>
          
          <!-- Shimmer effect -->
          <div :class="styles.shimmerEffect"></div>
        </TiltCard>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, type Component } from 'vue'
import {
  Code,
  Database,
  Cloud,
  Wrench,
  Zap,
  Star,
} from 'lucide-vue-next'
import TiltCard from '../shared/TiltCard.vue'
import styles from './Skills.module.css'

// Color palettes
const colorPalettes = [
  { primary: '#3b82f6', secondary: '#06b6d4', text: '#93c5fd' }, // blue
  { primary: '#10b981', secondary: '#14b8a6', text: '#6ee7b7' }, // emerald
  { primary: '#8b5cf6', secondary: '#7c3aed', text: '#c4b5fd' }, // purple
  { primary: '#f97316', secondary: '#f59e0b', text: '#fdba74' }, // orange
  { primary: '#ec4899', secondary: '#db2777', text: '#f9a8d4' }, // rose
  { primary: '#6366f1', secondary: '#4f46e5', text: '#a5b4fc' }, // indigo
]

// Icon map
const iconsMap: Record<string, Component> = {
  Code,
  Database,
  Cloud,
  Wrench,
  Zap,
  Star,
}

// Types
interface CategoryJson {
  icon: string
  title: string
  skills: string[]
}

interface CategoryItem extends CategoryJson {
  colorPalette: {
    primary: string
    secondary: string
    text: string
  }
  IconComponent: Component
}

// Reactive data
const categories = ref<CategoryItem[]>([])

// Fetch skills data
onMounted(async () => {
  try {
    const res = await fetch('/data/skills.json')
    if (!res.ok) throw new Error(`Failed to fetch skills.json: ${res.status}`)
    const data: CategoryJson[] = await res.json()

    const mapped: CategoryItem[] = data.map((cat, idx) => ({
      ...cat,
      IconComponent: iconsMap[cat.icon] || Code,
      colorPalette: colorPalettes[idx % colorPalettes.length],
    }))

    categories.value = mapped
  } catch (e) {
    console.error('Error loading skills.json', e)
  }
})
</script>