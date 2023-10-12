<template>
  <div class="content">
    <div>currentQuestion: {{ question }}</div>
    <div>failedGuesses: {{ failedGuesses }}</div>
    <div>succeededGuesses: {{ succeededGuesses }}</div>
    <div>includedCountries: {{ includedCountries }}</div>
    <button @click="exitQuiz">Exit Quiz</button>

    <ClickableMap
        ref="myClickableMap"
        :failedGuesses="failedGuesses"
        :succeededGuesses="succeededGuesses"
        :selectingRegions="selectingRegions"
        :mapResetTrigger="mapResetTrigger"
        @countryClicked="handleCountryClick"
        @regionClicked="handleRegionClick"
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
const selectingRegions = ref(true);
const mapResetTrigger = ref([]);

function handleCountryClick(answer) {
  // alert(`You clicked ${answer}!`);
  if (!question.value) return;

  if (answer === question.value)
    succeededGuesses.value.push(question.value);
  else
    failedGuesses.value.push(question.value);

  includedCountries.value = includedCountries.value.filter(country => country !== question.value);
  question.value = includedCountries.value[Math.floor(Math.random() * includedCountries.value.length)];
}

async function handleRegionClick(region) {
  if (!region) return;
  selectingRegions.value = false;
  includedCountries.value = await d3.json(`http://localhost:8080/countries/${region}`);
  question.value = includedCountries.value[0];

  // alert(`You clicked ${region}!`);
}


function exitQuiz() {
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
</style>
