<template>
  <div class="flex justify-center items-start w-full py-3">
    <div>
      <div v-for="item in notifications" :key="item.id">
        <div class="flex py-2 w-full">
          <div class="m-auto">
            <div
              class="bg-white w-80 mx-3 lg:w-96 rounded-lg border-gray-300 border p-3 shadow-lg"
            >
              <div class="flex flex-row text-left">
                <div>
                  <span class="notification-title font-semibold">{{ item.title }}</span>
                  <span class="notification-description block text-gray-500">{{
                    item.description
                  }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="hidden md:block w-60 h-full bg-white pt-8"
      id="sidenavSecExample"
    >
      <span id="notification-filter" class="text-lg">Search By Filter</span>
      <ul class="relative px-1">
        <li
          v-for="(item, idx) in filters"
          class="relative"
          :key="'sidenav-notif-' + idx"
        >
          <a
            class="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out cursor-pointer"
            data-mdb-ripple="true"
            data-mdb-ripple-color="primary"
            data-bs-toggle="collapse"
            :data-bs-target="'#collapseSidenavSecEx' + idx"
            aria-expanded="false"
            :aria-controls="'collapseSidenavSecEx' + idx"
          >
            <span class="notification-item-title">{{ item.title }}</span>
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              class="w-3 h-3 ml-auto"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path
                fill="currentColor"
                d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"
              ></path>
            </svg>
          </a>
          <ul
            class="relative accordion-collapse collapse"
            :id="'collapseSidenavSecEx' + idx"
            :aria-labelledby="'sidenavSecEx' + idx"
            data-bs-parent="#sidenavSecExample"
          >
            <li
              v-for="(item, cidx) in choice"
              class="relative"
              :key="'sidenav-' + idx + '-' + cidx"
            >
              <button
                class="flex items-center text-xs py-4 pl-12 pr-6 h-6 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out"
                data-mdb-ripple="true"
                data-mdb-ripple-color="primary"
              >
                {{ item.title }}
              </button>
            </li>
          </ul>
        </li>
      </ul>
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
      filters: [
        {
          title: "filter 1",
          description: "description filter 1",
        },
        {
          title: "filter 2",
          description: "description filter 2",
        },
        {
          title: "filter 3",
          description: "description filter 3",
        },
      ],
      choice: [
        {
          title: "filter 1",
          description: "description filter 1",
        },
        {
          title: "filter 2",
          description: "description filter 2",
        },
        {
          title: "filter 3",
          description: "description filter 3",
        },
      ],
    };
  },
};
</script>
