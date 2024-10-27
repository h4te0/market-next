import { ICartItemsWithProducts } from '@/shared/api/queries';

interface Props {
  orderId: number;
  items: ICartItemsWithProducts[];
}

export const OrderSuccessTemplate = ({ orderId, items }: Props) => {
  return (
    <div>
      <h1>Спасибо за покупку!</h1>

      <p>Ваш заказ #{orderId} оплачен. Список товаров:</p>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.product.title} | {item.product.price} ₸ x {item.quantity} шт. ={' '}
            {item.product.price * item.quantity} ₸
          </li>
        ))}
      </ul>
    </div>
  );
};
