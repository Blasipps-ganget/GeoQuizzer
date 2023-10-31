<template>
  <div>
    <QuizComponent >
    
    </QuizComponent>
  </div>
</template>

<script>

import QuizComponent from "../components/QuizComponent.vue";
import { fetchCountryFlag } from "../js/flagApi";
import {ref} from 'vue';
import { useGeneralStore } from "../stores/quiz";
const generalStore = useGeneralStore();
let index = 0;

const amountOfQuestions = 2;
const questionData = await fetchCountryFlag(amountOfQuestions);
const currentQuestion = ref(questionData[index]);

generalStore.correctAnswer = questionData[index].land
generalStore.flagUrl = questionData[index].flagUrl
generalStore.wrongAnswers = questionData[index].felsvar


let questionNr = questionData[index];
const nextQuestion  = () =>{
  index++;
  currentQuestion.value = questionData[index];
}
//const questionData = await fetchCapital(amountOfQuestions);

export default {
  components: {
    QuizComponent
},
};
</script>

<style scoped>

</style>  