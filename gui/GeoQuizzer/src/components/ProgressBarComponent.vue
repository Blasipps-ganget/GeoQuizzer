<script setup>

import {watch, onMounted} from 'vue'

const props = defineProps({
  amountAnswered: {
    type: Number,
    required: true
  },
  totalQuestions: {
    type: Number,
    required: true
  }
})

onMounted(() => {
      const elProgress = document.querySelector("#progressAmount")

      watch(() => props.amountAnswered, (newVal) => {
        if (newVal)
          elProgress.style.width = ((newVal / props.totalQuestions) * 100) + '%';
        if (props.amountAnswered === 0)
          elProgress.style.width = '0%';
      })
    }
)
</script>
<template>
  <div class="progress">
    <div id="progressAmount" class="progress__bar"></div>
  </div>
</template>

<style scoped>
p {
  color: red;
}

.progress {
  margin: 5px auto;
  padding: 2px;
  width: 100%;
  max-width: 500px;
  border: 3px solid #053B50;
  height: 30px;
}

.progress .progress__bar {
  height: 100%;
  width: 0;
  background-color: #053B50;
}

</style>