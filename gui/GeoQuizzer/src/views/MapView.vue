<script setup>
import {nextTick, ref} from 'vue';
import ClickableMap from "@/components/ClickableMap.vue";
import ProgressBarComponent from "@/components/ProgressBarComponent.vue";
import * as d3 from "d3";
import { useMapStore } from '@/stores/map';
const mapStore = useMapStore();

const failedGuesses = ref([]);
const succeededGuesses = ref([]);
const includedCountries = ref([]);
const question = ref();
const answerArray = ref([]);
const selectingRegions = ref(true);
const map = ref(null);
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
    await displayResults();
    await resetQuiz();
  }
}

async function displayResults() {
  alert(`Your score is ${succeededGuesses.value.length}/${succeededGuesses.value.length + failedGuesses.value.length}`);
  await fetch(`http://localhost:8080/countryquiz/result`, {
    headers: {'Content-Type': 'application/json'},
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
  includedCountries.value = await d3.json(`http://localhost:8080/countryquiz/quiz/${region}`);
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

    <ProgressBarComponent v-if="!selectingRegions"
        :amountAnswered="failedGuesses.length + succeededGuesses.length"
        :totalQuestions="includedCountries.length"
    />
    <button v-if="!selectingRegions" @click="resetQuiz">Reset Quiz</button>
  </div>
</template>


<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.message {

  margin-top: 30px;
  color: #053B50;
  font-weight: bold;
  font-size: 40px;
}
</style>
