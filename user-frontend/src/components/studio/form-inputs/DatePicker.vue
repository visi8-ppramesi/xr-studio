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
        v-if="showDatePicker"
        as-single
        ref="shitFuckDatePicker"
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
import dayjs from "dayjs";
export default {
  setup() {
    const recursionLocker = recursionLock("datePicker");

    return { recursionLocker };
  },
  components: { VueTailwindDatePicker },
  name: "DatePickerInput",
  props: ["field", "modelValue"],
  emits: ["update:modelValue", "change"],
  data() {
    return {
      showDatePicker: true,
      myDate: [],
      formatter: {
        date: "YYYY-MM-DD HH:mm:ss",
        month: "MMM",
      },
    };
  },
  watch: {
    modelValue: {
      immediate: true,
      handler() {
        let date;
        if (
          (this.modelValue instanceof Date && isNaN(this.modelValue)) ||
          isNil(this.modelValue)
        ) {
          this.myDate = [];
        } else {
          if (this.modelValue instanceof Date) {
            date = this.modelValue.toISOString();
          } else {
            date = this.modelValue;
          }
          this.showDatePicker = false;
          this.myDate = [
            dayjs(date)
              .set("hour", 9)
              .set("minute", 0)
              .set("second", 0)
              .format(this.formatter.date),
          ];
          this.$nextTick().then(() => {
            this.showDatePicker = true;
          });
        }
      },
    },
    // modelValue: {
    //   immediate: true,
    //   handler() {
    //     let date;
    //     console.log("modelValue", this.modelValue);
    //     if (
    //       (this.modelValue instanceof Date && isNaN(this.modelValue)) ||
    //       isNil(this.modelValue)
    //     ) {
    //       this.myDate = [];
    //     } else {
    //       this.showDatePicker = false;
    //       if (this.modelValue instanceof Date) {
    //         date = this.modelValue.toISOString();
    //       } else {
    //         date = this.modelValue;
    //       }
    //       this.myDate = dayjs(date).format(this.formatter.date);
    //       this.$nextTick().then(() => {
    //         this.showDatePicker = true;
    //       });
    //     }
    //   },
    // },
    myDate() {
      this.recursionLocker(this.modelValueUpdateEmitter);
    },
  },
  methods: {
    modelValueUpdateEmitter() {
      this.$emit("update:modelValue", new Date(this.myDate[0]));
      this.$emit("change", { target: { value: new Date(this.myDate[0]) } });
    },
  },
};
</script>
