import { test, expect } from "vitest";
import { mount } from "@vue/test-utils";

import StepVue from "../StepVue.vue";

test("exists", async () => {
  expect(StepVue).toBeTruthy();
});
