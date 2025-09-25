<template>
  <section id="about" :class="styles.aboutSection">
    <div :class="styles.container">
      <!-- Header -->
      <div :class="styles.header">
        <h2 :class="styles.title">About Me</h2>
        <div :class="styles.titleUnderline"></div>
      </div>

      <div :class="styles.mainContent">
        <!-- Loading State -->
        <div v-if="isLoading" :class="styles.loading">
          Loading about information...
        </div>

        <!-- Error State -->
        <div v-else-if="error" :class="styles.error">
          {{ error }}
        </div>

        <!-- Main Content -->
        <div v-else-if="personalInfo.length" :class="styles.contentGrid">
          <!-- Left Column - Introduction -->
          <div :class="styles.leftColumn">
            <!-- Profile Card -->
            <TiltCard
              preset="default"
              :class="styles.profileCard"
            >
              <!-- Background gradient overlay -->
              <div :class="styles.profileCardBgOverlay"></div>
              
              <!-- Shimmer effect -->
              <div :class="styles.profileCardShimmer"></div>

              <div :class="styles.profileCardContent">
                <div :class="styles.profileHeader">
                  <div :class="styles.profileIcon">
                    <User :class="styles.profileIconSvg" />
                  </div>
                  <h3 :class="styles.profileName">
                    Farruh Sheripov
                  </h3>
                </div>
                
                <div :class="styles.profileDescription">
                  <p v-for="(paragraph, idx) in bio" :key="idx" v-html="parseHighlight(paragraph)"></p>
                </div>

                <!-- Interests -->
                <div :class="styles.interestsSection">
                  <h4 :class="styles.interestsTitle">
                    <Heart :class="styles.interestsTitleIcon" />
                    What I Love
                  </h4>
                  <div :class="styles.interestsList">
                    <div 
                      v-for="(interest, index) in interests" 
                      :key="index" 
                      :class="styles.interestItem"
                    >
                      <component 
                        :is="interest.icon"
                        :class="[
                          styles.interestIcon, 
                          styles[`interestIcon${interest.color.charAt(0).toUpperCase() + interest.color.slice(1)}`]
                        ]"
                      />
                      <span :class="styles.interestText">{{ interest.text }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Decorative elements -->
              <div :class="styles.profileCardDecorative"></div>
            </TiltCard>
          </div>

          <!-- Right Column - Professional Info -->
          <div :class="styles.rightColumn">
            <!-- Professional Info Cards -->
            <TiltCard 
              v-for="(info, index) in personalInfo"
              :key="index"
              preset="subtle"
              :class="styles.contactCard" 
              :style="getCardStyle(info, index)"
            >
              <!-- Background gradient overlay -->
              <div :class="styles.contactCardBgOverlay"></div>

              <!-- Shimmer effect -->
              <div :class="styles.contactCardShimmer"></div>

              <div :class="styles.contactCardContent">
                <div :class="styles.contactIcon">
                  <component :is="info.icon" :class="styles.contactIconSvg" />
                </div>
                <div :class="styles.contactInfo">
                  <h4 :class="styles.contactInfoTitle">{{ info.title }}</h4>
                  <div :class="styles.contactInfoDescription">{{ info.description }}</div>
                  <a
                    v-if="info.link"
                    :href="info.link"
                    :target="info.link.startsWith('http') ? '_blank' : undefined"
                    :rel="info.link.startsWith('http') ? 'noopener noreferrer' : undefined"
                    :class="[styles.contactLink, styles.contactInfoValue]"
                  >
                    {{ info.value }}
                  </a>
                  <div v-else :class="styles.contactInfoValue">{{ info.value }}</div>
                </div>
              </div>

              <!-- Decorative elements -->
              <div :class="styles.contactCardDecorative"></div>
            </TiltCard>

            <!-- Key Achievements -->
            <div v-if="achievements && achievements.length > 0" :class="styles.achievementsSection">
              <h4 :class="styles.achievementsTitle">
                <Award :class="styles.achievementsTitleIcon" />
                Key Achievements
              </h4>
              <div :class="styles.achievementsList">
                <div 
                  v-for="(achievement, idx) in achievements" 
                  :key="idx" 
                  :class="styles.achievementItem"
                >
                  <CheckCircle :class="styles.achievementIcon" />
                  <span :class="styles.achievementText">{{ achievement }}</span>
                </div>
              </div>
            </div>

            <!-- Open Source Contributions -->
            <div v-if="stats && stats.length > 0" :class="styles.quickStats">
              <div 
                v-for="(stat, idx) in stats" 
                :key="idx" 
                :class="styles.statCard"
              >
                <div :class="[
                  styles.statNumber, 
                  styles[`statNumber${stat.color.charAt(0).toUpperCase() + stat.color.slice(1)}`]
                ]">{{ stat.number }}</div>
                <div :class="styles.statLabel">{{ stat.label }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- No Data State -->
        <div v-else :class="styles.error">
          No personal information available
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, type CSSProperties } from 'vue'
import {
  MapPin,
  Mail,
  ExternalLink,
  Code,
  Heart,
  Coffee,
  Zap,
  Star,
  User,
  Globe,
  Calendar,
  Award,
  Briefcase,
  Lightbulb,
  Target,
  Cloud,
  Users,
  CheckCircle,
  type LucideIcon,
} from 'lucide-vue-next'
import TiltCard from '../shared/TiltCard.vue'
import styles from './About.module.css'

