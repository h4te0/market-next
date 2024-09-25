'use client';

import Autoplay from 'embla-carousel-autoplay';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/shared/components';

export const MainSlider = () => {
  return (
    <Carousel
      opts={{ loop: true }}
      plugins={[Autoplay({ delay: 5000, stopOnMouseEnter: true, stopOnInteraction: false })]}>
      <CarouselContent>
        {Array.from({ length: 3 }).map((_, i) => (
          <CarouselItem key={i}>
            <div className="h-[400px] rounded-lg bg-primary w-full text-white font-bold text-2xl flex items-center justify-center cursor-pointer select-none">
              Реклама №{i + 1}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};
