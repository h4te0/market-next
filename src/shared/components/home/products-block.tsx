import { IProductWithStuff } from '@/shared/api/fetchers/catalog';
import { ProductItem, Title } from '@/shared/components';

interface Props {
  title?: string;
  products: IProductWithStuff[];
}

export const ProductsBlock = ({ title, products }: Props) => {
  return (
    <div className="mt-4">
      <Title size="md" className="mb-4">
        {title}
      </Title>
      <div className="flex gap-2">
        {products.map((product) => (
          <ProductItem key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
};
