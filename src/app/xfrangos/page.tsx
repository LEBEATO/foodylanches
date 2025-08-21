
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
        
        const filteredProducts = productsList.filter(p => p.category === 'x-frangos');
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
          <IconCircleArrowLeftFilled size={50} color='#020202dd'/>
          <span className="text-zinc-900 font-bold">Voltar</span>
        </Link>
      </div>
      <div className="pt-24">
        <MenuSection 
          title="X-frangos" 
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