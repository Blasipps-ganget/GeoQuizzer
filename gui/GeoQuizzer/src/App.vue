<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
  <div><RouterLink to="/">Home</RouterLink></div>
  <div><RouterLink to="/register">Register</RouterLink></div>
  <div><RouterLink to="/map">Map</RouterLink></div>
  <div><RouterLink to="/flag">FlagQuiz</RouterLink></div>
  <div><RouterLink to="/quiz">ChooseQuiz</RouterLink></div>
  <!--  WHEN ADDING A NEW LINK ADD HERE AND IN ROUTER -->


  <div><RouterView/></div>
</template>

<style scoped>

</style>
