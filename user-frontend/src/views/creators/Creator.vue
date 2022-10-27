<template>
  <section class="mx-6 md:mx-12 py-10 flex pt-8">
    <CreatorLeftSection />
    <CreatorRightSection />
  </section>
</template>

<script>
import CreatorLeftSection from "@/components/creators/CreatorLeftSection.vue";
import CreatorRightSection from "@/components/creators/CreatorRightSection.vue";
export default {
  name: "scene",
  components: {
    CreatorLeftSection,
    CreatorRightSection,
  },
  data() {
    return {};
  },
  created() {},
};
</script>

<style scoped></style>
