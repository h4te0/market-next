'use client';

import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

import { RangeSlider } from '../ui/range-slider';
import { Title } from '../ui/title';
import { Input } from '../ui';

interface Props {
  classname?: string;
}

export const Filters = ({ classname }: Props) => {
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(100000);
  const [localMin, setLocalMin] = useState<number>();
  const [localMax, setLocalMax] = useState<number>();

  useEffect(() => {
    setLocalMin(min);
    setLocalMax(max);
  }, []);

  const updatePrices = (prices: number[]) => {
    setMin(prices[0]);
    setMax(prices[1]);
  };
  return (
    <div className={cn('bg-white px-4 py-6 rounded-2xl h-fit', classname)}>
      <div>
        <Title size="xs">Цена ( ₸ )</Title>
        <div className="flex items-center mt-2 mb-6">
          <Input
            placeholder="От"
            type="number"
            // pattern="[0-9]+([\.][0-9]{1,2})?"
            min={localMin}
            max={localMax}
            value={min}
            onChange={(e) => setMin(Number(e.target.value))}
          />
          <p className="font-bold text-xl mx-2">-</p>
          <Input
            placeholder="До"
            type="number"
            // pattern="[0-9]+([\.][0-9]{1,2})?"
            min={localMin}
            max={localMax}
            value={max}
            onChange={(e) => setMax(Number(e.target.value))}
          />
        </div>
        <RangeSlider step={10} value={[min, max]} onValueChange={updatePrices} />
      </div>
    </div>
  );
};
