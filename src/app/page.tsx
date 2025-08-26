'use client';
import Navbar from "@/components/navbar";
import Footer from "@/components/Footer";
import CarouselComponent from "@/components/CaroucelComponent";
import CartButton from "@/components/CartButton";
import { useEffect, useState } from "react";
import MenuSection from "@/components/MenuSection";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useCart } from "@/components/CartContext"; 

export interface Product {
  id: string; 
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

export interface CarouselItem {
  id: string;
  imageSrc: string;
  description: string;
  title: string;
}

export default function Home() {
  const [cardapioItems, setCardapioItems] = useState<Product[]>([]);
  const [carouselItems, setCarouselItems] = useState<CarouselItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart } = useCart(); 

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const cardapioSnapshot = await getDocs(collection(db, "cardapio"));
        const cardapioList = cardapioSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data() as Omit<Product, 'id'>
        }));
        setCardapioItems(cardapioList);

        const carouselSnapshot = await getDocs(collection(db, "produtos"));
        const carouselList = carouselSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data() as Omit<CarouselItem, 'id'>
        }));
        setCarouselItems(carouselList);

        setIsLoading(false);
      } catch (e) {
        console.error("Erro ao buscar documentos:", e);
        setIsLoading(false);
      }
    };
    fetchAllData();
  }, []);

  const xburguerItems = cardapioItems.filter(product => product.category === 'x-burguer');
  const xfrangosItems = cardapioItems.filter(product => product.category === 'x-frangos');
  const porcaoItems = cardapioItems.filter(product => product.category === 'porcao');
  const bebidasItems = cardapioItems.filter(product => product.category === 'bebidas');

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-2xl font-bold text-zinc-900 "> Carregando...</p>
      </div>
    );
  }

  return (
    <main>
      <Navbar
        imagesrc="/logo.png"
        title="Foody Lanches"
      />
      <CarouselComponent items={carouselItems} />

      <MenuSection 
        title="X-Burguer" 
        products={xburguerItems}
        addToCart={addToCart} 
        layoutClasses="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-4 mx-auto max-w-7xl px-2 mb-8"
      />
      <MenuSection 
        title="X-frangos" 
        products={xfrangosItems}
        addToCart={addToCart} 
        layoutClasses="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-4 mx-auto max-w-7xl px-2 mb-8"
      />
      <MenuSection 
        title="Porções" 
        products={porcaoItems}
        addToCart={addToCart} 
        layoutClasses="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-4 mx-auto max-w-7xl px-2 mb-8"
      />
      <MenuSection 
        title="Bebidas" 
        products={bebidasItems}
        addToCart={addToCart} 
        layoutClasses="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-4 mx-auto max-w-7xl px-2 mb-8"
      />
      <CartButton />
      <Footer />
    </main>
  );
}