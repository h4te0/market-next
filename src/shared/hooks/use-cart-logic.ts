import { useEffect, useState } from 'react';
import nProgress from 'nprogress';
import { useRouter } from 'next-nprogress-bar';
import {
  useCart,
  useDeleteCartItem,
  useDeleteManyCartItems,
  useUpdateItemCount,
} from '@/shared/api/queries/cart';

export const useCartLogic = () => {
  const { data: cart, isLoading } = useCart();
  const { deleteCartItems, isPending: deleteManyPending } = useDeleteManyCartItems();
  const { updateCount, isPending: updatePending } = useUpdateItemCount();
  const { deleteCartItem, isPending: deletePending } = useDeleteCartItem();

  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const router = useRouter();

  const isPending = updatePending || deletePending || deleteManyPending;

  useEffect(() => {
    isPending ? nProgress.start() : nProgress.done();
  }, [isPending]);

  const handleSelectAll = (cartItemIds: number[]) => (checked: boolean) => {
    setSelectedItems(checked ? cartItemIds : []);
  };

  const handleClearCart = () => {
    deleteCartItems(selectedItems);
    setSelectedItems([]);
    router.refresh();
  };

  return {
    cart,
    isLoading,
    isPending,
    selectionProps: {
      selectedItems,
      setSelectedItems,
    },
    handles: {
      handleSelectAll,
      handleClearCart,
    },
    actions: {
      updateCount,
      deleteCartItem,
    },
  };
};
