import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/shared/api/prisma-client';
import crypto from 'crypto';

import { findOrCreateCart } from '@/shared/helpers/find-or-create-cart';
import { updateCartTotalAmount } from '@/shared/helpers/update-cart-total-amount';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('cartToken')?.value;

    if (!token) {
      return NextResponse.json({ totalAmount: 0, items: [] });
    }

    const userCart = await prisma.cart.findFirst({
      where: {
        OR: [
          {
            token,
          },
        ],
      },
      include: {
        items: {
          orderBy: {
            id: 'asc',
          },
          include: {
            product: true,
          },
        },
      },
    });
    const totalItems = await prisma.cartItem.aggregate({
      where: {
        cart: {
          token,
        },
      },
      _sum: {
        quantity: true,
      },
    });
    console.log(totalItems);

    return NextResponse.json({ ...userCart, ...totalItems._sum });
  } catch (error) {
    console.log('[CART_GET] Server error', error);
    return NextResponse.json({ message: 'Не удалось получить корзину' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    let token = req.cookies.get('cartToken')?.value;

    if (!token) {
      token = crypto.randomUUID();
    }

    const userCart = await findOrCreateCart(token);

    const data = await req.json();

    const findCartItem = await prisma.cartItem.findFirst({
      where: {
        cartId: userCart.id,
        productId: data.productId,
      },
    });

    if (findCartItem) {
      await prisma.cartItem.update({
        where: {
          id: findCartItem.id,
        },
        data: {
          quantity: findCartItem.quantity + 1,
        },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: userCart.id,
          productId: data.productId,
          quantity: 1,
        },
      });
    }

    const updatedUserCart = await updateCartTotalAmount(token);

    const res = NextResponse.json(updatedUserCart);
    res.cookies.set('cartToken', token, { maxAge: 60 * 60 * 24 * 365 });

    return res;
  } catch (error) {
    console.log('[CART_POST] Server error', error);
    return NextResponse.json({ message: 'Не удалось создать корзину' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const token = req.cookies.get('cartToken')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Cart token not found' });
    }

    const data = await req.json();

    await prisma.cartItem.deleteMany({
      where: {
        id: {
          in: data.items,
        },
      },
    });

    const updatedUserCart = await updateCartTotalAmount(token);

    return NextResponse.json(updatedUserCart);
  } catch (error) {
    console.log('[DELETE] Server error', error);
    return NextResponse.json({ message: 'Не удалось удалить товар' }, { status: 500 });
  }
}
