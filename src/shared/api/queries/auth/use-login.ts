import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next-nprogress-bar';
import { signIn } from 'next-auth/react';

import type { TFormLoginValues } from '@/shared/consts';

export const useLogin = (onClose?: () => void) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate: login, isPending } = useMutation({
    mutationKey: ['login'],
    mutationFn: async (data: TFormLoginValues) => {
      await signIn('credentials', {
        ...data,
        redirect: false,
      }).then((res) => {
        if (!res?.ok) {
          throw Error();
        }
      });
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      router.refresh();
      toast.success('Добро пожаловать!');
      onClose?.();
    },
    onError: (error) => {
      console.error('Error [LOGIN]', error);
      toast.error('Неправильный логин или пароль');
    },
  });

  return { login, isPending };
};
