import { NextResponse } from 'next/server';
import { prisma } from '../../../../prisma/prisma-client';

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
