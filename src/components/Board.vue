<script setup>
import { ref, watch } from 'vue'

import Square from './Square.vue'
import PlayerTurnIndicator from './PlayerTurnIndicator.vue'

const squares = ref(Array(9).fill(null))
const xIsNext = ref(true)
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

function handleComputerTurn() {
  let clonedSquares = squares.value.slice()

  //Check if computer can win in the next turn
  for (let i = 0; i < clonedSquares.length; i++) {
    if (!clonedSquares[i]) {
      clonedSquares[i] = 'O'
      if (calculateWinner(clonedSquares) === 'O') {
        setSquares(i)
        return
      }
      clonedSquares[i] = null
    }
  }

  //Check if user can win in the next turn, then block that move
  for (let i = 0; i < clonedSquares.length; i++) {
    if (!clonedSquares[i]) {
      clonedSquares[i] = 'X'
      if (calculateWinner(clonedSquares) === 'X') {
        setSquares(i)
        return
      }
      clonedSquares[i] = null
    }
  }

  // If no winning move is available, choose a random available space
  const center = [4]
  const diagonals = [0, 2, 6, 8]
  const prioritySpaces = diagonals.concat(center)
  for (let i = 0; i < prioritySpaces.length; i++) {
    if (!clonedSquares[i]) {
      setSquares(i)
      return
    }
  }

  const availableSpaces = clonedSquares.filter((square) => square)
  const randomIndex = Math.floor(Math.random() * availableSpaces.length)
  setSquares(availableSpaces[randomIndex])
}

function checkWinnerAndUpdateStatus(squares) {
  const winner = calculateWinner(squares)
  isGameOver.value = !!winner
  if (!isGameOver.value && !xIsNext.value) {
    //let computer take its turn
    handleComputerTurn()
  }
}

watch(squares, checkWinnerAndUpdateStatus, { immediate: true })
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
