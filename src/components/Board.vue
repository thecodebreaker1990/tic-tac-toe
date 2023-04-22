<script setup>
import { ref } from 'vue'
import Square from './Square.vue'

const squares = ref(Array(9).fill(null))
const xIsNext = ref(true)

function setSquares(index) {
  if (squares.value[index]) return

  let clonedSquares = squares.value.slice()
  clonedSquares[index] = xIsNext.value ? 'X' : 'O'
  squares.value = clonedSquares
  setXIsNext(!xIsNext.value)
}

function setXIsNext(value) {
  xIsNext.value = value
}
</script>

<template>
  <div class="board">
    <Square v-for="i in 9" :key="i" :value="squares[i]" @on-click-square="setSquares(i)" />
  </div>
</template>

<style scoped>
.board {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  justify-items: center;
  align-items: center;
  width: 150px;
  height: 150px;
}
</style>
