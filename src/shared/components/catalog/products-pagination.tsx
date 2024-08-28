import { cn } from '@/lib/utils';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../ui';

interface Props {
  page?: string;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  classname?: string;
}

export const ProductsPagination = (props: Props) => {
  const { page = 1, totalPages, hasNextPage, hasPrevPage, classname } = props;

  const currentPage = Math.min(Math.max(Number(page), 1), totalPages);

  const getPagesToShow = () => {
    let startPage = currentPage - 2;
    let endPage = currentPage + 2;

    if (currentPage <= 3) {
      startPage = 1;
      endPage = 5;
    } else if (currentPage >= totalPages - 2) {
      startPage = totalPages - 4;
      endPage = totalPages;
    }
    if (totalPages < 5) {
      endPage = totalPages;
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };
  const pages = getPagesToShow();

  return (
    <Pagination className={cn(classname)}>
      <PaginationContent className="w-full flex justify-center">
        <PaginationItem>
          <div className="w-10 h-10">
            {hasPrevPage && <PaginationPrevious href={`?page=${currentPage - 1}`} />}
          </div>
        </PaginationItem>
        {pages.map((page, i) => (
          <PaginationItem key={i}>
            <PaginationLink href={`?page=${page}`} isActive={currentPage === page}>
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <div className="w-10 h-10">
            {hasNextPage && <PaginationNext href={`?page=${currentPage + 1}`} />}
          </div>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};