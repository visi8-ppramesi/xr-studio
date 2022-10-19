<template>
  <ElementTable :tableData="formattedData" :headers="headers" />
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
          location: "Darmawangsa",
          project: "Kara",
          client: "PT. Garing Sempurna",
          start_date: "2023-01-01T17:00:00.000Z",
          end_date: "2023-01-03T17:00:00.000Z",
        },
        {
          id: "65ddc467",
          location: "Darmawangsa",
          project: "Changelings",
          client: "PT. Alam Semesta",
          start_date: "2023-01-04T17:00:00.000Z",
          end_date: "2023-01-06T17:00:00.000Z",
        },
        {
          id: "a0819a33",
          location: "Kemang",
          project: "Nope",
          client: "PT. Klien Internations",
          start_date: "2023-01-07T17:00:00.000Z",
          end_date: "2023-02-08T17:00:00.000Z",
        },
        {
          id: "da366268",
          location: "Darmawangsa",
          project: "The Yard",
          client: "PT. Unibego",
          start_date: "2023-01-10T17:00:00.000Z",
          end_date: "2023-01-11T17:00:00.000Z",
        },
      ],
      headers: [
        { label: "Id", prop: "id" },
        { label: "Client", prop: "client" },
        { label: "Project", prop: "project" },
        { label: "Location", prop: "location" },
        { label: "Start Date", prop: "start_date" },
        { label: "End Date", prop: "end_date" },
      ],
    };
  },
  computed: {
    formattedData(){
      const l = this.shootsData.map((shootData) => {
        const tempData = { ...shootData }
        const unformattedStartDate = new Date(tempData.start_date)
        const unformattedEndDate = new Date(tempData.end_date)
        tempData.start_date = new Intl.DateTimeFormat('id-ID').format(unformattedStartDate) + ' (' + relativeDateFormatter(unformattedStartDate) + ')'
        tempData.end_date = new Intl.DateTimeFormat('id-ID').format(unformattedEndDate) + ' (' + relativeDateFormatter(unformattedEndDate) + ')'
        return tempData
      })
      console.log('l', l)
      return l
    }
  },
  created() {},
  mounted() {},
  methods: {
    showMore() {},
    delete() {},
  },
};
</script>
