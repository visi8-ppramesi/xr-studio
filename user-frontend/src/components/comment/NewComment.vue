<template>
  <section>
    <div v-show="showNewComment" class="mb-8">
      <textarea
        class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none w-full"
        name="comment"
        cols="30"
        rows="5"
      ></textarea>
      <button
        type="button"
        class="mt-4 inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
      >
        Post Comment
      </button>
    </div>
    <div v-show="!showNewComment" class="mb-8">
      <div
        class="flex flex-col justify-center align-center items-center bg-gray-200 rounded-md py-12 px-8"
      >
        <div class="text-gray-800">You must login to comment</div>
        <button
          type="button"
          class="mt-3 inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        >
          Login
        </button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      showNewComment: false,
    };
  },
  created() {
    this.showNewComment = Math.random() > 0.5;
  },
};
</script>

<style scoped></style>
