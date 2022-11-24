import { mount } from "@vue/test-utils";
import Assets from "../../../src/views/assets/Assets.vue";

test("assets", async () => {
  const wrapper = mount(Assets, {});

  expect(wrapper.find("#assets-content-title").text()).toBe(
    "This is an about page"
  );
  expect(wrapper.find("#assets-content-description").text()).toBe(
    "This is an about page"
  );
});
