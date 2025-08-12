
'use client';

import Image from "next/image";
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

// Dados dos cards do carrossel. Você pode adicionar mais aqui.
const carouselItemsData = [
  {
    id: "1",
    imageSrc: "/burger-cheese.png",
    description: "Descrição do Card 1.",
    title: "Título do Card 1",
  },
  {
    id: "2",
    imageSrc: "/frangao-tudo.png",
    description: "Descrição do Card 2.",
    title: "Título do Card 2",
  },
  {
    id: "3",
    imageSrc: "/frango-catupiry.png",
    description: "Descrição do Card 3.",
    title: "Título do Card 3",
  },
  {
    id: "4",
    imageSrc: "/frangao-tudo.png",
    description: "Descrição do Card 4.",
    title: "Título do Card 4",
  },
];

// O tipo de dados para cada item do carrossel


// O componente principal do carrossel
export function CarouselComponent() {
  // Configuração do plugin Autoplay
  const autoplayOptions = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false })
  ).current;

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      slidesToScroll: 1,
    },
    [autoplayOptions]
  );

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="relative w-full max-w-5xl mx-auto py-8 mt-20">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y -ml-4 min-w-0">
          {/* Mapeia e renderiza cada item do array 'carouselItemsData' */}
          {carouselItemsData.map((item) => (
            <div
              key={item.id}
              className="pl-4 flex-grow-0 flex-shrink-0 basis-full sm:basis-1/2 md:basis-1/3 flex flex-col items-center"
            >
              <Card className="w-52 h-56 items-center justify-center shadow-lg rounded-lg overflow-hidden cursor-pointer flex flex-col mt-2">
                <div className="w-[80px] h-[60px] mt-4 relative">
                  <Image
                    src={item.imageSrc}
                    alt={item.title}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                </div>
                
                <CardContent className="p-2 flex-grow">
                  <div className="mb-1">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-3">{item.title}</h3>
                  </div>
                  <p className="text-sm items-center justify-center text-gray-900 line-clamp-3">{item.description}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Botões de navegação personalizados */}
      <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 -translate-y-1/2 left-4 sm:-left-4 bg-slate-400 z-10 hidden sm:flex"
        onClick={scrollPrev}
      >
        {"<"}
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 -translate-y-1/2 -right-4 bg-slate-400 z-10 hidden sm:flex"
        onClick={scrollNext}
      >
        {">"}
      </Button>
    </div>
  );
}

export default CarouselComponent;