<script setup>
import SubmitApiKeyRequestForm from '../components/forms/SubmitApiKeyRequestForm.vue'
import LoginExistingApiKeyForm from '../components/forms/LoginExistingApiKeyForm.vue'

import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

if (store.getters.apiKey !== null) {
  router.push('/orders')
}
</script>

<template>
  <main>
    <SubmitApiKeyRequestForm />
    <LoginExistingApiKeyForm />
  </main>
</template>

<style scoped>
main {
  margin-top: 25px;
}
</style>
