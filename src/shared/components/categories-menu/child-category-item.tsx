import { ICategoriesWithChildren } from '@/shared/api/queries/categories';
import { paths } from '@/shared/consts/paths';
import Link from 'next/link';

interface Props {
  categoryChildren: ICategoriesWithChildren & {
    brand: {
      id: number;
      slug: string;
      title: string;
    };
  };
  currentCategory: ICategoriesWithChildren;
  subCategory: ICategoriesWithChildren;
  onClose: () => void;
}

export const ChildCategoryItem = ({
  categoryChildren,
  currentCategory,
  subCategory,
  onClose,
}: Props) => {
  return (
    <li onClick={onClose}>
      <Link
        href={
          `${paths.catalog}/${currentCategory.slug}/${subCategory.slug}/${categoryChildren.slug}` +
          `${categoryChildren.brand ? '?brands=' + categoryChildren.brand.slug : ''}`
        }>
        <p className="text-[12px] font-medium hover:text-primary">{categoryChildren.title}</p>
      </Link>
    </li>
  );
};
