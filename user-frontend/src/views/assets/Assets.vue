<template>
  <div class="assets min-h-screen">
    <AssetsSidenav @search="search" />
    <AssetsContent ref="content" :assets="assets" @loadMore="loadMore" />
  </div>
</template>

<script>
import AssetsSidenav from "../../components/assets/AssetsSidenav.vue";
import AssetsContent from "../../components/assets/AssetsContent.vue";
import { Assets } from "../../firebase/collections/assets/";
// import { buildQueries, paginationQuery } from "@/composables/queries";
import { listFetcher } from "@/composables/listFetcher";
export default {
  name: "assets",
  components: {
    AssetsSidenav,
    AssetsContent,
  },
  setup() {
    const {
      items: assets,
      query,
      getItems: getAssets,
      search,
      loadMore,
      content,
    } = listFetcher(Assets);

    return { assets, query, getAssets, search, loadMore, content };
  },
  // mounted() {
  //   this.getAssets();
  // },
  // methods: {
  //   search(data) {
  //     const query = buildQueries(data.query);
  //     console.log(query);
  //     this.query = query;
  //     const test = query.findIndex(
  //       (v) =>
  //         v.type === "where" &&
  //         ["<", "<=", "!=", "not-in", ">", ">="].includes(v._op)
  //     );
  //     console.log(test);
  //     this.getAssets(this.query, false);
  //   },
  //   loadMore() {
  //     this.getAssets(this.query, true);
  //   },
  //   async getAssets(query = [], loadMore = false) {
  //     let pQuery;
  //     if (!loadMore) {
  //       this.assets = [];
  //       pQuery = paginationQuery(12, "name", null, query);
  //     } else {
  //       const lastDoc = this.assets[this.assets.length - 1].doc;
  //       pQuery = paginationQuery(12, "name", lastDoc, query);
  //     }

  //     const [currentCount, assets] = await Promise.all([
  //       Assets.getCount(pQuery),
  //       Assets.getDocuments(pQuery),
  //     ]);
  //     if (currentCount < 12) {
  //       this.$refs.assetsContent.disableLoadMore();
  //     }
  //     this.assets.push(...assets);
  //   },
  // },
  // data() {
  //   return {
  //     assets: [],
  //     query: [],
  //   };
  // },
};
</script>

<style scoped></style>
