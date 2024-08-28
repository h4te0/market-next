import React from 'react';
import Link from 'next/link';

import { getCurrentCategories } from '@/shared/queries/get-current-categories';
import { getProducts } from '@/shared/queries/get-products';
import { getBrandBySlug } from '@/shared/queries/get-brand';

import { Container } from '@/shared/components';
import { ProductsList } from '@/shared/components/catalog/products-list';
import { Filters } from '@/shared/components/catalog/filters';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/shared/components/ui';
import { ProductsPagination } from '@/shared/components/catalog/products-pagination';

interface Props {
  params: { slug: string[] };
  searchParams: { [key: string]: string | undefined };
}

export const generateMetadata = async ({ params: { slug }, searchParams }: Props) => {
  const currentCategories = await getCurrentCategories(slug.at(-1));
  const brand = await getBrandBySlug(searchParams?.brand);
  return {
    title: currentCategories.at(-1)?.title + ' ' + (searchParams.brand ? brand?.title : ''),
  };
};

const CatalogPage = async ({ params: { slug }, searchParams }: Props) => {
  const pageNumber = Number(searchParams.page) > 0 ? Number(searchParams.page) : 1;

  const take = 8;
  const skip = (pageNumber - 1) * take;

  const currentCategory = slug.at(-1);
  const currentCategories = await getCurrentCategories(currentCategory);
  const {
    data: products,
    total,
    metadata,
  } = await getProducts({ slug: currentCategory, take, skip });
  const brand = await getBrandBySlug(searchParams?.brand);
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
        <div className="col-span-9">
          <ProductsList
            catalogTitle={
              currentCategories.at(-1)?.title + ' ' + (searchParams.brand ? brand?.title : '')
            }
            total={total}
            products={products}
          />
          <ProductsPagination classname="my-4" {...searchParams} {...metadata} />
        </div>
      </div>
    </Container>
  );
};

export default CatalogPage;
