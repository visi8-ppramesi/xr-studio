import { mount } from "@vue/test-utils";
import MyAccount from "../../../src/views/auth/MyAccount.vue";

test("Cart", async () => {
  const wrapper = mount(MyAccount, {});

  expect(wrapper.find("#my-account-username").text()).toBe("Username");
  expect(wrapper.find("#my-account-email").text()).toBe("Email");
  expect(wrapper.find("#my-account-fullname").text()).toBe("Fullname");
  expect(wrapper.find("#my-account-password").text()).toBe("Password");
  expect(wrapper.find("#my-account-password-current").text()).toBe("Current Password");
  expect(wrapper.find("#my-account-password-new").text()).toBe("New Password");
  expect(wrapper.find("#my-account-password-confirm").text()).toBe("Confirm Password");
});
