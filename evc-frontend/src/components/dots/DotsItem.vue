<template>
  <div class="dot-item" :style="`--border-color-dot-item: ${color}`">
    <div class="dot-id">{{ props.title }} {{ props.idx + 1 }}</div>
    <div class="dot-lat">Lat: {{ props.dot.position.lat }}</div>
    <div class="dot-lng">Lng: {{ props.dot.position.lng }}</div>
    <Link v-if="hasRemove" color="#ff0658" link-content="Remove" @click="onRemove(props.dot.id)" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Link from '../links/Link.vue'

const props = defineProps({
  title: {
    type: String,
    default() {
      return 'Dot'
    }
  },
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
    default() {
      return () => {}
    }
  },
  hasRemove: {
    type: Boolean,
    default() {
      return true
    }
  },
  color: {
    type: String,
    default() {
      return '#fff'
    }
  }
})
</script>

<style scoped>
.dot-item {
  margin: 10px 0;
  width: 100%;
  padding: 10px 15px;
  background-color: #1f1f1f;
  color: var(--base-white);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  border-left: 10px solid var(--border-color-dot-item);
  border-radius: 6px;
}

.dot-id {
  font-size: 16px;
  font-weight: bold;
  width: 150px;
}

.dot-lat,
.dot-lng {
  font-size: 12px;
  opacity: 0.7;
  width: 30%;
  text-align: left;
}
</style>
