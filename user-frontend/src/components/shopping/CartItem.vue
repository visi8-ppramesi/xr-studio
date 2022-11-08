<template>
  <div class="flex w-2/5">
    <!-- product -->
    <div class="w-20">
      <img
        class="h-24 object-cover"
        :src="
          typeof item.image_url === 'string'
            ? item.image_url
            : item.image_url[0]
        "
        alt=""
      />
    </div>
    <div class="flex flex-col justify-between ml-4 flex-grow">
      <span class="font-bold text-sm">{{ item.name }}</span>
      <span class="text-red-500 text-xs">{{
        filters.truncate(item.description, 25)
      }}</span>
      <div
        @click="removeItem"
        class="font-semibold hover:text-red-500 text-gray-500 text-xs"
      >
        Remove
      </div>
    </div>
  </div>
  <div class="flex justify-center w-1/5">
    <SummaryButton
      type="summaryRemove"
      :item-data="{
        image_url:
          typeof item.image_url === 'string'
            ? item.image_url
            : item.image_url[0],
        type: item.type,
        name: item.name,
        description: item.description,
        id: item.id,
        price: item.price,
      }"
      :item-type="item.type"
    >
    </SummaryButton>

    <input
      class="mx-2 border text-center w-8"
      type="text"
      disabled
      :value="item.count"
    />

    <SummaryButton
      type="summaryAdd"
      :item-data="{
        image_url: item.image_url,
        type: item.type,
        name: item.name,
        description: item.description,
        id: item.id,
        price: item.price,
      }"
      :item-type="item.type"
    >
    </SummaryButton>
  </div>
  <span class="text-center w-1/5 font-semibold text-sm">{{
    formatters.currency(item.price)
  }}</span>
  <span class="text-center w-1/5 font-semibold text-sm">{{
    formatters.currency(item.count * item.price)
  }}</span>
</template>

<script>
import { useCartStore } from "@/store/cart";
import SummaryButton from "@/components/shopping/SummaryButton.vue";
export default {
  setup() {
    const cartStore = useCartStore();
    return {
      cartStore,
    };
  },
  components: {
    SummaryButton,
  },
  data() {
    return {
      total: "",
    };
  },
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    removeItem() {
      this.cartStore.removeItem(this.item.id);
    },
  },
};
</script>
