<template>
    <body>
      <div class="container">
        <div class="questionText" v-if="questionsAnswered <10" id="question-text"> Which country does this capital belong to? <br> <br> {{ capitalName }}  </div>
        <div class="capital" v-if="questionsAnswered < 10">
        <img :src="data.flagUrl" alt="Capital" />
        </div>
        <div class="content" id="question-area">
          <div id="answer-btns" class="btn-grid">
            <button class="btn btn-option" @click="checkAnswer(answerOne)" v-if="questionsAnswered < 10">{{ answerOne }}</button>
            <button class="btn btn-option" @click="checkAnswer(answerTwo)" v-if="questionsAnswered < 10">{{ answerTwo }}</button>
            <button class="btn btn-option" @click="checkAnswer(answerThree)" v-if="questionsAnswered < 10">{{ answerThree }}</button>
            <button class="btn btn-option" @click="checkAnswer(answerFour)" v-if="questionsAnswered < 10">{{ answerFour }}</button>
          </div>
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
  import { fetchCapital } from '../js/capitalApi';
  
  
  const data = ref({
    capital: '',
    country: '',
    flagUrl: '',
    wrongAnswers: [''],
  });
  
  
  const correctAnswer = ref(false); 
  const questionsAnswered = ref(0);
  const totalScore = ref(0);
  const showMessage = ref(false); 
  let correctCountry = ref('');
  let message = ref ('');
  
  const generateRandomAnswers = async () => {
    showMessage.value = true;
    try {
      const response = await fetchCapital();
      data.value.capital = response.capital[0];
      data.value.country = response.land;
      data.value.wrongAnswers = response.felsvar;
      data.value.flagUrl = response.flagurl;

  
      shuffleArray(data.value.wrongAnswers);
      correctCountry.value = response;
      const answers = [data.value.country, ...data.value.wrongAnswers];
      shuffleArray(answers);
  
  
      answerOne.value = answers[0];
      answerTwo.value = answers[1];
      answerThree.value =  answers[2];
      answerFour.value = answers[3];
      capitalName.value = data.value.capital;

      console.log("Capital: " + data.value.capital)
      console.log("CapitalUrl: " + data.value.flagUrl)
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
  const capitalName = ref('');
  
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };
  
  const resetQuiz = async () => {
    showMessage.value = false;
    questionsAnswered.value = 0;
    totalScore.value = 0;
    await generateRandomAnswers;
  }
  
  const homeButton = async () => {
    window.location.href='/';
  }
  
  
  // Validering av svar
  const checkAnswer =  async (selectedAnswer) => {
    showMessage.value = true;
    if (selectedAnswer === correctCountry.value.country) {
      correctAnswer.value = true; 
     // message.value = 'Correct'
      if (questionsAnswered.value < 10) {
        totalScore.value += 1;
      }
      console.log('Correct!');
    } else {
     // message.value = `Incorrect, the correct answer is: ${correctCountry.value.land}`;
      console.log('Incorrect!');
    }
    questionsAnswered.value += 1;
    if (questionsAnswered.value >= 10) {
      showMessage.value = true;
    } 
  
    await generateRandomAnswers();
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
    font-size: 18px;
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
  
        .btn::after, .btn::before{
          content: '';
          background-color: #64CCC5 ;
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
        