<template>
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
                    <th scope="col" class="text-sm text-white px-6 py-4">Id</th>
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
                    v-for="item in datas"
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
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>

              <div v-for="item in datas" :key="item.id">
                <div
                  v-show="isOpen"
                  v-if="this.$route.params.myCalendarId == item.id"
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

                    <div class="py-3 flex justify-center">
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
                    <div class="flex justify-center">
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  name: "MyCalendarTable",
  setup() {
    let isOpen = ref(false);
    return { isOpen };
  },
  props: {
    datas: Object,
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
  },
};
</script>
