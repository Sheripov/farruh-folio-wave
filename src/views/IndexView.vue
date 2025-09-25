<template>
  <div>
    <!-- Navigation outside of scroll wrapper to be truly fixed -->
    <NavigationComponent />

    <!-- Animated floating words -->
    <FloatingWords 
      :count="20"
      :speed="3"
      :rotation-speed="20"
      :opacity="0.2"
      font-size="0.8rem"
      :side-only-percentage="0.85"
      :center-area-start="25"
      :center-area-end="75"
      :left-side-end="20"
      :right-side-start="80"
      :enable-rotation="true"
      :enable-bounce="true"
    />
    
    <ParallaxBackground 
      :config="parallaxConfig" 
      :adjusted-particle-count="adjustedParticleCount"
    >
      <AnimatedParticles :config="particleConfig" />
      <div :class="styles.content">
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <StrengthsSection />
        <EducationSection />
        <ContactSection />
      </div>
    </ParallaxBackground>
    
    <!-- Footer -->
    <footer :class="styles.footer">
      <div :class="styles.footerContainer">
        <p :class="styles.footerText">
          © 2025 FusionCode. Built with Vue 3 and Tailwind CSS.
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useWindowSize } from '@vueuse/core'
import NavigationComponent from '@/components/layout/NavigationComponent.vue'
import ParallaxBackground from '@/components/effects/ParallaxBackground.vue'
import AnimatedParticles from '@/components/effects/AnimatedParticles.vue'
import FloatingWords from '@/components/effects/FloatingWords.vue'
import HeroSection from '@/components/pages/HeroSection.vue'
import AboutSection from '@/components/pages/AboutSection.vue'
import ExperienceSection from '@/components/pages/ExperienceSection.vue'
import ProjectsSection from '@/components/pages/ProjectsSection.vue'
import SkillsSection from '@/components/pages/SkillsSection.vue'
import StrengthsSection from '@/components/pages/StrengthsSection.vue'
import EducationSection from '@/components/pages/EducationSection.vue'
import ContactSection from '@/components/pages/ContactSection.vue'
import { createParallaxConfig } from '@/components/effects/ParallaxConfig'
import styles from './IndexView.module.css'

const { width } = useWindowSize()

const parallaxConfig = createParallaxConfig('intense', {
  // Override specific properties while keeping the preset base
  particleCount: 10,
  mouseIntensity: 1.0,
  backgroundOpacity: 0.8,
})

const adjustedParticleCount = computed(() => 
  width.value < 768 
    ? Math.floor(parallaxConfig.particleCount / 2)
    : parallaxConfig.particleCount
)

const particleConfig = {
  particleCount: 120,
  colors: [
    'rgba(139, 92, 246, 0.3)', // Purple
    'rgba(59, 130, 246, 0.3)', // Blue
    'rgba(236, 72, 153, 0.3)', // Pink
    'rgba(34, 197, 94, 0.3)',  // Green
  ],
  maxConnectionDistance: 60,
  speedRange: [-0.1, 0.1] as [number, number],
  sizeRange: [0.5, 2] as [number, number],
  opacityRange: [0.1, 0.3] as [number, number],
  fps: 24,
}
</script>