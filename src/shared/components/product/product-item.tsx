'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Heart } from 'lucide-react';
import { useRouter } from 'next-nprogress-bar';

import { useAddToCart } from '@/shared/api/queries/cart/use-add-to-cart';

import { Button } from '../ui';

import Link from 'next/link';
import { paths } from '@/shared/consts/paths';

import type { IProductWithCart } from '@/shared/api/fetchers/catalog';

export const ProductItem = (props: IProductWithCart) => {
  const { id, title, price, images, cartItems } = props;

  const [added, setAdded] = useState<boolean>();
  const { addToCart, isPending } = useAddToCart(setAdded);

  const router = useRouter();
  return (
    <div className="bg-white flex flex-col px-2 py-4 rounded-lg box-border w-full hover:drop-shadow-lg duration-300 ease-out cursor-pointer">
      <div className="h-[202px] flex items-center justify-center">
        <Image
          src={images[0] || '/product-placeholder.webp'}
          alt="product"
          width={150}
          height={150}
          priority={true}
        />
      </div>
      <div className="line-clamp-3 my-3">
        <p className="text-sm">{title}</p>
        <p className="mt-2 text-base font-bold">{price.toLocaleString('ru')} ₸</p>
      </div>
      <div className="flex gap-2 items-center">
        {added || cartItems.length ? (
          <Link href={paths.cart} className="w-full">
            <Button disabled={isPending} variant={'outlineActive'} className="w-full">
              Перейти в корзину
            </Button>
          </Link>
        ) : (
          <Button
            onClick={() => {
              addToCart(id);
              router.refresh();
            }}
            disabled={isPending}
            variant={'secondary'}
            className="w-full">
            Добавить в корзину
          </Button>
        )}
        <div className="aspect-square hover:scale-110 duration-300 ease-in-out">
          <Heart height={26} width={26} />
        </div>
      </div>
    </div>
  );
};
