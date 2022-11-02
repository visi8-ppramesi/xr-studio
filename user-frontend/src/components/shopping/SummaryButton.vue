<template>
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
