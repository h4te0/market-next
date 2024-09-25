import { Skeleton } from '../ui';

export const CartSkeleton = () => {
  return (
    <div className="flex justify-between">
      <Skeleton className="rounded-lg w-full max-w-[816px] h-[620px]" />
      <Skeleton className="rounded-lg w-full max-w-[402px] h-[240px]" />
    </div>
  );
};
