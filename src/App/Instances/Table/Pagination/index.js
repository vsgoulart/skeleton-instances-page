import React, {useState} from 'react';

const PAGE_SIZE = 16;

function Pagination({totalCount, onPaginate}) {
  const [currentPage, setCurrentPage] = useState(0);
  return (
    <>
      <button
        type="button"
        onClick={() => {
          setCurrentPage(0);
          onPaginate(0);
        }}
        disabled={currentPage === 0}
      >
        {'|<'}
      </button>
      <button
        type="button"
        onClick={() => {
          const page = currentPage - PAGE_SIZE < 0 ? 0 : currentPage - PAGE_SIZE;
          setCurrentPage(page);
          onPaginate(page);
        }}
        disabled={currentPage === 0}
      >
        {'<'}
      </button>
      <button
        type="button"
        onClick={() => {
          const page = currentPage - PAGE_SIZE > totalCount ? totalCount : currentPage + PAGE_SIZE;
          setCurrentPage(page);
          onPaginate(page);
        }}
        disabled={currentPage === totalCount}
      >
        {'>'}
      </button>
      <button
        type="button"
        onClick={() => {
          setCurrentPage(totalCount);
          onPaginate(totalCount);
        }}
        disabled={currentPage === totalCount}
      >
        {'>|'}
      </button>
    </>
  );
}

export {Pagination};
