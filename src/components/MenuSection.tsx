
// components/MenuSection.tsx
'use client';

import MenuItems from "./MenuItems";
import { Product } from "@/app/page"; // Importação correta da interface Product

interface MenuSectionProps {
  title: string;
  products: Product[];
  addToCart: (id: number) => void;
  layoutClasses: string;
}

const MenuSection = ({ title, products, addToCart, layoutClasses }: MenuSectionProps) => (
  <div className="p-4">
    <h1 className="font-bold text-center text-2xl md:text-center text-zinc-900">
      {title}
    </h1>
    <div className={layoutClasses}>
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
);

export default MenuSection;