import { mount } from "@vue/test-utils";
import Equipment from "../../../src/views/equipments/Equipment.vue";
import options from "../utils/pluginInitializer.js";

test("Equipment", async () => {
  const wrapper = mount(Equipment, {
    global: {
      plugins: [...Object.values(options.plugins)],
      components: { ...options.components },
    },
  });

  expect(wrapper.find("#equipment-right-title").text()).toBe(
    "RELATED EQUIPMENTS"
  );
  expect(wrapper.find("#equipment-right-title-item1").text()).toBe("Title");
  expect(wrapper.find("#equipment-right-date").text()).toBe(
    "Published 13.01.2022 by Anna Maria Doe"
  );
  expect(wrapper.find("#equipment-left-description")).toBeTruthy();
  expect(wrapper.find("#equipment-left-category").text()).toBe("Categories:");
});
