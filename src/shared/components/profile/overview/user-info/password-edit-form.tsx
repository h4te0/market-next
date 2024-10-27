'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useUpdateUserPassword } from '@/shared/api/queries';

import { Button, Dialog, DialogContent, DialogTitle, Form, FormInput } from '@/shared/components';

import { formPasswordEditSchema, TFormPasswordChangeValues } from '@/shared/consts';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  type: 'change' | 'create';
}

export const PasswordEditForm = ({ isOpen, onClose, type }: Props) => {
  const isChange = type === 'change';
  const form = useForm<TFormPasswordChangeValues>({
    resolver: zodResolver(formPasswordEditSchema(isChange)),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const { updatePassword } = useUpdateUserPassword(onClose, form.reset);

  const onSubmit = (data: TFormPasswordChangeValues) => {
    console.log(data);
    updatePassword(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[450px] bg-white p-10 rounded-3xl">
        <Form {...form}>
          <form className="flex flex-col gap-6 w-full" onSubmit={form.handleSubmit(onSubmit)}>
            <DialogTitle className="text-xl font-bold">
              {isChange ? 'Сменить пароль' : 'Создать пароль'}
            </DialogTitle>
            {isChange && (
              <FormInput
                control={form.control}
                isPassword={true}
                name="oldPassword"
                placeholder="Введите текущий пароль"
                label="Текущий пароль"
                type="password"
              />
            )}
            <FormInput
              control={form.control}
              isPassword={true}
              name="newPassword"
              placeholder="Введите новый пароль"
              label="Пароль"
              type="password"
            />
            <FormInput
              control={form.control}
              isPassword={true}
              name="confirmPassword"
              placeholder="Введите новый пароль ещё раз"
              label="Подтвердите пароль"
              type="password"
            />
            <Button disabled={form.formState.isSubmitting} className="text-base" type="submit">
              Сохранить
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
