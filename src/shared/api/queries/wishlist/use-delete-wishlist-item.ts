import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useRouter } from 'next-nprogress-bar';

export const useDeleteWishlistItem = (setAdded: (v: boolean) => void) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate: deleteWishlistItem, isPending } = useMutation({
    mutationKey: ['delete wishlist item'],
    mutationFn: (id: number) => axios.delete(`/api/wishlist/${id}`),
    onSuccess: () => {
      toast.error('Товар удалён из избранных!');
      queryClient.invalidateQueries({
        predicate: (query) =>
          query.queryKey.every((key) => ['wishlist', 'cart'].includes(String(key))),
      });
      setAdded(false);
      router.refresh();
    },
  });

  return { deleteWishlistItem, isPending };
};
