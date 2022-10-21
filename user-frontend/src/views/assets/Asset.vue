<template>
  <section class="mx-6 md:mx-12 py-10 flex pt-8">
    <AssetLeftSection />
    <AssetRightSection />
  </section>
</template>

<script>
import AssetLeftSection from "@/components/assets/AssetLeftSection.vue";
import AssetRightSection from "@/components/assets/AssetRightSection.vue";
export default {
  name: "scene",
  components: {
    AssetLeftSection,
    AssetRightSection,
  },
  data() {
    return {
      showNewComment: false,
    };
  },
  created() {
    this.showNewComment = Math.random() > 0.5;
  },
};
</script>

<style scoped></style>
