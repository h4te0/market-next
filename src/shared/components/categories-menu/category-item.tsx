import Link from 'next/link';
import Image from 'next/image';
import debounce from 'lodash.debounce';
import { ChevronRight } from 'lucide-react';

import { cn } from '@/lib/utils';

import { paths } from '@/shared/consts/paths';

import type { Dispatch, SetStateAction } from 'react';
import type { CategoriesWithChildren } from '@/shared/api/queries/categories';

interface Props {
  category: CategoriesWithChildren;
  currentCategory?: CategoriesWithChildren;
  setCurrentCategory: Dispatch<SetStateAction<CategoriesWithChildren | undefined>>;
}

export const CategoryItem = ({ category, currentCategory, setCurrentCategory }: Props) => {
  const debouncedHandle = debounce((category) => setCurrentCategory(category), 300);

  return (
    <li onMouseEnter={() => debouncedHandle(category)} onMouseLeave={debouncedHandle.cancel}>
      <Link
        href={`${paths.catalog}/${category.slug}`}
        className={cn(
          'flex items-center border-b p-2 hover:text-primary',
          currentCategory?.id === category.id && 'text-primary',
        )}>
        <div className="flex items-center justify-center mr-2 h-5 w-5">
          <Image src={category.image || ''} alt="category" width={20} height={20} />
        </div>
        <p className="flex-shrink flex-grow">{category.title}</p>
        <ChevronRight width={16} height={16} />
      </Link>
    </li>
  );
};
