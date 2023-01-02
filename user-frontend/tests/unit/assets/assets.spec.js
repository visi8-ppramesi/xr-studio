import { mount } from "@vue/test-utils";
import Assets from "../../../src/views/assets/Assets.vue";

test("assets", async () => {
  const wrapper = mount(Assets);

  expect(wrapper.find("#assets-content-title").text()).toBe("3D XR Scenes");
  // expect(wrapper.findAll(".assets-content-description").map((v) => v.text())).toEqual(
  //   expect.arrayContaining(["Admin", "Author List"])
  // );
  expect(wrapper.find("#assets-side-category").text()).toBe("Category");
  expect(wrapper.find("#assets-side-category-item1").text()).toBe("Category 1");
  expect(wrapper.find("#assets-side-category-item2").text()).toBe("Category 2");
  expect(wrapper.find("#assets-side-category-item3").text()).toBe("Category 3");
  expect(wrapper.find("#assets-side-category-item4").text()).toBe("Category 4");
  expect(wrapper.find("#assets-side-category-item5").text()).toBe("Category 5");
  expect(wrapper.find("#assets-side-tag").text()).toBe("Tag");
  expect(wrapper.find("#assets-side-tag-item1").text()).toBe("Tag 1");
  expect(wrapper.find("#assets-side-tag-item2").text()).toBe("Tag 2");
  expect(wrapper.find("#assets-side-tag-item3").text()).toBe("Tag 3");
  expect(wrapper.find("#assets-side-tag-item4").text()).toBe("Tag 4");
  expect(wrapper.find("#assets-side-tag-item5").text()).toBe("Tag 5");
  expect(wrapper.find("#assets-side-price").text()).toBe("Price");
  expect(wrapper.find("#assets-side-button").text()).toBe("Submit");

  await wrapper.find('input[type="checkbox"]').setChecked();
  expect(wrapper.find('input[type="checkbox"]').element.checked).toBeTruthy();
});
