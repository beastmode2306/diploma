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
  <div class="order">
    <p class="title">Order was not found</p>
    <div class="btn">
      <Button title="Back to orders" @click="onClick" />
    </div>
  </div>
</template>

<style scoped>
.btn {
  width: 200px;
}

.order {
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
</style>
