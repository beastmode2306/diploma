<template>
  <header>
    <h2>Orders</h2>
    <Button class="btn" title="+ Add order"></Button>
  </header>
  <OrderListItem />
  <OrderListItem />
  <OrderListItem />
  <OrderListItem />
</template>

<script setup>
import Button from '../components/buttons/Button.vue'
import OrderListItem from '../components/orders/OrderListItem.vue'
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

.btn {
  width: 200px;
}
</style>
