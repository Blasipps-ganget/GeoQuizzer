<script setup>
import { useGeneralStore } from '../stores/general.js';
const generalStore = useGeneralStore();
import { computed } from 'vue';
const props = defineProps({
  correctGuesses: Number,
  noQuestions: Number,
  mapView: {type: Boolean, default: false}
});

const correctGuesses = props.correctGuesses;
const noQuestions = props.noQuestions;

const passed = computed(() => {
  return correctGuesses/parseFloat(noQuestions) >= 0.6;
})

const percentage = computed(() => {
  return Math.trunc(correctGuesses/parseFloat(noQuestions) * 100);
})

console.log(passed.value)
console.log(percentage.value)
console.log(correctGuesses);
console.log(noQuestions);


</script>

<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-content">
        <div class="header-grid">
          <div class="grid-item"><button class="x-icon" @click="generalStore.showResultModal = false"><img alt="x" class="x-icon" src="../assets/images/icons/x-icon.png"></button></div>
          <div class="grid-item"><h1>The quiz is done!</h1></div>
        </div>
        <div class="center-content">
          <div><img v-if="passed" class="checkfailedimg" alt="passed" src="../assets/images/icons/pass.png">
            <img v-else class="checkfailedimg" alt="failed" src="../assets/images/icons/fail.png">
          </div>

          <div><h2>RESULTS</h2></div>
          <div class="result-boxes">
            <div class="result-box"><h1>{{ correctGuesses }} / {{ noQuestions }}</h1></div>
            <div class="result-box"><h1>{{ percentage}}%</h1></div>
          </div>

          <div v-if="passed" class="passed">
            <h4>YOU PASSED! CONGRATULATIONS</h4>
          </div>
          <div v-else class="failed">
            <h4>YOU FAILED</h4>
            The limit was {{ Math.trunc(0.6 * noQuestions) }}
          </div>
          <div>
            <button v-if="mapView" class="retryButton" @click="generalStore.showResultModal = false">Select region</button>
            <RouterLink v-else to="/quiz" class="retryButton">Retry the quiz</RouterLink>
            <RouterLink to="/" class="retryButton">Return home</RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.passed {
  height: 40px;
}
.failed {
  height: 65px;
}
.retryButton {
  background: #053B50;
  border-radius: 15px;
  padding: 10px;
  width: 120px;
  margin: 10px;
  color: white;
}

a {
  text-decoration: none;
}

.x-icon {
  width: 20px;
}

.checkfailedimg {
  width: 100px;
}

.result-boxes {
  display: flex;
  flex-direction: row;
}

.result-box {
  border: 2px solid black;
  border-radius: 15px;
  padding: 40px;
  margin: 20px;
}

.header-grid {
  display: grid;
  grid-template-columns: 170px 300px;
  grid-template-rows: 50px;
}

.center-content {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.modal-mask {
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s ease;
  display: table;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;

}

.modal-content {
  height: 600px;
  width: 650px;
  margin: auto;
  padding: 20px 20px;
  border-radius: 15px;
  background-color: #F5F0F6;

}

@media screen and (max-width: 720px) {
  .modal-content {
    height: 500px;
    width: 320px;
  }

  .modal-mask {
    margin-left: 18px;
  }

  .header-grid {
    display: grid;
    margin-left: 5px;
    grid-template-columns: 75px 250px;
    grid-template-rows: 50px;
  }

  h1 {
    font-size: 18px;
  }

  .result-box {
    padding: 15px;
    margin: 20px;
  }

}

</style>