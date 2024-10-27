import { prisma } from '@/shared/api/prisma-client';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id);

    const token = req.cookies.get('wishlistToken')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Wishlist token not found' });
    }

    const product = await prisma.product.findFirst({
      where: {
        id,
      },
    });

    if (!product) {
      return NextResponse.json({ error: 'Wishlist item not found' });
    }

    const updatedWishlist = await prisma.wishlist.update({
      where: {
        token,
      },
      data: {
        items: {
          disconnect: {
            id,
          },
        },
      },
    });
    return NextResponse.json(updatedWishlist);
  } catch (error) {
    console.log('[WISHLIST_DELETE] Server error', error);
    return NextResponse.json(
      { message: 'Не удалось удалить товар из избранного' },
      { status: 500 },
    );
  }
}
