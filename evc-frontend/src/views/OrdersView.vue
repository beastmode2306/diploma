<template>
  <header>
    <h2>Orders</h2>
    <Button class="btn" title="+ Add order" :callback="onCreateOrder"></Button>
  </header>

  <div class="orders-list" v-if="orders.length !== 0">
    <OrderListItem v-for="order in orders" :key="order.id" :order="order" />
  </div>

  <div class="empty" v-else>
    <div class="title">So empty here...</div>
    <div class="subtitle">Add your first order</div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

import Button from '../components/buttons/Button.vue'
import OrderListItem from '../components/orders/OrderListItem.vue'

const router = useRouter()
const store = useStore()

store.dispatch('fetchOrders')

const orders = computed(() => store.getters.orders)

const onCreateOrder = () => {
  router.push('/orders/create')
}
</script>

<style scoped lang="scss">
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

.empty {
  margin: 50px auto;

  div {
    text-align: center;
  }
}
</style>
