<template>
  <v-theme-provider :theme="theme || systemTheme" with-background style="min-height: 100dvh">
    <TheHeader :theme="theme" :themeItems="themeItems" @setTheme="setTheme" />
    <main>
      <router-view v-slot="{ Component, route }">
        <transition name="fade" mode="out-in">
          <component :is="Component" :key="route.path" />
        </transition>
      </router-view>
    </main>
  </v-theme-provider>
</template>

<script setup lang="ts">
import TheHeader from '@/components/TheHeader.vue'

import { RouterView } from 'vue-router'
import { onBeforeMount, onBeforeUnmount, ref } from 'vue'
import type { SelectedTheme, Theme, ThemeItem } from '@/types/theme'

// variables

const systemTheme = ref<Theme>()
const theme = ref<SelectedTheme>(null)
const themeItems = ref<ThemeItem[]>([
  { title: 'Light', value: 'light', icon: 'mdi-white-balance-sunny' },
  { title: 'System', value: null, icon: 'mdi-monitor' },
  { title: 'Dark', value: 'dark', icon: 'mdi-weather-night' }
])

// listeners

onBeforeMount(() => {
  systemTheme.value = getSystemTheme()

  const storedTheme = localStorage.getItem('theme')
  window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', handleSystemThemeChange)

  if (storedTheme) setTheme(storedTheme as Theme)
})

onBeforeUnmount(() => {
  window
    .matchMedia('(prefers-color-scheme: dark)')
    .removeEventListener('change', handleSystemThemeChange)
})

// methods

const setMatches = (e: any) => (e.matches ? 'dark' : 'light')

const handleSystemThemeChange = (e: any) => (systemTheme.value = setMatches(e))
const getSystemTheme = () => setMatches(window.matchMedia('(prefers-color-scheme: dark)'))
const setTheme = (mode: SelectedTheme) => {
  const rootElement = document.documentElement
  if (rootElement.classList.contains('dark-theme')) rootElement.classList.remove('dark-theme')
  if (rootElement.classList.contains('light-theme')) rootElement.classList.remove('light-theme')

  if (mode === null) {
    localStorage.removeItem('theme')
    theme.value = null
  } else {
    localStorage.setItem('theme', mode)
    theme.value = mode
    rootElement.classList.add(mode + '-theme')
  }
}
</script>
