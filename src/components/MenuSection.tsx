
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
  <div className="p-8">
    <h2 className=" font-bold text-center mb-12 text-gray-800 dark:text-white relative">
        <span className="relative z-10 text-2xl sm:text-4xl md:text-4xl lg:text-4xl bg-gray-300 dark:bg-gray-900 px-4 ">{title}</span>
        <div className="absolute inset-x-0 top-1/2 h-px bg-gray-400 dark:bg-gray-700 -translate-y-1/2"></div>
      </h2>
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