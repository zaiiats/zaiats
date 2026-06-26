import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { ModalProvider } from "@/providers/ModalProvider";
import { Analytics } from "@vercel/analytics/next"

export const metadata: Metadata = {
  title: "Zaiats",
  description: "Insert later",
};

const eurostyle = localFont({
  src: "../public/fonts/Eurostyle.ttf",
  variable: "--font-eurostyle",
  weight: "400",
  style: "normal",
  display: "block",
});

const montserrat = localFont({
  src: "../public/fonts/Montserrat/Montserrat-VariableFont_wght.ttf",
  variable: "--font-montserrat",
  weight: "100 900",
  style: "normal",
  display: "block",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={`${eurostyle.variable} ${montserrat.variable} dark`}
    >
      <head>
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const savedTheme = localStorage.getItem('theme');
                if (savedTheme === 'light') {
                  document.documentElement.classList.remove('dark');
                  document.documentElement.classList.add('light');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body>
        <Analytics/>
        <ThemeProvider>
          <ModalProvider>{children}</ModalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
