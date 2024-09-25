'use client';

import { useCart } from '@/shared/api/queries/cart';
import { paths } from '@/shared/consts/paths';
import { Heart, Scale, ShoppingBasket, User } from 'lucide-react';
import Link from 'next/link';

interface Props {}

const navigation = [
  {
    title: 'Избранное',
    icon: <Heart />,
    path: paths.wishlist,
  },
  {
    title: 'Сравнить',
    icon: <Scale />,
    path: paths.compare,
  },
  {
    title: 'Корзина',
    icon: <ShoppingBasket />,
    path: paths.cart,
    isCart: true,
  },
];

export const HeaderNavigation = ({}: Props) => {
  const { data: cart } = useCart();
  const isLoggedIn = true;
  return (
    <nav className="flex gap-4">
      {navigation.map((item) => (
        <Link
          href={item.path}
          className="flex flex-col items-center hover:text-primary duration-300 ease-in-out">
          <div className="relative">
            {item.icon}
            {item.isCart && cart?.quantity && (
              <div className="absolute -right-2 -top-2 bg-secondary rounded-full text-white font-bold w-5 h-5 text-xs flex justify-center items-center">
                {cart?.quantity}
              </div>
            )}
          </div>
          <span>{item.title}</span>
        </Link>
      ))}

      {isLoggedIn ? (
        <Link
          href={paths.profile}
          className="flex flex-col items-center hover:text-primary duration-200 ease-in-out">
          <User />
          <span>Профиль</span>
        </Link>
      ) : (
        <div className="flex flex-col items-center hover:text-primary duration-200 ease-in-out cursor-pointer">
          <User />
          <span>Вход</span>
        </div>
      )}
    </nav>
  );
};
