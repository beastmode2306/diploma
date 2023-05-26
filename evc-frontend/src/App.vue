<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/Header.vue'

</script>

<template>
  <Header/>
  <RouterView />
</template>

<style>

@font-face {
  src: url('./fonts/pt-mono.bold.ttf') format('truetype');
  font-family: 'pt-mono';
  font-weight: bold;
  font-style: normal;
}

@font-face {
  src: url('./fonts/pt-mono.regular.ttf') format('truetype');
  font-family: 'pt-mono';
  font-weight: normal;
  font-style: normal;
}

</style>
