<script setup>
import { computed } from 'vue'

const props = defineProps({
  value: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['on-click-square'])

const iconId = computed(() => {
  if (!props.value) return null
  else return props.value === 'X' ? 'fa-solid fa-xmark' : 'fa-regular fa-circle'
})
</script>

<template>
  <button class="square" @click="emit('on-click-square')">
    <font-awesome-icon v-if="value" :icon="iconId" />
  </button>
</template>

<style scoped>
/* Define the square */
.square {
  background-color: #ffffff;
  color: #56baed;
  width: 100%;
  height: 100%;
  font-size: 48px;
  text-align: center;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  outline: none;
  transition: background-color 0.3s ease-out;
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
