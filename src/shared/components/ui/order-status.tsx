import { cn } from '@/lib';
import { OrderStatus as OrderStatusType } from '@prisma/client';

interface Props {
  status: OrderStatusType;
  classname?: string;
}

export const OrderStatus = ({ status, classname }: Props) => {
  switch (status) {
    case 'PENDING':
      return (
        <div
          className={cn(
            'flex justify-center items-center bg-yellow-600 text-white rounded-sm font-bold py-1 px-2',
            classname,
          )}>
          Не оплачен
        </div>
      );
    case 'SUCCEEDED':
      return (
        <div
          className={cn(
            'flex justify-center items-center bg-green-600 text-white rounded-sm font-bold py-1 px-2',
            classname,
          )}>
          Подтверждён
        </div>
      );
    case 'CANCELED':
      return (
        <div
          className={cn(
            'flex justify-center items-center bg-red-600 text-white rounded-sm font-bold py-1 px-2',
            classname,
          )}>
          Отменён
        </div>
      );
  }
};
