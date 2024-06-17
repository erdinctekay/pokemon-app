<template>
  <div class="flex flex-row items-center justify-center" style="height: calc(100dvh - 64px)">
    <div class="flex flex-col items-center">
      <v-empty-state
        headline="Whoops, 404"
        title="Page not found"
        text="The page you were looking for does not exist"
        image="/favicon.png"
      ></v-empty-state>
      <div style="height: 50px"></div>
      <v-btn
        to="/?page=1"
        class="text-case"
        color="primary"
        variant="tonal"
        size="x-large"
        rounded="xl"
        prepend-icon="mdi-menu-left"
      >
        Return Home
      </v-btn>
      <div style="height: 150px"></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
  document.title = 'Pokemon App - 404 '
})
</script>
