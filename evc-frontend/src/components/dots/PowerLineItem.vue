<template>
  <div class="powerLine-item" :style="`--border-color-dot-item: ${color}`">
    <div
      class="powerLine-id"
      :style="{
        'text-decoration': disabled ? 'line-through' : 'none',
        opacity: disabled ? '0.5' : '1'
      }"
    >
      Power Lines
    </div>
    <div class="powerLine-nodes">Nodes count: {{ props.powerLineCount }}</div>
  </div>
</template>

<script setup>
const props = defineProps({
  powerLineCount: {
    type: Number,
    required: true
  },
  color: {
    type: String,
    default() {
      return '#fff'
    }
  },
  disabled: {
    type: Boolean,
    default() {
      return true
    }
  }
})
</script>

<style scoped>
.powerLine-item {
  margin: 10px 0;
  width: 100%;
  padding: 10px 15px;
  background-color: #1f1f1f;
  color: var(--base-white);
  display: flex;
  align-items: center;
  position: relative;
  border-left: 10px solid var(--border-color-dot-item);
  border-radius: 6px;
}

.powerLine-id {
  font-size: 16px;
  font-weight: bold;
  width: 150px;
}

.powerLine-nodes {
  font-size: 12px;
  opacity: 0.7;
  width: 30%;
  text-align: left;
}
</style>
