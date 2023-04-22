<script setup>
defineProps({
  value: {
    type: String,
    default: ''
  }
})
const emit = defineEmits(['on-click-square'])
</script>

<template>
  <button class="square" @click="emit('on-click-square')">{{ value }}</button>
</template>

<style scoped>
/* Define the square */
.square {
  background-color: #ffffff;
  width: 100px;
  height: 100px;
  border: 2px solid #000000;
  font-size: 48px;
  font-weight: bold;
  text-align: center;
  line-height: 100px;
  cursor: pointer;
}

/* Define the hover effect */
.square:hover {
  background-color: #eeeeee;
}

/* Define the active state */
.square.active {
  background-color: #cccccc;
}
</style>
