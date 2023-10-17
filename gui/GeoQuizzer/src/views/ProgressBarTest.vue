<script setup>
import { ref } from 'vue';
import ProgressBarComponent from "@/components/ProgressBarComponent.vue";

const amountAnswered = ref(0)
const totalQuestions = ref(11)

</script>

<template>
<div class="content">
  <div>
  <p><h3>Progress bar test</h3></p>
  <p><button class="customBtn" @click="amountAnswered++">One more question completed</button></p>
total questions: {{ totalQuestions }}<br>
amount answered: {{ amountAnswered }}

<ProgressBarComponent :amountAnswered="amountAnswered" :totalQuestions="totalQuestions"></ProgressBarComponent>
  </div>
  </div>
</template>

<style scoped>

.content {
  display: flex;
  justify-content: center;
}

.customBtn {
  border: 2px solid black;
  border-radius: 15px;
  padding: 5px;
}

</style>