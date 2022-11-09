<template>
  <div class="flex justify-center py-1">
    <div class="mb-3 w-full mx-96 xl:w-96">
      <select
        class="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        aria-label="Default select example"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
      >
        <option
          v-for="item in field.options"
          :key="item.id"
          :value="item.value"
        >
          {{ item.label }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  name: "SelectInput",
  props: ["modelValue", "field"],
  emits: ["update:modelValue"],
};
</script>
