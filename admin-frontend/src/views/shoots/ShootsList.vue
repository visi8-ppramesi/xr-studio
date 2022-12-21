<template>
  <!-- component -->
  <div class="text-gray-900 bg-gray-200 h-screen">
    <div class="p-4 flex">
      <h1 class="text-3xl">Shoots List</h1>
    </div>
    <div class="px-3 py-4 flex justify-center">
      <table class="w-full text-md bg-white shadow-md rounded mb-4">
        <tbody>
          <tr class="border-b">
            <div>
              <th class="p-3 px-8">Id</th>
              <th class="p-3 px-5">Location</th>
              <th class="p-3 px-5">Status History</th>
              <th class="p-3 px-5">Actions</th>
            </div>
          </tr>
          <tr
            v-for="item in shoots"
            :key="item.id"
            class="accordion border-b hover:bg-orange-100 bg-gray-100"
          >
            <div>
              <td class="p-3 px-5">
                <router-link
                  :to="{ name: 'shootsDetail', params: { shootId: item.id } }"
                >
                  {{ item.id }}
                </router-link>
              </td>
              <td class="p-3 px-5">
                {{ item.location }}
              </td>
              <td class="p-3 px-5">
                <select class="bg-transparent">
                  <option
                    v-for="items in item.current_statuses"
                    :key="items.id"
                    value="user"
                  >
                    {{ items }}
                  </option>
                </select>
              </td>
              <td class="p-3 px-5">
                <router-link
                  :to="{ name: 'subList', params: { shootId: item.id } }"
                >
                  <button
                    data-bs-toggle="collapse"
                    :data-bs-target="'#collapse' + item.id"
                    aria-expanded="true"
                    aria-controls="collapse"
                    type="button"
                    class="accordion-button bg-white text-blue-700 text-sm hover:text-white hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                  >
                    More
                  </button>
                </router-link>
              </td>
              <div class="accordion-item bg-white border border-gray-200">
                <div
                  :id="'collapse' + item.id"
                  class="accordion-collapse collapse"
                  aria-labelledby="headingOne"
                  data-bs-parent="#accordionExample"
                >
                  <div class="accordion-item bg-white border border-gray-200">
                    <h2 class="accordion-header mb-0" id="headingOne">
                      <router-link
                        :to="{
                          name: 'assetSubList',
                          params: { shootId: item.id },
                        }"
                      >
                        <button
                          class="accordion-button relative flex items-center w-full py-4 px-5 text-base text-gray-800 text-left bg-white border-0 rounded-none transition focus:outline-none"
                          type="button"
                          data-bs-toggle="collapse"
                          :data-bs-target="'#collapseOnes' + item.id"
                          aria-expanded="true"
                          aria-controls="collapseOnes"
                        >
                          <h1 class="text-md text-black font-bold">Assets</h1>
                        </button>
                      </router-link>
                    </h2>
                    <div
                      :id="'collapseOnes' + item.id"
                      class="accordion-collapse collapse"
                      aria-labelledby="headingOne"
                      data-bs-parent="#accordionExample"
                    >
                      <table
                        class="w-full text-md bg-white shadow-md rounded mb-4"
                      >
                        <tbody class="">
                          <tr>
                            <th class="text-center p-3 px-5">Id</th>
                            <th class="text-center p-3 px-5">Price</th>
                          </tr>
                          <tr v-for="item in assets" :key="item.id">
                            <td class="text-center p-3 px-5">{{ asset.id }}</td>
                            <td class="text-center p-3 px-5">
                              {{ asset.price }}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div class="accordion-item bg-white border border-gray-200">
                    <h2 class="accordion-header mb-0" id="headingOne">
                      <router-link
                        :to="{
                          name: 'equipmentsSubList',
                          params: { shootId: item.id },
                        }"
                      >
                        <button
                          class="accordion-button relative flex items-center w-full py-4 px-5 text-base text-gray-800 text-left bg-white border-0 rounded-none transition focus:outline-none"
                          type="button"
                          data-bs-toggle="collapse"
                          :data-bs-target="'#collapseTwo' + item.id"
                          aria-expanded="true"
                          aria-controls="collapseOnes"
                        >
                          <h1 class="text-md text-black font-bold">
                            Equipments
                          </h1>
                        </button>
                      </router-link>
                    </h2>
                    <div
                      :id="'collapseTwo' + item.id"
                      class="accordion-collapse collapse"
                      aria-labelledby="headingOne"
                      data-bs-parent="#accordionExample"
                    >
                      <table
                        class="w-full text-md bg-white shadow-md rounded mb-4"
                      >
                        <tbody class="">
                          <tr>
                            <th class="text-center p-3 px-5">Id</th>
                            <th class="text-center p-3 px-5">Price</th>
                          </tr>
                          <tr v-for="item in equipments" :key="item.id">
                            <td class="text-center p-3 px-5">{{ item.id }}</td>
                            <td class="text-center p-3 px-5">
                              {{ item.price }}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div class="accordion-item bg-white border border-gray-200">
                    <h2 class="accordion-header mb-0" id="headingOne">
                      <router-link
                        :to="{
                          name: 'proceduresSubList',
                          params: { shootId: item.id },
                        }"
                      >
                        <button
                          class="accordion-button relative flex items-center w-full py-4 px-5 text-base text-gray-800 text-left bg-white border-0 rounded-none transition focus:outline-none"
                          type="button"
                          data-bs-toggle="collapse"
                          :data-bs-target="'#collapseThree' + item.id"
                          aria-expanded="true"
                          aria-controls="collapseOnes"
                        >
                          <h1 class="text-md text-black font-bold">
                            Procedures
                          </h1>
                        </button>
                      </router-link>
                    </h2>
                    <div
                      :id="'collapseThree' + item.id"
                      class="accordion-collapse collapse"
                      aria-labelledby="headingOne"
                      data-bs-parent="#accordionExample"
                    >
                      <table
                        class="w-full text-md bg-white shadow-md rounded mb-4"
                      >
                        <tbody class="">
                          <tr>
                            <th class="text-center p-3 px-5">Id</th>
                            <th class="text-center p-3 px-5">Type</th>
                            <th class="text-center p-3 px-5">Price</th>
                            <th class="text-center p-3 px-5">Start Date</th>
                            <th class="text-center p-3 px-5">End Date</th>
                          </tr>
                          <tr v-for="item in procedures" :key="item.id">
                            <td class="text-center p-3 px-5">{{ item.id }}</td>
                            <td class="text-center p-3 px-5">
                              {{ item.procedure_type }}
                            </td>
                            <td class="text-center p-3 px-5">
                              {{ item.price }}
                            </td>
                            <td class="text-center p-3 px-5">
                              {{ item.procedure_start }}
                            </td>
                            <td class="text-center p-3 px-5">
                              {{ item.procedure_end }}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { Shoots } from "../../firebase/collections/shoots/";
