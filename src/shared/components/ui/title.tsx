import clsx from 'clsx';
import React from 'react';

type TitleSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

interface Props {
  size?: TitleSize;
  className?: string;
  children?: string;
}

export const Title: React.FC<Props> = ({ size = 'sm', className, children }) => {
  const mapTagBySize = {
    xs: 'h5',
    sm: 'h4',
    md: 'h3',
    lg: 'h2',
    xl: 'h1',
    '2xl': 'h1',
  } as const;

  const mapClassNameBySize = {
    xs: 'text-[16px] font-bold',
    sm: 'text-[22px] font-bold',
    md: 'text-[26px] font-bold',
    lg: 'text-[32px] font-bold',
    xl: 'text-[40px] font-bold',
    '2xl': 'text-[48px] font-bold',
  } as const;

  return React.createElement(
    mapTagBySize[size],
    {
      className: clsx(mapClassNameBySize[size], className),
    },
    children,
  );
};
