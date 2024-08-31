import React from 'react';
import Link from 'next/link';

import { getCurrentCategories } from '@/shared/queries/get-current-categories';
import { getProducts } from '@/shared/queries/get-products';
import { getBrandsByCategory } from '@/shared/queries/get-brands';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
  Container,
} from '@/shared/components';

import { capitalizeWord } from '@/shared/helpers/capitalize-word';
import { Catalog } from '@/shared/components/catalog';

interface Props {
  params: { slug: string[] };
  searchParams: { [key: string]: string | undefined };
}

export const generateMetadata = async ({ params: { slug } }: Props) => {
  const currentCategories = await getCurrentCategories(slug.at(-1));
  return {
    title: currentCategories.at(-1)?.title,
  };
};

const CatalogPage = async ({ params: { slug }, searchParams }: Props) => {
  const currentCategorySlug = slug.at(-1);
  const currentCategories = await getCurrentCategories(currentCategorySlug);
  const currentBrandsInCategory = await getBrandsByCategory(currentCategorySlug);
  const currentBrandsTitles = searchParams.brands
    ?.split(',')
    .map((w) => capitalizeWord(w))
    .toString()
    .replaceAll(',', ', ');

  const pageNumber = Number(searchParams.page) > 0 ? Number(searchParams.page) : 1;

  const { products, total, pagination, filters } = await getProducts({
    slug: currentCategorySlug,
    take: 8,
    skip: (pageNumber - 1) * 8,
    searchParams,
  });
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

      <Catalog
        productsListProps={{
          products,
          total,
          catalogTitle: currentCategories.at(-1)?.title + ' ' + (currentBrandsTitles || ''),
        }}
        filterProps={{ ...filters, brands: currentBrandsInCategory }}
        paginationProps={pagination}
      />
    </Container>
  );
};

export default CatalogPage;
