import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { collections } from "./firebase/index";
import emitter from "./utils/emitter";
import "./index.css";
import "tw-elements";
import { createPinia } from "pinia";
import { useAuthStore } from "./store/auth";
import VueLoading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

const vuePropertySetter = (app, name, instance) => {
  app.provide(name, instance);
  app.config.globalProperties[name] = instance;
};

const injector = {
  install(app) {
    vuePropertySetter(app, "collections", collections);
    vuePropertySetter(app, "emitter", emitter);
  },
};

const app = createApp(App);
app.use(router);
app.use(injector);
app.use(VueLoading);
app.use(createPinia());
const authStore = useAuthStore();
authStore.authAction();
app.mount("#app");
