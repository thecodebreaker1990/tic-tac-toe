<script setup>
import BaseButton from './BaseButton.vue'

defineProps({
  text: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['on-replay'])
</script>

<template>
  <div class="result-box">
    <h3 class="header">{{ text }}</h3>
    <BaseButton :is-primary="true" @click="emit('on-replay')">Replay</BaseButton>
  </div>
</template>

<style scoped>
.result-box {
  background-color: #ffffff;
  border-radius: 4px;
  padding: 20px;
  text-align: center;
}
.header {
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 10px;
}
</style>
