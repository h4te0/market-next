import { Checkbox } from '../ui';

interface IChechboxProps {
  cartItemIds: number[];
  checked: boolean;
  onChange: (cartItemIds: number[]) => (checked: boolean) => void;
}

interface IClearCartButtonProps {
  count: number;
  onClick: () => void;
}

export const SelectAllCheckbox = ({ cartItemIds, checked, onChange }: IChechboxProps) => {
  return (
    <div className="flex gap-2">
      <Checkbox checked={checked} onCheckedChange={onChange(cartItemIds)} />
      <p className="text-sm font-semibold">Выбрать все</p>
    </div>
  );
};

export const ClearCartButton = ({ onClick, count }: IClearCartButtonProps) => {
  if (!count) return null;

  return (
    <p className="text-secondary cursor-pointer hover:opacity-70 duration-200" onClick={onClick}>
      Очистить корзину ({count})
    </p>
  );
};
