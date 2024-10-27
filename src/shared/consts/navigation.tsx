import { Heart, Package, ShoppingBasket, User } from 'lucide-react';

import { paths } from './paths';

export const headerNavigation = [
  { id: 1, title: 'Избранное', icon: <Heart />, path: paths.profile.wishlist, isWishlist: true },
  {
    id: 2,
    title: 'Мои заказы',
    icon: <Package />,
    path: paths.profile.orders,
    isAuthRequired: true,
  },
  { id: 3, title: 'Корзина', icon: <ShoppingBasket />, path: paths.cart, isCart: true },
];

export const profileNavigation = [
  {
    id: 1,
    title: 'Профиль',
    icon: <User className="mr-2" width={24} height={24} />,
    path: paths.profile.overview,
  },
  {
    id: 2,
    title: 'Мои заказы',
    icon: <Package className="mr-2" width={24} height={24} />,
    path: paths.profile.orders,
  },
  {
    id: 3,
    title: 'Избранное',
    icon: <Heart className="mr-2" width={24} height={24} />,
    path: paths.profile.wishlist,
  },
  // {
  //   id: 4,
  //   title: 'Мои карты',
  //   icon: <CreditCard className="mr-2" width={24} height={24} />,
  //   path: paths.profile.cards,
  // },
  // {
  //   id: 5,
  //   title: 'Мои адреса',
  //   icon: <MapPin className="mr-2" width={24} height={24} />,
  //   path: paths.profile.addressBook,
  // },
];
