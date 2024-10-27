import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

import type { Cart, CartItem } from '@prisma/client';
import { IProductWithStuff } from '../../fetchers/catalog';

export interface ICartItemsWithProducts extends CartItem {
  product: IProductWithStuff;
}

export interface ICartWithItems extends Cart {
  items: ICartItemsWithProducts[];
  quantity: number;
}

export const useCart = () => {
  return useQuery({
    queryKey: ['cart'],
    queryFn: () => axios.get<ICartWithItems>('/api/cart'),
    select: ({ data }) => data,
  });
};
