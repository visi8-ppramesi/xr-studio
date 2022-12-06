<template>
  <section class="mx-6 md:mx-12 py-10 flex pt-8">
    <AssetLeftSection :asset="asset" />
    <AssetRightSection />
  </section>
</template>

<script>
import AssetLeftSection from "../../components/assets/AssetLeftSection.vue";
import AssetRightSection from "../../components/assets/AssetRightSection.vue";
import { Assets } from "../../firebase/collections/assets/";
export default {
  name: "scene",
  components: {
    AssetLeftSection,
    AssetRightSection,
  },
  data() {
    return {
      showNewComment: false,
      asset: {},
    };
  },
  created() {
    this.showNewComment = Math.random() > 0.5;
    this.getAsset();
  },
  methods: {
    async getAsset() {
      this.asset = await Assets.getDocument(this.$route.params.id);
    },
  },
};
</script>

<style scoped></style>
