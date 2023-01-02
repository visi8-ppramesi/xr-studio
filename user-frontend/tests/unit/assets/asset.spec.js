import { mount } from "@vue/test-utils";
import Asset from "../../../src/views/assets/Asset.vue";
import options from "../utils/pluginInitializer.js";

test("asset", async () => {
  const wrapper = mount(Asset, {
    global: {
      plugins: [...Object.values(options.plugins)],
      components: { ...options.components },
    },
  });

  expect(wrapper.find("#right-section-title").text()).toBe("RELATED SCENES");
  expect(wrapper.findAll(".asset-item-title").map((v) => v.text())).toEqual(
    expect.arrayContaining([
      "Title",
      "Title",
      "Title",
      "Title",
      "Title",
      "Title",
      "Title",
      "Title",
      "Title",
      "Title",
    ])
  );
  expect(wrapper.findAll(".asset-item-des").map((v) => v.text())).toEqual(
    expect.arrayContaining([
      "Published 13.01.2022 by Anna Maria Doe",
      "Published 13.01.2022 by Anna Maria Doe",
      "Published 13.01.2022 by Anna Maria Doe",
      "Published 13.01.2022 by Anna Maria Doe",
      "Published 13.01.2022 by Anna Maria Doe",
      "Published 13.01.2022 by Anna Maria Doe",
      "Published 13.01.2022 by Anna Maria Doe",
      "Published 13.01.2022 by Anna Maria Doe",
      "Published 13.01.2022 by Anna Maria Doe",
      "Published 13.01.2022 by Anna Maria Doe",
    ])
  );
  expect(wrapper.find("#asset-left-prev").text()).toBe("Previous");
  expect(wrapper.find("#asset-left-next").text()).toBe("Next");
  expect(wrapper.find("#asset-left-name")).toBeTruthy();
  expect(wrapper.find("#asset-left-description")).toBeTruthy();
  expect(wrapper.find("#asset-left-date").text()).toBe(
    "Published 2 months ago"
  );
  expect(wrapper.find("#asset-left-categories").text()).toBe("Categories:");
  expect(wrapper.find("#asset-left-categories-item")).toBeTruthy();
  expect(wrapper.find('img[alt="Louvre"]').attributes().src).toBe(
    "https://mdbootstrap.com/img/new/standard/city/018.jpg"
  );
});
