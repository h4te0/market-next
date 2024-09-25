import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUpdateItemCount = () => {
  const queryClient = useQueryClient();
  const { mutate: updateCount, isPending } = useMutation({
    mutationKey: ['update item count'],
    mutationFn: ({ id, quantity }: { id: number; quantity: number }) =>
      axios.patch(`/api/cart/${id}`, { quantity }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  return { updateCount, isPending };
};
