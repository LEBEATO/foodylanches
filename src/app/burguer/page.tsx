'use client';
import { useEffect, useState } from "react";
import CartButton from "@/components/CartButton";
import MenuSection from "@/components/MenuSection";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useCart } from "@/components/CartContext" 
import Navbar from "@/app/navbar/page";
import { Product } from "@/types/types"

export interface NavbarProps {
  imagesrc: string;
  title: string;
}

export default function Burguer() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const cardapioCollection = collection(db, "cardapio");
        const cardapioSnapshot = await getDocs(cardapioCollection);

        const productsList = cardapioSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data() as Omit<Product, 'id'>
        }));

        const filteredProducts = productsList.filter(p => p.category === 'x-burguer');
        setProducts(filteredProducts);
        setIsLoading(false);
      } catch (e) {
        console.error("Erro ao buscar documentos:", e);
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  }

  const layoutClasses = "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 mx-auto max-w-7xl px-2 mb-16";

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-2xl font-bold text-zinc-900">Carregando X-Burguer...</p>
      </div>
    );
  }

  return (
    <main className="pt-2">
      <div className="fixed top-0 left-0 w-full z-50 p-8 pt-4">
       <Navbar
        imagesrc="/logo.png"
        title="Foody Lanches"
       />
      </div>
      <div className="pt-24">
        <MenuSection
          title="X-Buerguer"
          products={products}
          addToCart={handleAddToCart}
          layoutClasses={layoutClasses}
        />
      </div>
      <CartButton />
    </main>
  );
}