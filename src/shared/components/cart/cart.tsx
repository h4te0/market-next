'use client';
import { useCartLogic } from '@/shared/hooks';

import {
  CartEmpty,
  CartItem,
  Spinner,
  CartSummary,
  ClearCartButton,
  SelectAllCheckbox,
} from '@/shared/components';

export const Cart = () => {
  const { cart, isLoading, isPending, selectionProps, handles, actions } = useCartLogic();

  const { handleClearCart, handleSelectAll } = handles;
  const { selectedItems } = selectionProps;

  if (isLoading) return <Spinner size="large" />;

  if (!cart?.items?.length) return <CartEmpty />;

  return (
    <div className="flex justify-between">
      <div className="bg-white rounded-lg p-4 w-full max-w-[816px] h-fit mb-4">
        <div className="flex justify-between pb-4 border-b">
          <SelectAllCheckbox
            cartItemIds={[...cart.items.map((item) => item.id)]}
            checked={cart.items.length === selectedItems.length}
            onChange={handleSelectAll}
          />
          <ClearCartButton onClick={handleClearCart} count={selectedItems.length} />
        </div>
        {cart?.items.map((item) => (
          <CartItem
            key={item.id}
            classname={isPending ? 'pointer-events-none opacity-40' : ''}
            item={item}
            selectionProps={{
              checked: selectedItems.some((el) => el === item.id),
              ...selectionProps,
            }}
            actions={actions}
          />
        ))}
      </div>
      <CartSummary totalAmount={cart.totalAmount} quantity={cart.quantity} isDisabled={isPending} />
    </div>
  );
};
