'use client';

import { useWishlist } from '@/shared/api/queries';

import { ProductItem, Spinner, Title, WishlistEmpty } from '@/shared/components';
import { paths } from '@/shared/consts';
import { Heart } from 'lucide-react';
import Link from 'next/link';

interface Props {
  isOverview?: boolean;
}

export const Wishlist = ({ isOverview }: Props) => {
  const { data: wishlist, isLoading } = useWishlist();

  return (
    <div className="bg-white rounded-lg p-6 min-h-full">
      {isOverview ? (
        <div className="mb-4 flex justify-between">
          <h2 className="flex items-center gap-2 text-lg font-bold">
            <Heart color="#f97316" />
            Избранное
          </h2>
          <Link href={paths.profile.wishlist} className="text-secondary">
            Перейти в избранное
          </Link>
        </div>
      ) : (
        <Title className="mb-4">Избранное</Title>
      )}
      <hr />
      {isLoading ? (
        <div className="h-[300px]">
          <Spinner />
        </div>
      ) : !wishlist?.items.length ? (
        <WishlistEmpty className={isOverview ? 'h-[340px]' : ''} />
      ) : (
        <div className="grid grid-cols-4 gap-4 mt-4">
          {wishlist?.items.map((item) => (
            <ProductItem key={item.id} {...item} />
          ))}
        </div>
      )}
    </div>
  );
};
