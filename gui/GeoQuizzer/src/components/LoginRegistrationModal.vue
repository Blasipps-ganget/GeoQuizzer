<script setup>
import {ref} from "vue";
import {login, signUpRest} from "@/js/userApi";
import {useGeneralStore} from '../stores/general.js';
const generalStore = useGeneralStore()

const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
// const loginOption = ref(true)
const name = ref('');
const email = ref('');
const password = ref('');
const password2 = ref('');

const loginName = ref('');
const loginPassword = ref('');
const showLoginPassword = ref('');

const showPassword = ref(false);
const showPassword2 = ref(false);

const validEmail = ref(false);
const validName = ref(false);
const validPassword = ref(false);

const validate = async () => {
  const user = {
    username: loginName.value,
    password: loginPassword.value
  }
  generalStore.loggedInUser = await login(user)
  if(!(generalStore.loggedInUser === 'login')){
    generalStore.showLoginModal = false;
  }
}
const signUp = async () => {
  const regUser = {
    username: name,
    email: email,
    firstPass: password,
    secondPass: password2
  }
  generalStore.loggedInUser = await signUpRest(regUser)
  if(!(generalStore.loggedInUser === 'login')){
    generalStore.showLoginModal = false;
  }
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
    if (value) return true;
    return 'Passsword is required.';
  },
  (value) => {
    if (!passwordRegex.test(value)) return true;
    return 'invalid password'
  },
  () => {
    if (password.value) {
      if (password.value === password2.value) return true;
      return "Passwords must match.";
    }
  },
  () => {
    validPassword.value = true;
  }
]
</script>

<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-content">
        <button @click="generalStore.showLoginModal = false"><img class="x-icon"
                                                                  src="../assets/images/icons/x-icon.png"></button>
        <div v-if="generalStore.loginOption" class="loginForm">
          <v-form @submit.prevent>
            <p class="loginText">Please log in before quizzing</p>
            <v-text-field
                v-model="loginName"
                :rules="nameRules"
                :counter="10"
                label="Username"
                hide-details
                required
            ></v-text-field>
            <v-text-field
                v-model="loginPassword"
                :rules="passwordRules"
                :counter="10"
                :type="showLoginPassword ? 'text' : 'password'"
                :append-inner-icon="showLoginPassword ? 'mdi-eye' : 'mdi-eye-off'"
                label="password"
                required
                @click:append-inner="showLoginPassword = !showLoginPassword"
                hide-details
            ></v-text-field>
          </v-form>
          <v-btn :disabled="!(validName && validPassword)"
                 class="loginBtn"
                 size="large"
                 color="#053B50"
                 variant="elevated"
                 type="submit"
                 @click="validate()"
          >Log in
          </v-btn>
        </div>
        <div v-else class="loginForm">
          <p class="loginText">Enter your credentials to sign up</p>
          <v-form>
            <v-text-field
                v-model="name"
                label="Enter username"
                :rules="nameRules"
                required
            ></v-text-field>

            <v-text-field
                v-model="email"
                label="Enter email address"
                :rules="emailRules"
                required
            ></v-text-field>

            <v-text-field
                v-model="password"
                label="Enter password"
                :rules="passwordRules"
                :type="showPassword ? 'text' : 'password'"
                :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append-inner="showPassword = !showPassword"
                required
            ></v-text-field>

            <v-text-field
                v-model="password2"
                label="Enter password again"
                :rules="passwordRules"
                :type="showPassword2 ? 'text' : 'password'"
                :append-inner-icon="showPassword2 ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append-inner="showPassword2 = !showPassword2"
                required
            ></v-text-field>

          </v-form>
          <v-btn
              class="signupbtn"
              size="large"
              color="#053B50"
              variant="elevated"
              type="submit"
              @click="signUp()"
          >Sign up
          </v-btn>

        </div>
        <v-card-text v-if="generalStore.loginOption"
                     class="showRegister"
                     @click="generalStore.loginOption = !generalStore.loginOption">
          Don't have an account? Sign up here
        </v-card-text>
        <v-card-text v-else class="showRegister" @click="generalStore.loginOption = !generalStore.loginOption">
          Already have an account? Click here to login
        </v-card-text>
      </div>
    </div>
  </div>
</template>

<style scoped>

.x-icon {
  width: 20px;
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
  height: 500px;
  width: 350px;
  margin: auto;
  padding: 20px 20px;
  border-radius: 5px;
  background-color: #F5F0F6;
  display: grid;
}

.loginText {
  text-align: center;
  padding: 5px

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
  border-radius: 15px;
}

.signupbtn {
  border-radius: 15px;
}
</style>