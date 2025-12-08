import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

export const metadata = {
  title: { template: "%s | HDAS Blog", default: "Home | HDAS Blog" },
};

type Props = {
  children: React.ReactNode;
  params: { locale: string };
};

export default async function RootLayout({ children, params }: Props) {
  const { locale } = params;
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
