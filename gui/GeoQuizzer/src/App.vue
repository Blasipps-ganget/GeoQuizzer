<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
<!--  <div><RouterLink to="/">Home</RouterLink></div>-->

<!--  <div><RouterLink to="/map">Map</RouterLink></div>-->
  <!--  WHEN ADDING A NEW LINK ADD HERE AND IN ROUTER -->
  <div class="headerContent">
    <div class="profileContent">
      <img src="" alt="">

    </div>
    <div class="logo">
      <h1>Geografi Quiz</h1>
      <img src="./assets/images/logga.png" alt="">
    </div>
    <div class="login">
    <div class="buttonsTopRight">

      <RouterLink to="/login">Login</RouterLink>

    </div>
      <div class="buttonsTopRight">

        <RouterLink to="/register">Register</RouterLink>


      </div>

    </div>




  </div>
  <div><RouterView/></div>


</template>

<style scoped>

</style>
