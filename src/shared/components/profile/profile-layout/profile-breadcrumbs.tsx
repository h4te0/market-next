'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/shared/components';

import { paths, profileNavigation } from '@/shared/consts';

export const ProfileBreadcrumbs = () => {
  const pathname = usePathname();

  return (
    <Breadcrumb className="mb-4">
      <BreadcrumbList>
        <BreadcrumbItem>
          <Link href={paths.home}>Главная</Link>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <Link href={paths.profile.overview}>Личный кабинет</Link>
        </BreadcrumbItem>
        {profileNavigation.map(
          (item) =>
            item.path === pathname && (
              <React.Fragment key={item.id}>
                <BreadcrumbSeparator />
                <BreadcrumbItem>{item.title}</BreadcrumbItem>
              </React.Fragment>
            ),
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
