import { getNounByCount } from '@/shared/helpers';
import { Button } from '../ui';
import { CartWithItems } from '@/shared/api/queries/cart';

interface Props {
  cart: CartWithItems;
  isDisabled: boolean;
}

export const CartSummary = ({ cart, isDisabled }: Props) => {
  return (
    <div className="bg-white rounded-lg px-4 py-8 w-full max-w-[402px] h-fit">
      <div className="flex justify-between pb-2 border-b">
        <p className="font-bold">Сумма к оплате: </p>
        <p className="font-bold">{cart.totalAmount.toLocaleString('ru')} ₸</p>
      </div>
      <div className="flex justify-between mt-2 mb-8 text-[12px]">
        <p>
          {getNounByCount(
            cart.items.length,
            `${cart.quantity} товар`,
            `${cart.quantity} товара`,
            `${cart.quantity} товаров`,
          )}{' '}
          на сумму
        </p>
        <p>{cart.totalAmount.toLocaleString('ru')} ₸</p>
      </div>
      <Button className="w-full text-lg" disabled={isDisabled}>
        Оформить заказ
      </Button>
      <p className="text-[12px] mt-2 leading-4">
        Оформляя заказ, вы подтверждаете свое согласие с нашими условиями покупки в
        интернет-магазине
      </p>
    </div>
  );
};
