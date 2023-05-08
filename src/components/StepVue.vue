<template>
  <div v-if="show">
    <slot></slot>
  </div>
</template>

<script setup>
import { inject, computed, onMounted } from 'vue';

const stepId = inject('step_counter').value++
const currentStep = inject('current_step')

const show = computed(() => {
  return stepId === currentStep.value
})
</script>

<style scoped>

</style>