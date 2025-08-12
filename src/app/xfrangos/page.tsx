'use client';

import { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/Footer";
import CartButton from "@/components/CartButton";
import MenuSection from "@/components/MenuSection";
import dataProduscts from "@/app/api/dataProduscts";

// Defina as interfaces de forma exportável
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

export default function XFrangosPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    setProducts(dataProduscts.filter(p => p.category === 'x-frangos'));
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

  const layoutClasses = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 mx-auto max-w-7xl px-2 mb-16";

  return (
    <main className="pt-16">
      <Navbar
        imagesrc="/logo.png"
        title="Foody Lanches"
        description="Nossa seção de X-Frangos"
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