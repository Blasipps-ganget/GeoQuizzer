<script setup>


import {defineProps} from "vue";

defineProps({
  comments: {
    type: Array,
    required: true,

  }

});


</script>

<template>
<div class="centerContent">
    <div class="commentContent">

      <div v-for="(comment,index) in comments" :key="index">{{comment}}</div>

      <div class="commentButton">
          <v-btn>Delete</v-btn>
      </div>


    </div>
    </div>
</template>

<style scoped>

.commentContent {

  margin-top: 10px;
  background-color: #EEEEEE;
}

</style>