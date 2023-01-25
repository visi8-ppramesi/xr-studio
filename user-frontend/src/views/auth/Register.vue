<template>
  <div class="flex justify-center items-center m-10">
    <div class="block rounded-lg shadow-lg bg-white px-6 py-12 md:px-12">
      <form>
        <input
          name="username"
          for="username"
          v-model="username"
          type="text"
          id="username"
          class="form-control block w-full px-3 py-1.5 mb-6 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          placeholder="Username"
        />
        <input
          name="email"
          for="email"
          v-model="email"
          type="text"
          id="email"
          class="form-control block w-full px-3 py-1.5 mb-6 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          placeholder="Email"
        />
        <input
          name="fullName"
          for="fullName"
          v-model="fullName"
          type="text"
          id="fullName"
          class="form-control block w-full px-3 py-1.5 mb-6 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          placeholder="Full Name"
        />
        <input
          name="password"
          for="password"
          v-model="password"
          type="password"
          id="password"
          class="form-control block w-full px-3 py-1.5 mb-6 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          placeholder="Password"
        />
        <input
          @keyup.enter="register"
          name="password"
          for="password"
          v-model="confirmPassword"
          type="password"
          id="confirm-password"
          class="form-control block w-full px-3 py-1.5 mb-6 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          placeholder="Confirm Password"
        />
        <button
          id="register-button"
          @click="register"
          type="button"
          data-mdb-ripple="true"
          data-mdb-ripple-color="light"
          class="inline-block px-6 py-2.5 mb-6 w-full bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        >
          Register
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from "../../store/auth.js";
import { generateKey } from "@/utils/crypto";
import startCase from "lodash/startCase";

const i18Texts = {
  messages: {
    en: {
      failed: "Register failed! Email already exists!",
      register: "Register",
      goback: "Go Back",
    },
    id: {
      failed: "Pendaftaran gagal! Email sudah ada!",
      register: "Daftar",
      goback: "Kembali",
    },
  },
};

export default {
  name: "register",
  i18n: i18Texts,
  mounted() {
    const { email, username, firstName, lastName } =
      this.authStore.temporarySignupInfo;
    this.email = email || "";
    this.username = username || "";
    const myFname = firstName || "";
    const myLname = lastName || "";
    this.fullName = (
      myFname.length + myLname.length > 0 ? [myFname, myLname] : []
    ).join(" ");
    this.emitter.on("registerError", () => {
      this.registerFailed = true;
      this.email = "";
      this.password = "";
      this.username = "";
      this.fullName = "";
    });
  },
  data() {
    return {
      errorMsg: [],
      email: "",
      password: "",
      username: "",
      fullName: "",
      confirmPassword: "",
      loginFailed: false,
      // facebookIcon: require("../assets/icons/facebook.png"),
      // instagramIcon: require("../assets/icons/instagram.png"),
      // twitterIcon: require("../assets/icons/twitter.png"),
      // karaBackground: require("../assets/kara_bg.jpg"),
      registerFailed: false,
    };
  },
  setup() {
    const authStore = useAuthStore();

    return {
      authStore,
    };
  },
  methods: {
    checkFields() {
      const message = [];
      const test = ["password", "email", "fullName", "username"].reduce(
        (acc, v) => {
          const innerTest = this[v].length < 1;
          if (innerTest) {
            message.push(startCase(v) + " empty");
          }
          acc ||= innerTest;
          return acc;
        },
        false
      );
      if (message.length > 0) {
        let result;
        if (message.length == 1) {
          result = message[0];
        } else {
          const last = message.pop();
          result = message.join(", ") + " and " + last;
        }
        this.errorMsg.push(result);
      }

      return test;
    },
    checkPassword() {
      const passValid = this.confirmPassword != this.password;
      if (passValid) {
        this.errorMsg.push("invalid password");
        return true;
      }
      return false;
    },
    async register() {
      const loadingComponent = this.$loading.show({
        loader: "dots",
      });
      if (this.checkFields() || this.checkPassword()) {
        console.log(this.errorMsg);
        this.$toast.open({
          message: "Invalid User Input: " + this.errorMsg.join(", "),
          type: "error",
          duration: 5000,
          dismissible: true,
          position: "bottom",
        });
        this.errorMsg = [];
        loadingComponent.hide();
        return;
      }
      try {
        const keyPair = await generateKey(this.password);
        const publicKey = keyPair[0];
        const privateKey = keyPair[1];

        this.authStore.register(
          this.email,
          this.password,
          {
            username: this.username,
            full_name: this.fullName,
            public_key: publicKey,
            encrypted_private_key: privateKey,
          },
          () => {
            localStorage.setItem("publicKey", publicKey);
            localStorage.setItem("privateKey", privateKey);

            this.$router.push({ name: "Login", query: { registered: 1 } });
          },
          () => {
            this.loginFailed = true;
            this.email = "";
            this.password = "";
            this.name = "";
            this.fullName = "";

            throw new Error("Register failed!");
          }
        );
      } catch (error) {
        console.error(error);
        this.$toast.open({
          message: "Register Failed!",
          type: "error",
          duration: 5000,
          dismissible: true,
          position: "bottom",
        });
      } finally {
        loadingComponent.hide();
      }
      // this.$store.dispatch('register', {
      //     email: this.email,
      //     password: this.password,
      //     name: this.username,
      //     fullName: this.fullName
      // })
      // .then(response => {
      //     this.$router.push({ name: 'dashboard' })
      // })
      // .catch(error => {
      //     this.loginFailed = true
      // })
    },
  },
};
</script>
