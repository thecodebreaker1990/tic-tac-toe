<script setup>
defineProps({
  winner: {
    type: String,
    default: 'X'
  }
})
</script>

<template>
  <h1>The Winner is: {{ winner }}</h1>
</template>
