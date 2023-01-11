<template>
  <div class="equipments min-h-screen">
    <EquipmentsSidenav @search="search" />
    <EquipmentsContent
      ref="content"
      :equipments="equipments"
      @loadMore="loadMore"
    />
  </div>
</template>

<script>
import EquipmentsSidenav from "../../components/equipments/EquipmentsSidenav.vue";
import EquipmentsContent from "../../components/equipments/EquipmentsContent.vue";
import { Equipments } from "../../firebase/collections/equipments";
// import { buildQueries, paginationQuery } from "@/composables/queries";
// import isNil from "lodash/isNil";
import { listFetcher } from "@/composables/listFetcher";
export default {
  name: "equipments",
  components: {
    EquipmentsSidenav,
    EquipmentsContent,
  },
  setup() {
    const {
      items: equipments,
      query,
      getItems: getEquipments,
      search,
      loadMore,
      content,
    } = listFetcher(Equipments);

    return { equipments, query, getEquipments, search, loadMore, content };
  },
  // mounted() {
  //   this.getEquipments();
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
  //     this.getEquipments(this.query, false);
  //   },
  //   loadMore() {
  //     this.getEquipments(this.query, true);
  //   },
  //   async getEquipments(query = [], loadMore = false) {
  //     let pQuery;
  //     if (!loadMore) {
  //       this.equipments = [];
  //       pQuery = paginationQuery(12, "name", null, query);
  //     } else {
  //       const lastDoc = this.equipments[this.equipments.length - 1].doc;
  //       pQuery = paginationQuery(12, "name", lastDoc, query);
  //     }

  //     const [currentCount, equipments] = await Promise.all([
  //       Equipments.getCount(pQuery),
  //       Equipments.getDocuments(pQuery),
  //     ]);
  //     if (currentCount < 12) {
  //       this.$refs.equipmentsContent.disableLoadMore();
  //     }
  //     this.equipments.push(...equipments);
  //   },
  // },
  // data() {
  //   return {
  //     equipments: [],
  //     query: [],
  //   };
  // },
};
</script>

<style scoped></style>
