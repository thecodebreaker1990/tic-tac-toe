<script setup>
import BaseButton from './BaseButton.vue'

const emit = defineEmits(['on-start'])
</script>

<template>
  <div class="welcome-container">
    <h3 class="header">Tic Tac Toe</h3>
    <hr class="separator" />
    <p>Select which you want to be?</p>
    <div class="btn-container">
      <BaseButton :is-primary="true" @click="emit('on-start', 'X')">Player (X)</BaseButton>
      <BaseButton :is-primary="true" @click="emit('on-start', 'O')">Player (O)</BaseButton>
    </div>
  </div>
</template>

<style scoped>
.welcome-container {
  background-color: #ffffff;
  border-radius: 4px;
  padding: 20px;
}
.header {
  font-size: 18px;
  font-weight: 500;
}
.separator {
  width: 100%;
  height: 1px;
  margin: 10px 0;
  background-color: #ccc;
  border: none;
}
.btn-container {
  margin-top: 10px;
}
.btn-container > button:not(:last-child) {
  margin-right: 10px;
}
</style>
