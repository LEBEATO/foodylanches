'use client';
import Footer from "@/components/Footer";
import CartButton from "@/components/CartButton";
import Burguer from "@/app/burguer/page"
import Porcoes from "@/app/porcoes/page";
import Bebidas from "@/app/bebidas/page";
import { MeuCarrossel } from "@/app/meucaroucel/MeuCarrosel"; // Importe o componente
import Frangos from "./frangos/page";




export default function Home() {
  return (
    <main className="pt-4">
      
      <MeuCarrossel /> 
      <Burguer />
      <Frangos />
      <Porcoes />
      <Bebidas />

      <CartButton />
      <Footer />
    </main>
  );
}