import createMiddleware from "next-intl/middleware";
import internationalization from "@/config/internationalization";

export default createMiddleware({
  ...internationalization,
  localeDetection: true,
});

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
