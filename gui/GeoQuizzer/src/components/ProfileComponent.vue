<script setup>

import {defineProps} from 'vue';
import {RouterLink} from "vue-router";
import {removeStudent} from "@/js/classroomApi";

const emit = defineEmits(['removeStudent'])
defineProps({
      image: {
          type: String,
          required:true,
      },
        name: {
            type:String,
            required: true,
        },
        countries: {
            type: Number,
            required: true,
        },
        flags: {
        type: Number,
        required: true,
      },
      capitals: {
        type: Number,
        required: true,
      },
      owner:{
        type: Boolean,
        required: true,
      }
});
const removeFromClassRoom = (userName) =>{
    removeStudent(userName)
  console.log("emit")
    emit('removeStudent', userName)
}

</script>
<template>
        <div class="profile">
          <div class="studentInformation">
          <span class="studentName">Name: {{name}} </span>
            <div class="imgContent">
              <RouterLink to="/userProfile">
              <img class="studentImg" src="../assets/images/icons/user.png" alt="">
              </RouterLink>
            </div>
            <div class="studentContent">
            <div class="resultSection">
          <span>Best Result:</span>
            </div>
              <br>
          <div class="resultSection">
          <span class="countrySection">Countries: {{countries}}% </span>
            <span class="progressBar">
            <progress max="100" :value="countries"></progress>
              </span>
          </div>
              <div class="resultSection">
          <span>Flags: {{flags}}%</span> <br>
                <span class="progressBar">
                <progress max="100" :value="flags"></progress>
                  </span>
            </div>
            <div class="resultSection">
          <span>Capitals: {{capitals}}%</span> <br>
              <span class="progressBar">
              <progress max="100" :value="capitals"></progress>
              </span>
            </div>
          </div>
        </div>
          <div class="removeaStudent">
            <v-btn v-show="!owner" @click="removeFromClassRoom(name)"  class="btnClass">Remove a student</v-btn>
        </div>
        </div>

</template>

<style scoped>

.removeaStudent {
  display: flex;
  justify-content: center;
  align-items: baseline;
}

.btnClass {
  background-color: #053B50;
  color: #EEEEEE;
  font-weight: bolder;
  margin-right: 5px;
  margin-top:10px;
}

.imgContent {
  width: 100px;
  height: 90px;
  margin-top: 10px;
  margin-left: auto;
}

.studentImg {
  height: 90px;
  width: 90px;
  border: 5px solid white;
  border-radius: 200px;
  padding: 10px;
}

.profile {
  border: 3px solid #053B50;
  padding: 10px;
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  background-color: #176B87;
  border-radius: 5px;
}

.studentName {
  margin-top: 30px;
}

.studentInformation {
  color: #EEEEEE;
  font-size: large;
  font-weight: bold;
  gap: 1px;
  align-items: baseline;
  display:grid;
  grid-template-columns: 280px;
  grid-template-rows: 1px;
}

.studentContent {
  gap: 1px;
  margin-top: 1px;
  display: flex;
  flex-direction: column;
}

.resultSection {
  margin-bottom: 1px;
}
</style>