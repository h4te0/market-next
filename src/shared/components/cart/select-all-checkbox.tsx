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
      <Checkbox id="all" checked={checked} onCheckedChange={onChange(cartItemIds)} />
      <label htmlFor="all" className="text-sm font-semibold cursor-pointer">
        Выбрать все
      </label>
    </div>
  );
};

export const ClearCartButton = ({ onClick, count }: IClearCartButtonProps) => {
  if (!count) return null;

  return (
    <p
      className="leading-5 text-secondary cursor-pointer hover:opacity-70 duration-200"
      onClick={onClick}>
      Очистить корзину ({count})
    </p>
  );
};
