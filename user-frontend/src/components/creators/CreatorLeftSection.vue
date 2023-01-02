<template>
  <div class="left w-full md:w-2/3">
    <div class="viewer-wrapper"></div>
    <div class="content-wrapper">
      <div class="pt-5 mb-4">
        <h1 id="creator-left-title" class="font-medium leading-none text-5xl mt-0">title</h1>
        <h6 id="creator-left-subtitle" class="font-medium leading-none text-base mt-0 mb-2 text-gray-400">
          subtitle
        </h6>
      </div>
      <div class="flex">
        <button
          id="creator-left-section-button-1"
          class="flex items-center text-sm h-8 mr-2 md:mr-8 text-gray-400"
        >
          button 1
        </button>
        <button
          id="creator-left-section-button-2"
          class="flex items-center text-sm h-8 mr-2 md:mr-8 text-gray-400"
        >
          button 2
        </button>
        <button
          id="creator-left-section-button-3"
          class="flex items-center text-sm h-8 mr-2 md:mr-8 text-gray-400"
        >
          button 3
        </button>
        <button id="creator-left-section-button-4" class="flex items-center text-sm h-8 ml-auto text-gray-400">
          button 4
        </button>
      </div>
      <div class="pt-3 border-t border-gray-300 mb-2">
        <div id="creator-left-description" class="my-4 max-w-xl text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </div>
      </div>
      <div id="creator-left-date" class="mb-2 text-gray-600">Published 2 months ago</div>
      <div class="flex items-center text-gray-500 max-w-xl mb-1">
        <span id="creator-left-categories" class="flex items-center text-sm h-8 mb-1 mr-2">Categories:</span>
        <ul class="flex flex-wrap">
          <li
            id="creator-left-categories-item1"
            class="leading-none mb-1 mr-2 px-2 py-1 border border-gray-400 rounded-md"
          >
            <a href="/test">category</a>
          </li>
          <li
            id="creator-left-categories-item2"
            class="leading-none mb-1 mr-2 px-2 py-1 border border-gray-400 rounded-md"
          >
            <a href="/test">category</a>
          </li>
          <li
            id="creator-left-categories-item3"
            class="leading-none mb-1 mr-2 px-2 py-1 border border-gray-400 rounded-md"
          >
            <a href="/test">category</a>
          </li>
        </ul>
      </div>
      <div class="flex items-center text-gray-500 max-w-xl mb-1">
        <span id="creator-left-tags" class="flex items-center text-sm h-8 mb-1 mr-2">Tags:</span>
        <ul class="flex flex-wrap">
          <li
            id="creator-left-tags-item1"
            class="bg-gray-300 text-gray-500 leading-none mb-1 mr-2 px-2 py-1 border border-gray-300 rounded-md"
          >
            <a href="/test">tag</a>
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
