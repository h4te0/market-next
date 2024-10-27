import axios from 'axios';
import toast from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next-nprogress-bar';
import { signIn } from 'next-auth/react';

import type { TFormRegisterValues } from '@/shared/consts';

export const useVerify = (registerValues: TFormRegisterValues, onClose?: () => void) => {
  const router = useRouter();
  const {
    mutate: sendCode,
    isPending,
    isError,
  } = useMutation({
    mutationKey: ['send verification code'],
    mutationFn: (code: string) => axios.post('/api/auth/verify', { code }),
    onSuccess: async () => {
      const resp = await signIn('credentials', {
        email: registerValues.email,
        password: registerValues.password,
        redirect: false,
      });

      if (!resp?.ok) throw Error();

      toast.success('Добро пожаловать!');
      router.refresh();
      onClose?.();
    },
    onError: () => {
      toast.error('Неправильный код');
    },
  });

  return { sendCode, isPending, isError };
};
