import { cn } from '@/lib';

import { Title } from '@/shared/components';

import type { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  classname?: string;
  contentClassname?: string;
  title?: string;
  endAdornment?: React.ReactNode;
}

export const CheckoutBlock = ({
  title,
  classname,
  contentClassname,
  endAdornment,
  children,
}: Props) => {
  return (
    <div className={cn('py-8 px-10 bg-white rounded-2xl', classname)}>
      {title && (
        <div className="flex justify-between items-center mb-8">
          <Title>{title}</Title>
          {endAdornment}
        </div>
      )}
      <div className={cn(contentClassname)}>{children}</div>
    </div>
  );
};
