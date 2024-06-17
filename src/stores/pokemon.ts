import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import axios from '@/services/pokemonService'

import type { Pokemon } from '@/types/pokemon'

export const usePokemonStore = defineStore('pokemon', () => {
  const router = useRouter()

  const selectedPokemon = ref<Pokemon | null>(null)
  const pokemons = ref<Pokemon[]>([])
  const page = ref(1)
  const take = ref(12)
  const total = ref(0)

  const loading = ref(false)
  const errors = ref<string[]>([])

  const setSelectedPokemon = (pokemon: Pokemon) => (selectedPokemon.value = pokemon)
  const clearSelectedPokemon = () => (selectedPokemon.value = null)

  const goPokemonDetail = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon)
    router.push({ name: 'pokemon', params: { id: pokemon.name } })
  }

  const getSelectedPokemon = async (name: string) => {
    try {
      const response = await axios.get(`pokemon/${name}`)
      setSelectedPokemon({
        name,
        url: `${axios.defaults.baseURL}pokemon/${name}`,
        image: pickPokemonImage(response.data.sprites),
        other: { ...response.data }
      })
    } catch (error) {
      if (error instanceof Error && error.message.includes('Request error')) {
        router.push({ name: '404' })
      } else {
        populateError(error as string)
      }
    }
  }

  const listPokemons = async () => {
    try {
      setLoading(true)
      const currentPage = page.value
      await new Promise((resolve) => setTimeout(resolve, 0))

      // fallback to page 1 if the current page has invalid value
      if (!currentPage || currentPage < 1 || isNaN(currentPage))
        return await router.push({ query: { page: 1 } })

      const response = await axios.get(
        `pokemon?limit=${take.value}&offset=${(currentPage - 1) * take.value}`
      )

      // fallback to page 1 if the current page not exist
      if (!response.data.results.length) return await router.push({ query: { page: 1 } })

      const newPokemons = response.data.results.map((pokemon: Pokemon) => ({
        ...pokemon,
        image: undefined
      }))

      // check if we are still same page before updating the pokemons
      if (currentPage === Number(router.currentRoute.value.query.page)) {
        setPokemons(newPokemons)
        getPokemonImages(newPokemons)
      }

      setTotal(response.data.count)
    } catch (error) {
      populateError(error as string)
    } finally {
      setLoading(false)
    }
  }

  const getPokemonImages = async (pokemons: Pokemon[]) => {
    try {
      const newPokemons = await Promise.all(
        pokemons.map(async (pokemon) => {
          const response = await axios.get(`pokemon/${pokemon.name}`)
          return {
            ...pokemon,
            image: pickPokemonImage(response.data.sprites),
            other: { ...response.data }
          }
        })
      )

      if (page.value === Number(router.currentRoute.value.query.page)) setPokemons(newPokemons)
    } catch (error) {
      populateError(error as string)
    }
  }

  const pickPokemonImage = (sprites: any) =>
    sprites.other['official-artwork'].front_default || (sprites.front_default as string)

  const populateError = (error: string) => {
    setNewError(error)
    // setTimeout(() => removeError(error), 5000)
  }

  const setPokemons = (newPokemons: Pokemon[]) => (pokemons.value = newPokemons)
  const clearPokemons = () => (pokemons.value = [])

  const setPage = (newPage: number) => (page.value = newPage)
  const resetPage = () => (page.value = 1)

  const setTake = (newTake: number) => (take.value = newTake)
  const resetTake = () => (take.value = 20)

  const setTotal = (newTotal: number) => (total.value = newTotal)
  const resetTotal = () => (total.value = 0)

  const setLoading = (newLoading: boolean) => (loading.value = newLoading)

  const setNewError = (error: string) => errors.value.push(error)
  const removeError = (error: string) => errors.value.splice(errors.value.indexOf(error), 1)
  const clearErrors = () => (errors.value = [])

  return {
    pokemons,
    listPokemons,
    setPokemons,
    clearPokemons,

    selectedPokemon,
    setSelectedPokemon,
    clearSelectedPokemon,
    getSelectedPokemon,
    goPokemonDetail,

    page,
    setPage,
    resetPage,

    take,
    setTake,
    resetTake,

    total,
    setTotal,
    resetTotal,

    loading,
    setLoading,

    errors,
    setNewError,
    removeError,
    clearErrors
  }
})
