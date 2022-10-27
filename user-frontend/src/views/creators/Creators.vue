<template>
  <div class="creators">
    <CreatorsSidenav />
    <CreatorsContent :creators="creators" />
  </div>
</template>

<script>
import CreatorsSidenav from "@/components/creators/CreatorsSidenav.vue";
import CreatorsContent from "@/components/creators/CreatorsContent.vue";
export default {
  name: "creators",
  components: {
    CreatorsSidenav,
    CreatorsContent,
  },
  created() {
    console.log(this.$route.params);
  },
  data() {
    return {
      creators: [
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
