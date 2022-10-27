<template>
  <div class="equipments">
    <EquipmentsSidenav @search="search" />
    <EquipmentsContent
      ref="equipmentsContent"
      :equipments="equipments"
      @loadMore="loadMore"
    />
  </div>
</template>

<script>
import EquipmentsSidenav from "@/components/equipments/EquipmentsSidenav.vue";
import EquipmentsContent from "@/components/equipments/EquipmentsContent.vue";
import { Equipments } from "@/firebase/collections/equipments";
import { paginationQuery } from "@/utils/queries";
// import isNil from "lodash/isNil";
export default {
  name: "equipments",
  components: {
    EquipmentsSidenav,
    EquipmentsContent,
  },
  mounted() {
    this.getEquipments();
  },
  methods: {
    search() {},
    loadMore() {
      this.getEquipments(true);
    },
    async getEquipments(loadMore = false) {
      let pQuery;
      if (!loadMore) {
        pQuery = paginationQuery(12, "name");
      } else {
        const lastDoc = this.equipments[this.equipments.length - 1].doc;
        pQuery = paginationQuery(12, "name", lastDoc);
      }
      const currentCount = await Equipments.getCount(pQuery);
      if (currentCount < 12) {
        this.$refs.equipmentsContent.disableLoadMore();
      }
      const equipments = await Equipments.getDocuments(pQuery);
      this.equipments.push(...equipments);
    },
  },
  data() {
    return {
      equipments: [],
    };
  },
};
</script>

<style scoped></style>
