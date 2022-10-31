import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
// import { collections } from "./firebase/index";
import emitter from "./utils/emitter";
import "./index.css";
import "tw-elements";
import { createPinia } from "pinia";
import { useAuthStore } from "./store/auth";
import VueLoading from "vue-loading-overlay";
import VueI18n from "./utils/i18n";
import "vue-loading-overlay/dist/vue-loading.css";
import i18n from "./i18n";
import startCase from "lodash/startCase";
import { toRelativeTime, toAbsoluteTime, toLongMonth } from "./utils/time";

const vuePropertySetter = (app, name, instance) => {
  app.provide(name, instance);
  app.config.globalProperties[name] = instance;
};
const filters = {
  truncate: function (text, length, clamp) {
    clamp = clamp || "...";
    let counter = 0;
    let stop;
    const splitted = text.split(" ");
    splitted.every((word, idx) => {
      counter += word.length;
      if (counter > length) {
        stop = idx;
        return false;
      }
      return true;
    });
    return text.length > length
      ? splitted.slice(0, stop + 1).join(" ") + clamp
      : text;
  },
};
const formatters = {
  currency: function (number, locale = "id-ID", currency = "IDR") {
    const intlFormatter = new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
    });
    return intlFormatter.format(number);
  },
  startCase: function (str) {
    return startCase(str);
  },
  absoluteDate: function (dateObj, locale = "id-ID") {
    return toAbsoluteTime(dateObj, locale);
  },
  relativeDate: function (dateObj, locale = "id-ID") {
    return toRelativeTime(dateObj, locale);
  },
  longMonth: toLongMonth,
};
const injector = {
  install(app) {
    // vuePropertySetter(app, "collections", collections);
    vuePropertySetter(app, "emitter", emitter);
    vuePropertySetter(app, "filters", filters);
    vuePropertySetter(app, "formatters", formatters);
  },
};

const app = createApp(App).use(i18n);
app.use(router);
app.use(injector);
app.use(VueLoading);
app.use(VueI18n);
app.use(createPinia());
const authStore = useAuthStore();
authStore.authAction();
app.mount("#app");
