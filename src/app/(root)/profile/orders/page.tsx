import { MyOrders } from '@/shared/components';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Мои заказы',
};

const ProfileOrdersPage = () => {
  return <MyOrders />;
};

export default ProfileOrdersPage;
