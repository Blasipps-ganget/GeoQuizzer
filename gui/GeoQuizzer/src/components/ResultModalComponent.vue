<script setup>
import { useGeneralStore } from '../stores/general.js';
const generalStore = useGeneralStore();

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

          <div><img alt="exclamation mark" src="../assets/images/icons/done.png"></div>
          <div><h2>RESULTS</h2></div>
          <div class="result-boxes">
            <div class="result-box"><h1>9 / 10</h1></div>
            <div class="result-box"><h1>90 %</h1></div>
          </div>
          <div><img class="checkfailedimg" alt="passed" src="../assets/images/icons/pass.png">
            <!--<img class="checkfailedimg" alt="failed" src="../assets/images/icons/fail.png">-->
          </div>
          <div class="passed">
            <h4>YOU PASSED! CONGRATULATIONS</h4>
          </div>
          <div>
            <RouterLink to="/quiz" class="retryButton">Retry the quiz</RouterLink>
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
.retryButton {
  background: #053B50;
  border-radius: 15px;
  padding: 10px;
  width: 40px;
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
  width: 40px;
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


</style>