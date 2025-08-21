
'use client';

import {IconPlus } from "@tabler/icons-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Product } from "@/app/page";



// A interface pode estender Product e adicionar a função addToCard
interface MenuItemsProps extends Product {
  addToCard: (id: number) => void;
}

const MenuItems = ({ id, name, description, price, image, addToCard }: MenuItemsProps) => {
  return (
    
      <Card className="flex flex-col w-full h-full items-center p-4 overflow-auto hover:bg-orange-200 transition-colors duration-300">
        {/* Seção da Imagem */}
        <div className="w-[90px] h-[50px] sm:w-[150px] sm:h-[120px] mb-4 flex items-center justify-center">
          <Image
            src={image}
            alt={name}
            width={90}
            height={60}
            layout="responsive"
            objectFit="contain"
            className="rounded-lg transition-transform duration-300 ease-in-out hover:scale-110"
          />
        </div>

        {/* Seção de Informações do Produto */}
        <CardContent className="grid grid-cols-1 gap-1 p-0 pt-1 text-center overflow-auto">
          <h2 className=" text-sm sm:text-lg text-center font-bold text-gray-800 leading-tight">
            {name}
          </h2>

          {/* A descrição agora irá quebrar em múltiplas linhas */}
          <p className="mt-2 text-xs sm:text-sm text-center items-center justify-center text-gray-700">{description}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 justify-center items-center mt-2 gap-2">
            <p className="text-sm sm:text-lg font-semibold px-1 text-red-900">
              R${parseFloat(price.toString()).toFixed(2)}
            </p>
            <Button
              onClick={() => addToCard(id)}
              className="py-4 px-10 bg-green-900 text-white rounded-md border border-zinc-900 "
            >
              <IconPlus size={16} stroke={2} className="text-white" />
              Adicionar
            </Button>
          </div>
        </CardContent>
      </Card>
      
    
  );
};

export default MenuItems;