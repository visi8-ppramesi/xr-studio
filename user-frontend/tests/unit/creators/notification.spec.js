import { mount } from "@vue/test-utils";
import Notification from "../../../src/views/creators/Notification.vue";

test("Notification", async () => {
  const wrapper = mount(Notification, {});

  expect(
    wrapper.findAll(".notification-title").map((item) => item.text())
  ).toEqual(
    expect.arrayContaining([
      "testing 1",
      "testing 2",
      "testing 3",
      "testing 4",
      "testing 5",
      "testing 1",
      "testing 2",
      "testing 3",
      "testing 4",
      "testing 5",
    ])
  );
  expect(
    wrapper.findAll(".notification-description").map((item) => item.text())
  ).toEqual(
    expect.arrayContaining([
      "description testing 1",
      "description testing 2",
      "description testing 3",
      "description testing 4",
      "description testing 5",
      "description testing 1",
      "description testing 2",
      "description testing 3",
      "description testing 4",
      "description testing 5",
    ])
  );
  expect(wrapper.find("#notification-filter").text()).toBe("Search By Filter");
  expect(
    wrapper.findAll(".notification-item-title").map((item) => item.text())
  ).toEqual(expect.arrayContaining(["filter 1", "filter 2", "filter 3"]));
});
