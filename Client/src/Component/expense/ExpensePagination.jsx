import { useMemo } from 'react';

function getPageNumbers(currentPage, totalPages) {
  const pages = [];
  const maxVisible = 5;

  if (totalPages <= maxVisible) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
    return pages;
  }

  pages.push(1);

  let start = Math.max(2, currentPage - 1);
  let end = Math.min(totalPages - 1, currentPage + 1);

  if (currentPage <= 3) {
    end = Math.min(4, totalPages - 1);
  } else if (currentPage >= totalPages - 2) {
    start = Math.max(totalPages - 3, 2);
  }

  if (start > 2) pages.push('...');
  for (let i = start; i <= end; i++) pages.push(i);
  if (end < totalPages - 1) pages.push('...');

  pages.push(totalPages);
  return pages;
}

export default function ExpensePagination({ pagination, onPageChange }) {
  if (!pagination) return null;

  const { page, totalPage, hasNext, hasPrev, limit } = pagination;
  const total = pagination.total ?? 0;
  const from = (page - 1) * limit + 1;
  const to = Math.min(page * limit, total);

  const pageNumbers = useMemo(() => getPageNumbers(page, totalPage), [page, totalPage]);

  const handlePrev = () => {
    if (hasPrev) onPageChange(page - 1);
  };

  const handleNext = () => {
    if (hasNext) onPageChange(page + 1);
  };

  const handlePageClick = (p) => {
    if (typeof p === 'number') onPageChange(p);
  };

  return (
    <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
      {/* <p className="text-sm text-gray-500">
        Showing <span className="font-medium text-gray-700">{from}</span>&ndash;
        <span className="font-medium text-gray-700">{to}</span> of{' '}
        <span className="font-medium text-gray-700">{total}</span> expenses
      </p> */}
      <div className="flex items-center gap-1">
        <button
          onClick={handlePrev}
          disabled={!hasPrev}
          className="rounded-lg cursor-pointer border border-gray-200 px-3 py-1.5 text-sm text-gray-600 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white"
        >
          Previous
        </button>
        {pageNumbers.map((p, idx) =>
          p === '...' ? (
            <span key={`ellipsis-${idx}`} className="px-2 py-1.5 text-sm text-gray-400">
              &hellip;
            </span>
          ) : (
            <button
              key={p}
              onClick={() => handlePageClick(p)}
              className={`min-w-[36px] cursor-pointer rounded-lg px-3 py-1.5 text-sm transition-colors ${
                p === page
                  ? 'bg-blue-600 font-medium text-white'
                  : 'border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {p}
            </button>
          )
        )}
        <button
          onClick={handleNext}
          disabled={!hasNext}
          className="rounded-lg border cursor-pointer border-gray-200 px-3 py-1.5 text-sm text-gray-600 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white"
        >
          Next
        </button>
      </div>
    </div>
  );
}
