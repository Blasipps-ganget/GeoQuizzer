<script setup>

import {ref} from "vue";
import LoginRegistrationModal from "@/components/LoginRegistrationModal.vue";

const regions = ["Europe", "Asia", "America", "Oceania", "Africa"];
const selectedQuiz = ref("");
const buttonColor = ref('black');


const setSelectedQuiz = (quizToDo) => {
  selectedQuiz.value !== quizToDo ? selectedQuiz.value = quizToDo : selectedQuiz.value = "";
  console.log(selectedQuiz.value);
}
const getTabs = (region) => {
  const regionLength = region.length;
  if (regionLength > 4) {
    return '&nbsp;'.repeat(regionLength - 4);

  }
  return '';
}

const headers = [
  {title: 'Region', align: 'start', key: 'region'},
  {title: 'Percentage', align: 'end', key: 'percentage'}

]
const region = [
  {
    region: "Europe",
    percentage: '0%'
  }, {
    region: 'Africa',
    percentage: '0%'
  },
  {
    region: 'America',
    percentage: '0%'
  },


]
const five = 5;
</script>

<template>
<!--  <main class="main">
    <section>
      <div id="map"></div>
    </section>
    <section class="regionProgressSection">

      <v-data-table
          v-model:items-per-page="five"
          :headers="headers"
          :items="region"
          item-value="percentage"
          class="elevation-1"
      ></v-data-table>


    </section>
    <div class="DifficultyInput">
      <p>Choose difficulty</p>
      <v-col
          cols="12"
          class="py-2"
      >
        <v-btn-toggle
            v-model:selected-class="buttonColor"
            rounded="5"
            color="blue"
            group
        >
          <v-btn value="practice"
                 @click="setSelectedQuiz('practice')">

            Practice
          </v-btn>

          <v-btn value="Exam"
                 @click="setSelectedQuiz('exam')">
            Exam
          </v-btn>

        </v-btn-toggle>
      </v-col>
    </div>

  </main>-->
  <LoginRegistrationModal></LoginRegistrationModal>
</template>

<style scoped>
.main {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

#map {
  height: 200px;
  width: 200px;
  background-color: rgb(128, 128, 128);
}


</style>