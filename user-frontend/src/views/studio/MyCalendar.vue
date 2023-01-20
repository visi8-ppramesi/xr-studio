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
      <MyCalendarTable v-model="scheduleData" @reload="fetchCalendarData" />
    </section>
  </div>
</template>

<script>
import MyCalendarTable from "@/components/studio/MyCalendarTable.vue";
import Calendar from "../../components/graphs/Calendar.vue";
import { ref } from "vue";
import CalendarCollection from "../../firebase/collections/calendar/calendar";
import CalendarSidenav from "../../components/studio/CalendarSidenav";
import { useAuthStore } from "@/store/auth";
import { mapState } from "pinia";
import { listFetcher } from "@/composables/listFetcher";
import { doc, getDoc, where, orderBy } from "firebase/firestore";
import sortBy from "lodash/orderBy";
import fb from "@/firebase/firebase";

export default {
  components: {
    Calendar,
    CalendarSidenav,
    MyCalendarTable,
  },
  setup() {
    let isOpen = ref(false);
    const { getItems: getCalendarData } = listFetcher(
      CalendarCollection,
      null,
      "getMyCalendar",
      false
    );
    return { isOpen, getCalendarData };
  },
  computed: {
    ...mapState(useAuthStore, ["isLoggedIn"]),
  },
  mounted() {
    if (this.isLoggedIn) {
      this.fetchCalendarData();
    } else {
      this.$router.push({ name: "Login" });
    }
  },
  data() {
    return {
      extras: {},
      scheduleData: [],
      calendarData: [],
      modalData: null,
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
  methods: {
    fetchCalendarData() {
      this.getCalendarData([
        orderBy("end_date", "asc"),
        where("end_date", ">=", new Date()),
        // where("event.status", "array-contains", "approved"),
      ]).then(async (calendarData) => {
        calendarData = sortBy(
          calendarData,
          [(v) => new Date(v.start_date)],
          ["asc"]
        );
        const schedulePromise = calendarData.map(async (sched) => {
          const shootId = sched.event_id.id;
          const procId = sched.id;
          const actualProc = await getDoc(
            doc(fb.db, "shoots", shootId, "procedures", procId)
          );

          const procedureType = actualProc.get("procedure_type")?.id;
          sched.procedure_type = procedureType;
          return sched;
        });
        this.scheduleData = await Promise.all(schedulePromise);
        this.calendarData = calendarData
          .filter((v) => {
            return v.event.status.includes("approved");
          })
          .map((evDate) => {
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
    },
    edit(index, val) {
      if (val == true) {
        this.data[index] = false;
      } else {
        this.data[index] = true;
      }
    },
    more(index) {
      this.item = this.data[index];
    },
    monthChange({ year, month }) {
      this.$refs.calendar.setDate(year, month);
    },
    showDetails(data) {
      this.$modal.show("modal-update");
      this.modalData = data;
    },
  },
};
</script>
