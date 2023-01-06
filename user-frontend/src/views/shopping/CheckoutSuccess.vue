<template>
  <div>
    <h2 class="text-3xl font-bold mt-12 text-center">
      Shoot schedule was submitted.<br />We will get back to you as soon as
      possible.<br />
      Thanks!
    </h2>
    <h3 class="text-lg font-bold mt-6 mb-12 text-center">
      Redirecting in 10 seconds...
    </h3>
  </div>
</template>

<script>
import { useCartStore } from "@/store/cart";
export default {
  setup() {
    const cartStore = useCartStore();
    console.log(cartStore.submissionResult);
    return {
      cartStore,
    };
  },
  mounted() {
    setTimeout(() => {
      this.$router.push({ name: "Home" });
    }, 10 * 1000);
  },
};
</script>

<style></style>
