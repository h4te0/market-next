import Link from 'next/link';

import { CartItem, CheckoutBlock, CheckoutCartItemSkeleton } from '@/shared/components';

import { paths } from '@/shared/consts';

import type { ICartWithItems } from '@/shared/api/queries';

interface Props {
  cart?: ICartWithItems;
  isLoading?: boolean;
}

export const CheckoutCartItems = ({ cart, isLoading }: Props) => {
  return (
    <CheckoutBlock
      title="1. Товары готовые к оформлению"
      endAdornment={
        <Link href={paths.cart} className="text-secondary">
          Вернуться в корзину
        </Link>
      }>
      <div className="flex flex-col px-6 max-h-[450px] overflow-scroll">
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => <CheckoutCartItemSkeleton key={i} />)
          : cart?.items.map((item) => (
              <CartItem key={item.id} classname="py-1" isOrder={true} item={item} />
            ))}
      </div>
    </CheckoutBlock>
  );
};
