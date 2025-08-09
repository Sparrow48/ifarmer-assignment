import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const getPages = () => {
    const pages: number[] = [];
    const maxVisible = window.innerWidth < 640 ? 3 : 5; // Responsive
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    const end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
      {/* Previous Button */}
      <button
        className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Prev
      </button>

      {/* Page Numbers */}
      {getPages().map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 rounded border ${
            currentPage === page
              ? 'bg-blue-500 text-white border-blue-500'
              : 'border-gray-300 hover:bg-gray-100'
          }`}
        >
          {page}
        </button>
      ))}

      {/* Next Button */}
      <button
        className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
