import { prisma } from '@/shared/api/prisma-client';

export const getBrandsByCategory = async (slug: string | undefined) => {
  return prisma.brand.findMany({
    orderBy: {
      id: 'asc',
    },
    where: {
      products: {
        some: {
          categories: {
            some: { slug: slug },
          },
        },
      },
    },
  });
};