// Color palette for dynamic color generation
const colorPalettes = [
  { primary: '#3b82f6', secondary: '#06b6d4', text: '#93c5fd' }, // blue
  { primary: '#10b981', secondary: '#14b8a6', text: '#6ee7b7' }, // emerald
  { primary: '#8b5cf6', secondary: '#7c3aed', text: '#c4b5fd' }, // purple
  { primary: '#f97316', secondary: '#f59e0b', text: '#fdba74' }, // orange
  { primary: '#ec4899', secondary: '#db2777', text: '#f9a8d4' }, // pink
  { primary: '#ef4444', secondary: '#dc2626', text: '#fca5a5' }, // red
  { primary: '#f59e0b', secondary: '#d97706', text: '#fcd34d' }, // amber
  { primary: '#84cc16', secondary: '#65a30d', text: '#bef264' }, // lime
  { primary: '#14b8a6', secondary: '#0d9488', text: '#5eead4' }, // teal
  { primary: '#6366f1', secondary: '#4f46e5', text: '#a5b4fc' }  // indigo
]

// Map of icon names (strings coming from JSON) to Lucide icon components
const iconsMap: Record<string, any> = {
  MapPin,
  Mail,
  ExternalLink,
  Code,
  Heart,
  Coffee,
  Zap,
  Star,
  User,
  Globe,
  Calendar,
  Award,
  Briefcase,
  Lightbulb,
  Target,
  Cloud,
  Users,
  CheckCircle,
}

// Types for JSON
interface PersonalInfoJson {
  icon: string
  title: string
  value: string
  description: string
  link?: string
}

interface InterestJson {
  icon: string
  text: string
  color: string
}

interface AboutJson {
  personalInfo: PersonalInfoJson[]
  interests: InterestJson[]
  stats: { number: string; label: string; color: string }[]
  bio: string[]
  achievements: string[]
}

// Component state interfaces (with resolved icons)
interface PersonalInfo {
  icon: any
  title: string
  value: string
  description: string
  link?: string
  colorPalette?: {
    primary: string
    secondary: string
    text: string
  }
}

interface InterestItem {
  icon: any
  text: string
  color: string
}

interface StatItem {
  number: string
  label: string
  color: string
}

// Extend CSS Properties to support CSS variables
interface CustomCSSProperties extends CSSProperties {
  '--card-gradient'?: string
  '--text-color'?: string
  '--border-hover'?: string
  '--shadow-color'?: string
  '--title-hover-color'?: string
  'animation-delay'?: string
}

// Reactive state
const personalInfo = ref<PersonalInfo[]>([])
const interests = ref<InterestItem[]>([])
const stats = ref<StatItem[]>([])
const bio = ref<string[]>([])
const achievements = ref<string[]>([])
const isLoading = ref(true)
const error = ref<string | null>(null)

// Utility to convert [[text|color]] markup to highlighted HTML
const parseHighlight = (paragraph: string) => {
  const regex = /\[\[(.*?)\|(.*?)\]\]/g
  return paragraph.replace(regex, (match, text, color) => {
    const cls = styles[`highlight${color.charAt(0).toUpperCase() + color.slice(1)}`] || ''
    return `<span class="${cls}">${text}</span>`
  })
}

// Get card style for personal info cards
const getCardStyle = (info: PersonalInfo, index: number): CustomCSSProperties => {
  const { primary, secondary, text } = info.colorPalette || colorPalettes[0]
  return {
    '--card-gradient': `linear-gradient(135deg, ${primary}33 0%, ${secondary}33 100%)`,
    '--text-color': text,
    '--border-hover': `${primary}66`,
    '--shadow-color': `${primary}33`,
    '--title-hover-color': text,
    'animation-delay': `${index * 0.1}s`,
  }
}

onMounted(async () => {
  try {
    isLoading.value = true
    const response = await fetch('/data/about.json')
    if (!response.ok) {
      throw new Error(`Failed to fetch about data: ${response.status}`)
    }
    const data: AboutJson = await response.json()
    console.log("About data loaded:", data)

    // Map personal info
    const mappedPersonalInfo: PersonalInfo[] = data.personalInfo.map((item, idx) => ({
      icon: iconsMap[item.icon] || User,
      title: item.title,
      value: item.value,
      description: item.description,
      link: item.link,
      colorPalette: colorPalettes[idx % colorPalettes.length],
    }))

    // Map interests
    const mappedInterests: InterestItem[] = data.interests.map((item) => ({
      icon: iconsMap[item.icon] || Star,
      text: item.text,
      color: item.color,
    }))

    personalInfo.value = mappedPersonalInfo
    interests.value = mappedInterests
    stats.value = data.stats || []
    bio.value = data.bio || []
    achievements.value = data.achievements || []
    console.log("Stats:", data.stats)
    console.log("Achievements:", data.achievements)
  } catch (err) {
    console.error('Error loading about data:', err)
    error.value = 'Failed to load about data'
  } finally {
    isLoading.value = false
  }
})
</script>