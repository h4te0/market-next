import { prisma } from '@/shared/api/prisma-client';

export const getCurrentCategories = async (slug: string | undefined) => {
  const res = await prisma.category.findFirst({
    where: { slug: slug },
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

  const currentCategories = [
    {
      id: 1,
      title: res?.parent?.parent?.title,
      slug: res?.parent?.parent?.slug,
    },
    {
      id: 2,
      title: res?.parent?.title,
      slug: res?.parent?.slug,
    },
    {
      id: 3,
      title: res?.title,
      slug: res?.slug,
    },
  ];

  return currentCategories;
};
