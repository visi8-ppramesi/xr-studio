import { mount } from "@vue/test-utils";
import Logout from "../../../src/views/auth/Logout.vue";

test("logout", async () => {
  const wrapper = mount(Logout, {});

  expect(wrapper.find("#logout-loading").text()).toBe("This is an about page");
});
