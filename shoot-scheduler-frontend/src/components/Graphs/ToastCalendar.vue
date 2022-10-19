<template>
  <div ref="container" id="toastui-vue-calendar"></div>
</template>

<script>
import Calendar from "@toast-ui/calendar";
import '@toast-ui/calendar/toastui-calendar.css';
import 'tui-date-picker/dist/tui-date-picker.min.css';
import 'tui-time-picker/dist/tui-time-picker.min.css';
import { theme } from './theme.js'
export default {
  name: "ToastCalendar",
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
    eventFilter: Function,
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
      calendarInstance: null,
    };
  },
  watch: {
    view(value) {
      this.calendarInstance.changeView(value + '');
    },
    useFormPopup(value) {
      this.calendarInstance.setOptions({ useFormPopup: value });
    },
    useDetailPopup(value) {
      this.calendarInstance.setOptions({ useDetailPopup: value });
    },
    isReadOnly(value) {
      this.calendarInstance.setOptions({ isReadOnly: value });
    },
    // eventFilter(value) {
    //   this.calendarInstance.setOptions({ eventFilter: value });
    // },
    week(value) {
      this.calendarInstance.setOptions({ week: {...value} });
    },
    month(value) {
      this.calendarInstance.setOptions({ month: {...value} });
    },
    gridSelection(value) {
      this.calendarInstance.setOptions({ gridSelection: !!value });
    },
    timezone(value) {
      this.calendarInstance.setOptions({ timezone: JSON.parse(JSON.stringify(value)) });
    },
    template(value) {
      this.calendarInstance.setOptions({ template: [...value] });
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
    this.calendarInstance = new Calendar(this.$refs.container, {
      defaultView: 'month',
      useFormPopup: this.useFormPopup,
      useDetailPopup: this.useDetailPopup,
      isReadOnly: this.isReadOnly,
      usageStatistics: false,
      eventFilter: (v) => v,
      week: {...this.week},
      month: {...this.month},
      gridSelection: true,
      timezone: JSON.parse(JSON.stringify(this.timezone)),
      theme: theme,
      template: {...this.template},
      calendars: [...this.calendars],
    });
    this.addEventListeners();
    this.calendarInstance.createEvents([...this.events]);
  },
  beforeDestroy() {
    this.calendarInstance.off();
    this.calendarInstance.destroy();
  },
  methods: {
    addEventListeners() {
      Object.keys(this.$attrs).filter(v => v.startsWith('on')).forEach((eventName) => {
        this.calendarInstance.on(eventName, (...args) => {
          return this.$emit(eventName, ...args)
        }
        );
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
