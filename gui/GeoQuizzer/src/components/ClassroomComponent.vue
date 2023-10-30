<script setup>

import ProfileComponent from "@/components/ProfileComponent.vue";
import ClassroomPopUp from "@/components/ClassroomPopUp.vue";
import {library} from '@fortawesome/fontawesome-svg-core';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {getInviteLink} from '../js/classroomApi';
import {getClassroomData} from '../js/classroomApi';

import {onMounted, reactive, ref} from 'vue';
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";



library.add(faPlus);

const students = reactive([

  {
    image: '../assets/images/icons/user.png',
    name:'Anton1',
    countries: 0,
    flags: 0,
    capitals: 0

  },
  {
    image: '../assets/images/icons/user.png',
    name:'Anton2',
    countries: 20,
    flags: 20,
    capitals: 20

  },
  {
    image: '../assets/images/icons/user.png',
    name:'Anton3',
    countries: 20,
    flags: 20,
    capitals: 20

  },
  {
    image: '../assets/images/icons/user.png',
    name:'Anton4',
    countries: 20,
    flags: 20,
    capitals: 20

  },
  {
    image: '../assets/images/icons/user.png',
    name:'Anton5',
    countries: 20,
    flags: 20,
    capitals: 20

  },
  {
    image: '../assets/images/icons/user.png',
    name:'Anton6',
    countries: 20,
    flags: 20,
    capitals: 20

  },


 ]);

const inviteLink = ref('');

const nameToRemove = ref('');

const nameToAdd = ref('');

const showButtonContent = ref(true);

const isOpen = ref(false);

const isClicked = ref(false);

const toggleButtonContent = () => {

  isOpen.value = !isOpen.value;

}

onMounted(async () => {


  try {


   inviteLink.value = await getInviteLink();
    //await getClassroomData();

  } catch (err) {
    console.error('Error fetching invitelink', err)

  }




});

//
// const classroomName = ref('MyNewClassroom');
// function createClass() {
//
//   const data = { classroomName: classroomName.value}
//
//   createClassroomData(data)
//       .then(response => {
//
//     console.log(response);
//
//       })
//       .catch(error => {
//
//         console.error('Error creating Classroom:', error)
//
//       })
//
//
// }

// onMounted(fetchUserData);
async function fetchUserData() {

  try {

    const response = await fetch('https://localhost:8080/user/');
    const data = await response.json();
    this.students = data;


  }  catch (error) {

        console.error('Error fetching user data:', error)
  }

}
// async function removeStudent() {
//
//   // try {
//   //
//   //   const response = await fetch(`https://localhost:8080/user/${nameToRemove.value}`, {
//   //     method: 'DELETE',
//   //
//   //   });
//   //
//   //   if(response.ok) {
//
//   const index = students.findIndex((student) => student.name === nameToRemove.value);
//   if (index !== -1) {
//
//     students.splice(index, 1)
//     //     }
//     //
//     //   }
//     // } catch (error) {
//     //
//     //   console.error('Error removing student', error)
//     // }
//
//   }
//
// }


const removeStudent = (index) => {

    if(index !== -1) {

      students.splice(index,1);
    }



};
async function addStudent() {

  // try {
  //
  //     const response = await fetch('https://localhost:8080/user/', {
  //       method: 'POST',
  //       headers: {
  //
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify(student),
  //     });
  //
  //     if (response.ok) {
  //
  //
  //       students.push(student);
  //
  //     } else {
  //
  //       console.error('Failed to add')
  //     }
  //
  //
  //   } catch (error) {
  //
  //   console.error('Error Adding Student', error)
  //
  // }


  const student = {

    name: nameToAdd.value

  };

  const index = {

    image: '',
    name:student.name

  };

  students.push(index);
  nameToAdd.value = '';


}

async function  addStudentToClassroom(studentName, classroomName) {

  try {
    const response = await fetch(`http://localhost:8080/user/${studentName}`, {
    method: 'GET',
    headers: {

        'Content-Type': 'application/json'
    }

  });

  if (response.ok) {

      const student = await response;

      const classroomResponse = await fetch(`http://localhost:8080/classroom/${classroomName}/addStudent`, {
        method: 'POST',
        headers: {

          'Content-Type': 'application/json'
        },
        body: JSON.stringify(student)

      });

      if(classroomResponse.ok) {

          console.log('Student added')
      } else {

        console.log('Failed to add student')
      }
  }

  }  catch(error) {


    console.error('Error adding student', error);

  }


}


