<script setup>
import {ref} from "vue";

const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const password = ref('');
const email = ref('');
const name = ref('');
const validEmail = ref(false);
const validName = ref(false);
const validPassword = ref(false);
const showPassword = ref(false);

const validate = () => {
  console.log(email.value);
}

const nameRules = [
  () => {
    validName.value = false;
  },
  (value) => {
    if (value) return true;
    return 'Name is required.';
  },
  (value) => {
    if (value?.length <= 10) return true;
    return 'Name must be less than 10 characters.';
  },
  (value) => {
    if (/^[A-Za-z0-9!?\s]+$/.test(value)) return true;
    return 'Username must contains only characters, numbers or ! and ?'
  },
  () => {
    validName.value = true;
  }
];


const emailRules = [
  () => {
    validEmail.value = false;
  },
  (value) => {
    if (value) return true;
    return 'E-mail is required.';
  },
  (value) => {
    if (emailRegex.test(value)) return true;
    return 'E-mail must be valid.';
  },
  () => {
    validEmail.value = true;
  }
];
const passwordRules = [
  () => {
   validPassword.value = false;
  },
  (value) => {
    if(value) return true;
    return 'Passsword is required.';
},
  (value) => {
    if (!passwordRegex.test(value)) return true;
    return 'invalid password'
  },
  () =>{
  validPassword.value = true;
  }]

</script>

<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-content">
        <form class="loginForm" @submit.prevent>
          <p class="loginText">Please log in before quizzing</p>
          <v-text-field
              v-model="name"
              :rules="nameRules"
              :counter="10"
              label="Username"
              hide-details
              required
          ></v-text-field>
          <v-text-field
              v-model="password"
              :rules="passwordRules"
              :counter="10"
              :type="showPassword ?'text' : 'password'"
              :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              label="password"
              required
              @click:append-inner="showPassword = !showPassword"
              hide-details
          ></v-text-field>
          <v-btn :disabled="!(validEmail && validPassword)"
                 class="loginBtn"
                 size="large"
                 color="#053B50"
                 variant="elevated"
                 type="submit"
                 @click="validate()"
          >Log in
          </v-btn>
        </form>
        <v-card-text class="showRegister" @click="console.log(validName)">Don't have an account? no worries king sign up
          here
        </v-card-text>
      </div>
    </div>
  </div>

</template>

<style scoped>
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
  height: 400px;
  width: 350px;
  margin: auto;
  padding: 20px 20px;
  border-radius: 5px;
  background-color: #F5F0F6;
  display: grid;
}

.loginText {
  text-align: center

}

.showRegister {
  color: black;
  margin: 0 -.25rem;
  padding: 0 .25rem;
  text-align: center;
  align-self: auto;
}

.showRegister:hover {
  color: blue;
  text-decoration: underline;
  cursor: pointer;
}

.loginForm {
  display: grid;
}

.loginBtn {
  width: 100px;
}

.loginBtn {
  display: grid;
  justify-self: center;
  color: #053B50;

}
</style>