<script setup>
import {nextTick, ref, onMounted, onUnmounted} from 'vue';
import ClickableMap from "@/components/ClickableMap.vue";
import ProgressBarComponent from "@/components/ProgressBarComponent.vue";
import ResultModalComponent from "@/components/ResultModalComponent.vue";
import * as d3 from "d3";
import {useMapStore} from '@/stores/map';
import {useGeneralStore} from '@/stores/general';
import {handleToken} from "@/js/userApi";
import HighScoreComponent from "@/components/HighScoreComponent.vue";

const generalStore = useGeneralStore();
const mapStore = useMapStore();
const failedGuesses = ref([]);
const succeededGuesses = ref([]);
const includedCountries = ref([]);
const question = ref();
const answerArray = ref([]);
const selectingRegions = ref(true);
const isZoomEnabled = ref(true);
const isSetToExam = ref(false);
const quiz = ref("practise");
let questionIndex = 0;
let regionGlobal = null;
generalStore.selectedQuiz = "countries";

onMounted(() => {
  function handleResize(){
    if (window.innerWidth < 500) alert('Please use landscape mode');
  }
  handleResize();
  window.addEventListener('resize', handleResize);

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
  });
});

async function handleCountryClick(answer) {

  if (!question.value) return;

  if (answer === question.value)
    succeededGuesses.value.push(question.value);
  else
    failedGuesses.value.push(question.value);

  questionIndex += 1;
  answerArray.value.push(answer);
  question.value = includedCountries.value[questionIndex];
  if (!question.value) {

    await sleep(500);
    await handleResults();
    await resetQuiz();
  }
}

async function handleResults() {

  generalStore.showResultModal = !generalStore.showResultModal;
  if (!isSetToExam.value) return;

  const accessToken = await handleToken();
  console.log("token",accessToken)

  await fetch(`http://localhost:8080/countryquiz/result?name=${generalStore.loggedInUser}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    method: 'POST',
    body: JSON.stringify({
      questions: includedCountries.value,
      answers: answerArray.value,
      region: regionGlobal
    }),
  });
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function handleRegionClick(region) {
  regionGlobal = region;

  if (!region) return;
  selectingRegions.value = false;
  includedCountries.value = await d3.json(`http://localhost:8080/countryquiz/${region}?shuffle=true`);

  question.value = includedCountries.value[0];

}

async function resetQuiz() {
  questionIndex = 0;
  selectingRegions.value = true;
  failedGuesses.value = [];
  succeededGuesses.value = [];
  includedCountries.value = [];
  answerArray.value = [];
  question.value = null;

  await nextTick(mapStore.updateMap).then(mapStore.resetZoom);
}

function toggleZoom() {
  mapStore.toggleZoom();
  console.log("toggleZoom");
  isZoomEnabled.value = !isZoomEnabled.value;
}

function setToPractise() {
  isSetToExam.value = false;
  quiz.value = "practise";
}

function setToExam() {
  if (!generalStore.isLoggedIn) {
    alert("You need to be logged in to take an exam");
    return;
  }
  isSetToExam.value = true;
  quiz.value = "exam";
}

</script>
Learn the flags of the world
<template>
  <div class="content">
    <div class="leftContainer"></div>
    <div class="centerContainer">
      <h1 class="question" v-if="question">Where is: {{ question }}?</h1>
      <h1 class="title" v-if="!question">Learn the countries of the world</h1>
      <h2 class="selectRegion" v-if="!question"> Select region to start {{ quiz }}</h2>
      <ClickableMap
          :failedGuesses="failedGuesses"
          :succeededGuesses="succeededGuesses"
          :selectingRegions="selectingRegions"
          @countryClicked="handleCountryClick"
          @regionClicked="handleRegionClick"
          @resetQuiz="resetQuiz"
          ref="map"
      />

    </div>
    <div class="rightContainer">
      <div class="buttonContainer">
        <v-btn :class="{ lightButton: isZoomEnabled, blueButton: !isZoomEnabled }" @click="toggleZoom">Enable zoom</v-btn>
        <v-btn :class="{ lightButton: !isSetToExam, blueButton: isSetToExam }" v-if="selectingRegions" @click="setToPractise">Practise</v-btn>
        <v-btn :class="{ lightButton: isSetToExam, blueButton: !isSetToExam }" v-if="selectingRegions" @click="setToExam">Exam</v-btn>
        <v-btn class="blueButton" v-if="!selectingRegions" @click="resetQuiz">Exit Quiz</v-btn>
        <div class="progressBarContainer">
          <ProgressBarComponent v-if="!selectingRegions"
                                :amountAnswered="failedGuesses.length + succeededGuesses.length"
                                :totalQuestions="includedCountries.length"
          />
        </div>
      </div>
      <div class="highScoreContainer" >
        <high-score-component v-if="generalStore.isLoggedIn && selectingRegions"> selectingRegions.value</high-score-component>
      </div>
    </div>

    <ResultModalComponent
        :correctGuesses="succeededGuesses.length"
        :noQuestions="succeededGuesses.length + failedGuesses.length"
        :mapView="true"
        v-if="generalStore.showResultModal">
    </ResultModalComponent>
  </div>
</template>

<style>
.content {
  display: flex;
  flex-direction: row;
}

.centerContainer {
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

.question, .title {
  color: white;
  font-size: 40px;
}

.selectRegion {
  color: white;
  font-size: 30px;
  margin-top: 5px;
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

.progressBarContainer {
  margin: auto;
  width: 90%;
}

.leftContainer {
  width: calc(50% - 500px);
  margin-left: auto;
  margin-right: auto;
}

.rightContainer {
  width: calc(50% - 500px);
  margin-right: auto;
  margin-left: auto;
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.highScoreContainer{
  margin-right: auto;
  margin-left: 100px;
}

.buttonContainer {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  width: 200px;
  height: 200px;
  margin-right: auto;
  margin-left: 100px;
  padding: 15px;
  background: #176B87;
  box-shadow: 0 0 2px 2px;
  border-radius: 8px;
}

@media (max-width: 1800px) {
  .buttonContainer{
    margin-left: auto;
  }
  .highScoreContainer {
    margin-left: auto;
  }

}

@media (max-width: 1405px) {
  .content {
    flex-direction: column;
  }
  .rightContainer {
    width: 100%;
    flex-direction: row;
    margin-top: 0;
  }

  .centerContainer {
    margin-bottom: 40px;
  }
  .buttonContainer{
    margin-right: 0;
    margin-bottom: 80px;
  }
  .highScoreContainer {
    margin-left: 0;
  }
}

@media (max-width: 800px) {


  .question, .title {
    color: white;
    font-size: 30px;
  }

  .selectRegion {
    color: white;
    font-size: 20px;

  }

  .rightContainer {
    margin-bottom: 60px;
  }
}
@media (max-width: 500px) {


  .question, .title {
    color: white;
    font-size: 20px;
  }

  .selectRegion {
    color: white;
    font-size: 16px;
  }
  .rightContainer {
    gap: 5px;
  }
}

@media (max-width: 375px) {
  .title {
    font-size: 18px;
  }
  .rightContainer {
    gap: 0;
  }
}

</style>
