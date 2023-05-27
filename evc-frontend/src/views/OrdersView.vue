<template>
  <header>
    <h2>Orders</h2>
    <Button class="btn" title="+ Add order" :callback="onCreateOrder"></Button>
  </header>

  <div class="orders-list">
    <OrderListItem v-for="order in orders" :key="order.id" :order="order" />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

import Button from '../components/buttons/Button.vue'
import OrderListItem from '../components/orders/OrderListItem.vue'

const router = useRouter()

const onCreateOrder = () => {
  router.push('/orders/create')
}

const orders = [
  {
    id: 10,
    details: [
      {
        id: 1
      },
      {
        id: 2
      }
    ],
    status: 'completed',
    createdAt: '2021-08-01T12:00:00.000Z',
    updatedAt: '2021-08-01T12:00:00.000Z'
  },
  {
    id: 11,
    details: [
      {
        id: 1
      }
    ],
    status: 'pending',
    createdAt: '2021-08-01T12:00:00.000Z',
    updatedAt: '2021-08-01T12:00:00.000Z'
  }
]
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  color: var(--base-white);
  padding: 10px 0px;
  font-family: 'pt-mono';
  font-weight: bold;
}

.btn {
  width: 150px;
}
</style>
