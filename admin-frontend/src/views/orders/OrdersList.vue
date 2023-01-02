<template>
  <div class="text-gray-900 bg-gray-200 h-screen">
    <div class="p-4 flex">
      <h1 class="text-3xl">Orders List</h1>
    </div>
    <div class="px-3 py-4 flex justify-center">
      <table class="w-full text-md bg-white shadow-md rounded mb-4">
        <tbody>
          <tr class="border-b">
            <th class="p-3 px-8">Id</th>
            <th class="p-3 px-5">Date</th>
          </tr>
          <tr
            v-for="item in orders"
            :key="item.id"
            class="accordion border-b hover:bg-orange-100 bg-gray-100"
          >
            <td class="p-3 px-5">
              <router-link
                :to="{ name: 'ordersDetail', params: { orderId: item.id } }"
              >
                {{ item.id }}
              </router-link>
            </td>
            <td class="p-3 px-5">
              {{ item.created_date }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { Orders } from "../../firebase/collections/orders/";
export default {
  name: "OrdersList",
  data() {
    return {
      orders: {},
    };
  },
  mounted() {
    this.fetchOrders();
  },
  methods: {
    async fetchOrders() {
      const orders = await Orders.getOrders();
      this.orders = orders;
    },
  },
};
</script>
