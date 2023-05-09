<template>
  <div>
    <h2 class="mb-5">{{ title }}</h2>
    <div class="grid grid-cols-[3rem_1fr] items-center gap-3">
      <component v-if="icon" :is="components[icon]"></component>
      <div v-if="message" class="font-oswald font-light text-xl">
        {{ message }}
      </div>
      <div class="col-start-2 text-sm text-gray">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import IconMailing from "../svgs/IconMailing.vue";

const props = defineProps({
  title: {
    typeof: String,
    required: true,
  },
  icon: {
    typeof: String,
    default: "",
  },
  message: {
    typeof: String,
    default: "",
  },
});

const components = {
  mail: IconMailing,
};
</script>

<style lang="scss" scoped></style>
