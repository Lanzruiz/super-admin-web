import { Typography } from '@material-tailwind/react';
import React, { useState, useEffect } from 'react';

export default function Pagination2({
  postsPerPage,
  length,
  handlePagination,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSelected, setPageSelected] = useState(0);
  const totalPages = Math.ceil(length / postsPerPage);
  const [pageIndex, setPageIndex] = useState({
    startPage: 1,
    lastPage: 0,
  });

  const paginationNumbers = [];

  useEffect(() => {
    setPageIndex((prevPageIndex) => {
      const newLastPage =
        paginationNumbers.length > 0
          ? paginationNumbers[paginationNumbers.length - 1]
          : 0;
      if (prevPageIndex.lastPage !== newLastPage) {
        return {
          ...prevPageIndex,
          lastPage: newLastPage,
        };
      }
      return prevPageIndex; // No need to update if the lastPage remains the same
    });

    if (pageIndex.lastPage < currentPage) {
      setCurrentPage(currentPage - currentPage + 1);
    }
  }, [paginationNumbers]);

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
    <div className="p-2 flex items-center ">
      <div className="pr-2">
        <Typography className="text-sm">
          Showing <span className="font-bold">{currentPage}</span>-
          <span className="font-bold">{pageIndex.lastPage}</span> of{' '}
          <span className="font-bold">{pageIndex.lastPage}</span> entries
        </Typography>
      </div>

      <div className="flex items-center">
        <button
          disabled={pageIndex.startPage === currentPage}
          onClick={() => {
            setCurrentPage(currentPage - 1);
            handlePagination(currentPage - 1);
          }}
          className={`py-2 px-4 mr-1 rounded-md text-white ${pageIndex.startPage === currentPage ? 'bg-gray-500' : 'bg-primary'}`}
        >
          {'<'}
        </button>

        <button
          disabled={pageIndex.lastPage === currentPage}
          onClick={() => {
            setCurrentPage(currentPage + 1);
            handlePagination(currentPage + 1);
          }}
          className={`py-2 px-4 rounded-md text-white ${pageIndex.lastPage === currentPage ? 'bg-gray-500' : 'bg-primary'}`}
        >
          {'>'}
        </button>
      </div>
    </div>
  );
}
