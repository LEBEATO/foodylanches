<<<<<<< HEAD
'use client';

import MenuItems from "@/components/MenuItems";
import { Product } from "@/app/page"; // Importação correta da interface Product
import Link from "next/link";

interface MenuSectionProps {
  title: string;
  products: Product[];
  addToCard: (id: string) => void; // <-- Corrija aqui para string
  layoutClasses: string;
}

const MenuSection = ({ title, products, addToCard, layoutClasses }: MenuSectionProps) => (
  <div className="p-8">
    <Link href="/xfrangos" className="block mb-8">
      <h2 className="font-bold text-center mb-12 text-gray-800 dark:text-white relative">
        <span className="relative z-10 text-2xl sm:text-3xl md:text-3xl lg:text-3xl font-bold bg-gray-300 dark:bg-gray-900 px-4 ">{title}</span>
        <div className="absolute inset-x-0 top-1/2 h-px bg-gray-400 dark:bg-gray-700 -translate-y-1/2"></div>
      </h2>
    </Link>
    <div className={layoutClasses}>
      {products.map(product => (
        <MenuItems
          key={product.id}
          id={product.id}
          name={product.name}
          description={product.description}
          price={product.price}
          image={product.image}
          addToCard={addToCard}
        />
      ))}
    </div>
  </div>
);

export default MenuSection;
=======

'use client';
import { IconCircleArrowLeftFilled } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import CartButton from "@/components/CartButton";
import MenuSection from "@/components/MenuSection";
import Link from "next/link";
import { db } from "@/lib/firebase"; // Importe o db do Firebase
import { collection, getDocs } from "firebase/firestore";

// A interface Product agora tem o ID como string
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export default function BebidasPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const cardapioCollection = collection(db, "cardapio");
        const cardapioSnapshot = await getDocs(cardapioCollection);

        const productsList = cardapioSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data() as Omit<Product, 'id'>
        }));

        const filteredProducts = productsList.filter(p => p.category === 'bebidas');
        setProducts(filteredProducts);
        setIsLoading(false);
      } catch (e) {
        console.error("Erro ao buscar documentos:", e);
        setIsLoading(false);
      }
    };

    fetchProducts();

    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const addToCart = (id: string) => { // O ID agora é uma string
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

  const layoutClasses = "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 mx-auto max-w-7xl px-2 mb-16";

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Carregando bebidas...</p>
      </div>
    );
  }

  return (
    <main className="pt-2">
      <div className="fixed top-0 left-0 w-full z-50 p-8 pt-4">
        <Link href="/" className="flex items-center gap-1">
          <IconCircleArrowLeftFilled size={50} color='#020202dd' />
          <span className="text-zinc-900 font-bold">Voltar</span>
        </Link>
      </div>
      <div className="pt-24">
        <MenuSection
          title="Bebidas"
          products={products}
          addToCart={addToCart}
          layoutClasses={layoutClasses}
        />
      </div>
      <CartButton itemCount={cart.length} />
      <Footer />
    </main>
  );
}
>>>>>>> f290f774967c8de4414563c1fc7c395cbf609ab2
