<script setup>

import {ref, computed} from "vue";
import ClickableMap from "@/components/ClickableMap.vue";
import { useGeneralStore } from '@/stores/general';
import router from "@/router";
import HighScoreComponent from "@/components/HighScoreComponent.vue";
const selectAmountOfQuestions = ref(0);
const selectPracticeOrExam = ref("");
const buttonColor = ref('black');
const generalStore = useGeneralStore();
const showSelectBox = ref(false);


const message = computed(() => {
  if (generalStore.selectedQuiz === 'flags')
    return 'Learn the flags of the world';
  else if (generalStore.selectedQuiz === 'capitals')
    return 'Learn the capitals of the world';
  else return '';
})

function handleRegionClick(region) {
  generalStore.selectedRegion = region;
}

const toggleSelectBox = () => {
  showSelectBox.value = !showSelectBox.value;
};

function startQuiz() {
  generalStore.practiceOrExam = selectPracticeOrExam.value;
  generalStore.noQuestions = selectAmountOfQuestions.value;

  if (generalStore.selectedQuiz === 'flags')
    router.push({path: '/flag'});
  else if (generalStore.selectedQuiz === 'capitals')
    router.push({path: '/capital'})
}

const setSelectedQuiz = (quizToDo) => {
  selectPracticeOrExam.value !== quizToDo ? selectPracticeOrExam.value = quizToDo : selectPracticeOrExam.value = "";
  console.log(selectPracticeOrExam.value);
}


</script>
<template>
  <main>
    <div class="masterCenter">
      <div class="leftContainer">
      </div>
      <div class="centerContent">
          <div class="mapContent">
            <h1 class="selectedQuizTitle">{{message}}</h1>
            <h2 class="selectRegionTitle">Select Region</h2>
            <ClickableMap @regionClicked="handleRegionClick" :scale=112 :height=559 :width=700 :markRegion=true />
          </div>
        <div class="DifficultyInput">
          <p class="chooseDifficulty">Choose difficulty</p>
          <v-col cols="12" class="py-2">
            <v-btn-toggle v-model:selected-class="buttonColor" rounded="5" color="blue" group>
              <v-btn class="buttonsDifficulty" value="practice" @click="toggleSelectBox(); setSelectedQuiz('practice')">
                Practice
              </v-btn>
              <v-btn class="buttonsDifficulty" value="Exam" @click="toggleSelectBox(); setSelectedQuiz('exam') ">
                Exam
              </v-btn>
            </v-btn-toggle>
            <div class="buttonContent">
              <v-btn class="buttonStart" density="default" rounded="l" @click="startQuiz()"><b>Start Quiz</b>
              </v-btn>
            </div>
            <v-select class="selectBox" v-model="selectAmountOfQuestions"
                      v-if="showSelectBox"
                      label="Amount of questions"
                      :items="['5','10','15','20','30']"
                      variant="solo-filled"
            ></v-select>
          </v-col>
        </div>
        <div/>
      </div>
      <div class="rightContainer">
        <div class="highScoreContainer">
          <high-score-component> </high-score-component>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>

.selectBox {
  margin-top: 35px;
}

.leftContainer{
  width: calc(50% - 420px);
  margin-left: auto;
  margin-right: auto;
  //border: black solid 5px;
}

.rightContainer {
  width: calc(50% - 420px);
  margin-right: auto;
  margin-left: auto;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  border: black solid 5px;
  gap: 40px;
}

.highScoreContainer{
  margin-right: auto;
  margin-top: 122px;
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

.centerContent {
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: auto;
//border: black solid 5px;
}

.mapContent {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 840px;
  margin-top: 50px;
  margin-left: auto;
  margin-right: auto;
  padding: 20px;
  box-shadow: 0 0 2px 2px;
  border-radius: 8px;
  max-width: 99vw;

}

.masterCenter {
  margin-top: 20px;
  display: flex;
  justify-content: center;
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