<template>
  <section class="px-6 py-12 md:px-12 bg-gray-100 text-gray-800">
    <h2 class="text-3xl font-bold mb-12 text-center">Schedule Shoot</h2>
    <div class="relative block text-gray-700 text-sm font-bold mb-2">
      Select Shoot Type:
    </div>
    <div class="flex justify-center">
      <div class="mb-3 xl:w-96">
        <select
          class="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          aria-label="Default select example"
          v-model="shootType"
          @change="changeShootType"
        >
          <option disabled :value="null"></option>
          <option value="xr">Schedule XR Shoot</option>
          <option value="nonxr">Schedule Non-XR Shoot</option>
        </select>
      </div>
    </div>
    <form class="px-8 pt-6 pb-8 mb-4">
      <div v-for="field in fields" :key="field.id">
        <component
          :is="components[field.type]"
          :field="field"
          v-model="formData[field.name]"
          v-show="shouldBeShown(field.show)"
          @change="onComponentChange(field.name, $event.target.value)"
        />
      </div>
      <div>
        <button
          v-if="showSubmit"
          @click="register"
          type="button"
          class="mb-8 inline-block px-20 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        >
          Submit
        </button>
      </div>
    </form>
  </section>
</template>

<script>
import { ProcedureTypes } from "@/firebase/collections/procedure-types";
import StudioInputText from "@/components/studio/form-inputs/Text.vue";
import StudioInputTextarea from "@/components/studio/form-inputs/Textarea.vue";
import StudioInputSelect from "@/components/studio/form-inputs/Select.vue";
import StudioInputCheckbox from "@/components/studio/form-inputs/Checkbox.vue";
import StudioInputDatePicker from "@/components/studio/form-inputs/DatePicker.vue";
import StudioInputLabel from "@/components/studio/form-inputs/Label.vue";
import StudioInputBreak from "@/components/studio/form-inputs/Break.vue";
import { markRaw } from "vue";
import isNil from "lodash/isNil";
import startCase from "lodash/startCase";
import { vedhg } from "@/utils/dateRangeHash";
import { useCartStore } from "@/store/cart";

