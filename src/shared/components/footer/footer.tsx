import Link from 'next/link';

import { paths } from '@/shared/consts';

import { Container, Title } from '@/shared/components';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-white mt-10 py-8">
      <Container classname="grid grid-cols-3">
        <div className="flex flex-col gap-4">
          <Link className="font-extrabold text-5xl" href={paths.home}>
            Market
          </Link>
          <div className="flex gap-4">
            <a
              href="#"
              className="flex justify-center items-center border p-1 border-gray-500 rounded-full">
              <Instagram width={18} height={18} color="#6b7280" />
            </a>
            <a
              href="#"
              className="flex justify-center items-center border p-1 border-gray-500 rounded-full">
              <Twitter width={18} height={18} color="#6b7280" />
            </a>
            <a
              href="#"
              className="flex justify-center items-center border p-1 border-gray-500 rounded-full">
              <Facebook width={18} height={18} color="#6b7280" />
            </a>
          </div>
        </div>
        <div>
          <Title>Навигация</Title>
          <ul className="flex flex-col gap-4 mt-2">
            <li className="text-sm text-gray-500">
              <Link href={paths.profile.overview}>Профиль</Link>
            </li>
            <li className="text-sm text-gray-500">
              <Link href={paths.cart}>Корзина</Link>
            </li>
            <li className="text-sm text-gray-500">
              <Link href={paths.profile.wishlist}>Избранное</Link>
            </li>
            <li className="text-sm text-gray-500">
              <Link href={paths.profile.orders}>Мои заказы</Link>{' '}
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
};
