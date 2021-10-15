import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
    en: {
        translation: {
            "Bütün Kateqoriyalar": "All categories",
            "Alətlər": "Tools",
        }
    },
    ru: {
        translation: {
            "Bütün Kateqoriyalar": "Vse kateqori"
        }
    }
}

i18n
.use(initReactI18next)
.init({
    resources,
    lng: "en",
    interpolation: {
        escapeValue: false
    }
})

export default i18n;