<script setup>

import {defineProps, onMounted, ref} from 'vue';
import ClassroomPopUp from "@/components/ClassroomPopUp.vue";
import {useRoute, useRouter} from 'vue-router';
import HomeView from "@/views/HomeView.vue";
import {getName} from "@/js/userApi";
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
  const name = getName()
  fetch(classroomEndpoint + routes + "/" + name).then(r => {
    if (r) {
      if (r.status === 200)
        router.push('/classroom');
    }
  })
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

</style>