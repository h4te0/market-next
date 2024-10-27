import { z } from 'zod';
import validator from 'validator';

import { passwordSchema } from './password-schema';

export const formProfileSchema = z.object({
  email: z
    .string({ message: 'Введите свою почту' })
    .email({ message: 'Введите корректную почту' })
    .max(256, { message: 'Максимальная длинна 256 символов' }),
  fullName: z
    .string()
    .min(2, { message: 'Введите ваше имя' })
    .max(20, { message: 'Максимальная длинна поля 20 символов' }),
  phone: z
    .string({ message: 'Введите корректный номер телефона' })
    .refine((value) => validator.isMobilePhone(value.replaceAll(' ', ''), 'kk-KZ'), {
      message: 'Введите корректный номер телефона',
    })
    .nullable(),
  address: z.string().min(5, { message: 'Введите корректный адрес' }).nullable(),
});

export const confirmPasswordSchema = z.object({
  newPassword: passwordSchema,
  confirmPassword: passwordSchema,
});

export const createPasswordSchema = confirmPasswordSchema.refine(
  (data) => data.newPassword === data.confirmPassword,
  {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  },
);

export const changePasswordSchema = confirmPasswordSchema
  .extend({
    oldPassword: z
      .string({ message: 'Поле не должно быть пустым' })
      .min(1, { message: 'Поле не должно быть пустым' }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  });

export const formPasswordEditSchema = (isChange: boolean) => {
  return isChange ? changePasswordSchema : createPasswordSchema;
};

export type TFormProfileValues = z.infer<typeof formProfileSchema>;
export type TFormPasswordChangeValues = z.infer<typeof changePasswordSchema>;
