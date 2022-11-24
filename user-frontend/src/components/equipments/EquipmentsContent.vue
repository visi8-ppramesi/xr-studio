<template>
  <section
    class="px-6 py-12 md:px-12 bg-gray-100 text-gray-800 text-center lg:text-left md:ml-60 min-h-screen"
  >
    <h2 id="equipments-content-title" class="text-3xl font-bold mb-12 text-center">Equipment Rental</h2>

    <div
      class="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-8 mb-6 md:w-7/8 mx-auto"
    >
      <div
        class="mb-6 lg:mb-0"
        v-for="(equipment, idx) in equipments"
        :key="'equipment-' + idx"
      >
        <BoxContent
          :title="equipment.name"
          :image-url="'/equipment/' + equipment.id"
          :image-source="equipment.preview_url"
          :created-date="null"
          :link-to-url="'/equipment/' + equipment.id"
        >
          <div id="equipments-content-description">
            {{ filters.truncate(equipment.description, 100) }}
          </div>
          <div id="equipments-content-price">Price: {{ formatters.currency(equipment.price) }}</div>
        </BoxContent>
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
import BoxContent from "../BoxContent.vue";
export default {
  components: {
    BoxContent,
  },
  name: "equipments-content",
  props: ["equipments"],
  data() {
    return {
      loadMoreEnabled: true,
    };
  },
  methods: {
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
