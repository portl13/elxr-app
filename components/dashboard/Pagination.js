import React from 'react'
import ArrowLeftIcon from '@icons/ArrowLeftIcon'
import ArrowIconRight from '@icons/ArrowIconRight'
import ReactPaginate from 'react-paginate'

function Pagination({ pageCount, onPageChange }) {
  return (
    <ReactPaginate
      breakLabel="..."
      previousLabel={<ArrowLeftIcon />}
      nextLabel={<ArrowIconRight />}
      onPageChange={onPageChange}
      pageRangeDisplayed={5}
      pageCount={pageCount}
      renderOnZeroPageCount={null}
      className="pagination-page"
      pageClassName="pagination-page-item"
      previousClassName="pagination-page-item"
      nextClassName="pagination-page-item"
    />
  )
}

export default Pagination
