<script setup>
import {handleToken} from "@/js/userApi";
import { useGeneralStore } from '@/stores/general';
import {watch, ref} from "vue";

const generalStore = useGeneralStore();
let results = await getResults();
let resultsAsObject = JSON.parse(results);
const region = ref(resultsAsObject.highscores);

watch(() => generalStore.selectedQuiz, async () => {
  results = await getResults();
  resultsAsObject = JSON.parse(results);
  region.value = resultsAsObject.highscores;
});

async function getResults() {
  const accessToken = await handleToken();
  return fetch(`http://localhost:8080/highscores/?name=${generalStore.loggedInUser}&quiz=${generalStore.selectedQuiz}`, {
    headers: {'Authorization': `Bearer ${accessToken}`},
    method: 'GET',})
      .then(response => response.json())
      .catch(error => console.error('There has been a problem with your fetch operation:', error));
}

</script>
<template>
  <div class="progressContent">
    <h2>Best Result:</h2>
    <div class="listRegions" v-for="(item,index) in region" :key="index">
      {{item.region}} : {{item.percentage}}{{ item.percentage ? '%' : ''}}
    </div>
  </div>
</template>
<style scoped>

.progressContent {
  justify-content: space-between;
  align-items: center;
  width: 200px;
  height: 200px;
  margin: auto;
  padding: 15px;
  background: #176B87;
  box-shadow: 0 0 2px 2px black;
  border-radius: 8px;
  color: white;
}

</style>