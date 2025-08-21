'use client';

import Navbar from "@/components/navbar";
import Footer from "@/components/Footer";
import CarouselComponent from "@/components/CaroucelComponent"; 
import CartButton from "@/components/CartButton";
import { useEffect, useState } from "react";
import MenuSection from "@/components/MenuSection";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

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

export interface CartItem extends Product {
  quantity: number;
}

export default function Home() {
  const [cardapioItems, setCardapioItems] = useState<Product[]>([]);
  const [carouselItems, setCarouselItems] = useState<CarouselItem[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const addToCart = (id: string) => {
    const product = cardapioItems.find((item) => item.id === id);
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

  const xburguerItems = cardapioItems.filter(product => product.category === 'x-burguer');
  const xfrangosItems = cardapioItems.filter(product => product.category === 'x-frangos');
  const porcaoItems = cardapioItems.filter(product => product.category === 'porcao');
  const bebidasItems = cardapioItems.filter(product => product.category === 'bebidas');

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Carregando...</p>
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
        addToCard={addToCart} 
        layoutClasses="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-4 mx-auto max-w-7xl px-2 mb-8"
      />
      <MenuSection 
        title="X-frangos" 
        products={xfrangosItems}
        addToCard={addToCart} 
        layoutClasses="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-4 mx-auto max-w-7xl px-2 mb-8"
      />
      <MenuSection 
        title="Porçoes" 
        products={porcaoItems}
        addToCard={addToCart} 
        layoutClasses="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-4 mx-auto max-w-7xl px-2 mb-8"/>
      <MenuSection 
        title="Bebidas" 
        products={bebidasItems}
        addToCard={addToCart} 
        layoutClasses="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-4 mx-auto max-w-7xl px-2 mb-8"
      />
      
      <CartButton itemCount={cart.length} />
      <Footer />
    </main>
  );
}