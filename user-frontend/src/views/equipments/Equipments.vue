<template>
  <div class="equipments">
    <EquipmentsSidenav />
    <EquipmentsContent :equipments="equipments" />
  </div>
</template>

<script>
import EquipmentsSidenav from "@/components/equipments/EquipmentsSidenav.vue";
import EquipmentsContent from "@/components/equipments/EquipmentsContent.vue";
import { Equipments } from "@/firebase/collections/equipments"
export default {
  name: "equipments",
  components: {
    EquipmentsSidenav,
    EquipmentsContent,
  },
  created() {
    console.log(this.$route.params);
    this.getEquipments()
  },
  methods: {
    async getEquipments(){
      this.equipments = await Equipments.getDocuments()
    }
  },
  data() {
    return {
      equipments: [
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
