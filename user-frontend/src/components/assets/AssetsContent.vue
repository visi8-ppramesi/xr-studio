<template>
  <section
    class="px-6 py-12 md:px-12 bg-gray-100 text-gray-800 text-center lg:text-left md:ml-60"
  >
    <h2 class="text-3xl font-bold mb-12 text-center">3D XR Scenes</h2>

    <div
      class="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-8 mb-6 md:w-7/8 mx-auto"
    >
      <div
        class="mb-6 lg:mb-0"
        v-for="(asset, idx) in assets"
        :key="'asset-' + idx"
      >
        <BoxContent
          title="My paradise"
          imageUrl="/asset/test"
          imageSource="https://mdbcdn.b-cdn.net/img/new/standard/city/024.webp"
          description="Ut pretium ultricies dignissim. Sed sit amet mi eget urna placerat vulputate. Ut vulputate est non quam dignissim elementum. Donec a ullamcorper diam."
          createdDate="13.01.2022"
          linkToUrl="/asset/test"
        />
      </div>
    </div>
  </section>
</template>

<script>
import BoxContent from "../BoxContent.vue";
export default {
  components: {
    BoxContent,
  },
  name: "assets-content",
  props: ["assets"],
};
</script>

<style scoped></style>
