'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Heart, Scale, Search, ShoppingBasket, TextSearch, User, X } from 'lucide-react';

import { cn } from '@/lib/utils';

import { CategoriesMenu, Container, Button, Input } from '@/shared/components';

import { paths } from '@/shared/consts/paths';

interface Props {
  className?: string;
}

export const Header = ({ className }: Props) => {
  const isLoggedIn = false;
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  return (
    <header className={cn('bg-white py-3  box-border sticky top-0 z-50 mb-4', className)}>
      <Container classname="flex items-center">
        <Link className="font-extrabold text-2xl mr-5" href={paths.home}>
          Market
        </Link>
        {isCatalogOpen ? (
          <Button
            variant="destructive"
            className="mr-5"
            onClick={() => setIsCatalogOpen(!isCatalogOpen)}>
            <X />
            <p className="ml-3 font-bold">Каталог</p>
          </Button>
        ) : (
          <Button className="mr-5" onClick={() => setIsCatalogOpen(!isCatalogOpen)}>
            <TextSearch />
            <p className="ml-3 font-bold">Каталог</p>
          </Button>
        )}
        <div className="relative flex items-center w-full mr-5">
          <Input placeholder="Поиск" className="py-3 px-4 text-base bg-background" />
          <Search width={20} color="#8E979F" className="absolute right-3 cursor-pointer" />
        </div>
        <nav className="flex gap-4">
          <Link
            href={paths.wishlist}
            className="flex flex-col items-center hover:text-primary duration-300 ease-in-out">
            <Heart />
            <span>Избранное</span>
          </Link>
          <Link
            href={paths.compare}
            className="flex flex-col items-center hover:text-primary duration-200 ease-in-out">
            <Scale />
            <span>Сравнить</span>
          </Link>
          <Link
            href={paths.cart}
            className="flex flex-col items-center hover:text-primary duration-200 ease-in-out">
            <ShoppingBasket />
            <span>Корзина</span>
          </Link>
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
          {isCatalogOpen && <CategoriesMenu />}
        </nav>
      </Container>
    </header>
  );
};
