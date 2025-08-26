'use client';
import { IconCircleArrowLeftFilled } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import CartButton from "@/components/CartButton";
import MenuSection from "@/components/MenuSection";
import Link from "next/link";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useCart } from "@/components/CartContext" // Certifique-se de que o caminho está correto

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

export default function PorcaoPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 1. Substitua a lógica de estado local do carrinho pelo hook useCart
  const { addToCart, itemCount } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const cardapioCollection = collection(db, "cardapio");
        const cardapioSnapshot = await getDocs(cardapioCollection);

        const productsList = cardapioSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data() as Omit<Product, 'id'>
        }));

        const filteredProducts = productsList.filter(p => p.category === 'porcao');
        setProducts(filteredProducts);
        setIsLoading(false);
      } catch (e) {
        console.error("Erro ao buscar documentos:", e);
        setIsLoading(false);
      }
    };

    fetchProducts();
    // 2. Remova a leitura do localStorage aqui, pois o CartProvider já faz isso
  }, []);

  // 3. Modifique a função para receber o objeto completo do produto, não apenas o ID
  const handleAddToCart = (product: Product) => {
    addToCart(product);
  }

  const layoutClasses = "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 mx-auto max-w-7xl px-2 mb-16";

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-2xl font-bold text-zinc-900">Carregando Porções...</p>
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
          title="Porções"
          products={products}
          // 4. Passe a nova função handleAddToCart para o MenuSection
          addToCart={handleAddToCart}
          layoutClasses={layoutClasses}
        />
      </div>
      {/* 5. Use o itemCount do contexto para mostrar a quantidade de itens */}
      <CartButton itemCount={itemCount} />
      <Footer />
    </main>
  );
}