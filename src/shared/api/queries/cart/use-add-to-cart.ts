import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next-nprogress-bar';

export const useAddToCart = (setAdded: (v: boolean) => void) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutate: addToCart, isPending } = useMutation({
    mutationKey: ['add to cart'],
    mutationFn: (id: number) => axios.post('/api/cart', { productId: id }),
    onSuccess: () => {
      toast.success('Товар добавлен в корзину!');
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      setAdded(true);
      router.refresh();
    },
  });

  return { addToCart, isPending };
};