const createClassAndOpen = async () => {



  isOpen.value = true;

}

const pressButtonForm = async () => {

  await toggleButtonContent();
  await addStudent();
  isOpen.value = true;


}
function copyText() {

  const textField = document.getElementById('textField')

  textField.select();
  navigator.clipboard.writeText(textField.value);

  isClicked.value =true;
  //alert("Copied " + textField.value)

}


</script>

<template>
  <div class="classroomContainer">
    <div class="headerSection">
      <h1 class="classroomTitle">Classroom</h1>

            <h2 class="studentTitle">Students</h2>
    </div>

    <div class="classroomContent" v-if="students.length === 1">

      <v-btn @click="createClassAndOpen" class="createClassroomButton" size="small" density="default" rounded="l">Get invitelink</v-btn>
      <ClassroomPopUp :open="isOpen" @close ="isOpen = !isOpen" >

        <div class="popupContent">
        <h2 class="createClassroom">Invitelink</h2>
          <p class="classText">Do you want to invite students? I got you! Below is your unique invitelink</p>
          <div class="form">
            <input type="text" id="textField" :value="inviteLink" disabled>
          </div>
          <div class="copyButton">
            <v-btn @click="copyText" :class="{'green-button': isClicked, 'popup-copy': true}">Copy</v-btn>
          </div>
        </div>
      </ClassroomPopUp>

    </div>

    <div v-else>
    <div class="row">
      <div v-for="(student,index) in students" :key="index">

      <ProfileComponent
          :image="student.image"
          :name="student.name"
          :countries="student.countries"
          :flags="student.flags"
          :capitals="student.capitals"
          @click="removeStudent"

          />
    </div>

      </div>

      <div class="buttonContent" v-if="showButtonContent">
      <v-btn class="btnClass" @click="pressButtonForm">Add a student</v-btn>
        <font-awesome-icon class="fa-plus" :icon="['fas', 'plus']" size="xl" @click="toggleButtonContent"/>
        <input class="buttonInput" type="text" v-model="nameToAdd" v-if="isOpen" >

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
.fa-plus {

  display: flex;
  margin-top: 15px;
  color: #053B50;
  cursor: pointer;

}

.fa-plus:hover {

  opacity: 0.7;

}

.fa-minus {

  font-size: 25px;
  color: #053B50;
  cursor: pointer;
  margin-top: 15px;

}

.fa-minus:hover {

  opacity: 0.7;
}

.removeStudentForm {

  width: 50%;
  display: flex;


}

.classText {


  font-size: large;
  font-weight: bolder;
  color: #EEEEEE;

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

.btnClass {

  background-color: #053B50;
  color: #EEEEEE;
  font-weight: bolder;
  margin-right: 5px;
  margin-top:10px;


}

.row {

  display:flex;
  justify-content: space-around;
  gap: 20px;

}
.plusIcon {

  color: #053B50;
  display: flex;
  margin-right: auto;
  margin-top: 100px;


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
  //display: grid;
  //gap: 50px;
  //grid-template-columns: 267px 267px 267px;
  //grid-template-rows: 250px;
  margin-top: 120px;
  gap: 10px;



}
.classroomTitle {
  color: #053B50;

}

.studentTitle {

  color: #053B50;
  margin-top: 50px;
  text-align: center;


}

.profilePicture {

  max-width: 100%;
  max-height: 100%;


}

.profilePictureEdit {

  border: 2px solid white;
  border-radius: 50px;
  height: 100px;
  width: 100px;
  padding: 5px;


}

.studentName {

  margin-bottom: 10px;
}

.removeaStudent {

  display: flex;
  margin-left: 10px;


}


.buttonInput {

    border: 3px solid #053B50;
    background-color: #EEEEEE;
    height: 35px;
    width: 100px;
    margin-top: auto;
    margin-left: 5px;
    border-radius: 5px;



}
</style>