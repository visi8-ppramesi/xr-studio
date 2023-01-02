import { mount } from "@vue/test-utils";
import AboutUs from "../../src/views/AboutUs.vue";

test("About", async () => {
  const wrapper = mount(AboutUs, {});

  expect(wrapper.find("#about-us-title").text()).toBe("This is an about page");
});
