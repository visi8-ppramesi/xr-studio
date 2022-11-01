<template>
  <div class="left w-full md:w-2/3">
    <div class="viewer-wrapper flex justify-center items-center">
      <div
        :id="'carouselExampleCaptions' + id"
        data-bs-ride="carousel"
        class="w-full carousel slide relative overflow-hidden bg-no-repeat bg-cover relative overflow-hidden bg-no-repeat bg-cover shadow-lg rounded-lg mx-4 -mt-4"
        data-mdb-ripple="true"
        data-mdb-ripple-color="light"
      >
        <div
          class="carousel-indicators absolute right-0 bottom-0 left-0 flex justify-center p-0 mb-4"
        >
          <button
            v-for="(url, idx) in asset.preview_url"
            :key="'preview-switcher-' + idx + '-' + id"
            type="button"
            :data-bs-target="'#carouselExampleCaptions' + id"
            :data-bs-slide-to="idx"
            :class="idx === 0 ? 'active' : ''"
            aria-current="true"
            :aria-label="'Slide ' + idx"
          ></button>
        </div>

        <div class="carousel-inner relative w-full overflow-hidden">
          <div
            v-for="(url, idx) in asset.preview_url"
            :class="idx === 0 ? 'active' : ''"
            class="carousel-item relative float-left w-full"
            :key="'asset-preview-' + idx + '-' + id"
          >
            <img :src="url" class="w-full rounded-sm" />
          </div>
        </div>

        <button
          class="carousel-control-prev absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline left-0"
          type="button"
          :data-bs-target="'#carouselExampleCaptions' + id"
          data-bs-slide="prev"
        >
          <span
            class="carousel-control-prev-icon inline-block bg-no-repeat"
            aria-hidden="true"
          ></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline right-0"
          type="button"
          :data-bs-target="'#carouselExampleCaptions' + id"
          data-bs-slide="next"
        >
          <span
            class="carousel-control-next-icon inline-block bg-no-repeat"
            aria-hidden="true"
          ></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>
    <div v-if="asset" class="content-wrapper">
      <div class="pt-5 mb-4">
        <h1 class="font-medium leading-none text-5xl mt-0">{{ asset.name }}</h1>
      </div>
      <div class="flex">
        <CartButton
          :item-data="{
            image_url: asset.preview_url,
            type: 'asset',
            name: asset.name,
            description: asset.description,
            id: asset.id,
            price: asset.price,
          }"
          item-type="asset"
        />
      </div>
      <div class="pt-3 border-t border-gray-300 mb-2">
        <div class="my-4 max-w-xl text-gray-600">
          {{ asset.description }}
        </div>
      </div>
      <div class="mb-2 text-gray-600">Published 2 months ago</div>
      <div class="flex items-center text-gray-500 max-w-xl mb-1">
        <span class="flex items-center text-sm h-8 mb-1 mr-2">Categories:</span>
        <ul class="flex flex-wrap">
          <li
            v-for="(asset, idx) in asset.categories"
            :key="'asset-' + idx"
            class="leading-none mb-1 mr-2 px-2 py-1 border border-gray-400 rounded-md"
          >
            <a href="/test">{{ formatters.startCase(asset) }}</a>
          </li>
        </ul>
      </div>
      <!-- <div class="flex items-center text-gray-500 max-w-xl mb-1">
        <span class="flex items-center text-sm h-8 mb-1 mr-2">Tags:</span>
        <ul class="flex flex-wrap">
          <li
            class="bg-gray-300 text-gray-500 leading-none mb-1 mr-2 px-2 py-1 border border-gray-300 rounded-md"
          >
            <a href="/test">tag</a>
          </li>
        </ul>
      </div> -->
      <!-- <div class="pt-5">
        <h1 class="font-medium leading-none text-xl mt-0 mb-5">10 Comments</h1>
        <NewComment />
        <CommentComponent :comments="comments" />
      </div> -->
    </div>
  </div>
</template>

<script>
// import NewComment from "../comment/NewComment.vue";
// import CommentComponent from "../comment/CommentComponent.vue";
// import CanvasComponent from "./threejs/CanvasComponent.vue";
import CartButton from "../CartButton.vue";
export default {
  components: {
    // NewComment,
    // CommentComponent,
    // CanvasComponent,
    CartButton,
  },
  props: ["asset"],
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
