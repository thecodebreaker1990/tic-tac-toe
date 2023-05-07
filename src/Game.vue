<script setup>
import { ref, watch, nextTick } from 'vue'
import { sleep } from './helpers/utility'

import SelectBox from './components/SelectBox.vue'
import Board from './components/Board.vue'
import ResultBox from './components/ResultBox.vue'

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

let playerSign = 'X'
const STATUS = {
  NOT_STARTED: 'notStarted',
  ON_GOING: 'onGoing',
  OVER: 'gameOver'
}

const gameStatus = ref(STATUS.NOT_STARTED)
const squares = ref(Array(9).fill(null))
const xIsNext = ref(true)
const awaitingNextMove = ref(false)
const resultText = ref('')

async function startGame(preferredPlayerSign) {
  gameStatus.value = STATUS.ON_GOING

  await nextTick()

  if (preferredPlayerSign != playerSign) {
    playerSign = preferredPlayerSign
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
  const computerPlayerSign = playerSign == 'X' ? 'O' : 'X'

  //Check if computer can win in the next turn
  for (let i = 0; i < clonedSquares.length; i++) {
    if (!clonedSquares[i]) {
      clonedSquares[i] = computerPlayerSign
      if (calculateWinner(clonedSquares) === computerPlayerSign) {
        setSquares(i)
        return
      }
      clonedSquares[i] = null
    }
  }

  //Check if user can win in the next turn, then block that move
  for (let i = 0; i < clonedSquares.length; i++) {
    if (!clonedSquares[i]) {
      clonedSquares[i] = playerSign
      if (calculateWinner(clonedSquares) === playerSign) {
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

async function setRandomTimeDelay() {
  //Block the user move by disabling the board
  awaitingNextMove.value = true

  //set a random time delay
  const randomTimeDelay = (Math.random() * 1000 + 200).toFixed()
  await sleep(randomTimeDelay)

  //Unblock user and allow to take next turn
  awaitingNextMove.value = false
}

async function checkGameStatus(squares) {
  const winner = calculateWinner(squares)
  const isMatchDrawn = squares.every((el) => el != null)

  if (winner || isMatchDrawn) {
    await setRandomTimeDelay()

    if (winner) resultText.value = `Player ${winner} has won the game!`
    else if (!winner && isMatchDrawn) resultText.value = 'Match has been drawn!'

    gameStatus.value = STATUS.OVER

    return
  }

  const isNextComputerTurn =
    (playerSign == 'X' && !xIsNext.value) || (playerSign != 'X' && xIsNext.value)
  if (isNextComputerTurn) {
    await setRandomTimeDelay()
    //let computer take its turn
    handleComputerTurn()
  }
}

function restartGame() {
  playerSign = 'X'
  gameStatus.value = STATUS.NOT_STARTED
  squares.value = Array(9).fill(null)
  xIsNext.value = true
  resultText.value = ''
}

watch(squares, checkGameStatus, { immediate: true })
</script>

<template>
  <SelectBox v-if="gameStatus == STATUS.NOT_STARTED" @on-start="startGame" />
  <Board
    v-else-if="gameStatus == STATUS.ON_GOING"
    :squares="squares"
    :xIsNext="xIsNext"
    @on-play="setSquares"
  />
  <ResultBox v-else :text="resultText" @on-replay="restartGame" />
</template>
