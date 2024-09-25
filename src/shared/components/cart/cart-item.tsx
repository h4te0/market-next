import Image from 'next/image';
import { Heart, Minus, Plus, Trash } from 'lucide-react';
import { useRouter } from 'next-nprogress-bar';

import { cn } from '@/lib/utils';

import { Checkbox } from '../ui';

import type { CartItemsWithProducts } from '@/shared/api/queries/cart/use-cart';
import type { UseMutateFunction } from '@tanstack/react-query';
import type { AxiosResponse } from 'axios';

interface Props {
  classname?: string;
  item: CartItemsWithProducts;
  selectionProps: {
    checked: boolean;
    selectedItems: number[];
    setSelectedItems: ([]: number[]) => void;
  };
  actions: {
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

export const CartItem = ({ classname, item, selectionProps, actions }: Props) => {
  const { checked, selectedItems, setSelectedItems } = selectionProps;
  const { id, product, quantity } = item;
  const { updateCount, deleteCartItem } = actions;

  const router = useRouter();

  const handleCheckboxChange = (isChecked: boolean) => {
    if (isChecked) {
      setSelectedItems([...selectedItems, id]);
    } else {
      setSelectedItems(selectedItems.filter((el) => el !== id));
    }
  };

  const handleDelete = () => {
    deleteCartItem(id);
    router.refresh();
  };

  const handleDecrease = () => updateCount({ id, quantity: quantity - 1 });
  const handleIncrease = () => updateCount({ id, quantity: quantity + 1 });

  return (
    <div className={cn('py-4 [&:not(:last-child)]:border-b', classname)}>
      <div className="flex justify-end">
        <div className="aspect-square hover:scale-105 duration-300 ease-in-out cursor-pointer h-fit w-fit">
          <Heart />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Checkbox checked={checked} onCheckedChange={handleCheckboxChange} />
        <div>
          <Image
            className="w-auto"
            src={product.images[0] || '/product-placeholder.webp'}
            alt="product"
            width={80}
            height={80}
          />
        </div>
        <div className="flex justify-between w-full">
          <div>
            <p className="text-sm">{product.title}</p>
            <p className="text-lg font-bold">{product.price.toLocaleString('ru')} ₸</p>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
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
      </div>
    </div>
  );
};
