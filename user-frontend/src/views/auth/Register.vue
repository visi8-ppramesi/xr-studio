<template>
  <div></div>
</template>

<script>
import { useAuthStore } from "../store/auth.js";

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
  inject: ["routeResolver"],
  mounted() {
    this.emitter.on("registerError", () => {
      this.registerFailed = true;
      this.email = "";
      this.password = "";
      this.username = "";
      this.full_name = "";
    });
  },
  data() {
    return {
      email: "",
      password: "",
      username: "",
      full_name: "",
      loginFailed: false,
      facebookIcon: require("../assets/icons/facebook.png"),
      instagramIcon: require("../assets/icons/instagram.png"),
      twitterIcon: require("../assets/icons/twitter.png"),
      karaBackground: require("../assets/kara_bg.jpg"),
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
    register() {
      this.authStore.register(
        this.email,
        this.password,
        { name: this.username, full_name: this.full_name },
        () => {
          this.$router.push({ name: "Login", query: { registered: 1 } });
        },
        () => {
          this.loginFailed = true;
          this.email = "";
          this.password = "";
          this.name = "";
          this.full_name = "";
        }
      );
      // this.$store.dispatch('register', {
      //     email: this.email,
      //     password: this.password,
      //     name: this.username,
      //     full_name: this.full_name
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
