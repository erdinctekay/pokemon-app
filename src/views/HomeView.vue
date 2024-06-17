<template>
  <div class="flex flex-row items-start justify-center" style="min-height: calc(100dvh - 64px)">
    <div class="flex flex-col py-5 container">
      <v-row class="content-start" style="min-height: 750px; --card-height: 225px">
        <template v-if="pokemonStore.loading">
          <v-col v-for="n in pokemonStore.take" :key="n" cols="12" sm="6" md="4" lg="3">
            <v-skeleton-loader style="height: var(--card-height)" />
          </v-col>
        </template>
        <pokemon-list-item
          v-else
          v-for="pokemon in pokemonStore.pokemons"
          :key="pokemon.name"
          :pokemon="pokemon as Pokemon"
        />
      </v-row>

      <v-pagination
        class="mt-5"
        v-model="pokemonStore.page"
        :length="Math.ceil(pokemonStore.total / pokemonStore.take)"
        @input="pokemonStore.setPage"
        :total-visible="5"
      />

      <div style="position: absolute; top: 100px; right: 0; left: 0">
        <v-alert
          v-for="error in pokemonStore.errors"
          :key="error"
          type="error"
          variant="tonal"
          style="max-width: 360px; margin: 0.5rem auto"
        >
          {{ error }}
        </v-alert>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, onBeforeUnmount, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePokemonStore } from '@/stores/pokemon'

import type { Pokemon } from '@/types/pokemon'
import PokemonListItem from '@/components/PokemonListItem.vue'

const router = useRouter()
const route = useRoute()

const pokemonStore = usePokemonStore()

onBeforeMount(() => {
  const page = route.query.page
  page ? pokemonStore.setPage(Number(page)) : router.push({ query: { page: pokemonStore.page } })
})

onBeforeUnmount(() => {
  pokemonStore.clearErrors()
})

// watch page and trigger route
watch(
  () => pokemonStore.page,
  (page) => router.push({ query: { page } })
)

// watch route and trigger list
watch(
  () => route.query.page,
  (page) => {
    if (page) {
      if (page !== String(pokemonStore.page)) pokemonStore.setPage(Number(page))
      pokemonStore.listPokemons()
    }
  },
  { immediate: true }
)
</script>
