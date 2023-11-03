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

      <div v-for="(comment, index) in comments" :key="index">
        <div class="commentItem">{{ comment.username + ": " + comment.comment }}</div>
      </div>

    </div>
    </div>
</template>

<style scoped>

.commentContent {

  margin-top: 10px;


}

.commentItem {

  margin-bottom: 10px;
  background-color: #EEEEEE;
  padding: 10px;
}
</style>