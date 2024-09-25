import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

import type { Category } from '@prisma/client';

export type CategoriesWithChildren = Category & {
  children: [
    CategoriesWithChildren & {
      brand: {
        id: number;
        slug: string;
        title: string;
      };
    },
  ];
};

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => axios.get<CategoriesWithChildren[]>('/api/categories'),
    select: ({ data }) => data,
  });
};
