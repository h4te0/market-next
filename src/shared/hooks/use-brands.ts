import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Brand } from '@prisma/client';

export const useBrands = (slug: string | undefined) => {
  return useQuery({
    queryKey: ['brands'],
    queryFn: () => axios.get<Brand[]>('/api/brands', { params: { slug: slug } }),
    select: ({ data }) => data,
  });
};
