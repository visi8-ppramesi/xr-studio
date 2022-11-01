<template>
  <div class="flex flex-row h-32 justify-between w-full">
    <div class="h-32 w-32">
      <img
        :src="itemImageUrl"
        class="w-full h-full rounded shadow-md object-cover"
      />
    </div>
    <div class="grow">
      <div>{{ name }}</div>
    </div>
    <div class="h-32 w-32"></div>
    <div class="grow"></div>
    <div class="h-32 w-32"></div>
  </div>
</template>

<script>
import isArray from "lodash/isArray";
export default {
  setup() {},
  props: {
    count: {
      type: Number,
      default: 1,
    },
    description: {
      type: String,
      default: "",
    },
    id: {
      type: String,
    },
    name: {
      type: String,
    },
    price: {
      type: Number,
    },
    type: {
      type: String,
    },
    imageUrl: {
      type: [String, Array],
    },
  },
  computed: {
    itemImageUrl() {
      return isArray(this.imageUrl) ? this.imageUrl[0] : this.imageUrl;
    },
  },
};
</script>
