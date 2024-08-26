<template>
  <div id="app">
    <header-index></header-index>
    <user-index></user-index>
  </div>
</template>

<script>
import HeaderIndex from './components/HeaderIndex.vue'
import UserIndex from './pages/UserIndex.vue'
export default {
  name: 'App',
  components: {
    HeaderIndex,
    UserIndex
  }
}
</script>

<style>
html{
  height: auto;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 5vh;
}
</style>
