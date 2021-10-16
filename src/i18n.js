import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import gb from "./locales/gb/gb";
import ru from "./locales/ru/ru";
import ge from "./locales/ge/ge";

const resources = {
    gb: {
        translation: gb
    },
    ru: {
        translation: ru
    },
    ge: {
        translation: ge
    }
}

i18n
.use(initReactI18next)
.init({
    resources,
    lng: "az",
    interpolation: {
        escapeValue: false
    }
})

export default i18n;