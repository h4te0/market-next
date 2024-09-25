import React from 'react';
import Link from 'next/link';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/shared/components';

interface Props {
  currentCategories: {
    id: number;
    title: string | undefined;
    slug: string | undefined;
  }[];
}

export const CatalogBreadcrumbs = async ({ currentCategories }: Props) => {
  return (
    <Breadcrumb className="mb-4">
      <BreadcrumbList>
        <BreadcrumbItem>
          <Link href="/">Главная</Link>
        </BreadcrumbItem>
        {currentCategories.map(
          (category, i) =>
            category.title && (
              <React.Fragment key={category.id}>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  {currentCategories.at(-1)?.title !== category.title ? (
                    <Link href={currentCategories[i].slug + '/'}>{category.title}</Link>
                  ) : (
                    category.title
                  )}
                </BreadcrumbItem>
              </React.Fragment>
            ),
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
