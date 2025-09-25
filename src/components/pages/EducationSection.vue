<template>
  <section id="education" :class="styles.section">
    <div :class="styles.container">
      <!-- Header -->
      <div :class="styles.header">
        <h2 :class="styles.title">Education</h2>
        <div :class="styles.divider"></div>
        <p :class="styles.description">
          Building a strong foundation in computer science and software development principles.
        </p>
      </div>

      <div :class="styles.contentWrapper">
        <TiltCard 
          v-for="(edu, index) in education"
          :key="index"
          preset="subtle"
          :class="styles.card" 
          :style="{
            '--card-gradient': `linear-gradient(135deg, ${edu.colorPalette.primary}33 0%, ${edu.colorPalette.secondary}33 100%)`,
            '--text-color': edu.colorPalette.text,
            '--border-hover': `${edu.colorPalette.primary}66`,
            '--shadow-color': `${edu.colorPalette.primary}33`,
          }"
        >
          <div :class="styles.cardContent">
            <!-- Icon Section -->
            <div :class="styles.iconWrapper">
              <div :class="styles.iconContainer">
                <component :is="edu.icon" :class="styles.icon" />
              </div>
            </div>

            <!-- Content Section -->
            <div :class="styles.contentSection">
              <!-- Main Info -->
              <div>
                <h3 :class="styles.mainTitle">{{ edu.degree }}</h3>
                <h4 :class="styles.university">
                  <component :is="edu.universityIcon" :class="styles.universityIcon" />
                  {{ edu.university }}
                </h4>
              </div>

              <!-- Date and Duration -->
              <div :class="styles.badges">
                <div :class="styles.badge">
                  <Calendar :class="styles.badgeIcon" />
                  <span :class="styles.badgeText">{{ edu.years }}</span>
                </div>
                <div :class="styles.badge">
                  <Award :class="styles.badgeIcon" />
                  <span :class="styles.badgeText">{{ edu.duration }}</span>
                </div>
              </div>

              <!-- Description -->
              <div :class="styles.descriptionBox">
                <p :class="styles.descriptionText">{{ edu.description }}</p>
              </div>

              <!-- Key Subjects -->
              <div v-if="edu.subjects.length > 0">
                <h5 :class="styles.subjectsTitle">
                  <BookOpen :class="styles.subjectsTitleIcon" />
                  Key Subjects
                </h5>
                <div :class="styles.subjectsGrid">
                  <div 
                    v-for="(subject, idx) in edu.subjects"
                    :key="idx" 
                    :class="styles.subjectItem"
                  >
                    <div :class="styles.subjectDot"></div>
                    <span :class="styles.subjectText">{{ subject }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Decorative elements -->
          <div :class="styles.decorativeTopRight"></div>
          <div :class="styles.decorativeBottomLeft"></div>
        </TiltCard>
      </div>

      <!-- Additional decorative floating elements -->
      <div :class="styles.floatingElements">
        <div
          v-for="i in 4"
          :key="i"
          :class="styles.floatingDot"
          :style="{
            left: `${20 + (i - 1) * 20}%`,
            top: `${30 + ((i - 1) % 2) * 40}%`,
            animationDelay: `${(i - 1) * 1.5}s`,
            animationDuration: `${4 + (i - 1)}s`,
          }"
        ></div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, type Component } from 'vue'
import {
  GraduationCap,
  Calendar,
  Award,
  BookOpen,
} from 'lucide-vue-next'
import TiltCard from '../shared/TiltCard.vue'
import styles from './Education.module.css'

// Color palettes
const colorPalettes = [
  { primary: '#60a5fa', secondary: '#818cf8', text: '#93c5fd' }, // blue-indigo
  { primary: '#8b5cf6', secondary: '#6366f1', text: '#c4b5fd' }, // violet-indigo
  { primary: '#2563eb', secondary: '#4f46e5', text: '#bfdbfe' }, // blue-indigo alt
]

// Icon map
const iconsMap: Record<string, Component> = {
  GraduationCap,
  Calendar,
  Award,
  BookOpen,
}

// Types
interface EducationJson {
  icon: string
  degree: string
  university: string
  universityIcon?: string
  years: string
  duration: string
  description: string
  subjects: string[]
}

interface EducationCard {
  icon: Component
  degree: string
  university: string
  universityIcon?: Component
  years: string
  duration: string
  description: string
  subjects: string[]
  colorPalette: {
    primary: string
    secondary: string
    text: string
  }
}

// Reactive data
const education = ref<EducationCard[]>([])

// Fetch education data
onMounted(async () => {
  try {
    const response = await fetch('/data/education.json')
    if (!response.ok) throw new Error(`Failed to fetch education: ${response.status}`)
    const data: EducationJson[] = await response.json()

    const mapped: EducationCard[] = data.map((item, idx) => ({
      icon: iconsMap[item.icon] || GraduationCap,
      degree: item.degree,
      university: item.university,
      universityIcon: item.universityIcon ? iconsMap[item.universityIcon] || BookOpen : BookOpen,
      years: item.years,
      duration: item.duration,
      description: item.description,
      subjects: item.subjects,
      colorPalette: colorPalettes[idx % colorPalettes.length],
    }))

    education.value = mapped
  } catch (e) {
    console.error('Error loading education.json', e)
  }
})
</script>