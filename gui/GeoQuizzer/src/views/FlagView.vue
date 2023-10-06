<script setup>

import { ref } from 'vue';
import ClickableMap from "@/components/ClickableMap.vue";

const failedGuesses = ref([]);
const succeededGuesses = ref([]);
const includedCountries = ref([]);

const scale = ref(140);
const centerX = ref(0);
const centerY = ref(20);
const question = ref(includedCountries.value[Math.floor(Math.random() * includedCountries.value.length)]);



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
        :includedCountries="includedCountries"
        :scale="scale"
        :centerX="centerX"
        :centerY="centerY"
        @countryClicked="handleCountryClick"
    />
  </div>
</template>


<style>

</style>