<template>
  <div>
    <QuizComponent :quizText="quizCapitalText" :currentQuiz="capital"></QuizComponent>>
    
    
  </div>
</template>

<script setup>
import  QuizComponent  from "../components/QuizComponent.vue";
import { fetchCapital } from '../js/capitalApi';
import {ref, onMounted} from 'vue';
import { useQuizStore } from '../stores/quiz.js';
import { useGeneralStore } from "../stores/general.js";
const generalStore = useGeneralStore();
const quizCapitalText = ref("Which capital does this country belong to?");
const quizStore = useQuizStore();
const capital = "capital";

onMounted(async () => {
  const questionData = await fetchCapital(3);
  console.log(questionData);
})



</script>



<style scoped>
</style>  