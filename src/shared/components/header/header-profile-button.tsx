import Link from 'next/link';
import { LucideUser } from 'lucide-react';

import { paths } from '@/shared/consts/paths';

import type { User } from '@prisma/client';

interface Props {
  user: User | null;
  onClickSignIn?: () => void;
}

export const HeaderProfileButton = ({ user, onClickSignIn }: Props) => {
  return user ? (
    <Link
      href={paths.profile.overview}
      className="flex flex-col items-center hover:text-primary duration-200 ease-in-out">
      <LucideUser />
      <span className="whitespace-nowrap">{user.fullName || 'Профиль'}</span>
    </Link>
  ) : (
    <div
      className="flex flex-col items-center hover:text-primary duration-200 ease-in-out cursor-pointer"
      onClick={onClickSignIn}>
      <LucideUser />
      <span>Вход</span>
    </div>
  );
};
