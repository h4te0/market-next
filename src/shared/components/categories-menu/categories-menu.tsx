'use client';

import { useEffect, useRef, useState } from 'react';

import { useOutsideClick } from '@/shared/hooks';

import { CategoryItem, SubCategoryItem, Skeleton, Container } from '@/shared/components';

import { type ICategoriesWithChildren, useCategories } from '@/shared/api/queries/categories';

interface Props {
  onClose: () => void;
}

export const CategoriesMenu = ({ onClose }: Props) => {
  const { data: categories, isLoading } = useCategories();

  const [currentCategory, setCurrentCategory] = useState<ICategoriesWithChildren>();

  const dropdownRef = useRef<HTMLDivElement>(null);

  useOutsideClick(dropdownRef, onClose);

  useEffect(() => {
    categories && setCurrentCategory(categories[0]);
  }, [isLoading]);

  return (
    <div className="absolute top-[74px] right-0 bottom-0 left-0 bg-white min-h-[calc(100vh-74px)] py-4 overflow-hidden z-10">
      <Container>
        <div className="flex" ref={dropdownRef}>
          <div className="mr-4 min-w-[266px] max-h-[calc(100vh-200px)] overflow-y-auto">
            <ul>
              {!isLoading
                ? categories?.map((category) => (
                    <CategoryItem
                      key={category.id}
                      category={category}
                      currentCategory={currentCategory}
                      setCurrentCategory={setCurrentCategory}
                      onClose={onClose}
                    />
                  ))
                : Array.from({ length: 14 }).map((_, i) => (
                    <Skeleton key={i} className="w-full h-8 mb-2" />
                  ))}
            </ul>
          </div>
          <div className="w-full max-h-[calc(100vh-200px)] overflow-y-auto">
            <div className="columns-3 px-4 border-l">
              {currentCategory?.children.map((subCategory) => (
                <SubCategoryItem
                  key={subCategory.id}
                  subCategory={subCategory}
                  currentCategory={currentCategory}
                  onClose={onClose}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
