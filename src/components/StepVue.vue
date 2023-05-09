<template>
  <div v-if="show" class="p-5 rounded-lg bg-card-active text-white">
    <slot></slot>
  </div>
</template>

<script setup>
import { inject, computed } from "vue";

const stepId = inject("step_counter").value++;
const currentStep = inject("current_step");

const show = computed(() => {
  return stepId === currentStep.value;
});
</script>

<style scoped></style>
