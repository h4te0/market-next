'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next-nprogress-bar';
import qs from 'qs';

import { useFiltersStore } from '@/shared/store/filters';

import { Filters } from '@/shared/components';
import { ProductsList } from './products-list';
import { ProductsPagination } from './products-pagination';

import type { IPagination } from '@/shared/queries/get-products';
import type { Brand, Product } from '@prisma/client';

interface Props {
  productsListProps: {
    products: Product[];
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
  const searchParams = useSearchParams();
  const { push } = useRouter();

  const filters = useFiltersStore();

  const [page, setPage] = useState<string>();

  useEffect(() => {
    const prices = {
      min: Number(searchParams.get('min')) || undefined,
      max: Number(searchParams.get('max')) || undefined,
    };
    const brands = searchParams.get('brands')?.split(',') || [];
    const delivery = Boolean(searchParams.get('delivery'));
    const page = searchParams.get('page') || undefined;

    filters.setPrices(prices);
    filters.setBrands(brands);
    filters.setDelivery(delivery);
    setPage(page);
  }, [searchParams]);

  useEffect(() => {
    const filtersQuery = {
      page: page,
      ...filters.prices,
      delivery: filters.delivery || undefined,
      brands: [...filters.brands],
    };
    const query = qs.stringify(filtersQuery, { arrayFormat: 'comma' });

    push(`?${query}`);
  }, [filters]);

  useEffect(() => {
    setPage(undefined);
  }, [filters.brands, filters.delivery, filters.prices]);

  return (
    <div className="grid grid-cols-12 gap-4">
      <Filters classname="col-span-3" {...props.filterProps} />
      <div className="col-span-9">
        <ProductsList {...props.productsListProps} />
        {props.paginationProps.totalPages > 1 && (
          <ProductsPagination classname="my-4" {...props.paginationProps} />
        )}
      </div>
    </div>
  );
};
