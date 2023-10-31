<script setup>



import CommentList from "@/components/ProfilePage/CommentList.vue";
import {ref} from "vue";
import {rules} from "eslint-plugin-vue";

const comments = ref([]);
const newComment = ref('');

const submitComment = () => {



    comments.value.push(newComment.value);
    newComment.value = '';




}

</script>

<template>
<div class="userContainer">
  <div class="userContent">

    <div class="centerProfile">
    <div class="profileContent">
      <div class="imgContent">
    <img class="userPicture" src="../assets/images/icons/user.png" alt="">
      </div>
      <h2 class="profileName">Name: Göran5</h2>
    </div>
    </div>
    <div class="resultContent">
     <h2 class="statisticName">Statistics:</h2>

      <div class="resultItem">
      <img class="imgIcon" src="/src/assets/images/icons/planet-earth.png" alt="">
      <h3 class="quizName">Countries:</h3>

        <span class="continent">Europe: </span>
        <span class="continent">America: </span>
        <span class="continent">Asia: </span>
        <span class="continent">Oceania: </span>
        <span class="continent">Africa: </span>
      </div>



      <div class="resultItem">
      <img class="imgIcon" src="/src/assets/images/icons/flag.png" alt="">
      <h3 class="quizName">Flags:</h3>

        <span class="continent">Europe: </span>
        <span class="continent">America: </span>
        <span class="continent">Asia: </span>
        <span class="continent">Oceania: </span>
        <span class="continent">Africa: </span>
      </div>



      <div class="resultItem">
      <img class="imgIcon"  src="/src/assets/images/icons/capitals.png" alt="">
      <img src="" alt="">
      <h3 class="quizName">Capitals:</h3>

        <span class="continent">Europe: </span>
        <span class="continent">America: </span>
        <span class="continent">Asia: </span>
        <span class="continent">Oceania: </span>
        <span class="continent">Africa: </span>
      </div>
    </div>
<!--    <div class="comment-section">-->
<!--      <h2 class="commentName">Comments:</h2>-->

<!--        <v-sheet width="300" class="mx-auto">-->
<!--          <v-form class="formBox" @submit.prevent>-->
<!--            <v-text-field-->
<!--                v-model="firstName"-->
<!--                :rules="rules"-->
<!--                label="Comment"-->
<!--            ></v-text-field>-->
<!--            <v-btn type="submit" block class="mt-2">Submit</v-btn>-->
<!--          </v-form>-->
<!--        </v-sheet>-->
<!--    </div>-->




  </div>
  <div class="comment-section">
<!--  <AddComment @updateComments="updateComments"/>-->
    <div class="comment-section">
      <h2 class="commentName">Leave a comment:</h2>

      <v-sheet width="300" class="mx-auto">
        <v-form class="formBox" @submit.prevent="submitComment">
          <v-text-field
              v-model="newComment"
              label="Comment"
              :rules="[rules.required]"
          ></v-text-field>
          <v-btn type="submit" block class="mt-2">Submit</v-btn>
        </v-form>
      </v-sheet>

    </div>


    <div class="commentsList">
      <h3 class="commentsAmount">Comments({{comments.length}})</h3>


      </div>
     <CommentList :comments="comments"/>
    </div>
  </div>


</template>

<style scoped>

.commentsAmount {

}


.commentsList {

margin-top: 20px;
  display: flex;
  margin-left: 20px;
  flex-direction: column;

}

.continent {

  margin-right: 5px;
  font-size: large;
}

.resultItem {

  margin-top: 20px;
}

.imgIcon {


  height: 20px;
  width: 20px;
}
.centerProfile {



}
.resultContent {

  margin-top: 60px;
  padding: 20px;
  border-radius: 10px;
  background-color: #176B87;

}

.userContainer {


  display: flex;
  justify-content: center;



}
.userContent {

  padding: 40px;
  margin-top: 20px;
  border-radius: 10px;
  background-color: #EEEEEE;
  color: #EEEEEE;



}

.profileName {

  text-align: center;
  margin-top: 30px;
}
.statisticName {

  margin-bottom: 0px;
}

.quizName {



}

.commentName {

  margin-top: 10px;
}

.formBox {

  margin-top: 10px;
}

.imgContent {

  display: flex;
  justify-content: center;



}

.profileContent {


  border: 2px solid  #053B50;
  padding: 20px;
  margin: -40px;
  border-radius: 10px;

  background-color: #053B50;

}
.userPicture {

  height: 100px;
  width: 100px;
  border: 5px solid white;
  border-radius: 200px;


  padding: 10px;
}

.comment-section {

  //background-color: #176B87;
  //padding: 10px;
  margin-top: 20px;
  border-radius: 10px;
  margin-left: 20px;

}

</style>