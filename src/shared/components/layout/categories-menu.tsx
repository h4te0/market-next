'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import debounce from 'lodash.debounce';
import { ChevronRight } from 'lucide-react';

import { type CategoriesWithChildren, useCategories } from '@/shared/hooks/use-categories';

import { cn } from '@/lib/utils';

import { Container } from './container';
import { Skeleton } from '@/shared/components/ui';

import { paths } from '@/shared/consts/paths';

export const CategoriesMenu = () => {
  const { data: categories, isLoading } = useCategories();

  const [currentCategory, setCurrentCategory] = useState<CategoriesWithChildren>();

  const debouncedHandle = debounce((c) => setCurrentCategory(c), 300);

  useEffect(() => {
    categories && setCurrentCategory(categories[0]);
    console.log(categories);
  }, [isLoading]);

  return (
    <div className="absolute top-[74px] right-0 bottom-0 left-0 bg-white min-h-[calc(100vh-74px)] py-4 overflow-hidden z-10">
      <Container classname="flex">
        <div className="mr-4 min-w-[266px] max-h-[calc(100vh-200px)] overflow-y-auto">
          <ul>
            {!isLoading
              ? categories?.map((category) => (
                  <li
                    key={category.id}
                    onMouseEnter={() => debouncedHandle(category)}
                    onMouseLeave={debouncedHandle.cancel}>
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
                ))
              : Array.from({ length: 14 }).map((_, i) => (
                  <Skeleton key={i} className="w-full h-8 mb-2" />
                ))}
          </ul>
        </div>
        <div className="w-full max-h-[calc(100vh-200px)] overflow-y-auto">
          <div className="columns-3 px-4 border-l">
            {currentCategory?.children.map((subCategory) => (
              <div className="mr-4 mb-6 break-inside-avoid" key={subCategory.id}>
                <ul className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <Image
                      src={subCategory.image || ''}
                      alt="sub category"
                      width={20}
                      height={20}
                      className="aspect-square h-6"
                    />
                    <li>
                      <Link href={`${paths.catalog}/${currentCategory.slug}/${subCategory.slug}`}>
                        <p className="text-[14px] font-bold hover:text-primary">
                          {subCategory.title}
                        </p>
                      </Link>
                    </li>
                  </div>
                  {subCategory.children.map((children) => (
                    <li key={children.id}>
                      <Link
                        href={
                          `${paths.catalog}/${currentCategory.slug}/${subCategory.slug}/${children.slug}` +
                          `${children.brand ? '?brand=' + children.brand.slug : ''}`
                        }>
                        <p className="text-[12px] font-medium hover:text-primary">
                          {children.title}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};