import Assets from "../../firebase/collections/shoots/subcollections/assets";
import Equipments from "../../firebase/collections/shoots/subcollections/equipments";
import Procedures from "../../firebase/collections/shoots/subcollections/procedures";
export default {
  name: "ShootsList",
  data() {
    return {
      shoots: {},
      id: Math.random().toString(16).substring(2),
      assets: {},
      equipments: [],
      procedures: [],
      shootId: String,
    };
  },
  mounted() {
    this.fetchShoots();
    // if (this.$route.params.shootId) {
    //   this.fetchAssets();
    //   this.fetchEquipments();
    //   this.fetchProcedures();
    // };
    this.fetchAssets();
    this.fetchEquipments();
    this.fetchProcedures();
  },
  methods: {
    async fetchShoots() {
      const shoots = await Shoots.getShoots();
      this.shoots = shoots;
    },
    async fetchAssets() {
      this.assets = await Assets.getAssets([
        "shoots",
        this.$route.params.shootId,
        "assets",
      ]);
    },
    async fetchEquipments() {
      this.equipments = await Equipments.getEquipments([
        "shoots",
        this.$route.params.shootId,
        "equipments",
      ]);
    },
    async fetchProcedures() {
      this.procedures = await Procedures.getProcedures([
        "shoots",
        this.$route.params.shootId,
        "procedures",
      ]);
    },
  },
};
</script>
