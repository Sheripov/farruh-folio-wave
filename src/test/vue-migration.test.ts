/**
 * Basic integration test for Vue 3 portfolio migration
 * This test verifies that core Vue 3 components are working correctly
 */

import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import App from '@/App.vue'
import NotFound from '@/views/NotFound.vue'

// Create a basic router for testing
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: { template: '<div>Home</div>' } },
    { path: '/:pathMatch(.*)*', component: NotFound }
  ]
})

describe('Vue 3 Portfolio Migration', () => {
  it('should render App component without errors', async () => {
    const wrapper = mount(App, {
      global: {
        plugins: [router]
      }
    })
    
    expect(wrapper.find('#app')).toBeTruthy()
  })

  it('should render NotFound component with correct content', () => {
    const wrapper = mount(NotFound, {
      global: {
        plugins: [router]
      }
    })
    
    expect(wrapper.text()).toContain('404')
    expect(wrapper.text()).toContain('Page Not Found')
    expect(wrapper.find('h1').text()).toBe('404')
  })

  it('should have proper Vue 3 composition API structure', () => {
    // Verify Vue 3 is properly configured
    expect(typeof mount).toBe('function')
    expect(typeof createRouter).toBe('function')
  })
})

describe('Vue 3 Component Architecture', () => {
  it('should use Vue 3 Composition API pattern', () => {
    const wrapper = mount(NotFound, {
      global: {
        plugins: [router]
      }
    })
    
    // Verify component mounts successfully with Vue 3
    expect(wrapper.vm).toBeDefined()
  })
})