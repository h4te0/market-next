import { z } from 'zod';

export const passwordSchema = z
  .string({ message: 'Поле не должно быть пустым' })
  .min(1, { message: 'Пароль должен содержать не менее 8 символов' });
