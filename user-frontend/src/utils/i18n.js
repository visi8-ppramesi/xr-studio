import { createI18n } from "vue-i18n";

const locale = localStorage.getItem("locale") || "en";
const VueI18n = createI18n({
  locale,
  fallbackLocale: "id",
});

export default VueI18n;
