'use client';

import { useState } from 'react';
import { Heart } from 'lucide-react';
import Link from 'next/link';

import { useAddToCart, useAddToWishlist, useDeleteWishlistItem } from '@/shared/api/queries';

import { Button } from '../ui';

import { paths } from '@/shared/consts/paths';

import type { CartItem } from '@prisma/client';

interface Props {
  cartItems?: CartItem[];
  id: number;
  isInWishlist: boolean;
}

export const ProductActionButtons = ({ cartItems, id, isInWishlist }: Props) => {
  const [inCartAdded, setInCartAdded] = useState<boolean>();
  const [inWishlistAdded, setInWishlistAdded] = useState<boolean>();

  const { addToCart, isPending: isCartPending } = useAddToCart(setInCartAdded);
  const { addToWishlist, isPending: isWishlistPending } = useAddToWishlist(setInWishlistAdded);
  const { deleteWishlistItem, isPending: isDeletePending } =
    useDeleteWishlistItem(setInWishlistAdded);

  const isInCart = inCartAdded || cartItems?.length;

  const addToCartHandler = () => {
    addToCart(id);
  };

  const addToWishlistHandler = () => {
    addToWishlist(id);
  };

  const deleteFromWishlistHandler = () => {
    deleteWishlistItem(id);
  };

  return (
    <>
      {isInCart ? (
        <Link href={paths.cart} className="w-full">
          <Button disabled={isCartPending} variant={'outlineActive'} className="w-full">
            В корзину
          </Button>
        </Link>
      ) : (
        <Button
          onClick={addToCartHandler}
          disabled={isCartPending}
          variant={'secondary'}
          className="w-full">
          Добавить
        </Button>
      )}
      {inWishlistAdded || isInWishlist ? (
        <div
          className="aspect-square hover:scale-110 duration-300 ease-in-out cursor-pointer"
          onClick={deleteFromWishlistHandler}>
          <Heart
            height={26}
            width={26}
            color="#DF0613"
            fill="#F6B5B9"
            className={isDeletePending ? 'scale-90 opacity-40 pointer-events-none' : ''}
          />
        </div>
      ) : (
        <div
          className="aspect-square hover:scale-110 duration-300 ease-in-out cursor-pointer"
          onClick={addToWishlistHandler}>
          <Heart
            height={26}
            width={26}
            className={isWishlistPending ? 'scale-90 opacity-40 pointer-events-none' : ''}
          />
        </div>
      )}
    </>
  );
};
