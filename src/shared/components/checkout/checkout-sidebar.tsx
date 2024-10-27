import { ShieldCheck, Truck } from 'lucide-react';

import { getNounByCount } from '@/shared/helpers';

import { Button, CheckoutBlock, Skeleton } from '@/shared/components';

interface Props {
  totalAmount?: number;
  quantity?: number;
  isLoading?: boolean;
  isPending?: boolean;
}

const checkoutInfo = [
  {
    tilte: 'Безопасная оплата',
    icon: <ShieldCheck />,
  },
  {
    tilte: 'Бесплатная доставка от 10 000 ₸',
    icon: <Truck />,
  },
];

export const CheckoutSidebar = ({ totalAmount, quantity, isLoading, isPending }: Props) => {
  return (
    <CheckoutBlock classname="sticky top-10">
      <div>
        {totalAmount && quantity ? (
          <div className="flex justify-between font-bold">
            <p>Итого</p>
            <p>
              {totalAmount < 10000
                ? (totalAmount + 1000).toLocaleString('ru') + ' ₸'
                : totalAmount.toLocaleString('ru') + ' ₸'}
            </p>
          </div>
        ) : (
          <Skeleton className="h-6" />
        )}

        <hr className="my-4" />

        {totalAmount && quantity ? (
          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-gray-400">
              <p>Доставка</p>
              <p>{totalAmount < 10000 ? '1000 ₸' : 'Бесплатно'}</p>
            </div>
            <div className="flex justify-between text-gray-400">
              {getNounByCount(
                quantity,
                `${quantity} товар на сумму`,
                `${quantity} товара на сумму`,
                `${quantity} товаров на сумму`,
              )}
              <p>{totalAmount?.toLocaleString('ru')} ₸</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <Skeleton className="h-6" />
            <Skeleton className="h-6" />
          </div>
        )}

        <Button className="w-full mt-4 text-lg" type="submit" disabled={isLoading || isPending}>
          Перейти к оплате
        </Button>

        <div className="mt-4 flex flex-col gap-4 text-sm">
          {checkoutInfo.map((info, i) => (
            <div className="flex items-center gap-4" key={i}>
              {info.icon}
              <p>{info.tilte}</p>
            </div>
          ))}
        </div>
      </div>
    </CheckoutBlock>
  );
};
