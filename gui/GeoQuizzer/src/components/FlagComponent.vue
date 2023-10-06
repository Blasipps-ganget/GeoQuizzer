<template>
    <body>
      <div class="container">
      <div class="question-number" id="question-number-area">Fråga 1</div>
      <div class="flag">
        <img :src="data.flagUrl" alt="Flag" style="width: 300px;
         height: 200px;" />
      </div>
  
      <div class="content" id="question-area">
        <div id="question-text"> Which country does the flag belongs to? </div>
      <div class="options">
        <button class="btn btn-option">{{ answerOne }}</button>
        <button class="btn btn-option">{{ answerTwo }}</button>
        <button class="btn btn-option">{{ answerThree }}</button>
        <button class="btn btn-option">{{ answerFour }}</button>
      </div>
      </div>
        </div>
    </body>
    </template>
    
    <script setup>
    import { onMounted, ref } from 'vue';
    import { fetchCountryFlag } from '../js/flagApi'
  
    const answerOne = ref ('Sverige')
    const answerTwo = ref ('Norge')
    const answerThree = ref ('Blåsippa')
    const answerFour = ref ('Uzbekistan')
    
    
    const data = ref({
  country: 'Sweden',
  flagUrl: '',
  wrongAnswers: ['Finland', 'Norway'],
});

onMounted(async () => {
  try {
    const flagUrl = await fetchCountryFlag(data.value.country);
    console.log('Flag URL:', flagUrl);
    data.value.flagUrl = flagUrl;
  } catch (error) {
    console.error(error);
  }
});
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
      width: 50vw;
      max-width: 80%;
      height: 85vh;
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

      font-size: large;
      font-weight: bold;
      box-shadow: 0 6px 12px -2px;
      font-size: 24px;
      border-radius: 15px;
      padding: 10px;
      margin: 5%;
      width: 200px;
      cursor: pointer; 
    }
    .btn:hover{
      color:green;
      padding: 12px;
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