import { NextResponse } from 'next/server';
import { prisma } from '@/shared/api/prisma-client';

export async function GET() {
  try {
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
  } catch (error) {
    console.log('[CATEGORIES_GET] Server error', error);
    return NextResponse.json({ message: 'Не удалось получить категории' }, { status: 500 });
  }
}
