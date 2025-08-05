
// src/components/HomePage.tsx
'use client';

// Importações dos componentes
import MenuItems from "@/components/MenuItems"; // Ajustei o nome do arquivo para MenuItems
import { CartButton } from "@/components/CartButton"; // Ajustei a importação

// Dados de exemplo (você pode substituir por dados reais)
const products = [
  { id: 1, name: "Pizza", description: "Deliciosa pizza de calabresa", price: 35.00, image: "/path/to/pizza.jpg" },
  { id: 2, name: "Hambúrguer", description: "Suculento hambúrguer artesanal", price: 25.00, image: "/path/to/hamburguer.jpg" },
  { id: 3, name: "Batata Frita", description: "Porção de batata frita", price: 15.00, image: "/path/to/fritas.jpg" },
  { id: 4, name: "Refrigerante", description: "Lata de refrigerante", price: 8.00, image: "/path/to/refri.jpg" },
  { id: 5, name: "Sobremesa", description: "Um delicioso pudim", price: 12.00, image: "/path/to/pudim.jpg" },
  { id: 6, name: "Água", description: "Garrafa de água mineral", price: 5.00, image: "/path/to/agua.jpg" },
];

export default function Home() {
  const cart = []; // Estado do carrinho, você pode implementar a lógica aqui
  const addToCart = (id) => console.log(`Item ${id} adicionado ao carrinho`);

  return (
    <div className="p-4">
      {/* Primeira seção: Nosso Cardápio */}
      <h1 className="font-bold text-center text-2xl md:text-center text-zinc-900">
        Nosso Cardápio
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-4 mx-auto max-w-7xl px-2 mb-16">
        {products.map(product => (
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
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-4 mx-auto max-w-7xl px-2 mb-8">
          {products.map(product => (
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