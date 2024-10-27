import { prisma } from '@/shared/api/prisma-client';

import { Container, MainSlider, ProductsBlock, Stories } from '@/shared/components';
import { getCurrentUser } from '@/shared/helpers/get-current-user';

import type { Metadata } from 'next';
import { cookies } from 'next/headers';

export const metadata: Metadata = {
  title: 'Главная',
  description: 'Next.js Market pet-project.',
};

const HomePage = async () => {
  const user = await getCurrentUser();
  const cartToken = cookies().get('cartToken')?.value;
  const wishlistToken = cookies().get('wishlistToken')?.value;
  const popularPhones = await prisma.product.findMany({
    take: 6,
    orderBy: {
      favoritedBy: {
        _count: 'desc',
      },
    },
    include: {
      cartItems: {
        where: {
          cart: { OR: [{ userId: user?.id }, { token: cartToken }] },
        },
      },
      favoritedBy: {
        where: { OR: [{ userId: user?.id }, { token: wishlistToken }] },
        include: {
          items: true,
        },
      },
    },
  });
  return (
    <div className="">
      <Container>
        <MainSlider />
        <Stories />
        <ProductsBlock title="Популярные смартфоны" products={popularPhones} />
      </Container>
    </div>
  );
};

export default HomePage;
