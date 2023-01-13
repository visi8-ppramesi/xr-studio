<template>
  <section
    class="min-h-[900px] px-6 py-12 md:px-12 bg-gray-100 text-gray-800 text-center lg:text-left md:ml-60"
  >
    <h2 id="assets-content-title" class="text-3xl font-bold mb-12 text-center">
      3D XR Scenes
    </h2>

    <div
      class="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-8 mb-6 md:w-7/8 mx-auto"
    >
      <div
        class="mb-6 lg:mb-0"
        v-for="(asset, idx) in assets"
        :key="'asset-' + idx"
      >
        <BoxComponentMultipleImages
          :title="asset.name"
          :image-url="'/asset/' + asset.id"
          :image-source="asset.preview_url[0]"
          :created-date="formatters.absoluteDate(asset.created_date)"
          :link-to-url="'/asset/' + asset.id"
        >
          <div class="assets-content-description">
            {{ filters.truncate(asset.description, 25) }}
          </div>
        </BoxComponentMultipleImages>
      </div>
    </div>
    <div
      v-if="loadMoreEnabled"
      class="w-full flex content-center justify-center"
    >
      <div
        id="equipments-content-more"
        data-mdb-ripple="true"
        data-mdb-ripple-color="light"
        class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        @click="loadMore"
      >
        Load more
      </div>
    </div>
  </section>
</template>

<script>
import BoxComponentMultipleImages from "../BoxComponentMultipleImages.vue";
export default {
  components: {
    BoxComponentMultipleImages,
  },
  name: "assets-content",
  props: ["assets"],
  data() {
    return {
      loadMoreEnabled: true,
    };
  },
  methods: {
    enableLoadMore() {
      this.loadMoreEnabled = true;
    },
    disableLoadMore() {
      this.loadMoreEnabled = false;
    },
    loadMore() {
      this.$emit("loadMore");
    },
  },
};
</script>

<style scoped></style>
