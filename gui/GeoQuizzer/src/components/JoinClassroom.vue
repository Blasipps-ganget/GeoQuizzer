<script setup>

import {defineProps, ref} from 'vue';
import ClassroomPopUp from "@/components/ClassroomPopUp.vue";
import { useRouter} from 'vue-router';


defineProps({

  open: {
    type:Boolean,
    required:true


  }


});

const declineInvitation = () => {

router.push('/');

}


const acceptInvitation = () => {


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
}

const isOpen = ref(true);
const router = useRouter();






</script>

<template>
    <div class="centerContent">

      <ClassroomPopUp :open="isOpen" @close ="isOpen = !isOpen" >

        <div class="popupContent">
          <h2 class="joinClassroom">You have received an invitation to join TestClassroom</h2>
          <p class="popupQuestion">Do you want to join?</p>
          <div class="chooseButton">
            <v-btn @click="acceptInvitation" class="popup-alt">Accept</v-btn>
            <v-btn @click="declineInvitation" class="popup-alt">Decline</v-btn>

            <!--            <v-btn @click="copyText" class="popup-copy">-->
            <!--              Copy-->
            <!--            </v-btn>-->
          </div>
        </div>
      </ClassroomPopUp>

    </div>
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