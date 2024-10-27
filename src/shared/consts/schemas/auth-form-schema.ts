import { z } from 'zod';

import { passwordSchema } from './password-schema';

export const formLoginSchema = z.object({
  email: z
    .string()
    .email({ message: 'Введите корректную почту' })
    .max(256, { message: 'Максимальная длина 256 символов' }),
  password: passwordSchema,
});

export const formRegisterSchema = formLoginSchema
  .merge(
    z.object({
      fullName: z
        .string()
        .min(2, { message: 'Введите ваше имя' })
        .max(20, { message: 'Максимальная длина поля 20 символов' }),
      confirmPassword: passwordSchema,
    }),
  )
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  });

export type TFormLoginValues = z.infer<typeof formLoginSchema>;
export type TFormRegisterValues = z.infer<typeof formRegisterSchema>;
