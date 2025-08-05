
// app/page.tsx
'use client';

import { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/Footer";
import dataProduscts from "./api/page"; 
import CartButton from "@/components/CartButton";
import MenuSection from "@/components/MenuSection"; 
import CarouselComponent from "@/components/CaroucelComponent"; // Importação do carrossel

// Defina as interfaces de forma exportável
export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
}

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

  const layoutClasses = "grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-4 mx-auto max-w-7xl px-2 mb-8";

  // Dummy data para o carrossel, se necessário
  const dummyCarouselItems = [
    {
      id: "1",
      imageSrc: "/burger-cheese.png",
      title: "Delicioso Prato5",
      description: "Uma descrição cativante sobre este prato incrível que você não pode perder.",
    },
    // ... adicione mais itens aqui
  ];

  return (
    <main>
      <Navbar
        imagesrc="/logo.png"
        title="Foody Lanches"
        description="O melhor lugar para saborear lanches deliciosos!"
      />
      
      {/* Exibir o carrossel na HomePage */}
      <CarouselComponent items={dummyCarouselItems} /> 

      {/* Renderizar as seções de cardápio, passando os produtos e a função addToCart */}
      <MenuSection 
        title="Nosso Cardápio" 
        products={products} 
        addToCart={addToCart} 
        layoutClasses={layoutClasses} 
      />
      
      <MenuSection 
        title="X-frangos" 
        products={products} 
        addToCart={addToCart} 
        layoutClasses={layoutClasses} 
      />

      <CartButton itemCount={cart.length} />
      
      <Footer />
    </main>
  );
}