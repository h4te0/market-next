import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next-nprogress-bar';

import { registerUserAction } from '@/app/actions';

import type { TFormRegisterValues } from '@/shared/consts';

export const useRegister = (setIsVerify: (_: boolean) => void) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate: register, isPending } = useMutation({
    mutationKey: ['register'],
    mutationFn: async (data: TFormRegisterValues) =>
      await registerUserAction({
        email: data.email,
        fullName: data.fullName,
        password: data.password,
      }),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      router.refresh();
      toast.success('Код подтверждения отправлен на почту');
      setIsVerify(true);
    },
    onError: (error) => {
      console.error('Error [REGISTER]', error);
      toast.error('Аккаунт уже существует или почта не подтверждена. Проверьте электронную почту.');
    },
  });

  return { register, isPending };
};
