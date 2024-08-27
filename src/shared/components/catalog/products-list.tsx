'use client';
import { cn } from '@/lib/utils';
import { Product } from '@prisma/client';
import { ProductItem } from '../product/product-item';
import { Title } from '../ui/title';
import { getNounByNumb } from '@/lib/get-noun-by-numb';

interface Props {
  classname?: string;
  catalogTitle?: string;
  products: Product[];
}

export const ProductsList = ({ classname, products, catalogTitle }: Props) => {
  return (
    <div className={cn(classname)}>
      <div className="mb-4">
        <Title size="md">{catalogTitle}</Title>
        <p className="text-sm">
          {getNounByNumb(
            products.length,
            `Найден ${products.length} товар`,
            `Найдено ${products.length} товара`,
            `Найдено ${products.length} товаров`,
          )}
        </p>
      </div>
      {products.length > 0 ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(208px,1fr))] gap-4">
          {products.map((item) => (
            <ProductItem
              key={item.id}
              title={item.title}
              price={item.price}
              image={item.images[0]}
            />
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
