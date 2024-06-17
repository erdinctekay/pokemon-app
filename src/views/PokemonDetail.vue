<template>
  <v-container>
    <v-row>
      <v-col cols="12" style="max-width: 540px; margin: auto">
        <v-card v-if="pokemonStore.selectedPokemon" variant="tonal" class="pt-5 pb-3">
          <v-btn
            @click="router.push({ name: 'home', query: { page: pokemonStore.page } })"
            class="position-absolute right-5 top-5"
            style="z-index: 99; aspect-ratio: 1"
            variant="tonal"
            rounded="xxl"
            icon="mdi-close"
          />

          <v-img
            v-if="pokemonStore.selectedPokemon.image !== undefined"
            :src="pokemonStore.selectedPokemon.image || `https://via.placeholder.com/${imgWidth}`"
            aspect-ratio="1"
            :height="imgWidth"
            color="select-none pointer-events-none"
          />
          <div class="text-3xl font-bold">
            {{ convertPokemonName(pokemonStore.selectedPokemon.name) }}
          </div>
          <v-divider
            class="mt-6 -mb-2 mx-10 border-opacity-50"
            style="background: grey"
          ></v-divider>

          <v-card-text>
            <v-row>
              <v-col cols="12">
                <v-list class="bg-transparent">
                  <PokemonDetailChipList
                    :items="pokemonStore.selectedPokemon.other?.types ?? []"
                    attr="type"
                    title="Types"
                  />
                  <PokemonDetailChipList
                    :items="pokemonStore.selectedPokemon.other?.abilities ?? []"
                    attr="ability"
                    title="Abilities"
                  />
                  <PokemonDetailChipList
                    :items="pokemonStore.selectedPokemon.other?.held_items ?? []"
                    attr="item"
                    title="Held Items"
                  />
                  <PokemonDetailChipList
                    :items="pokemonStore.selectedPokemon.other?.moves ?? []"
                    attr="move"
                    title="Moves"
                  />
                </v-list>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { onBeforeMount, onBeforeUnmount, watch } from 'vue'
import { useRouter } from 'vue-router'
import { usePokemonStore } from '@/stores/pokemon'
import { convertPokemonName } from '@/utils'

import PokemonDetailChipList from '@/components/PokemonDetailChipList.vue'

const router = useRouter()

const imgWidth = 200
const pokemonStore = usePokemonStore()

onBeforeUnmount(() => {
  pokemonStore.clearSelectedPokemon()
})

onBeforeMount(() => {
  document.title = `Pokemon App  ${pokemonStore.selectedPokemon?.name ? '- ' + convertPokemonName(pokemonStore.selectedPokemon?.name) : ''}`

  if (!pokemonStore.selectedPokemon) {
    const id = router.currentRoute.value.params.id
    pokemonStore.getSelectedPokemon(id as string)
  }
})

watch(
  () => pokemonStore.selectedPokemon,
  () => {
    document.title = `Pokemon App  ${pokemonStore.selectedPokemon?.name ? '- ' + convertPokemonName(pokemonStore.selectedPokemon?.name) : ''}`
  }
)
</script>
<style scoped>
.no-item {
  min-height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
