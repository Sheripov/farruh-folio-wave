<template>
  <section id="projects" :class="styles.projectsSection">
    <div :class="styles.container">
      <!-- Header -->
      <div :class="styles.header">
        <h2 :class="styles.title">
          Featured Projects
        </h2>
        <div :class="styles.titleUnderline"></div>
        <p :class="styles.subtitle">
          A showcase of my recent work in backend development, cloud infrastructure, and full-stack applications.
        </p>
      </div>

      <div :class="styles.projectsGrid">
        <TiltCard
          v-for="(project, index) in projects"
          :key="index"
          :class="styles.projectCard"
          :style="getCardStyle(project)"
        >
          <!-- Background gradient overlay -->
          <div :class="styles.gradientOverlay"></div>
          
          <!-- Shimmer effect -->
          <div :class="styles.shimmerEffect"></div>

          <div :class="styles.cardContent">
            <!-- Header -->
            <div :class="styles.cardHeader">
              <div :class="styles.cardHeaderContent">
                <div :class="styles.cardTitleContainer">
                  <h3 :class="styles.cardTitle">
                    {{ project.title }}
                  </h3>
                </div>
                <div :class="styles.cardMeta">
                  <span :class="styles.categoryBadge">
                    {{ project.category }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Project Info -->
            <div :class="styles.projectInfo">
              <div :class="styles.infoItem">
                <Users :class="styles.infoIcon" />
                <span>{{ project.role }}</span>
              </div>
            </div>

            <!-- Description -->
            <p :class="styles.description">
              {{ project.description }}
            </p>
            
            <!-- Impact -->
            <div :class="styles.impactSection">
              <h4 :class="styles.sectionTitle">
                <Zap :class="styles.infoIcon" />
                Impact
              </h4>
              <p :class="styles.impactText">
                {{ project.impact }}
              </p>
            </div>
            
            <!-- Challenges -->
            <div :class="styles.challengesSection">
              <h4 :class="styles.sectionTitle">
                <Calendar :class="styles.infoIcon" />
                Challenges
              </h4>
              <p :class="styles.challengesText">
                {{ project.challenges }}
              </p>
            </div>

            <!-- Key Highlights -->
            <div :class="styles.highlightsSection">
              <h4 :class="styles.highlightsTitle">
                <Code :class="styles.infoIcon" />
                Key Features
              </h4>
              <div :class="styles.highlightsGrid">
                <div 
                  v-for="(highlight, idx) in project.highlights" 
                  :key="idx" 
                  :class="styles.highlightItem"
                >
                  <div :class="styles.highlightDot"></div>
                  {{ highlight }}
                </div>
              </div>
            </div>

            <!-- Bottom Section: technologies + links -->
            <div :class="styles.bottomSection">
              <!-- Technologies -->
              <div :class="styles.technologies">
                <span 
                  v-for="(tech, idx) in project.technologies" 
                  :key="idx" 
                  :class="styles.techTag"
                >
                  {{ tech }}
                </span>
              </div>

              <!-- Links -->
              <div v-if="!project.hideCode || !project.hideDemo" :class="styles.links">
                <template v-if="!project.hideCode">
                  <a 
                    v-if="project.github" 
                    :href="project.github" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    :class="styles.link"
                  >
                    <Github :class="styles.linkIcon" />
                    Code
                  </a>
                  <span v-else :class="[styles.link, styles.linkDisabled]">
                    <Github :class="styles.linkIcon" />
                    Code
                  </span>
                </template>

                <template v-if="!project.hideDemo">
                  <a 
                    v-if="project.demo" 
                    :href="project.demo" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    :class="styles.link"
                  >
                    <ExternalLink :class="styles.linkIcon" />
                    Demo
                  </a>
                  <span v-else :class="[styles.link, styles.linkDisabled]">
                    <ExternalLink :class="styles.linkIcon" />
                    Demo
                  </span>
                </template>
              </div>
            </div>
          </div>

          <!-- Decorative elements -->
          <div :class="styles.decorativeElement1"></div>
          <div :class="styles.decorativeElement2"></div>
        </TiltCard>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, type CSSProperties } from 'vue'
import { ExternalLink, Github, Calendar, Users, Code, Zap } from 'lucide-vue-next'
import TiltCard from '@/components/shared/TiltCard.vue'
import styles from './Project.module.css'

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

interface ProjectData {
  title: string
  description: string
  technologies: string[]
  category: string
  impact: string
  role: string
  challenges: string
  highlights: string[]
  github?: string
  demo?: string
  hideCode?: boolean
  hideDemo?: boolean
  colorPalette?: {
    primary: string
    secondary: string
    text: string
  }
}

// Extend CSS Properties to support CSS variables
interface CustomCSSProperties extends CSSProperties {
  '--card-gradient'?: string
  '--text-color'?: string
  '--border-hover'?: string
  '--shadow-color'?: string
}

const projects = ref<ProjectData[]>([])

const getCardStyle = (project: ProjectData): CustomCSSProperties => {
  const { primary, secondary, text } = project.colorPalette || colorPalettes[0]
  return {
    '--card-gradient': `linear-gradient(135deg, ${primary}33 0%, ${secondary}33 100%)`,
    '--text-color': text,
    '--border-hover': `${primary}66`,
    '--shadow-color': `${primary}33`,
  }
}

onMounted(async () => {
  try {
    const response = await fetch('/data/projects.json')
    if (!response.ok) {
      throw new Error(`Failed to fetch projects: ${response.status}`)
    }
    const data = await response.json()
    // Assign colors dynamically based on index
    const projectsWithColors = data.map((project: ProjectData, idx: number) => ({
      ...project,
      colorPalette: colorPalettes[idx % colorPalettes.length]
    }))
    projects.value = projectsWithColors
  } catch (err) {
    console.error('Error loading projects:', err)
  }
})
</script>