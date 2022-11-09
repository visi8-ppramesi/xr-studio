<template>
  <!-- <div class="flex items-center justify-center">
    <div
      class="datepicker relative form-floating mb-3 xl:w-96"
      data-mdb-toggle-button="false"
    >
      <input
        type="text"
        class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        placeholder="Select a date"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
      />
      <label for="floatingInput" class="text-gray-700">{{ field.label }}</label>
      <button class="datepicker-toggle-button" data-mdb-toggle="datepicker">
        <i class="fas fa-calendar datepicker-toggle-icon">aaa</i>
      </button>
    </div>
  </div> -->
  <div class="flex items-center justify-center">
    <div
      class="datepicker relative form-floating mb-3 xl:w-96"
      data-mdb-toggle-button="false"
    >
      <VueTailwindDatePicker
        as-single
        :placeholder="field.label"
        v-model="myDate"
      />
    </div>
  </div>
</template>

<script>
import VueTailwindDatePicker from "vue-tailwind-datepicker";
export default {
  components: { VueTailwindDatePicker },
  name: "DatePickerInput",
  props: ["modelValue", "field"],
  emits: ["update:modelValue"],
  data() {
    return {
      myDate: [],
    };
  },
  watch: {
    modelValue() {
      let date;
      if (this.modelValue instanceof Date) {
        date = this.modelValue.toISOString();
      } else {
        date = this.modelValue;
      }
      this.myDate = [date];
    },
    myDate() {
      this.$emit("update:modelValue", new Date(this.myDate[0]));
    },
  },
  methods: {
    inputEmit(v, $event) {
      console.log(v, $event);
      // this.$emit('update:modelValue', $event.target.value)
    },
  },
};
</script>
