<template>
  <body>
    <div class="container">
      <div class="questionText" v-if="questionsAnswered <10" id="question-text">  <br> {{ generalStore.capitalName ? ("Which country does this capital belong to?" + generalStore.capitalName) : "Which flag does this country belong to"  }}  </div>
      <div class="capital" v-if="questionsAnswered < 10">
      <img :src="generalStore.flagUrl" alt="Quiz" />
      </div>
      <div class="content" id="question-area">
        <div id="answer-btns" class="btn-grid">
        <v-btn v-bind:color="btn0color" class="btn btn-option" @click="checkAnswer(answerOne)" v-if="questionsAnswered < 10" :disabled="buttonPressed">{{ answerOne }}</v-btn>
        <v-btn v-bind:color="btn1color" class="btn btn-option" @click="checkAnswer(answerTwo)" v-if="questionsAnswered < 10" :disabled="buttonPressed">{{ answerTwo }}</v-btn>
        <v-btn v-bind:color="btn2color" class="btn btn-option" @click="checkAnswer(answerThree)" v-if="questionsAnswered < 10" :disabled="buttonPressed">{{ answerThree }}</v-btn>
        <v-btn v-bind:color="btn3color" class="btn btn-option" @click="checkAnswer(answerFour)" v-if="questionsAnswered < 10" :disabled="buttonPressed">{{ answerFour }}</v-btn>
      </div>
      <v-btn class="btn btn-option" @click="displayNext" v-if="questionsAnswered < 10" :disabled="!answerSubmitted" >Next</v-btn>
        <div v-if="showMessage">
          <p>{{ message }}</p>
          <div class="resultText" v-if="questionsAnswered >= 10">
            <p>Quiz completed! Your final score is: {{ totalScore }} </p>
          </div>
        </div>
        </div>
        <button class="btn btn-reset" @click="resetQuiz" v-if="questionsAnswered > 9"> Try again</button>
        <button class="btn btn-practice" @click="practiceQuiz" v-if="questionsAnswered > 9"> Go to Practice </button>
        <button class="btn btn-home" @click="homeButton" v-if="questionsAnswered > 9"> Home </button>

      </div>
  </body>
</template>

<script setup>
import { onMounted, ref } from 'vue';

const normalColor = "#053B50";
const correctColor = "green";
const wrongColor = "red";


let btn0color = normalColor;
let btn1color = normalColor;
let btn2color = normalColor;
let btn3color = normalColor;

import { useGeneralStore } from '../stores/quiz.js';
const generalStore = useGeneralStore();



const correctAnswer = ref(false); 
const questionsAnswered = ref(0);
const totalScore = ref(0);
const showMessage = ref(false); 
const answerSubmitted = ref (false);
let buttonPressed = ref ('');
let correctCountry = ref('');
let message = ref ('');
let resultText = ref ('');

const displayNext = () => {
if(questionsAnswered.value < 10 && answerSubmitted.value){
  answerSubmitted.value = false;
  buttonPressed.value = true;
  if (questionsAnswered.value < 10){
    showMessage.value = true;
    generateRandomAnswers();
    showMessage.value = false;
    resultText.value = true;
  } 
} else {
  generateRandomAnswers();
  showMessage.value = true;
}


btn0color = normalColor;
btn1color = normalColor;
btn2color = normalColor;
btn3color = normalColor;
}

let landlist = [];



const generateRandomAnswers = async () => {
  /*buttonPressed.value = false;
  showMessage.value = true;
  try {
    const response = await fetchCapital();
   data.value.capital = response[0].capital;
    data.value.country = response[0].land;
    data.value.wrongAnswers = response[0].felsvar;
  data.value.flagUrl = response[0].flagUrl;
  console.log(JSON.stringify(response[0]));

    
    correctCountry.value = response;
    
    shuffleArray(answers);
    landlist = {...answers};
*/
buttonPressed.value = false;
showMessage.value = true;
const answers = [...generalStore.wrongAnswers, generalStore.correctAnswer];
shuffleArray(answers);

    answerOne.value = answers[0];
    answerTwo.value = answers[1];
    answerThree.value =  answers[2];
    answerFour.value = answers[3];
  
};

onMounted(async () => {
  await generateRandomAnswers();
});

