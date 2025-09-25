<template>
  <section id="contact" :class="styles.contact">      
    <div :class="styles.container">
      <!-- Header -->
      <div :class="styles.header">
        <h2 :class="styles.title">
          Get In Touch
        </h2>
        <div :class="styles.titleUnderline"></div>
        <p :class="styles.subtitle">
          Let's create something amazing together. I'm always excited to discuss new projects and opportunities.
        </p>
      </div>

      <div :class="[styles.contentGrid, !showContactForm ? styles.singleColumn : '']">
        <!-- Contact Information -->
        <div :class="styles.contactInfo">
          <div :class="styles.infoCard">
            <h3 :class="styles.infoCardTitle">
              <Heart :class="styles.heartIcon" />
              Let's Work Together
            </h3>
            <p :class="styles.infoCardDescription">
              I'm passionate about creating innovative solutions and building meaningful connections. 
              Whether you have a project in mind or just want to say hello, I'd love to hear from you.
            </p>
            
            <div :class="styles.contactMethods">
              <div 
                v-for="(method, index) in methods"
                :key="index" 
                :class="styles.contactMethod" 
                :style="{
                  '--card-gradient': `linear-gradient(135deg, ${method.colorPalette.primary}33 0%, ${method.colorPalette.secondary}33 100%)`,
                  '--text-color': method.colorPalette.text,
                  '--border-hover': `${method.colorPalette.primary}66`,
                  '--shadow-color': `${method.colorPalette.primary}33`,
                  animationDelay: `${index * 0.05}s`,
                }"
              >
                <div :class="styles.methodIcon">
                  <component :is="method.icon" :class="styles.methodSvg" />
                </div>
                <div :class="styles.methodDetails">
                  <h4>{{ method.title }}</h4>
                  <a 
                    v-if="method.link"
                    :href="method.link" 
                    :class="styles.methodLink" 
                    :target="method.link.startsWith('http') ? '_blank' : undefined" 
                    :rel="method.link.startsWith('http') ? 'noopener noreferrer' : undefined"
                  >
                    {{ method.value }}
                  </a>
                  <span v-else :class="styles.methodLink">{{ method.value }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Contact Form - Conditionally rendered -->
        <div v-if="showContactForm" :class="styles.formCard">
          <h3 :class="styles.formTitle">Send me a message</h3>
          
          <form @submit="handleSubmit" :class="styles.form">
            <div :class="styles.formGroup">
              <label for="name">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                v-model="formData.name"
                required
                autocomplete="name"
                :class="styles.input"
                placeholder="John Doe"
              />
            </div>

            <div :class="styles.formGroup">
              <label for="email">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                v-model="formData.email"
                required
                autocomplete="email"
                :class="styles.input"
                placeholder="john@example.com"
              />
            </div>

            <div :class="styles.formGroup">
              <label for="message">
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="6"
                v-model="formData.message"
                required
                :class="styles.textarea"
                placeholder="Tell me about your project or how I can help you..."
              />
            </div>

            <button 
              type="submit" 
              :class="styles.submitButton"
              :disabled="isSubmitting"
            >
              <span v-if="isSubmitting" :class="styles.submitting">
                <span :class="styles.loadingDot"></span>
                <span :class="styles.loadingDot"></span>
                <span :class="styles.loadingDot"></span>
              </span>
              <template v-else>
                <Send :class="styles.sendIcon" />
                Send Message
              </template>
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, type Component } from 'vue'
import {
  Mail,
  Phone,
  Send,
  MapPin,
  Heart,
} from 'lucide-vue-next'
import styles from './Contact.module.css'

// Dynamic color palettes
const colorPalettes = [
  { primary: '#a855f7', secondary: '#ec4899', text: '#d8b4fe' }, // violet-pink
  { primary: '#3b82f6', secondary: '#8b5cf6', text: '#93c5fd' }, // blue-violet
  { primary: '#ec4899', secondary: '#a855f7', text: '#f9a8d4' }, // pink-violet
]

// Icons map for JSON
const iconsMap: Record<string, Component> = {
  Mail,
  Phone,
  MapPin,
}

// Types
interface ContactMethodJson {
  icon: string
  title: string
  value: string
  link?: string
}

interface ContactJson {
  contactMethods: ContactMethodJson[]
  showContactForm: boolean
}

interface ContactMethod {
  icon: Component
  title: string
  value: string
  link?: string
  colorPalette: {
    primary: string
    secondary: string
    text: string
  }
}

// Reactive data
const formData = reactive({
  name: '',
  email: '',
  message: ''
})

const isSubmitting = ref(false)
const methods = ref<ContactMethod[]>([])
const showContactForm = ref(true)

// Simple toast notification function (Vue 3 replacement for useToast)
const showToast = (title: string, description: string, variant: 'default' | 'destructive' = 'default') => {
  // Simple alert for now - in production you'd want to use a proper toast library
  console.log(`${title}: ${description}`)
  alert(`${title}\n${description}`)
}

const handleSubmit = async (e: Event) => {
  e.preventDefault()
  isSubmitting.value = true

  // Simulate form submission delay
  await new Promise(resolve => setTimeout(resolve, 1500))

  try {
    // Create mailto link with form data
    const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`)
    const body = encodeURIComponent(
      `Name: ${formData.name}
Email: ${formData.email}

Message:
${formData.message}`
    )
    const mailtoLink = `mailto:farruh.sheripov@fusioncode.org?subject=${subject}&body=${body}`
    
    // Open email client
    window.open(mailtoLink)
    
    showToast(
      "Opening email client...",
      "Your default email client will open with the message pre-filled."
    )
    
    // Reset form
    formData.name = ''
    formData.email = ''
    formData.message = ''
  } catch (error) {
    showToast(
      "Unable to open email client",
      "Please contact me directly at farruh.sheripov@fusioncode.org",
      "destructive"
    )
  } finally {
    isSubmitting.value = false
  }
}

// Load contact methods from JSON
onMounted(async () => {
  try {
    const response = await fetch('/data/contact.json')
    if (!response.ok) throw new Error(`Failed to fetch contact: ${response.status}`)
    const data: ContactJson = await response.json()

    const mapped: ContactMethod[] = data.contactMethods.map((item, idx) => ({
      icon: iconsMap[item.icon] || Mail,
      title: item.title,
      value: item.value,
      link: item.link,
      colorPalette: colorPalettes[idx % colorPalettes.length],
    }))

    methods.value = mapped
    showContactForm.value = data.showContactForm
  } catch (e) {
    console.error('Error loading contact.json', e)
  }
})
</script>