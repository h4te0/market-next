import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

import type { IProductWithStuff, IWishlistWithItems } from '@/shared/api/fetchers/catalog';

export const useWishlist = () => {
  return useQuery({
    queryKey: ['wishlist'],
    queryFn: () =>
      axios.get<IWishlistWithItems[] & { items: IProductWithStuff[] }>('/api/wishlist'),
    select: ({ data }) => data,
  });
};
