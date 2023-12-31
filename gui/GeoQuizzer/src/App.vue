<script setup>
import {RouterLink, RouterView} from 'vue-router'

import LoginRegistrationModal from "@/components/LoginRegistrationModal.vue";
import {useGeneralStore} from './stores/general.js';
import {getName} from "@/js/userApi";
import {onMounted} from "vue";

const generalStore = useGeneralStore()

function selectQuiz(selection) {
  generalStore.selectedQuiz = selection
  if (selection === 'capitals' || selection === 'flags')
    localStorage.setItem('selectedQuiz', selection); // Saves state to localStorage for 1 browser back button press
}

const showModalLogin = () => {
  generalStore.loginOption = true
  generalStore.showLoginModal = !generalStore.showLoginModal;
}

const showModalRegister = () => {
  generalStore.loginOption = false
  generalStore.showLoginModal = !generalStore.showLoginModal;
}

const logout = () => {
  document.cookie = 'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  document.cookie = 'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  localStorage.setItem('selectedQuiz', generalStore.selectedQuiz);
  window.location.reload();
}

function closeHamburgerMenu() {
  const elMenuToggle = document.querySelector("#menu-toggle");
  elMenuToggle.checked = false;
}

onMounted(() => {
  generalStore.loggedInUser = getName()
})

</script>

<template>
  <div class="bigMenu">
    <div class="menuitem">
      <img class="nav__images" src="./assets/images/icons/flag.png" alt="Flags">
      <RouterLink class="navLink" to="/quiz" @click="selectQuiz('flags')">Flags</RouterLink>
    </div>

    <div class="menuitem">
      <img class="nav__images" src="./assets/images/icons/planet-earth.png" alt="Countries">
      <RouterLink class="navLink" to="/map" @click="selectQuiz('countries')">Countries</RouterLink>
    </div>

    <div class="menuitem">
      <img class="nav__images" src="./assets/images/icons/capitals.png" alt="Capitals">
      <RouterLink class="navLink" to="/quiz" @click="selectQuiz('capitals')">Capitals</RouterLink>
    </div>

    <div class="menuitem">
      <img class="nav__images" src="./assets/images/icons/classroom.png" alt="Classroom">
      <RouterLink class="navLink" to="/classroom">Classroom</RouterLink>
    </div>

    <div class="menuitem">
      <img class="nav__images" src="./assets/images/icons/user.png" alt="Profile">
      <RouterLink class="navLink" :to="`/userProfile/${generalStore.loggedInUser}`">Profile</RouterLink>
    </div>
  </div>
  <LoginRegistrationModal v-show="generalStore.showLoginModal"></LoginRegistrationModal>
  <div class="headerContent">
    <div class="hamburgerMenu">
      <input id="menu-toggle" type="checkbox"/>
      <label class='menu-button-container' for="menu-toggle">
        <div class='menu-button'></div>
      </label>
      <ul id="menu" class="menu">
        <li>
          <RouterLink class="navLink" to="/quiz" @click="selectQuiz('flags'); closeHamburgerMenu();">Flags</RouterLink>
        </li>
        <li>
          <RouterLink class="navLink" to="/map" @click="selectQuiz('countries'); closeHamburgerMenu();">Countries
          </RouterLink>
        </li>
        <li>
          <RouterLink class="navLink" to="/quiz" @click="selectQuiz('capitals'); closeHamburgerMenu()">Capitals
          </RouterLink>
        </li>
        <li>
          <RouterLink class="navLink" to="/classroom" @click="closeHamburgerMenu()">Classroom</RouterLink>
        </li>
        <li>
          <RouterLink class="navLink" :to="`/userProfile/${generalStore.loggedInUser}`" @click="closeHamburgerMenu()">
            Profile
          </RouterLink>
        </li>
      </ul>
    </div>

    <div class="buttonSpaceCompensation"></div>
    <div class="logo">
      <RouterLink to="/"><img src="./assets/images/logga.png" alt=""></RouterLink>
      <RouterLink to="/"><h1>GeoQuizzer</h1></RouterLink>
    </div>

    <div class="login">
      <div class="buttonsTopRight">
      </div>
      <div class="buttonsTopRight">
        <v-btn class="custom-btn" density="default"
               @click=" !generalStore.isLoggedIn ? showModalLogin() : this.$router.push({ path:`/userProfile/${generalStore.loggedInUser}` }); ">
          {{ !generalStore.isLoggedIn ? "Login" : generalStore.loggedInUser }}
        </v-btn>
        <v-btn class="custom-btn" density="default" @click=" !generalStore.isLoggedIn ? showModalRegister(): logout();">
          {{ !generalStore.isLoggedIn ? 'Register' : 'Logout' }}
        </v-btn>
      </div>
    </div>
  </div>

  <div class="contentContainer">
    <div>
      <suspense>
        <RouterView/>
      </suspense>
    </div>

    <footer>
      <div class="footerContent">
        <span>Contact us</span>
        <span>Patreon</span>
        <span>Social media</span>
      </div>
    </footer>
  </div>
