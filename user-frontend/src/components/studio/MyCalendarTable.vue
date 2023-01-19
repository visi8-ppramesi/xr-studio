<template>
  <div class="py-2">
    <div class="w-full">
      <div class="flex justify-between items-center">
        <div class="font-bold text-xl">Upcoming Shoots</div>
      </div>
      <div class="flex flex-col">
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="py-4 inline-block sm:px-6 lg:px-8 min-w-full">
            <div class="overflow-hidden rounded-md">
              <table class="max-w-screen w-full text-center">
                <thead class="border-b bg-gray-800">
                  <tr>
                    <th
                      @click="sortByHeader('id')"
                      scope="col"
                      class="text-sm text-white px-6 py-4 cursor-pointer"
                      :class="{ underline: !!headerSort['id'] }"
                    >
                      Id
                    </th>
                    <th
                      @click="sortByHeader('procedureType')"
                      scope="col"
                      class="text-sm text-white px-6 py-4 cursor-pointer"
                      :class="{ underline: !!headerSort['procedureType'] }"
                    >
                      Shoot Type
                    </th>
                    <th scope="col" class="text-sm text-white px-6 py-4">
                      Location
                    </th>
                    <th
                      @click="sortByHeader('startDate')"
                      scope="col"
                      class="text-sm text-white px-6 py-4 cursor-pointer"
                      :class="{ underline: !!headerSort['startDate'] }"
                    >
                      Start Date
                    </th>
                    <th
                      @click="sortByHeader('endDate')"
                      scope="col"
                      class="text-sm text-white px-6 py-4 cursor-pointer"
                      :class="{ underline: !!headerSort['endDate'] }"
                    >
                      End Date
                    </th>
                    <th scope="col" class="text-sm text-white px-6 py-4">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody v-if="modelValue.length > 0">
                  <template
                    v-for="(item, idx) in paginatedTableData"
                    :key="item.id"
                  >
                    <tr
                      class="bg-white border-b hover:bg-sky-50 cursor-pointer"
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
                              @click.stop="openModal(item.id)"
                              class="px-6 xl:px-8 py-2 text-white bg-blue-600 rounded-md shadow"
                              type="button"
                            >
                              Edit
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr
                      v-show="shownExtras[item.id]"
                      class="slide-down bg-white border-b"
                    >
                      <td colspan="6">
                        <table class="w-full">
                          <caption>
                            Equipments and XR Assets
                          </caption>
                          <thead>
                            <tr>
                              <td>Name</td>
                              <td>Type</td>
                              <td>Quantity</td>
                            </tr>
                          </thead>
                          <tbody>
                            <template v-if="extraItems[item.id]">
                              <tr
                                v-for="(extra, iidx) in extraItems[item.id]"
                                :key="'ext' + idx + iidx"
                              >
                                <td>{{ extra.name }}</td>
                                <td>{{ extra.type }}</td>
                                <td>{{ extra.quantity }}</td>
                              </tr>
                            </template>
                            <tr v-else>
                              <td colspan="3" class="w-full">
                                <svg
                                  class="spinner mx-auto my-3"
                                  viewBox="0 0 50 50"
                                >
                                  <circle
                                    class="path"
                                    cx="25"
                                    cy="25"
                                    r="20"
                                    fill="none"
                                    stroke-width="5"
                                  ></circle>
                                </svg>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </template>
                </tbody>
                <tfoot>
                  <tr>
                    <td colspan="9999">
                      <div class="flex flex-row justify-between py-4">
                        <div></div>
                        <div class="flex flex-row">
                          <button
                            :disabled="prevDisabled"
                            @click="loadPrev"
                            class="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
                          >
                            <span class="sr-only">Previous</span>
                            <!-- Heroicon name: mini/chevron-left -->
                            <svg
                              class="h-5 w-5"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                                clip-rule="evenodd"
                              />
                            </svg>
                          </button>
                          <button
                            @click="jumpToPage(idx - 1)"
                            v-for="idx in tableIdx"
                            :key="'pagination-' + idx"
                            :class="{
                              'border-blue-500 bg-blue-50':
                                currentPage + 1 === idx,
                              'border-gray-300 bg-white':
                                currentPage + 1 !== idx,
                            }"
                            class="relative inline-flex items-center border px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
                          >
                            {{ idx }}
                          </button>

                          <button
                            :disabled="nextDisabled"
                            @click="loadNext"
                            class="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
                          >
                            <span class="sr-only">Next</span>
                            <!-- Heroicon name: mini/chevron-right -->
                            <svg
                              class="h-5 w-5"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                                clip-rule="evenodd"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div
    v-if="isOpen"
    @click="closeModal"
    class="h-full fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50"
  >
    <div @click.stop="" class="bg-white p-5 w-96 rounded-md">
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
            class="px-6 py-2 text-white bg-blue-600 rounded-md shadow"
            type="button"
          >
            Save
          </button>
        </div>
        <div>
          <button
            @click="closeModal"
            class="px-6 py-2 text-white bg-red-600 rounded-md shadow"
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
import flattenDeep from "lodash/flattenDeep";
import orderBy from "lodash/orderBy";
import snakeCase from "lodash/snakeCase";
import DatePicker from "vue-tailwind-datepicker";
import dayjs from "dayjs";
import { editProcedure } from "@/composables/submitShoot";
import { getDocs, collection } from "firebase/firestore";

