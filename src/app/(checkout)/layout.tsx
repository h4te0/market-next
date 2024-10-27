import { Topbar } from '@/shared/components';
import { Metadata } from 'next';
import type { PropsWithChildren } from 'react';

export const metadata: Metadata = {
  title: 'Оформление заказа',
};

const CheckoutLayout = ({ children }: PropsWithChildren<unknown>) => {
  return (
    <main>
      <Topbar hasLogo={true} className="flex items-center h-[72px] w-full" />
      {children}
    </main>
  );
};

export default CheckoutLayout;
