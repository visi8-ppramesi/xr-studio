<template>
  <section class="px-6 py-12 md:px-12 bg-gray-100 text-gray-800">
    <h2 class="text-3xl font-bold mb-12 text-center" @click="checkFormData">
      Schedule Shoot
    </h2>
    <div class="mb-12">
      <label class="block text-gray-700 text-sm font-bold mb-2">
        Current Prices
      </label>
      <table
        v-if="procTypes.length > 0"
        class="max-w-screen w-full text-center"
      >
        <thead class="border-b bg-gray-800">
          <tr>
            <th class="text-sm text-white px-6 py-4 cursor-pointer">Name</th>
            <th class="text-sm text-white px-6 py-4 cursor-pointer">
              Description
            </th>
            <th class="text-sm text-white px-6 py-4 cursor-pointer">Price</th>
            <th class="text-sm text-white px-6 py-4 cursor-pointer">
              Price Unit
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="procType in procTypes"
            class="bg-white border-b hover:bg-sky-50 cursor-pointer"
            :key="procType.id"
          >
            <td
              class="px-6 xl:px-8 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
            >
              {{ procType.name }}
            </td>
            <td
              class="px-6 xl:px-8 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
            >
              {{ procType.description }}
            </td>
            <td
              class="px-6 xl:px-8 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
            >
              {{ formatters.currency(procType.price) }}
            </td>
            <td
              class="px-6 xl:px-8 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
            >
              {{ procType.price_unit }}
            </td>
          </tr>
        </tbody>
      </table>
      <div v-else></div>
    </div>
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
          @click="submit"
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
import isFunction from "lodash/isFunction";
import startCase from "lodash/startCase";
import pick from "lodash/pick";
import { vedhg } from "@/utils/dateRangeHash";
import { useCartStore } from "@/store/cart";
// import dayjs from "dayjs";

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
            type: "datepicker",
            name: "shootStartDate",
            label: "Shoot Start Date (Tentative)",
          },
          {
            type: "datepicker",
            name: "shootEndDate",
            label: "Shoot End Date",
          },
          {
            type: "textarea",
            name: "notes",
            label: "Description",
            placeholder:
              "How can we help you? (tell us if you need shoot equipments or XR Assets)",
          },
        ],
        xr: [
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
            type: "datepicker",
            name: "shootStartDate",
            label: "Shoot Start Date (Tentative)",
          },
          {
            type: "datepicker",
            name: "shootEndDate",
            label: "Shoot End Date",
          },
          {
            type: "textarea",
            name: "notes",
            label: "Description",
            placeholder:
              "How can we help you? (tell us if you need shoot equipments or XR Assets)",
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
    this.checkCartForSchedule();
  },
  methods: {
    showField(fieldName) {
      (this.fields.find((v) => v.name === fieldName) || {}).show = true;
    },
    hideField(fieldName) {
      (this.fields.find((v) => v.name === fieldName) || {}).show = false;
    },
    checkFormData() {
      const shoots = this.cartStore.getShootings();
      window.shitSandwich = this.formData;
      window.poopSandwich = shoots;
    },
    checkCartForSchedule() {
      const shoots = this.cartStore.getShootings();
      let rentStudio = shoots.find(
        (v) => v.extra_data.schedule_type == "rent_xr_studio"
      );
      const rentRehearsal = shoots.find(
        (v) => v.extra_data.schedule_type == "rent_studio_rehearsal"
      );
      let rentArtSetup;
      let shootType;
      if (rentStudio) {
        rentArtSetup = shoots.find(
          (v) => v.extra_data.schedule_type == "rent_studio_art_setup_xr"
        );
        shootType = "xr";
      } else {
        rentStudio = shoots.find(
          (v) => v.extra_data.schedule_type == "rent_non_xr_studio"
        );
        rentArtSetup = shoots.find(
          (v) => v.extra_data.schedule_type == "rent_studio_art_setup_non_xr"
        );
        shootType = "nonxr";
      }

      if (rentStudio) {
        this.showSubmit = true;
        this.shootType = shootType;
        this.changeShootType();
        const [shootStartDate, shootEndDate] = vedhg.decodeHash(rentStudio.id);
        this.formData.shootStartDate = shootStartDate;
        this.formData.shootEndDate = shootEndDate;
        this.formData.notes = rentStudio.extra_data.notes;

        if (rentArtSetup) {
          const [artSetupStartDate, artSetupEndDate] = vedhg.decodeHash(
            rentArtSetup.id
          );
          this.formData.toggleArtSetup = true;
          this.onChangeToggleArtSetup(true);
          this.formData.artSetupStartDate = artSetupStartDate;
          this.formData.artSetupEndDate = artSetupEndDate;
        }

        if (rentRehearsal) {
          const [rehearsalStartDate, rehearsalEndDate] = vedhg.decodeHash(
            rentRehearsal.id
          );
          this.formData.toggleRehearsal = true;
          this.onChangeToggleRehearsal(true);
          this.formData.rehearsalStartDate = rehearsalStartDate;
          this.formData.rehearsalEndDate = rehearsalEndDate;
        }
      }
    },
    changeShootType() {
      if (!isNil(this.shootType)) {
        this.fields = [...this.selectedFields[this.shootType]];
        this.formData = {};
        // this.showSubmit = true;
      } else {
        this.showSubmit = false;
      }
    },
    onChangeShootStartDate() {
      const { shootStartDate, shootEndDate } = this.formData;
      if (shootStartDate && shootEndDate) {
        this.showSubmit = true;
      }
    },
    onChangeShootEndDate() {
      const { shootStartDate, shootEndDate } = this.formData;
      if (shootStartDate && shootEndDate) {
        this.showSubmit = true;
      }
    },
    onChangeToggleArtSetup(val) {
      if (val) {
        this.showField("artSetupStartDate");
        this.showField("artSetupEndDate");
      } else {
        this.hideField("artSetupStartDate");
        this.hideField("artSetupEndDate");
      }
    },
    onChangeToggleRehearsal(val) {
      if (val) {
        this.showField("rehearsalStartDate");
        this.showField("rehearsalEndDate");
      } else {
        this.hideField("rehearsalStartDate");
        this.hideField("rehearsalEndDate");
      }
    },
    onComponentChange(fieldName, value) {
      const functionName =
        "onChange" + startCase(fieldName).split(" ").join("");
      if (!isNil(this[functionName]) && isFunction(this[functionName])) {
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
      const [procTypePrices, myProcTypes] =
        await ProcedureTypes.getDocuments().then((procTypes) => {
          const prices = procTypes.reduce(
            (acc, v) => {
              acc[0][v.id] = v.price;
              acc[1].push(
                pick(v, ["id", "name", "description", "price", "price_unit"])
              );
              return acc;
            },
            [{}, []]
          );
          return prices;
        });
      this.procTypesPrices = procTypePrices;
      this.procTypes = myProcTypes;
    },
    submit() {
      const { shootStartDate, shootEndDate } = this.formData;
      const { rehearsalStartDate, rehearsalEndDate } = this.formData;
      const { artSetupStartDate, artSetupEndDate } = this.formData;

      let shootCode, artSetupCode;
      const prices = {};
      try {
        if (this.shootType == "xr") {
          shootCode = vedhg.encodeDates(
            shootStartDate,
            shootEndDate,
            "rent_xr_studio"
          );
          prices.shootPrice = this.processors.calculateTotalDailyPrice(
            shootStartDate,
            shootEndDate,
            this.formatters.ceil(vedhg.getIntervalLength(shootCode, "days"), 2),
            this.procTypesPrices["rent_xr_studio"]
          );

          if (!isNil(artSetupStartDate) && !isNil(artSetupEndDate)) {
            artSetupCode = vedhg.encodeDates(
              artSetupStartDate,
              artSetupEndDate,
              "rent_studio_art_setup_xr"
            );

            prices.artSetupPrice = this.processors.calculateTotalDailyPrice(
              artSetupStartDate,
              artSetupEndDate,
              this.formatters.ceil(
                vedhg.getIntervalLength(artSetupCode, "days"),
                2
              ),
              this.procTypesPrices["rent_studio_art_setup_xr"]
            );
          }
        } else if (this.shootType == "nonxr") {
          shootCode = vedhg.encodeDates(
            shootStartDate,
            shootEndDate,
            "rent_non_xr_studio"
          );
          prices.shootPrice = this.processors.calculateTotalDailyPrice(
            shootStartDate,
            shootEndDate,
            this.formatters.ceil(vedhg.getIntervalLength(shootCode, "days"), 2),
            this.procTypesPrices["rent_non_xr_studio"]
          );

          if (!isNil(artSetupStartDate) && !isNil(artSetupEndDate)) {
            artSetupCode = vedhg.encodeDates(
              artSetupStartDate,
              artSetupEndDate,
              "rent_studio_art_setup_non_xr"
            );

            prices.artSetupPrice = this.processors.calculateTotalDailyPrice(
              artSetupStartDate,
              artSetupEndDate,
              this.formatters.ceil(
                vedhg.getIntervalLength(artSetupCode, "days"),
                2
              ),
              this.procTypesPrices["rent_studio_art_setup_non_xr"]
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

          prices.rehearsalPrice = this.processors.calculateTotalDailyPrice(
            rehearsalStartDate,
            rehearsalEndDate,
            this.formatters.ceil(
              vedhg.getIntervalLength(rehearsalCode, "days"),
              2
            ),
            this.procTypesPrices["rent_studio_rehearsal"]
          );
          checkB = !vedhg.hashesOverlap(shootCode, rehearsalCode);
        }

        if (!isNil(artSetupCode)) {
          if (!isNil(rehearsalStartDate) && !isNil(rehearsalEndDate)) {
            checkC = !vedhg.hashesOverlap(artSetupCode, rehearsalCode);
          }
          checkA = !vedhg.hashesOverlap(shootCode, artSetupCode);
        }

        if (checkA && checkB && checkC) {
          this.cartStore.clearShootings();
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
              price: prices.shootPrice,
              extra_data: {
                notes: this.formData.notes,
                schedule_type:
                  this.shootType == "xr"
                    ? "rent_xr_studio"
                    : "rent_non_xr_studio",
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
              price: prices.artSetupPrice,
              extra_data: {
                notes: this.formData.notes,
                schedule_type:
                  this.shootType == "xr"
                    ? "rent_studio_art_setup_xr"
                    : "rent_studio_art_setup_non_xr",
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
              price: prices.rehearsalPrice,
              extra_data: {
                notes: this.formData.notes,
                schedule_type: "rent_studio_rehearsal",
              },
            });
          }
        } else {
          throw new Error("Dates overlap");
        }
      } catch (error) {
        console.error(error);
        this.$toast.open({
          message: "Schedule shoot failed: " + error.message,
          position: "bottom",
          type: "error",
          duration: 5000,
          dismissible: true,
        });
        return;
      }

      this.$router.push({ name: "ConfirmShoot" });
      //add to cart
    },
  },
};
</script>
