<template>
  <v-toolbar :elevation="3" class="flex align-center">
    <v-toolbar-title class="ms-0">
      <RouterLink to="/" class="flex items-center space-x-2">
        <img src="/favicon.png" alt="logo" class="w-12 h-12" />
        <span class="font-semibold hidden sm:block">Pokemon App</span>
      </RouterLink>
    </v-toolbar-title>
    <v-menu location="bottom right">
      <template v-slot:activator="{ props }">
        <v-btn
          class="text-case me-0 flex justify-start ps-5"
          rounded="xl"
          variant="flat"
          :prepend-icon="headerProps.themeItems.find((item) => item.value === theme)?.icon"
          v-bind="props"
        >
          <span class="ps-1">
            {{ headerProps.themeItems.find((item) => item.value === theme)?.title }}
          </span>
        </v-btn>
      </template>
      <v-list rounded="lg">
        <v-list-item
          v-for="(item, index) in headerProps.themeItems"
          :key="index"
          @click="item.value !== theme ? setTheme(item.value) : null"
          :base-color="item.value === theme ? 'primary' : undefined"
        >
          <v-row style="min-width: 90px">
            <v-col cols="3">
              <v-icon size="medium">{{ item.icon }}</v-icon>
            </v-col>
            <v-col class="pe-1">
              <span class="text-sm ps-1">{{ item.title }}</span>
            </v-col>
          </v-row>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-toolbar>
</template>
<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { defineProps, defineEmits } from 'vue'
import type { SelectedTheme, ThemeItem } from '@/types/theme'

const headerProps = defineProps<{
  theme: SelectedTheme
  themeItems: ThemeItem[]
}>()

const emits = defineEmits(['setTheme'])

const setTheme = (theme: SelectedTheme) => emits('setTheme', theme)
</script>
