<template>
  <div>
    <CalendarSidenav @monthChange="monthChange" />
    <section
      class="px-6 py-12 md:px-12 bg-gray-100 text-gray-800 text-center lg:text-left md:ml-60"
    >
      <h2 id="calendar-title" class="text-3xl font-bold mb-12 text-center">
        My Schedule Calendar
      </h2>
      <Calendar
        ref="calendar"
        :view="'month'"
        :use-form-popup="true"
        :use-detail-popup="true"
        :week="{
          showTimezoneCollapseButton: true,
          timezonesCollapsed: false,
          eventView: true,
          taskView: true,
        }"
        :month="{ startDayOfWeek: 1 }"
        :timezone="{ zones }"
        :template="{
          milestone: getTemplateForMilestone,
          allday: getTemplateForAllday,
        }"
        :grid-selection="true"
        :calendars="calendars"
        :events="calendarData"
      ></Calendar>
      <div class="flex align-center justify-center mt-8">
        <button
          class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        >
          <router-link id="calendar-schedule" to="/studio/register-shoot"
            >Schedule a shoot</router-link
          >
        </button>
      </div>

      <my-calendar-table :datas="data" />
    </section>
  </div>
</template>

<script>
import Calendar from "../../components/graphs/Calendar.vue";
import CalendarCollection from "../../firebase/collections/calendar/calendar";
import CalendarSidenav from "../../components/studio/CalendarSidenav";
import { useAuthStore } from "@/store/auth";
import { mapState } from "pinia";
import MyCalendarTable from "@/components/MyCalendarTable";

export default {
  components: {
    Calendar,
    CalendarSidenav,
    MyCalendarTable,
  },
  data() {
    return {
      data: [
        {
          id: "1",
          location: "main-location",
          status: [{ name: "go-ahead" }, { name: "paid" }],
          event_id: "ft-8d243000-9500-4d33-8d6d-9f158858fc45",
          start_date: "May 2, 2023",
          end_date: "May 9, 2023",
        },
        {
          id: "2",
          location: "main-location",
          status: [{ name: "go-ahead" }, { name: "paid" }],
          event_id: "ft-8d243000-9500-4d33-8d6d-9f158858fc45",
          start_date: "May 5, 2023",
          end_date: "May 14, 2023",
        },
        {
          id: "3",
          location: "main-location",
          status: [{ name: "go-ahead" }],
          event_id: "ft-8d243000-9500-4d33-8d6d-9f158858fc45",
          start_date: "May 10, 2023",
          end_date: "May 22, 2023",
          dis: "true",
        },
        {
          id: "4",
          location: "main-location",
          status: [{ name: "go-ahead" }, { name: "paid" }],
          event_id: "ft-8d243000-9500-4d33-8d6d-9f158858fc45",
          start_date: "August 5, 2023",
          end_date: "August 9, 2023",
        },
        {
          id: "5",
          location: "main-location",
          status: [{ name: "go-ahead" }],
          event_id: "ft-8d243000-9500-4d33-8d6d-9f158858fc45",
          start_date: "September 20, 2023",
          end_date: "September 29, 2023",
        },
      ],
      modalData: null,
      calendarData: [],
      calendars: [
        {
          id: "0",
          name: "Private",
          backgroundColor: "#9e5fff",
          borderColor: "#9e5fff",
          dragBackgroundColor: "#9e5fff",
        },
      ],
      zones: [
        {
          timezoneName: "Asia/Jakarta",
          displayLabel: "Jakarta",
          tooltip: "UTC+07:00",
        },
      ],
      selectedView: "month",
      viewOptions: [
        {
          title: "Monthly",
          value: "month",
        },
        {
          title: "Weekly",
          value: "week",
        },
        {
          title: "Daily",
          value: "day",
        },
      ],
      dateRangeText: "",
    };
  },
  computed: {
    ...mapState(useAuthStore, ["isLoggedIn"]),
  },
  mounted() {
    if (this.isLoggedIn) {
      this.getCalendarData().then((calendarData) => {
        console.log(calendarData);
        this.calendarData = calendarData;
      });
    } else {
      this.$router.push({ name: "Login" });
    }
  },
  methods: {
    monthChange({ year, month }) {
      this.$refs.calendar.setDate(year, month);
    },
    showDetails(data) {
      this.$modal.show("modal-update");
      this.modalData = data;
    },
    async getCalendarData() {
      const calendar = await CalendarCollection.getMyCalendar().then((cal) => {
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
      //process calendar
      return calendar;
    },
  },
};
</script>
