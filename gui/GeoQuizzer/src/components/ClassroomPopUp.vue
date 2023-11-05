<script setup>

import {defineProps} from 'vue';

defineProps({
  open: {
    type: Boolean,
    required: true
  }
});

</script>
<template>
  <div class="popup" v-show="open">
    <div class="popup-inner">
      <div class="closeContainer">
        <i @click="$emit('close')" class='fas fa-times closeIcon'></i>
      </div>
      <slot/>
    </div>
  </div>
</template>

<style scoped>

.closeContainer {
  display: flex;
  justify-content: flex-end;
}

.closeIcon {
  margin: 1px;
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
  right: 0;
  bottom: 0;
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);

  .popup-inner {
    background: #176B87;
    padding: 20px;
    border-radius: 10px;
    border: 2px solid #053B50;
    height: 250px;
    width: 400px;
  }
}
</style>