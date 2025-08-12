import type { Metadata } from "next";
import "./globals.css";



export const metadata: Metadata = {
  title: "Foody Lanches",
  description: "O melhor lugar para saborear lanches deliciosos!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
      </body>
    </html>
  );
}
