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

      <div class="py-2">
        <div class="w-full">
          <div class="flex justify-between items-center">
            <div class="font-bold text-xl">Calendar Data</div>
          </div>
          <div class="flex flex-col">
            <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div class="py-4 inline-block sm:px-6 lg:px-8">
                <div class="overflow-hidden">
                  <table class="max-w-screen w-full text-center">
                    <thead class="border-b bg-gray-800">
                      <tr>
                        <th scope="col" class="text-sm text-white px-6 py-4">
                          Id
                        </th>
                        <th
                          scope="col"
                          class="text-sm font-medium text-white px-6 xl:px-8 py-4"
                        >
                          Location
                        </th>
                        <th
                          scope="col"
                          class="text-sm font-medium text-white px-6 xl:px-8 py-4"
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          class="text-sm font-medium text-white px-6 xl:px-8 py-4"
                        >
                          Event Id
                        </th>
                        <th
                          scope="col"
                          class="text-sm font-medium text-white px-6 xl:px-8 py-4"
                        >
                          Start Date
                        </th>
                        <th
                          scope="col"
                          class="text-sm font-medium text-white px-6 xl:px-8 py-4"
                        >
                          End Date
                        </th>
                        <th
                          scope="col"
                          class="text-sm font-medium text-white px-6 xl:px-8 py-4"
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="item in data"
                        :key="item.id"
                        class="bg-white border-b"
                      >
                        <td
                          class="px-6 xl:px-8 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                        >
                          {{ item.id }}
                        </td>
                        <td
                          class="text-sm text-gray-900 font-light px-6 xl:px-8 py-4 whitespace-nowrap"
                        >
                          {{ item.location }}
                        </td>
                        <td
                          class="text-sm text-gray-900 font-light px-6 xl:px-8 py-4 whitespace-nowrap"
                        >
                          <div v-for="items in item.status" :key="items.id">
                            <div>{{ items.name }}</div>
                          </div>
                        </td>
                        <td
                          class="text-sm text-gray-900 font-light px-6 xl:px-8 py-4 whitespace-nowrap"
                        >
                          {{ item.event_id }}
                        </td>
                        <td
                          class="text-sm text-gray-900 font-light px-6 xl:px-8 py-4 whitespace-nowrap"
                        >
                          {{ item.start_date }}
                        </td>
                        <td
                          class="text-sm text-gray-900 font-light px-6 xl:px-8 py-4 whitespace-nowrap"
                        >
                          {{ item.end_date }}
                        </td>
                        <td
                          class="text-sm text-gray-900 font-light px-6 xl:px-8 py-4 whitespace-nowrap"
                        >
                          <div id="modal-update" class="container mx-auto">
                            <div class="justify-center">
                              <router-link
                                :to="{
                                  name: 'EditMyCalendar',
                                  params: { myCalendarId: item.id },
                                }"
                              >
                                <button
                                  @click="isOpen = true"
                                  class="px-6 xl:px-8 py-2 text-white bg-blue-600 rounded shadow"
                                  type="button"
                                >
                                  Edit
                                </button>
                              </router-link>

                              <div
                                v-show="isOpen"
                                v-if="
                                  this.$route.params.myCalendarId == item.id
                                "
                                class="h-full fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50"
                              >
                                <div class="bg-white p-5 w-96 rounded-xl">
                                  <div class="py-1">
                                    <label
                                      class="font-bold block text-left text-gray-700 text-sm font-bold"
                                      for="location"
                                    >
                                      Location
                                    </label>
                                    <input
                                      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                      id="location"
                                      type="text"
                                      v-model="item.location"
                                      placeholder="location"
                                    />
                                  </div>

                                  <div
                                    v-for="items in item.status"
                                    :key="items.id"
                                    class="py-1"
                                  >
                                    <label
                                      class="pt-2 font-bold block text-left text-gray-700 text-sm font-bold"
                                      for="v"
                                    >
                                      Status
                                    </label>
                                    <input
                                      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                      id="status"
                                      type="text"
                                      disabled
                                      v-model="items.name"
                                      placeholder="status"
                                    />
                                  </div>

                                  <div class="py-1">
                                    <label
                                      class="pt-2 font-bold block text-left text-gray-700 text-sm font-bold"
                                      for="location"
                                    >
                                      Event Id
                                    </label>
                                    <input
                                      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                      id="event_id"
                                      type="text"
                                      disabled
                                      v-model="item.event_id"
                                      placeholder="event_id"
                                    />
                                  </div>

                                  <div class="py-1">
                                    <label
                                      class="pt-2 font-bold block text-left text-gray-700 text-sm font-bold"
                                      for="location"
                                    >
                                      Start Date
                                    </label>
                                    <input
                                      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                      id="start_date"
                                      type="text"
                                      v-model="item.start_date"
                                      placeholder="start_date"
                                    />
                                  </div>

                                  <div class="py-1">
                                    <label
                                      class="pt-2 font-bold block text-left text-gray-700 text-sm font-bold"
                                      for="location"
                                    >
                                      End Date
                                    </label>
                                    <input
                                      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                      id="end_date"
                                      type="text"
                                      v-model="item.end_date"
                                      placeholder="end_date"
                                    />
                                  </div>

                                  <div class="py-3">
                                    <router-link to="/studio/my-calendar">
                                      <button
                                        @click="edit(index, item.dis)"
                                        class="px-6 py-2 text-white bg-blue-600 rounded shadow"
                                        type="button"
                                      >
                                        Save
                                      </button>
                                    </router-link>
                                  </div>
                                  <div>
                                    <router-link to="/studio/my-calendar">
                                      <button
                                        @click="isOpen = false"
                                        class="px-6 py-2 text-white bg-red-600 rounded shadow"
                                        type="button"
                                      >
                                        Back
                                      </button>
                                    </router-link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Calendar from "../../components/graphs/Calendar.vue";
import { ref } from "vue";
// import ModalUpdate from "../../components/ModalUpdate.vue";
// import CalendarCollection from "../../firebase/collections/calendar/calendar";
import CalendarSidenav from "../../components/studio/CalendarSidenav";
import { useAuthStore } from "@/store/auth";
import { mapState } from "pinia";

export default {
  components: {
    Calendar,
    CalendarSidenav,
    // ModalUpdate,
  },
  setup() {
    let isOpen = ref(false);
    return { isOpen };
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
    edit(index, val) {
      if (val == true) {
        this.data[index] = false;
      } else {
        this.data[index] = true;
      }
    },
    more(index) {
      this.item = this.data[index];
      console.log(this.item);
    },
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
