import type { Metadata } from "next";
import { inter } from "@/config/fonts";

import "./globals.css";
import { Providers } from "@/components";
import { ThemeProvider } from "next-themes";


export const metadata: Metadata = {
  title: {
    template: "%s - AndShop | Shop",
    default: "Home - AndShop | Shop",
  },
  description: "Una tienda virtual de productos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // TODO: profundizar en la alerta de hidratación 
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`${inter.className} bg-zinc-100 dark:bg-zinc-900`}>
        <ThemeProvider attribute="class">
          <Providers>{children}</Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
