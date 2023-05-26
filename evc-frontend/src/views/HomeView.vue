<script setup>
import SubmitApiKeyRequestForm from "../components/forms/SubmitApiKeyRequestForm.vue";
import LoginExistingApiKeyForm from "../components/forms/LoginExistingApiKeyForm.vue";
</script>

<template>
  <main>
    <SubmitApiKeyRequestForm/>
    <LoginExistingApiKeyForm/>
  </main>
</template>

<style scoped>

main {
  margin-top: 25px;
}

</style>