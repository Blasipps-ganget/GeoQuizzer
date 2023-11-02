
<template>
  <div>
      <QuizComponent :quizText="quizFlagText" :currentQuiz="flag"></QuizComponent>
  </div>


</template>

<script setup>
import  QuizComponent  from "../components/QuizComponent.vue";
import {ref, onMounted} from 'vue';
import { useQuizStore } from '../stores/quiz.js';
import { useGeneralStore } from '../stores/general.js';
import { fetchCountryFlag } from "../js/flagApi";
import {handleToken} from "@/js/userApi";
const quizStore = useQuizStore();
const generalStore = useGeneralStore(); 
const quizFlagText = ref("Which flag does this country belong to?");
const flag = "flag";
const isSetToExam = ref(false);
const failedGuesses = ref([]);
const question = ref();
const succeededGuesses = ref([]);

let regionGlobal = null;
const answerArray = ref([]);
const includedCountries = ref([]);





onMounted(async () => {
  const questionData = await fetchCountryFlag(3);
  console.log(questionData);
});

async function handleResults() {

generalStore.showResultModal = !generalStore.showResultModal;
if (!isSetToExam.value) return;
const accessToken = await handleToken();
console.log("token",accessToken)

await fetch(`http://localhost:8080/capitalquiz/result`, {
  headers: {
    'Content-Type': 'application/json'
    ,'Authorization': `Bearer ${accessToken}`
  },
  method: 'POST',
  body: JSON.stringify({
    questions: includedCountries.value,
    answers: answerArray.value,
    region: regionGlobal
  }),
});
}
async function handleCountryClick(answer) {

if (!question.value) return;

if (answer === question.value)
  succeededGuesses.value.push(question.value);
else
  failedGuesses.value.push(question.value);

questionIndex += 1;
answerArray.value.push(answer);
question.value = includedCountries.value[questionIndex];
if (!question.value) {

  await handleResults();
}
}




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