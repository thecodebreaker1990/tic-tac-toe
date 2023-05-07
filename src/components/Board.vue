<script setup>
import Square from './Square.vue'
import PlayerTurnIndicator from './PlayerTurnIndicator.vue'

const props = defineProps({
  squares: {
    type: Array,
    required: true
  },
  xIsNext: {
    type: Boolean,
    default: true
  },
  isGameOver: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['on-play'])

function setSquares(index) {
  if (props.squares[index] || props.isGameOver) return

  emit('on-play', index)
}
</script>

<template>
  <PlayerTurnIndicator :is-x-turn="xIsNext" />
  <div class="board">
    <Square v-for="i in 9" :key="i" :value="squares[i - 1]" @on-click-square="setSquares(i - 1)" />
  </div>
</template>

<style scoped>
.board {
  display: grid;
  grid-template-columns: repeat(3, 100px);
  grid-template-rows: repeat(3, 100px);
  gap: 2px;
  justify-items: center;
  align-items: center;
}
.status {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 10px;
}
</style>
