<script setup>
import {nextTick, ref} from 'vue';
import ClickableMap from "@/components/ClickableMap.vue";
import ProgressBarComponent from "@/components/ProgressBarComponent.vue";
import * as d3 from "d3";
import { useMapStore } from '@/stores/map';
import ResultModalComponent from "@/components/ResultModalComponent.vue";
import { useGeneralStore } from '@/stores/general';
import {handleToken} from '@/js/userApi'
const generalStore = useGeneralStore();
const mapStore = useMapStore();
const failedGuesses = ref([]);
const succeededGuesses = ref([]);
const includedCountries = ref([]);
const question = ref();
const answerArray = ref([]);
const selectingRegions = ref(true);
//const map = ref(null);
const isZoomEnabled = ref(false);
const isSetToExam = ref(true);

let questionIndex = 0;
let regionGlobal = null;


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

  await fetch(`http://localhost:8080/countryquiz/result`, {
    headers: {
      'Content-Type': 'application/json'
      ,'Authorization': `Bearer ${accessToken}`
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
  isZoomEnabled.value = !isZoomEnabled.value;
}

function toggleSetToExamOrPractise() {
  isSetToExam.value = !isSetToExam.value;
}

</script>

<template>
  <div class="content">
    <div class="message" v-if="question">Where is: {{ question }}?</div>
    <div class="message" v-else>Select region to start quiz</div>

    <ClickableMap
        :failedGuesses="failedGuesses"
        :succeededGuesses="succeededGuesses"
        :selectingRegions="selectingRegions"
        @countryClicked="handleCountryClick"
        @regionClicked="handleRegionClick"
        @resetQuiz="resetQuiz"
        ref="map"
    />



    <button class="blueButton" v-if="!selectingRegions" @click="resetQuiz">Reset Quiz</button>
    <button class="blueButton" v-if="selectingRegions" @click="toggleSetToExamOrPractise">{{ isSetToExam ? 'Set to Exam' : 'Set to Practise' }}</button>
    <div class="progressBarContainer">
      <ProgressBarComponent v-if="!selectingRegions"
                            :amountAnswered="failedGuesses.length + succeededGuesses.length"
                            :totalQuestions="includedCountries.length"
      />
    </div>
    <button class="blueButton" @click="toggleZoom">{{ isZoomEnabled ? 'Disable Zoom' : 'Enable Zoom' }}</button>
  </div>
  <ResultModalComponent
      :correctGuesses="succeededGuesses.length"
      :noQuestions="succeededGuesses.length + failedGuesses.length"
      :mapView="true"
      v-if="generalStore.showResultModal">
  </ResultModalComponent>
</template>


<style>
.content {
  width: 900px;
  margin: auto;
}
.message {

  margin-top: 15px;
  color: #053B50;
  font-weight: bold;
  font-size: 40px;
}

.blueButton {
  background-color: #053B50;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  width: 150px;
  height: 40px;
  margin-top: auto;
  margin-bottom: 15px;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}


.progressBarContainer {
  margin-top: auto;
  width: 200px;

}


</style>
