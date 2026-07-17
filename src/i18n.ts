import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import languages from "../locales/index.json";
import de from "../locales/de/messages.json";
import en from "../locales/en/messages.json";
import es from "../locales/es/messages.json";
import frFR from "../locales/fr-FR/messages.json";
import id from "../locales/id/messages.json";
import ja from "../locales/ja/messages.json";
import ko from "../locales/ko/messages.json";
import pt from "../locales/pt/messages.json";
import ptBR from "../locales/pt-BR/messages.json";
import ru from "../locales/ru/messages.json";
import tr from "../locales/tr/messages.json";
import ukUA from "../locales/uk-UA/messages.json";
import vi from "../locales/vi/messages.json";
import zhCN from "../locales/zh-CN/messages.json";
import zhHK from "../locales/zh-HK/messages.json";

const resources = {
  de: { translation: de },
  en: { translation: en },
  es: { translation: es },
  "fr-FR": { translation: frFR },
  id: { translation: id },
  ja: { translation: ja },
  ko: { translation: ko },
  pt: { translation: pt },
  "pt-BR": { translation: ptBR },
  ru: { translation: ru },
  tr: { translation: tr },
  "uk-UA": { translation: ukUA },
  vi: { translation: vi },
  "zh-CN": { translation: zhCN },
  "zh-HK": { translation: zhHK },
} as const;

export type LanguageCode = keyof typeof resources;

const languageCodeMap = new Map(
  languages.map(({ code }) => [code.toLowerCase(), code as LanguageCode])
);

export const getSupportedLanguageCode = (code: string | null): LanguageCode =>
  (code && languageCodeMap.get(code.toLowerCase())) || "en";

void i18n.use(initReactI18next).init({
  resources,
  lng: getSupportedLanguageCode(
    new URLSearchParams(window.location.search).get("lang")
  ),
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
