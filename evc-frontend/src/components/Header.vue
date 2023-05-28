<template>
  <header>
    <h1 @click="click">EVCharging</h1>
    <Link :linkContent="'Logout'" @click="logout" v-if="!!apiKey" />
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

import Link from './links/Link.vue'

const router = useRouter()
const store = useStore()

const apiKey = computed(() => store.getters.apiKey)

const click = () => {
  if (store.getters.apiKey === null) {
    router.push('/')
    return
  }
  router.push('/orders')
}

const logout = () => {
  store.dispatch('logout')
  router.push('/')
}
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

h1 {
  font-weight: bold;
  cursor: pointer;
}
</style>
