<template>
  <div id="app">
    <RouterView />
    <!-- Toast notifications -->
    <Toaster />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useToast } from 'vue-toastification'

// Global toast setup - providers are configured in main.ts
const toast = useToast()

// Provide a basic toaster component placeholder
// In a real implementation, you would use vue-toastification or vue-sonner
const Toaster = {
  template: '<div></div>' // Empty div as placeholder for now
}
</script>

<style>
/* Global styles are imported in main.ts */
</style>