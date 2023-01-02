import { mount } from "@vue/test-utils";
import Creators from "../../../src/views/creators/Creators.vue";
import options from "../utils/pluginInitializer.js";

test("Creators", async () => {
  const wrapper = mount(Creators, {
    global: {
      plugins: [...Object.values(options.plugins)],
      components: { ...options.components },
    },
  });

  expect(wrapper.find("#creators-content-title").text()).toBe(
    "Equipment Rental"
  );
  expect(wrapper.find("#non-collapsible").text()).toBe("Non-collapsible link");
  expect(wrapper.find("#item1-link").text()).toBe("Collapsible item 1");
  expect(wrapper.find("#link-1").text()).toBe("Link 1");
  expect(wrapper.find("#link-2").text()).toBe("Link 2");
  expect(wrapper.find("#collapsible2").text()).toBe("Collapsible item 2");
  expect(wrapper.find("#link-3").text()).toBe("Link 3");
  expect(wrapper.find("#link-4").text()).toBe("Link 4");
  expect(wrapper.find("#non-collapsible2").text()).toBe("Non-collapsible link");
  expect(wrapper.find("#collapsible3").text()).toBe("Collapsible item 3");
  expect(wrapper.find("#link-5").text()).toBe("Link 5");
  expect(wrapper.find("#link-6").text()).toBe("Link 6");
  expect(wrapper.find("#collapsible4").text()).toBe("Collapsible item 4");
  expect(wrapper.find("#link-7").text()).toBe("Link 7");
  expect(wrapper.find("#link-8").text()).toBe("Link 8");
});
