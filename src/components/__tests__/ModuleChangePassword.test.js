import { test, expect } from "vitest";
import { mount } from "@vue/test-utils";

import ModuleChangePassword from "../ModuleChangePassword.vue";

test("mount component", async () => {
  expect(ModuleChangePassword).toBeTruthy();

  const wrapper = mount(ModuleChangePassword);
  let buttons = wrapper.findAll("button");

  expect(buttons).toHaveLength(1);
});
