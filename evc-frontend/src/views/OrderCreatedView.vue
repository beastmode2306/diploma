<script setup>
import Button from '../components/buttons/Button.vue'

import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

const onClick = () => {
  router.push('/orders')
}
</script>

<template>
  <div class="created">
    <p class="title">Your order has been created!</p>
    <p class="subtitle">You will be updated once your order is ready.</p>
    <div class="btn">
      <Button title="Back to orders" @click="onClick" />
    </div>
  </div>
</template>

<style scoped>
.btn {
  width: 200px;
}

.created {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'pt-mono';
  font-weight: bold;
  font-size: 20px;
  color: #6fe69f;
  margin-top: 20%;
}

.title {
  font-weight: bold;
}

.subtitle {
  font-weight: normal;
  font-size: 16px;
  margin: 30px 0;
  color: var(--base-white);
}
</style>
