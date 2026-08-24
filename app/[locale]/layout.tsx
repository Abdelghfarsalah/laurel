import type { Metadata } from "next";
import { NextIntlClientProvider, useLocale } from 'next-intl';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/components/provider/StoreProvider";
import Toaster from "@/components/shared/Toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NovaMart — Modern Ecommerce",
  description:
    "Shop thousands of products across electronics, fashion, watches, books and more.",
};

const themeInitScript = `(function(){try{var t=localStorage.getItem("novamart-theme");if(t!=="dark"&&t!=="light"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";}if(t==="dark")document.documentElement.classList.add("dark");}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = useLocale();
  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body
        dir={locale === "en" ? "ltr" : "rtl"}
        className="flex min-h-full flex-col"
      >
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <NextIntlClientProvider>
          <StoreProvider>
            {children}
            <Toaster />
          </StoreProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
