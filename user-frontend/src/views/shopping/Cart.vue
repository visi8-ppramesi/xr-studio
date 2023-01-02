<template>
  <div class="container mx-auto mt-10">
    <div class="flex shadow-md my-10">
      <div class="w-3/4 bg-white px-10 py-10">
        <div class="flex justify-between border-b pb-8">
          <h1 id="cart-title" class="font-semibold text-2xl">Shopping Cart</h1>
          <h2 id="cart-count" class="font-semibold text-2xl">
            {{ itemCount }} Items
          </h2>
        </div>
        <div class="flex mt-10 mb-5">
          <h3
            id="cart-title-1"
            class="font-semibold text-gray-600 text-xs uppercase w-2/5"
          >
            Product Details
          </h3>
          <h3
            id="cart-title-2"
            class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center"
          >
            Quantity
          </h3>
          <h3
            id="cart-title-3"
            class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center"
          >
            Price
          </h3>
          <h3
            id="cart-title-4"
            class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center"
          >
            Total
          </h3>
        </div>

        <div
          v-for="(item, idx) in cart"
          :key="'cart-item-' + idx"
          class="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5"
        >
          <CartItem :item="item" />
        </div>

        <router-link
          id="cart-continue"
          to="/equipments"
          class="flex font-semibold text-indigo-600 text-sm mt-10"
        >
          <svg
            class="fill-current mr-2 text-indigo-600 w-4"
            viewBox="0 0 448 512"
          >
            <path
              d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z"
            />
          </svg>
          Continue Shopping
        </router-link>
      </div>

      <div id="summary" class="w-1/4 px-8 py-10">
        <h1 id="cart-summary" class="font-semibold text-2xl border-b pb-8">
          Order Summary
        </h1>
        <div class="flex justify-between mt-10 mb-5">
          <span id="cart-count-items" class="font-semibold text-sm uppercase"
            >Items {{ itemCount }}</span
          >
        </div>
        <div class="border-t mt-8">
          <div
            class="flex font-semibold justify-between py-6 text-sm uppercase"
          >
            <span id="cart-total-cost">Total cost</span>
            <span id="cart-total-amount">${{ cartTotalAmount() }}</span>
          </div>
          <button
            id="cart-checkout"
            class="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import isArray from "lodash/isArray";
import { useCartStore } from "../../store/cart";
import { mapState } from "pinia";
// import SummaryButton from "@/components/shopping/SummaryButton.vue";
import CartItem from "@/components/shopping/CartItem.vue";
import isNil from "lodash/isNil";
export default {
  setup() {
    const cartStore = useCartStore();
    return {
      cartStore,
    };
  },
  components: {
    // SummaryButton,
    CartItem,
  },
  data() {
    return {
      total: "",
    };
  },
  props: {
    count: {
      type: Number,
      default: 1,
    },
    description: {
      type: String,
      default: "",
    },
    id: {
      type: String,
    },
    name: {
      type: String,
    },
    price: {
      type: Number,
    },
    type: {
      type: String,
    },
    imageUrl: {
      type: [String, Array],
    },
    itemData: {
      type: Object,
      default: () => ({}),
    },
    itemType: {
      type: String,
      default: "item",
    },
  },
  computed: {
    itemImageUrl() {
      return isArray(this.imageUrl) ? this.imageUrl[0] : this.imageUrl;
    },
    ...mapState(useCartStore, ["itemCount", "cart"]),
  },
  methods: {
    submit() {
      const currentCart = JSON.parse(localStorage.getItem("cart") || "{}");
      // eslint-disable-next-line no-unused-vars
      const groupedCart = currentCart.reduce((acc, v) => {
        if (isNil(acc[v.type])) {
          acc[v.type] = [];
        }
        acc[v.type].push(v);
        return acc;
      }, {});
    },
    addToCart() {
      this.cartStore.addItem({ ...this.itemData, type: this.itemType });
    },
    cartTotalAmount() {
      const total = this.cart.reduce((acc, item) => {
        return acc + item.count * item.price;
      }, 0);

      return this.formatters.currency(total);
    },
  },
};
</script>
