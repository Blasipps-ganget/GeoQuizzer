<template>
  <div class="content">
    <button @click="reloadQuiz">Reload Quiz</button>
    <button @click="resetQuiz">Reset Map</button>

    <div>failedGuesses: {{ failedGuesses }}</div>
    <div>succeededGuesses: {{ succeededGuesses }}</div>
    <div>includedCountries: {{ includedCountries }}</div>
    <div>answerArray: {{ answerArray }}</div>
    <div class="message" v-if="question">Where is: {{ question }}?</div>
    <div class="message" v-else>Select region</div>


    <ClickableMap
        :failedGuesses="failedGuesses"
        :succeededGuesses="succeededGuesses"
        :selectingRegions="selectingRegions"
        :mapResetTrigger="mapResetTrigger"
        @countryClicked="handleCountryClick"
        @regionClicked="handleRegionClick"
        @resetQuiz="resetQuiz"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ClickableMap from "@/components/ClickableMap.vue";
import * as d3 from "d3";

const failedGuesses = ref([]);
const succeededGuesses = ref([]);
const includedCountries = ref([]);
const question = ref();
const answerArray = ref([]);
const selectingRegions = ref(true);
const mapResetTrigger = ref([]);

async function handleCountryClick(answer) {

  if (!question.value) return;

  if (answer === question.value)
    succeededGuesses.value.push(question.value);
  else
    failedGuesses.value.push(question.value);

  includedCountries.value = includedCountries.value.filter(country => country !== question.value);

  answerArray.value.push(answer);
  question.value = includedCountries.value[0];
  if (!question.value) {
    await sleep(500);
    await displayResults();
    resetQuiz();
  }
}

async function displayResults() {
  alert(`Your score is ${succeededGuesses.value.length}/${succeededGuesses.value.length + failedGuesses.value.length}`);
  await fetch(`http://localhost:8080/countries/result`, {
    headers: {'Content-Type': 'application/json'},
    method: 'POST',
    body: JSON.stringify({ answers: answerArray.value})
  });
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function handleRegionClick(region) {
  if (!region) return;
  selectingRegions.value = false;
  includedCountries.value = await d3.json(`http://localhost:8080/countries/${region}`);
  question.value = includedCountries.value[0];

  // alert(`You clicked ${region}!`);
}



function resetQuiz() {
  selectingRegions.value = true;
  failedGuesses.value = [];
  succeededGuesses.value = [];
  includedCountries.value = [];
  answerArray.value = [];
  question.value = null;
  mapResetTrigger.value.length === 0 ? mapResetTrigger.value.push(1) : mapResetTrigger.value.pop();
}


function reloadQuiz() {
  location.reload();
}
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.message {

  color: #053B50;
  font-weight: bold;
  font-size: 40px;
}
</style>