</template>

<style scoped>

.contentContainer {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 89vh;
}

.menu {
  display: flex;
  flex-direction: row;
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.menu > li {
  margin: 0 1rem;
  overflow: hidden;
}

.menu-button-container {
  display: none;
  height: 100%;
  width: 30px;
  cursor: pointer;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#menu-toggle {
  display: none;
}

.menu-button,
.menu-button::before,
.menu-button::after {
  display: block;
  background-color: #fff;
  position: absolute;
  height: 4px;
  width: 30px;
  transition: transform 400ms cubic-bezier(0.23, 1, 0.32, 1);
  border-radius: 2px;
}

.menu-button::before {
  content: '';
  margin-top: -8px;
}

.menu-button::after {
  content: '';
  margin-top: 8px;
}

#menu-toggle:checked + .menu-button-container .menu-button::before {
  margin-top: 0px;
  transform: rotate(405deg);
}

#menu-toggle:checked + .menu-button-container .menu-button {
  background: rgba(255, 255, 255, 0);
}

#menu-toggle:checked + .menu-button-container .menu-button::after {
  margin-top: 0px;
  transform: rotate(-405deg);
}

.navLink:hover {
  text-decoration: underline;
}

.hamburgerMenu {
  display: none;
}

.hamburgerMenu a {
  text-decoration: none;
  color: white;
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
}

.footerContent {
  width: 100%;
  background: #176B87;
  display: flex;
  gap: 20px;
  padding: 30px;
  color: #EEEEEE;
}

.footerContent span {
  margin: auto;
  font-size: 22px;
  font-weight: bolder;
  position: sticky;
  bottom: 0;
}
.login {
}

.logo {
  justify-content: center;
  align-items: center;
  display: flex;
  margin: auto;
}

.logo img {
  height: 100px;
}

.logo a {
  text-decoration: none;
  color: #EEEEEE;
}

.buttonSpaceCompensation {
  width: 30px;
}

.custom-btn {
  text-transform: none;
  font-family: initial;
  font-size: 16px;
  background-color: #053B50;
  color: white;
  display: flex;
  width: 150px;
  padding: 20px;
  margin: 10px;
  border-radius: 5px;
  box-shadow: 4px 7px 10px rgba(0, 0, 0, .4);
}

.bigMenu {
  position: fixed;
  height: 100%;
  width: 170px;
  background: #176B87;
  transition: width 1s;
  overflow: hidden;
  z-index: 99;
}

.menuitem a {
  position: absolute;
  left: 80px;
  top: -10px;
  transition: color 1s;
  color: #EEEEEE;
  text-decoration: none;
}

.bigMenu:hover .menuitem a {
  color: #EEEEEE;
}

.menuitem {
  height: 20%;
  line-height: 200px;
  position: relative;
  padding: 10px;
  transition: border 0.5s, background 0.5s;
}

.nav__images {
  height: 50px;
}

@media screen and (max-width: 1200px) {
  .menu-button-container {
    display: flex;
  }

  .menu {
    position: absolute;
    top: 0;
    margin-top: 150px;
    left: 0;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    align-items: center;
  }

  #menu-toggle ~ .menu li {
    height: 0;
    margin: 0;
    padding: 0;
    border: 0;
    transition: height 400ms cubic-bezier(0.23, 1, 0.32, 1);
  }

  #menu-toggle:checked ~ .menu li {
    border: 1px solid #333;
    height: 2.5em;
    padding: 0.5em;
    transition: height 400ms cubic-bezier(0.23, 1, 0.32, 1);
  }

  .menu > li {
    display: flex;
    justify-content: center;
    margin: 0;
    padding: 0.5em 0;
    width: 100%;
    color: white;
    background-color: #176B87;
  }

  .menu > li:not(:last-child) {
    border-bottom: 1px solid #444;
  }

  .bigMenu {
    display: none;
  }

  .headerContent {
    padding-left: 20px;
  }

  .hamburgerMenu {
    display: block;
  }

  .logo img {

    height: 50px;
  }

  .logo h1 {
    font-size: 20px;
  }

  .footerContent span {
    font-size: 10px;
  }

  .nav__images {
    height: 30px;
  }
}

</style>
