'use client';

import Image from 'next/image';
import { Heart, Minus, Plus, Trash } from 'lucide-react';
import { useRouter } from 'next-nprogress-bar';

import { cn } from '@/lib/utils';

import { Checkbox } from '../ui';

import type { ICartItemsWithProducts } from '@/shared/api/queries/cart/use-cart';
import type { UseMutateFunction } from '@tanstack/react-query';
import type { AxiosResponse } from 'axios';
import Link from 'next/link';
import { paths } from '@/shared/consts';
import { useAddToWishlist, useDeleteWishlistItem } from '@/shared/api/queries';
import { useState } from 'react';

interface Props {
  classname?: string;
  item: ICartItemsWithProducts;
  isOrder?: boolean;
  selectionProps?: {
    checked: boolean;
    selectedItems: number[];
    setSelectedItems: ([]: number[]) => void;
  };
  actions?: {
    updateCount: UseMutateFunction<
      AxiosResponse<any, any>,
      Error,
      {
        id: number;
        quantity: number;
      },
      unknown
    >;
    deleteCartItem: UseMutateFunction<AxiosResponse<any, any>, Error, number, unknown>;
  };
}

export const CartItem = ({ classname, item, isOrder, selectionProps, actions }: Props) => {
  const { id, product, quantity } = item;

  const router = useRouter();

  const [isAdded, setIsAdded] = useState<boolean>();

  const { addToWishlist, isPending: isWishlistPending } = useAddToWishlist(setIsAdded);
  const { deleteWishlistItem, isPending: isDeletePending } = useDeleteWishlistItem(setIsAdded);

  const isInWishlist = product.favoritedBy[0]?.items.find((el) => el.id === product.id);

  const handleCheckboxChange = (isChecked: boolean) => {
    if (isChecked) {
      selectionProps?.setSelectedItems([...selectionProps?.selectedItems, id]);
    } else {
      selectionProps?.setSelectedItems(selectionProps?.selectedItems.filter((el) => el !== id));
    }
  };

  const handleDelete = () => {
    actions?.deleteCartItem(id);
    router.refresh();
  };

  const handleDecrease = () => actions?.updateCount({ id, quantity: quantity - 1 });
  const handleIncrease = () => actions?.updateCount({ id, quantity: quantity + 1 });

  return (
    <div className={cn('py-4 [&:not(:last-child)]:border-b', classname)}>
      <div className="flex justify-end">
        {!isOrder &&
          (isAdded || isInWishlist ? (
            <div
              className="aspect-square hover:scale-110 duration-300 ease-in-out cursor-pointer"
              onClick={() => deleteWishlistItem(product.id)}>
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
              onClick={() => addToWishlist(product.id)}>
              <Heart
                height={26}
                width={26}
                className={isWishlistPending ? 'scale-90 opacity-40 pointer-events-none' : ''}
              />
            </div>
          ))}
      </div>
      <div className="flex items-center gap-4">
        {!isOrder && (
          <Checkbox checked={selectionProps?.checked} onCheckedChange={handleCheckboxChange} />
        )}
        <Link href={paths.product + '/' + item.product.slug}>
          <div>
            <Image
              className="w-auto"
              src={product.images[0] || '/product-placeholder.webp'}
              alt="product"
              width={80}
              height={80}
            />
          </div>
        </Link>
        <div className="flex justify-between w-full">
          <div>
            <p className="text-sm">{product.title}</p>
            <p className="text-lg font-bold">{product.price.toLocaleString('ru')} ₸</p>
          </div>
        </div>
        {isOrder && <p className="font-bold">x{quantity}</p>}
      </div>
      <div className="flex justify-end">
        {!isOrder && (
          <div className="flex">
            {quantity === 1 ? (
              <div
                className="flex items-center justify-center p-2 cursor-pointer"
                onClick={handleDelete}>
                <Trash color="#8E979F" width={16} height={16} />
              </div>
            ) : (
              <div
                className="flex items-center justify-center p-2 cursor-pointer"
                onClick={handleDecrease}>
                <Minus color="#8E979F" width={16} height={16} />
              </div>
            )}
            <p className="flex items-center justify-center w-8 h-8 border rounded-lg">{quantity}</p>
            <div
              className="flex items-center justify-center p-2 cursor-pointer"
              onClick={handleIncrease}>
              <Plus color="#8E979F" width={16} height={16} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
