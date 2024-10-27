import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import crypto from 'crypto';

import { prisma } from '@/shared/api/prisma-client';

import { findOrCreateCart } from '@/shared/helpers/find-or-create-cart';
import { updateCartTotalAmount } from '@/shared/helpers/update-cart-total-amount';
import { getCurrentUser } from '@/shared/helpers/get-current-user';
import { CartItem } from '@prisma/client';

export async function GET(req: NextRequest) {
  try {
    const cartToken = req.cookies.get('cartToken')?.value;
    const wishlistToken = req.cookies.get('wishlistToken')?.value;

    if (!cartToken) {
      return NextResponse.json({ totalAmount: 0, items: [] });
    }

    const currentUser = await getCurrentUser();

    const userCart = await prisma.cart.findFirst({
      where: {
        OR: [
          {
            userId: currentUser?.id,
          },
          {
            token: cartToken,
          },
        ],
      },
      include: {
        items: {
          orderBy: {
            id: 'asc',
          },
          include: {
            product: {
              include: {
                favoritedBy: {
                  where: {
                    token: wishlistToken,
                  },
                  include: { items: true },
                },
              },
            },
          },
        },
      },
    });
    const totalItems = await prisma.cartItem.aggregate({
      where: {
        cart: {
          token: cartToken,
        },
      },
      _sum: {
        quantity: true,
      },
    });

    return NextResponse.json({ ...userCart, ...totalItems._sum });
  } catch (error) {
    console.log('[CART_GET] Server error', error);
    return NextResponse.json({ message: 'Не удалось получить корзину' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    let cartToken = req.cookies.get('cartToken')?.value;

    const session = await getServerSession();

    const user =
      session &&
      (await prisma.user.findFirst({
        where: {
          email: session?.user?.email || undefined,
        },
        include: { cart: true },
      }));

    if (user?.cart?.token) {
      cartToken = user.cart?.token;
      req.cookies.set('cartToken', user.cart?.token);
    }

    if (!cartToken) {
      cartToken = crypto.randomUUID();
    }

    const userCart = await findOrCreateCart(cartToken);

    const data = (await req.json()) as CartItem;

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

    const updatedUserCart = await updateCartTotalAmount(cartToken);

    const res = NextResponse.json(updatedUserCart);
    res.cookies.set('cartToken', cartToken, { maxAge: 60 * 60 * 24 * 30 });

    return res;
  } catch (error) {
    console.log('[CART_POST] Server error', error);
    return NextResponse.json({ message: 'Не удалось создать корзину' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const cartToken = req.cookies.get('cartToken')?.value;

    if (!cartToken) {
      return NextResponse.json({ error: 'Токен не найден' });
    }

    const data = await req.json();

    await prisma.cartItem.deleteMany({
      where: {
        id: {
          in: data.items,
        },
      },
    });

    const updatedUserCart = await updateCartTotalAmount(cartToken);

    return NextResponse.json(updatedUserCart);
  } catch (error) {
    console.log('[DELETE] Server error', error);
    return NextResponse.json({ message: 'Не удалось удалить товар' }, { status: 500 });
  }
}
