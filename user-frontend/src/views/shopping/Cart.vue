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
            >{{ itemCount }} Items</span
          >
        </div>
        <div class="border-t mt-8">
          <div
            class="flex font-semibold justify-between py-6 text-sm uppercase"
          >
            <span id="cart-total-cost">Total cost</span>
            <span id="cart-total-amount">{{ cartTotalAmount() }}</span>
          </div>
          <button
            v-if="!shootingScheduled"
            id="cart-go-to-schedule"
            class="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full"
            @click="goToSchedule"
          >
            Schedule Shoot
          </button>
          <button
            v-else
            :disabled="submitted"
            id="cart-submit"
            class="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full relative"
            @click="submit"
          >
            <span class="button__text">Submit</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import isArray from "lodash/isArray";
import { useAuthStore } from "@/store/auth";
import { useCartStore } from "@/store/cart";
import { createShoot } from "@/composables/submitShoot";
import { mapState } from "pinia";
// import SummaryButton from "@/components/shopping/SummaryButton.vue";
import CartItem from "@/components/shopping/CartItem.vue";
import isNil from "lodash/isNil";
import isEmpty from "lodash/isEmpty";
export default {
  setup() {
    const cartStore = useCartStore();
    const shootingScheduled = !isEmpty(cartStore.getShootings());
    return {
      cartStore,
      shootingScheduled,
    };
  },
  components: {
    // SummaryButton,
    CartItem,
  },
  data() {
    return {
      total: "",
      submitted: false,
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
    ...mapState(useAuthStore, ["isLoggedIn"]),
  },
  methods: {
    async submit() {
      this.submitted = true;
      document
        .getElementById("cart-submit")
        .classList.toggle("button--loading");
      if (!isNil(this.isLoggedIn) && this.isLoggedIn) {
        const cart = this.getCart();
        try {
          const createShootResult = await createShoot(cart);
          this.cartStore.clearCart();
          this.cartStore.submissionResult.push(createShootResult);
          document
            .getElementById("cart-submit")
            .classList.toggle("button--loading");
          this.submitted = false;
          this.$router.push({ name: "CheckoutSuccess" });
        } catch (error) {
          //throw error here
          console.error(error);
        }
      } else {
        this.$router.push({ name: "Login" });
      }
    },
    getCart() {
      const currentCart = JSON.parse(localStorage.getItem("cart") || "{}");
      const groupedCart = currentCart.reduce((acc, v) => {
        if (isNil(acc[v.type])) {
          acc[v.type] = [];
        }
        acc[v.type].push(v);
        return acc;
      }, {});
      return groupedCart;
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
    goToSchedule() {
      this.$router.push({ name: "RegisterShoot" });
    },
  },
};
</script>

<style scoped>
.button--loading .button__text {
  visibility: hidden;
  opacity: 0;
}

.button--loading::after {
  content: "";
  position: absolute;
  width: 16px;
  height: 16px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  border: 4px solid transparent;
  border-top-color: #ffffff;
  border-radius: 50%;
  animation: button-loading-spinner 1s ease infinite;
}

@keyframes button-loading-spinner {
  from {
    transform: rotate(0turn);
  }

  to {
    transform: rotate(1turn);
  }
}
</style>
