import { mount } from "@vue/test-utils";
import Equipments from "../../../src/views/equipments/Equipments.vue";

test("Equipments", async () => {
  const wrapper = mount(Equipments, {});

  expect(wrapper.find("#equipments-content-title").text()).toBe("Equipment Rental");
  expect(wrapper.findAll('.equipments-content-description').map(item => item.text())).toEqual(expect.arrayContaining(["filter 1", "filter 2", "filter 3"]));
  expect(wrapper.findAll('.equipments-content-price').map(item => item.text())).toEqual(expect.arrayContaining(["filter 1", "filter 2", "filter 3"]));
  expect(wrapper.find("#equipments-content-more").text()).toBe("Load more");
});
