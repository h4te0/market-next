import Image from 'next/image';

import { ProductActionButtons } from '@/shared/components';

import type { IProductWithStuff } from '@/shared/api/fetchers/catalog';

export const ProductItem = (props: IProductWithStuff) => {
  const { id, title, price, images, cartItems, favoritedBy } = props;

  const isInWishlist = favoritedBy[0]?.items.find((el) => el.id === id);

  return (
    <div className="border bg-white flex flex-col justify-between px-4 py-4 rounded-lg box-border w-full hover:drop-shadow-lg duration-300 ease-out cursor-pointer">
      <div>
        <div className="h-[202px] flex items-center justify-center">
          <Image
            src={images[0] || '/product-placeholder.webp'}
            alt="product"
            width={150}
            height={150}
            priority={true}
          />
        </div>
        <div className="my-3">
          <p className="line-clamp-2 text-sm">{title}</p>
          <p className="mt-2 text-base font-bold">{price.toLocaleString('ru')} ₸</p>
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <ProductActionButtons cartItems={cartItems} id={id} isInWishlist={!!isInWishlist} />
      </div>
    </div>
  );
};
