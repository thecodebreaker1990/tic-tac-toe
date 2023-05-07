<script setup>
defineProps({
  isPrimary: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <button :class="['btn', isPrimary ? 'btn--primary' : '']">
    <slot />
  </button>
</template>

<style scoped>
.btn {
  padding: 10px 16px;
  border-radius: 4px;
  background-color: var(--color-background);
  color: #56baed;
  text-align: center;
  font-weight: 500;
  border: solid 1px var(--color-background);
  outline: none;
  cursor: pointer;
  transition: all 0.3s ease-out;
}
.btn--primary {
  background-color: #56baed;
  color: var(--vt-c-white);
  border-color: #56baed;
}
</style>
