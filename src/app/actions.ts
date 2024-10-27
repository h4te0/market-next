'use server';

import { compare, hashSync } from 'bcrypt';

import { sendEmail } from '@/lib';
import { prisma } from '@/shared/api/prisma-client';
import { getCurrentUser } from '@/shared/helpers/get-current-user';

import { PayOrderTemplate, UserVerificationTemplate } from '@/shared/components';

import { TFormCheckoutValues, TFormPasswordChangeValues } from '@/shared/consts';

import type { Prisma } from '@prisma/client';
import { cookies } from 'next/headers';
import { createPayment } from '@/lib/create-payment';

export const createOrderAction = async (body: TFormCheckoutValues) => {
  try {
    const cartToken = cookies().get('cartToken')?.value;

    const userCart = await prisma.cart.findFirst({
      where: { token: cartToken },
      include: {
        user: true,
        items: {
          include: {
            product: { include: { favoritedBy: { include: { items: true } } } },
          },
        },
      },
    });

    if (!cartToken || !userCart) throw Error('Корзина не найдена');
    if (userCart?.totalAmount === 0) throw Error('Корзина пустая');

    if (userCart.userId) {
      await prisma.user.update({
        where: {
          id: userCart.userId,
        },
        data: {
          phone: body.phone,
          address: body.address,
        },
      });
    }

    const hasDelivery = userCart.totalAmount < 10000;

    const totalAmountWithDelivery = hasDelivery
      ? userCart.totalAmount + 1000
      : userCart.totalAmount;

    const order = await prisma.order.create({
      data: {
        token: cartToken,
        fullName: body.fullName,
        email: body.email,
        phone: body.phone,
        address: body.address,
        comment: body.comment,
        totalAmount: totalAmountWithDelivery,
        items: JSON.stringify(userCart.items),
      },
    });

    await prisma.cart.update({
      where: {
        token: cartToken,
      },
      data: {
        totalAmount: 0,
      },
    });
    await prisma.cartItem.deleteMany({
      where: {
        cartId: userCart.id,
      },
    });

    const paymentData = await createPayment({
      email: body.email,
      checkoutItems: userCart.items,
      orderId: order.id,
      hasDelivery,
    });

    if (!paymentData.url) throw Error('Ошибка создания заказа');

    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        userId: userCart.userId,
        paymentId: paymentData.id,
      },
    });

    await sendEmail(
      body.email,
      `Оплата заказаа #${order.id}`,
      PayOrderTemplate({
        orderId: order.id,
        totalAmount: totalAmountWithDelivery,
        paymentUrl: paymentData.url,
      }),
    );
    return paymentData.url;
  } catch (error) {
    console.error('Error [CREATE_ORDER]', error);
    throw error;
  }
};

export const registerUserAction = async (body: Prisma.UserCreateInput) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (user) {
      if (!user.verified) {
        throw new Error('Почта не подтверждена');
      }

      throw new Error('Пользователь уже существует');
    }

    const createdUser = await prisma.user.create({
      data: {
        fullName: body.fullName,
        email: body.email,
        password: body.password ? hashSync(body.password, 10) : null,
      },
    });

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    await prisma.verificationCode.create({
      data: {
        code,
        userId: createdUser.id,
      },
    });

    await sendEmail(
      createdUser.email,
      'Подтверждение регистрации',
      UserVerificationTemplate({
        code,
      }),
    );
  } catch (error) {
    console.error('Error [CREATE_USER]', error);
    throw error;
  }
};

export const updateUserDetailsAction = async (body: Prisma.UserUpdateInput) => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      throw new Error('Пользователь не найден');
    }

    await prisma.user.update({
      where: {
        id: Number(currentUser.id),
      },
      data: {
        fullName: body.fullName,
        email: body.email,
        phone: body.phone,
        updatedAt: new Date(),
      },
    });
  } catch (err) {
    console.log('Error [UPDATE_USER]', err);
    throw err;
  }
};

export const updateUserPasswordAction = async (body: TFormPasswordChangeValues) => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      throw new Error('Пользователь не найден');
    }

    const findUser = await prisma.user.findFirst({
      where: {
        id: Number(currentUser.id),
      },
    });

    if (body.oldPassword) {
      const isPasswordValid = await compare(String(body.oldPassword), findUser?.password || '');
      if (isPasswordValid) {
        await prisma.user.update({
          where: {
            id: Number(currentUser.id),
          },
          data: {
            password: hashSync(body.newPassword as string, 10),
          },
        });
      } else {
        throw new Error('Неверный текущий пароль');
      }
    }

    await prisma.user.update({
      where: {
        id: Number(currentUser.id),
      },
      data: {
        password: hashSync(body.newPassword as string, 10),
      },
    });
  } catch (err) {
    console.log('Error [UPDATE_USER_PASSWORD]', err);
    throw err;
  }
};
