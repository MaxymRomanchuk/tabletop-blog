<script setup lang="ts">
  import { RouterView } from 'vue-router';
  import NavBar from './components/NavBar.vue';
</script>

<template>
  <NavBar />

  <RouterView />
</template>

<style>
.main-bg {
  background-color: #FFF2D7;
}

.header-bg {
  background-color: #503e32;
}

.primary-bg {
  background-color: #FED8B1;
}

.secondary-bg {
  background-color: #ECB176;
}

.primary-text {
  color: #6F4E37;
}

.secondary-text {
  color: #FED8B1;
}
</style>