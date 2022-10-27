<template>
  <section class="mx-6 md:mx-12 py-10 flex pt-8">
    <EquipmentLeftSection :equipment="equipment" />
    <EquipmentRightSection />
  </section>
</template>

<script>
import EquipmentLeftSection from "@/components/equipments/EquipmentLeftSection.vue";
import EquipmentRightSection from "@/components/equipments/EquipmentRightSection.vue";
import { Equipments } from "@/firebase/collections/equipments";

export default {
  name: "scene",
  components: {
    EquipmentLeftSection,
    EquipmentRightSection,
  },
  created() {
    this.getEquipment();
  },
  methods: {
    async getEquipment() {
      this.equipment = await Equipments.getDocument(this.$route.params.id);
    },
  },
  data() {
    return {
      equipment: {},
    };
  },
};
</script>

<style scoped></style>
