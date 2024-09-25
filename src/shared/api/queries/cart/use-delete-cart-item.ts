import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteCartItem = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteCartItem, isPending } = useMutation({
    mutationKey: ['delete cart item'],
    mutationFn: (id: number) => axios.delete(`/api/cart/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  return { deleteCartItem, isPending };
};

export const useDeleteManyCartItems = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteCartItems, isPending } = useMutation({
    mutationKey: ['delete cart items'],
    mutationFn: (items: number[]) => axios.delete(`/api/cart`, { data: { items } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  return { deleteCartItems, isPending };
};
