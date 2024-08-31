import { PropsWithChildren } from 'react';

import { cn } from '@/lib/utils';

interface Props extends PropsWithChildren {
  classname?: string;
}

export const Container = ({ classname, children }: Props) => {
  return (
    <div
      className={cn(
        'mx-auto max-w-[1232px] xl:max-w-[calc(100vw-32px)] phone:px-[12px]',
        classname,
      )}>
      {children}
    </div>
  );
};
