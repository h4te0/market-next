import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next-nprogress-bar';
import toast from 'react-hot-toast';

import { updateUserPasswordAction } from '@/app/actions';

import type { TFormPasswordChangeValues } from '@/shared/consts';
import { UseFormReset } from 'react-hook-form';

export const useUpdateUserPassword = (
  onClose: () => void,
  reset: UseFormReset<TFormPasswordChangeValues>,
) => {
  const router = useRouter();
  const { mutate: updatePassword, isPending } = useMutation({
    mutationKey: ['update user password'],
    mutationFn: (data: TFormPasswordChangeValues) => updateUserPasswordAction(data),
    onSuccess: () => {
      toast.success('Пароль обновлён');
      router.refresh();
      onClose();
      reset();
    },
    onError: (error) => {
      toast.error(error.message);
      console.error(error);
    },
  });

  return { updatePassword, isPending };
};
