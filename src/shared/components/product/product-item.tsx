import Image from 'next/image';
import { Heart } from 'lucide-react';

import { Product } from '@prisma/client';

import { Button } from '../ui';

export const ProductItem = (props: Product) => {
  const { title, price, images } = props;
  return (
    <div className="bg-white flex flex-col px-2 py-4 rounded-lg box-border w-full hover:drop-shadow-lg duration-300 ease-out cursor-pointer">
      <div className="h-[202px] flex items-center justify-center">
        <Image src="/product-placeholder.webp" alt="product" width={150} height={150} />
      </div>
      <div className="line-clamp-3 my-3">
        <p className="text-sm">{title}</p>
        <p className="mt-2 text-base font-bold">{price.toLocaleString('ru')} ₸</p>
      </div>
      <div className="flex gap-2 items-center">
        <Button variant={'secondary'} className="w-full">
          В корзину
        </Button>
        <Heart height={26} width={26} />
      </div>
    </div>
  );
};
