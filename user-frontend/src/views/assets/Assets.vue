<template>
  <div class="assets">
    <AssetsSidenav />
    <AssetsContent
      ref="equipmentsContent"
      :assets="assets"
      @loadMore="loadMore"
    />
  </div>
</template>

<script>
import AssetsSidenav from "@/components/assets/AssetsSidenav.vue";
import AssetsContent from "@/components/assets/AssetsContent.vue";
import { Assets } from "@/firebase/collections/assets/";
import { paginationQuery } from "@/utils/queries";
export default {
  name: "assets",
  components: {
    AssetsSidenav,
    AssetsContent,
  },
  mounted() {
    this.getAssets();
  },
  methods: {
    search() {},
    loadMore() {
      this.getAssets(true);
    },
    // async getAssets() {
    //   this.assets = await Assets.getDocuments();
    // },
    async getAssets(loadMore = false) {
      let pQuery;
      if (!loadMore) {
        pQuery = paginationQuery(12, "name");
      } else {
        const lastDoc = this.assets[this.assets.length - 1].doc;
        pQuery = paginationQuery(12, "name", lastDoc);
      }
      const currentCount = await Assets.getCount(pQuery);
      if (currentCount < 12) {
        this.$refs.equipmentsContent.disableLoadMore();
      }
      const assets = await Assets.getDocuments(pQuery);
      this.assets.push(...assets);
    },
  },
  data() {
    return {
      assets: [],
    };
  },
};
</script>

<style scoped></style>
