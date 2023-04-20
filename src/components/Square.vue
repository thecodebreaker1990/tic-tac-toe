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
.square {
  height: 50px;
  width: 50px;
  float: left;
  border: solid 1px #999;
  background-color: #fff;
  font-size: 24px;
  font-weight: bold;
  padding: 0;
  text-align: center;
  margin: -1px -1px 0 0;
}
</style>
