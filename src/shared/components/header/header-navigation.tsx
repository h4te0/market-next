'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next-nprogress-bar';
import Link from 'next/link';
import toast from 'react-hot-toast';

import { useCart, useWishlist } from '@/shared/api/queries';

import { AuthModal, HeaderProfileButton } from '@/shared/components';

import { headerNavigation } from '@/shared/consts/navigation';

import type { User } from '@prisma/client';

interface Props {
  user: User | null;
}

export const HeaderNavigation = ({ user }: Props) => {
  const { data: cart } = useCart();
  const { data: wishlist } = useWishlist();

  const [openAuthModal, setOpenAuthModal] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    let toastMessage = '';

    if (searchParams.has('verified')) {
      toastMessage =
        'Почта успешно подтверждена! Теперь вы можете авторизоваться под подтверждённой почтой';
    }
    if (searchParams.has('paid')) {
      toastMessage =
        'Заказ оформлен! Подробнее в письме отправленном на почту или в разделе "Мои заказы"';
    }

    if (toastMessage) {
      setTimeout(() => {
        router.replace('/');
        toast.success(toastMessage, { duration: 15000 });
      }, 300);
    }
  }, []);

  return (
    <nav className="flex gap-4">
      {headerNavigation.map(
        (item) =>
          (!item.isAuthRequired || !!item.isAuthRequired === !!user) && (
            <Link
              key={item.id}
              href={item.path}
              className="flex flex-col items-center hover:text-primary duration-300 ease-in-out">
              <div className="relative">
                {item.icon}
                {item.isCart && cart?.quantity && (
                  <div className="absolute -right-2 -top-2 bg-secondary rounded-full text-white font-bold w-5 h-5 text-xs flex justify-center items-center">
                    {cart?.quantity}
                  </div>
                )}
                {item.isWishlist && wishlist?.items.length ? (
                  <div className="absolute -right-2 -top-2 bg-secondary rounded-full text-white font-bold w-5 h-5 text-xs flex justify-center items-center">
                    {wishlist?.items.length}
                  </div>
                ) : (
                  <></>
                )}
              </div>
              <span className="whitespace-nowrap">{item.title}</span>
            </Link>
          ),
      )}
      <HeaderProfileButton user={user} onClickSignIn={() => setOpenAuthModal(true)} />
      <AuthModal isOpen={openAuthModal} onClose={() => setOpenAuthModal(false)} />
    </nav>
  );
};
