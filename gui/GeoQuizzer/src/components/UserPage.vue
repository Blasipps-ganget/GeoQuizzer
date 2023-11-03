<script setup>



import CommentList from "@/components/CommentList.vue";
import {ref, onMounted, computed, watch} from "vue";
import {useRouter, useRoute} from "vue-router";
import {useGeneralStore} from "@/stores/general";
import {handleToken} from "@/js/userApi";
import {getName, isLoggedIn} from "@/js/userApi";

const route = useRoute();
const router = useRouter();
const generalStore = useGeneralStore();

const userName = computed(() => route.params.userId);
const comments = ref([]);
const newComment = ref('');






const submitComment = async () => {

    if (!newComment.value) return;

    const commentValue = `${userName.value}: ${newComment.value}`;





   // comments.value.push(newComment.value);
    comments.value.push(commentValue);


     await createComment();
  newComment.value = '';

    await fetchUserData();
  //  newComment.value = '';
}

async function getResults(quiztype) {
  const accessToken = await handleToken();
  console.log(accessToken)
  return fetch(`http://localhost:8080/highscores/?name=${userName.value}&quiz=${quiztype}`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    },
    method: 'GET',})
      .then(response => response.json())
      //.then(data => data)
      .catch(error => console.error('There has been a problem with your fetch operation:', error));
}

let results1 = '';
await getResults('countries').then((res) => { results1 = res });
const resultsAsObject1 = JSON.parse(results1);
const countryResults = resultsAsObject1.highscores;

let results2 = '';
await getResults('flags').then((res) => { results2 = res });
const resultsAsObject2 = JSON.parse(results2);
const flagResults = resultsAsObject2.highscores;

let results3 = '';
await getResults('capitals').then((res) => { results3 = res });
const resultsAsObject3 = JSON.parse(results3);
const capitalResults = resultsAsObject3.highscores;





const fetchUserData = async () => {

  try {
    const s = 'http://localhost:8080/userProfile/getComments/' + route.params.userId

    const response = await fetch(s)

         userName.value = route.params.userId;
console.log(userName.value);
    if(response.ok) {

    const data = await response.json();

    console.log("network data", data)
    comments.value = data;

    } else  {

      throw new Error('Failed to fetch comments')
    }

  }   catch (error) {

    console.error('Error:', error);

    throw error;
  }

};

  watch(userName, () => {

    console.log("gg")
  })




onMounted(() => {

  //userName.value = this.$route.params.userId;
  fetchUserData();


})
const createComment = async () => {
  console.log("xcfvgh")
  try {

    const response = await fetch('http://localhost:8080/userProfile/createComments', {
        method: 'POST',
        headers: {

          'Content-Type': 'application/json',
        },
      body: JSON.stringify({
          user_name: userName.value,
          commented_name: getName(),
          comment: newComment.value,
          date: new Date().toISOString(),
      }),

    });

    if (response.ok) {
      const data = await response.text();
      console.log("Response:", data)
      // comments.value.push(newComment.value)
      return data;

    } else {
      throw new Error('Failed to create a comment');
    }
  } catch (error) {

    console.error('Error:', error);

    throw error;
  }

};

</script>

<template>
<div class="userContainer">
  <div class="userContent">

    <div class="centerProfile">
    <div class="profileContent">
      <div class="imgContent">
    <img class="userPicture" src="../assets/images/icons/user.png" alt="">
      </div>
      <h2 class="profileName">Name: {{userName}}</h2>
    </div>
    </div>
    <div class="resultContent">
     <h2 class="statisticName">Statistics:</h2>
      <div class="resultItem">
      <img class="imgIcon" src="/src/assets/images/icons/planet-earth.png" alt="">
      <h3 class="quizName">Countries:</h3>

