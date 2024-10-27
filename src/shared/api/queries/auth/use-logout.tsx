import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next-nprogress-bar';
import { signOut } from 'next-auth/react';

import { LogOut } from 'lucide-react';

export const useLogout = (onClose?: () => void) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate: logout, isPending } = useMutation({
    mutationKey: ['logout'],
    mutationFn: () =>
      signOut({
        redirect: false,
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      router.push('/');
      router.refresh();
      toast.success('Вы вышли', { icon: <LogOut color="#EF4444" /> });
      onClose?.();
    },
    onError: (error) => {
      console.error('Error [LOGOUT]', error);
      toast.error('Неудалось выйти из системы');
    },
  });

  return { logout, isPending };
};
