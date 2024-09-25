import { cn } from '@/lib/utils';

import { ProductItem, Title } from '@/shared/components';

import { getNounByCount } from '@/shared/helpers';

import type { IProductWithCart } from '@/shared/api/fetchers/catalog';

interface Props {
  classname?: string;
  catalogTitle?: string;
  total: number;
  products: IProductWithCart[];
}

export const ProductsList = ({ classname, products, catalogTitle, total }: Props) => {
  if (!products.length) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-2xl">К сожалению товаров не найдено 😢</p>
      </div>
    );
  }

  return (
    <div className={cn(classname)}>
      <div className="mb-4">
        <Title size="md">{catalogTitle}</Title>
        <p className="text-sm">
          {getNounByCount(
            products.length,
            `Найден ${total} товар`,
            `Найдено ${total} товара`,
            `Найдено ${total} товаров`,
          )}
        </p>
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(208px,1fr))] gap-4">
        {products.map((product) => (
          <ProductItem key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
};
