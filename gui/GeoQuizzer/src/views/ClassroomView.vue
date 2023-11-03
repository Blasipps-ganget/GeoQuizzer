<script setup>

import ClassroomComponent from "@/components/ClassroomComponent.vue";
import {useGeneralStore} from "@/stores/general";



</script>

<template>
<div>
  <ClassroomComponent v-if="useGeneralStore().isLoggedIn"/>

</div>
</template>

<style scoped>

</style>