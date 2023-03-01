<template>
  <div class="container my-24 px-6 mx-auto">
    <section class="mb-32 text-gray-800">
      <div class="flex justify-center">
        <div class="text-center lg:max-w-3xl md:max-w-xl">
          <h2 class="text-3xl font-bold mb-12 px-6">Contact Us</h2>
        </div>
      </div>

      <div class="flex justify-center">
        <div
          class="mb-12 grow-0 shrink-0 basis-auto w-full lg:w-5/12 px-3 lg:px-6"
        >
          <div class="flex items-start">
            <div class="shrink-0">
              <div
                class="p-4 bg-blue-600 rounded-md shadow-md w-20 h-20 flex items-center justify-center"
              >
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="headset"
                  class="w-10 text-white"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="40 40 100 100"
                >
                  <path
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#fff"
                    fill-rule="evenodd"
                    d="M68.772 55.603c-1.378-3.061-2.828-3.123-4.137-3.176l-3.524-.043c-1.226 0-3.218.46-4.902 2.3s-6.435 6.287-6.435 15.332 6.588 17.785 7.506 19.013 12.718 20.381 31.405 27.75c15.529 6.124 18.689 4.906 22.061 4.6s10.877-4.447 12.408-8.74 1.532-7.971 1.073-8.74-1.685-1.226-3.525-2.146-10.877-5.367-12.562-5.981-2.91-.919-4.137.921-4.746 5.979-5.819 7.206-2.144 1.381-3.984.462-7.76-2.861-14.784-9.124c-5.465-4.873-9.154-10.891-10.228-12.73s-.114-2.835.808-3.751c.825-.824 1.838-2.147 2.759-3.22s1.224-1.84 1.836-3.065.307-2.301-.153-3.22-4.032-10.011-5.666-13.647"
                  />
                </svg>
              </div>
            </div>
            <div class="grow ml-6">
              <p
                class="font-bold mb-1 no-underline hover:underline text-blue-600 cursor-pointer"
              >
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://wa.me/6281485596321?text=hello%20how%20can%20i%20help%20you"
                  >Whatsapp</a
                >
              </p>
              <p class="text-gray-500">test@test.com</p>
              <p class="text-gray-500">+6281485596321</p>
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-center">
        <div
          class="grow-0 shrink-0 basis-auto mb-12 lg:mb-0 w-full lg:w-5/12 px-3 lg:px-6"
        >
          <form @submit.prevent="submit">
            <div class="form-group mb-6">
              <input
                type="text"
                class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="exampleInput7"
                placeholder="Name"
                :disabled="isLoggedIn"
                v-model="name"
              />
            </div>
            <div class="form-group mb-6">
              <input
                type="email"
                class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="exampleInput8"
                placeholder="Email address"
                :disabled="isLoggedIn"
                v-model="email"
              />
            </div>
            <div class="form-group mb-6">
              <textarea
                class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="exampleFormControlTextarea13"
                rows="3"
                placeholder="Message"
                v-model="message"
              ></textarea>
            </div>
            <!-- <div class="form-group form-check text-center mb-6">
              <input
                type="checkbox"
                class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain mr-2 cursor-pointer"
                id="exampleCheck87"
                checked
              />
              <label
                class="form-check-label inline-block text-gray-800"
                for="exampleCheck87"
                >Send me a copy of this message</label
              >
            </div> -->
            <button
              type="submit"
              class="mb-8 inline-block px-20 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            >
              Submit
            </button>
          </form>
        </div>
        <!-- <div class="grow-0 shrink-0 basis-auto w-full lg:w-7/12">
          <div class="flex flex-wrap">
            <div
              class="mb-12 grow-0 shrink-0 basis-auto w-full lg:w-6/12 px-3 lg:px-6"
            >
              <div class="flex items-start">
                <div class="shrink-0">
                  <div
                    class="p-4 bg-blue-600 rounded-md shadow-md w-14 h-14 flex items-center justify-center"
                  >
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="headset"
                      class="w-5 text-white"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="40 40 90 90"
                    >
                      <path
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#fff"
                        fill-rule="evenodd"
                        d="M68.772 55.603c-1.378-3.061-2.828-3.123-4.137-3.176l-3.524-.043c-1.226 0-3.218.46-4.902 2.3s-6.435 6.287-6.435 15.332 6.588 17.785 7.506 19.013 12.718 20.381 31.405 27.75c15.529 6.124 18.689 4.906 22.061 4.6s10.877-4.447 12.408-8.74 1.532-7.971 1.073-8.74-1.685-1.226-3.525-2.146-10.877-5.367-12.562-5.981-2.91-.919-4.137.921-4.746 5.979-5.819 7.206-2.144 1.381-3.984.462-7.76-2.861-14.784-9.124c-5.465-4.873-9.154-10.891-10.228-12.73s-.114-2.835.808-3.751c.825-.824 1.838-2.147 2.759-3.22s1.224-1.84 1.836-3.065.307-2.301-.153-3.22-4.032-10.011-5.666-13.647"
                      />
                    </svg>
                  </div>
                </div>
                <div class="grow ml-6">
                  <p class="font-bold mb-1">
                    <a
                      href="https://wa.me/6281485596321?text=hello%20how%20can%20i%20help%20you"
                    ></a
                    >Whatsapp
                  </p>
                  <p class="text-gray-500">ppramesi@visi8.com</p>
                  <p class="text-gray-500">+6281485596321</p>
                </div>
              </div>
            </div>
            <div
              class="mb-12 grow-0 shrink-0 basis-auto w-full lg:w-6/12 px-3 lg:px-6"
            >
              <div class="flex items-start">
                <div class="shrink-0">
                  <div
                    class="p-4 bg-blue-600 rounded-md shadow-md w-14 h-14 flex items-center justify-center"
                  >
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="dollar-sign"
                      class="w-3 text-white"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 288 512"
                    >
                      <path
                        fill="currentColor"
                        d="M209.2 233.4l-108-31.6C88.7 198.2 80 186.5 80 173.5c0-16.3 13.2-29.5 29.5-29.5h66.3c12.2 0 24.2 3.7 34.2 10.5 6.1 4.1 14.3 3.1 19.5-2l34.8-34c7.1-6.9 6.1-18.4-1.8-24.5C238 74.8 207.4 64.1 176 64V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48h-2.5C45.8 64-5.4 118.7.5 183.6c4.2 46.1 39.4 83.6 83.8 96.6l102.5 30c12.5 3.7 21.2 15.3 21.2 28.3 0 16.3-13.2 29.5-29.5 29.5h-66.3C100 368 88 364.3 78 357.5c-6.1-4.1-14.3-3.1-19.5 2l-34.8 34c-7.1 6.9-6.1 18.4 1.8 24.5 24.5 19.2 55.1 29.9 86.5 30v48c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-48.2c46.6-.9 90.3-28.6 105.7-72.7 21.5-61.6-14.6-124.8-72.5-141.7z"
                      ></path>
                    </svg>
                  </div>
                </div>
                <div class="grow ml-6">
                  <p class="font-bold mb-1">Payment Issue</p>
                  <p class="text-gray-500">payment@gmail.com</p>
                  <p class="text-gray-500">+82273857658</p>
                </div>
              </div>
            </div>
            <div
              class="mb-12 grow-0 shrink-0 basis-auto w-full lg:w-6/12 px-3 lg:px-6"
            >
              <div class="flex align-start">
                <div class="shrink-0">
                  <div
                    class="p-4 bg-blue-600 rounded-md shadow-md w-14 h-14 flex items-center justify-center"
                  >
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="newspaper"
                      class="w-5 text-white"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 576 512"
                    >
                      <path
                        fill="currentColor"
                        d="M552 64H88c-13.255 0-24 10.745-24 24v8H24c-13.255 0-24 10.745-24 24v272c0 30.928 25.072 56 56 56h472c26.51 0 48-21.49 48-48V88c0-13.255-10.745-24-24-24zM56 400a8 8 0 0 1-8-8V144h16v248a8 8 0 0 1-8 8zm236-16H140c-6.627 0-12-5.373-12-12v-8c0-6.627 5.373-12 12-12h152c6.627 0 12 5.373 12 12v8c0 6.627-5.373 12-12 12zm208 0H348c-6.627 0-12-5.373-12-12v-8c0-6.627 5.373-12 12-12h152c6.627 0 12 5.373 12 12v8c0 6.627-5.373 12-12 12zm-208-96H140c-6.627 0-12-5.373-12-12v-8c0-6.627 5.373-12 12-12h152c6.627 0 12 5.373 12 12v8c0 6.627-5.373 12-12 12zm208 0H348c-6.627 0-12-5.373-12-12v-8c0-6.627 5.373-12 12-12h152c6.627 0 12 5.373 12 12v8c0 6.627-5.373 12-12 12zm0-96H140c-6.627 0-12-5.373-12-12v-40c0-6.627 5.373-12 12-12h360c6.627 0 12 5.373 12 12v40c0 6.627-5.373 12-12 12z"
                      ></path>
                    </svg>
                  </div>
                </div>
                <div class="grow ml-6">
                  <p class="font-bold mb-1">Partnership</p>
                  <p class="text-gray-500">partner@gmail.com</p>
                  <p class="text-gray-500">+8129385569</p>
                </div>
              </div>
            </div>
            <div
              class="mb-12 grow-0 shrink-0 basis-auto w-full lg:w-6/12 px-3 lg:px-6"
            >
              <div class="flex align-start">
                <div class="shrink-0">
                  <div
                    class="p-4 bg-blue-600 rounded-md shadow-md w-14 h-14 flex items-center justify-center"
                  >
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="bug"
                      class="w-5 text-white"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="currentColor"
                        d="M511.988 288.9c-.478 17.43-15.217 31.1-32.653 31.1H424v16c0 21.864-4.882 42.584-13.6 61.145l60.228 60.228c12.496 12.497 12.496 32.758 0 45.255-12.498 12.497-32.759 12.496-45.256 0l-54.736-54.736C345.886 467.965 314.351 480 280 480V236c0-6.627-5.373-12-12-12h-24c-6.627 0-12 5.373-12 12v244c-34.351 0-65.886-12.035-90.636-32.108l-54.736 54.736c-12.498 12.497-32.759 12.496-45.256 0-12.496-12.497-12.496-32.758 0-45.255l60.228-60.228C92.882 378.584 88 357.864 88 336v-16H32.666C15.23 320 .491 306.33.013 288.9-.484 270.816 14.028 256 32 256h56v-58.745l-46.628-46.628c-12.496-12.497-12.496-32.758 0-45.255 12.498-12.497 32.758-12.497 45.256 0L141.255 160h229.489l54.627-54.627c12.498-12.497 32.758-12.497 45.256 0 12.496 12.497 12.496 32.758 0 45.255L424 197.255V256h56c17.972 0 32.484 14.816 31.988 32.9zM257 0c-61.856 0-112 50.144-112 112h224C369 50.144 318.856 0 257 0z"
                      ></path>
                    </svg>
                  </div>
                </div>
                <div class="grow ml-6">
                  <p class="font-bold mb-1">Ask Question</p>
                  <p class="text-gray-500">question@gmail.com</p>
                  <p class="text-gray-500">+8127839475</p>
                </div>
              </div>
            </div>
          </div>
        </div> -->
      </div>
    </section>
  </div>
</template>

<script>
import { useAuthStore } from "@/store/auth";
import { ref } from "vue";

export default {
  setup() {
    const message = ref("");
    const email = ref("");
    const name = ref("");
    const isLoggedIn = ref(false);

    const authStore = useAuthStore();
    authStore.loginPromise.then(() => {
      email.value = authStore.userInstance.email;
      name.value = authStore.userInstance.full_name;
      isLoggedIn.value = authStore.isLoggedIn;
    });

    return {
      isLoggedIn,
      name,
      message,
      email,
    };
  },
  name: "contact-us",
  methods: {
    submit() {
      console.log(this.name, this.message, this.email);
    },
  },
};
</script>
