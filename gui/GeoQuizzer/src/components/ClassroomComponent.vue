<script setup>

import ProfileComponent from "@/components/ProfileComponent.vue";
import ClassroomPopUp from "@/components/ClassroomPopUp.vue";
import {library} from '@fortawesome/fontawesome-svg-core';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {getInviteLink} from '../js/classroomApi';
import {getClassroomData} from '../js/classroomApi';

import {onMounted, ref} from 'vue';
library.add(faPlus);

const students = ref([]);
const inviteLink = ref('');
const showButtonContent = ref(true);
const isOpen = ref(false);
const isClicked = ref(false);


onMounted(async () => {
  try {
    students.value = await getClassroomData();
    inviteLink.value = await getInviteLink();

  } catch (err) {
    console.error('Error fetching invitelink', err)
  }
});

const createClassAndOpen = async () => {
  isOpen.value = true;
}

function copyText() {
  const textField = document.getElementById('textField')
  textField.select();
  navigator.clipboard.writeText(textField.value);
  isClicked.value = true;
}
const removeStudent =(userName) =>{
  console.log("REMOVING")
  students.value.students = students.value.students.filter(student => !(userName === student.username))
}

</script>
<template>

  <div class="classroomContainer">
    <div class="headerSection">
      <h1 class="classroomTitle">Welcome to {{students.owner}}'s classroom!</h1>
      <h2 class="studentTitle">Students</h2>
    </div>
      <ClassroomPopUp :open="isOpen" @close="isOpen = !isOpen">
        <div class="popupContent">
          <h2 class="createClassroom">Invite-link</h2>
          <p class="classText">Send the link to someone you want to join your classroom!</p>
          <div class="form">
            <input type="text" id="textField" :value="inviteLink" disabled>
          </div>
          <div class="copyButton">
            <v-btn @click="copyText" :class="{'green-button': isClicked, 'popup-copy': true}">Copy</v-btn>
          </div>
        </div>
      </ClassroomPopUp>
    <div class="classroomContent" v-if="students.length === 0">
    </div>
    <div v-else>
      <div class="row">
        <div v-for="(student,index) in students.students" :key="index">
          <ProfileComponent
              :image="student.image"
              :name="student.username"
              :countries="student.totalCountry"
              :flags="student.totalFlag"
              :capitals="student.totalCapital"
              :owner="student.username === students.owner"
              @remove-student = "removeStudent"
          />
        </div>
      </div>
      <div class="buttonContent" v-if="showButtonContent">
        <v-btn @click="createClassAndOpen" class="createClassroomButton" size="small" density="default" rounded="l">Get
          invite link
        </v-btn>


      </div>

    </div>

  </div>
</template>

<style scoped>
.green-button {
  background-color: green;
}
.form {
  justify-content: center;
  display: flex;
}

.classText {
  font-size: large;
  font-weight: bolder;
  color: #EEEEEE;
  text-align: center;
}

.form input[type=text] {
  width: 85%;
  padding: 5px;
  margin: 8px;
  color: #EEEEEE;
  background-color: #053B50;
  border-radius: 5px;
  display: flex;
}

.copyButton {
  display: flex;
  justify-content: space-around;
  margin-top: 5px;
}

.popup-copy {
  width: 50%;
  background-color: #053B50;
  color: #EEEEEE;
  display: flex;
}

.form {

}

.createClassroom {
  color: #EEEEEE;
  margin-top: 0;
  text-align: center;
}

.buttonContent {
  align-content: center;
  justify-content: center;
  text-align: center;
  display: flex;

}

.row {
  display: flex;
  justify-content: space-around;
  gap: 20px;
}

.createClassroomButton {
  background-color: #053B50;
  color: #EEEEEE;
  font-weight: bolder;
  height: 35px;
  margin-top: 50px;
}

.headerSection {
  flex-direction: column;
  display: flex;
}

.classroomContainer {
  margin-top: 50px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.classroomContent {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.classroomTitle {
  color: #053B50;
}

.studentTitle {
  color: #053B50;
  margin-top: 50px;
  text-align: center;
}
@media (max-width: 500px)
{
  .headerSection{
    text-align: center;
  }
  .row{
    display: grid;
  }
}
</style>