<template>
  <div
    v-if="loaded"
    class="hidden md:block w-60 h-full bg-white absolute pt-8"
    id="sidenavSecExample"
  >
    <ul class="relative px-1">
      <li class="relative">
        <div class="flex justify-center">
          <div class="xl:w-96">
            <div
              class="px-2 input-group relative flex flex-wrap items-stretch w-full mb-4"
            >
              <input
                v-model="stringQuery"
                type="search"
                class="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                placeholder="Search"
                aria-label="Search"
                aria-describedby="button-addon2"
              />
              <button
                @click="submitSearch"
                class="btn inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center"
                type="button"
                id="button-addon2"
              >
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="search"
                  class="w-4"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <hr class="my-2" />
    <ul class="relative px-1">
      <li class="relative">
        <a
          class="flex items-center text-sm py-4 px-2 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out"
          href="#!"
          data-mdb-ripple="true"
          data-mdb-ripple-color="primary"
        >
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            class="w-3 h-3 mr-3"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              d="M488.6 250.2L392 214V105.5c0-15-9.3-28.4-23.4-33.7l-100-37.5c-8.1-3.1-17.1-3.1-25.3 0l-100 37.5c-14.1 5.3-23.4 18.7-23.4 33.7V214l-96.6 36.2C9.3 255.5 0 268.9 0 283.9V394c0 13.6 7.7 26.1 19.9 32.2l100 50c10.1 5.1 22.1 5.1 32.2 0l103.9-52 103.9 52c10.1 5.1 22.1 5.1 32.2 0l100-50c12.2-6.1 19.9-18.6 19.9-32.2V283.9c0-15-9.3-28.4-23.4-33.7zM358 214.8l-85 31.9v-68.2l85-37v73.3zM154 104.1l102-38.2 102 38.2v.6l-102 41.4-102-41.4v-.6zm84 291.1l-85 42.5v-79.1l85-38.8v75.4zm0-112l-102 41.4-102-41.4v-.6l102-38.2 102 38.2v.6zm240 112l-85 42.5v-79.1l85-38.8v75.4zm0-112l-102 41.4-102-41.4v-.6l102-38.2 102 38.2v.6z"
            ></path>
          </svg>
          <span id="equipments-side-category" class="text-lg">Category</span>
        </a>
        <div class="flex justify-start px-2">
          <div>
            <div
              v-for="(category, idx) in groups.data.categories"
              class="form-check py-1 text-left"
              :key="'category-' + idx"
            >
              <input
                class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                type="checkbox"
                v-model="selectedCategories"
                :value="category.name"
              />
              <label
                class="form-check-label inline-block text-gray-800"
                for="flexCheckDefault"
              >
                {{ category.name }}
              </label>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <hr class="my-2" />
    <ul class="relative px-1">
      <li class="relative">
        <a
          class="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out"
          href="#!"
          data-mdb-ripple="true"
          data-mdb-ripple-color="primary"
        >
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            class="w-3 h-3 mr-3"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              d="M488.6 250.2L392 214V105.5c0-15-9.3-28.4-23.4-33.7l-100-37.5c-8.1-3.1-17.1-3.1-25.3 0l-100 37.5c-14.1 5.3-23.4 18.7-23.4 33.7V214l-96.6 36.2C9.3 255.5 0 268.9 0 283.9V394c0 13.6 7.7 26.1 19.9 32.2l100 50c10.1 5.1 22.1 5.1 32.2 0l103.9-52 103.9 52c10.1 5.1 22.1 5.1 32.2 0l100-50c12.2-6.1 19.9-18.6 19.9-32.2V283.9c0-15-9.3-28.4-23.4-33.7zM358 214.8l-85 31.9v-68.2l85-37v73.3zM154 104.1l102-38.2 102 38.2v.6l-102 41.4-102-41.4v-.6zm84 291.1l-85 42.5v-79.1l85-38.8v75.4zm0-112l-102 41.4-102-41.4v-.6l102-38.2 102 38.2v.6zm240 112l-85 42.5v-79.1l85-38.8v75.4zm0-112l-102 41.4-102-41.4v-.6l102-38.2 102 38.2v.6z"
            ></path>
          </svg>
          <span id="assets-side-price" class="text-lg">Price</span>
        </a>
        <div class="flex justify-center">
          <div class="mb-3 xl:w-96">
            <input
              type="text"
              class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="exampleFormControlInput1"
              placeholder="Minimum Price"
              v-model="minPrice"
            />
          </div>
        </div>
        <div class="flex justify-center">
          <div class="mb-3 xl:w-96">
            <input
              type="text"
              class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="exampleFormControlInput1"
              placeholder="Maximum Price"
              v-model="maxPrice"
            />
          </div>
        </div>
      </li>
    </ul>

    <div class="flex justify-center">
      <div class="flex space-x-2 justify-center">
        <button
          id="assets-side-button"
          type="button"
          class="inline-block px-20 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
          @click="submitSearch"
        >
          Submit
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { collections } from "@/firebase/index";
import { groupingFetcher } from "@/composables/groupingFetcher";
import omitBy from "lodash/omitBy";
import isEmpty from "lodash/isEmpty";

export default {
  name: "assets-sidenav",
  setup() {
    const groupsCollections = {
      categories: collections.AssetCategories,
    };
    let loaded = ref(false);
    const minPrice = ref(null);
    const maxPrice = ref(null);
    const stringQuery = ref("");
    const selectedCategories = ref([]);
    const groups = groupingFetcher(
      groupsCollections,
      () => (loaded.value = true)
    );

    return {
      groups,
      loaded,
      selectedCategories,
      minPrice,
      maxPrice,
      stringQuery,
    };
  },
  methods: {
    submitSearch() {
      const { selectedCategories, minPrice, maxPrice, stringQuery } = this;
      const query = omitBy(
        {
          equipmentCategories: selectedCategories,
          minPrice,
          maxPrice,
          stringQuery,
        },
        isEmpty
      );
      this.$emit("search", {
        query,
      });
    },
  },
};
</script>

<style scoped></style>
