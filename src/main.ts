import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './index.css'

// Create router
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { 
      path: '/', 
      name: 'Index',
      component: () => import('./views/IndexView.vue') 
    },
    { 
      path: '/:pathMatch(.*)*', 
      name: 'NotFound',
      component: () => import('./views/NotFound.vue') 
    }
  ]
})

// Create Pinia store
const pinia = createPinia()

// Create and configure app
const app = createApp(App)

// Install plugins
app.use(pinia)
app.use(VueQueryPlugin, {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 minutes
        cacheTime: 1000 * 60 * 10, // 10 minutes
      },
    },
  },
})
app.use(router)

// Mount app
app.mount('#app')