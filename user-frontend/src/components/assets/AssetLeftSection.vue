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
            type="button"
            :data-bs-target="'#carouselExampleCaptions' + id"
            data-bs-slide-to="0"
            class="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            :data-bs-target="'#carouselExampleCaptions' + id"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
        </div>

        <div class="carousel-inner relative w-full overflow-hidden">
          <div class="carousel-item active relative float-left w-full">
            <img :src="asset.preview_url[0]" class="w-full rounded-sm" />
          </div>
          <div class="carousel-item relative float-left w-full">
            <img :src="asset.preview_url[1]" class="w-full rounded-sm" />
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
      <!-- <CanvasComponent /> -->
      <!-- <img
          src="https://mdbcdn.b-cdn.net/img/new/standard/city/024.webp"
          class="w-full rounded-sm"
        /> -->
    </div>
    <div v-if="asset" class="content-wrapper">
      <div class="pt-5 mb-4">
        <h1 class="font-medium leading-none text-5xl mt-0">{{ asset.name }}</h1>
        <!-- <h6 class="font-medium leading-none text-base mt-0 mb-2 text-gray-400">
          {{ asset.description }}
        </h6> -->
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
        <!-- <button
          class="flex items-center text-sm h-8 mr-2 md:mr-8 text-gray-400"
        >
          button 2
        </button>
        <button
          class="flex items-center text-sm h-8 mr-2 md:mr-8 text-gray-400"
        >
          button 3
        </button>
        <button class="flex items-center text-sm h-8 ml-auto text-gray-400">
          button 4
        </button> -->
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
export default {
  components: {
    // NewComment,
    // CommentComponent,
    // CanvasComponent,
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
