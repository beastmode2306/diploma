<template>
  <h1>Single order</h1>
  <header>
    <h2>Order #{{ route.params.id }}</h2>
    <Button class="btn" title="+ Add order"></Button>
  </header>
</template>

<script setup>
import Button from '../components/buttons/Button.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  color: #6fe69f;
  padding: 10px 0px;
  font-family: 'pt-mono';
  font-weight: bold;
}

.btn {
  width: 200px;
}
</style>
