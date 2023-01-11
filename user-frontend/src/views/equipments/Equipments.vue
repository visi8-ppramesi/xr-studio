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
};
</script>

<style scoped></style>
