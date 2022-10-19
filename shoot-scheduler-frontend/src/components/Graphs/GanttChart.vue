<template>
  <div ref="ganttContainer" class="gantt"></div>
</template>

<script>
import gantt from 'frappe-gantt'

export default{
  props: {
    ganttData: {
      type: Array
    }
  },
  data(){
    return {
      ganttInstance: null
    }
  },
  mounted(){
    this.ganttInstance = new gantt(this.$refs.ganttContainer, this.ganttData)
  }
}
</script>
