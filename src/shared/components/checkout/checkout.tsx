'use client';

import toast from 'react-hot-toast';
import { useRouter } from 'next-nprogress-bar';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useCartLogic } from '@/shared/hooks';

import {
  CheckoutAddressForm,
  CheckoutCartItems,
  CheckoutPersonalForm,
  CheckoutSidebar,
  Container,
  Form,
  Title,
} from '@/shared/components';

import { formCheckoutSchema, paths, TFormCheckoutValues } from '@/shared/consts';

import type { User } from '@prisma/client';
import { useCreateOrder } from '@/shared/api/queries';

interface Props {
  user: User | null;
}

export const Checkout = ({ user }: Props) => {
  const { cart, isLoading } = useCartLogic();
  const { createOrder, isPending } = useCreateOrder();

  const router = useRouter();

  const form = useForm<TFormCheckoutValues>({
    resolver: zodResolver(formCheckoutSchema),
    defaultValues: {
      email: user?.email,
      fullName: user?.fullName || '',
      phone: user?.phone || '',
      address: user?.address || '',
      comment: '',
    },
  });

  const onSubmit = async (data: TFormCheckoutValues) => {
    createOrder(data);
  };

  if (cart) {
    if (!cart?.items.length) {
      router.push(paths.cart);
      toast.error('У вас нет товаров в корзине');
      return null;
    }
  }

  return (
    <Container classname="pt-3">
      <Title size="lg" className="mb-6">
        Оформление заказа
      </Title>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-10">
            <div className="flex flex-col gap-10 flex-1 mb-20">
              <CheckoutCartItems cart={cart} isLoading={isLoading} />
              <CheckoutPersonalForm
                classname={isLoading ? 'opacity-40 pointer-events-none' : ''}
                control={form.control}
                register={form.register}
              />
              <CheckoutAddressForm
                classname={isLoading ? 'opacity-40 pointer-events-none' : ''}
                control={form.control}
              />
            </div>
            <div className="w-[450px]">
              <CheckoutSidebar
                totalAmount={cart?.totalAmount}
                quantity={cart?.quantity}
                isLoading={isLoading}
                isPending={isPending}
              />
            </div>
          </div>
        </form>
      </Form>
    </Container>
  );
};
