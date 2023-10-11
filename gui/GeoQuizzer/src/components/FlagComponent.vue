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
      height: 70vh;
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
      