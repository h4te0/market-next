'use client';

import { useState } from 'react';

import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';

interface Props {
  onChange?: (value?: string) => void;
  defaultValue?: string;
  placeholder?: string;
}

export const AddressInput = ({ onChange, defaultValue, placeholder }: Props) => {
  const [address, setAddress] = useState<string | undefined>();
  return (
    <AddressSuggestions
      filterLocations={[{ country: 'Казахстан', city: 'Астана' }]}
      filterFromBound="street"
      filterToBound="house"
      filterRestrictValue={true}
      selectOnBlur={true}
      inputProps={{
        className:
          'flex w-full rounded-md border border-input outline-none px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-primary focus-visible:ring-ring focus-visible:ring-offset-2 hover:border-primary duration-200 ease-in-out disabled:cursor-not-allowed disabled:opacity-50',
        // defaultValue,
        placeholder,
        onChange: (e) => {
          onChange?.(address === e.currentTarget.value ? address : '');
        },
      }}
      defaultQuery={defaultValue}
      token="d6759a61c35d0c9ccbc6ae3a6e8f0d0c484c921a"
      containerClassName="w-full"
      onChange={(data) => {
        onChange?.(data?.data.house ? data?.value : '');
        setAddress(data?.value);
      }}
    />
  );
};
