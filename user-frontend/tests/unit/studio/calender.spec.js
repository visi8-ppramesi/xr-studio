import { mount } from "@vue/test-utils";
import Calendar from "../../../src/views/studio/Calendar.vue";

test("Calendar", async () => {
  const wrapper = mount(Calendar, {});

  expect(wrapper.find("#calendar-title").text()).toBe(
    "Shooting Schedule Calendar"
  );
  expect(wrapper.find("#calendar-schedule").text()).toBe("Schedule a shoot");
});
