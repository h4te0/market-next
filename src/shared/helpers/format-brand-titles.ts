import { capitalizeWord } from '@/shared/helpers/capitalize-word';

export const formatBrandTitles = (brands: string | undefined) => {
  return brands
    ? brands
        .split(',')
        .map((w) => capitalizeWord(w))
        .join(', ')
    : '';
};
