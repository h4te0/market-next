import { prisma } from '@/shared/api/prisma-client';
import { getCurrentUser } from '@/shared/helpers/get-current-user';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json({ error: 'Вы не авторизованы' });
    }

    const orders = await prisma.order.findMany({
      where: {
        userId: currentUser.id,
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.log('[ORDERS_GET] Server error', error);
    return NextResponse.json({ message: 'Не удалось получить корзину' }, { status: 500 });
  }
}
