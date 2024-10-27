import { AccordionContent, AccordionItem, AccordionTrigger, Title, Toggle } from '../ui';

import type { Brand } from '@prisma/client';

interface Props {
  brands: Brand[];
  selected: string[];
  setSelected: (brands: string[]) => void;
}

export const BrandsFilter = ({ brands, selected, setSelected }: Props) => {
  if (brands.length === 0) return;

  return (
    <div className="mb-2">
      <AccordionItem value="brands">
        <AccordionTrigger>
          <Title size="xs">Бренды</Title>
        </AccordionTrigger>
        <AccordionContent>
          <div className="mt-2">
            {brands?.map((brand) => (
              <Toggle
                variant="outline"
                className="mr-2 mb-2"
                key={brand.id}
                pressed={selected.some((el) => el === brand.slug)}
                onPressedChange={(v) =>
                  v
                    ? setSelected([...selected, brand.slug])
                    : setSelected([...selected.filter((el) => el !== brand.slug)])
                }>
                {brand.title}
              </Toggle>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </div>
  );
};
