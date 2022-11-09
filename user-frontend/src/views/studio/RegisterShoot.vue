<template>
  <div>
    <form class="bg-white rounded px-8 pt-6 pb-8 mb-4">
      <div v-for="field in fields" :key="field.id">
        <component
          :is="components[field.name]"
          v-model="formData[field.name]"
        />
      </div>
      <div>
        <button
          @click="register()"
          type="button"
          class="mb-8 inline-block px-20 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        >
          Submit
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { ProcedureTypes } from "@/firebase/collections/procedure-types";
import StudioInputText from "@/components/studio/form-inputs/Text.vue";
import StudioInputTextarea from "@/components/studio/form-inputs/Textarea.vue";
import StudioInputSelect from "@/components/studio/form-inputs/Select.vue";
import StudioInputCheckbox from "@/components/studio/form-inputs/Checkbox.vue";
import StudioInputDatePicker from "@/components/studio/form-inputs/DatePicker.vue";
export default {
  data() {
    return {
      procTypes: [],
      fields: [],
      formData: {},
      components: {
        text: StudioInputText,
        textarea: StudioInputTextarea,
        select: StudioInputSelect,
        checkbox: StudioInputCheckbox,
        datepicker: StudioInputDatePicker,
      },
    };
  },
  mounted() {
    this.getProcTypes();
  },
  methods: {
    async getProcTypes() {
      this.procTypes = await ProcedureTypes.getDocuments();
    },
    register() {
      console.log(this.formData);
    },
  },
};
</script>
