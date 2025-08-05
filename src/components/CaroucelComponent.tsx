
'use client';

import Image from "next/image";
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

interface CarouselItemData {
  id: string;
  imageSrc: string;
  description: string;
  title: string;
}

interface CarouselComponentProps {
  items: CarouselItemData[];
}

export function CarouselComponent({ items }: CarouselComponentProps) {
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
    [autoplayOptions] // Usando o plugin de autoplay
  );

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    // Container principal do carrossel, com largura máxima de 5xl e centralizado.
    // Você pode ajustar 'max-w-5xl' se precisar de mais espaço.
    <div className="relative w-full max-w-5xl mx-auto py-8">
      {/* Container do Embla, com overflow-hidden para esconder os cards que estão fora de vista. */}
      <div className="overflow-hidden" ref={emblaRef}>
        {/*
          Container dos slides. O 'flex' organiza os cards em linha.
          A classe 'min-w-0' é crucial para que os slides possam encolher
          e se ajustar de acordo com as classes 'basis', permitindo que
          vários cards apareçam na tela.
        */}
        <div className="flex touch-pan-y -ml-4 min-w-0">
          {items.map((item) => (
            // Contêiner de cada card.
            // As classes 'basis' definem a largura de cada card em diferentes tamanhos de tela.
            // basis-full: 1 card por tela em telas pequenas (mobile)
            // sm:basis-1/2: 2 cards por tela em telas médias (tablet)
            // md:basis-1/3: 3 cards por tela em telas grandes (desktop)
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

      <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 -translate-y-1/2 left-4 sm:-left-4 bg-slate-300 z-10 hidden sm:flex"
        onClick={scrollPrev}
      >
        {"<"}
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 -translate-y-1/2 -right-4 bg-slate-300 z-10 hidden sm:flex"
        onClick={scrollNext}
      >
        {">"}
      </Button>
    </div>
  );
}

export default CarouselComponent;