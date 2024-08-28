import { prisma } from '../api/prisma-client';

export const getBrandBySlug = async (slug: string | undefined) => {
  return prisma.brand.findFirst({
    where: {
      slug: slug,
    },
  });
};
