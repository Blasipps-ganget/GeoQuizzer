
<template>
  <div>
      <QuizComponent :quizText="quizCapitalText" :currentQuiz="capital"></QuizComponent>
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
const quizCapitalText = ref("Which country does this capital belong to?");
const capital = "capital";
const generalStore = useGeneralStore();
const quizStore = useQuizStore();


onMounted(async () => {
  quizStore.currentQuestion = 0;
});

</script>



<style scoped>
</style>  