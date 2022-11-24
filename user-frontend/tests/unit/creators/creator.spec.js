import { mount } from "@vue/test-utils";
import Creator from "../../../src/views/creators/Creator.vue";

test("Creator-left", async () => {
  const wrapper = mount(Creator, {});

  expect(wrapper.find("#creator-left-title").text()).toBe("title");
  expect(wrapper.find("#creator-left-subtitle").text()).toBe("subtitle");
  expect(wrapper.find("#creator-left-section-button-1").text()).toBe("button 1");
  expect(wrapper.find("#creator-left-section-button-2").text()).toBe("button 2");
  expect(wrapper.find("#creator-left-section-button-3").text()).toBe("button 3");
  expect(wrapper.find("#creator-left-section-button-4").text()).toBe("button 4");
  expect(wrapper.find("#creator-left-description").text()).toBe("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.");
  expect(wrapper.find("#creator-left-date").text()).toBe("Published 2 months ago");
  expect(wrapper.find("#creator-left-categories").text()).toBe("Categories:");
  expect(wrapper.find("#creator-left-categories-item1").text()).toBe("category");
  expect(wrapper.find("#creator-left-categories-item2").text()).toBe("category");
  expect(wrapper.find("#creator-left-categories-item3").text()).toBe("category");
  expect(wrapper.find("#creator-left-tags").text()).toBe("Tags:");
  expect(wrapper.find("#creator-left-tags-item1").text()).toBe("tag");
});

test("Creator-right", async () => {
    const wrapper = mount(Creator, {});
  
    expect(wrapper.find("#creator-right-title").text()).toBe("RELATED SCENES");
    expect(wrapper.find("#creator-right-title-item1").text()).toBe("Title");
    expect(wrapper.find("#creator-right-date-item1").text()).toBe("Published 13.01.2022 by Anna Maria Doe");
});
