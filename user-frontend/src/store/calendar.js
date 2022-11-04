import { defineStore } from "pinia";
import { computed, ref } from "vue";
import Calendar from "@/firebase/collections/calendar/calendar";
import { vedhg } from "@/utils/dateRangeHash";

export const useCalendarStore = defineStore("calendar", () => {
  const calendar = ref([]);

  const freeSpots = computed(() =>
    vedhg.getFreeSpots(calendar.value.map((v) => v.id)).map(vedhg.decodeHash)
  );

  async function getCalendar() {
    this.calendar = await Calendar.getDocuments().then((cal) => {
      return cal.map((evDate) => {
        return {
          id: evDate.id,
          calendarId: "0",
          title: "Shoot Scheduled",
          // category: "allday",
          start: new Date(evDate.start_date),
          end: new Date(evDate.end_date),
          isReadOnly: true,
        };
      });
    });
    return this.calendar;
  };

  return { calendar, getCalendar, freeSpots };
});
