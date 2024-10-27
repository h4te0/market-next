import Link from 'next/link';

import { getNounByCount } from '@/shared/helpers';

import { Button } from '@/shared/components';

import { paths } from '@/shared/consts';

interface Props {
  totalAmount: number;
  quantity: number;
  isDisabled: boolean;
}

export const CartSummary = ({ totalAmount, quantity, isDisabled }: Props) => {
  return (
    <div className="bg-white rounded-lg px-4 py-8 w-full max-w-[402px] h-fit">
      <div className="flex justify-between pb-2 border-b">
        <p className="font-bold">Сумма к оплате: </p>
        <p className="font-bold">{totalAmount.toLocaleString('ru')} ₸</p>
      </div>
      <div className="flex justify-between mt-2 mb-8 text-[12px]">
        <p>
          {getNounByCount(
            quantity,
            `${quantity} товар`,
            `${quantity} товара`,
            `${quantity} товаров`,
          )}{' '}
          на сумму
        </p>
        <p>{totalAmount.toLocaleString('ru')} ₸</p>
      </div>
      <Link href={paths.checkout}>
        <Button className="w-full text-lg" disabled={isDisabled}>
          Оформить заказ
        </Button>
      </Link>
      <p className="text-[12px] mt-2 leading-4">
        Оформляя заказ, вы подтверждаете свое согласие с нашими условиями покупки в
        интернет-магазине
      </p>
    </div>
  );
};
