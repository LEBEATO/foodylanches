
// app/page.tsx
'use client';

import Navbar from "@/components/navbar";
import Footer from "@/components/Footer";
import CarouselComponent from "@/components/CaroucelComponent";
import CartButton from "@/components/CartButton";
import { useEffect, useState } from "react";
import dataProduscts from "@/app/api/dataProduscts";
import MenuSection from "@/components/MenuSection";
import XFrangosPage from "@/app/xfrangos/page";
import CardapioPage from "@/app/burguer/page";

// --- Interfaces para Tipagem ---
export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

export interface CartItem extends Product {
  quantity: number;
}

// --- Componente Principal Home ---
export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    setProducts(dataProduscts); 
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const addToCart = (id: number) => {
    const product = products.find((item) => item.id === id);
    if (!product) return;
    const existingProduct = cart.find((item) => item.id === id);

    let updatedCart: CartItem[];
    if (existingProduct) {
      updatedCart = cart.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }];
    }
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  }

  const dummyCarouselItems = [
    {
      id: "1",
      imageSrc: "/burger-cheese.png",
      title: "Delicioso Prato 1",
      description: "Uma descrição cativante sobre este prato incrível.",
    },
    {
      id: "2",
      imageSrc: "/path/to/image2.jpg",
      title: "Prato do Dia",
      description: "Uma opção especial e saborosa para você.",
    },
  ];

  // Filtra os produtos para cada categoria usando os nomes corretos
  const xburguerItems = products.filter(product => product.category === 'x-burguer');
  const xfrangosItems = products.filter(product => product.category === 'x-frangos');
  const bebidasItems = products.filter(product => product.category === 'bebidas');

  return (
    <main>
      <Navbar
        imagesrc="/logo.png"
        title="Foody Lanches"
        description="O melhor lugar para saborear lanches deliciosos!"
      />
      <CarouselComponent items={dummyCarouselItems} />

      <MenuSection 
        title="X-Burguer" 
        products={xburguerItems} // Usando a categoria correta
        addToCart={addToCart} 
        layoutClasses="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-4 mx-auto max-w-7xl px-2 mb-8"
      />
      <MenuSection 
        title="X-frangos" 
        products={xfrangosItems} // Usando a categoria correta
        addToCart={addToCart} 
        layoutClasses="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-4 mx-auto max-w-7xl px-2 mb-8"
      />
      <MenuSection 
        title="Bebidas" 
        products={bebidasItems} // Usando a categoria correta
        addToCart={addToCart} 
        layoutClasses="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-4 mx-auto max-w-7xl px-2 mb-8"
      />
     
      
      <CartButton itemCount={cart.length} />
      <Footer />
    </main>
  );
}