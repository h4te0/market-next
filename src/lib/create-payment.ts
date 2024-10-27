import Stripe from 'stripe';

import type { ICartItemsWithProducts } from '@/shared/api/queries';

interface Props {
  email: string;
  checkoutItems: ICartItemsWithProducts[];
  orderId: number;
  hasDelivery?: boolean;
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export const createPayment = async (details: Props) => {
  const data = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    customer_email: details.email,
    metadata: { order_id: details.orderId },
    line_items: [
      {
        price_data: {
          currency: 'kzt',
          product_data: { name: 'Доставка' },
          unit_amount: details.hasDelivery ? 1000 * 100 : 0,
        },
        quantity: 1,
      },
      ...details.checkoutItems.map((item) => ({
        price_data: {
          currency: 'kzt',
          product_data: {
            name: item.product.title,
          },
          unit_amount: item.product.price * 100,
        },
        quantity: item.quantity,
      })),
    ],

    mode: 'payment',
    success_url: `${process.env.BASE_URL}/?paid`,
    cancel_url: `${process.env.BASE_URL}`,
  });
  return data;
};
