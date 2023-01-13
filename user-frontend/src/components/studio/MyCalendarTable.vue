<template>
  <div class="py-2">
    <div class="w-full">
      <div class="flex justify-between items-center">
        <div class="font-bold text-xl">My Calendar</div>
      </div>
      <div class="flex flex-col">
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="py-4 inline-block sm:px-6 lg:px-8 min-w-full">
            <div class="overflow-hidden">
              <table class="max-w-screen w-full text-center">
                <thead class="border-b bg-gray-800">
                  <tr>
                    <th scope="col" class="text-sm text-white px-6 py-4">Id</th>
                    <th scope="col" class="text-sm text-white px-6 py-4">
                      Shoot Type
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
                <tbody v-if="tableData.length > 0">
                  <tr
                    v-for="item in tableData"
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
                      {{ item.procedure_type }}
                    </td>
                    <td
                      class="text-sm text-gray-900 font-light px-6 xl:px-8 py-4 whitespace-nowrap"
                    >
                      Main location
                    </td>
                    <td
                      class="text-sm text-gray-900 font-light px-6 xl:px-8 py-4 whitespace-nowrap"
                    >
                      {{ formatters.absoluteDate(item.start_date) }}
                    </td>
                    <td
                      class="text-sm text-gray-900 font-light px-6 xl:px-8 py-4 whitespace-nowrap"
                    >
                      {{ formatters.absoluteDate(item.end_date) }}
                    </td>
                    <td
                      class="text-sm text-gray-900 font-light px-6 xl:px-8 py-4 whitespace-nowrap"
                    >
                      <div id="modal-update" class="container mx-auto">
                        <div class="justify-center">
                          <button
                            @click="openModal(item.id)"
                            class="px-6 xl:px-8 py-2 text-white bg-blue-600 rounded shadow"
                            type="button"
                          >
                            Edit
                          </button>
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
  <div
    v-if="isOpen"
    class="h-full fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50"
  >
    <div class="bg-white p-5 w-96 rounded-xl">
      <div class="py-1">
        <label
          class="pt-2 font-bold block text-left text-gray-700 text-sm font-bold"
          for="location"
        >
          Start Date
        </label>
        <DatePicker
          id="start_date"
          type="text"
          as-single
          v-model="form.startDate"
          :formatter="formatter"
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
        <DatePicker
          id="end_date"
          type="text"
          as-single
          v-model="form.endDate"
          :formatter="formatter"
          placeholder="end_date"
        />
      </div>

      <div class="flex flex-row py-1 justify-evenly">
        <div>
          <button
            @click="saveSchedule()"
            class="px-6 py-2 text-white bg-blue-600 rounded shadow"
            type="button"
          >
            Save
          </button>
        </div>
        <div>
          <button
            @click="closeModal"
            class="px-6 py-2 text-white bg-red-600 rounded shadow"
            type="button"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref, watch } from "vue";
import isNil from "lodash/isNil";
import DatePicker from "vue-tailwind-datepicker";
import dayjs from "dayjs";
import { editProcedure } from "@/composables/submitShoot";

const itemsPerPage = 3;
export default {
  components: {
    DatePicker,
  },
  props: {
    tableData: {
      default: () => [],
      type: Array,
    },
  },
  setup(props) {
    const isOpen = ref(false);
    const currentPage = ref(0);
    const paginatedTableData = ref([]);
    const form = reactive({
      location: null,
      startDate: [],
      endDate: [],
    });
    const watchFunc = (prop) => {
      watch(
        () => prop,
        (newVal) => {
          paginatedTableData.value = newVal.splice(
            currentPage.value * itemsPerPage,
            (currentPage.value + 1) * itemsPerPage
          );
        }
      );
    };
    const [watchCurrentPage, watchTableData] = [
      currentPage,
      props.tableData,
    ].map(watchFunc);

    return {
      isOpen,
      form,
      watchCurrentPage,
      watchTableData,
      paginatedTableData,
    };
  },
  mounted() {},
  data() {
    return {
      formatter: {
        date: "DD MMM YYYY",
        month: "MMM",
      },
      selectedIdx: null,
    };
  },
  methods: {
    saveSchedule() {
      if (!isNil(this.selectedIdx)) {
        const data = {
          shoot: {
            id: this.tableData[this.selectedIdx].event_id.id,
          },
          procedure: {
            id: this.tableData[this.selectedIdx].id,
            procedure_start: new Date(this.form.startDate),
            procedure_end: new Date(this.form.endDate),
            procedure_type: this.tableData[this.selectedIdx].procedure_type,
          },
        };
        editProcedure(data)
          .then(() => {
            this.closeModal();
            this.$toast.open({
              message: "Procedure Edited",
              position: "bottom",
              type: "success",
              duration: 5000,
              dismissible: true,
            });
          })
          .catch((err) => {
            this.$toast.open({
              message: "Edit Fail: " + err,
              position: "bottom",
              type: "error",
              duration: 5000,
              dismissible: true,
            });
          });
      }
    },
    openModal(id) {
      this.selectedIdx = this.tableData.findIndex((v) => v.id === id);
      this.form.location = this.tableData[this.selectedIdx].location;
      this.form.startDate = [
        dayjs(this.tableData[this.selectedIdx].start_date).format(
          this.formatter.date
        ),
      ];
      this.form.endDate = [
        dayjs(this.tableData[this.selectedIdx].end_date).format(
          this.formatter.date
        ),
      ];
      this.isOpen = true;
    },
    closeModal() {
      this.selectedIdx = null;
      this.form.location = null;
      this.form.startDate = null;
      this.form.endDate = null;
      this.isOpen = false;
    },
  },
};
</script>
