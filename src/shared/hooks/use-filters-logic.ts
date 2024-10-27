import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next-nprogress-bar';
import qs from 'qs';

import { useFiltersStore } from '@/shared/store/filters';

export const useFiltersLogic = () => {
  const searchParams = useSearchParams();
  const { push } = useRouter();
  const filters = useFiltersStore();
  const [currentPage, setCurrentPage] = useState<string>();

  useEffect(() => {
    const minPrice = Number(searchParams.get('min')) || undefined;
    const maxPrice = Number(searchParams.get('max')) || undefined;
    const brands = searchParams.get('brands')?.split(',') || [];
    const delivery = Boolean(searchParams.get('delivery'));
    const page = searchParams.get('page') || undefined;

    filters.setPrices({ min: minPrice, max: maxPrice });
    filters.setBrands(brands);
    filters.setDelivery(delivery);
    setCurrentPage(page);
  }, [searchParams]);

  useEffect(() => {
    const filtersQuery = {
      page: currentPage,
      ...filters.prices,
      delivery: filters.delivery || undefined,
      brands: [...filters.brands],
    };
    const query = qs.stringify(filtersQuery, { arrayFormat: 'comma' });
    push(`?${query}`);
  }, [filters]);

  useEffect(() => {
    setCurrentPage(undefined);
  }, [filters.brands.length, filters.delivery, filters.prices]);
};
