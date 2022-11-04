<template>
  <section
    class="px-6 py-12 md:px-12 bg-gray-100 text-gray-800 text-center lg:text-left"
  >
    <CartItem />
  </section>
  <div></div>
</template>

<script>
import { mapState } from "pinia";
import { useCartStore } from "@/store/cart";
import CartItem from "@/components/shopping/CartItem.vue";

export default {
  setup() {
    const cartStore = useCartStore();
    return {
      cartStore,
    };
  },
  components: {
    CartItem,
  },
  computed: {
    ...mapState(useCartStore, ["cart"]),
  },
};
</script>