const answerOne = ref('');
const answerTwo = ref('');
const answerThree = ref('');
const answerFour = ref('');


function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

const resetQuiz = async () => {
  buttonPressed.value = false;
  showMessage.value = false;
  questionsAnswered.value = 0;
  totalScore.value = 0;
  btn0color = normalColor;
  btn1color = normalColor;
  btn2color = normalColor;
  btn3color = normalColor;    
}

const homeButton = async () => {
  window.location.href='/';
}


// Validering av svar
const checkAnswer =  async (selectedAnswer) => {
  showMessage.value = true;
  buttonPressed.value = true;
  if (selectedAnswer === correctCountry.value.land) {
    correctAnswer.value = true; 
   // message.value = 'Correct'
    if (questionsAnswered.value < 10) {
      totalScore.value += 1;
    }
    console.log('Correct!');
    console.log(landlist);
    if (selectedAnswer === answerOne.value) {
      btn0color = correctColor;
    } else if (selectedAnswer === answerTwo.value) {
      btn1color = correctColor;
    } else if (selectedAnswer === answerThree.value) {
      btn2color = correctColor;
    } else if (selectedAnswer === answerFour.value) {
      btn3color = correctColor;
    }
  } else {
    correctAnswer.value = false;
   // message.value = `Incorrect, the correct answer is: ${correctCountry.value.land}`;
    console.log('Incorrect!');
    if (selectedAnswer === answerOne.value) {
    btn0color = wrongColor;
  } else if (selectedAnswer === answerTwo.value) {
    btn1color = wrongColor;
  } else if (selectedAnswer === answerThree.value) {
    btn2color = wrongColor;
  } else if (selectedAnswer === answerFour.value) {
    btn3color = wrongColor;
  }
  if (correctCountry.value.land === answerOne.value) {
    btn0color = correctColor;
  } else if (correctCountry.value.land === answerTwo.value) {
    btn1color = correctColor;
  } else if (correctCountry.value.land === answerThree.value) {
    btn2color = correctColor;
  } else if (correctCountry.value.land === answerFour.value) {
    btn3color = correctColor;
  }
}
  questionsAnswered.value += 1;
  answerSubmitted.value = true;
  buttonPressed.value = true;
  };

</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap');
    .capital {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .capital img {
    width: 300px;
    height: 200px;
  }

    * {
      margin: 0;
      padding: 0;
      font-family: 'Poppins', sans-serif;
    }

    body {
      height: 100vh;
      width: 100wh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .container {
      background-color: #176B87;
      width: 800px;
      max-width: 80%;
      height: 90vh;
      box-shadow: 0 0 2px 2px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-radius: 8px;
      text-align: center;
    }
    .content {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      padding: 40px;
    }

  .btn-grid {
  display: grid;
  grid-template-columns: repeat(2, auto);
  grid-gap: 40px;
  }

  .btn {
  font-size: 15px;
  color: #fff;
  font-family: sans-serif;
  background-color: #053B50;
  height: 65px;
  line-height: 60px;
  text-align: center;
  width: 210px;
  position: relative;
  z-index: 1;
  overflow: hidden;
  border-radius: 10px;
  margin-top: 20px;
  
  }

.btn-option::before-top,
.btn-option::before-bottom,
.btn-option::after-top,
.btn-option::after-bottom {
content: '';
background-color: #64CCC5;
height: 50%;
width: 0;
position: absolute;
transition: 0.9s cubic-bezier(.785, .135, .15, .86);
-webkit-transition: 0.9s cubic-bezier(.785, .135, .15, .86);
z-index: -1;
}

.btn-option:hover .btn-option::before-top,
.btn-option:hover .btn-option::before-bottom {
width: 100%;
}

.btn-option::before-top,
.btn-option::after-bottom {
top: 0;
left: 0;
right: auto;
bottom: auto;
}

.btn-option::before-bottom,
.btn-option::after-top {
bottom: 0;
right: 0;
left: auto;
top: 50%;
}

.btn-option:hover .btn-option::after-top,
.btn-option:hover .btn-option::after-bottom {
width: 100%;
left: 0;
right: auto;
}


    .questionText {
      color: white;
      font-weight: bold;
      font-size: 30px;
      margin: 2%;
    }
    .resultText {
      font-size: 30px;
    }
  
   
 
    </style>