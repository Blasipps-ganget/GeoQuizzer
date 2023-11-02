<script setup>

import {ref, computed} from "vue";
import ClickableMap from "@/components/ClickableMap.vue";
import { useGeneralStore } from '@/stores/general';
import {handleToken} from "@/js/userApi";
import router from "@/router";

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
  else return 'N/A';
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

async function getResults() {
  const accessToken = await handleToken();
  console.log(accessToken)
  return fetch(`http://localhost:8080/highscores/?quiz=${generalStore.selectedQuiz}`, {
    headers: {
         'Authorization': `Bearer ${accessToken}`
    },
    method: 'GET',})
    .then(response => response.json())
    .catch(error => console.error('There has been a problem with your fetch operation:', error));
}

let results = '';
await getResults().then((res) => { results = res });
const resultsAsObject = JSON.parse(results);
const region = resultsAsObject.highscores;

</script>
<template>
  <main>
    <div class="masterCenter">
      <div class="noContentContainer">
      </div>
      <div class="centerContent">
        <section>
          <div class="mapContent">
            <h1 class="selectedQuizTitle">{{message}}</h1>
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
            <v-select class="selectBox"
                      v-model="selectAmountOfQuestions"
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
          <div class="listRegions" v-for="(item,index) in region" :key="index">
            {{item.region}} : {{item.percentage}}{{ item.percentage ? '%' : ''}}
          </div>
        </section>
      </div>
    </div>
  </main>
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
  width: 250px;
}

.progressContent {
  display: flex;
  border: 1px solid black;
  padding:10px;
  height: 220px;
  width: 250px;
  margin-right: auto;
  margin-left: auto;
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