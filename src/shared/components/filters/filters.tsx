'use client';

import { cn } from '@/lib/utils';

import { Accordion } from '../ui';

import { PriceFilter, BrandsFilter, DeliveryFilter } from '@/shared/components';

import { useFiltersStore } from '@/shared/store/filters';

import type { Brand } from '@prisma/client';

interface Props {
  classname?: string;
  brands: Brand[];
  maxPrice: number;
  minPrice: number;
}

export const Filters = (props: Props) => {
  const { classname, brands, maxPrice, minPrice } = props;

  const filters = useFiltersStore();

  return (
    <div className={cn('bg-white px-4 py-6 rounded-2xl h-fit', classname)}>
      <Accordion type="multiple" defaultValue={['price', 'brands']}>
        <PriceFilter
          setPrices={filters.setPrices}
          prices={filters.prices}
          maxPrice={maxPrice}
          minPrice={minPrice}
        />
        <BrandsFilter brands={brands} selected={filters.brands} setSelected={filters.setBrands} />
        <DeliveryFilter isDelivery={filters.delivery} setIsDelivery={filters.setDelivery} />
      </Accordion>
    </div>
  );
};
