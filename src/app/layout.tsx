import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/components/CartContext";
import Navbar from "@/components/Navbar";


export const metadata: Metadata = {
  title: "Foody Lanches",
  description: "O melhor lugar para saborear lanches deliciosos!",
  keywords:["lanches", "comida", "restaurante", "fast food", "hambúrgueres", "sanduíches", "batatas fritas", "sucos", "refeições rápidas"],
 
  openGraph: {
    title: "Foody Lanches - O melhor lugar para saborear lanches deliciosos!",
    description: "O melhor lugar para saborear lanches deliciosos!",
    url: "/logo.png",
    siteName: "Foody Lanches",
    images: [
      { 
        url: "/logo.png",
        width: 800,
        height: 600,
      },
    ],
    locale: "pt-BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        
        <CartProvider> 
        <Navbar />
          {children}
        </CartProvider> 
      </body>
    </html>
  );
}