import { cn } from '@/lib/utils';

import { ProductItem, Title } from '@/shared/components';

import { getNounByCount } from '@/shared/helpers';

import type { IProductWithStuff } from '@/shared/api/fetchers/catalog';
import { CatalogEmpty } from './catalog-empty';

interface Props {
  classname?: string;
  catalogTitle?: string;
  total: number;
  products: IProductWithStuff[];
}

export const ProductsList = ({ classname, products, catalogTitle, total }: Props) => {
  if (!products.length) {
    return <CatalogEmpty catalogTitle={catalogTitle} total={total} />;
  }

  return (
    <div className={cn(classname)}>
      <div className="mb-4">
        <Title size="md">{catalogTitle}</Title>
        <p className="text-sm">
          {getNounByCount(
            total,
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
