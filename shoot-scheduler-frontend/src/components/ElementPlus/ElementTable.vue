<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column v-for="(header, idx) in headers" :key="'table-header-' + idx" :label="header.label" :prop="header.prop" />
    <el-table-column align="right">
      <template #default="scope">
        <el-button
          v-if="leftActionText && leftActionText.length > 0"
          size="small"
          @click="leftActionHandler(scope.$index, scope.row)"
          >{{ leftActionText }}</el-button
        >
        <el-button
          v-if="rightActionText && rightActionText.length > 0"
          size="small"
          @click="rightActionHandler(scope.$index, scope.row)"
          >{{ rightActionText }}</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: {
    tableData: {
      type: Array,
      default: [
        {
          name: 'Name'
        }
      ]
    },
    headers: {
      type: Array,
      default: [
        {
          label: 'Name',
          prop: 'name',
        }
      ],
      required: true
    },
    leftActionText: {
      type: String,
      default: 'Edit'
    },
    rightActionText: {
      type: String,
      default: 'Delete'
    },
  },
  methods: {
    leftActionHandler(index, row){
      this.$emit('leftAction', {index, row})
    },
    rightActionHandler(index, row){
      this.$emit('rightAction', {index, row})
    }
  }
}
</script>

<!-- <script setup>
import { computed, ref, defineProps } from 'vue'

// const search = ref('')
// const filterTableData = computed(() =>
//   tableData.filter(
//     (data) =>
//       !search.value ||
//       data.name.toLowerCase().includes(search.value.toLowerCase())
//   )
// )

const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'John',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Morgan',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Jessy',
    address: 'No. 189, Grove St, Los Angeles',
  },
]
</script> -->
