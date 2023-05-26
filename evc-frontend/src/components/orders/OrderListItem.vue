<template>
  <div class="order-item">
    <div class="order-item-title-group">
      <div class="title">Order #123</div>
      <div class="status" :class="getBadgeClass('pending')">Approved</div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
  hasError: Boolean
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
  height: 100px;
  justify-content: space-between;
  background-color: #1f1f1f;
  color: #1f1f1f;
  padding: 20px 20px;
  font-family: 'pt-mono';
  font-weight: bold;
  border-radius: 6px;
  margin: 20px 0;
}
.order-item-title-group {
  color: #dad8d8;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.status {
  color: var(--base-color);
  font-weight: bold;
  font-size: 18px;
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
