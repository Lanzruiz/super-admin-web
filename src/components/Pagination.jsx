import React, { useState, useEffect } from 'react';

export default function Pagination({ postsPerPage, length, handlePagination }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSelected, setPageSelected] = useState(0);
  const totalPages = Math.ceil(length / postsPerPage);

  const paginationNumbers = [];

  const maxPagesToShow = 5;
  let startPage = currentPage;
  if (currentPage + maxPagesToShow > totalPages) {
    startPage = Math.max(totalPages - maxPagesToShow + 1, 1);
  }
  for (
    let i = startPage;
    i <= Math.min(startPage + maxPagesToShow - 1, totalPages);
    i++
  ) {
    paginationNumbers.push(i);
  }

  return (
    <div className="p-2">
      {currentPage > 1 && (
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          className={`mx-2 py-2 px-4 rounded-md bg-blue-500 text-white`}
        >
          Previous
        </button>
      )}
      {paginationNumbers.map((pageNumber) => (
        <button
          onClick={() => {
            handlePagination(pageNumber);
            setPageSelected(pageNumber);
          }}
          className={`mx-2 py-2 px-4 rounded-md bg-blue-500 text-white ${
            pageNumber === pageSelected ? 'bg-gray-500' : 'bg-blue-500'
          }`}
          key={pageNumber}
        >
          {pageNumber}
        </button>
      ))}
      {paginationNumbers.pop() < totalPages && (
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          className={`mx-2 py-2 px-4 rounded-md bg-blue-500 text-white`}
        >
          Next
        </button>
      )}
    </div>
  );
}
