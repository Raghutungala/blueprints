import type { Metadata } from "next";
import "./globals.css";
import AccentThemeProvider from "@/components/AccentThemeProvider";

export const metadata: Metadata = {
  title: "Bento-OS | Developer Portfolio",
  description: "Ultra-premium developer portfolio template with bento grid design",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <AccentThemeProvider>{children}</AccentThemeProvider>
      </body>
    </html>
  );
}
