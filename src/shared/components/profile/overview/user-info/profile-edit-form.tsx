'use client';

import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useUpdateUserDetails } from '@/shared/api/queries';

import {
  Button,
  Form,
  FormInput,
  Title,
  PhoneInput,
  PasswordEditForm,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  AddressInput,
  FormMessage,
} from '@/shared/components';

import { formProfileSchema, TFormProfileValues } from '@/shared/consts';

import type { User } from '@prisma/client';

interface Props {
  data: User | null;
  onEditClose: () => void;
}

export const ProfileEditForm = ({ data, onEditClose }: Props) => {
  const form = useForm<TFormProfileValues>({
    resolver: zodResolver(formProfileSchema),
    defaultValues: {
      email: data?.email,
      fullName: data?.fullName,
      phone: data?.phone,
      address: data?.address,
    },
  });
  const { isDirty, isSubmitting } = form.formState;

  const { updateUser } = useUpdateUserDetails();

  const [isPasswordEditOpen, setIsPasswordEditOpen] = useState(false);
  const [type, setType] = useState<'change' | 'create'>('change');

  const onSubmit = (data: TFormProfileValues) => {
    console.log(data);
    updateUser(data);
    form.reset(data);
  };

  return (
    <div className="bg-white p-6 rounded-lg">
      <button className="text-secondary flex gap-2 mb-2" onClick={onEditClose}>
        <ArrowLeft /> Назад
      </button>
      <div className="flex justify-between gap-12">
        <Form {...form}>
          <form className="flex flex-col gap-5 w-full" onSubmit={form.handleSubmit(onSubmit)}>
            <Title>Персональные данные</Title>
            <FormInput
              control={form.control}
              name="email"
              label="Email"
              placeholder="Email"
              disabled
            />
            <FormInput
              control={form.control}
              name="fullName"
              label="Имя"
              placeholder="Имя"
              maxLength={20}
            />
            <FormInput control={form.control} name="phone" label="Номер телефона">
              <PhoneInput
                register={form.register('phone', { required: true })}
                defaultValue={data?.phone || ''}
                placeholder={data?.phone ? 'Номер телефона' : 'Не указано'}
              />
            </FormInput>
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ваш адрес</FormLabel>
                  <div className="flex relative">
                    <FormControl>
                      <AddressInput
                        onChange={field.onChange}
                        placeholder="Введите ваш адрес"
                        defaultValue={data?.address || ''}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={!isDirty || isSubmitting} className="text-base mt-10" type="submit">
              Сохранить
            </Button>
          </form>
        </Form>
        <div className="w-full">
          <Title>Пароль</Title>
          {data?.password ? (
            <p
              className="text-secondary cursor-pointer"
              onClick={() => {
                setIsPasswordEditOpen(true);
                setType('change');
              }}>
              Изменить пароль
            </p>
          ) : (
            <p
              className="text-secondary cursor-pointer"
              onClick={() => {
                setIsPasswordEditOpen(true);
                setType('create');
              }}>
              Создать пароль
            </p>
          )}
        </div>
        <PasswordEditForm
          isOpen={isPasswordEditOpen}
          onClose={() => setIsPasswordEditOpen(false)}
          type={type}
        />
      </div>
    </div>
  );
};
