<template>
  <v-col cols="12" sm="6" md="4" lg="3">
    <v-card
      variant="tonal"
      style="min-height: var(--card-height)"
      class="pokemon-list-item py-5"
      @click="pokemonStore.goPokemonDetail(pokemon)"
    >
      <div class="flex items-center justify-center" :style="{ 'min-height': imgWidth + 'px' }">
        <v-img
          v-if="pokemon.image !== undefined"
          :src="pokemon.image || `https://via.placeholder.com/${imgWidth}`"
          class="mx-auto select-none pointer-events-none"
          aspect-ratio="1"
          :height="imgWidth"
        />
        <v-progress-circular v-else indeterminate color="primary" size="48" />
      </div>
      <v-card-title class="select-none">{{ convertPokemonName(pokemon.name) }} </v-card-title>
    </v-card>
  </v-col>
</template>
<script setup lang="ts">
import { usePokemonStore } from '@/stores/pokemon'
import type { Pokemon } from '@/types/pokemon'
import { convertPokemonName } from '@/utils'

const imgWidth = 135
const pokemonStore = usePokemonStore()

defineProps<{ pokemon: Pokemon }>()
</script>
