
'use client'
import React from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

interface CarouselItem {
  id: string;
  imageSrc: string; 
  description: string;
  title: string;
}

interface CarouselComponentProps {
    items: CarouselItem[]; 
}


function CarouselComponent({ items }: CarouselComponentProps) { 
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

  if (!items || items.length === 0) {
    // Retorne null ou uma mensagem para não causar erro quando os dados ainda não estiverem carregados
    return null;
  }

return (
    <div className="relative w-full max-w-5xl mx-auto py-8 mt-20">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y -ml-4 min-w-0">
          {items.map((item) => (
            <div
              key={item.id}
              className="pl-4 flex-grow-0 flex-shrink-0 basis-full sm:basis-1/2 md:basis-1/3 flex flex-col items-center"
            >
              <Card className="w-full max-w-xs h-[300px] shadow-lg rounded-lg overflow-hidden cursor-pointer relative">
                <div className="w-full h-full relative">
                  <Image
                    src={item.imageSrc} 
                    alt={item.title}
                    fill
                    className="object-cover rounded-lg"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-10 flex flex-col items-center justify-center h-full bg-gradient-to-t from-black/70 via-black/30 to-transparent text-center">
                    <div className="w-full">
                        <h3 className="text-2xl font-bold">{item.title}</h3>
                        <p className="text-lg mt-2 text-wrap">{item.description}</p></div>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
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