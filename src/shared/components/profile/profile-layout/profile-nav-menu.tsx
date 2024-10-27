'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight } from 'lucide-react';

import { cn } from '@/lib';

import { LogoutConfirm } from '@/shared/components';

import { profileNavigation } from '@/shared/consts';

import type { Session } from 'next-auth';

interface Props {
  session: Session | null;
}

export const ProfileNavMenu = ({ session }: Props) => {
  const [logoutOpen, setLogoutOpen] = useState<boolean>(false);

  const pathname = usePathname();

  return (
    <nav>
      <ul>
        {profileNavigation.map((item) => (
          <li
            key={item.id}
            className={cn(
              item.path === pathname ? 'text-primary' : '',
              'bg-white px-4 flex first:rounded-t-2xl [&_a]:last:border-none',
            )}>
            <Link
              className="flex items-center text-sm leading-5 border-b py-4 w-full"
              href={item.path}>
              {item.icon}
              <span>{item.title}</span>
              <div className="w-6 h-6 flex items-center justify-center ml-auto">
                <ChevronRight width={20} height={20} />
              </div>
            </Link>
          </li>
        ))}
      </ul>
      {session ? (
        <li className="bg-white px-4 flex mt-2 rounded-b-2xl">
          <button
            onClick={() => setLogoutOpen(true)}
            className="flex items-center text-sm leading-5 py-4 w-full text-destructive">
            Выйти
          </button>
        </li>
      ) : (
        <li className="bg-white px-4 flex mt-2 rounded-b-2xl">
          <p className="flex items-center text-sm leading-5 py-4 w-full text-secondary">
            Авторизируйтесь
          </p>
        </li>
      )}
      <LogoutConfirm isOpen={logoutOpen} onClose={() => setLogoutOpen(false)} />
    </nav>
  );
};
