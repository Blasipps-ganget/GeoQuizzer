<script setup>
import {handleToken} from "@/js/userApi";
import { useGeneralStore } from '@/stores/general';
const generalStore = useGeneralStore();

//TODO Dont forget to set correct generalStore in parent component or change to use props i think Kevin wants us to use props here

async function getResults() {
  const accessToken = await handleToken();
  console.log(accessToken)
  return fetch(`http://localhost:8080/highscores/?quiz=${generalStore.selectedQuiz}`, {
    headers: {'Authorization': `Bearer ${accessToken}`},
    method: 'GET',})
      .then(response => response.json())
      .catch(error => console.error('There has been a problem with your fetch operation:', error));
}

const results = await getResults();
const resultsAsObject = JSON.parse(results);
const region = resultsAsObject.highscores;


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