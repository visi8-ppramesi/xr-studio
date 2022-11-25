<template>
  <div class="flex justify-center py-1">
    <div class="mb-3 w-full mx-96 xl:w-96">
      <label
        class="block text-gray-700 text-sm font-bold mb-2"
        :for="field.name"
      >
        {{ field.label }}
      </label>
      <input
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        :placeholder="field.placeholder"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "TextInput",
  props: ["modelValue", "field"],
  emits: ["update:modelValue"],
};
</script>
