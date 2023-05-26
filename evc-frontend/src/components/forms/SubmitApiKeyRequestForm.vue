<template>
  <div class="api-key-request-form">
    <h2 class="title">Submit for your API key</h2>
    <div class="api-key-request-form-inner">
      <FormInput placeholder="Company name" v-model="companyName" @error="handleCompanyNameError" />
      <FormInput
        placeholder="Company email"
        v-model="companyEmail"
        @error="handleCompanyEmailError"
      />
      <FormInput
        placeholder="Company country"
        v-model="companyCountry"
        @error="handleCompanyCountryError"
      />
      <FormTextArea
        placeholder="Request reason"
        v-model="requestReason"
        @error="handleRequestReasonError"
      />

      <Button title="Submit" @click="submit" :has-error="hasError" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import FormInput from '../inputs/FormInput.vue'
import FormTextArea from '../inputs/FormTextArea.vue'
import Button from '../buttons/Button.vue'

const companyNameHasError = ref(false)
const companyEmailHasError = ref(false)
const companyCountryHasError = ref(false)
const requestReasonHasError = ref(false)

const companyName = ref('')
const companyEmail = ref('')
const companyCountry = ref('')
const requestReason = ref('')

const hasError = computed(() => {
  return (
    companyNameHasError.value ||
    companyEmailHasError.value ||
    companyCountryHasError.value ||
    requestReasonHasError.value
  )
})

const handleCompanyNameError = (data) => {
  companyNameHasError.value = data
}

const handleCompanyEmailError = (data) => {
  companyEmailHasError.value = data
}

const handleCompanyCountryError = (data) => {
  companyCountryHasError.value = data
}

const handleRequestReasonError = (data) => {
  requestReasonHasError.value = data
}
const submit = () => {
  companyNameHasError.value = companyName.value === ''
  companyEmailHasError.value = companyEmail.value === ''
  companyCountryHasError.value = companyCountry.value === ''
  requestReasonHasError.value = requestReason.value === ''

  return hasError.value
}
</script>

<style scoped>
.api-key-request-form {
  max-width: 80%;
  margin: 0 auto;
  color: var(--base-color);
}

.api-key-request-form-inner {
  border-radius: 6px;
  border: 1px solid #393939;
  padding: 20px;
  margin-top: 20px;
}
</style>
