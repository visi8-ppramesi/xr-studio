<template>
  <div class="right hidden md:block md:w-1/3 ml-8">
    <div class="mb-3">
      <span id="creator-right-title" class="text-gray-400 text-md mb-3">RELATED SCENES</span>
    </div>

    <div
      class="flex flex-wrap mb-6 shadow-lg rounded-lg"
      v-for="index in 10"
      :key="'item-' + index"
    >
      <div class="w-2/5">
        <div
          class="relative overflow-hidden bg-no-repeat bg-cover relative bg-no-repeat bg-cover ripple rounded-sm"
          data-mdb-ripple="true"
          data-mdb-ripple-color="light"
        >
          <img
            src="https://mdbootstrap.com/img/new/standard/city/018.jpg"
            class="w-full"
            alt="Louvre"
          />
          <a href="#!">
            <div
              class="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed opacity-0 hover:opacity-100 transition duration-300 ease-in-out"
              style="background-color: rgba(251, 251, 251, 0.2)"
            ></div>
          </a>
        </div>
      </div>

      <div class="grow-0 shrink-0 basis-auto w-3/5 px-3">
        <h5 id="creator-right-title-item1" class="text-lg font-bold mb-3">Title</h5>
        <p id="creator-right-date-item1" class="text-gray-500">
          <small
            >Published <u>13.01.2022</u> by
            <a href="" class="text-gray-900">Anna Maria Doe</a></small
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped></style>
