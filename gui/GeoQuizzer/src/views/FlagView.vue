
<template>
  <div>
      <QuizComponent :quizText="quizFlagText" :currentQuiz="flag"></QuizComponent>
  </div>
  <div>
  <ResultModalComponent
    :correctGuesses="quizStore.correctAmount"
        :noQuestions="generalStore.noQuestions"
        :mapView="true"
        v-if="generalStore.showResultModal">
  </ResultModalComponent>
</div>

</template>

<script setup>
import ResultModalComponent from "@/components/ResultModalComponent.vue";
import  QuizComponent  from "../components/QuizComponent.vue";
import {ref, onMounted} from 'vue';
import { useGeneralStore } from "../stores/general";
import { useQuizStore } from "../stores/quiz";
import { fetchCountryFlag } from "../js/flagApi";
const quizFlagText = ref("Which country does this flag belong to?");
const flag = "flag";
const generalStore = useGeneralStore();
const quizStore = useQuizStore();





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