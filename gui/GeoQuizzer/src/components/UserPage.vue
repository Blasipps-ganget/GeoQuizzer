<script setup>
import CommentList from "@/components/CommentList.vue";
import {ref, onMounted, computed} from "vue";
import {useRoute} from "vue-router";
import {useGeneralStore} from "@/stores/general";
import {handleToken} from "@/js/userApi";
import {getName} from "@/js/userApi";

const route = useRoute();
const generalStore = useGeneralStore();
const userName = computed(() => route.params.userId);
const comments = ref([]);
const newComment = ref('');

const submitComment = async () => {
  if (!newComment.value) return;
  const commentValue = {username: getName(), comment: newComment.value}
  comments.value.push(commentValue);
  await createComment();
  newComment.value = '';
  await fetchUserData();
}

async function getResults(quiztype) {
  const accessToken = await handleToken();
  return fetch(`http://localhost:8080/highscores/?name=${userName.value}&quiz=${quiztype}`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    },
    method: 'GET',
  })
      .then(response => response.json())
      .catch(error => console.error('There has been a problem with your fetch operation:', error));
}

let results1 = '';
await getResults('countries').then((res) => {
  results1 = res
});
const resultsAsObject1 = JSON.parse(results1);
const countryResults = resultsAsObject1.highscores;

let results2 = '';
await getResults('flags').then((res) => {
  results2 = res
});
const resultsAsObject2 = JSON.parse(results2);
const flagResults = resultsAsObject2.highscores;

let results3 = '';
await getResults('capitals').then((res) => {
  results3 = res
});
const resultsAsObject3 = JSON.parse(results3);
const capitalResults = resultsAsObject3.highscores;

const fetchUserData = async () => {

  try {
    const s = 'http://localhost:8080/userProfile/getComments/' + route.params.userId
    const response = await fetch(s)
    userName.value = route.params.userId;
    if (response.ok) {
      const data = await response.json();
      comments.value = data;
    } else {
      throw new Error('Failed to fetch comments')
    }
  } catch (error) {
    console.error('Error');
    throw error;
  }
};

onMounted(() => {
  fetchUserData();
})
const createComment = async () => {
  const accessToken = await handleToken();
  try {
    const response = await fetch('http://localhost:8080/userProfile/createComments', {
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${accessToken}`},
      body: JSON.stringify({
        user_name: userName.value,
        commented_name: getName(),
        comment: newComment.value,
        date: new Date().toISOString(),
      }),
    });

    if (response.ok) {
      const data = await response.text();
      return data;
    } else {
      throw new Error('Failed to create a comment');
    }
  } catch (error) {
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
          <h2 class="profileName">Name: {{ userName }}</h2>
        </div>
      </div>
      <div class="resultContent">

        <div class="resultItem">
          <div class="centerTitle">
            <h2 class="statisticName">Statistics:</h2>
          </div>
          <img class="imgIcon" src="/src/assets/images/icons/planet-earth.png" alt="">
          <h3 class="quizName">Countries:</h3>
          <div class="listRegions" v-for="(item,index) in countryResults" :key="index">
            {{ item.region }} : {{ item.percentage }}{{ item.percentage ? '%' : '' }}
          </div>
        </div>
        <div class="resultItem2">
          <img class="imgIcon" src="/src/assets/images/icons/flag.png" alt="">
          <h3 class="quizName">Flags:</h3>
          <div class="listRegions" v-for="(item,index) in flagResults" :key="index">
            {{ item.region }} : {{ item.percentage }}{{ item.percentage ? '%' : '' }}
          </div>
        </div>
        <div class="resultItem2">
          <img class="imgIcon" src="/src/assets/images/icons/capitals.png" alt="">
          <img src="" alt="">
          <h3 class="quizName">Capitals:</h3>
          <div class="listRegions" v-for="(item,index) in capitalResults" :key="index">
            {{ item.region }} : {{ item.percentage }}{{ item.percentage ? '%' : '' }}
          </div>
        </div>
      </div>

    </div>
    <div class="comment-section">
      <div class="centerComment">
        <h2 class="commentName">Leave a comment:</h2>
        <v-sheet width="300" class="mx-auto">
          <v-form class="formBox" @submit.prevent="submitComment">
            <v-text-field
                v-model="newComment"
                label="Comment"
            ></v-text-field>
            <div class="btnContent">
              <v-btn :disabled="!newComment || !generalStore.isLoggedIn" class="submitBtn" type="submit">Submit</v-btn>
            </div>
          </v-form>
        </v-sheet>
      </div>

      <div class="commentsList">
        <h3 class="commentsAmount">Comments({{ comments.length }})</h3>
      </div>
      <CommentList :comments="comments"/>
    </div>
  </div>
</template>
<style scoped>
@media screen and (max-width: 800px) {
  .centerComment {
    margin-top: 80px;
  }

  .userContainer {
    display: flex;
    align-items: stretch;
    flex-direction: column;
  }

  .userContent {
    width: 375px;
  }

  .resultContent {
    display: flex;
    height: 565px;
    width: 310px;
  }

  .resultItem {
    margin-bottom: 200px;
    height: 10px;
  }

  .comment-section {

  }

  .statisticName {

    margin-bottom: 10px;
  }
}

.centerTitle {
  margin-bottom: 13px;
}

.resultItem2 {
  margin-top: 100px;
}

.listRegions {
  margin-right: 20px;
  font-size: large;
  margin-bottom: 1px;
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

.resultItem {
  margin-top: 50px;
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
  height: fit-content;
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
  border: 2px solid #053B50;
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
  border-radius: 10px;
  margin-left: 20px;
}

</style>