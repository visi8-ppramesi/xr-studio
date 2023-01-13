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
};
</script>

<style scoped></style>
