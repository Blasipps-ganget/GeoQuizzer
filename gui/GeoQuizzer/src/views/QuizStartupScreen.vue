<script setup>

import {ref, computed} from "vue";
import ClickableMap from "@/components/ClickableMap.vue";
import { useGeneralStore } from '@/stores/general';
import router from "@/router";
import HighScoreComponent from "@/components/HighScoreComponent.vue";
const selectAmountOfQuestions = ref(0);
const selectPracticeOrExam = ref("");
const generalStore = useGeneralStore();
const showSelectBox = ref(true);
const isSetToExam = ref(false);


const message = computed(() => {
  if (generalStore.selectedQuiz === 'flags')
    return 'Learn the flags of the world';
  else if (generalStore.selectedQuiz === 'capitals')
    return 'Learn the capitals of the world';
  else return '';
})

function checkForLoggedIn() {

  if (!generalStore.isLoggedIn) {
    alert('You need to be logged in to take an exam!')
    setSelectedQuiz('practice')
    isSetToExam.value = false;
    return;
  }
  setSelectedQuiz('exam');

}






function handleRegionClick(region) {
  generalStore.selectedRegion = region;
}

const toggleSelectBox = () => {
  showSelectBox.value = !showSelectBox.value;
  isSetToExam.value = !isSetToExam.value;
};

function startQuiz() {
  generalStore.practiceOrExam = selectPracticeOrExam.value;
  generalStore.noQuestions = selectAmountOfQuestions.value;

  if (generalStore.selectedQuiz === 'flags')
    router.push({path: '/flag'});
  else if (generalStore.selectedQuiz === 'capitals')
    router.push({path: '/capital'})
}

const setSelectedQuiz = (quizToDo) => {
  if (quizToDo === 'exam' && isSetToExam.value) return;
  if (quizToDo === 'practice' && !isSetToExam.value) return;

  selectPracticeOrExam.value !== quizToDo ? selectPracticeOrExam.value = quizToDo : selectPracticeOrExam.value = "";

  console.log(selectPracticeOrExam.value);
}


</script>
<template>
  <main>
    <div class="masterCenter">
      <div class="leftContainer">
      </div>
      <div class="centerContent">
          <div class="mapContent">
            <h1 class="selectedQuizTitle">{{message}}</h1>
            <h2 class="selectedRegionTitle">Select Region</h2>
            <ClickableMap @regionClicked="handleRegionClick" :markRegion=true />
          </div>
        <div/>
      </div>
      <div class="rightContainer">
        <div class="selectionButtons">

          <div class="onlyButtons">
            <button  :class="{ lightButton: !isSetToExam, blueButton: isSetToExam }"  @click="toggleSelectBox(); setSelectedQuiz('practice')">Practise</button>
            <button :class="{ lightButton: isSetToExam, blueButton: !isSetToExam }"  @click="toggleSelectBox(); checkForLoggedIn()">Exam</button>
            <div class="buttonContent">
              <button class="blueButton" @click="startQuiz()">Start Quiz</button>

            </div>
          </div>
          <div>
            <v-select class="selectBox" v-model="selectAmountOfQuestions"
                      v-if="showSelectBox"
                      label="Nr of questions"
                      :items="['5','10','15','20','30']"
                      variant="solo-filled"
            >
            </v-select>
          </div>
        </div>
        <div class="highScoreContainer">
          <HighScoreComponent v-if="generalStore.isLoggedIn"></HighScoreComponent>
        </div>

      </div>

    </div>
  </main>
</template>

<style scoped>

.selectBox {
  margin-top: 35px;
  width: 145px;
}

.leftContainer{
  width: calc(50% - 500px);
  margin-left: auto;
  margin-right: auto;
}

.rightContainer {
  width: calc(50% - 500px);
  margin-right: auto;
  margin-left: auto;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  gap: 40px;

}

.onlyButtons {
  display: flex;
  flex-direction: column;
  margin-bottom: auto;

}

.highScoreContainer{
  margin-right: auto;
  margin-left: 100px;
}

.buttonContent {
  display: flex;

  flex-direction: column;
  justify-content: center;
}

.centerContent {
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: auto;
}

.mapContent {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #176B87;
  width: 1000px;
  margin-top: 50px;
  margin-left: auto;
  margin-right: auto;
  padding: 20px;
  box-shadow: 0 0 2px 2px;
  border-radius: 8px;
  max-width: 99vw;

}

.masterCenter {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  flex-direction: row;
}

.selectionButtons {
  margin-right: auto;
  margin-left: 100px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 0 2px 2px;
  border-radius: 8px;
  background: #176B87;
  padding: 10px;
  width: 200px;
  height: 300px;
}

.selectedRegionTitle {
  color: white;
  font-weight: bold;
  font-size: 20px;
  margin-top: 10px;
}

.selectedQuizTitle {
  color: white;
  font-size: 40px;
}

.blueButton {
  background-color: #053B50;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  width: 150px;
  height: 40px;
  margin: 10px auto;
  box-shadow: 4px 7px 10px rgba(0,0,0,.4);
}

.lightButton {
  background-color: #64CCC5;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  width: 150px;
  height: 40px;
  margin: 10px auto;
  box-shadow: 4px 7px 10px rgba(0,0,0,.4);
}

@media (max-width: 1800px) {
  .selectionButtons{
    margin-left: auto;
  }
  .highScoreContainer {
    margin-left: auto;
  }
}


@media (max-width: 1405px) {
  .masterCenter {
    flex-direction: column;
  }
  .rightContainer {
    margin-top: 25px;
    width: 100%;
    flex-direction: row;
  }
  .selectionButtons{
    margin-right: 0;
  }
  .highScoreContainer {
    margin-left: 0;
  }
}

@media (max-width: 800px) {
  .selectedQuizTitle {
    font-size: 30px;
  }
  .selectedRegionTitle {

    font-size: 16px;
    margin-top: 5px;
  }
}
@media (max-width: 500px) {

  .rightContainer {
    flex-direction: column;
    gap: 10px;
  }
  .selectedQuizTitle {
    font-size: 20px;
  }
  .selectedRegionTitle {

    font-size: 12px;
    margin-top: 5px;
  }

  .selectionButtons {
    margin-left:  auto;
    margin-right: auto;
    margin-bottom: 15px;
  }
  .highScoreContainer {
    margin: auto;
  }
}

@media (max-width: 375px) {
  .selectedQuizTitle {
    font-size: 18px;
  }
  .selectedRegionTitle {

    font-size: 14px;
    margin-top: 5px;
  }
  .rightContainer {
    gap: 0;
  }
}

</style>