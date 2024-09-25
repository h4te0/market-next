import {
  getBrandsByCategory,
  getCurrentCategories,
  getProducts,
} from '@/shared/api/fetchers/catalog';

import { Container, Catalog, CatalogBreadcrumbs } from '@/shared/components';

import { formatBrandTitles, formatCatalogTitle } from '@/shared/helpers';

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
  const currentBrandsInCategory = await getBrandsByCategory(currentCategorySlug);
  const currentCategories = await getCurrentCategories(currentCategorySlug);

  const pageNumber = Number(searchParams.page) || 1;

  const { products, total, pagination, filters } = await getProducts({
    slug: currentCategorySlug,
    take: 8,
    skip: (pageNumber - 1) * 8,
    searchParams,
  });

  const selectedBrandsTitles = formatBrandTitles(searchParams.brands);

  return (
    <Container>
      <CatalogBreadcrumbs currentCategories={currentCategories} />

      <Catalog
        productsListProps={{
          products,
          total,
          catalogTitle: formatCatalogTitle(currentCategories, selectedBrandsTitles),
        }}
        filterProps={{ ...filters, brands: currentBrandsInCategory }}
        paginationProps={pagination}
      />
    </Container>
  );
};

export default CatalogPage;
