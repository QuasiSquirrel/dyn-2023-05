<template>
  <div class="container max-w-3xl">
    <StepVue>
      <h2 class="mb-5">Passwort</h2>
      <button class="bt bt-primary rounded px-4" @click="nextStep">
        Ändern
      </button>
    </StepVue>
    <StepVue>
      <SetPassword @next="nextStep" @abort="currentStep = 0" />
    </StepVue>
    <StepVue>
      <ToastVue
        :title="'Passwort Ändern'"
        :message="'Code versendet!'"
        :icon="'mail'"
      >
        Wir haben dir eine E-Mail zum Zurűcksethen deines Passwortes an
        <b class="text-white">Max.Mustermann@email.com</b> geschickt.
      </ToastVue>
    </StepVue>
  </div>
</template>

<script setup>
import SetPassword from "./SetPassword.vue";
import ToastVue from "./ToastVue.vue";
import StepVue from "./StepVue.vue";
import { provide, ref } from "vue";

const currentStep = ref(0);
const stepCounter = ref(0);

provide("current_step", currentStep);
provide("step_counter", stepCounter);

const nextStep = function () {
  if (stepCounter.value > currentStep.value) currentStep.value++;
};
</script>
