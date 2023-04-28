<script setup>
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
    <div
      v-for="player in players"
      :key="player"
      :class="[
        'indicator-item',
        { active: (isXTurn && player === 'X') || (!isXTurn && player === 'O') }
      ]"
    >
      {{ player }}'s Turn
    </div>
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
.indicator-item {
  padding: 10px 16px;
  border-radius: 4px;
  background-color: var(--color-background);
  color: #56baed;
  text-align: center;
  border: solid 1px var(--color-background);
  outline: none;
  transition: all 0.3s ease-out;
}
.indicator-item.active {
  background-color: #56baed;
  color: var(--vt-c-white);
  border-color: #56baed;
}
</style>
