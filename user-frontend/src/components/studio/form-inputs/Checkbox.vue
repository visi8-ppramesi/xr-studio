<template>
  <div class="flex justify-center py-2">
    <div class="mb-3 w-full mx-96 xl:w-96">
      <div class="form-check">
        <input
          class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
          type="checkbox"
          v-model="myValue"
        />
        <label
          class="form-check-label inline-block text-gray-800"
          for="flexCheckDefault"
        >
          {{ field.label }}
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CheckboxInput",
  props: ["modelValue", "field"],
  emits: ["change"],
  data() {
    return {
      myValue: false,
    };
  },
  watch: {
    modelValue: {
      immediate: true,
      handler() {
        this.myValue = this.modelValue;
      },
    },
    myValue() {
      this.$emit("change", { target: { value: this.myValue } });
    },
  },
  methods: {},
};
</script>
