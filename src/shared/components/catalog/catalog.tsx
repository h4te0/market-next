'use client';

import { Filters, ProductsList, ProductsPagination } from '@/shared/components';

import type { IPagination, IProductWithStuff } from '@/shared/api/fetchers/catalog';
import type { Brand } from '@prisma/client';

interface Props {
  productsListProps: {
    products: IProductWithStuff[];
    total: number;
    catalogTitle: string;
  };
  filterProps: {
    minPrice: number;
    maxPrice: number;
    brands: Brand[];
  };
  paginationProps: IPagination;
}

export const Catalog = (props: Props) => {
  return (
    <div className="grid grid-cols-12 gap-4">
      <Filters classname="col-span-3" {...props.filterProps} />
      <div className="col-span-9">
        <ProductsList {...props.productsListProps} />
        <ProductsPagination classname="my-4" {...props.paginationProps} />
      </div>
    </div>
  );
};
