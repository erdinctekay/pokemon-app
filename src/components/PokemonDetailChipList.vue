<template>
  <v-list-item class="pb-3">
    <div class="list-item-title text-lg font-semibold italic pb-2">{{ title }}</div>
    <div v-if="items && items.length > 0" class="chip-container">
      <v-chip v-for="item in items.slice(0, maxChip)" :key="item[attr].name" class="me-2 my-2">
        {{ convertPokemonName(item[attr].name) }}
      </v-chip>
      <v-chip
        v-if="items.length > maxChip"
        class="me-2 my-2"
        color="primary"
        variant="flat"
        style="opacity: 0.7"
      >
        +{{ items.length - maxChip }} more
      </v-chip>
    </div>
    <div v-else class="no-item">—</div>
  </v-list-item>
</template>
<script setup lang="ts">
import { convertPokemonName } from '@/utils'

const maxChip = 7
defineProps<{ items: any[]; attr: string; title: string }>()
</script>
