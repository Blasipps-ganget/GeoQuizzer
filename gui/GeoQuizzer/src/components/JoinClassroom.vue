<script setup>

import {defineProps, onMounted, ref} from 'vue';
import ClassroomPopUp from "@/components/ClassroomPopUp.vue";
import {useRoute, useRouter} from 'vue-router';
import HomeView from "@/views/HomeView.vue";
import {getName, handleToken} from "@/js/userApi";
const classroomEndpoint = "http://localhost:8080/classroom";


const isOpen = ref(true);
const router = useRouter();
const route = useRoute();

defineProps({

  open: {
    type:Boolean,
    required:true


  }


});

onMounted (() =>{
  console.log("HEJ")
})
const declineInvitation = () => {
router.push('/');
}


const acceptInvitation = async () => {
  const routes = route.fullPath
  console.log(routes);
  const name = getName()
  console.log(classroomEndpoint + routes +"/" +  name)
  fetch(classroomEndpoint + routes +"/" + name).then(r => {
    if(r)
      console.log(r)
  })
  /*
    const userName ='Tja';
    const classRoomName = 'TestClassroom';

    const data = { userName, classRoomName}

    fetch('http://localhost:8080/classroom/joinClassroomInvite', {
        method: 'POST',
        headers: {

          'Content-type': 'application/json',
        },
      body: JSON.stringify(data),

    })
        .then((response) => {

        if(response.ok) {

          console.log('Successfully joined the classroom')
          router.push('/classroom')
        } else {

          console.error('Failed to join')
        }

        })
        .catch((error) => {

      console.error('Error joining classroom', error)
    });
  */
}



</script>

<template>
    <home-view></home-view>
      <ClassroomPopUp :open="isOpen" @close ="isOpen = !isOpen" >

        <div class="popupContent">
          <h2 class="joinClassroom">Would you like to join {{ this.$route.params.name }}'s classroom?</h2>
          <p class="popupQuestion">Click to reply</p>
          <div class="chooseButton">
            <v-btn @click="acceptInvitation" class="popup-alt">Accept</v-btn>
            <v-btn @click="declineInvitation" class="popup-alt">Decline</v-btn>
          </div>
        </div>
      </ClassroomPopUp>

</template>


<style scoped>



.centerContent {


  margin-top: 30%;
}



.joinClassroom {

  color: #EEEEEE;
  margin-top: 0;
  text-align: center;
  margin-bottom: 20px;
}


.popupQuestion {


  color: #EEEEEE;
  margin-top: 0;
  text-align: center;
  font-weight: bolder;

}



.popup-alt {

  gap: 20px;
  margin-top: 35px;
  background-color: #053B50;
  color: #EEEEEE;
  display: flex;


}

.chooseButton {


  display: flex;
  justify-content: space-around;
}

.form input[type=text] {

  width: 100%;
  padding: 5px;
  margin: 8px;
  color: #EEEEEE;
  background-color: #053B50;
  border-radius: 5px;

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


.closeContainer {

  display: flex;
  justify-content: flex-end;
}

.closeIcon {

  margin:1px;
  cursor: pointer;
  font-size: 25px;
  color: #053B50;
}

.closeIcon:hover {


  opacity: 0.7;

}




.popup {

  position: fixed;
  top: 0;
  left: 0;
  right:0;
  bottom: 0;
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0,0,0, 0.5);


  .popup-inner {

    background: #176B87;
    padding: 20px;
    border-radius: 10px;
    border: 2px solid #053B50;
    height: 210px;
    width: 400px;

  }


}




</style>