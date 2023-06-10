<template>
  <ApiKeyRequested v-if="apiKeyRequested" />
  <div class="api-key-request-form" v-else>
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

      <div class="errors">
        <div v-for="error in errors" v-if="errors instanceof Array">
          {{ error }}
        </div>
        <div v-else>
          {{ errors }}
        </div>
      </div>

      <Button title="Submit" @click="submit" :has-error="hasError" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { instance } from '../../tools/axios'
import FormInput from '../inputs/FormInput.vue'
import FormTextArea from '../inputs/FormTextArea.vue'
import ApiKeyRequested from '../../views/ApiKeyRequested.vue'
import Button from '../buttons/Button.vue'

const companyNameHasError = ref(false)
const companyEmailHasError = ref(false)
const companyCountryHasError = ref(false)
const requestReasonHasError = ref(false)

const companyName = ref('')
const companyEmail = ref('')
const companyCountry = ref('')
const requestReason = ref('')

const errors = ref([])

const apiKeyRequested = ref(false)

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

const handleSubmitError = (data) => {
  errors.value = data?.response?.data?.error?.message || []
}

const handleSubmitSuccess = () => {
  apiKeyRequested.value = true
}

const submit = async () => {
  companyNameHasError.value = companyName.value === ''
  companyEmailHasError.value = companyEmail.value === ''
  companyCountryHasError.value = companyCountry.value === ''
  requestReasonHasError.value = requestReason.value === ''

  if (hasError.value) {
    return
  }

  instance
    .post('/key/submit', {
      companyName: companyName.value,
      companyEmail: companyEmail.value,
      companyCountry: companyCountry.value,
      message: requestReason.value
    })
    .then(handleSubmitSuccess)
    .catch(handleSubmitError)
}
</script>

<style scoped lang="scss">
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

.errors {
  color: var(--base-danger-color);
  margin-bottom: 20px;

  div {
    margin-left: 20px;
    margin-bottom: 2px;
    list-style: none;
    font-size: 12px;
    opacity: 0.9;
  }
}
</style>
