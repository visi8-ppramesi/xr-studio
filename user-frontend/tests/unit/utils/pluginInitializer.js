import router from "../../../src/router/index.js";
// import { collections } from "../../../src/firebase/index";
import emitter from "../../../src/utils/emitter";
import "../../../src/index.css";
import "tw-elements";
import { createPinia, setActivePinia } from "pinia";
import { useAuthStore } from "../../../src/store/auth";
import { useCalendarStore } from "../../../src/store/calendar";
import VueLoading from "vue-loading-overlay";
import VueI18n from "../../../src/utils/i18n";
import { logger } from "../../../src/utils/logger";
import "vue-loading-overlay/dist/vue-loading.css";
import startCase from "lodash/startCase";
import { toRelativeTime, toAbsoluteTime } from "./time";

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
  round: function (num, dec) {
    return Math.round(num * 10 ** dec) / 10 ** dec;
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
  // longMonth: toLongMonth,
};
const injector = {
  install(app) {
    // vuePropertySetter(app, "collections", collections);
    vuePropertySetter(app, "emitter", emitter);
    vuePropertySetter(app, "filters", filters);
    vuePropertySetter(app, "formatters", formatters);
    vuePropertySetter(app, "logger", logger);
  },
};

const pinia = createPinia();
setActivePinia(pinia);
const authStore = useAuthStore();
const calendarStore = useCalendarStore();
authStore.authAction();
calendarStore.getCalendar();

export default {
  plugins: {
    injector,
    router,
    VueLoading,
    VueI18n,
    pinia,
  },
};
