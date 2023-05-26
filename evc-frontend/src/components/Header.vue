<template>
  <header>
    <h1>EVCharging</h1>
    <nav>
      <router-link to="/logout">Logout</router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Header',
  props: {
    isLoggedIn: Boolean
  }
}
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

h1 {
  font-weight: bold;
}
</style>
