<template>
  <ToastCalendar
    ref="calendar"
    style="height: 800px"
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
    :events="formattedCalendarData"
    @selectDateTime="onSelectDateTime"
    @beforeCreateEvent="onBeforeCreateEvent"
    @beforeUpdateEvent="onBeforeUpdateEvent"
    @beforeDeleteEvent="onBeforeDeleteEvent"
    @afterRenderEvent="onAfterRenderEvent"
    @clickDayName="onClickDayName"
    @clickEvent="onClickEvent"
    @clickTimezonesCollapseBtn="onClickTimezonesCollapseBtn"
  ></ToastCalendar>
</template>

<script>
import ToastCalendar from "../Graphs/ToastCalendar.vue";

export default {
  name: "ShootsCalendar",
  components: {
    ToastCalendar,
  },
  data() {
    return {
      calendars: [
        {
          id: "0",
          name: "Private",
          backgroundColor: "#9e5fff",
          borderColor: "#9e5fff",
          dragBackgroundColor: "#9e5fff",
        }
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
      eventsData: [
        {
          id: "56a449e2",
          location: "Darmawangsa",
          project: "Kara",
          client: "PT. Garing Sempurna",
          start_date: "2022-10-01T17:00:00.000Z",
          end_date: "2022-10-03T17:00:00.000Z",
        },
        {
          id: "65ddc467",
          location: "Darmawangsa",
          project: "Changelings",
          client: "PT. Alam Semesta",
          start_date: "2022-10-04T17:00:00.000Z",
          end_date: "2022-10-06T17:00:00.000Z",
        },
        {
          id: "a0819a33",
          location: "Kemang",
          project: "Nope",
          client: "PT. Klien Internations",
          start_date: "2022-10-07T17:00:00.000Z",
          end_date: "2022-10-08T17:00:00.000Z",
        },
        {
          id: "da366268",
          location: "Darmawangsa",
          project: "The Yard",
          client: "PT. Unibego",
          start_date: "2022-10-15T17:00:00.000Z",
          end_date: "2022-10-19T17:00:00.000Z",
        },
      ],
    };
  },
  watch: {
    selectedView(newView) {
      this.calendarInstance.changeView(newView);
      this.setDateRangeText();
    },
  },
  mounted() {
    this.setDateRangeText();
  },
  computed: {
    calendarInstance() {
      return this.$refs.calendar.getInstance();
    },
    formattedCalendarData() {
      return this.eventsData.map((datum) => {
        return {
          id: datum.id,
          calendarId: "0",
          title: `${datum.project} ${datum.client} at ${datum.location}`,
          category: "allday",
          start: new Date(datum.start_date),
          end: new Date(datum.end_date),
          isReadOnly: true
        };
      });
    },
  },
  methods: {
    getTemplateForMilestone(event) {
      return `<span style="color: #fff; background-color: ${event.backgroundColor};">${event.title}</span>`;
    },
    getTemplateForAllday(event) {
      return `[All day] ${event.title}`;
    },
    onSelectDateTime({ start, end }) {
      console.group("onSelectDateTime");
      console.log(`Date : ${start} ~ ${end}`);
      console.groupEnd();
    },
    onBeforeCreateEvent(eventData) {
      const event = {
        calendarId: eventData.calendarId || "",
        id: String(Math.random()),
        title: eventData.title,
        isAllday: eventData.isAllday,
        start: eventData.start,
        end: eventData.end,
        category: eventData.isAllday ? "allday" : "time",
        dueDateClass: "",
        location: eventData.location,
        state: eventData.state,
        isPrivate: eventData.isPrivate,
      };
      this.calendarInstance.createEvents([event]);
    },
    onBeforeUpdateEvent(updateData) {
      console.group("onBeforeUpdateEvent");
      console.log(updateData);
      console.groupEnd();
      const targetEvent = updateData.event;
      const changes = { ...updateData.changes };
      this.calendarInstance.updateEvent(
        targetEvent.id,
        targetEvent.calendarId,
        changes
      );
    },
    onBeforeDeleteEvent({ title, id, calendarId }) {
      console.group("onBeforeDeleteEvent");
      console.log("Event Info : ", title);
      console.groupEnd();
      this.calendarInstance.deleteEvent(id, calendarId);
    },
    onAfterRenderEvent({ title }) {
      console.group("onAfterRenderEvent");
      console.log("Event Info : ", title);
      console.groupEnd();
    },
    onClickDayName({ date }) {
      console.group("onClickDayName");
      console.log("Date : ", date);
      console.groupEnd();
    },
    onClickEvent({ nativeEvent, event }) {
      console.group("onClickEvent");
      console.log("MouseEvent : ", nativeEvent);
      console.log("Event Info : ", event);
      console.groupEnd();
    },
    onClickTimezonesCollapseBtn(timezoneCollapsed) {
      console.group("onClickTimezonesCollapseBtn");
      console.log("Is Timezone Collapsed?: ", timezoneCollapsed);
      console.groupEnd();
      const newTheme = {
        "week.daygridLeft.width": "100px",
        "week.timegridLeft.width": "100px",
      };
      this.calendarInstance.setTheme(newTheme);
    },
    onClickTodayButton() {
      this.calendarInstance.today();
      this.setDateRangeText();
    },
    onClickMoveButton(offset) {
      this.calendarInstance.move(offset);
      this.setDateRangeText();
    },
    setDateRangeText() {
      const date = this.calendarInstance.getDate();
      const start = this.calendarInstance.getDateRangeStart();
      const end = this.calendarInstance.getDateRangeEnd();
      const startYear = start.getFullYear();
      const endYear = end.getFullYear();
      switch (this.selectedView) {
        case "month":
          this.dateRangeText = `${date.getFullYear()}.${date.getMonth() + 1}`;
          return;
        case "day":
          this.dateRangeText = `${date.getFullYear()}.${
            date.getMonth() + 1
          }.${date.getDate()}`;
          return;
        default:
          this.dateRangeText = `${startYear}.${
            start.getMonth() + 1
          }.${start.getDate()} - ${startYear !== endYear ? `${endYear}.` : ""}${
            end.getMonth() + 1
          }.${end.getDate()}`;
      }
    },
  },
};
</script>
