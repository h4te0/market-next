import { prisma } from '@/shared/api/prisma-client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const code = req.nextUrl.searchParams.get('code');

    if (!code) {
      return NextResponse.json({ error: 'Неверный код' }, { status: 400 });
    }

    const verificationCode = await prisma.verificationCode.findFirst({
      where: {
        code,
      },
    });

    if (!verificationCode) {
      return NextResponse.json({ error: 'Неверный код' }, { status: 400 });
    }

    let cartToken = req.cookies.get('cartToken')?.value;

    if (!cartToken) {
      cartToken = crypto.randomUUID();
    }

    await prisma.user.update({
      where: {
        id: verificationCode.userId,
      },
      data: {
        verified: new Date(),
        cart: {
          connectOrCreate: {
            where: {
              token: cartToken,
            },
            create: {
              token: cartToken,
            },
          },
        },
      },
    });

    await prisma.verificationCode.delete({
      where: {
        id: verificationCode.id,
      },
    });

    return NextResponse.redirect(new URL(`${process.env.BASE_URL}/?verified`, req.url));
  } catch (error) {
    console.error(error);
    console.log('[VERIFY_GET] Server error', error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const code = data.code;

    if (!code) {
      return NextResponse.json({ error: 'Неверный код' }, { status: 400 });
    }

    const verificationCode = await prisma.verificationCode.findFirst({
      where: {
        code,
      },
    });

    if (!verificationCode) {
      return NextResponse.json({ error: 'Неверный код' }, { status: 400 });
    }

    let cartToken = req.cookies.get('cartToken')?.value;

    if (!cartToken) {
      cartToken = crypto.randomUUID();
    }

    await prisma.user.update({
      where: {
        id: verificationCode.userId,
      },
      data: {
        verified: new Date(),
        cart: {
          connectOrCreate: {
            where: {
              token: cartToken,
            },
            create: {
              token: cartToken,
            },
          },
        },
      },
    });

    await prisma.verificationCode.delete({
      where: {
        id: verificationCode.id,
      },
    });

    return NextResponse.json({ message: 'Почта подтверждена!' });
  } catch (error) {
    console.error(error);
    console.log('[VERIFY_POST] Server error', error);
  }
}
