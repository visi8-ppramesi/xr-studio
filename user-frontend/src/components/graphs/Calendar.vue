<template>
  <div>
    <div class="flex justify-between w-100">
      <button
        @click="prevMonth"
        type="button"
        data-mdb-ripple="true"
        data-mdb-ripple-color="light"
        class="bg-blue-600 inline-block p-3 mb-2 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out"
      >
        <svg
          width="20"
          height="20"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          <!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
          <path
            fill="white"
            d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"
          />
        </svg>
      </button>
      <h3 class="flex align-center text-xl font-bold text-center">
        {{ currentMonth }}
      </h3>
      <button
        @click="nextMonth"
        type="button"
        data-mdb-ripple="true"
        data-mdb-ripple-color="light"
        class="bg-blue-600 inline-block p-3 mb-2 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out"
      >
        <svg
          width="20"
          height="20"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          <path
            fill="white"
            d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"
          />
        </svg>
      </button>
    </div>
    <div ref="container" id="toastui-vue-calendar"></div>
  </div>
</template>

<script>
import Calendar from "@toast-ui/calendar";
import "@toast-ui/calendar/toastui-calendar.css";
import "tui-date-picker/dist/tui-date-picker.min.css";
import "tui-time-picker/dist/tui-time-picker.min.css";
import { theme } from "./theme.js";
export default {
  name: "Calendar",
  props: {
    view: String,
    useFormPopup: {
      type: Boolean,
      default: () => undefined,
    },
    useDetailPopup: {
      type: Boolean,
      default: () => undefined,
    },
    isReadOnly: {
      type: Boolean,
      default: () => undefined,
    },
    eventFilter: {
      type: Function,
      default: (v) => v,
    },
    week: Object,
    month: Object,
    gridSelection: {
      type: [Object, Boolean],
      default: () => undefined,
    },
    timezone: Object,
    template: Object,
    calendars: Array,
    events: Array,
  },
  data() {
    return {
      currentMonth: "",
      calendarInstance: "",
    };
  },
  watch: {
    view(value) {
      this.calendarInstance.changeView(value + "");
    },
    useFormPopup(value) {
      this.calendarInstance.setOptions({ useFormPopup: !!value });
    },
    useDetailPopup(value) {
      this.calendarInstance.setOptions({ useDetailPopup: !!value });
    },
    isReadOnly(value) {
      this.calendarInstance.setOptions({ isReadOnly: !!value });
    },
    // eventFilter(value) {
    //   this.calendarInstance.setOptions({ eventFilter: value });
    // },
    week(value) {
      this.calendarInstance.setOptions({ week: { ...value } });
    },
    month(value) {
      this.calendarInstance.setOptions({ month: { ...value } });
    },
    gridSelection(value) {
      this.calendarInstance.setOptions({ gridSelection: !!value });
    },
    timezone(value) {
      this.calendarInstance.setOptions({
        timezone: JSON.parse(JSON.stringify(value)),
      });
    },
    template(value) {
      this.calendarInstance.setOptions({ template: { ...value } });
    },
    calendars(value) {
      this.calendarInstance.setCalendars([...value]);
    },
    events(value) {
      this.calendarInstance.clear();
      this.calendarInstance.createEvents([...value]);
    },
  },
  mounted() {
    this.currentMonth = this.formatters.longMonth(new Date());
    this.calendarInstance = new Calendar(this.$refs.container, {
      defaultView: "month",
      useFormPopup: this.useFormPopup,
      useDetailPopup: this.useDetailPopup,
      isReadOnly: true,
      usageStatistics: false,
      // eventFilter: this.eventFilter,
      week: { ...this.week },
      month: { ...this.month },
      gridSelection: true,
      timezone: JSON.parse(JSON.stringify(this.timezone)),
      theme: theme,
      template: { ...this.template },
      calendars: [...this.calendars],
    });
    this.addEventListeners();
    this.calendarInstance.createEvents([...this.events]);
  },
  beforeUnmount() {
    this.calendarInstance.off();
    this.calendarInstance.destroy();
  },
  methods: {
    setDate(year, month) {
      this.calendarInstance.setDate(new Date(year, month - 1, 1));
      this.currentMonth = this.formatters.longMonth(this.getMidMonth());
    },
    prevMonth() {
      this.calendarInstance.prev();
      this.currentMonth = this.formatters.longMonth(this.getMidMonth());
    },
    nextMonth() {
      this.calendarInstance.next();
      this.currentMonth = this.formatters.longMonth(this.getMidMonth());
    },
    getMidMonth() {
      const start = new Date(
        this.calendarInstance.getDateRangeStart()
      ).getTime();
      const end = new Date(this.calendarInstance.getDateRangeEnd()).getTime();
      const mid = Math.floor((end + start) / 2);
      return new Date(mid);
    },
    addEventListeners() {
      Object.keys(this.$attrs)
        .filter((v) => v.startsWith("on"))
        .forEach((eventName) => {
          this.calendarInstance.on(eventName, (...args) => {
            return this.$emit(eventName, ...args);
          });
        });
    },
    getRootElement() {
      return this.$refs.container;
    },
    getInstance() {
      return this.calendarInstance;
    },
  },
};
</script>

<style scoped>
#toastui-vue-calendar {
  height: 800px;
}
</style>
