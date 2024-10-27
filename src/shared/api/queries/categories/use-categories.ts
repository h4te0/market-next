import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

import type { Category } from '@prisma/client';

export interface ICategoriesWithChildren extends Category {
  children: [
    ICategoriesWithChildren & {
      brand: {
        id: number;
        slug: string;
        title: string;
      };
    },
  ];
}

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => axios.get<ICategoriesWithChildren[]>('/api/categories'),
    select: ({ data }) => data,
  });
};
