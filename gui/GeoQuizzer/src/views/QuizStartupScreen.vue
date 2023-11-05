<script setup>

import {ref, computed, onMounted} from "vue";
import ClickableMap from "@/components/ClickableMap.vue";
import { useGeneralStore } from '@/stores/general';
import router from "@/router";
import HighScoreComponent from "@/components/HighScoreComponent.vue";
const selectAmountOfQuestions = ref('5');
const selectPracticeOrExam = ref('practice');
const generalStore = useGeneralStore();
const showSelectBox = ref(true);
const isSetToExam = ref(false);

const message = computed(() => {
  if (generalStore.selectedQuiz === 'flags')
    return 'Learn the flags of the world';
  else if (generalStore.selectedQuiz === 'capitals')
    return 'Learn the capitals of the world';
  else return 'Something went wrong'
});

onMounted(() => {
  generalStore.selectedRegion = '';

  if (generalStore.selectedQuiz !== 'flags' && generalStore.selectedQuiz !== 'capitals') {
      generalStore.selectedQuiz = localStorage.getItem('selectedQuiz');
  }
});

function handleRegionClick(region) {
  generalStore.selectedRegion = region;
}

function getAmountOfQuestions() {
  if (selectAmountOfQuestions.value === 'Up to 10') return 10;
  else if (selectAmountOfQuestions.value === 'Up to 15') return 15;
  else if (selectAmountOfQuestions.value === 'Up to 20') return 20;
  else if (selectAmountOfQuestions.value === 'Up to 30') return 30;
  else return 5;
}

function startQuiz() {
  if (generalStore.selectedRegion === '') {
    alert('Please select a region');
    return;
  }

  generalStore.practiceOrExam = selectPracticeOrExam.value;
  generalStore.noQuestions = getAmountOfQuestions();

  if (generalStore.selectedQuiz === 'flags')
    router.push({path: '/flag'});
  else if (generalStore.selectedQuiz === 'capitals')
    router.push({path: '/capital'})
}

function setToPractise() {
  isSetToExam.value = false;
  showSelectBox.value = true;
  selectAmountOfQuestions.value = '5';
  selectPracticeOrExam.value = 'practice';
}

function setToExam() {
  if (!generalStore.isLoggedIn) {
    alert("You need to be logged in to take an exam");
    return;
  }

  selectAmountOfQuestions.value = 'Up to 30';
  selectPracticeOrExam.value = 'exam';
  showSelectBox.value = false;
  isSetToExam.value = true;
}

</script>
<template>
  <main>
    <div class="masterCenter">
      <div class="leftContainer">
      </div>
      <div class="centerContent">
          <h1 class="selectedQuizTitle">{{message}}</h1>
          <h2 class="selectedRegionTitle">Select Region</h2>
          <ClickableMap @regionClicked="handleRegionClick" :markRegion=true />
        <div/>
      </div>
      <div class="rightContainer">
        <div class="selectionButtons">

          <div class="onlyButtons">
            <v-btn :class="{ lightButton: !isSetToExam, blueButton: isSetToExam }" @click="setToPractise">Practice</v-btn>
            <v-btn :class="{ lightButton: isSetToExam, blueButton: !isSetToExam }" @click="setToExam">Exam</v-btn>
            <div class="buttonContent">
              <v-btn class="blueButton" @click="startQuiz()">Start Quiz</v-btn>
            </div>
          </div>
          <div>
            <v-select class="selectBox" v-model="selectAmountOfQuestions"
                      v-if="showSelectBox"
                      label="Nr of questions"
                      :items="['5','Up to 10','Up to 15','Up to 20','Up to 30']"
                      variant="solo-filled">
            </v-select>

          </div>
        </div>
        <div class="highScoreContainer">
          <HighScoreComponent v-if="generalStore.isLoggedIn"></HighScoreComponent>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>

.selectBox {
  margin-top: 35px;
  width: 145px;
}

.leftContainer{
  width: calc(50% - 500px);
  margin-left: auto;
  margin-right: auto;
}

.rightContainer {
  width: calc(50% - 500px);
  display: flex;
  flex-direction: column;
  gap: 40px;
  margin: 100px auto;

}

.onlyButtons {
  display: flex;
  flex-direction: column;
  margin-bottom: auto;
}

.highScoreContainer{
  margin-right: auto;
  margin-left: 100px;
}

.buttonContent {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.centerContent {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #176B87;
  width: 1000px;
  margin: 100px auto;
  padding: 20px;
  box-shadow: 0 0 2px 2px;
  border-radius: 8px;
  max-width: 99vw;
}

.masterCenter {
  display: flex;
  justify-content: center;
  flex-direction: row;
}

.selectionButtons {
  margin-right: auto;
  margin-left: 100px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 0 2px 2px;
  border-radius: 8px;
  background: #176B87;
  padding: 10px;
  width: 200px;
  height: 300px;
}

.selectedRegionTitle {
  color: white;
  font-weight: bold;
  font-size: 30px;
  margin-top: 10px;
}

.selectedQuizTitle {
  color: white;
  font-size: 40px;
}

.blueButton {
  background-color: #053B50;
  text-transform: none;
  font-family: initial;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  width: 150px;
  height: 40px !important;
  margin: 10px auto;
  box-shadow: 4px 7px 10px rgba(0,0,0,.4);
}

.lightButton {
  background-color: #64CCC5;
  text-transform: none;
  font-family: initial;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  width: 150px;
  height: 40px !important;
  margin: 10px auto;
  box-shadow: 4px 7px 10px rgba(0,0,0,.4);
}

@media (max-width: 1800px) {
  .selectionButtons{
    margin-left: auto;
  }
  .highScoreContainer {
    margin-left: auto;
  }
}


@media (max-width: 1405px) {
  .masterCenter {
    flex-direction: column;
  }
  .rightContainer {
    width: 100%;
    flex-direction: row;
    margin-top: 0;
    margin-bottom: 40px;
  }
  .centerContent {
    margin-bottom: 40px;
  }

  .selectionButtons{
    margin-right: 0;
  }
  .highScoreContainer {
    margin-left: 0;
  }
}

@media (max-width: 800px) {
  .selectedQuizTitle {
    font-size: 30px;
  }
  .selectedRegionTitle {

    font-size: 20px;
    margin-top: 5px;
  }
}
@media (max-width: 500px) {

  .rightContainer {
    flex-direction: column;
    gap: 10px;
  }
  .selectedQuizTitle {
    font-size: 20px;
  }
  .selectedRegionTitle {

    font-size: 16px;
  }

  .selectionButtons {
    margin-left:  auto;
    margin-right: auto;
    margin-bottom: 15px;
  }
  .highScoreContainer {
    margin: auto;
  }
}

@media (max-width: 375px) {
  .selectedQuizTitle {
    font-size: 18px;
  }

  .rightContainer {
    gap: 0;
  }
}

</style>