"use client";

import { Link } from "@/libs/navigation";
import { Layout } from "antd";
import Image from "next/image";
import Logo from "@/assets/images/logo.svg";
import { LocaleDropdown } from "@/components";
import { ToggleTheme } from "@/components";

const { Header, Content } = Layout;

export const HomeLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <Layout className="h-screen overflow-hidden">
      <Layout className="dark:bg-slate-900">
        <Header className="flex justify-between items-center gap-4 xl:px-40 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-b-zinc-800">
          <Link href="/">
            <Image src={Logo} alt="Logo - HDAS Blog" width={150} priority />
          </Link>

          <div className="flex items-center gap-5">
            <LocaleDropdown />
            <ToggleTheme />
          </div>
        </Header>

        <Content className="flex items-center justify-center overflow-auto bg-white dark:bg-slate-950">
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};
