<template>
  <input
    type="text"
    :value="modelValue"
    @input="onInput"
    :placeholder="placeholder"
    :class="{ hasError: hasError }"
  />
</template>

<script setup>
import { ref, defineEmits } from 'vue'

const emits = defineEmits(['update:modelValue', 'error'])

const props = defineProps({
  modelValue: {
    type: String,
    default() {
      return ''
    }
  },
  placeholder: {
    type: String,
    default() {
      return ''
    }
  }
})

const hasError = ref(false)

const onInput = (event) => {
  hasError.value = event.target.value === ''
  emits('error', hasError.value)
  emits('update:modelValue', event.target.value)
}
</script>

<style scoped>
input {
  width: 100%;
  height: 30px;
  background-color: transparent;
  color: #6fe69f;
  outline: none;
  border: none;
  border-bottom: 1px solid #393939;
  font-family: 'pt-mono', monospace;
  transition: border-bottom 0.3s ease;
  margin-bottom: 20px;
  font-size: 14px;
  padding: 10px;
}
input:focus {
  border-bottom: 1px solid var(--base-color);
}

.hasError {
  border-bottom: 1px solid var(--base-danger-color);
}
</style>
