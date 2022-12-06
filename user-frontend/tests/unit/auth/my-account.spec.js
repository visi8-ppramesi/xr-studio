import { mount } from "@vue/test-utils";
import MyAccount from "../../../src/views/auth/MyAccount.vue";
import options from '../utils/pluginInitializer.js'

test("my-account", async () => {
  const wrapper = mount(MyAccount, {
    global: {
        plugins: [...Object.values(options.plugins)],
        components: {...options.components}
    }
  });

  expect(wrapper.find("#my-account-profile").text()).toBe("Profile Picture");
  expect(wrapper.find("#my-account-profile-button").text()).toBe("Select Profile Picture");
  expect(wrapper.find("#my-account-username").text()).toBe("Username");
  expect(wrapper.find("#my-account-email").text()).toBe("Email");
  expect(wrapper.find("#my-account-fullname").text()).toBe("Fullname");
  // expect(wrapper.find("#my-account-password").text()).toBeTruthy();
  // expect(wrapper.find("#my-account-password-current").text()).toBe("Current Password");
  // expect(wrapper.find("#my-account-password-new").text()).toBe("New Password");
  // expect(wrapper.find("#my-account-password-confirm").text()).toBe("Confirm Password");
});
