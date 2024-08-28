import { NextResponse } from 'next/server';
import { prisma } from '@/shared/api/prisma-client';

export async function GET() {
  const categories = await prisma.category.findMany({
    where: { type: 'RootCategory' },
    include: {
      children: {
        include: {
          children: {
            include: {
              brand: true,
            },
          },
        },
      },
    },
  });
  return NextResponse.json(categories);
}
