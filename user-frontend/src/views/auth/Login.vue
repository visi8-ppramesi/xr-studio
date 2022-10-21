<template>
  <div></div>
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
            : { name: "Dashboard" };
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
            : { name: "Dashboard" };
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
