<template>
  <button :class="{hasError: hasError}">{{title}}</button>
</template>

<script>
export default {
  name: "Button",
  props: {
    title: String,
    hasError: Boolean
  }
}

</script>

<style scoped>
  button {
    background-color: transparent;
    color: var(--base-color);
    border: 1px solid var(--base-secondary-color-hover);
    border-radius: 6px;
    padding: 10px 20px;
    font-size: 14px;
    font-family: 'pt-mono', monospace;
    cursor: pointer;
    transition: background-color 0.3s ease;
    font-weight: bold;
    width: 100%;
  }

  button:hover {
    background-color: var(--base-secondary-color-hover);
  }

  .hasError {
    border: 1px solid var(--base-danger-color);
  }
</style>