import internationalization from "@/config/internationalization";
import { createNavigation } from "next-intl/navigation";

export const { Link, redirect, usePathname, useRouter } = createNavigation({
  locales: internationalization.locales,
});
