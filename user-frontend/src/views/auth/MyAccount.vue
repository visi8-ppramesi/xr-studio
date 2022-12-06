<template>
  <div class="flex justify-center items-center m-10">
    <div class="block rounded-lg shadow-lg bg-white px-6 py-12 md:px-12">
      <form>
        <div class="md:col-span-2">
          <div class="p-3">
            <div class="bg-slate-100 rounded border-2">
              <div class="grid grid-cols-6 gap-6">
                <div class="col-span-6 sm:col-span-4 lg:col-span-6">
                  <div id="my-account-profile" class="text-xl p-3 lg:p-5">
                    Profile Picture
                  </div>
                  <div class="px-3">
                    <img v-if="imageDataUrl" :src="imageDataUrl" />
                    <input
                      ref="profilePictureRef"
                      type="file"
                      accept="image/*"
                      style="display: none"
                      @change="onFileChange"
                    />
                    <button
                      id="my-account-profile-button"
                      class="font-bold px-3 my-3 border-2 rounded"
                      @click="selectProfilePicture"
                    >
                      Select Profile Picture
                    </button>
                  </div>
                </div>
                <div class="px-3 mt-5 col-span-6 sm:col-span-4 lg:col-span-6">
                  <label
                    id="my-account-username"
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="username"
                  >
                    Username
                  </label>
                  <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="text"
                    v-model="username"
                    placeholder="Username"
                  />
                </div>
                <div class="px-3 mt-5 col-span-6 sm:col-span-4 lg:col-span-6">
                  <label
                    id="my-account-email"
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="email"
                  >
                    Email
                  </label>
                  <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    type="text"
                    v-model="email"
                    placeholder="Email"
                  />
                </div>
                <div class="px-3 mt-5 col-span-6 sm:col-span-4 lg:col-span-6">
                  <label
                    id="my-account-fullname"
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="fullname"
                  >
                    Fullname
                  </label>
                  <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="full-name"
                    type="text"
                    v-model="full_name"
                    placeholder="Fullname"
                  />
                </div>
              </div>
              <div class="flex justify-center px-5 py-5">
                <button
                  id="save-profile-button"
                  class="bg-blue-500 text-white rounded w-14 h-7"
                  @click="saveProfile"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>

        <div v-if="authProvider == 'email'" class="md:col-span-1 text-white">
          <div
            id="my-account-password"
            class="font-bold text-xl px-3 pt-3 lg:px-5 lg:pt-5"
          >
            Password
          </div>
        </div>
        <div v-if="authProvider == 'email'" class="md:col-span-2">
          <div class="p-3">
            <div class="bg-slate-100 rounded border-2">
              <div class="grid grid-cols-6 gap-6">
                <div class="px-3 mt-5 col-span-6 sm:col-span-4">
                  <label
                    id="my-account-password-current"
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="cureent-password"
                  >
                    Current Password
                  </label>
                  <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="old-password"
                    type="password"
                    v-model="oldPassword"
                    placeholder="Current Password"
                  />
                </div>
                <div class="px-3 mt-5 col-span-6 sm:col-span-4">
                  <label
                    id="my-account-password-new"
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="new-password"
                  >
                    New Password
                  </label>
                  <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="new-password"
                    type="password"
                    v-model="newPassword"
                    placeholder="Password"
                  />
                </div>
                <div class="px-3 mt-5 col-span-6 sm:col-span-4">
                  <label
                    id="my-account-password-confirm"
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="confirm-password"
                  >
                    Confirm Password
                  </label>
                  <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="confirm-password"
                    type="password"
                    placeholder="Confirm password"
                  />
                </div>
              </div>
              <div class="flex justify-end px-5 py-5">
                <button
                  id="save-password-button"
                  class="bg-blue-500 rounded w-14 h-7"
                  @click="savePassword"
                >
                  {{ $t("save") }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from "../../store/auth.js";
import { mapState } from "pinia";
import isNil from "lodash/isNil";
export default {
  name: "my-account",
  data() {
    return {
      profilePicture: null,
      profilePictureChanged: false,
      imageDataUrl: null,
      username: "",
      email: "",
      full_name: "",
      oldPassword: "",
      newPassword: "",
      authStore: null,
      authProvider: "",
      loadingComponent: null,
    };
  },
  created() {
    this.authStore = useAuthStore();
    if (!isNil(this.userData)) {
      const { username, email, full_name, authProvider } = this.userData;
      this.username = username;
      this.email = email;
      this.full_name = full_name;
      this.imageDataUrl = this.profileImageUrl;
      this.authProvider = authProvider;
    }
    if (!isNil(this.profileImageUrl)) {
      this.imageDataUrl = this.profileImageUrl;
    }
  },
  watch: {
    profileImageUrl() {
      if (!isNil(this.profileImageUrl)) {
        this.imageDataUrl = this.profileImageUrl;
      }
    },
    userData() {
      if (!isNil(this.userData)) {
        const { username, email, full_name, authProvider } = this.userData;
        this.username = username;
        this.email = email;
        this.full_name = full_name;
        this.authProvider = authProvider;
      }
    },
  },
  computed: {
    ...mapState(useAuthStore, {
      userData: "user",
      userInstance: "userInstance",
      isLoggedIn: "isLoggedIn",
      profileImageUrl: "profile_image_url",
    }),
  },
  methods: {
    onFileChange(event) {
      this.profilePicture = event.target.files[0];
      this.imageDataUrl = URL.createObjectURL(this.profilePicture);
      this.profilePictureChanged = true;
    },
    selectProfilePicture() {
      this.$refs.profilePictureRef.click();
    },
    async saveProfile() {
      this.loadingComponent = this.$loading.show({
        loader: "dots",
      });
      try {
        if (this.profilePictureChanged) {
          await this.userInstance.uploadField(
            "profile_image_url",
            "profile_images/" + this.userInstance.id,
            this.profilePicture
          );
        }
        const { username, email, full_name } = this;
        await this.authStore.updateUserProfileData({
          username,
          email,
          full_name,
        });
        // await this.userInstance.updateProfileData({name, email, full_name}).then((__) => {
        //     this.authStore.updateStoreUserData({ name, email, full_name })
        // })
        this.$toast.open({
          message: "Profile updated!",
          type: "success",
          duration: 5000,
          dismissible: true,
          position: "bottom",
        });
      } catch (err) {
        console.error(err);
        throw err;
      } finally {
        this.loadingComponent.hide();
        this.loadingComponent = null;
      }
    },
    async savePassword() {
      this.loadingComponent = this.$loading.show({
        loader: "dots",
      });
      try {
        await this.userInstance.updatePassword(
          this.oldPassword,
          this.newPassword
        );
        this.$toast.open({
          message: "Password updated!",
          type: "success",
          duration: 5000,
          dismissible: true,
          position: "bottom",
        });
      } catch (err) {
        console.error(err);
        throw err;
      } finally {
        this.loadingComponent.hide();
        this.loadingComponent = null;
      }
    },
  },
};
</script>
