'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useRegister } from '@/shared/api/queries';

import { Form, Button, Title, VerifyCodeInput, FormInput } from '@/shared/components';

import { formRegisterSchema, TFormRegisterValues } from '@/shared/consts';

interface Props {
  onClose?: () => void;
}

export const RegisterForm = ({ onClose }: Props) => {
  const [isVerify, setIsVerify] = useState(false);

  const form = useForm<TFormRegisterValues>({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      email: '',
      fullName: '',
      password: '',
      confirmPassword: '',
    },
  });

  const { register, isPending } = useRegister(setIsVerify);

  const onSubmit = async (data: TFormRegisterValues) => {
    register(data);
  };

  if (isVerify) return <VerifyCodeInput onClose={onClose} registerValues={form.getValues()} />;

  return (
    <Form {...form}>
      <form className="flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex justify-between items-center">
          <div className="mr-2">
            <Title>Регистрация</Title>
          </div>
        </div>
        <FormInput
          control={form.control}
          name="email"
          label="Ваша электронная почта"
          placeholder="Email"
        />
        <FormInput control={form.control} name="fullName" label="Ваше имя" placeholder="Имя" />
        <FormInput
          control={form.control}
          name="password"
          label="Ваш пароль"
          placeholder="Пароль"
          type="password"
        />
        <FormInput
          control={form.control}
          name="confirmPassword"
          label="Подтвердите пароль"
          placeholder="Подтвердите пароль"
          type="password"
        />

        <Button disabled={isPending} type="submit">
          Зарегистрироваться
        </Button>
      </form>
    </Form>
  );
};
