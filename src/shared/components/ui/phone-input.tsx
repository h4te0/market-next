'use client';
import { useState } from 'react';
import { Input } from './input';

import { type UseFormRegisterReturn } from 'react-hook-form';

interface PhoneInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  register: UseFormRegisterReturn;
  defaultValue?: string;
}

export const PhoneInput = ({ register, defaultValue, ...props }: PhoneInputProps) => {
  const [phone, setPhone] = useState(defaultValue || '');
  const [isFocused, setIsFocused] = useState(false);

  const formatPhoneNumber = (input: string) => {
    let digits = input.replace(/\D/g, '');

    if (digits.startsWith('7')) {
      digits = digits.slice(1);
    }

    let formatted = '+7 ';
    if (digits.length > 0) formatted += digits.substring(0, 3);
    if (digits.length >= 4) formatted += ' ' + digits.substring(3, 6);
    if (digits.length >= 7) formatted += ' ' + digits.substring(6, 8);
    if (digits.length >= 9) formatted += ' ' + digits.substring(8, 10);

    return formatted;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setPhone(formatPhoneNumber(input));
    register.onChange(e);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    if (phone === '+7 ') {
      setPhone('');
    }
    setIsFocused(false);
  };
  return (
    <div className="flex flex-col space-y-2 w-full">
      <div className="relative w-full">
        <Input
          className="pr-4 py-2"
          type="text"
          value={isFocused || phone ? formatPhoneNumber(phone) : ''}
          onChange={handleInputChange}
          maxLength={16}
          onFocus={handleFocus}
          onBlur={handleBlur}
          ref={register.ref}
          name={register.name}
          {...props}
        />
      </div>
    </div>
  );
};
