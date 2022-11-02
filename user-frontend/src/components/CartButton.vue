<template>
  <button
    v-if="type === 'cart'"
    class="flex items-center text-sm h-8 mr-2 md:mr-8 text-gray-600"
    @click="addToCart"
  >
    <svg
      class="w-4 h-4 mr-1 text-gray-600"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 576 512"
    >
      <!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
      <path
        fill="#9CA3AF"
        d="M24 0C10.7 0 0 10.7 0 24S10.7 48 24 48H76.1l60.3 316.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24-10.7 24-24s-10.7-24-24-24H179.9l-9.1-48h317c14.3 0 26.9-9.5 30.8-23.3l54-192C578.3 52.3 563 32 541.8 32H122l-2.4-12.5C117.4 8.2 107.5 0 96 0H24zM176 512c26.5 0 48-21.5 48-48s-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48zm336-48c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48z"
      />
    </svg>
    Add To Cart
  </button>

  <button
    v-if="type === 'summaryRemove'"
    class="flex items-center text-sm h-8 text-gray-600"
    @click="removeItem"
  >
    <svg class="fill-current text-gray-600 w-3" viewBox="0 0 448 512">
      <path
        d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"
      />
    </svg>
  </button>

  <button
    v-if="type === 'summaryAdd'"
    class="flex items-center text-sm h-8 text-gray-600"
    @click="addToCart"
  >
    <svg class="fill-current text-gray-600 w-3" viewBox="0 0 448 512">
      <path
        d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"
      />
    </svg>
  </button>
</template>

<script>
import { useCartStore } from "@/store/cart";
import { mapState } from "pinia";
export default {
  setup() {
    const cartStore = useCartStore();

    return { cartStore };
  },
  props: {
    itemData: {
      type: Object,
      default: () => ({}),
    },
    itemType: {
      type: String,
      default: "item",
    },
    type: {
      type: String,
    },
    id: {
      type: String,
    },
    name: {
      type: String,
    },
  },
  methods: {
    addToCart() {
      this.cartStore.addItem({ ...this.itemData, type: this.itemType });
    },
    removeItem() {
      // const cartId = this.cart.reduce((item) => {
      //   return item.id;
      // });
      this.cartStore.decreaseItemQty(this.itemData.id);
    },
  },
  computed: {
    ...mapState(useCartStore, ["cart"]),
  },
};
</script>
