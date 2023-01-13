<template>
  <div class="text-gray-900 bg-gray-200 h-full w-full">
    <div class="p-4 flex">
      <h1 class="text-3xl">Shoots Detail</h1>
    </div>
    <div class="flex flex-col">
      <div class="overflow-x-auto">
        <div class="py-4 inline-block min-w-full">
          <div class="overflow-hidden">
            <table class="min-w-full text-center">
              <thead class="border-b bg-gray-800">
                <tr>
                  <th
                    scope="col"
                    class="text-sm font-medium text-white px-6 py-4"
                  >
                    Id
                  </th>
                  <th
                    scope="col"
                    class="text-sm font-medium text-white px-6 py-4"
                  >
                    Location
                  </th>
                  <th
                    scope="col"
                    class="text-sm font-medium text-white px-6 py-4"
                  >
                    Current Status Last
                  </th>
                  <th
                    scope="col"
                    class="text-sm font-medium text-white px-6 py-4"
                  >
                    Start Date
                  </th>
                  <th
                    scope="col"
                    class="text-sm font-medium text-white px-6 py-4"
                  >
                    End Date
                  </th>
                  <th
                    scope="col"
                    class="text-sm font-medium text-white px-6 py-4"
                  >
                    Order
                  </th>
                  <th
                    scope="col"
                    class="text-sm font-medium text-white px-6 py-4"
                  >
                    Procedure Type
                  </th>
                  <th
                    scope="col"
                    class="text-sm font-medium text-white px-6 py-4"
                  >
                    Status History
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr class="bg-white border-b">
                  <td
                    class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                  >
                    {{ shoots.id }}
                  </td>
                  <td
                    class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                  >
                    <div class="relative">
                      <div
                        class="h-[7rem] mx-4 p-2 outline-none border border-gray-300 rounded-t-md focus:border-gray-400 overflow-hidden overflow-y-auto"
                        contenteditable
                        id="editor"
                      >
                        {{ shoots.location }}
                      </div>
                    </div>
                  </td>
                  <td
                    class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                  >
                    <select class="bg-transparent">
                      <option
                        v-for="items in shoots.status"
                        :key="items.id"
                        value="user"
                      >
                        {{ items }}
                      </option>
                    </select>
                  </td>
                  <td
                    class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                  >
                    {{ shoots.locked_in_start_date }}
                  </td>
                  <td
                    class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                  >
                    {{ shoots.locked_in_end_date }}
                  </td>
                  <td
                    class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                  >
                    {{ orders.created_date }}
                  </td>
                  <td
                    class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                  >
                    {{ procedure_type.name }}
                  </td>
                  <td
                    class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                  >
                    <select class="bg-transparent">
                      <option
                        v-for="items in shoots.status_history"
                        :key="items.id"
                        value="user"
                      >
                        {{ items.status }}
                      </option>
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <div class="p-4 flex">
      <h1 class="text-3xl">Assets List</h1>
    </div>
    <div class="flex flex-col">
      <div class="overflow-x-auto">
        <div class="py-4 inline-block min-w-full">
          <div class="overflow-hidden">
            <table class="min-w-full text-center">
              <thead class="border-b bg-gray-800">
                <tr>
                  <th
                    scope="col"
                    class="text-sm font-medium text-white px-6 py-4"
                  >
                    Id
                  </th>
                  <th
                    scope="col"
                    class="text-sm font-medium text-white px-6 py-4"
                  >
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="item in assets"
                  :key="item.id"
                  class="bg-white border-b"
                >
                  <td
                    class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                  >
                    {{ item.id }}
                  </td>
                  <td
                    class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                  >
                    {{ item.price }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <div class="p-4 flex">
      <h1 class="text-3xl">Equipments List</h1>
    </div>
    <div class="flex flex-col">
      <div class="overflow-x-auto">
        <div class="py-4 inline-block min-w-full">
          <div class="overflow-hidden">
            <table class="min-w-full text-center">
              <thead class="border-b bg-gray-800">
                <tr>
                  <th
                    scope="col"
                    class="text-sm font-medium text-white px-6 py-4"
                  >
                    Id
                  </th>
                  <th
                    scope="col"
                    class="text-sm font-medium text-white px-6 py-4"
                  >
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="item in equipments"
                  :key="item.id"
                  class="bg-white border-b"
                >
                  <td
                    class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                  >
                    {{ item.id }}
                  </td>
                  <td
                    class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                  >
                    {{ item.price }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <div class="p-4 flex">
      <h1 class="text-3xl">Procedures List</h1>
    </div>
    <div class="flex flex-col">
      <div class="overflow-x-auto">
        <div class="py-4 inline-block min-w-full">
          <div class="overflow-hidden">
            <table class="min-w-full text-center">
              <thead class="border-b bg-gray-800">
                <tr>
                  <th
                    scope="col"
                    class="text-sm font-medium text-white px-6 py-4"
                  >
                    Id
                  </th>
                  <th
                    scope="col"
                    class="text-sm font-medium text-white px-6 py-4"
                  >
                    Price
                  </th>
                  <th
                    scope="col"
                    class="text-sm font-medium text-white px-6 py-4"
                  >
                    Procedure Data
                  </th>
                  <th
                    scope="col"
                    class="text-sm font-medium text-white px-6 py-4"
                  >
                    Procedure Start
                  </th>
                  <th
                    scope="col"
                    class="text-sm font-medium text-white px-6 py-4"
                  >
                    Procedure End
                  </th>
                  <th
                    scope="col"
                    class="text-sm font-medium text-white px-6 py-4"
                  >
                    Procedure Type
                  </th>
                  <th
                    scope="col"
                    class="text-sm font-medium text-white px-6 py-4"
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="item in procedures"
                  :key="item.id"
                  class="bg-white border-b"
                >
                  <td
                    class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                  >
                    {{ item.id }}
                  </td>
                  <td
                    class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                  >
                    {{ item.price }}
                  </td>
                  <td
                    class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                  >
                    <div class="relative">
                      <div
                        class="h-[7rem] mx-4 p-2 outline-none border border-gray-300 rounded-t-md focus:border-gray-400 overflow-hidden overflow-y-auto"
                        contenteditable
                        id="editor"
                      >
                        {{ item.procedure_data }}
                      </div>
                    </div>
                  </td>
                  <td
                    class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                  >
                    {{ item.procedure_start }}
                  </td>
                  <td
                    class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                  >
                    {{ item.procedure_end }}
                  </td>
                  <td
                    class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                  >
                    <div class="relative">
                      <div
                        class="h-[7rem] mx-4 p-2 outline-none border border-gray-300 rounded-t-md focus:border-gray-400 overflow-hidden overflow-y-auto"
                        contenteditable
                        id="editor"
                      >
                        {{ item.procedure_type }}
                      </div>
                    </div>
                  </td>
                  <td
                    class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                  >
                    <div class="relative">
                      <div
                        class="h-[7rem] mx-4 p-2 outline-none border border-gray-300 rounded-t-md focus:border-gray-400 overflow-hidden overflow-y-auto"
                        contenteditable
                        id="editor"
                      >
                        {{ item.status }}
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
</template>

<script>
import { Orders } from "@/firebase/collections/orders";
import { ProcedureTypes } from "@/firebase/collections/procedure-types";
import { Shoots } from "../../firebase/collections/shoots/";
import Assets from "../../firebase/collections/shoots/subcollections/assets";
import Equipments from "../../firebase/collections/shoots/subcollections/equipments";
import Procedures from "../../firebase/collections/shoots/subcollections/procedures";
export default {
  name: "ShootsDetail",
  data() {
    return {
      shoots: {},
      assets: {},
      equipments: {},
      procedures: {},
      orders: {},
      procedure_type: {},
    };
  },
  mounted() {
    this.fetchShoots();
    this.fetchAssets();
    this.fetchEquipments();
    this.fetchProcedures();
    this.fetchOrders();
    this.fetchProcedureTypes();
  },
  methods: {
    async fetchOrders(orderId) {
      this.orders = await Orders.getOrdersId(orderId);
    },
    async fetchProcedureTypes(procedureId) {
      this.procedure_type = await ProcedureTypes.getProcedureTypes(procedureId);
    },
    async fetchShoots() {
      this.shoots = await Shoots.getShootsDetail(this.$route.params.shootId);
      const orderId = this.shoots.order.id; //getReference order
      const procedureId = this.shoots.procedure_type.id; //getReference procedure
      this.fetchOrders(orderId);
      this.fetchProcedureTypes(procedureId);
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
