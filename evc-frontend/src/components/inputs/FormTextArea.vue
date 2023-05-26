<template>
  <textarea
    :value="modelValue"
    @input="onInput"
    :placeholder="placeholder"
    :class="{ hasError: hasError }"
  ></textarea>
</template>

<script>
export default {
  name: 'FormTextArea',
  data() {
    return {
      hasError: false
    }
  },
  props: {
    modelValue: String,
    placeholder: String
  },
  emits: ['update:modelValue'],
  methods: {
    onInput(event) {
      this.hasError = event.target.value === ''
      this.$emit('handleError', this.hasError)
      this.$emit('update:modelValue', event.target.value)
    }
  }
}
</script>

<style scoped>
textarea {
  padding: 10px;
  font-size: 14px;
  width: 100%;
  resize: none;
  background-color: transparent;
  border: 1px solid #393939;
  border-radius: 6px;
  color: var(--base-color);
  outline: none;
  transition: border 0.3s ease;
  margin-bottom: 20px;
}

textarea:focus {
  border: 1px solid var(--base-color);
}

.hasError {
  border: 1px solid var(--base-danger-color);
}
</style>
