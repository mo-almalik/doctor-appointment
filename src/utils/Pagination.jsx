
import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="flex gap-x-3 p-2 bg-white py-3">
      {pages.map((page) => (
        <div
          key={page}
          onClick={() => onPageChange(page)}
          className={`text-gray-500 text-center ${currentPage === page ? 'bg-main w-6  text-white rounded-md' : ''}`}
        >
          <button>{page}</button>
        </div>
      ))}
    </div>
  );
};

export default Pagination;
