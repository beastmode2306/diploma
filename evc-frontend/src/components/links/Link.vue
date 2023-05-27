<template>
  <p @click="onClick" :style="`--link-color: ${color}`">{{ linkContent }}</p>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  linkContent: {
    type: String,
    default() {
      return ''
    }
  },
  color: {
    type: String,
    default() {
      return '#6FE69F'
    }
  },
  link: {
    type: String,
    default() {
      return ''
    }
  }
})

const onClick = () => {
  if (props.link !== '') router.push(props.link)
}
</script>

<style scoped>
p {
  color: var(--link-color);
  cursor: pointer;
  position: relative;
  font-size: 14px;
}

p:after {
  content: '';
  position: absolute;
  width: 100%;
  height: 2px;
  bottom: 2px;
  left: 0;
  background-color: var(--link-color);
  transition: height 0.1s ease;
}

p:hover:after {
  height: 4px;
  margin: 0 auto;
}
</style>
