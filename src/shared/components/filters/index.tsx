'use client';

import { cn } from '@/lib/utils';

import { Accordion } from '../ui';

import { PriceFilter } from './price-filter';
import { BrandsFilter } from './brands-filter';
import { DeliveryFilter } from './delivery-filter';

import type { Brand } from '@prisma/client';
import { useFiltersStore } from '@/shared/store/filters';

interface Props {
  classname?: string;
  brands: Brand[];
  maxPrice: number;
  minPrice: number;
}

export const Filters = (props: Props) => {
  const { classname, brands, maxPrice, minPrice } = props;

  const filters = useFiltersStore();
  console.log(filters);

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
