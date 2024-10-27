import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next-nprogress-bar';

export const useAddToWishlist = (setAdded: (v: boolean) => void) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutate: addToWishlist, isPending } = useMutation({
    mutationKey: ['add to wishlist'],
    mutationFn: (id: number) => axios.post('/api/wishlist', { id }),
    onSuccess: () => {
      toast.success('Товар добавлен в избранные!');
      queryClient.invalidateQueries({
        predicate: (query) =>
          query.queryKey.every((key) => ['wishlist', 'cart'].includes(String(key))),
      });
      setAdded(true);
      router.refresh();
    },
  });

  return { addToWishlist, isPending };
};
