<script setup>
import { ref } from 'vue'
import Square from './Square.vue'

const squares = ref(Array(9).fill(null))

function setSquares(index) {
  let clonedSquares = squares.value.slice()
  clonedSquares[index] = 'X'
  squares.value = clonedSquares
}
</script>

<template>
  <div class="board">
    <div class="board-row">
      <Square :value="squares[0]" @on-click-square="setSquares(0)" />
      <Square :value="squares[1]" @on-click-square="setSquares(1)" />
      <Square :value="squares[2]" @on-click-square="setSquares(2)" />
    </div>
    <div class="board-row">
      <Square :value="squares[3]" @on-click-square="setSquares(3)" />
      <Square :value="squares[4]" @on-click-square="setSquares(4)" />
      <Square :value="squares[5]" @on-click-square="setSquares(5)" />
    </div>
    <div class="board-row">
      <Square :value="squares[6]" @on-click-square="setSquares(6)" />
      <Square :value="squares[7]" @on-click-square="setSquares(7)" />
      <Square :value="squares[8]" @on-click-square="setSquares(8)" />
    </div>
  </div>
</template>
