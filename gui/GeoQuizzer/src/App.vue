<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

import { useGeneralStore } from './stores/general.js';
const generalStore = useGeneralStore()

function selectQuiz(selection) {
  generalStore.selectedQuiz = selection

}

</script>

<template>


  <div class="menu">

    <div class="menuitem">
      <img class="nav__images" height="50" src="./assets/images/icons/flag.png" alt="Flags">
      <RouterLink class="navLink" to="/quiz" @click="selectQuiz('flags')">Flags</RouterLink>
    </div>

    <div class="menuitem">
      <img class="nav__images"  height="50" src="./assets/images/icons/planet-earth.png" alt="Countries">
        <RouterLink class="navLink" to="/quiz" @click="selectQuiz('countries')">Countries</RouterLink>
    </div>

    <div class="menuitem">
      <img class="nav__images"  height="50" src="./assets/images/icons/capitals.png" alt="Capitals">
      <RouterLink class="navLink" to="/quiz" @click="selectQuiz('capitals')">Capitals</RouterLink>
    </div>

    <div class="menuitem">
      <img class="nav__images"  height="50"  src="./assets/images/icons/classroom.png" alt="Classroom">
        <RouterLink class="navLink" to="/classroom">Classroom</RouterLink>
    </div>

    <div class="menuitem">
      <img class="nav__images" height="50"  src="./assets/images/icons/user.png" alt="Profile">
        <RouterLink class="navLink" to="/userProfile">Profile</RouterLink>
    </div>




  </div>


  <div class="headerContent">



    <div class="profileContent">

      <RouterLink to="/userProfile"><img class="userIconTopLeft" src="./assets/images/icons/user.png" alt=""></RouterLink>

      <template>
      </template>
    </div>
    <div class="logo">

      <RouterLink to="/"><img src="./assets/images/logga.png" alt=""></RouterLink>
      <RouterLink to="/"> <h1>GeoQuizzer</h1></RouterLink>

    </div>

    <div class="login">
    <div class="buttonsTopRight">

      <v-col cols="auto">
      <RouterLink class="button-link" to="/login"><v-btn class="custom-btn" density="default" block="true">Login</v-btn></RouterLink>
      </v-col>
    </div>
      <div class="buttonsTopRight">

        <v-col cols="auto">
          <RouterLink class="button-link" to="/register"><v-btn class="custom-btn" density="default" block="true">Register</v-btn></RouterLink>
        </v-col>


      </div>

    </div>


  </div>
  <div><RouterView/></div>

  <div class="centerLinks">
  <div><RouterLink to="/">Home</RouterLink></div>
  <div><RouterLink to="/register">Register</RouterLink></div>
  <div><RouterLink to="/map">Map</RouterLink></div>
  <div><RouterLink to="/flag">FlagQuiz</RouterLink></div>
  <div><RouterLink to="/quiz">ChooseQuiz</RouterLink></div>
  </div>
  <!--  WHEN ADDING A NEW LINK ADD HERE AND IN ROUTER -->

  <footer>
    <div class="footerContent">
      <span>Contact us</span>
      <span>Patreon</span>
      <span>Social media</span>
    </div>
  </footer>

</template>

<style scoped>

.navLink:hover {
  text-decoration: underline;
}


.centerLinks {
  text-align: center;
}

:root {


  --primary-color: #053B50;
  --secondary-color: #176B87;
  --third-color: #64CCC5;
  --fourth-color: #EEEEEE;


}


.headerContent {

  width: 100%;
  background: #176B87;
  display: flex;

  gap: 20px;
  padding: 20px;
  //box-shadow: -1px 5px 5px 0px rgba(0,0,0,0.75);
  box-shadow: 4px 7px 10px rgba(0,0,0,.4);



}

.footerContent  {

  width: 100%;
  background: #176B87;
  display: flex;
  gap: 20px;
  padding: 30px;
  color:#EEEEEE;




}

.footerContent span {

  margin:auto;
  font-size: 22px;
  font-weight: bolder;
  position: sticky;
  bottom: 0;



}


.userIconTopLeft {

  height: 40px;




}

.profileContent  {

  border: 2px solid white;
  border-radius: 15px;
  height: 50px;
  margin-left: 50px;
  padding: 5px;

}

.login {

 //margin-left: auto;

}

.logo {


  justify-content: center;
  align-items: center;
  display: flex;
  margin:auto;

}

.logo img {

  height: 100px;
}

.logo a {

  text-decoration: none;
  color: #EEEEEE;
}

.button-link {
  text-decoration: none;
  color: #EEEEEE;
  font-weight: bolder;
  font-size: larger;
}

.custom-btn {

  background-color: #053B50;
  color: #EEEEEE;
  font-weight: bolder;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 1px 3px 5px 0px rgba(0,0,0,0.75);

}

.menu {

  position: fixed;
  height: 100%;
  width:65px;
  background: #176B87;
  transition: width 1s;
  overflow: hidden;
  z-index: 99;
  box-shadow: 4px 7px 10px rgba(0,0,0,.4);

}

.menu:hover {

  width:200px
}

.menuitem a {

  position: absolute;
  left:80px;
  top:-10px;
  transition: color 1s;
  color: #EEEEEE;
  text-decoration: none;


}

.menu:hover .menuitem a {

  color: #EEEEEE;
}

.menuitem {

  height: 20%;
  line-height: 200px;

  position: relative;
  padding: 10px;
  transition: border 0.5s, background 0.5s;

}










</style>
