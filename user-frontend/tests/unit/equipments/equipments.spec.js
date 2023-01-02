import { mount } from "@vue/test-utils";
import Equipments from "../../../src/views/equipments/Equipments.vue";
import options from '../utils/pluginInitializer.js'

test("Equipments", async () => {
  const wrapper = mount(Equipments, {
    global: {
        plugins: [...Object.values(options.plugins)],
        components: {...options.components}
    }
  });

  expect(wrapper.find("#equipments-content-title").text()).toBe("Equipment Rental");
  expect(wrapper.find("#equipments-content-more").text()).toBe("Load more");
  expect(wrapper.find("#equipments-side-category").text()).toBe(
    "Category"
  );
  expect(wrapper.find("#equipments-side-category-item1").text()).toBe(
    "Category 1"
  );
  expect(wrapper.find("#equipments-side-category-item2").text()).toBe(
    "Category 2"
  );
  expect(wrapper.find("#equipments-side-category-item3").text()).toBe(
    "Category 3"
  );
  expect(wrapper.find("#equipments-side-category-item4").text()).toBe(
    "Category 4"
  );
  expect(wrapper.find("#equipments-side-category-item5").text()).toBe(
    "Category 5"
  );
  expect(wrapper.find("#equipments-side-price").text()).toBe(
    "Price"
  );
  expect(wrapper.find("#equipments-side-button").text()).toBe(
    "Submit"
  );

  await wrapper.find('input[type="checkbox"]').setChecked()
  expect(wrapper.find('input[type="checkbox"]').element.checked).toBeTruthy()
});
