import { test, expect } from "vitest";
import { mount } from "@vue/test-utils";

import SetPassword from "../SetPassword.vue";

test("mount component", async () => {
  expect(SetPassword).toBeTruthy();

  const wrapper = mount(SetPassword);
});
