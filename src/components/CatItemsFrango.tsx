

"use client";

import { IconPlus } from "@tabler/icons-react";
import Image from "next/image"; // Usamos o Image do Next.js para otimização
import { Button } from "@/components/ui/button"; // Componente Button do shadcn/ui
import { Card, CardContent } from "@/components/ui/card"; // Componentes Card do shadcn/ui

interface MenuItemsProps {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  addToCard: (id: number) => void;
}

const MenuItems = ({
  id,
  name,
  description,
  price,
  image,
  addToCard,
}: MenuItemsProps) => {
  return (
    // Usamos um Card do shadcn/ui para envolver cada item do menu
    <Card className="grid grid-cols-1 sm:grid-cols-2 items-center justify-center space-x-0 
    sm:space-x-5 mt-8 p-4 px-4 border-b duration-75 transition-colors hover:bg-orange-200 rounded-3xl">
      {/* Seção da Imagem */}
       <div className="relative flex items-center justify-center w-[180px] h-[110] overflow-hidden rounded-md mb-4 sm:mb-0">
         <Image
            src={image}
            alt={name}
            width={140}
            height={110}
           
            className="object-cover w-[150px] h-[110px] rounded-md transition-transform duration-300 ease-in-out hover:scale-105"
          />
         </div>

      {/* Seção de Informações do Produto dentro de um CardContent */}
      <CardContent className="border-t pt-4 sm:pt-0 sm:border-t-0 sm:pl-4 p-0"> {/* p-0 para controlar o padding manualmente */}
        <div className="grid grid-cols-1 py-4 cursor-pointer">
          <h2 className="text-xl sm:text-2xl font-bold text-zinc-900">
            {name}
          </h2>
          <p className="text-sm text-gray-900">{description}</p>
          <div className="flex flex-col sm:flex-row py-4 justify-between items-start sm:items-center">
            <p className="text-lg font-semibold text-red-900 mb-2 sm:mb-0">
              R${price.toFixed(2)}
            </p>
            {/* Usamos o componente Button do shadcn/ui */}
            <Button
              onClick={() => addToCard(id)}
              className="flex items-center gap-1 bg-green-900 rounded-md border border-zinc-900 px-2 py-1 text-sm text-black w-full sm:w-[100px] h-[30px] mx-auto"
            >
              <IconPlus size={16} stroke={2} />
              <p>Adicionar</p>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MenuItems;