<script setup>
import { ref, computed, watch, nextTick } from 'vue'

import Welcome from './components/Welcome.vue'
import Board from './components/Board.vue'
import EndScreen from './components/EndScreen.vue'

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

let userPlayer = 'X'
const STATUS = {
  NOT_STARTED: 'notStarted',
  ON_GOING: 'onGoing',
  OVER: 'gameOver'
}

const gameStatus = ref(STATUS.NOT_STARTED)
const squares = ref(Array(9).fill(null))
const xIsNext = ref(true)

const isGameOver = computed(() => gameStatus.value === STATUS.OVER)

async function startGame(preferredPlayer) {
  gameStatus.value = STATUS.ON_GOING

  await nextTick()

  if (preferredPlayer != userPlayer) {
    userPlayer = preferredPlayer
    setXIsNext(!xIsNext.value)
  }
}

function setSquares(index) {
  const nextSquares = squares.value.slice()
  nextSquares[index] = xIsNext.value ? 'X' : 'O'
  squares.value = nextSquares
  setXIsNext(!xIsNext.value)
}

function setXIsNext(value) {
  xIsNext.value = value
}

function handleComputerTurn() {
  let clonedSquares = squares.value.slice()
  const computerPlayer = userPlayer == 'X' ? 'O' : 'X'

  //Check if computer can win in the next turn
  for (let i = 0; i < clonedSquares.length; i++) {
    if (!clonedSquares[i]) {
      clonedSquares[i] = computerPlayer
      if (calculateWinner(clonedSquares) === computerPlayer) {
        setSquares(i)
        return
      }
      clonedSquares[i] = null
    }
  }

  //Check if user can win in the next turn, then block that move
  for (let i = 0; i < clonedSquares.length; i++) {
    if (!clonedSquares[i]) {
      clonedSquares[i] = userPlayer
      if (calculateWinner(clonedSquares) === userPlayer) {
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
  if (winner) {
    gameStatus.value = STATUS.OVER
    return
  }
  const isNextComputerTurn =
    (userPlayer == 'X' && !xIsNext.value) || (userPlayer != 'X' && xIsNext.value)
  if (!isGameOver.value && isNextComputerTurn) {
    //let computer take its turn
    handleComputerTurn()
  }
}

watch(squares, checkWinnerAndUpdateStatus, { immediate: true })
</script>

<template>
  <Welcome v-if="gameStatus == STATUS.NOT_STARTED" @on-start="startGame" />
  <Board
    v-else-if="gameStatus == STATUS.ON_GOING"
    :squares="squares"
    :xIsNext="xIsNext"
    :is-game-over="isGameOver"
    @on-play="setSquares"
  />
  <EndScreen v-else />
</template>
