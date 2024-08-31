import { cn } from '@/lib/utils';

import { Product } from '@prisma/client';

import { ProductItem, Title } from '@/shared/components';

import { getNounByNumb } from '@/shared/helpers/get-noun-by-numb';

interface Props {
  classname?: string;
  catalogTitle?: string;
  total: number;
  products: Product[];
}

export const ProductsList = ({ classname, products, catalogTitle, total }: Props) => {
  return (
    <div className={cn(classname)}>
      <div className="mb-4">
        <Title size="md">{catalogTitle}</Title>
        <p className="text-sm">
          {getNounByNumb(
            products.length,
            `Найден ${total} товар`,
            `Найдено ${total} товара`,
            `Найдено ${total} товаров`,
          )}
        </p>
      </div>
      {products.length > 0 ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(208px,1fr))] gap-4">
          {products.map((product) => (
            <ProductItem key={product.id} {...product} />
          ))}
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <p className="text-2xl">К сожалению товаров не найдено 😢</p>
        </div>
      )}
    </div>
  );
};
