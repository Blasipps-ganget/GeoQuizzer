
<template>
  <div>
      <QuizComponent :quizText="quizFlagText" :currentQuiz="flag"></QuizComponent>
  </div>
</template>

<script setup>
import  QuizComponent  from "../components/QuizComponent.vue";
import {ref, onMounted} from 'vue'
import { useQuizStore } from '../stores/quiz.js';
import { useGeneralStore } from '../stores/general.js';
import { fetchCountryFlag } from "../js/flagApi";
const quizStore = useQuizStore();
const generalStore = useGeneralStore(); 
const quizFlagText = ref("Which flag does this country belong to?");
const flag = "flag";


onMounted(async () => {
  const questionData = await fetchCountryFlag(3);
  console.log(questionData);
});




/* 
let index = 0;




watchEffect((index) => {
  console.log(index.value);
})
const finished = ref(false)
const questionData = await fetchCountryFlag(2);
console.log(questionData);
quizStore.correctAnswer = questionData[index].land
quizStore.capitalName = questionData[index].capital
quizStore.flagUrl = questionData[index].flagUrl
quizStore.wrongAnswers = questionData[index].felsvar


console.log("DATA",questionData);
console.log("DATA1", questionData[0])
 */
/*
export const nextQuestion = () =>{
  index++;
  if(index < 3){
    quizStore.correctAnswer = questionData[index].land
    quizStore.capitalName = questionData[index].capital
    quizStore.flagUrl = questionData[index].flagUrl
    quizStore.wrongAnswers = questionData[index].felsvar

  } else {
    generalStore.showResultModal = true;
  } */
</script>



<style scoped>
</style>  