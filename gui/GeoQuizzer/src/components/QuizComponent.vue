
<template>
  <body>
    <div class="container">
      <div class="questionText" id="question-text">  {{ quizText }} <br>  {{ quizStore.capitalName  }}  </div>
      <div class="capital">
        <img :src="quizStore.flagUrl" alt="Quiz" :class="{
        'capital-flag': currentQuiz === 'capital', 'country-flag': currentQuiz === 'flag' }"/>
      </div>
      <div class="content" id="question-area">
        <div id="answer-btns" class="btn-grid">
        <v-btn v-bind:color="showColors ? btn0color : undefined" class="btn btn-option" @click="checkAnswer(answerOne)" :disabled="buttonPressed">{{ answerOne }}</v-btn>
        <v-btn v-bind:color="showColors ? btn1color : undefined" class="btn btn-option" @click="checkAnswer(answerTwo)" :disabled="buttonPressed">{{ answerTwo }}</v-btn>
        <v-btn v-bind:color="showColors ? btn2color : undefined" class="btn btn-option" @click="checkAnswer(answerThree)" :disabled="buttonPressed">{{ answerThree }}</v-btn>
        <v-btn v-bind:color="showColors ? btn3color : undefined" class="btn btn-option" @click="checkAnswer(answerFour)" :disabled="buttonPressed">{{ answerFour }}</v-btn>
      </div>
      <v-btn class="btn btn-option" @click="displayNext"  :disabled="answerSubmitted" >Next</v-btn>
        <div v-if="showMessage">
          <p>{{ message }}</p>
        </div>
        </div>
      </div>
  </body>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import { useQuizStore } from '../stores/quiz.js';
import { fetchCapital, postCapitalResult } from '../js/capitalApi';
import { fetchCountryFlag, postFlagResult } from '../js/flagApi';
import { defineProps } from 'vue';
import { useGeneralStore } from '../stores/general.js';



const props = defineProps({
  quizText: String,
  currentQuiz: String
});


const quizGeneralStore = useGeneralStore();
const quizStore = useQuizStore();
const normalColor = "#053B50";
const correctColor = "green";
const wrongColor = "red";

let btn0color = normalColor;
let btn1color = normalColor;
let btn2color = normalColor;
let btn3color = normalColor;
const index = ref(0);

let questionData;
const showColors = computed(() => quizGeneralStore.practiceOrExam === 'practice');


const nextQuestion = () =>{
  index.value++;
  if(index.value < quizGeneralStore.noQuestions){
    if(quizGeneralStore.practiceOrExam === "capital"){
    quizStore.correctAnswer = questionData[index.value].land
    quizStore.capitalName = questionData[index.value].capital[0]
    quizStore.flagUrl = questionData[index.value].flagurl.svg
    quizStore.wrongAnswers = questionData[index.value].felsvar
    } else{
      quizStore.correctAnswer = questionData[index.value].land
    quizStore.flagUrl = questionData[index.value].flagurl.svg
    quizStore.wrongAnswers = questionData[index.value].felsvar
    }
  }
}


const correctAnswer = ref(false); 
const questionsAnswered = ref(0);
const totalScore = ref(0);
const showMessage = ref(false); 
const answerSubmitted = ref (true);
let buttonPressed = ref ('');
let correctCountry = ref('');
let message = ref ('');
let landlist = [];
let correctAnswersArray = [];
let guessesArray = [];

const displayNext = () => {
  nextQuestion()
  console.log("LÄNGDARRAY", correctAnswersArray.length);
  quizStore.currentQuestion ++;
  console.log("CurrentQuestion", quizStore.currentQuestion)
  console.log("noQuestions", quizGeneralStore.noQuestions)
if(quizStore.currentQuestion >= quizGeneralStore.noQuestions){
  console.log("QUIZ DONE");
    quizGeneralStore.showResultModal=true;
/*   answerSubmitted.value = true;
  buttonPressed.value = true;
  if (questionsAnswered.value){
    answerSubmitted.value = true;
    showMessage.value = true;
    generateRandomAnswers();
    showMessage.value = false;
    resultText.value = true;
  }  */
} else {
  generateRandomAnswers();
  showMessage.value = true;
}


btn0color = normalColor;
btn1color = normalColor;
btn2color = normalColor;
btn3color = normalColor;
answerSubmitted.value = true;
}


