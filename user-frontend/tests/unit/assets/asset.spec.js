import { mount } from "@vue/test-utils";
import Asset from "../../../src/views/assets/Asset.vue";

test("asset", async () => {
  const wrapper = mount(Asset, {});

  expect(wrapper.find("#right-section-title").text()).toBe(
    "This is an about page"
  );
  expect(wrapper.findAll(".asset-item-title").map((v) => v.text())).toEqual(
    expect.arrayContaining(["Admin", "Author List"])
  );
  expect(wrapper.findAll(".asset-item-des").map((v) => v.text())).toEqual(
    expect.arrayContaining(["Admin", "Author List"])
  );
});
