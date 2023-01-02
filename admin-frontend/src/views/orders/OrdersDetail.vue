<template>
  <div class="text-gray-900 bg-gray-200 h-screen w-full">
    <div class="p-4 flex">
      <h1 class="text-3xl">Orders Detail</h1>
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
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr class="bg-white border-b">
                  <td
                    class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                  >
                    {{ orders.id }}
                  </td>
                  <td
                    class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                  >
                    <div class="relative">
                      <div>
                        {{ orders.created_date }}
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
export default {
  name: "OrdersDetail",
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
      this.orders = await Orders.getOrdersId(this.$route.params.orderId);
      console.log(this.orders);
    },
  },
};
</script>
