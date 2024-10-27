import { Title } from '@/shared/components';
import { getNounByCount } from '@/shared/helpers';

interface Props {
  catalogTitle?: string;
  total: number;
}

export const CatalogEmpty = ({ catalogTitle, total }: Props) => {
  return (
    <div className="h-full">
      <div className="mb-4">
        <Title size="md">{catalogTitle}</Title>
        <p className="text-sm">
          {getNounByCount(
            total,
            `Найден ${total} товар`,
            `Найдено ${total} товара`,
            `Найдено ${total} товаров`,
          )}
        </p>
      </div>
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-2xl">К сожалению товаров не найдено 😢</p>
      </div>
    </div>
  );
};