const generateRandomAnswers = async () => {
buttonPressed.value = false;
showMessage.value = true;
const answers = [...quizStore.wrongAnswers, quizStore.correctAnswer];
shuffleArray(answers);

answerOne.value = answers[0];
answerTwo.value = answers[1];
answerThree.value =  answers[2];
answerFour.value = answers[3];
  
};

onMounted(async () => {
  quizGeneralStore.currentQuestion = 0;
  guessesArray = [];
  correctAnswersArray = [];
  if (quizGeneralStore.practiceOrExam === 'exam') {
  console.log(quizGeneralStore.selectedRegion);
  console.log("REGION",quizGeneralStore.selectedRegion);
  console.log("ANTAL FRÅGOR:", quizGeneralStore.noQuestions);
  console.log("selected quiz:", quizGeneralStore.practiceOrExam);
  quizGeneralStore.noQuestions = 30;
} else  {
  quizGeneralStore.practiceOrExam = 'practice';
  console.log("REGION",quizGeneralStore.selectedRegion);
  console.log("ANTAL FRÅGOR:", quizGeneralStore.noQuestions);
  console.log(quizGeneralStore.noQuestions);
  console.log("selected quiz:", quizGeneralStore.practiceOrExam);
}

  if (props.currentQuiz === 'capital') {
    questionData = await fetchCapital(quizGeneralStore.noQuestions, quizGeneralStore.selectedRegion);
    quizStore.correctAnswer = questionData[index.value].land;
    quizStore.capitalName = questionData[index.value].capital[0];
    quizStore.flagUrl = questionData[index.value].flagurl.svg;
    quizStore.wrongAnswers = questionData[index.value].felsvar;
    console.log('CAPITAL', questionData);
  } else {
    questionData = await fetchCountryFlag(quizGeneralStore.noQuestions, quizGeneralStore.selectedRegion);
    quizStore.correctAnswer = questionData[index.value].land;
    quizStore.flagUrl = questionData[index.value].flagurl.svg;
    quizStore.wrongAnswers = questionData[index.value].felsvar;
    console.log('FLAG', questionData);
  }
  console.log('DATA FROM ONMOUNTED', questionData);
  generateRandomAnswers();
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


// Validering av svar
const checkAnswer =  async (selectedAnswer) => {
  correctAnswersArray.push(quizStore.correctAnswer)
  quizStore.correctAnswersArray = correctAnswersArray;
  guessesArray.push(selectedAnswer)
  showMessage.value = true;
  
  if (selectedAnswer === quizStore.correctAnswer) {
    correctAnswer.value = true;
    quizStore.increment();
   // message.value = 'Correct'
    if (questionsAnswered.value) {
      console.log("KORREKTARRAY", correctAnswersArray);
      console.log("FELARRAY", guessesArray);
    } else {
      if(props.currentQuiz === "capital"){
        console.log(correctAnswersArray)
      
      } else {
        postFlagResult(
          correctAnswersArray,
          guessesArray,
          quizGeneralStore.selectedRegion
        )
      }

      
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
  answerSubmitted.value = false;
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


  .capital-flag {
    width: 100%;
    height: 200px;
    
  }

  .country-flag {
    border: 2px solid black;
    width: 300px;
    height: 100%;

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
      height: 700px;
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
  font-size: 13px;
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

  .btn-color-practice {
  --button-color: #053B50;
}

.btn-color-correct-practice {
  --button-color: green;
}

.btn-color-wrong-practice {
  --button-color: red;
}

  


.questionText {
  color: white;
  font-weight: bold;
  font-size: 30px;
  margin: 2%;
}

@media (max-width: 768px) {
  .container {
    max-width: 100%;
    height: 100%;
    overflow: scroll;
    border: red;
  }
  .questionText {
    padding-top: 0%;
  }
  .btn {
    width: 150px;
    font-size: 16px;
    height: 55px;
    margin: 10px;
  }
}
  
   
 
    </style>