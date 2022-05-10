<script setup lang="ts">
</script>

<template>
  <div>
    <router-link to="/" >todolist</router-link>
    |
    <router-link to="/father" >father</router-link>
  </div>
  <router-view></router-view>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>