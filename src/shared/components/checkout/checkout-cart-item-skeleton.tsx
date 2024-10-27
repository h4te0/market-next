import { Skeleton } from '@/shared/components';

export const CheckoutCartItemSkeleton = () => {
  return (
    <div className="flex gap-4 py-1">
      <Skeleton className="h-[75px] w-[75px] flex-shrink-0" />
      <div className="w-full flex flex-col justify-center gap-1">
        <Skeleton className="h-[20px]" />
        <Skeleton className="h-[28px]" />
      </div>
      <div className="flex items-center">
        <Skeleton className="w-6 h-6" />
      </div>
    </div>
  );
};
