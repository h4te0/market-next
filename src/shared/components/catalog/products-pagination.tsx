'use client';

import { cn } from '@/lib/utils';

import { usePaginationLogic } from '@/shared/hooks';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../ui';

interface Props {
  page?: string | null;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  classname?: string;
}

export const ProductsPagination = (props: Props) => {
  const { totalPages, hasNextPage, hasPrevPage, classname } = props;

  const { currentPage, pages, queryString } = usePaginationLogic(totalPages);

  if (totalPages <= 1) return null;

  return (
    <Pagination className={cn(classname)}>
      <PaginationContent className="w-full flex justify-center">
        <PaginationItem>
          <div className="w-10 h-10">
            {hasPrevPage && (
              <PaginationPrevious href={'?page=' + (currentPage - 1) + queryString} />
            )}
          </div>
        </PaginationItem>
        {pages.map((page, i) => (
          <PaginationItem key={i}>
            <PaginationLink href={'?page=' + page + queryString} isActive={currentPage === page}>
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <div className="w-10 h-10">
            {hasNextPage && <PaginationNext href={'?page=' + (currentPage + 1) + queryString} />}
          </div>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
