<template>
  <div
    class="hidden md:block w-60 h-full bg-white absolute pt-8"
    id="sidenavSecExample"
  >
    <ul class="relative px-1">
      <li
        v-for="(year, idx) in years"
        class="relative"
        :id="'sidenavSecEx' + idx"
        :key="'sidenav-year-' + idx"
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
          <span>{{ year }}</span>
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
            v-for="(month, midx) in months"
            class="relative"
            :key="'sidenav-' + idx + '-' + midx"
          >
            <button
              class="flex items-center text-xs py-4 pl-12 pr-6 h-6 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out"
              data-mdb-ripple="true"
              data-mdb-ripple-color="primary"
              @click="monthChange(year, midx + 1)"
            >
              {{ month }}
            </button>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
const monthsForLocale = (function (localeName = "id-ID", monthFormat = "long") {
  const format = new Intl.DateTimeFormat(localeName, { month: monthFormat })
    .format;
  return [...Array(12).keys()].map((m) =>
    format(new Date(Date.UTC(2021, m % 12)))
  );
})();

export default {
  name: "CalendarSidenav",
  data() {
    return {
      years: Array(5)
        .fill()
        .map((v, idx) => new Date().getFullYear() + idx - 2),
      months: monthsForLocale,
    };
  },
  methods: {
    monthChange(year, month) {
      this.$emit("monthChange", { year, month });
    },
  },
};
</script>
