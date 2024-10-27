import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

import type { Order } from '@prisma/client';

export const useOrders = () => {
  return useQuery({
    queryKey: ['orders'],
    queryFn: () => axios.get<Order[]>('/api/orders'),
    select: ({ data }) => data,
  });
};
