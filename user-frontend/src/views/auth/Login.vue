<template>
  <div class="mb-12 lg:mb-0">
    <div class="block rounded-lg shadow-lg bg-white px-6 py-12 md:px-12">
      <form>
        <input
          name="email"
          for="email"
          v-model="email"
          type="email"
          id="email"
          class="form-control block w-full px-3 py-1.5 mb-6 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          placeholder="Email address"
        />
        <input
          @keyup.enter="login"
          name="password"
          for="password"
          v-model="password"
          type="password"
          id="password"
          class="form-control block w-full px-3 py-1.5 mb-6 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          placeholder="Password"
        />
        <button
          @click="login"
          type="button"
          data-mdb-ripple="true"
          data-mdb-ripple-color="light"
          class="inline-block px-6 py-2.5 mb-6 w-full bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        >
          Login
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from "../../store/auth.js";

const i18Texts = {
  messages: {
    en: {
      forgot: "Forgot Password?",
      wrong: "Wrong password or email",
      login: "Log In",
      account: "Dont have an account yet?",
      signup: "Sign Up",
      option: "Or Login With",
      newlyRegistered: "Please login with your newly created account",
    },
    id: {
      forgot: "Lupa Password?",
      wrong: "Password atau email salah",
      login: "Masuk",
      account: "Belum punya akun?",
      signup: "Daftar",
      option: "Atau Masuk Dengan",
      newlyRegistered: "Silahkan login dengan akun yang baru Anda buat",
    },
  },
};
export default {
  name: "login",
  setup() {
    const authStore = useAuthStore();
    return {
      authStore,
    };
  },
  i18n: i18Texts,
  data() {
    return {
      email: "",
      password: "",
      loginFailed: false,
    };
  },
  inject: ["routeResolver"],
  mounted() {
    this.emitter.on("loginError", () => {
      this.loginFailed = true;
      this.email = "";
      this.password = "";
    });
  },
  methods: {
    loginWithGoogle() {
      this.authStore.loginWithGoogle(
        () => {
          const fromRouteStr = localStorage.getItem("fromRoute");
          const fromRoute = fromRouteStr
            ? JSON.parse(fromRouteStr)
            : { name: "Home" };
          this.$router.push(fromRoute);
        },
        (err) => {
          //error function
          console.error(err);
          this.loginFailed = true;
          this.email = "";
          this.password = "";
        }
      );
    },
    login() {
      const loadingComponent = this.$loading.show({
        loader: "dots",
      });
      this.authStore.login(
        this.email,
        this.password,
        () => {
          const fromRouteStr = localStorage.getItem("fromRoute");
          const fromRoute = fromRouteStr
            ? JSON.parse(fromRouteStr)
            : { name: "Home" };
          loadingComponent.hide();
          this.$router.push(fromRoute);
        },
        () => {
          //error function
          this.logger("error");
          loadingComponent.hide();
          this.loginFailed = true;
          this.email = "";
          this.password = "";
        }
      );
    },
  },
};
</script>