const itemsPerPage = 5;
export default {
  components: {
    DatePicker,
  },
  props: {
    modelValue: {
      default: () => [],
      type: Array,
    },
  },
  setup(props) {
    const isOpen = ref(false);
    const currentPage = ref(0);
    const paginatedTableData = ref([]);
    const prevDisabled = ref(false);
    const nextDisabled = ref(false);
    const tableIdx = ref(1);
    const form = reactive({
      location: null,
      startDate: [],
      endDate: [],
    });

    const runFunc = () => {
      paginatedTableData.value = props.modelValue.slice(
        currentPage.value * itemsPerPage,
        (currentPage.value + 1) * itemsPerPage
      );
      if (currentPage.value === 0) {
        prevDisabled.value = true;
      } else {
        prevDisabled.value = false;
      }
      if ((currentPage.value + 1) * itemsPerPage >= props.modelValue.length) {
        nextDisabled.value = true;
      } else {
        nextDisabled.value = false;
      }
      if (tableIdx.value == 1) {
        tableIdx.value = Math.floor(props.modelValue.length / itemsPerPage);
      }
    };

    const watchTableData = watch(() => props.modelValue, runFunc);
    const watchCurrentPage = watch(currentPage, runFunc);

    return {
      isOpen,
      form,
      watchCurrentPage,
      watchTableData,
      paginatedTableData,
      currentPage,
      prevDisabled,
      nextDisabled,
      tableIdx,
    };
  },
  data() {
    return {
      headerSort: {
        startDate: 1,
        endDate: 0,
        procedureType: 0,
        id: 0,
      },
      shownExtras: {},
      extraItems: {},
      formatter: {
        date: "YYYY-MM-DD HH:mm:ss",
        month: "MMM",
      },
      selectedIdx: null,
    };
  },
  emits: ["update:modelValue"],
  methods: {
    sortByHeader(header) {
      const b4Value = this.headerSort[header];
      Object.keys(this.headerSort).forEach((h) => {
        this.headerSort[h] = 0;
      });
      if (b4Value === 1) {
        this.headerSort[header] = -1;
      } else {
        this.headerSort[header] = 1;
      }

      const tableDupe = orderBy(
        this.modelValue,
        [snakeCase(header)],
        this.headerSort[header] > 0 ? "asc" : "desc"
      );
      this.$emit("update:modelValue", tableDupe);
    },
    showExtra(id) {
      let click = id in this.shownExtras;
      let clock = id in this.extraItems;
      this.shownExtras = {};
      if (!click) {
        this.shownExtras[id] = true;
      }
      if (!clock) {
        const clickedData = this.modelValue.find((v) => v.id === id);
        const shoot = clickedData.event_id;
        const equipmentsPromise = getDocs(collection(shoot, "equipments"));
        const assetsPromise = getDocs(collection(shoot, "assets"));

        const delay = new Promise((resolve) => {
          setTimeout(resolve, 500);
        });

        Promise.all([delay, equipmentsPromise, assetsPromise])
          // eslint-disable-next-line no-unused-vars
          .then(([d, ...v]) =>
            v.map((k) => Object.values(k.docs).map((j) => j.data()))
          )
          .then(flattenDeep)
          .then((items) => {
            this.extraItems[id] = items.map((item) => {
              const retVal = {};
              if ("equipment" in item) {
                retVal.type = "equipment";
                retVal.name = item.equipment.name;
                retVal.quantity = item.quantity;
              } else if ("asset" in item) {
                retVal.type = "asset";
                retVal.name = item.asset.name;
                retVal.quantity = item.quantity || 1;
              }
              return retVal;
            });
          });
      }
    },
    jumpToPage(pg) {
      this.currentPage = pg;
    },
    loadPrev() {
      this.currentPage -= 1;
    },
    loadNext() {
      this.currentPage += 1;
    },
    saveSchedule() {
      if (!isNil(this.selectedIdx)) {
        const data = {
          shoot: {
            id: this.modelValue[this.selectedIdx].event_id.id,
          },
          procedure: {
            id: this.modelValue[this.selectedIdx].id,
            procedure_start: new Date(this.form.startDate),
            procedure_end: new Date(this.form.endDate),
            procedure_type: this.modelValue[this.selectedIdx].procedure_type,
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
      this.selectedIdx = this.modelValue.findIndex((v) => v.id === id);
      this.form.location = this.modelValue[this.selectedIdx].location;
      this.form.startDate = [
        dayjs(this.modelValue[this.selectedIdx].start_date)
          .set("hour", 9)
          .set("minute", 0)
          .set("second", 0)
          .format(this.formatter.date),
      ];
      this.form.endDate = [
        dayjs(this.modelValue[this.selectedIdx].end_date)
          .set("hour", 9)
          .set("minute", 0)
          .set("second", 0)
          .format(this.formatter.date),
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

<style scoped>
.slide-down {
  transition: all 0.5s ease-in-out;
}
.spinner {
  animation: rotate 2s linear infinite;
  z-index: 2;
  width: 50px;
  height: 50px;
}

.spinner .path {
  stroke: #93bfec;
  stroke-linecap: round;
  animation: dash 1.5s ease-in-out infinite;
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
}
</style>
