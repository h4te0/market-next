import { prisma } from '@/shared/api/prisma-client';
import { getCurrentUser } from '@/shared/helpers/get-current-user';
import { Product } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('wishlistToken')?.value;

    if (!token) {
      return NextResponse.json({ items: [] });
    }

    const currentUser = await getCurrentUser();

    const wishlist = await prisma.wishlist.findFirst({
      where: {
        OR: [
          {
            userId: currentUser?.id,
          },
          {
            token,
          },
        ],
      },
      include: {
        items: {
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            favoritedBy: {
              include: {
                items: true,
              },
            },
          },
        },
      },
    });
    return NextResponse.json(wishlist);
  } catch (error) {
    console.log('[WISHLIST_GET] Server error', error);
    return NextResponse.json({ message: 'Не удалось получить избранное' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    let token = req.cookies.get('wishlistToken')?.value;

    const session = await getServerSession();

    const user =
      session &&
      (await prisma.user.findFirst({
        where: {
          email: session?.user?.email || undefined,
        },
        include: { wishlist: true },
      }));

    if (user?.wishlist?.token) {
      token = user.wishlist?.token;
      req.cookies.set('wishlistToken', user.wishlist?.token);
    }

    if (!token) {
      token = crypto.randomUUID();
    }

    let userWishlist = await prisma.wishlist.findFirst({
      where: {
        token,
      },
    });

    if (!userWishlist) {
      userWishlist = await prisma.wishlist.create({
        data: {
          token,
        },
      });
    }

    const data = (await req.json()) as Product;

    const updatedWishlist = await prisma.wishlist.update({
      where: {
        token,
      },
      data: { items: { connect: { id: data.id } } },
    });
    const res = NextResponse.json(updatedWishlist);
    res.cookies.set('wishlistToken', token, { maxAge: 60 * 60 * 24 * 30 });

    return res;
  } catch (error) {
    console.log('[WISHLIST_POST] Server error', error);
    return NextResponse.json({ message: 'Не удалось создать избранные' }, { status: 500 });
  }
}
