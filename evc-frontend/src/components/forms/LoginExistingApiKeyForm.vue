<template>
  <div class="api-key-existing-form">
    <h2 class="title">Use existing api key</h2>
    <div class="api-key-existing-form-inner">
      <FormInput placeholder="Api key" v-model="apiKey" @error="handleApiKeyError" />
      <Button title="Enter" :has-error="apiKeyHasError" @click="submit" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import FormInput from '../inputs/FormInput.vue'
import Button from '../buttons/Button.vue'

const apiKeyHasError = ref(false)

const apiKey = ref('')

const router = useRouter()

const handleApiKeyError = (data) => {
  apiKeyHasError.value = data
}

const submit = () => {
  const validApiKey = checkApiKey(apiKey.value)

  if (validApiKey) {
    router.push('/orders')
  } else {
    apiKeyHasError.value = true
  }
}

const checkApiKey = (apiKey) => {
  return apiKey === '123'
}
</script>

<style scoped>
.api-key-existing-form {
  max-width: 80%;
  margin: 20px auto;
  color: var(--base-color);
}

.api-key-existing-form-inner {
  border-radius: 6px;
  border: 1px solid #393939;
  padding: 20px;
  margin-top: 20px;
}
</style>
