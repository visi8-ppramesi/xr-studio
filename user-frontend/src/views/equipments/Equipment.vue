<template>
  <section class="mx-6 md:mx-12 py-10 flex pt-8">
    <EquipmentLeftSection />
    <EquipmentRightSection />
  </section>
</template>

<script>
import EquipmentLeftSection from "@/components/equipments/EquipmentLeftSection.vue";
import EquipmentRightSection from "@/components/equipments/EquipmentRightSection.vue";
export default {
  name: "scene",
  components: {
    EquipmentLeftSection,
    EquipmentRightSection,
  },
  data() {
    return {};
  },
  created() {},
};
</script>

<style scoped></style>
