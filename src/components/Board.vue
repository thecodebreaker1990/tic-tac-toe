<script setup>
import { ref, watch } from 'vue'
import Square from './Square.vue'

const squares = ref(Array(9).fill(null))
const xIsNext = ref(true)
const status = ref('')
const isGameOver = ref(false)

function setSquares(index) {
  if (squares.value[index] || isGameOver.value) return

  let clonedSquares = squares.value.slice()
  clonedSquares[index] = xIsNext.value ? 'X' : 'O'
  squares.value = clonedSquares
  setXIsNext(!xIsNext.value)
}

function setXIsNext(value) {
  xIsNext.value = value
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }

  return null
}

function checkWinnerAndUpdateStatus(squares) {
  const winner = calculateWinner(squares)
  if (winner) {
    status.value = `${winner} has won!`
    isGameOver.value = true
  } else {
    status.value = `Next Player : ${xIsNext.value ? 'X' : 'O'}`
  }
}

watch(squares, checkWinnerAndUpdateStatus, { immediate: true })
</script>

<template>
  <!-- <p class="status">{{ status }}</p> -->
  <div class="board">
    <Square v-for="i in 9" :key="i" :value="squares[i - 1]" @on-click-square="setSquares(i - 1)" />
  </div>
</template>

<style scoped>
.board {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 2px;
  justify-items: center;
  align-items: center;
  /* width: 300px;
  height: 300px; */
}
.status {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 10px;
}
</style>
