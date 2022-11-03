<template>
  <div v-for="item in notifications" :key="item.id">
    <div class="flex py-2 w-full">
      <div class="m-auto">
        <div
          class="bg-white w-80 mx-3 lg:w-96 rounded-lg border-gray-300 border p-3 shadow-lg"
        >
          <div class="flex flex-row">
            <div class="px-2">
              <svg
                width="24"
                height="24"
                viewBox="0 0 1792 1792"
                fill="#44C997"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1299 813l-422 422q-19 19-45 19t-45-19l-294-294q-19-19-19-45t19-45l102-102q19-19 45-19t45 19l147 147 275-275q19-19 45-19t45 19l102 102q19 19 19 45t-19 45zm141 83q0-148-73-273t-198-198-273-73-273 73-198 198-73 273 73 273 198 198 273 73 273-73 198-198 73-273zm224 0q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"
                />
              </svg>
            </div>
            <div class="px-10 lg:px-16">
              <span class="font-semibold">{{ item.title }}</span>
              <span class="block text-gray-500">{{ item.description }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      notifications: [
        {
          title: "testing 1",
          description: "description testing 1",
        },
        {
          title: "testing 2",
          description: "description testing 2",
        },
        {
          title: "testing 3",
          description: "description testing 3",
        },
        {
          title: "testing 4",
          description: "description testing 4",
        },
        {
          title: "testing 5",
          description: "description testing 5",
        },
      ],
    };
  },
};
</script>
