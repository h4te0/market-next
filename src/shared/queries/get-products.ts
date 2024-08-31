'use server';

import { prisma } from '../api/prisma-client';

interface Props {
  slug: string | undefined;
  take: number;
  skip: number;
  searchParams: { [key: string]: string | undefined };
}

export interface IFilterProps {
  minPrice: number;
  maxPrice: number;
}

export interface IPagination {
  hasNextPage: boolean;
  hasPrevPage: boolean;
  totalPages: number;
}

export const getProducts = async ({ slug, take = 8, skip = 0, searchParams }: Props) => {
  const {
    _min: { price: minPrice },
    _max: { price: maxPrice },
  } = await prisma.product.aggregate({
    where: {
      categories: {
        some: { slug: slug },
      },
    },
    _min: {
      price: true,
    },
    _max: {
      price: true,
    },
  });

  const filters = {
    minPrice: Number(searchParams.min) || minPrice || 0,
    maxPrice: Number(searchParams.max) || maxPrice || 1000000,
    brands: searchParams.brands?.split(','),
    isDelivery: Boolean(searchParams.delivery) || undefined,
  };

  const totalCount = await prisma.product.count({
    where: {
      categories: {
        some: { slug: slug },
      },
      price: {
        gte: filters.minPrice,
        lte: filters.maxPrice,
      },
      brand: {
        slug: filters.brands && {
          in: filters.brands,
        },
      },
      isDelivery: filters.isDelivery,
    },
  });

  const res = await prisma.product.findMany({
    take,
    skip,
    orderBy: { title: 'asc' },
    where: {
      categories: {
        some: { slug: slug },
      },
      price: {
        gte: filters.minPrice,
        lte: filters.maxPrice,
      },
      brand: {
        slug: filters.brands && {
          in: filters.brands,
        },
      },
      isDelivery: filters.isDelivery,
    },
  });

  return {
    products: res,
    total: totalCount,
    filters: {
      minPrice: minPrice || 0,
      maxPrice: maxPrice || 1000000,
    },
    pagination: {
      hasNextPage: skip + take < totalCount,
      hasPrevPage: skip > 0,
      totalPages: Math.ceil(totalCount / take),
    },
  };
};
