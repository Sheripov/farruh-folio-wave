<template>
  <section id="experience" :class="styles.experience">
    <div :class="styles.container">
      <!-- Header -->
      <div :class="styles.header">
        <h2 :class="styles.title">
          Professional Experience
        </h2>
        <div :class="styles.titleUnderline"></div>
        <p :class="styles.subtitle">
          A journey of growth, innovation, and technical excellence in Python development and cloud architecture.
        </p>
      </div>

      <div v-if="experiences.length" :class="styles.experienceContainer">
        <div :class="styles.timelineWrapper">
          <!-- Enhanced Timeline line -->
          <div :class="styles.timelineLine"></div>
          <div :class="styles.timelineLineBlur"></div>

          <div 
            v-for="(exp, index) in experiences" 
            :key="index"
            :class="styles.experienceItem"
            :style="{
              animationDelay: `${index * 0.2}s`
            }"
          >
            <!-- Enhanced Timeline dot -->
            <div :class="[styles.timelineDot, styles[`${exp.color}Dot`]]">
              <div :class="[styles.timelineDotInner, styles[`${exp.color}DotInner`]]"></div>
            </div>
            
            <!-- Experience Card -->
            <TiltCard 
              preset="subtle"
              :class="styles.experienceCard"
            >
              <!-- Background gradient overlay -->
              <div :class="[styles.cardOverlay, styles[`${exp.color}Overlay`]]"></div>
              
              <!-- Shimmer effect -->
              <div :class="styles.shimmerEffect"></div>

              <div :class="styles.cardContent">
                <!-- Header -->
                <div :class="styles.cardHeader">
                  <div :class="styles.headerLeft">
                    <div :class="styles.titleRow">
                      <div :class="[styles.iconWrapper, styles[`${exp.color}Icon`]]">
                        <Briefcase :class="[styles.icon, styles[`${exp.color}IconColor`]]" />
                      </div>
                      <h3 :class="[styles.jobTitle, styles[`${exp.color}Title`]]">
                        {{ exp.title }}
                      </h3>
                    </div>
                    <h4 :class="[styles.companyName, styles[`${exp.color}Company`]]">
                      {{ exp.company }}
                    </h4>
                  </div>
                  
                  <!-- Date and info badges -->
                  <div :class="styles.headerRight">
                    <div :class="styles.dateRow">
                      <Calendar :class="styles.calendarIcon" />
                      <span :class="[styles.dateBadge, styles[`${exp.color}Badge`]]">
                        {{ exp.dates }}
                      </span>
                    </div>
                    <div :class="styles.infoBadges">
                      <span :class="styles.infoBadge">
                        {{ exp.duration }}
                      </span>
                      <span :class="styles.infoBadge">
                        {{ exp.type }}
                      </span>
                      <span :class="styles.infoBadge">
                        {{ exp.location }}
                      </span>
                    </div>
                  </div>
                </div>

                <!-- Key Achievements -->
                <div :class="styles.achievementsSection">
                  <h5 :class="[styles.sectionTitle, styles[`${exp.color}SectionTitle`]]">
                    <TrendingUp :class="styles.sectionIcon" />
                    Key Achievements
                  </h5>
                  <div :class="styles.achievementsList">
                    <div 
                      v-for="(achievement, achievementIndex) in exp.achievements" 
                      :key="achievementIndex" 
                      :class="styles.achievementItem"
                    >
                      <div :class="[styles.achievementBullet, styles[`${exp.color}Bullet`]]"></div>
                      <span :class="styles.achievementText">
                        {{ achievement }}
                      </span>
                    </div>
                  </div>
                </div>

                <!-- Technologies -->
                <div :class="styles.technologiesSection">
                  <h5 :class="[styles.sectionTitle, styles[`${exp.color}SectionTitle`]]">
                    <Award :class="styles.sectionIcon" />
                    Technologies Used
                  </h5>
                  <div :class="styles.techList">
                    <span
                      v-for="(tech, techIndex) in exp.technologies"
                      :key="techIndex"
                      :class="[styles.techBadge, styles[`${exp.color}Tech`]]"
                    >
                      {{ tech }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Decorative elements -->
              <div :class="styles.decorativeElements">
                <div :class="[styles.decorativeDot1, styles[`${exp.color}Decor`]]"></div>
                <div :class="[styles.decorativeDot2, styles[`${exp.color}Decor`]]"></div>
              </div>
            </TiltCard>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Briefcase, Calendar, TrendingUp, Users, Award, Star } from 'lucide-vue-next'
import TiltCard from '../shared/TiltCard.vue'
import styles from './Experience.module.css'

// Types
interface ExperienceData {
  company: string
  title: string
  dates: string
  duration: string
  type: string
  location: string
  achievements: string[]
  technologies: string[]
  color: string
}

const experiences = ref<ExperienceData[]>([])

onMounted(async () => {
  try {
    const response = await fetch('/data/experience.json')
    if (!response.ok) throw new Error(`Failed to fetch experiences: ${response.status}`)
    const data: ExperienceData[] = await response.json()
    experiences.value = data
  } catch (e) {
    console.error('Error loading experience.json', e)
  }
})
</script>