<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
<!--  <div><RouterLink to="/">Home</RouterLink></div>-->

<!--  <div><RouterLink to="/map">Map</RouterLink></div>-->
  <!--  WHEN ADDING A NEW LINK ADD HERE AND IN ROUTER -->
  <div class="headerContent">

<!--    <nav class="nav__cont">-->
<!--      <ul class="nav">-->
<!--        <li class="nav__items ">-->
<!--          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">-->
<!--            <use xlink:href="#home"></use>-->
<!--          </svg>-->
<!--          <a href="">Home</a>-->
<!--        </li>-->

<!--        <li class="nav__items ">-->
<!--          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">-->
<!--            <use xlink:href="#search"></use>-->
<!--          </svg>-->
<!--          <a href="">Search</a>-->
<!--        </li>-->

<!--        <li class="nav__items ">-->
<!--          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">-->
<!--            <use xlink:href="#map"></use>-->
<!--          </svg>-->
<!--          <a href="">Map</a>-->
<!--        </li>-->

<!--        <li class="nav__items ">-->
<!--          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 35.6">-->
<!--            <use xlink:href="#planner"></use></svg>-->
<!--          <a href="">Planner</a>-->
<!--        </li>-->

<!--      </ul>-->
<!--    </nav>-->

    <div class="profileContent">

      <img class="userIconTopLeft" src="./assets/images/icons/user.png" alt="">

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
