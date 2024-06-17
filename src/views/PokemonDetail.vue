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
                  <v-list-item class="pb-3">
                    <div class="list-item-title text-lg font-semibold italic pb-2">Types</div>
                    <div
                      v-if="
                        pokemonStore.selectedPokemon.other?.types &&
                        pokemonStore.selectedPokemon.other.types.length > 0
                      "
                      class="chip-container"
                    >
                      <v-chip
                        v-for="type in pokemonStore.selectedPokemon.other?.types"
                        :key="type.type.name"
                        class="me-2 my-2"
                      >
                        {{ convertPokemonName(type.type.name) }}
                      </v-chip>
                    </div>
                    <div v-else class="no-item">—</div>
                  </v-list-item>
                  <v-list-item class="pb-3">
                    <div class="list-item-title text-lg font-semibold italic pb-2">Abilities</div>
                    <div
                      v-if="
                        pokemonStore.selectedPokemon.other?.abilities &&
                        pokemonStore.selectedPokemon.other.abilities.length > 0
                      "
                      class="chip-container"
                    >
                      <v-chip
                        v-for="ability in pokemonStore.selectedPokemon.other?.abilities"
                        :key="ability.ability.name"
                        class="me-2 my-2"
                      >
                        {{ convertPokemonName(ability.ability.name) }}
                      </v-chip>
                    </div>
                    <div v-else class="no-item">—</div>
                  </v-list-item>
                  <v-list-item class="pb-3">
                    <div class="list-item-title text-lg font-semibold italic pb-2">Held Items</div>
                    <div
                      v-if="
                        pokemonStore.selectedPokemon.other?.held_items &&
                        pokemonStore.selectedPokemon.other.held_items?.length > 0
                      "
                      class="chip-container"
                    >
                      <v-chip
                        v-for="item in pokemonStore.selectedPokemon.other?.held_items"
                        :key="item.item.name"
                        class="me-2 my-2"
                      >
                        {{ convertPokemonName(item.item.name) }}
                      </v-chip>
                    </div>
                    <div v-else class="no-item">—</div>
                  </v-list-item>
                  <v-list-item class="p-0">
                    <div class="list-item-title text-lg font-semibold italic pb-2">Moves</div>
                    <div
                      v-if="
                        pokemonStore.selectedPokemon.other?.moves &&
                        pokemonStore.selectedPokemon.other.moves.length > 0
                      "
                      class="chip-container"
                    >
                      <v-chip
                        v-for="move in pokemonStore.selectedPokemon.other?.moves.slice(0, maxChip)"
                        :key="move.move.name"
                        class="me-2 my-2"
                      >
                        {{ convertPokemonName(move.move.name) }}
                      </v-chip>
                      <v-chip
                        v-if="pokemonStore.selectedPokemon.other.moves.length > maxChip"
                        class="me-2 my-2"
                        color="primary"
                        variant="flat"
                        style="opacity: 0.7"
                      >
                        +{{ pokemonStore.selectedPokemon.other.moves.length - maxChip }} more
                      </v-chip>
                    </div>
                    <div v-else class="no-item">—</div>
                  </v-list-item>
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
import { onBeforeMount, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { usePokemonStore } from '@/stores/pokemon'
import { convertPokemonName } from '@/utils'

const router = useRouter()

const imgWidth = 200
const maxChip = 7
const pokemonStore = usePokemonStore()

onBeforeUnmount(() => {
  pokemonStore.clearSelectedPokemon()
})

onBeforeMount(() => {
  if (!pokemonStore.selectedPokemon) {
    const id = router.currentRoute.value.params.id
    pokemonStore.getSelectedPokemon(id as string)
  }
})
</script>
<style scoped>
.no-item {
  min-height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
