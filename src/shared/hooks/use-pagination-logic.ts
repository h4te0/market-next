import { useSearchParams } from 'next/navigation';

export const usePaginationLogic = (totalPages: number) => {
  const searchParams = useSearchParams();
  const page = searchParams.get('page') || 1;
  const currentPage = Math.min(Math.max(Number(page), 1), totalPages);
  const query = new URLSearchParams(searchParams.toString());
  query.delete('page');
  const queryString = query.toString() ? `&${query}` : '';

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
  return { currentPage, pages, queryString };
};
