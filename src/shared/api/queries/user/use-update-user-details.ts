import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next-nprogress-bar';
import toast from 'react-hot-toast';

import { updateUserDetailsAction } from '@/app/actions';

import type { TFormProfileValues } from '@/shared/consts';

export const useUpdateUserDetails = () => {
  const router = useRouter();
  const { mutate: updateUser, isPending } = useMutation({
    mutationKey: ['update user details'],
    mutationFn: (data: TFormProfileValues) => updateUserDetailsAction(data),
    onSuccess: () => {
      toast.success('Персональные данные обновлены');
      router.refresh();
    },
    onError: (error) => {
      toast.error('Ошибка обновления персональных данных');
      console.error(error);
    },
  });

  return { updateUser, isPending };
};
