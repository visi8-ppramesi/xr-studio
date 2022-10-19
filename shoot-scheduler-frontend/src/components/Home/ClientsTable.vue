<template>
  <ElementTable :tableData="shootsData" :headers="headers" />
</template>

<script>
import ElementTable from "../ElementPlus/ElementTable.vue";
import relativeDateFormatter from '@/utils/relativeDateFormatter.js'
export default {
  components: {
    ElementTable,
  },
  data() {
    return {
      shootsData: [
        {
          id: "56a449e2",
          location: "Jakarta",
          client: "PT. Garing Sempurna",
        },
        {
          id: "65ddc467",
          location: "Bandung",
          client: "PT. Alam Semesta"
        },
        {
          id: "a0819a33",
          location: "Jakarta",
          client: "PT. Klien Internations",
        },
        {
          id: "da366268",
          location: "Jakarta",
          client: "PT. Unibego",
        },
      ],
      headers: [
        { label: "Id", prop: "id" },
        { label: "Client", prop: "client" },
        { label: "Location", prop: "location" },
      ],
    };
  },
  created() {},
  mounted() {},
  methods: {
    showMore() {},
    delete() {},
  },
};
</script>
