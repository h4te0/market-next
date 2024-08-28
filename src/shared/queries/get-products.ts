'use server';
import { revalidatePath } from 'next/cache';
import { prisma } from '../api/prisma-client';

interface Props {
  slug: string | undefined;
  take: number;
  skip: number;
}

export const getProducts = async ({ slug, take = 8, skip = 0 }: Props) => {
  const res = await prisma.product.findMany({
    take,
    skip,
    orderBy: { title: 'asc' },
    where: {
      categories: {
        some: { slug: slug },
      },
    },
  });

  const allProducts = await prisma.product.findMany({
    where: {
      categories: {
        some: { slug: slug },
      },
    },
  });

  const total = allProducts.length;

  revalidatePath('/');

  return {
    data: res,
    total: total,
    metadata: {
      hasNextPage: skip + take < total,
      hasPrevPage: skip > 0,
      totalPages: Math.ceil(total / take),
    },
  };
};
