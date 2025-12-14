"use client";

import { useTheme } from "@/hooks";
import { Button, Tooltip } from "antd";
import { SunOutlined, MoonOutlined } from "@ant-design/icons";
import { useTranslations } from "next-intl";

export const ToggleTheme = () => {
  const { theme, toggleTheme } = useTheme();
  const t = useTranslations("Layout");

  return (
    <Tooltip title={t("toggle_theme_label")}>
      <Button onClick={toggleTheme} className="h-9 text-lg">
        {theme === "dark" ? <SunOutlined /> : <MoonOutlined />}
      </Button>
    </Tooltip>
  );
};
