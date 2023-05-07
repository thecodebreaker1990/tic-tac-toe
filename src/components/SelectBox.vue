<script setup>
import BaseButton from './BaseButton.vue'

const emit = defineEmits(['on-start'])
</script>

<template>
  <div class="selection-box">
    <h3 class="header">Tic Tac Toe</h3>
    <p class="title">Select which you want to be?</p>
    <div class="options">
      <BaseButton :is-primary="true" @click="emit('on-start', 'X')">Player (X)</BaseButton>
      <BaseButton :is-primary="true" @click="emit('on-start', 'O')">Player (O)</BaseButton>
    </div>
  </div>
</template>

<style scoped>
.selection-box {
  background-color: #ffffff;
  border-radius: 4px;
  padding: 20px;
}
.header {
  font-size: 30px;
  font-weight: 600;
  padding-bottom: 10px;
  border-bottom: solid 1px lightgray;
}
.title {
  font-size: 22px;
  font-weight: 500;
  margin: 20px 0;
}
.options {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.options > button {
  width: 48%;
}
</style>
