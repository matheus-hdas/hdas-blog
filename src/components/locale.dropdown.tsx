"use client";

import { CaretDownFilled } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import { useLocale } from "next-intl";
import Image from "next/image";
import { Link, usePathname } from "@/libs/navigation";
import internationalization from "@/config/internationalization";

export const LocaleDropdown = () => {
  const pathname = usePathname();
  const locale = useLocale();

  return (
    <Dropdown
      menu={{
        items: internationalization.localeList.map((data) => {
          return {
            key: data.locale,
            label: (
              <Link href={pathname} locale={data.locale}>
                {data.label}
              </Link>
            ),
            icon: (
              <Image
                src={`/images/${locale}.svg`}
                width={23}
                height={23}
                alt={locale}
              />
            ),
          };
        }),
        defaultSelectedKeys: [locale],
      }}
      trigger={["click"]}
    >
      <Space className="border border-slate-200 dark:border-zinc-800 rounded-md h-9 px-3 cursor-pointer gap-4">
        <Image
          src={`/images/${locale}.svg`}
          width={23}
          height={23}
          alt={locale}
        />
        <CaretDownFilled classID="text-slate-600" />
      </Space>
    </Dropdown>
  );
};
