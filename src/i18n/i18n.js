import i18n from "i18next";

import { initReactI18next } from "react-i18next";

import AsyncStorage from "@react-native-async-storage/async-storage";

import en from "./locales/en.json";

import ur from "./locales/ur.json";

const resources = {
  en: {
    translation: en,
  },

  ur: {
    translation: ur,
  },
};

const initializeLanguage = async () => {

  const savedLanguage =
    await AsyncStorage.getItem("appLanguage");

  i18n
    .use(initReactI18next)
    .init({

      compatibilityJSON: "v3",

      resources,

      lng: savedLanguage || "en",

      fallbackLng: "en",

      interpolation: {
        escapeValue: false,
      },
    });
};

initializeLanguage();

export default i18n;