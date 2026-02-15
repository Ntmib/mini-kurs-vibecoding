import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Мини-курс: Профессия Вайбкодер",
  description: "Бесплатный мини-курс: что такое вайбкодинг, какие инструменты нужны и как создать первый продукт",
  openGraph: {
    title: "Мини-курс: Профессия Вайбкодер",
    description: "Бесплатный мини-курс: что такое вайбкодинг, какие инструменты нужны и как создать первый продукт",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var theme = localStorage.getItem('theme') || 'dark';
                document.documentElement.setAttribute('data-theme', theme);
              })();
            `,
          }}
        />
      </head>
      <body>
        <Header />
        <main style={{ minHeight: "calc(100vh - 112px)" }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
