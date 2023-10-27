<script setup lang="ts">
import {RouterLink} from "vue-router";
import { useGeneralStore } from '../stores/general.js';
const generalStore = useGeneralStore()

function selectQuiz(selection) {
  generalStore.selectedQuiz = selection

}

</script>

<template>
  <main>
    <div class="centerContent">
    <div class="mainContent">

    <div class="quizBox">
      <div class="headerBackground">
        <RouterLink to="/quiz" @click="selectQuiz('countries')"><h2>Place the<br>country</h2></RouterLink>
      </div>
      <RouterLink to="/quiz" @click="selectQuiz('countries')"><img class="selectionImage" src="../assets/images/countries.png" alt=""></RouterLink>
    </div>

    <div class="quizBox">
      <div class="headerBackground">
      <RouterLink to="/quiz" @click="selectQuiz('flags')"><h2>Learn the flags<br>of the world</h2></RouterLink>
      </div>
      <RouterLink to="/quiz" @click="selectQuiz('flags')"><img class="selectionImage" src="../assets/images/flags.jpg" alt=""></RouterLink>

    </div>
      <div class="capitalsdiv">
      <div class="quizBox">
        <div class="headerBackground">
          <RouterLink to="/quiz" @click="selectQuiz('capitals')"><h2>Learn the capitals<br>of the world</h2></RouterLink>

        </div>
        <RouterLink to="/quiz" @click="selectQuiz('capitals')">  <img  class="selectionImage"  src="../assets/images/capitals.png" alt=""></RouterLink>
      </div>

      </div>


    </div>

    </div>


  </main>

</template>
<style scoped>



.centerContent {

  margin-top: 40px;
  display: flex;
  justify-content: center;



}

.mainContent {

  display: grid;
  gap: 50px;
  grid-template-columns: 267px 267px 267px;
  grid-template-rows: 250px;

  padding-bottom: 180px;

}

.selectionImage {

  height: 150px;
  width: 267px;
  border-bottom-right-radius: 15px;
  border-bottom-left-radius: 15px;
  box-shadow: 0px 7px 10px rgba(0,0,0,.4);


}

.quizBox {

background: #053B50;
box-sizing: border-box;
border-radius: 15px;


}

.headerBackground {



  padding: 20px;
  text-align: center;



}

.headerBackground h2 {
  font-size: 20px;
  color: #EEEEEE;

}
.headerBackground a {

  text-decoration: none;
  color: #EEEEEE;
}




.capitalsdiv {


  display: flex;
  justify-content: center;

}

@media screen and (max-width: 720px) {


  .mainContent {

    display: grid;
    gap: 50px;
    grid-template-columns: 267px;
    grid-template-rows: 250px 250px 250px;
    margin-left: 20px;
    padding-bottom: 180px;
  }
}




</style>