<template>
  <div>
    <QuizComponent>
    
    </QuizComponent>
  </div>
</template>

<script >

import  QuizComponent  from "../components/QuizComponent.vue";
import { fetchCapital } from '../js/capitalApi';
import {ref} from 'vue'
import { useGeneralStore } from '../stores/quiz.js';
const generalStore = useGeneralStore();
let index = 0;

const amountOfQuestions = 2;
const questionData = await fetchCapital(amountOfQuestions);
const currentQuestion = ref(questionData[index]);

generalStore.correctAnswer = questionData[index].land
generalStore.capitalName = questionData[index].capital
generalStore.flagUrl = questionData[index].flagUrl
generalStore.wrongAnswers = questionData[index].felsvar

console.log("DATA",questionData);
console.log("DATA1", questionData[0])

let questionNr = questionData[index];
export default {
  components: {
  QuizComponent ,
  },
};
const nextQuestion = () =>{
  index++;
  currentQuestion.value = questionData[index]
}
</script>



<style scoped>
</style>  