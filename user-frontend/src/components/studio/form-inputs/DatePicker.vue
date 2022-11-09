<template>
  <div class="flex items-center justify-center">
    <div class="datepicker relative form-floating mb-3 xl:w-96">
      <input
        type="text"
        class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        placeholder="Select a date"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
      />
      <label for="floatingInput" class="text-gray-700">Select a date</label>
    </div>
  </div>
</template>

<script>
export default {
  name: "DatePickerInput",
  props: ["modelValue", "field"],
  emits: ["update:modelValue"],
};
</script>
