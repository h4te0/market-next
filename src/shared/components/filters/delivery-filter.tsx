import { Switch, Title } from '../ui';

interface Props {
  isDelivery: boolean | undefined;
  setIsDelivery: ({}: boolean) => void;
}

export const DeliveryFilter = ({ isDelivery, setIsDelivery }: Props) => {
  return (
    <div className="flex justify-between items-center">
      <Title size="xs">Товары с экспресс доставкой</Title>
      <Switch checked={isDelivery} onCheckedChange={(v) => setIsDelivery(v)} />
    </div>
  );
};
