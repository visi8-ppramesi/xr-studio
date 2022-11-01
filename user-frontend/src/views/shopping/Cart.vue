<template>
  <section
    class="px-6 py-12 md:px-12 bg-gray-100 text-gray-800 text-center lg:text-left"
  >
    <CartItem
      v-for="(item, idx) in cart"
      :key="'cart-item-' + idx"
      :count="item.count"
      :description="item.description"
      :id="item.id"
      :name="item.name"
      :price="item.price"
      :type="item.type"
      :imageUrl="item.image_url"
    />
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
