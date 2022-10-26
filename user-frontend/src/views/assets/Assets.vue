<template>
  <div class="assets">
    <AssetsSidenav />
    <AssetsContent :assets="assets" />
  </div>
</template>

<script>
import AssetsSidenav from "@/components/assets/AssetsSidenav.vue";
import AssetsContent from "@/components/assets/AssetsContent.vue";
export default {
  name: "assets",
  components: {
    AssetsSidenav,
    AssetsContent,
  },
  created() {
    console.log(this.$route.params);
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
