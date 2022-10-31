<template>
  <div>
    <DataTable class="display">
      <thead>
        <tr>
          <th v-for="(header, idx) in headers" :key="'header-' + idx">
            {{ header.title }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td></td>
        </tr>
      </tbody>
    </DataTable>
  </div>
</template>

<script>
import DataTable from "datatables.net-vue3";

export default {
  components: {
    DataTable,
  },
  props: {
    headers: {
      type: Array,
      default: () => [
        {
          title: "Table 1",
          name: "table_1",
        },
        {
          title: "Table 2",
          name: "table_2",
        },
      ],
    },
    tableData: {
      type: Array,
      default: () => [
        {
          table_1: 1,
          table_2: 1,
        },
        {
          table_1: 1,
          table_2: 1,
        },
        {
          table_1: 1,
          table_2: 1,
        },
      ],
    },
  },
};
</script>

<style scoped></style>
