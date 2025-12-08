export type Locale = "en-US" | "pt-BR";

const internationalization = {
  locales: ["en-US", "pt-BR"],
  defaultLocale: "en-US",
  localeList: [
    { locale: "en-US", label: "English" },
    { locale: "pt-BR", label: "Português" },
  ],
};

export default internationalization;
