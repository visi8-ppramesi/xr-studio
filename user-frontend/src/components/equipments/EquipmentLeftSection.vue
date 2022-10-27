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
        <button
          class="flex items-center text-sm h-8 mr-2 md:mr-8 text-gray-400"
        >
          <svg
            class="w-4 h-4 mr-1 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 576 512"
          >
            <!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
            <path
              fill="#9CA3AF"
              d="M24 0C10.7 0 0 10.7 0 24S10.7 48 24 48H76.1l60.3 316.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24-10.7 24-24s-10.7-24-24-24H179.9l-9.1-48h317c14.3 0 26.9-9.5 30.8-23.3l54-192C578.3 52.3 563 32 541.8 32H122l-2.4-12.5C117.4 8.2 107.5 0 96 0H24zM176 512c26.5 0 48-21.5 48-48s-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48zm336-48c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48z"
            />
          </svg>
          Add To Cart
        </button>
      </div>
      <div class="pt-3 border-t border-gray-300 mb-2">
        <div class="my-4 max-w-xl text-gray-600 text-justify">
          {{ equipment.description }}
        </div>
      </div>
      <div class="flex items-center text-gray-500 max-w-xl mb-1">
        <span class="flex items-center text-sm h-8 mb-1 mr-2">Categories:</span>
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
// import CanvasComponent from "./threejs/CanvasComponent.vue";
export default {
  components: {
    // CanvasComponent,
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
