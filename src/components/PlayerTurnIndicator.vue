<script setup>
import BaseButton from './BaseButton.vue'

defineProps({
  isXTurn: {
    type: Boolean,
    default: false
  }
})

const players = ['X', 'O']
</script>

<template>
  <div class="indicator-container">
    <BaseButton
      v-for="player in players"
      :key="player"
      class="indicator-item"
      :is-primary="(isXTurn && player === 'X') || (!isXTurn && player === 'O')"
    >
      {{ player }}'s Turn
    </BaseButton>
  </div>
</template>

<style scoped>
.indicator-container {
  width: 300px;
  background-color: var(--color-background);
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
}
.indicator-container > .indicator-item {
  flex: 1 0;
}
</style>
