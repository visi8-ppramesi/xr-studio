import { mount } from "@vue/test-utils";
import Creators from "../../../src/views/creators/Creators.vue";

test("Creators", async () => {
  const wrapper = mount(Creators, {});

  expect(wrapper.find("#creators-content-title").text()).toBe("Equipment Rental");
});
