<template>
  <section>
    <div
      class="flex"
      :class="{ 'mt-8 pt-8 border-t border-gray-300': idx !== 0 }"
      v-for="(comment, idx) in comments"
      :key="'comment-' + idx"
    >
      <div class="avatar mr-3 w-8 h-8">
        <img class="rounded-full" :src="comment.profile_picture" />
      </div>
      <article class="w-full">
        <div class="leading-none mb-1 text-md">
          <a class="mr-2" href="/user/something">{{ comment.username }}</a>
          <span class="text-gray-400">@{{ comment.handle }}</span>
        </div>
        <div class="leading-none mb-2 text-sm">
          <div>A Month Ago</div>
        </div>
        <div>
          <p class="my-2 text-gray-600">{{ comment.message }}</p>
        </div>
      </article>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    comments: {
      default: () => [],
      type: Array,
    },
  },
};
</script>

<style scoped></style>
