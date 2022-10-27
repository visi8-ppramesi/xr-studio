<template>
  <div class="assets">
    <AssetsSidenav />
    <AssetsContent :assets="assets" />
  </div>
</template>

<script>
import AssetsSidenav from "@/components/assets/AssetsSidenav.vue";
import AssetsContent from "@/components/assets/AssetsContent.vue";
import { Assets } from "@/firebase/collections/assets/";
export default {
  name: "assets",
  components: {
    AssetsSidenav,
    AssetsContent,
  },
  created() {
    this.getAssets();
  },
  methods: {
    async getAssets() {
      this.assets = await Assets.getDocuments();
    },
  },
  data() {
    return {
      assets: [
        {
          title: "Test test test",
          image_url: "https://picsum.photos/200",
          likes: 100,
          comments: 100,
          views: 100,
        },
        {
          title: "Test test test",
          image_url: "https://picsum.photos/200",
          likes: 100,
          comments: 100,
          views: 100,
        },
        {
          title: "Test test test",
          image_url: "https://picsum.photos/200",
          likes: 100,
          comments: 100,
          views: 100,
        },
        {
          title: "Test test test",
          image_url: "https://picsum.photos/200",
          likes: 100,
          comments: 100,
          views: 100,
        },
        {
          title: "Test test test",
          image_url: "https://picsum.photos/200",
          likes: 100,
          comments: 100,
          views: 100,
        },
        {
          title: "Test test test",
          image_url: "https://picsum.photos/200",
          likes: 100,
          comments: 100,
          views: 100,
        },
        {
          title: "Test test test",
          image_url: "https://picsum.photos/200",
          likes: 100,
          comments: 100,
          views: 100,
        },
        {
          title: "Test test test",
          image_url: "https://picsum.photos/200",
          likes: 100,
          comments: 100,
          views: 100,
        },
        {
          title: "Test test test",
          image_url: "https://picsum.photos/200",
          likes: 100,
          comments: 100,
          views: 100,
        },
        {
          title: "Test test test",
          image_url: "https://picsum.photos/200",
          likes: 100,
          comments: 100,
          views: 100,
        },
        {
          title: "Test test test",
          image_url: "https://picsum.photos/200",
          likes: 100,
          comments: 100,
          views: 100,
        },
        {
          title: "Test test test",
          image_url: "https://picsum.photos/200",
          likes: 100,
          comments: 100,
          views: 100,
        },
        {
          title: "Test test test",
          image_url: "https://picsum.photos/200",
          likes: 100,
          comments: 100,
          views: 100,
        },
        {
          title: "Test test test",
          image_url: "https://picsum.photos/200",
          likes: 100,
          comments: 100,
          views: 100,
        },
        {
          title: "Test test test",
          image_url: "https://picsum.photos/200",
          likes: 100,
          comments: 100,
          views: 100,
        },
        {
          title: "Test test test",
          image_url: "https://picsum.photos/200",
          likes: 100,
          comments: 100,
          views: 100,
        },
        {
          title: "Test test test",
          image_url: "https://picsum.photos/200",
          likes: 100,
          comments: 100,
          views: 100,
        },
        {
          title: "Test test test",
          image_url: "https://picsum.photos/200",
          likes: 100,
          comments: 100,
          views: 100,
        },
        {
          title: "Test test test",
          image_url: "https://picsum.photos/200",
          likes: 100,
          comments: 100,
          views: 100,
        },
      ],
    };
  },
};
</script>

<style scoped></style>
