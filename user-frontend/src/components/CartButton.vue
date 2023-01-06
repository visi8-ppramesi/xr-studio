<template>
  <button
    class="flex items-center text-sm h-8 mr-2 md:mr-8 text-gray-600"
    @click="addToCart"
  >
    <svg
      class="w-4 h-4 mr-1 text-gray-600"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 576 512"
    >
      <path
        fill="#9CA3AF"
        d="M24 0C10.7 0 0 10.7 0 24S10.7 48 24 48H76.1l60.3 316.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24-10.7 24-24s-10.7-24-24-24H179.9l-9.1-48h317c14.3 0 26.9-9.5 30.8-23.3l54-192C578.3 52.3 563 32 541.8 32H122l-2.4-12.5C117.4 8.2 107.5 0 96 0H24zM176 512c26.5 0 48-21.5 48-48s-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48zm336-48c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48z"
      />
    </svg>
    Add To Cart
  </button>

  <!-- <transition class="inset-0 pt-3" name="fade">
    <div class="rounded-xl absolute inset-x-0 bottom-0" v-if="isModalVisible">
      <div
        class="bg-green-400 text-white w-fit p-3 relative mx-auto my-auto rounded-xl shadow-lg bg-white px-5 py-2 flex items-center justify-between"
      >
        <div class="items-center font-bold px-4 py-2">Item Added</div>
        <svg
          @click="closeModal"
          xmlns="http://www.w3.org/2000/svg"
          class="icon icon-tabler icon-tabler-x"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </div>
    </div>
  </transition> -->
</template>

<script>
import { useCartStore } from "../store/cart";
export default {
  data() {
    return {
      // isOpen: false,
    };
  },
  setup() {
    const cartStore = useCartStore();

    return { cartStore };
  },
  // computed: {
  //   isModalVisible() {
  //     return this.isOpen;
  //   },
  // },
  props: {
    itemData: {
      type: Object,
      default: () => ({}),
    },
    itemType: {
      type: String,
      default: "item",
    },
  },
  methods: {
    addToCart() {
      this.cartStore.addItem({ ...this.itemData, type: this.itemType });
      this.$toast.open({
        message: "Item Added",
        position: "bottom",
        type: "success",
        duration: 5000,
        dismissible: true,
      });
      // this.isOpen = !this.isOpen;
    },
    // closeModal() {
    //   this.isOpen = !this.isOpen;
    // },
  },
};
</script>

<style>
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 500ms ease-out;
}
</style>
