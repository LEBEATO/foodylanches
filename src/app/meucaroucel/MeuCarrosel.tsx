'use client'
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { db } from "@/lib/firebase"; // Importe a instância do Firestore
import { collection, getDocs } from "firebase/firestore"; // Importe as funções do Firestore

// Defina a interface para o tipo de dado do carrossel
export interface CarouselDataType {
  id: string;
  imageSrc: string; 
  description: string;
  title: string;
}

export function MeuCarrossel() {
  const [items, setItems] = useState<CarouselDataType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mova a lógica de busca para dentro do useEffect do componente
  useEffect(() => {
    async function fetchCarouselItems() {
      try {
        const querySnapshot = await getDocs(collection(db, "produtos"));
        const carouselItemsList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as CarouselDataType));
        setItems(carouselItemsList);
      } catch (error) {
        console.error("Erro ao buscar os itens do carrossel:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCarouselItems();
  }, []);

  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false })
  );

  if (isLoading) {
    // Retorna um loader enquanto os dados são carregados
    return (
      <div className="flex justify-center items-center h-[300px] my-10">
        <p className="text-xl font-bold text-zinc-900">Carregando carrossel...</p>
      </div>
    );
  }

  if (items.length === 0) {
    // Retorna null se não houver itens para renderizar
    return null;
  }

  return (
    <div className="relative w-full max-w-3xl mx-auto py-6 mt-10">
      <Carousel
        plugins={[plugin.current]}
        opts={{
          loop: true,
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent>
          {items.map((item) => (
            <CarouselItem key={item.id} className="basis-full sm:basis-1/2 md:basis-1/3">
              <div className="p-1">
                <Card className="w-full h-[300px] shadow-lg rounded-lg overflow-hidden cursor-pointer relative">
                  <div className="w-full h-[300px] relative">
                    <Image
                      src={item.imageSrc}
                      alt={item.title}
                      fill
                      className="object-cover rounded-lg"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-10 flex flex-col items-center justify-center h-full bg-gradient-to-t from-black/70 via-black/30 to-transparent text-center">
                      <div className="w-full">
                        <h3 className="text-2xl font-bold">{item.title}</h3>
                        <p className="text-lg mt-2 text-wrap">{item.description}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}