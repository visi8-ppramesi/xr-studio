<template>
  <div class="left w-full md:w-2/3">
    <div class="viewer-wrapper">
      <img :src="equipment.preview_url" class="w-full rounded-sm" />
    </div>
    <div v-if="equipment" class="content-wrapper">
      <div class="pt-5 mb-4">
        <h1 class="font-medium leading-none text-5xl mt-0">
          {{ formatters.startCase(equipment.name) }}
        </h1>
        <h6 class="font-medium leading-none text-base mt-0 mb-2 text-gray-400">
          {{
            (equipment?.categories || [])
              .map((v) => formatters.startCase(v))
              .join(", ")
          }}
        </h6>
      </div>
      <div class="flex">
        <CartButton
          :item-data="{
            image_url: equipment.preview_url,
            type: 'equipment',
            name: equipment.name,
            description: equipment.description,
            id: equipment.id,
            price: equipment.price,
          }"
          item-type="equipment"
        />
      </div>
      <div class="pt-3 border-t border-gray-300 mb-2">
        <div id="equipment-left-description" class="my-4 max-w-xl text-gray-600 text-justify">
          {{ equipment.description }}
        </div>
      </div>
      <div class="flex items-center text-gray-500 max-w-xl mb-1">
        <span id="equipment-left-category" class="flex items-center text-sm h-8 mb-1 mr-2">Categories:</span>
        <ul class="flex flex-wrap">
          <li
            v-for="(category, idx) in equipment.categories"
            :key="'category-' + idx"
            class="leading-none mb-1 mr-2 px-2 py-1 border border-gray-400 rounded-md"
          >
            <a href="/test">{{ formatters.startCase(category) }}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import CartButton from "../CartButton.vue";
export default {
  components: {
    CartButton,
  },
  props: ["equipment"],
  data() {
    return {
      comments: [
        {
          username: "username",
          handle: "username",
          date: new Date(),
          profile_picture: "https://picsum.photos/32",
          message:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        },
        {
          username: "username",
          handle: "username",
          date: new Date(),
          profile_picture: "https://picsum.photos/32",
          message:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        },
        {
          username: "username",
          handle: "username",
          date: new Date(),
          profile_picture: "https://picsum.photos/32",
          message:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        },
      ],
    };
  },
};
</script>

<style scoped></style>
