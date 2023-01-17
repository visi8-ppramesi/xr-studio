<template>
  <div class="relative block bg-white rounded-lg shadow-lg">
    <div v-if="imageSource" class="flex">
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
          <button
            type="button"
            :data-bs-target="'#carouselExampleCaptions' + id"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>

        <div class="carousel-inner relative w-full overflow-hidden">
          <div class="carousel-item active relative float-left w-full">
            <img :src="imageSource" class="w-full" />
          </div>
          <div class="carousel-item relative float-left w-full">
            <img :src="imageSource" class="w-full" />
          </div>
          <div class="carousel-item relative float-left w-full">
            <img :src="imageSource" class="w-full" />
          </div>
        </div>

        <router-link :to="imageUrl">
          <div
            class="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed opacity-0 hover:opacity-100 transition duration-300 ease-in-out"
            style="background-color: rgba(251, 251, 251, 0.15)"
          ></div>
        </router-link>

        <button
          class="opacity-100 carousel-control-prev absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline left-0"
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
          class="opacity-100 carousel-control-next absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline right-0"
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

    <div class="p-6">
      <h5 class="font-bold text-lg mb-3">{{ title }}</h5>
      <p v-if="createdDate" class="text-gray-500 mb-4">
        <small
          >Published <u>{{ createdDate }}</u></small
        >
      </p>
      <p class="mb-4 pb-2">
        <slot></slot>
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
  created() {},
  data() {
    return {
      id: Math.random().toString(16).substring(2),
    };
  },
  props: ["title", "imageUrl", "imageSource", "createdDate", "linkToUrl"],
};
</script>
