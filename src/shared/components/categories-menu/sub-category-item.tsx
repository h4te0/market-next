import Link from 'next/link';
import Image from 'next/image';

import { paths } from '@/shared/consts/paths';
import { ICategoriesWithChildren } from '@/shared/api/queries/categories';
import { ChildCategoryItem } from './child-category-item';

interface Props {
  subCategory: ICategoriesWithChildren;
  currentCategory: ICategoriesWithChildren;
  onClose: () => void;
}

export const SubCategoryItem = ({ subCategory, currentCategory, onClose }: Props) => {
  return (
    <div className="mr-4 mb-6 break-inside-avoid">
      <ul className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Image
            src={subCategory.image || ''}
            alt="sub category"
            width={20}
            height={20}
            className="aspect-square h-6"
          />
          <li onClick={onClose}>
            <Link href={`${paths.catalog}/${currentCategory.slug}/${subCategory.slug}`}>
              <p className="text-[14px] font-bold hover:text-primary">{subCategory.title}</p>
            </Link>
          </li>
        </div>
        {subCategory.children.map((categoryChildren) => (
          <ChildCategoryItem
            key={categoryChildren.id}
            categoryChildren={categoryChildren}
            subCategory={subCategory}
            currentCategory={currentCategory}
            onClose={onClose}
          />
        ))}
      </ul>
    </div>
  );
};
