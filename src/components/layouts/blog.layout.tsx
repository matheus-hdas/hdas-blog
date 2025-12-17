"use client";

import { useEffect } from "react";
import { Blog } from "@prisma/client";
import { Layout } from "antd";
import Image from "next/image";
import { Link } from "@/libs/navigation";
import { LocaleDropdown, ToggleTheme } from "@/components";
import { useBlogStore } from "@/stores";
import Logo from "@/assets/imgs/logo.svg";

type Props = {
  children: React.ReactNode;
  blog: Blog;
};

const { Header, Content } = Layout;

export const BlogLayout: React.FC<Props> = ({ children, blog }) => {
  const { setBlog } = useBlogStore();

  useEffect(() => {
    setBlog(blog);
  }, [blog]);

  return (
    <Layout className="h-screen overflow-hidden">
      <Header className="flex justify-between bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-b-zinc-800">
        <div className="flex items-center justify-between container px-8">
          <Link href={`/${blog.slug}`}>
            <Image src={Logo} alt="Logo - HDAS Blog" width={150} priority />
          </Link>
        </div>

        <div className="flex items-center gap-8">
          <LocaleDropdown />
          <ToggleTheme />
        </div>
      </Header>
      <Content>
        <div className="size-full flex items-center justify-center overflow-auto container px-8 mx-auto">
          {children}
        </div>
      </Content>
    </Layout>
  );
};
