interface Props {
  orderId: number;
  totalAmount: number;
  paymentUrl: string;
}

export const PayOrderTemplate = ({ orderId, totalAmount, paymentUrl }: Props) => {
  return (
    <div>
      <h1>Заказ #{orderId}</h1>

      <p>
        Оплатите заказ на сумму{' '}
        <span className="font-bold text-lg">{totalAmount.toLocaleString('ru')} ₸</span>. Перейдите{' '}
        <a href={paymentUrl}>по этой ссылке</a> для оплаты заказа.
      </p>
    </div>
  );
};
