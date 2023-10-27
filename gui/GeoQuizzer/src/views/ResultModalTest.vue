<script setup>
import { ref } from 'vue'
import ResultModalComponent from "@/components/ResultModalComponent.vue";
import { useGeneralStore } from '../stores/general.js';
const generalStore = useGeneralStore();


</script>

<template>
  <div class="buttonView">
    <button @click="generalStore.showResultModal = !generalStore.showResultModal">Toggle modal</button>
  </div>
  <ResultModalComponent correctGuesses="6" noQuestions="10" v-if="generalStore.showResultModal"></ResultModalComponent>
</template>


<style scoped>
.buttonView {
  display: flex;
  justify-content: center;
}
</style>
