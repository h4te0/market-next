import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Input,
  Title,
  RangeSlider,
} from '../ui';

import type { IPrices } from '@/shared/store/filters';

interface Props {
  classname?: string;
  prices: IPrices;
  setPrices: ({}: IPrices) => void;
  maxPrice: number;
  minPrice: number;
}

export const PriceFilter = ({ prices, setPrices, maxPrice, minPrice }: Props) => {
  const updatePrices = (pricesLocal: number[]) => {
    setPrices({ min: pricesLocal[0], max: pricesLocal[1] });
  };
  return (
    <div className="mb-2">
      <AccordionItem value="price">
        <AccordionTrigger>
          <Title size="xs">Цена ( ₸ )</Title>
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex items-center mt-2 mb-6">
            <Input
              placeholder="От"
              type="number"
              // pattern="[0-9]+([\.][0-9]{1,2})?"
              min={minPrice}
              max={maxPrice}
              value={prices.min || minPrice}
              onChange={(e) => setPrices({ max: prices.max, min: Number(e.target.value) })}
            />
            <p className="font-bold text-xl mx-2">-</p>
            <Input
              placeholder="До"
              type="number"
              // pattern="[0-9]+([\.][0-9]{1,2})?"
              min={minPrice}
              max={maxPrice}
              value={prices.max || maxPrice}
              onChange={(e) => setPrices({ max: Number(e.target.value), min: prices.min })}
            />
          </div>
          <RangeSlider
            step={10}
            minTotal={minPrice}
            maxTotal={maxPrice}
            value={[prices.min || minPrice, prices.max || maxPrice]}
            onValueChange={updatePrices}
          />
        </AccordionContent>
      </AccordionItem>
    </div>
  );
};