export default {
  setup() {
    const cartStore = useCartStore();
    return { cartStore };
  },
  data() {
    return {
      showSubmit: false,
      test: false,
      procTypes: [],
      shootType: null,
      selectedFields: {
        nonxr: [
          {
            type: "datepicker",
            name: "start_date",
            label: "Shoot Start Date (Tentative)",
          },
          {
            type: "datepicker",
            name: "end_date",
            label: "Shoot End Date",
          },
          //art setup
          {
            type: "checkbox",
            name: "toggleArtSetup",
            label: "Art Setup Required?",
          },
          {
            type: "datepicker",
            name: "artSetupStartDate",
            label: "Art Setup Start Date",
            show: false,
          },
          {
            type: "datepicker",
            name: "artSetupEndDate",
            label: "Art Setup End Date",
            show: false,
          },
          {
            type: "textarea",
            name: "notes",
            label: "Description",
            placeholder: "Do stuff",
          },
        ],
        xr: [
          {
            type: "datepicker",
            name: "shootStartDate",
            label: "Shoot Start Date (Tentative)",
          },
          {
            type: "datepicker",
            name: "shootEndDate",
            label: "Shoot End Date",
          },
          //rehearsal
          {
            type: "checkbox",
            name: "toggleRehearsal",
            label: "Rehearsal Required?",
          },
          {
            type: "datepicker",
            name: "rehearsalStartDate",
            label: "Rehearsal Start Date",
            show: false,
          },
          {
            type: "datepicker",
            name: "rehearsalEndDate",
            label: "Rehearsal End Date",
            show: false,
          },
          //art setup
          {
            type: "checkbox",
            name: "toggleArtSetup",
            label: "Art Setup Required?",
          },
          {
            type: "datepicker",
            name: "artSetupStartDate",
            label: "Art Setup Start Date",
            show: false,
          },
          {
            type: "datepicker",
            name: "artSetupEndDate",
            label: "Art Setup End Date",
            show: false,
          },
          {
            type: "textarea",
            name: "notes",
            label: "Description",
            placeholder: "Do stuff",
          },
        ],
      },
      fields: [],
      formData: {},
      components: {
        text: markRaw(StudioInputText),
        textarea: markRaw(StudioInputTextarea),
        select: markRaw(StudioInputSelect),
        checkbox: markRaw(StudioInputCheckbox),
        datepicker: markRaw(StudioInputDatePicker),
        break: markRaw(StudioInputBreak),
        label: markRaw(StudioInputLabel),
      },
    };
  },
  mounted() {
    this.getProcTypes();
  },
  methods: {
    changeShootType() {
      if (!isNil(this.shootType)) {
        this.fields = [...this.selectedFields[this.shootType]];
        this.formData = {};
        this.showSubmit = true;
      } else {
        this.showSubmit = false;
      }
    },
    onChangeToggleArtSetup(val) {
      if (val) {
        (
          this.fields.find((v) => v.name === "artSetupStartDate") || {}
        ).show = true;
        (
          this.fields.find((v) => v.name === "artSetupEndDate") || {}
        ).show = true;
      } else {
        (
          this.fields.find((v) => v.name === "artSetupStartDate") || {}
        ).show = false;
        (
          this.fields.find((v) => v.name === "artSetupEndDate") || {}
        ).show = false;
      }
    },
    onChangeToggleRehearsal(val) {
      if (val) {
        (
          this.fields.find((v) => v.name === "rehearsalStartDate") || {}
        ).show = true;
        (
          this.fields.find((v) => v.name === "rehearsalEndDate") || {}
        ).show = true;
      } else {
        (
          this.fields.find((v) => v.name === "rehearsalStartDate") || {}
        ).show = false;
        (
          this.fields.find((v) => v.name === "rehearsalEndDate") || {}
        ).show = false;
      }
    },
    onComponentChange(fieldName, value) {
      const functionName =
        "onChange" + startCase(fieldName).split(" ").join("");
      if (!isNil(this[functionName])) {
        this[functionName](value);
      }
    },
    shouldBeShown(shown) {
      if (isNil(shown)) {
        return true;
      }
      return shown;
    },
    async getProcTypes() {
      this.procTypesPrices = await ProcedureTypes.getDocuments().then(
        (procTypes) => {
          return procTypes.reduce((acc, v) => {
            acc[v.id] = v.price;
            return acc;
          }, {});
        }
      );
    },
    register() {
      const { shootStartDate, shootEndDate } = this.formData;
      const { rehearsalStartDate, rehearsalEndDate } = this.formData;
      const { artSetupStartDate, artSetupEndDate } = this.formData;

      let shootCode, artSetupCode;
      const prices = {};
      if (this.shootType == "xr") {
        shootCode = vedhg.encodeDates(
          shootStartDate,
          shootEndDate,
          "rent_xr_studio"
        );
        prices.shootCode =
          this.procTypesPrices["rent_xr_studio"] *
          this.formatters.round(vedhg.getIntervalLength(shootCode, "days"), 2);

        if (!isNil(artSetupStartDate) && !isNil(artSetupEndDate)) {
          artSetupCode = vedhg.encodeDates(
            artSetupStartDate,
            artSetupEndDate,
            "rent_studio_art_setup_xr"
          );
          prices.artSetupCode =
            this.procTypesPrices["rent_studio_art_setup_xr"] *
            this.formatters.round(
              vedhg.getIntervalLength(artSetupCode, "days"),
              2
            );
        }
      } else if (this.shootType == "nonxr") {
        shootCode = vedhg.encodeDates(
          shootStartDate,
          shootEndDate,
          "rent_non_xr_studio"
        );
        prices.shootCode =
          this.procTypesPrices["rent_non_xr_studio"] *
          this.formatters.round(vedhg.getIntervalLength(shootCode, "days"), 2);

        if (!isNil(artSetupStartDate) && !isNil(artSetupEndDate)) {
          artSetupCode = vedhg.encodeDates(
            artSetupStartDate,
            artSetupEndDate,
            "rent_studio_art_setup_non_xr"
          );
          prices.artSetupCode =
            this.procTypesPrices["rent_studio_art_setup_non_xr"] *
            this.formatters.round(
              vedhg.getIntervalLength(artSetupCode, "days"),
              2
            );
        }
      } else {
        throw new Error("Shoot type wrong");
      }

      let rehearsalCode;
      let checkB = true;
      let checkC = true;
      let checkA = true;
      if (!isNil(rehearsalStartDate) && !isNil(rehearsalEndDate)) {
        rehearsalCode = vedhg.encodeDates(
          rehearsalStartDate,
          rehearsalEndDate,
          "rent_studio_rehearsal"
        );
        checkB = !vedhg.hashesOverlap(shootCode, rehearsalCode);
        checkC = !vedhg.hashesOverlap(artSetupCode, rehearsalCode);
      }

      if (!isNil(artSetupCode)) {
        checkA = !vedhg.hashesOverlap(shootCode, artSetupCode);
      }

      if (checkA && checkB && checkC) {
        if (!isNil(shootCode)) {
          this.cartStore.addItem({
            image_url: null,
            type: "studio",
            name:
              "Schedule Shoot " +
              (this.shootType == "xr" ? "(XR)" : "(Non-XR)"),
            description: `${this.formatters.absoluteDate(
              shootStartDate
            )} - ${this.formatters.absoluteDate(shootEndDate)}`,
            id: shootCode,
            price: prices.shootCode,
            extra_data: {
              notes: this.formData.notes,
            },
          });
        }
        if (!isNil(artSetupCode)) {
          this.cartStore.addItem({
            image_url: null,
            type: "studio",
            name:
              "Schedule Art Setup " +
              (this.shootType == "xr" ? "(XR)" : "(Non-XR)"),
            description: `${this.formatters.absoluteDate(
              artSetupStartDate
            )} - ${this.formatters.absoluteDate(artSetupEndDate)}`,
            id: artSetupCode,
            price: prices.artSetupCode,
            extra_data: {
              notes: this.formData.notes,
            },
          });
        }
        if (!isNil(rehearsalCode)) {
          this.cartStore.addItem({
            image_url: null,
            type: "studio",
            name: "Schedule Rehearsal",
            description: `${this.formatters.absoluteDate(
              rehearsalStartDate
            )} - ${this.formatters.absoluteDate(rehearsalEndDate)}`,
            id: rehearsalCode,
            price: prices.rehearsalCode,
            extra_data: {
              notes: this.formData.notes,
            },
          });
        }
      } else {
        throw new Error("Dates overlap");
      }

      //add to cart
    },
  },
};
</script>
