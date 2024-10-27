import { CheckoutBlock, FormInput, PhoneInput } from '@/shared/components';

import { TFormCheckoutValues } from '@/shared/consts';

import type { Control, UseFormRegister } from 'react-hook-form';

interface Props {
  classname?: string;
  control: Control<TFormCheckoutValues>;
  register: UseFormRegister<TFormCheckoutValues>;
}

export const CheckoutPersonalForm = ({ classname, control, register }: Props) => {
  return (
    <CheckoutBlock title="2. Персональная данные" classname={classname}>
      <div className="flex flex-col gap-4">
        <FormInput control={control} name="fullName" label="Ваше имя" placeholder="Имя" />
        <FormInput control={control} name="email" label="Ваша почта" placeholder="Email" />
        <FormInput control={control} name="phone" label="Номер телефона">
          <PhoneInput
            register={register('phone', { required: true })}
            defaultValue={control._defaultValues.phone || ''}
            placeholder="Номер телефона"
          />
        </FormInput>
      </div>
    </CheckoutBlock>
  );
};
