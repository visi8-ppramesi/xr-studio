<template>
  <section class="px-6 py-12 md:px-12 bg-gray-100 text-gray-800">
    <h2 class="text-3xl font-bold mb-12 text-center">Confirm Shoot Schedule</h2>
    <div class="flex flex-col justify-center items-center">
      <table class="display">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Scheduled Start</th>
            <th>Scheduled End</th>
            <th>Estimated Price</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(shoot, idx) in processedShoots" :key="'shoot-' + idx">
            <td>{{ shoot.id }}</td>
            <td>{{ shoot.name }}</td>
            <td>{{ formatters.absoluteDate(shoot.startDate) }}</td>
            <td>{{ formatters.absoluteDate(shoot.endDate) }}</td>
            <td>{{ formatters.currency(shoot.price) }}</td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td class="pt-4">Estimated Total Price:</td>
            <td class="pt-4">
              {{
                formatters.currency(
                  shoots.reduce((acc, v) => (acc += v.price), 0)
                )
              }}
            </td>
          </tr>
        </tbody>
      </table>
      <div class="mt-6">
        <button
          class="inline-block mr-2 px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
          @click="cancel"
        >
          Cancel
        </button>
        <!-- <button
          class="inline-block mr-2 px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
          @click="continueShopping"
        >
          Confirm and Continue Shopping
        </button> -->
        <button
          class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
          @click="continueCheckout"
        >
          Confirm and Checkout
        </button>
      </div>
    </div>
  </section>
</template>

<script>
// import DataTable from "datatables.net-vue3";
import { useCartStore } from "@/store/cart";
import { vedhg } from "@/utils/dateRangeHash";
export default {
  //   components: {
  //     DataTable,
  //   },
  setup() {
    const myCart = useCartStore();
    return {
      cart: myCart,
      shoots: myCart.cart.filter((v) => v.type == "studio"),
      processedShoots: myCart.cart
        .filter((v) => v.type == "studio")
        .map((shoot) => {
          const dupe = { ...shoot };
          const [startDate, endDate] = vedhg.decodeHash(shoot.id);
          dupe.startDate = startDate;
          dupe.endDate = endDate;
          return dupe;
        }),
    };
  },
  methods: {
    continueCheckout() {
      this.$router.push({ name: "Cart" });
    },
    continueShopping() {
      this.$router.push({ name: "Assets" });
    },
    cancel() {
      this.cart.clearShootings();
      this.$router.push({ name: "RegisterShoot" });
    },
    test() {},
  },
};
</script>

<style scoped></style>
