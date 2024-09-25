import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

import type { Cart, CartItem, Product } from '@prisma/client';

export type CartItemsWithProducts = CartItem & {
  product: Product;
};

export type CartWithItems = Cart & {
  items: CartItemsWithProducts[];
  quantity: number;
};

export const useCart = () => {
  return useQuery({
    queryKey: ['cart'],
    queryFn: () => axios.get<CartWithItems>('/api/cart'),
    select: ({ data }) => data,
  });
};
