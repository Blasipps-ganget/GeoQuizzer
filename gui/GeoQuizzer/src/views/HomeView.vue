<script setup lang="ts">
import {RouterLink} from "vue-router";
</script>

<template>
  <main>
    <div class="centerContent">
    <div class="mainContent">

    <div class="quizBox">
      <div class="headerBackground">
        <RouterLink to="/countries"><h2>Place the country</h2></RouterLink>
      </div>
      <RouterLink to="/countries"><img class="selectionImage" src="../assets/images/countries.png" alt=""></RouterLink>
    </div>

    <div class="quizBox">
      <div class="headerBackground">
      <RouterLink to="/flags"><h2>Learn the flags of the world</h2></RouterLink>
      </div>
      <RouterLink to="/flags"><img class="selectionImage" src="../assets/images/flags.jpg" alt=""></RouterLink>

    </div>
      <div class="capitalsdiv">
      <div class="quizBox">
        <div class="headerBackground">
          <RouterLink to="/capitals"><h2>Learn the capitals of the world</h2></RouterLink>


        </div>
        <RouterLink to="/capitals">  <img  class="selectionImage"  src="../assets/images/capitals.png" alt=""></RouterLink>
      </div>

      </div>


    </div>

    </div>


  </main>

</template>
<style scoped>

.centerContent {

  margin-top: 40px;
  justify-content: center;
  display: flex;


}

.mainContent {

  display: grid;
  gap: 170px;
  grid-template-columns: 553px 553px;
  grid-template-rows: 250px 250px ;




  padding-bottom: 180px;






}

.selectionImage {

  height: 311px;
  width: 553px;
  box-shadow: 0px 7px 10px rgba(0,0,0,.4);


}

.quizBox {

background: #053B50;
 box-sizing: border-box;







}

.headerBackground {



  padding: 20px;
  text-align: center;



}

.headerBackground h2 {

  color: #EEEEEE;

}
.headerBackground a {

  text-decoration: none;
  color: #EEEEEE;
}




.capitalsdiv {

  grid-column: span 2;
  display: flex;
  justify-content: center;

}



</style>