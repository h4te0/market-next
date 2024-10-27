interface Props {}

export const OrdersEmpty = ({}: Props) => {
  return (
    <tr className="h-[500px] flex items-center justify-center">
      <td className="text-xl text-gray-400">Вы ещё не сделали ни одного заказа</td>
    </tr>
  );
};
