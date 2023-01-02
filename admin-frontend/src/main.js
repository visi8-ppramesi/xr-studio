import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { useAuthStore } from "./store/auth";
import "./assets/tailwind.css";
import "./styles/index.css";
import "tw-elements";
import { createPinia } from "pinia";

const app = createApp(App);
app.use(router);
app.use(createPinia());
const authStore = useAuthStore();
authStore.authAction();
app.mount("#app");
