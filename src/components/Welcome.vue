<script setup>
const emit = defineEmits(['on-start'])
</script>

<template>
  <h1>Welcome to tic tac toe game</h1>
  <button @click="emit('on-start')">Start Game</button>
</template>
