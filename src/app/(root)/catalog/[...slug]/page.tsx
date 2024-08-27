import React from 'react';
import Link from 'next/link';

import type { Metadata } from 'next';

import { prisma } from '../../../../../prisma/prisma-client';

import { Container } from '@/shared/components';
import { ProductsList } from '@/shared/components/catalog/products-list';
import { Filters } from '@/shared/components/catalog/filters';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/shared/components/ui';

export const metadata: Metadata = {
  title: '',
  description: '',
};

const CatalogPage = async ({
  params: { slug },
  searchParams,
}: {
  params: { slug: string[] };
  searchParams: { [key: string]: string | undefined };
}) => {
  const currentCategory = await prisma.category.findFirst({
    where: { slug: slug.at(-1) },
    select: {
      title: true,
      slug: true,
      parent: {
        select: {
          title: true,
          slug: true,
          parent: {
            select: {
              title: true,
              slug: true,
            },
          },
        },
      },
    },
  });

  const products = await prisma.product.findMany({
    where: {
      categories: {
        some: { slug: slug.at(-1) },
      },
    },
  });

  const brand = await prisma.brand.findFirst({
    where: {
      slug: searchParams?.brand,
    },
  });

  const currentCategories = [
    {
      id: 1,
      title: currentCategory?.parent?.parent?.title,
      slug: currentCategory?.parent?.parent?.slug,
    },
    {
      id: 2,
      title: currentCategory?.parent?.title,
      slug: currentCategory?.parent?.slug,
    },
    {
      id: 3,
      title: currentCategory?.title,
      slug: currentCategory?.slug,
    },
  ];
  console.log(currentCategories);
  return (
    <Container>
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
      <div className="grid grid-cols-12 gap-4">
        <Filters classname="col-span-3" />
        <ProductsList
          classname="col-span-9"
          catalogTitle={currentCategory?.title + ' ' + (searchParams.brand ? brand?.title : '')}
          products={products}
        />
      </div>
    </Container>
  );
};

export default CatalogPage;
