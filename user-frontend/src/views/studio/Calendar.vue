<template>
  <div></div>
</template>

<script>
import Calendar from "@/components/graphs/Calendar.vue";
import Shoots from "@/firebase/collections/shoots/shoots"

export default {
  components: {
    Calendar,
  },
  data() {
    return {
      calendarData: [],
    };
  },
  created(){
    this.getCalendarData().then((calendarData) => {
      this.calendarData = calendarData
    })
  },
  methods: {
    async getCalendarData(){
      const shoots = await Shoots.getDocuments()
      //process shoots

      return shoots
    }
  }
};
</script>
