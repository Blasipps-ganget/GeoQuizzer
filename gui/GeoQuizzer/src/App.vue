<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
  <div><RouterLink to="/">Home</RouterLink></div>
  <div><RouterLink to="/register">Register</RouterLink></div>
  <div><RouterLink to="/map">map</RouterLink></div>
  <!--  WHEN ADDING A NEW LINK ADD HERE AND IN ROUTER -->


  <div><RouterView/></div>
</template>

<style scoped>

</style>
