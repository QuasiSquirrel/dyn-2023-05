<template>
  <div>
    <StepVue>
      <h2 class="uppercase text-bold">Passwort</h2>
      <button class="bt bt-primary" @click="currentStep++">Ändern</button>
    </StepVue>
    <StepVue>
      <button @click="currentStep++">NextStep</button>
      <SetPassword @next="currentStep++" @abort="currentStep = 0"/>
    </StepVue>
    <StepVue>
      FinalStep
    </StepVue>
  </div>
</template>

<script setup>
import SetPassword from './SetPassword.vue';
import StepVue from './StepVue.vue';
import { provide, ref } from 'vue';

const currentStep = ref(0)
const stepCounter = ref(0)


provide('current_step', currentStep)
provide('step_counter', stepCounter)
</script>

<style scoped>

</style>