<template>
  <div class="flex justify-center py-2">
    <div class="mb-3 w-full mx-96 xl:w-96">
      <label
        for="exampleFormControlTextarea1"
        class="form-label inline-block mb-2 text-gray-700"
        >{{ field.label }}</label
      >
      <textarea
        class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        rows="3"
        :placeholder="field.placeholder"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "TextareaInput",
  props: ["modelValue", "field"],
  emits: ["update:modelValue"],
};
</script>
