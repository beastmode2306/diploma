<template>
  <div class="dot-item">
    <div class="dot-id">Dot {{ props.idx + 1 }}</div>
    <div class="dot-lat">Lat: {{ props.dot.position.lat }}</div>
    <div class="dot-lng">Lng: {{ props.dot.position.lng }}</div>
    <Link color="#ff0658" link-content="Remove" @click="onRemove(props.dot.id)" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Link from '../links/Link.vue'

const props = defineProps({
  idx: {
    type: Number,
    required: true
  },
  dot: {
    type: Object,
    required: true
  },
  onRemove: {
    type: Function,
    required: true
  }
})
</script>

<style scoped>
.dot-item {
  margin: 10px 0;
  width: 100%;
  padding: 15px 20px;
  background-color: #1f1f1f;
  color: var(--base-white);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}

.dot-id {
  font-size: 16px;
  font-weight: bold;
}

.dot-lat,
.dot-lng {
  font-size: 12px;
  opacity: 0.7;
  width: 30%;
  text-align: left;
}
</style>
