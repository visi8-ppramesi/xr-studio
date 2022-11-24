import { mount } from "@vue/test-utils";
import Equipment from "../../../src/views/equipments/Equipment.vue";

test("Equipment", async () => {
  const wrapper = mount(Equipment, {});

  expect(wrapper.find("#equipment-right-title").text()).toBe("RELATED EQUIPMENTS");
  expect(wrapper.find("#equipment-right-title-item1").text()).toBe("Title");
  expect(wrapper.find("#equipment-right-date").text()).toBe("Published by 13.01.2022 by Anna Maria Doe");
});
