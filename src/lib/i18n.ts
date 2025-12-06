import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
import internationalization, { Locale } from "@/config/internationalization";

export default getRequestConfig(async ({ locale }) => {
  if (!locale) notFound();
  if (!internationalization.locales.includes(locale as Locale)) notFound();

  const messages = (await import(`../config/langs/${locale}.json`)).default;

  return {
    locale,
    messages,
  };
});
