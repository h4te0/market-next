import { Wishlist } from '@/shared/components';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Избранное',
};

const ProfileWishlistPage = () => {
  return <Wishlist />;
};

export default ProfileWishlistPage;
