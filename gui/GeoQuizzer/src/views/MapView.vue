<script setup>

import { ref } from 'vue';
import ClickableMap from "@/components/ClickableMap.vue";

const failedGuesses = ref([]);
const succeededGuesses = ref([]);
const includedCountries = ref(["Sweden", "Finland", "Iceland","Norway","Denmark"]);
const question = ref(includedCountries.value[Math.floor(Math.random() * includedCountries.value.length)]);
const selectingRegions = ref(true);

function handleCountryClick(answer) {

  alert(`You clicked ${answer}!`);

  if (!question.value) return;

  if (answer === question.value)
    succeededGuesses.value.push(question.value);
  else
    failedGuesses.value.push(question.value);

  includedCountries.value = includedCountries.value.filter(country => country !== question.value);
  question.value = includedCountries.value[Math.floor(Math.random() * includedCountries.value.length)];
}

function handleRegionClick(region) {

  if(!region) return;
  selectingRegions.value = false;
}

</script>

<template>
  <div>
    <div>currentQuestion: {{question}}</div>
    <div>failedGuesses: {{failedGuesses}}</div>
    <div>succeededGuesses: {{succeededGuesses}}</div>
    <div>includedCountries: {{includedCountries}}</div>
    <ClickableMap
        :failedGuesses="failedGuesses"
        :succeededGuesses="succeededGuesses"
        :selectingRegions="selectingRegions"
        @countryClicked="handleCountryClick"
        @regionClicked="handleRegionClick"

    />
  </div>
</template>


<style>

</style>