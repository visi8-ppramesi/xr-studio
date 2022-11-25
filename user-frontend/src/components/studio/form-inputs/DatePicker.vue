<template>
  <div class="flex items-center justify-center">
    <div
      class="datepicker form-floating mb-3 xl:w-96"
      data-mdb-toggle-button="false"
    >
      <div
        class="relative block text-gray-700 text-sm font-bold mb-2"
        :for="field.name"
      >
        {{ field.label }}
      </div>
      <VueTailwindDatePicker
        as-single
        :placeholder="field.label"
        :formatter="formatter"
        v-model="myDate"
      />
    </div>
  </div>
</template>

<script>
import VueTailwindDatePicker from "vue-tailwind-datepicker";
import recursionLock from "@/composables/recursionLock";
import isNil from "lodash/isNil";
export default {
  setup() {
    const recursionLocker = recursionLock("datePicker");

    return { recursionLocker };
  },
  components: { VueTailwindDatePicker },
  name: "DatePickerInput",
  props: ["modelValue", "field"],
  emits: ["update:modelValue"],
  data() {
    return {
      myDate: [],
      formatter: {
        date: "DD MMM YYYY",
        month: "MMM",
      },
    };
  },
  watch: {
    modelValue() {
      let date;
      if (isNaN(this.modelValue) || isNil(this.modelValue)) {
        console.log(this.myDate, "myDate");
        this.myDate = [];
      } else {
        if (this.modelValue instanceof Date) {
          date = this.modelValue.toISOString();
        } else {
          date = this.modelValue;
        }
        this.myDate = [date];
      }
    },
    myDate() {
      this.recursionLocker(this.modelValueUpdateEmitter);
    },
  },
  methods: {
    modelValueUpdateEmitter() {
      this.$emit("update:modelValue", new Date(this.myDate[0]));
    },
  },
};
</script>
