
<template>
  <body>
    <div class="container">
      <div class="question-number" id="question-number-area"> Fråga {{ questionNumber }}</div>
      <div class="flag">
        <img :src="data.flagUrl" alt="Flag" style="width: 300px; height: 200px;" />
      </div>

      <div class="content" id="question-area">
        <div id="question-text"> Which country does the flag belong to? </div>
        <div class="options">
          <button class="btn btn-option" @click="checkAnswer(answerOne)">{{ answerOne }}</button>
          <button class="btn btn-option" @click="checkAnswer(answerTwo)">{{ answerTwo }}</button>
          <button class="btn btn-option" @click="checkAnswer(answerThree)">{{ answerThree }}</button>
          <button class="btn btn-option" @click="checkAnswer(answerFour)">{{ answerFour }}</button>
        </div>
        <div v-if="showMessage">
          <p>{{ message }}</p>
          <div v-if="questionsAnswered >= 10">
            <p>Quiz completed! Your final score is: {{ totalScore }}</p>
          </div>
        </div>
        <button class="btn btn-option" @click="nextQuestion" v-if="showMessage && questionsAnswered < 10">Next Question</button>
        </div>
        <button class="btn btn-option" @click="TryAgain" v-if="questionsAnswered > 9"> Try again</button>
      </div>
  </body>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { fetchCountryFlag } from '../js/flagApi';

const data = ref({
  country: '',
  flagUrl: '',
  wrongAnswers: [''],
});

const correctAnswer = ref(false); 
const questionsAnswered = ref(0);
const totalScore = ref(0);
let correctCountry = ref('')
const showMessage = ref(false); 
let message = ref ('');
let questionNumber = ref(0);

const generateRandomAnswers = async () => {
  questionNumber.value += 1;
  try {
    const response = await fetchCountryFlag(data.value.country);
    data.value.flagUrl = response.flagurl;
    data.value.country = response.land;
    data.value.wrongAnswers = response.felsvar;

    shuffleArray(data.value.wrongAnswers);
    correctCountry.value = response;


    answerOne.value = data.value.country;
    answerTwo.value = data.value.wrongAnswers[0];
    answerThree.value = data.value.wrongAnswers[1];
    answerFour.value = data.value.wrongAnswers[2];
    console.log("flaggUrl: " + data.value.flagUrl)
    console.log("Fel länder : " + data.value.wrongAnswers)
    console.log("Korrekt land : " + data.value.country)
  } catch (error) {
    console.error(error);
  }
};

onMounted(async () => {
  await generateRandomAnswers();
});

const answerOne = ref('');
const answerTwo = ref('');
const answerThree = ref('');
const answerFour = ref('');

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const nextQuestion = async () => {
  showMessage.value = false;
  if(questionsAnswered.value < 10){
  await generateRandomAnswers();
  }
};


const checkAnswer =  async (selectedAnswer) => {
  showMessage.value = true;
  if (selectedAnswer === correctCountry.value.land) {
    correctAnswer.value = true; 
    message.value = 'Rätt svar'
    if (questionsAnswered.value < 10) {
      totalScore.value += 1;
    }
    console.log('Correct!');
  } else {
    message.value = `FEL, rätt svar är: ${correctCountry.value.land}`;
    console.log('Incorrect!');
  }
  questionsAnswered.value += 1;
  if (questionsAnswered.value >= 10) {
    showMessage.value = true;
  } 
};
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap');

    * {
      margin: 0;
      padding: 0;
      font-family: 'Poppins', sans-serif;
    }
    body {
      height: 100vh;
      width: 200vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .container {
      width: 60vw;
      max-width: 80%;
      height: 90vh;
      box-shadow: 0 0 5px 4px;
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
      padding: 5px;
    }

 
.btn {
  font-size: 20px;
  font-weight: 700;
  color: #fff;
  text-decoration: none;
  background-color: #176B87;
  height: 60px;
  line-height: 60px;
  text-align: center;
  width: 200px;
  padding: 0;
  position: relative;
  margin: 5%;
  overflow: hidden;
  border-radius: 10px;
  margin-top: 20px;
 
}
      .btn::after, button::before{
        content: '';
        background-color: #03d31f;
        height: 50%;
        width: 0;
        position: absolute;
        transition: 0.3s cubic-bezier(.785, .135, .15, .86);
        -webkit-transition: 0.3s cubic-bezier(.785, .135, .15, .86);
        z-index: -1;
      }

      .btn:hover::before{
        width: 100%;
        right: 0;
        left: auto;
      }

      .btn::before{
        top: 0;
        left: 0;
        right: auto;
      }

      .btn:hover::after{
        width: 100%;
        left: 0;
        right: auto;
      }
      .btn::after{
        bottom: 0;
        right: 0;
        left: auto;
      }



    .hide {
      display: none;
    }
    .question-number {
      font-size: 24px;
    }
    .question-text {
      font-size: 24px;
    }
   
  
    </style>
      
