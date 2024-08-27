import { Heart } from 'lucide-react';
import { Button } from '../ui';
import Image from 'next/image';

interface Props {
  title: string;
  price: number;
  image?: string;
}

export const ProductItem = ({ ...item }: Props) => {
  return (
    <div className="bg-white flex flex-col px-2 py-4 rounded-lg box-border w-full hover:drop-shadow-lg duration-300 ease-out cursor-pointer">
      <div className="h-[202px] flex items-center justify-center">
        <Image src="/product-placeholder.webp" alt="product" width={150} height={150} />
      </div>
      <div className="line-clamp-3 my-3">
        <p className="text-sm">{item.title}</p>
        <p className="mt-2 text-base font-bold">{item.price.toLocaleString('ru')} ₸</p>
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
