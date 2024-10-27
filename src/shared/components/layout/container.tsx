import { PropsWithChildren, RefObject } from 'react';

import { cn } from '@/lib/utils';

interface Props extends PropsWithChildren {
  classname?: string;
  ref?: RefObject<HTMLDivElement>;
}

export const Container = ({ classname, ref, children }: Props) => {
  return (
    <div
      ref={ref}
      className={cn(
        'mx-auto max-w-[1232px] xl:max-w-[calc(100vw-32px)] phone:px-[12px]',
        classname,
      )}>
      {children}
    </div>
  );
};
