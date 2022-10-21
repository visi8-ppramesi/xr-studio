<template>
  <div class="relative block bg-white rounded-lg shadow-lg">
    <div v-if="imagesource" class="flex">
      <div
        class="relative overflow-hidden bg-no-repeat bg-cover relative overflow-hidden bg-no-repeat bg-cover shadow-lg rounded-lg mx-4 -mt-4"
        data-mdb-ripple="true"
        data-mdb-ripple-color="light"
      >
        <img :src="imageSource" class="w-full" />
        <router-link :to="imageUrl">
          <div
            class="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed opacity-0 hover:opacity-100 transition duration-300 ease-in-out"
            style="background-color: rgba(251, 251, 251, 0.15)"
          ></div>
        </router-link>
      </div>
    </div>
    <div class="p-6">
      <h5 class="font-bold text-lg mb-3">{{ title }}</h5>
      <p class="text-gray-500 mb-4">
        <small
          >Published <u>{{ createdDate }}</u></small
        >
      </p>
      <p class="mb-4 pb-2">
        {{ description }}
      </p>
      <router-link
        :to="linkToUrl"
        data-mdb-ripple="true"
        data-mdb-ripple-color="light"
        class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        >Read more</router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  props: [
    "title",
    "imageUrl",
    "imageSource",
    "description",
    "createdDate",
    "linkToUrl",
  ],
};
</script>
