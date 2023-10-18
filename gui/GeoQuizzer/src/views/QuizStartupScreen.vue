<script setup>

import {ref} from "vue";
import LoginRegistrationModal from "@/components/LoginRegistrationModal.vue";
import ClickableMap from "@/components/ClickableMap.vue";
import { useGeneralStore } from '../stores/general.js';




const regions = ["Europe", "Asia", "America", "Oceania", "Africa"];
const selectedQuiz = ref("");
const buttonColor = ref('black');
const generalStore = useGeneralStore();
const showSelectBox = ref(false);

const toggleSelectBox = () => {

  showSelectBox.value = !showSelectBox.value;

};



const setSelectedQuiz = (quizToDo) => {
  selectedQuiz.value !== quizToDo ? selectedQuiz.value = quizToDo : selectedQuiz.value = "";
  console.log(selectedQuiz.value);
}
const getTabs = (region) => {
  const regionLength = region.length;
  if (regionLength > 4) {
    return '&nbsp;'.repeat(regionLength - 4);

  }
  return '';
}

const headers = [
  {title: 'Region', align: 'start', key: 'region'},
  {title: 'Percentage', align: 'end', key: 'percentage'}

]
const region = [
  {
    region: 'Europe',
    percentage: '20%'
  }, {
    region: 'Africa',
    percentage: '30%'
  },
  {
    region: 'America',
    percentage: '2%'
  },
  {
    region: 'Asia',
    percentage: '15%'
  },
  {
    region: 'Oceania',
    percentage: '45%'
  },



]
const five = 5;




// function handleRegionClick(region) {
//   alert(`You clicked ${region}!`);
// }


</script>

<template>
  <main>
    <div class="masterCenter">

      <div class="noContentContainer">


      </div>
      <div class="centerContent">

        <section>
          <div class="mapContent">
            <h1 class="selectedQuizTitle">{{generalStore.selectedQuiz}}</h1>
            <h2 class="selectRegionTitle">Select Region</h2>

            <ClickableMap
                @regionClicked="handleRegionClick"
                :scale=112
                :height=559
                :width=700
                :markRegion=true
            />

          </div>
        </section>


        <div class="DifficultyInput">

          <p class="chooseDifficulty">Choose difficulty</p>

          <v-col
              cols="12"
              class="py-2"
          >

            <v-btn-toggle
                v-model:selected-class="buttonColor"
                rounded="5"
                color="blue"
                group
            >
              <v-btn class="buttonsDifficulty" value="practice" @click="toggleSelectBox(); setSelectedQuiz('practice')">

                Practice
              </v-btn>

              <v-btn class="buttonsDifficulty" value="Exam" @click="toggleSelectBox(); setSelectedQuiz('exam') ">


                Exam
              </v-btn>

            </v-btn-toggle>

            <div class="buttonContent">
              <v-btn class="buttonStart" density="default" rounded="l" @click=""><b>Start Quiz</b>

              </v-btn>
            </div>


            <v-select class="selectBox"

                      v-if="showSelectBox"
                      label="Amount of questions"
                      :items="['5','10','15','20','30']"
                      variant="solo-filled"
            ></v-select>
          </v-col>

        </div>
        <div/>
      </div>
      <div class="progressContent">
        <section class="regionProgressSection">

          <h2>Best Result:</h2>
          <!--        <v-data-table-->
          <!--            v-model:items-per-page="five"-->
          <!--            :headers="headers"-->
          <!--            :items="region"-->
          <!--            item-value="percentage"-->
          <!--            class="elevation-1"-->
          <!--        ></v-data-table>-->
          <div class="listRegions" v-for="(item,index) in region" :key="index">
            {{item.region}} : {{item.percentage}}
          </div>
        </section>
      </div>
    </div>


  </main>
  <!--  <LoginRegistrationModal></LoginRegistrationModal>-->
</template>

<style scoped>

.listRegions {

  font-size: larger;

}


.selectBox {

  margin-top: 35px;

}

.noContentContainer {


  margin: auto;
}


.progressContent {

  display: flex;

  border: 1px solid black;

  padding:10px;
  height: 220px;
  width: 250px;
  margin-right: auto;
  margin-top: 100px;
  background-color: #176B87;





}

.regionProgressSection {

  color: #EEEEEE;
  margin-left: 20px;


}




.buttonContent {

  display: flex;
  margin-top: 10px;
  flex-direction: column;
  justify-content: center;



}

.buttonStart {

  background-color: #053B50;
  color: #EEEEEE;
  font-weight:bold;
  margin-top: 20px;
  font-size: 15px;
  height: 50px;
  box-shadow: 4px 7px 10px rgba(0,0,0,.4);

}



.masterCenter {

  margin-top: 20px;
  display: flex;
  justify-content: center;


}

.centerContent {


  display: flex;
  justify-content: center;
  flex-direction: column;

  margin: auto;





}


.DifficultyInput {


  display: flex;
  justify-content: center;
  margin: auto;
  flex-direction: column;
  align-items: center;


}

.buttonsDifficulty {

  background-color: #053B50;
  color: #EEEEEE;
  font-weight: bolder;
  border-radius: 5px;
  margin-right: 10px;
  width: 50%;





}




#map {
  height: 200px;
  width: 200px;
  background-color: rgb(128, 128, 128);
}

.mapContent {


  text-align: center;





}

.chooseDifficulty {

  color: #053B50;
  font-weight: bold;
  font-size: 20px;
  margin-top: 10px;

}

.selectRegionTitle {

  color: #053B50;
  font-weight: bold;
  font-size: 20px;
  margin-top: 10px;

}

.selectedQuizTitle {

  color: #053B50;
  font-size: 40px;


}
</style>