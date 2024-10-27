import { z } from 'zod';

import { formProfileSchema } from './profile-form-schema';
import validator from 'validator';

export const checkoutAddressSchema = z.object({
  address: z.string().min(5, { message: 'Введите корректный адрес' }),
  comment: z
    .string()
    .max(200, { message: 'Количество символов не должно превышать 200 символов' })
    .optional(),
});

export const formCheckoutSchema = formProfileSchema
  .extend({
    phone: z
      .string({ message: 'Введите корректный номер телефона' })
      .refine((value) => validator.isMobilePhone(value.replaceAll(' ', ''), 'kk-KZ'), {
        message: 'Введите корректный номер телефона',
      }),
  })
  .merge(checkoutAddressSchema);

export type TFormCheckoutValues = z.infer<typeof formCheckoutSchema>;
