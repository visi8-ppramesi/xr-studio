import { mount } from "@vue/test-utils";
import Logout from "../../../src/views/auth/Logout.vue";
import options from '../utils/pluginInitializer.js'

test("logout", async () => {
  const wrapper = mount(Logout, {
    global: {
        plugins: [...Object.values(options.plugins)],
        components: {...options.components}
    }
  });

  expect(wrapper.find("#logout-loading").text()).toBe("Logging out...");
});
