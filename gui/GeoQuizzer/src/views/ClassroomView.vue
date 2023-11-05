<script setup>

import ClassroomComponent from "@/components/ClassroomComponent.vue";
import {useGeneralStore} from "@/stores/general";

</script>
<template>
  <div>
    <ClassroomComponent v-if="useGeneralStore().isLoggedIn"/>
    <h1 v-else>Please login to enter a classroom</h1>
  </div>
</template>

<style scoped>
h1 {
  color: #053B50;
  margin-top: 30px;
  text-align: center;
}

@media (max-width: 768px) {
  h1 {
    font-size: 16px;
  }
}

</style>