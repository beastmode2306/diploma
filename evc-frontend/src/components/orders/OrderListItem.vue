<template>
  <div class="order-item" :class="`border-${getBadgeClass(order.status)}`">
    <div class="id-group">
      <div class="order-id">Order {{ order.id }}</div>
      <div class="order-date">{{ orderDate }}</div>
    </div>
    <div class="order-positions">Positions: {{ order.details.length }}</div>
    <div class="order-status" :class="getBadgeClass(order.status)">
      {{ order.status.toUpperCase() }}
    </div>
    <Link link-content="View details" :link="`/order/${order.id}`" />
  </div>
</template>

<script setup>
import Link from '../links/Link.vue'
const props = defineProps({
  order: {
    type: Object,
    required: true
  }
})

const orderDate = new Date(props.order.createdAt).toLocaleDateString('en-GB', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  timeZone: 'UTC'
})

const getBadgeClass = (status) => {
  switch (status) {
    case 'cancelled':
      return 'cancelled'
    case 'completed':
      return 'completed'
    case 'pending':
      return 'pending'
    default:
      return ''
  }
}
</script>

<style scoped>
.order-item {
  display: flex;
  width: 100%;
  justify-content: space-between;
  background-color: #1f1f1f;
  color: #dad8d8;
  font-family: 'pt-mono';
  font-weight: bold;
  padding: 20px 20px;
  border-radius: 6px;
  margin: 20px 0;
  position: relative;
  align-items: center;
}

.order-date {
  opacity: 0.7;
  font-size: 12px;
}

.order-positions {
  font-size: 14px;
}

.border-completed {
  border-left: var(--base-color) 10px solid;
}

.border-cancelled {
  border-left: #e74c3c 10px solid;
}

.border-pending {
  border-left: #f1c40f 10px solid;
}

.item {
  display: flex;
  justify-content: space-around;
  width: 100%;
  align-items: center;
}

.order-id {
  font-weight: bold;
}

.order-status {
  font-weight: bold;
  width: 100px;
  text-align: center;
}

.cancelled {
  color: #e74c3c;
}

.completed {
  color: var(--base-color);
}

.pending {
  color: #f1c40f;
}
</style>
