import { CategoriesWithChildren } from '@/shared/api/queries/categories';
import { paths } from '@/shared/consts/paths';
import Link from 'next/link';

interface Props {
  children: CategoriesWithChildren & {
    brand: {
      id: number;
      slug: string;
      title: string;
    };
  };
  currentCategory: CategoriesWithChildren;
  subCategory: CategoriesWithChildren;
}

export const ChildCategoryItem = ({ children, currentCategory, subCategory }: Props) => {
  return (
    <li>
      <Link
        href={
          `${paths.catalog}/${currentCategory.slug}/${subCategory.slug}/${children.slug}` +
          `${children.brand ? '?brands=' + children.brand.slug : ''}`
        }>
        <p className="text-[12px] font-medium hover:text-primary">{children.title}</p>
      </Link>
    </li>
  );
};
