<template>
  <section class="px-6 py-12 md:px-12 bg-gray-100 text-gray-800">
    <h2 class="text-3xl font-bold mb-12 text-center" @click="checkFormData">
      Schedule Studio Tour
    </h2>
    <div class="flex justify-center py-2">
      <div class="mb-3 w-full mx-96 xl:w-96">
        <div class="relative block text-gray-700 text-sm font-bold mb-2">
          Schedule Tour Date
        </div>
        <div class="flex justify-center">
          <div class="mb-3 xl:w-96">
            <VueTailwindDatePicker
              as-single
              ref="shitFuckDatePicker"
              placeholder="Schedule Tour Date"
              :formatter="formatter"
              v-model="myDate"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-center py-2">
      <div class="mb-3 w-full mx-96 xl:w-96">
        <div class="relative block text-gray-700 text-sm font-bold mb-2">
          Schedule Tour Time Start
        </div>
        <div class="flex justify-center">
          <div class="mb-3 xl:w-96">
            <Datepicker
              v-model="startTime"
              placeholder="Schedule Tour Time Start"
              time-picker
            />
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-center py-2">
      <div class="mb-3 w-full mx-96 xl:w-96">
        <div class="relative block text-gray-700 text-sm font-bold mb-2">
          Schedule Tour Time End
        </div>
        <div class="flex justify-center">
          <div class="mb-3 xl:w-96">
            <Datepicker
              v-model="endTime"
              placeholder="Schedule Tour Time End"
              time-picker
            />
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-center py-2">
      <div class="mb-3 w-full mx-96 xl:w-96">
        <label
          for="exampleFormControlTextarea1"
          class="form-label inline-block mb-2 font-bold text-gray-700"
        >
          Notes
        </label>
        <div class="flex justify-center">
          <div class="mb-3 xl:w-96">
            <textarea
              class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              rows="3"
              placeholder="Notes"
              v-model="notes"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-center py-2">
      <div class="mb-3 w-full mx-96 xl:w-96">
        <label
          for="exampleFormControlTextarea1"
          class="form-label inline-block mb-2 font-bold text-gray-700"
        >
          Email
        </label>
        <div class="flex justify-center">
          <div class="mb-3 xl:w-96">
            <input
              class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Email Address"
              v-model="email"
              :disabled="isLoggedIn"
              type="text"
            />
          </div>
        </div>
      </div>
    </div>
    <div>
      <button
        @click="submit"
        type="button"
        class="mb-8 inline-block px-20 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
      >
        Submit
      </button>
    </div>
  </section>
</template>

<script>
/*
    todo:
        add email field. check if logged in, if logged in use user email and hide
        email field. requested_by add field if logged in, use ref to user.
        
*/
import { ref } from "vue";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import VueTailwindDatePicker from "vue-tailwind-datepicker";
import { createStudioTour } from "@/composables/submitStudioTour";
import { useAuthStore } from "@/store/auth";

export default {
  setup() {
    const startTime = ref(null);
    const endTime = ref(null);

    const myDate = ref([]);

    const notes = ref("");
    const email = ref("");
    const authStore = useAuthStore();
    authStore.loginPromise.then(() => {
      email.value = authStore.userInstance.email;
    });

    return {
      isLoggedIn: authStore.isLoggedIn,
      startTime,
      endTime,
      myDate,
      formatter: {
        date: "YYYY-MM-DD",
        month: "MMM",
      },
      notes,
      email,
    };
  },
  components: {
    VueTailwindDatePicker,
    Datepicker,
  },
  methods: {
    async submit() {
      const startDate = new Date(this.myDate[0]);
      const endDate = new Date(this.myDate[0]);
      const startTime = startDate.setHours(
        this.startTime.hours,
        this.startTime.minutes
      );
      endDate.setHours(this.endTime.hours, this.endTime.minutes);
      const length = Math.abs(endDate - startDate);
      const rightNow = new Date().getTime();
      try {
        if (rightNow > startTime) {
          throw new Error("Start date needs to be in the future.");
        }
        if (length > 1000 * 60 * 60 * 2) {
          const data = {
            startDate,
            endDate,
            location: "main-location",
            notes: this.notes,
            email: this.email,
          };
          await createStudioTour(data);
        } else {
          throw new Error("Too short. Minimum length 2 hours.");
        }
      } catch (error) {
        console.error(error);
        this.$toast.open({
          message: "Schedule studio tour failed: " + error.message,
          position: "bottom",
          type: "error",
          duration: 5000,
          dismissible: true,
        });
      }
    },
  },
};
</script>

<style></style>
