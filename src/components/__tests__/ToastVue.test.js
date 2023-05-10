import { test, expect } from "vitest";
import { mount } from "@vue/test-utils";

import ToastVue from "../ToastVue.vue";

test("mount component", async () => {
  expect(ToastVue).toBeTruthy();

  const wrapper = mount(ToastVue, {
    props: {
      title: "A title",
      icon: "mail",
      message: "A message",
    },
  });

  const icon = wrapper.get("svg");

  expect(icon).toBeTruthy();
  expect(wrapper.text()).toContain("A title");
  expect(wrapper.text()).toContain("A message");
});
