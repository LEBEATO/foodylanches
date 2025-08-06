
// src/components/HomePage.tsx
'use client';

// Importações dos componentes
import MenuItems from "@/components/MenuItems";
import CartButton from "@/components/CartButton";
import { useState } from "react";

// Dados de exemplo com a categoria adicionada
const products = [
  { id: 1, name: "Pizza", description: "Deliciosa pizza de calabresa", price: 35.00, image: "/path/to/pizza.jpg", category: "cardapio" },
  { id: 2, name: "Hambúrguer", description: "Suculento hambúrguer artesanal", price: 25.00, image: "/path/to/hamburguer.jpg", category: "cardapio" },
  { id: 3, name: "Batata Frita", description: "Porção de batata frita", price: 15.00, image: "/path/to/fritas.jpg", category: "cardapio" },
  { id: 4, name: "X-Frango Clássico", description: "Frango, maionese e queijo", price: 28.00, image: "/path/to/x-frango-classico.jpg", category: "x-frangos" },
  { id: 5, name: "X-Frango Bacon", description: "Frango, queijo e muito bacon", price: 32.00, image: "/path/to/x-frango-bacon.jpg", category: "x-frangos" },
  { id: 6, name: "Refrigerante", description: "Lata de refrigerante", price: 8.00, image: "/path/to/refri.jpg", category: "bebidas" },
  { id: 7, name: "Água", description: "Garrafa de água mineral", price: 5.00, image: "/path/to/agua.jpg", category: "bebidas" },
];

export default function Home() {
  const [cart, setCart] = useState([]); // Usando useState para gerenciar o estado do carrinho

  const addToCart = (id) => {
    console.log(`Item ${id} adicionado ao carrinho`);
    // Lógica para adicionar o item ao carrinho aqui
  };

  // Filtra os produtos para cada categoria
  const cardapioItems = products.filter(product => product.category === 'cardapio');
  const xfrangosItems = products.filter(product => product.category === 'x-frangos');

  return (
    <div className="p-4">
      {/* Primeira seção: Nosso Cardápio */}
      <h1 className="font-bold text-center text-2xl md:text-center text-zinc-900">
        Nosso Cardápio
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-4 mx-auto max-w-7xl px-2 mb-16">
        {cardapioItems.map(product => (
          <MenuItems
            key={product.id}
            id={product.id}
            name={product.name}
            description={product.description}
            price={product.price}
            image={product.image}
            addToCard={addToCart}
          />
        ))}
      </div>

      <CartButton itemCount={cart.length} />

      {/* Segunda seção: X-frangos */}
      <div className="p-4">
        <h1 className="font-bold text-center text-2xl md:text-center text-zinc-900">
          X-frangos
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-4 mx-auto max-w-7xl px-2 mb-16">
          {xfrangosItems.map(product => (
            <MenuItems
              key={product.id}
              id={product.id}
              name={product.name}
              description={product.description}
              price={product.price}
              image={product.image}
              addToCard={addToCart}
            />
          ))}
        </div>
      </div>
    </div>
  );
}