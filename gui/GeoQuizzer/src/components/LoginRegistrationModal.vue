<script setup>

import {ref} from "vue";

const valid = ref(false);
const firstname = ref('');
const email = ref('');

const nameRules = [
  (value) => {
    if (value) return true;
    return 'Name is required.';
  },
  (value) => {
    if (value?.length <= 10) return true;
    return 'Name must be less than 10 characters.';
  },
  (value) =>{
   if(/^[A-Za-z0-9!?\s]+$/.test(value)) return true;
   return 'Username must contains only characters, numbers or ! and ?'
  }
];

const emailRules = [
  (value) => {
    if (value) return true;
    return 'E-mail is required.';
  },
  (value) => {
    if (/.+@.+\..+/.test(value)) return true;
    return 'E-mail must be valid.';
  },
];
</script>

<template>
<div class="modal-mask">
  <div class="modal-wrapper">
    <div class="modal-content">
      <form class="loginForm">
        <p class="loginText">Please log in before quizzing</p>
        <v-text-field
            v-model="firstname"
            :rules="nameRules"
            :counter="10"
            label="Username"
            required
            hide-details
        ></v-text-field>
        <v-text-field
            v-model="email"
            :rules="emailRules"
            :counter="10"
            label="Email Address"
            hide-details
            required
        ></v-text-field>
      </form>
      <v-card-text class="showRegister" @click="console.log('Nej')">Don't have an account? no worries king sign up here</v-card-text>
      <div class="btn">
      <v-btn class="loginBtn">Login</v-btn>
      </div>
    </div>
  </div>
</div>

</template>

<style scoped>
.modal-mask{
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
.modal-wrapper{
  display: table-cell;
  vertical-align: middle;

}
.modal-content{
  height: 400px;
  width: 350px;
  margin: auto;
  padding: 20px 20px;
  border-radius: 5px;
  background-color: white;
  display: grid;
}
.loginText{
  text-align: center

}

.showRegister {
  color: black;
  margin: 0 -.25rem;
  padding: 0 .25rem;
  text-align: center;
  align-self: top;
}
.showRegister:hover {
  color: blue;
  text-decoration: underline;
  cursor: pointer;
}
.loginForm{
  display: grid;
}

.loginBtn{
  width: 100px;
}
.btn{
  display: grid;
  justify-items: center;
  height: 50px;
}
</style>