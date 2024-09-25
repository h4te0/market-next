interface Categories {
  id: number;
  title: string | undefined;
  slug: string | undefined;
}
[];

export const formatCatalogTitle = (categories: Categories[], brands: string) => {
  return categories.at(-1)?.title + ' ' + (brands || '');
};
