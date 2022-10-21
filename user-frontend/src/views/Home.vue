<template>
  <div class="home">
    <FrontPage />
    <FeaturedComponent />
    <PricingComponent />
    <ContentSectionHorizontal />
    <ContentSectionVertical />
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import FrontPage from "../components/FrontPage.vue";
import FeaturedComponent from "../components/FeaturedComponent.vue";
import PricingComponent from "../components/PricingComponent.vue";
import ContentSectionHorizontal from "../components/ContentSectionHorizontal.vue";
import ContentSectionVertical from "../components/ContentSectionVertical.vue";

export default {
  name: "Home",
  components: {
    // HelloWorld
    FrontPage,
    FeaturedComponent,
    PricingComponent,
    ContentSectionHorizontal,
    ContentSectionVertical,
  },
};
</script>
