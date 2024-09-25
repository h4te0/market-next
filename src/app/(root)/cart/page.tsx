import type { Metadata } from 'next';

import { Cart, Container, Title } from '@/shared/components';

export const metadata: Metadata = {
  title: 'Корзина',
};

const CartPage = () => {
  return (
    <Container>
      <Title size="lg" className="mb-4">
        Корзина
      </Title>
      <Cart />
    </Container>
  );
};

export default CartPage;
