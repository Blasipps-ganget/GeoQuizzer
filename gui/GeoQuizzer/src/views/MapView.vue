<script setup>

import { ref } from 'vue';
import ClickableMap from "@/components/ClickableMap.vue";

const failedGuesses = ref([]);
const succeededGuesses = ref([]);
const includedCountries = ref(["Sweden", "Finland", "Iceland","Norway","Denmark"]);
// const scale = ref(140);
// const centerX = ref(0);
// const centerY = ref(65);
// below is entire world zoomed out and centered
const scale = ref(140);
const centerX = ref(0);
const centerY = ref(20);
const question = ref(includedCountries.value[Math.floor(Math.random() * includedCountries.value.length)]);

function handleCountryClick(answer) {

  alert(`You clicked ${answer}!`);

  if (!question.value)
    return;

  if (answer === question.value)
    succeededGuesses.value.push(question.value);
  else
    failedGuesses.value.push(question.value);

  includedCountries.value = includedCountries.value.filter(country => country !== question.value);
  question.value = includedCountries.value[Math.floor(Math.random() * includedCountries.value.length)];

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
        :scale="scale"
        :centerX="centerX"
        :centerY="centerY"
        @countryClicked="handleCountryClick"
    />
  </div>
</template>


<style>

</style>