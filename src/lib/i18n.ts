import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
import internationalization from "@/config/internationalization";

export default getRequestConfig(async ({ locale }) => {
  if (!internationalization.locales.includes(locale as any)) notFound();

  return {
    messages: (await import(`../config/langs/${locale}.json`)).default,
  };
});