<!--        <span class="continent">Europe: {{regionsData.europe}} % </span>-->
<!--        <span class="continent">NorthAmerica: {{regionsData.northAmerica}} %  </span>-->
<!--        <span class="continent">SouthAmerica: {{regionsData.southAmerica}} %  </span>-->
<!--        <span class="continent">Asia: {{regionsData.asia}} %  </span>-->
<!--        <span class="continent">Oceania: {{regionsData.oceania}} %  </span>-->
<!--        <span class="continent">Africa: {{regionsData.africa}} %  </span>-->

        <div class="listRegions" v-for="(item,index) in countryResults" :key="index">
          {{item.region}} : {{item.percentage}}{{ item.percentage ? '%' : ''}}
        </div>
      </div>



      <div class="resultItem">
      <img class="imgIcon" src="/src/assets/images/icons/flag.png" alt="">
      <h3 class="quizName">Flags:</h3>

<!--        <span class="continent">Europe: {{regionsData.europe}} % </span>-->
<!--        <span class="continent">NorthAmerica: {{regionsData.northAmerica}} %  </span>-->
<!--        <span class="continent">SouthAmerica: {{regionsData.southAmerica}} %  </span>-->
<!--        <span class="continent">Asia: {{regionsData.asia}} %  </span>-->
<!--        <span class="continent">Oceania: {{regionsData.oceania}} %  </span>-->
<!--        <span class="continent">Africa: {{regionsData.africa}} %  </span>-->
        <div class="listRegions" v-for="(item,index) in flagResults" :key="index">
          {{item.region}} : {{item.percentage}}{{ item.percentage ? '%' : ''}}
        </div>
      </div>



      <div class="resultItem">
      <img class="imgIcon"  src="/src/assets/images/icons/capitals.png" alt="">
      <img src="" alt="">
      <h3 class="quizName">Capitals:</h3>

<!--        <span class="continent">Europe: {{regionsData.europe}} % </span>-->
<!--        <span class="continent">NorthAmerica: {{regionsData.northAmerica}} %  </span>-->
<!--        <span class="continent">SouthAmerica: {{regionsData.southAmerica}} %  </span>-->
<!--        <span class="continent">Asia: {{regionsData.asia}} %  </span>-->
<!--        <span class="continent">Oceania: {{regionsData.oceania}} %  </span>-->
<!--        <span class="continent">Africa: {{regionsData.africa}} %  </span>-->
        <div class="listRegions" v-for="(item,index) in capitalResults" :key="index">
          {{item.region}} : {{item.percentage}}{{ item.percentage ? '%' : ''}}
        </div>
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
          ></v-text-field>
          <div class="btnContent">
          <v-btn :disabled="!newComment || generalStore.isloggedin" class="submitBtn" type="submit" >Submit</v-btn>
          </div>
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

@media screen and (max-width: 800px) {

  .userContent {

    display: flex;


  width: 400px;



  }

  .userContainer {

    height: fit-content;
    width: fit-content;
  }

  .resultContent {


    flex-direction: row-reverse;
    margin-right: auto;

  }

  .resultItem {


  }


}



.listRegions {

  margin-right: 20px;
  font-size: large;
  margin-bottom: 1px;
  //border: solid 2px white;




}

.btnContent {


  display: flex;
  flex-direction: column;
}

.submitBtn {

  background-color: #053B50;
  color: #EEEEEE;


}
.commentsAmount {

  color: #053B50;
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

  margin-top: 50px;
  //display: flex;

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
  font-weight: bold;
  display: flex;


}

.userContainer {


  display: flex;
  justify-content: center;



}
.userContent {

  padding: 40px;
  margin-top: 20px;
  border-radius: 10px;
  background-color: #053B50;
  color: #EEEEEE;
  height: 600px;




}

.profileName {

  text-align: center;
  margin-top: 30px;
}
.statisticName {

  margin-left: auto;
}

.quizName {


margin-bottom: 10px;
}

.commentName {

  margin-top: 10px;
  color: #053B50;
  font-weight: bolder;

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

  background-color: #176B87;

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